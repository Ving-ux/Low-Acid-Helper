# Low-Acid Food Helper

A fully static, no-API, iPhone-friendly progressive web app for quick LPR and low-acid food decisions.

## Privacy and architecture

- No backend or API calls
- No analytics, login, account, or tracking
- No OpenAI API key or other credentials
- Rule-based guidance runs entirely in the browser
- Trigger notes stay on the device in `localStorage`
- The optional follow-up prompt is copied only to the clipboard

## GitHub Pages deployment

The repository includes a GitHub Actions workflow that publishes the root as a static site whenever `main` changes.

1. Open the repository's **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the latest **Deploy static site to GitHub Pages** workflow run.
5. Open `https://ving-ux.github.io/Low-Acid-Helper/` in Safari on the iPhone.
6. Tap **Share**, then **Add to Home Screen**.

Future updates to `main` deploy automatically. The included `.nojekyll` file tells GitHub Pages to serve the static files as-is.

## iPhone support

- Uses a 180x180 Apple touch icon and PNG PWA icons
- Respects the notch, Dynamic Island, and Home indicator safe areas
- Uses 44-point minimum touch targets
- Prevents Safari input zoom with 16px form text
- Runs full-screen when launched from the Home Screen
- Caches the app shell for offline use

## Local use

Serve the repository root with any static web server, then open `index.html`. A local server is required to test service-worker installation and offline caching.

## Medical note

This is practical food guidance, not medical advice. LPR triggers vary. Follow your clinician's plan if it differs.
