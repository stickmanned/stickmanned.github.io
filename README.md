# stickmanned.github.io

My personal website, now built with Next.js and exported statically for GitHub Pages.

## Local preview

Use the Next.js dev server for everyday editing:

```powershell
npm.cmd run dev -- -H 127.0.0.1
```

Open http://localhost:3000 after the server starts.

The VS Code Live Server extension only serves static files by itself, so it cannot compile or hydrate a Next.js app. In this workspace Live Server is configured to proxy `http://127.0.0.1:3000`, which means `Go Live` will show the running Next.js dev server with React interactivity intact.

Start `npm.cmd run dev` first, then click `Go Live`.

If you want a static export preview instead, rebuild before using the generated `out/` folder:

```powershell
npm.cmd run build
```

On non-Windows shells, use `npm run dev` and `npm run build`.

## Legacy HTML

The root-level `.html` files and old route folders are kept for now as migration reference and legacy URL coverage. Do not use them for new site work; edit the Next.js files in `app/`, `components/`, and `lib/`.
