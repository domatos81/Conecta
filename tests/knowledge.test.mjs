import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalize, parseKnowledgeBase, searchArticles } from '../lib/knowledge.ts';

const articles = parseKnowledgeBase(JSON.parse(readFileSync(new URL('../public/knowledge.json', import.meta.url), 'utf8')));

test('base inicial tem três artigos por produto e fontes oficiais distintas', () => {
  assert.equal(articles.length, 9);
  assert.equal(new Set(articles.map(a => a.sourceUrl)).size, 9);
  for (const product of ['ERP G5', 'HCM', 'TMS']) assert.equal(articles.filter(a => a.product === product).length, 3);
  assert.ok(articles.every(a => a.version === null));
});

test('normaliza acentuação, documento e código do eSocial', () => {
  assert.equal(normalize('REJEIÇÃO CT-e NF e S-2299'), 'rejeicao cte nfe s2299');
});

test('prioriza a rejeição exata e não apresenta números diferentes', () => {
  assert.deepEqual(searchArticles(articles, 'Rejeição 729').map(a => a.id), ['tms-rejeicao-729']);
  assert.equal(searchArticles(articles, 'rejeição 99999').length, 0);
  assert.equal(searchArticles(articles, 'rejeição 729', 'HCM').length, 0);
  assert.equal(searchArticles(articles, 'Rejeição 72').length, 0);
});

test('código de tela e evento independem de caixa e hífen', () => {
  assert.equal(searchArticles(articles, 'f000cwi')[0].id, 'erp-consulta-webservices');
  assert.equal(searchArticles(articles, 's2299')[0].id, 'hcm-rescisao-complementar');
  assert.equal(searchArticles(articles, 'S-2299')[0].id, 'hcm-rescisao-complementar');
});

test('pesquisa acentos, sinônimos e termos completos com contexto', () => {
  assert.equal(searchArticles(articles, 'licenca')[0].id, 'erp-licenca-tela');
  assert.equal(searchArticles(articles, 'reprocessar pendencias', 'HCM')[0].id, 'hcm-regerar-pendencias');
  assert.equal(searchArticles(articles, 'CT e documento em processamento', 'TMS')[0].id, 'tms-documento-processamento');
  assert.equal(searchArticles(articles, 'Consultar integração F000CWI', 'ERP G5')[0].id, 'erp-consulta-webservices');
});

test('filtros combinam produto e módulo e a busca vazia lista a base', () => {
  assert.equal(searchArticles(articles, '').length, 9);
  assert.equal(searchArticles(articles, '   ', 'HCM').length, 3);
  assert.equal(searchArticles(articles, '', 'ERP G5', 'Integrações').length, 1);
  assert.equal(searchArticles(articles, '', 'HCM', 'Integrações').length, 0);
});

test('não recomenda soluções para conteúdo desconhecido ou só palavras genéricas', () => {
  assert.equal(searchArticles(articles, 'impressora atolamento papel').length, 0);
  assert.equal(searchArticles(articles, 'como resolver um erro').length, 0);
});

test('validação rejeita conteúdo inválido e URLs fora dos domínios oficiais', () => {
  assert.throws(() => parseKnowledgeBase({}));
  assert.throws(() => parseKnowledgeBase([{ ...articles[0], product: 'Outro' }]));
  assert.throws(() => parseKnowledgeBase([{ ...articles[0], steps: [] }]));
  assert.throws(() => parseKnowledgeBase([{ ...articles[0], version: undefined }]));
  assert.throws(() => parseKnowledgeBase([{ ...articles[0], sourceUrl: 'javascript:alert(1)' }]));
  assert.throws(() => parseKnowledgeBase([{ ...articles[0], sourceUrl: 'https://suporte.senior.com.br.exemplo.com/' }]));
  assert.throws(() => parseKnowledgeBase([{ ...articles[0], sourceUrl: 'http://suporte.senior.com.br/' }]));
  assert.throws(() => parseKnowledgeBase([articles[0], articles[0]]));
});
