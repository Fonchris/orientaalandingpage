# Orientaa landing page

React, TypeScript, Vite, Tailwind CSS, and shadcn-compatible UI components for the Orientaa university recommendation app.

## Deploy to Vercel

Import this repository into Vercel. The included `vercel.json` configures:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites so client-side routes resolve correctly

No environment variables are required for the current landing page.

## Google Search Console

The site is prepared for indexing with `robots.txt`, `sitemap.xml`, a canonical URL, Open Graph metadata, and Organization structured data. A blog is not required for Search Console or for Google to index the landing page.

After deploying the site to Vercel and connecting `orientaa.com`:

1. Open [Google Search Console](https://search.google.com/search-console) and choose **Add property**.
2. Choose **Domain** and enter `orientaa.com` without `https://`.
3. Google will show a DNS TXT record. Add that record at the DNS provider managing `orientaa.com`.
4. Return to Search Console and click **Verify**. DNS changes can take some time to propagate.
5. Open **Sitemaps**, enter `sitemap.xml`, and click **Submit**.
6. Use **URL inspection** for `https://orientaa.com/` and request indexing after the domain is verified.

The expected public files are:

- `https://orientaa.com/robots.txt`
- `https://orientaa.com/sitemap.xml`

To verify locally before deploying:

```bash
npm run build
npm run preview
```

## Development

```bash
npm install
npm run dev
```

## Project structure

- `src/components/ui`: shadcn-style reusable components
- `src/App.tsx`: landing page composition
- `src/App.css` and `src/index.css`: page and global styles
- `vercel.json`: Vercel build and SPA routing configuration

## Original Vite notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
