# Low-Acid Food Helper

A fully static, no-API, iPhone-friendly progressive web app for reflux-sensitive food decisions and personal symptom notes.

## Features

- Guided meal, snack, grocery-store, and flare-up suggestions
- Preference filters for vegetarian, dairy-free, gluten-free, lower-fat, and extra-gentle ideas
- Built-in searchable guide covering common foods and drinks
- Personal favorites and "works for me" or "avoid for me" ratings
- Structured symptom journal with timing, severity, and notes
- Private JSON backup, restore, and CSV export
- Standard, large, and extra-large text settings
- Optional higher-contrast display
- Native iPhone sharing and Home Screen installation
- Offline app shell after the first successful load

## Privacy and architecture

- No backend or API calls
- No analytics, login, account, or tracking code
- No OpenAI API key or other credentials
- Guidance and filtering run entirely in the browser
- Preferences, ratings, and journal entries stay in `localStorage`
- Optional resource links open only after the user taps them
- External websites have their own privacy policies

## GitHub Pages deployment

The repository includes a GitHub Actions workflow that publishes the root whenever `main` changes. GitHub Free supports this deployment while the repository is public.

1. Open the repository's **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the live site at `https://ving-ux.github.io/Low-Acid-Helper/` in Safari.
5. Tap **Share**, then **Add to Home Screen**.

The included `.nojekyll` file tells GitHub Pages to serve the static files as-is.

## Medical note

This app describes common food patterns and personal observations. It does not diagnose reflux, prove that a food caused symptoms, or replace care from a qualified clinician.
