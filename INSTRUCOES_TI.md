# Guia de Implantação - Portal Conecta Senior

Este guia destina-se à equipe de TI para realizar o deploy do Portal Conecta nos servidores internos (IIS ou Nginx).

## Pré-requisitos
- Node.js instalado no ambiente de build (versão 18 ou superior recomendada).

## Passo 1: Instalação e Build
Na pasta raiz do projeto, execute os seguintes comandos no terminal/PowerShell:

```bash
# 1. Instalar dependências
npm install

# 2. Gerar versão de produção
npm run build
```

## Passo 2: O que foi gerado?
Após o comando acima, será criada uma pasta chamada **`dist`**. Esta pasta contém todos os arquivos estáticos (HTML, JS, CSS) prontos para uso.

Conteúdo típico da pasta `dist`:
- `index.html`
- `assets/` (arquivos javascript e css compilados)

## Passo 3: Hospedagem (IIS - Internet Information Services)

1. **Criar Site ou Aplicação:**
   - Abra o Gerenciador do IIS.
   - Crie um novo Site ou adicione uma Aplicação a um site existente (ex: Default Web Site).
   - Aponte o **Caminho Físico** para a pasta `dist` gerada no Passo 1.

2. **Permissões:**
   - Certifique-se de que o usuário `IIS_IUSRS` tenha permissão de Leitura na pasta `dist`.

3. **URL Rewrite (Opcional/Recomendado):**
   - Como é uma SPA (Single Page Application), se for necessário suportar rotas profundas no futuro, instale o módulo "URL Rewrite" e adicione um `web.config` na raiz da pasta `dist`. (Para esta versão atual, isso não é estritamente necessário pois é uma página única).

## Passo 4: Distribuição via GPO (Opcional)
Após o site estar online (ex: `http://servidor-web/portal`), você pode criar uma GPO para:
1. Adicionar um atalho na Área de Trabalho dos usuários.
2. Definir como Página Inicial dos navegadores corporativos.

## Notas Técnicas
- O projeto utiliza **Vite** para build.
- A configuração `base: './'` no `vite.config.ts` foi definida para permitir que o site rode tanto na raiz (`/`) quanto em subpastas (`/portal`) sem quebrar os links de assets.
