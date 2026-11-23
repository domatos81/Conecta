import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search, ExternalLink, ChevronDown, RotateCcw } from 'lucide-react';
import { parseKnowledgeBase, searchArticles } from '../lib/knowledge';
import { PRODUCTS, type KnowledgeArticle, type Product } from '../lib/knowledgeTypes';

const examples = [
  { product: 'ERP G5', query: 'Consultar integração F000CWI' },
  { product: 'HCM', query: 'Regerar pendências eSocial' },
  { product: 'TMS', query: 'Rejeição 729' },
] as const;

export function KnowledgeCenter() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [product, setProduct] = useState<Product | ''>('');
  const [module, setModule] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    fetch(`${import.meta.env.BASE_URL}knowledge.json`, { signal: controller.signal, cache: 'no-cache' })
      .then(response => {
        if (!response.ok) throw new Error('Base indisponível');
        return response.json();
      })
      .then(data => { setArticles(parseKnowledgeBase(data)); setStatus('ready'); })
      .catch(error => { if (error.name !== 'AbortError') setStatus('error'); });
    return () => controller.abort();
  }, [attempt]);

  const modules = useMemo(() => [...new Set(articles.filter(a => !product || a.product === product).map(a => a.module))].sort(), [articles, product]);
  const results = useMemo(() => searchArticles(articles, query, product, module), [articles, query, product, module]);
  const hasFilters = Boolean(query || product || module);
  function clear() { setQuery(''); setProduct(''); setModule(''); }
  const fieldClass = 'w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-conecta-cyan placeholder:text-slate-500';

  return (
    <section id="central-ajuda" aria-labelledby="help-title" className="mb-14 scroll-mt-28">
      <div className="rounded-2xl border border-cyan-800/60 bg-slate-900 overflow-hidden">
        <div className="p-5 sm:p-8 bg-gradient-to-br from-cyan-950/60 to-slate-900">
          <div className="flex items-center gap-3 text-conecta-cyan mb-4">
            <BookOpen size={24} aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wider uppercase">Conhecimento & suporte</span>
          </div>
          <h2 id="help-title" className="text-2xl sm:text-3xl font-bold text-white">Como podemos ajudar?</h2>
          <p className="text-slate-300 mt-3 max-w-3xl">Encontre orientações para ERP G5, HCM e TMS. Busque pela dúvida, mensagem de erro ou código da tela.</p>
          <div className="grid md:grid-cols-[minmax(0,1fr)_160px] gap-4 mt-6">
            <div>
              <label htmlFor="help-query" className="block text-sm text-slate-300 mb-2">Sua dúvida ou mensagem de erro</label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                <input id="help-query" type="search" value={query} onChange={e => setQuery(e.target.value)} className={`${fieldClass} pl-12`} placeholder="Ex.: rejeição 729, pendências eSocial, F000CWI" maxLength={500} />
              </div>
            </div>
            <div>
              <label htmlFor="help-product" className="block text-sm text-slate-300 mb-2">Produto</label>
              <div className="relative">
                <select id="help-product" value={product} onChange={e => { setProduct(e.target.value as Product | ''); setModule(''); }} className={`${fieldClass} appearance-none pr-10`}>
                  <option value="">Todos</option>
                  {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-4 top-4 text-slate-400" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <span className="text-sm text-slate-400">Experimente:</span>
            {examples.map(example => <button key={example.query} onClick={() => { setQuery(example.query); setProduct(example.product); setModule(''); }} className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-conecta-cyan hover:text-conecta-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-conecta-cyan">{example.query}</button>)}
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <p className="text-sm text-slate-400 mb-5">Base inicial de orientações selecionadas da Senior. A pesquisa cobre os artigos cadastrados e não consulta toda a documentação em tempo real. As orientações são resumos das fontes, sem geração de respostas por IA.</p>
          {status === 'loading' && <p role="status" className="text-slate-300 py-6">Carregando a base de conhecimento…</p>}
          {status === 'error' && <div role="alert" className="rounded-xl border border-amber-700 p-5 text-slate-200">
            <p>Não foi possível carregar a base. Tente novamente ou consulte a documentação oficial.</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="text-conecta-cyan underline" onClick={() => setAttempt(a => a + 1)}>Tentar novamente</button>
              <a className="text-conecta-cyan underline" href="https://documentacao.senior.com.br/" target="_blank" rel="noopener noreferrer">Documentação Senior (nova aba)</a>
            </div>
          </div>}
          {status === 'ready' && <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <p role="status" aria-live="polite" className="text-slate-300">{results.length} {results.length === 1 ? 'orientação encontrada' : 'orientações encontradas'} <span className="text-slate-400">de {articles.length} na base</span></p>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label htmlFor="help-module" className="block text-sm text-slate-400 mb-2">Módulo</label>
                  <div className="relative">
                    <select id="help-module" value={module} onChange={e => setModule(e.target.value)} className={`${fieldClass} appearance-none pr-10 sm:max-w-xs`}>
                      <option value="">Todos os módulos</option>
                      {modules.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-4 top-4 text-slate-400" aria-hidden="true" />
                  </div>
                </div>
                {hasFilters && <button onClick={clear} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white py-3"><RotateCcw size={16} aria-hidden="true" />Limpar filtros</button>}
              </div>
            </div>
            {!results.length && <div className="text-center rounded-xl border border-dashed border-slate-700 p-8">
              <h3 className="text-lg font-semibold text-white">Ainda não temos uma orientação para essa busca</h3>
              <p className="text-slate-400 mt-2">Tente o código da tela, o número da rejeição ou menos palavras. Confira também o produto e o módulo selecionados.</p>
              <a className="inline-block mt-4 text-conecta-cyan underline" href="https://documentacao.senior.com.br/" target="_blank" rel="noopener noreferrer">Consultar documentação oficial (nova aba)</a>
            </div>}
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              {results.map(article => <article key={article.id} className="rounded-xl border border-slate-700 bg-slate-950/50 p-5">
                <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                  <span className="rounded-md bg-cyan-950 text-cyan-200 px-2 py-1 font-semibold">{article.product}</span>
                  <span className="text-slate-400">{article.module}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{article.title}</h3>
                <p className="mt-2 text-slate-300">{article.summary}</p>
                <details className="group mt-4" key={`${article.id}-${query}-${product}-${module}`}>
                  <summary className="cursor-pointer text-conecta-cyan font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-conecta-cyan">Ver orientação</summary>
                  <div className="mt-4 space-y-4 text-slate-300">
                    <div><h4 className="font-semibold text-white mb-2">Quando consultar</h4><ul className="list-disc pl-5 space-y-2">{article.symptoms.map(s => <li key={s}>{s}</li>)}</ul></div>
                    <div><h4 className="font-semibold text-white mb-2">Orientação da fonte</h4><ol className="list-decimal pl-5 space-y-3">{article.steps.map(step => <li key={step}>{step}</li>)}</ol></div>
                    <p className="border-l-2 border-cyan-700 pl-3 text-sm">{article.note}</p>
                    <p className="text-sm text-slate-400">Versão: {article.version || 'não informada na base. Confirme a compatibilidade com seu ambiente.'}</p>
                    <p className="text-sm text-slate-400">Fonte consultada em {article.sourceCheckedAt.split('-').reverse().join('/')}. Resumo sem homologação no ambiente da empresa.</p>
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-conecta-cyan underline">Ler artigo oficial <ExternalLink size={16} aria-hidden="true" /><span className="sr-only">(nova aba)</span></a>
                  </div>
                </details>
              </article>)}
            </div>
          </>}
        </div>
      </div>
    </section>
  );
}
