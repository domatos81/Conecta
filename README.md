# Portal Conecta Senior

Portal de acessos corporativos do Grupo Terca/Zilli, com Central de Ajuda para ERP G5, HCM e TMS.

A Central de Ajuda pesquisa uma base local e exibe orientações com fontes oficiais dentro do portal. Não requer chave Gemini ou qualquer API de IA. A base inicial contém nove artigos selecionados; não cobre toda a documentação em tempo real.

## Executar localmente

Requisito: Node.js 22.18 ou superior (Node 24 recomendado para executar os testes).

```sh
npm ci
npm run dev
```

## Verificar e compilar

```sh
npm test
npm run typecheck
npm run build
```

O build gera a pasta `dist`, pronta para a hospedagem atual. Veja [o guia da Central de Ajuda](docs/CENTRAL_AJUDA.md) para manter a base e [as instruções de implantação](INSTRUCOES_TI.md).

Projeto original no [AI Studio](https://aistudio.google.com/apps/eb730aba-1790-4c5e-89d5-142381367f8b). Um PR no GitHub não atualiza automaticamente o app publicado; importe/sincronize as alterações pelo fluxo adotado pela equipe.
