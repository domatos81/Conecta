# Central de Ajuda Senior

## Escopo desta versão

Pesquisa local com resultados e orientações no portal, para ERP G5, HCM e TMS. Não usa Gemini, OpenAI, embeddings, API de pesquisa ou chave de acesso. O navegador carrega `knowledge.json` do próprio site uma vez por montagem da central e faz as buscas em memória. O texto pesquisado não é transmitido nem salvo pelo componente.

A base inicial contém nove resumos originais de artigos oficiais da Senior (três por produto), com links para as fontes consultadas em 23/11/2026. Ela **não é uma cópia completa da documentação**, não realiza consultas ao vivo e não gera diagnósticos por IA. Os procedimentos não foram homologados no ambiente da empresa. As versões dos produtos ainda precisam ser confirmadas; por isso os artigos exibem versão não informada. Não preencher uma versão por suposição.

Hospedagem, tráfego e o restante do portal seguem as condições do ambiente escolhido. Ausência de API de IA não significa gratuidade ilimitada de infraestrutura. Não há inclusão de serviço pago nem mudança de hospedagem nesta implementação.

## Funcionamento

- `components/KnowledgeCenter.tsx`: campo de busca, exemplos por produto, filtros de produto e módulo, resultados expansíveis e tratamento de indisponibilidade.
- `lib/knowledge.ts`: normalização de acentos e códigos, sinônimos e classificação local. Códigos numéricos precisam corresponder exatamente; uma consulta sem correspondência não produz uma solução inventada.
- `public/knowledge.json`: base compartilhada, versionada e distribuída no mesmo deploy do portal. O caminho usa `BASE_URL` do Vite para suportar subpastas no IIS.
- `lib/knowledgeTypes.ts`: formato dos artigos e lista de produtos.

As pesquisas aproximam palavras e alguns sinônimos: não interpretam linguagem livre como um chatbot. O resultado indica uma orientação potencialmente relevante, não uma conclusão sobre a causa do problema.

## Acrescentar ou atualizar orientações

1. Consulte a documentação oficial ou a base de suporte, verificando produto, família e versão. Para TMS, confirme a linha usada pela empresa antes de ampliar o conteúdo.
2. Acrescente um objeto em `public/knowledge.json` seguindo os artigos existentes: `id` único, `product`, `module`, `title`, `summary`, `symptoms`, `keywords`, `steps`, `note`, `version`, `sourceUrl` e `sourceCheckedAt`.
3. Escreva um resumo próprio e curto. Preserve o vínculo com a fonte; não copie integralmente manuais ou artigos nem inclua conteúdo restrito. As fontes aceitas são HTTPS nos domínios `documentacao.senior.com.br` e `suporte.senior.com.br`.
4. `sourceCheckedAt` é a data real de consulta da fonte, não de homologação. Use `version: null` quando não confirmada. Registre ressalvas específicas em `note`.
5. Inclua mensagens de erro e códigos de tela em `keywords` e confira algumas buscas típicas. Para ampliar a base, atualize também o teste que verifica a quantidade inicial de artigos.
6. Execute `npm test`, `npm run typecheck` e `npm run build`. Publique a pasta `dist` na hospedagem atual.

Não foi acrescentado um editor de artigos ao Admin existente: os avisos atuais usam armazenamento local do navegador, que não compartilharia conteúdo entre colaboradores. Atualizar o JSON e publicar o portal atualiza a base para todos. Artigos com dados de RH, XMLs de produção ou informações internas não devem ser incorporados a essa base pública.

## Validação e implantação

Requer Node.js 22.18+ para o comando de testes com suporte nativo a TypeScript (validado em Node 24). Instale dependências com `npm ci`.

```sh
npm test
npm run typecheck
npm run build
npm run dev -- --host 127.0.0.1
```

Confira em desktop e celular: cada exemplo, filtro de produto, filtro de módulo, Limpar filtros, busca sem resultado, expansão por teclado e links oficiais. Em caso de JSON ausente ou inválido, a central deve oferecer nova tentativa e acesso à documentação, sem quebrar os acessos corporativos.

O build pode ser publicado na hospedagem atual conforme `INSTRUCOES_TI.md`. Um commit ou PR no GitHub não comprova que o AI Studio ou o site publicado recebeu a atualização. Importe/sincronize o código pelo fluxo adotado pela equipe e confira a central na URL final.
