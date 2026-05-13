# Jana Nowack — Portfolio

Static website. No build step.

## Deploy on GitHub Pages

1. Create a new public repository on GitHub.
2. Upload the **contents** of this folder (not the folder itself):
   - `index.html`
   - `app.jsx`, `styles.css`, `data.js`, `tweaks-panel.jsx`
   - `images/` folder
3. Repo → **Settings → Pages**: Source = branch `main`, folder `/ (root)`. Save.
4. After ~1 minute your site is live at `https://<username>.github.io/<repo>/`.

## Local preview

Open `index.html` directly in a browser, or:

```bash
python3 -m http.server
```

then visit `http://localhost:8000`.

## Files

- `index.html` — entry point
- `app.jsx` — React app (transpiled at runtime by Babel Standalone)
- `data.js` — works, CV data
- `styles.css` — styling
- `tweaks-panel.jsx` — design tweak panel helpers
- `images/` — artwork JPGs
