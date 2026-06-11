# Low-Acid Food Helper

A fully static, no-API, iPhone-friendly progressive web app for quick LPR and low-acid food decisions.

## Privacy and architecture

- No backend or API calls
- No analytics, login, account, or tracking
- No OpenAI API key or other credentials
- Rule-based guidance runs entirely in the browser
- Trigger notes stay on the device in `localStorage`
- The optional follow-up prompt is copied only to the clipboard

## GitHub Pages

The repository root is ready to publish directly with GitHub Pages.

1. Open the repository's **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder.
5. Open the published URL in Safari on the iPhone.
6. Tap **Share**, then **Add to Home Screen**.

The included `.nojekyll` file tells GitHub Pages to serve the static files as-is.

## Local use

Serve the repository root with any static web server, then open `index.html`. A local server is required to test service-worker installation and offline caching.

## Medical note

This is practical food guidance, not medical advice. LPR triggers vary. Follow your clinician's plan if it differs.
