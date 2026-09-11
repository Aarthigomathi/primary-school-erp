# Bright Future – Primary School ERP

React + Vite single-page app. Data is stored in the browser (localStorage) – no backend needed.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # output in dist/
npm run preview    # test the production build
```

## Demo logins
| Portal  | Email                    | Password   |
|---------|--------------------------|------------|
| Admin   | admin@school.demo        | admin123   |
| Teacher | priya@school.demo        | teacher123 |

## Deploy
- **Vercel**: import the GitHub repo → framework *Vite* → Deploy. (`vercel.json` included)
- **Netlify**: import repo → build `npm run build`, publish `dist`. (`netlify.toml` included)
- **GitHub Pages**: Settings → Pages → Source *GitHub Actions*. The workflow in `.github/workflows/deploy-pages.yml` deploys on every push to `main`.
- **Any static host / cPanel**: run `npm run build` and upload the contents of `dist/`.
