# Tikblox — Inteligência de Produtos Virais

Dashboard **dark premium** em português para descobrir produtos com potencial
viral, calcular margem/lucro e organizar favoritos — construído como **PWA
offline-first**, responsivo e pronto para deploy em `tikblox.com.br`.

> ⚠️ **Estado atual**: reconstrução inicial do zero. Toda a camada de dados
> (produtos, fornecedores, diagnóstico de mercado) é **mockada** e vive em
> `src/data/mockProducts.ts`, isolada da UI para facilitar a troca por uma API
> real no futuro (veja [Integrando dados reais](#integrando-dados-reais)).

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`, sem `tailwind.config`)
- [React Router](https://reactrouter.com/) (rotas client-side)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (manifest + service worker via Workbox)
- [oxlint](https://oxc.rs/) para lint

## Funcionalidades implementadas

- **Navegação**: Todos os Produtos, Ondas Iniciais, Alta Margem, Calculadora e
  Favoritos (sidebar no desktop, bottom navigation no mobile).
- **Busca e filtros** por nome/tag, nicho e origem do produto.
- **Cards de produto** com score viral, custo, venda sugerida e margem calculada.
- **Detalhe do produto**: diagnóstico de mercado (pontos fortes, riscos,
  público-alvo, sazonalidade, concorrência), lista de fornecedores, plano de
  ação em passos e compartilhamento (Web Share API com fallback de copiar link).
- **Calculadora de lucro/margem**: custo, frete, taxas de plataforma/gateway,
  lucro líquido, margem % e ROI.
- **Favoritos** persistidos em `localStorage` (funcionam offline).
- **Onboarding de 3 passos**, exibido uma única vez (estado salvo em `localStorage`).
- **PWA offline-first**: manifest, ícones (192/512, incluindo variantes
  maskable) e service worker com `autoUpdate` + cache de imagens.

## Rodando localmente

Pré-requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. Para testar o comportamento de PWA/instalação
localmente, gere um build e sirva-o (o dev server não registra o service
worker por padrão):

```bash
npm run build
npm run preview
```

### Scripts disponíveis

| Comando           | Descrição                                   |
| ------------------ | -------------------------------------------- |
| `npm run dev`       | Ambiente de desenvolvimento com HMR           |
| `npm run build`     | Type-check (`tsc -b`) + build de produção     |
| `npm run preview`   | Serve o build de produção localmente          |
| `npm run lint`      | Lint com oxlint                               |

## Variáveis de ambiente

Nenhuma variável é **obrigatória** hoje, pois todos os dados são mockados.
Nenhuma chave/segredo deve ser commitada no repositório. Para a integração
futura com uma API real, crie um arquivo `.env.local` (já ignorado pelo git)
seguindo `.env.example`:

```bash
cp .env.example .env.local
```

| Variável              | Uso                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| `VITE_API_BASE_URL`     | Base URL da futura API de produtos/fornecedores                   |
| `VITE_ANALYTICS_ID`     | ID de analytics (ex.: Plausible/GA), opcional                     |

Qualquer chave secreta (tokens de API, credenciais de fornecedor, etc.) deve
ficar **apenas** em variáveis de ambiente do provedor de hospedagem — nunca no
código-fonte ou em arquivos versionados.

## Integrando dados reais

A UI nunca importa `mockProducts.ts` diretamente — todo acesso passa por
`src/data/productsRepository.ts` (`fetchProducts`, `fetchProductById`,
`getAllNiches`, `getAllOrigins`, `calcularMargem`). Para plugar uma API real:

1. Troque a implementação interna dessas funções por chamadas `fetch`/SDK,
   mantendo as assinaturas e os tipos em `src/types/product.ts`.
2. Se os campos da API divergirem, adicione uma camada de mapeamento dentro
   do repositório (não na UI).
3. Remova/mantenha `mockProducts.ts` apenas como fixture de testes/dev.

## Estrutura de pastas

```
src/
  components/   Layout, cards, filtros, onboarding, badges — UI reutilizável
  context/      Contexto de favoritos (estado global + localStorage)
  data/         Camada de dados: mock, repositório e calculadora
  hooks/        useLocalStorage, useOnboarding, useFavorites
  pages/        Páginas roteadas (produtos, detalhe, calculadora, 404)
  types/        Contratos de domínio (Product, Supplier, etc.)
  utils/        Formatação (moeda, percentual, números)
public/
  icons/        Ícones do PWA (192/512 + maskable)
  favicon.svg, robots.txt
```

## Deploy e checklist para `tikblox.com.br`

O projeto gera um build estático (`dist/`), compatível com qualquer host
estático/CDN (Vercel, Netlify, Cloudflare Pages, GitHub Pages com domínio
próprio, S3+CloudFront, etc.).

1. **Build de produção**
   ```bash
   npm install
   npm run build
   ```
   O resultado fica em `dist/` (inclui `index.html`, assets, `manifest.webmanifest`, `sw.js`).

2. **Escolher o host** e publicar o conteúdo de `dist/` como site estático.
   - Configure o **SPA fallback** para `index.html` em rotas desconhecidas
     (necessário para `/produto/:id`, `/calculadora`, etc. funcionarem em
     acesso direto/refresh).

3. **Domínio `tikblox.com.br`**
   - [ ] Criar/validar o registro do domínio no registrador (registro.br).
   - [ ] Apontar o domínio para o host escolhido:
     - Registro `A`/`ALIAS`/`CNAME` conforme instruções do provedor (ex.: Vercel/Netlify fornecem um CNAME ou IPs fixos).
     - Configurar também o subdomínio `www.tikblox.com.br` (redirect para o domínio raiz ou vice-versa).
   - [ ] Emitir/validar certificado **HTTPS** (a maioria dos hosts acima faz isso automaticamente via Let's Encrypt).
   - [ ] Confirmar que `manifest.webmanifest` é servido com `Content-Type: application/manifest+json` (ou `application/json`) e que `sw.js` é servido a partir da raiz do domínio (necessário para escopo `"/"` do service worker).
   - [ ] Testar a instalação do PWA em Android (Chrome) e o "Adicionar à tela de início" no iOS (Safari).
   - [ ] Validar carregamento **offline** (DevTools → Application → Service Workers → Offline) após a primeira visita.
   - [ ] Configurar variáveis de ambiente de produção no host **antes** de trocar os dados mockados por uma API real.
   - [ ] Revisar `robots.txt`/indexação conforme a estratégia de SEO desejada.

> Este checklist não requer acesso a nenhuma conta externa para ser seguido —
> as ações de DNS/registrador e configuração do host devem ser feitas
> manualmente pelo responsável pelo domínio.

## Próximo passo recomendado

Publicar o build gerado (`npm run build` → pasta `dist/`) no host estático
escolhido e seguir o checklist de domínio acima para apontar
`tikblox.com.br`.
