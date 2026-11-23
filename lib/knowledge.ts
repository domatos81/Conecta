import { PRODUCTS, type KnowledgeArticle, type Product } from './knowledgeTypes.ts';

// Deliberately local: searching never sends the employee's question to a service.
export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/\b(ct|nf|mdf)[ -]?e\b/g, '$1e')
    .replace(/\bs[ -]?(\d{4})\b/g, 's$1')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

const stopWords = new Set('a o as os de da do das dos em na no nas nos um uma para por com como qual quais que e ao aos se meu minha esta estou consigo preciso quero sobre senior sistema erro problema duvida'.split(' '));
const synonyms: Record<string, string[]> = {
  nfe: ['nota fiscal'], cte: ['conhecimento'], mdfe: ['manifesto'],
  licenca: ['licencas', 'proprietaria'], licencas: ['licenca', 'proprietaria'],
  permissao: ['acesso', 'licenca'], webservice: ['webservices', 'integracao'],
  webservices: ['webservice', 'integracao'], integracao: ['webservice', 'webservices'],
  pendencia: ['pendencias'], pendencias: ['pendencia'],
  cep: ['municipio', 'rais'], municipio: ['cep', 'rais'],
  reprocessar: ['regerar'], reenvio: ['regerar'], qr: ['qrcode'],
};

export function searchArticles(articles: KnowledgeArticle[], query: string, product: Product | '' = '', module = ''): KnowledgeArticle[] {
  const phrase = normalize(query);
  const tokens = [...new Set(phrase.split(' ').filter(t => t && !stopWords.has(t)))];
  const filtered = articles.filter(a => (!product || a.product === product) && (!module || a.module === module));
  if (!phrase) return filtered;
  if (!tokens.length) return [];

  return filtered.map(article => {
    const title = normalize(article.title);
    const keywords = normalize(article.keywords.join(' '));
    const body = normalize([article.summary, ...article.symptoms, ...article.steps, article.product, article.module].join(' '));
    const all = `${title} ${keywords} ${body}`;
    let score = title.includes(phrase) ? 30 : 0;
    let matches = 0;
    for (const token of tokens) {
      const variants = [token, ...(synonyms[token] || [])];
      const hit = variants.some(v => all.split(' ').includes(v) || (v.length >= 4 && all.includes(v)));
      // Screen/event/rejection codes must match; never recommend a different code.
      if (/\d/.test(token) && !all.split(' ').includes(token)) return { article, score: 0 };
      if (hit) {
        matches++;
        score += title.includes(token) ? 12 : keywords.includes(token) ? 9 : 4;
      }
    }
    return { article, score: matches / tokens.length >= 0.5 ? score + matches * 2 : 0 };
  }).filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, 'pt-BR'))
    .map(result => result.article);
}

// Validate the published file too, so malformed content yields a recoverable UI.
export function parseKnowledgeBase(value: unknown): KnowledgeArticle[] {
  if (!Array.isArray(value)) throw new Error('A base deve ser uma lista de artigos.');
  const ids = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== 'object') throw new Error('Artigo inválido.');
    const a = item as Record<string, unknown>;
    for (const key of ['id', 'module', 'title', 'summary', 'note', 'sourceUrl', 'sourceCheckedAt']) {
      if (typeof a[key] !== 'string' || !(a[key] as string).trim()) throw new Error(`Campo inválido: ${key}`);
    }
    if (!PRODUCTS.includes(a.product as Product)) throw new Error('Produto inválido.');
    if (a.version !== null && (typeof a.version !== 'string' || !a.version.trim())) throw new Error('Versão inválida.');
    for (const key of ['symptoms', 'keywords', 'steps']) {
      if (!Array.isArray(a[key]) || !(a[key] as unknown[]).length || !(a[key] as unknown[]).every(x => typeof x === 'string' && x.trim())) throw new Error(`Lista inválida: ${key}`);
    }
    const source = new URL(a.sourceUrl as string);
    if (source.protocol !== 'https:' || !['documentacao.senior.com.br', 'suporte.senior.com.br'].includes(source.hostname) || source.username || source.password) throw new Error('Fonte deve ser um endereço oficial HTTPS da Senior.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(a.sourceCheckedAt as string) || Number.isNaN(Date.parse(a.sourceCheckedAt as string))) throw new Error('Data inválida.');
    if (ids.has(a.id as string)) throw new Error('Identificador duplicado.');
    ids.add(a.id as string);
  }
  return value as KnowledgeArticle[];
}
