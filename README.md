# Nawaporn & Pharuj wedding website

A self-contained, mobile-first wedding invitation based on the original Manita Wedding e-card.
It uses local copies of the couple's artwork and photos, so the published site does not depend on
the organizer's WordPress server.

The site content lives in [`fahmai-wedding/`](./fahmai-wedding/). The root
[`index.html`](./index.html) just redirects to it, and [`CNAME`](./CNAME) points the custom domain
at this repo.

## Run it locally

```sh
npm run dev
```

This starts `python3 -m http.server 4173` from the repo root. Then open:

- Morning celebration: <http://localhost:4173/fahmai-wedding/>
- Morning celebration alias: <http://localhost:4173/fahmai-wedding/morning.html>
- Dinner celebration: <http://localhost:4173/fahmai-wedding/evening.html>

For font sizes, line spacing, word spacing, and section spacing, see
[`TYPOGRAPHY_GUIDE.md`](./TYPOGRAPHY_GUIDE.md).

## Edit wedding information

Most frequently changed details are in
[`fahmai-wedding/wedding-config.js`](./fahmai-wedding/wedding-config.js):

- `weddingDate` controls the live countdown.
- `rsvpUrl` controls the RSVP button.
- `gallery` controls the photo carousel and its order.
- `instagramUrl` controls the black Instagram icon beside Location in the bottom navigation.
- `venues` controls both venue names, addresses, map embeds, and Google Maps links.

Dinner-only changes are in
[`fahmai-wedding/wedding-config-evening.js`](./fahmai-wedding/wedding-config-evening.js). The
dinner page inherits the shared gallery and contact details, then overrides its countdown, RSVP
link, and single venue.

The visual wedding date is still an artwork file. Replace it while keeping the same filename to
update it without touching the layout:

- `fahmai-wedding/assets/date.png`
- `fahmai-wedding/assets/schedule_morning.png` for the complete morning schedule artwork.

Update `fahmai-wedding/wedding.ics` (and `wedding-evening.ics`) at the same time if the date or
event description changes.

## Update the deployed website

The live site is served by GitHub Pages, built and deployed by the
[`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) GitHub Actions
workflow on every push to `main` (repository **Settings → Pages**, source `GitHub Actions`), at
the custom domain in `CNAME`: <https://www.seeu14nov26.site>.

To publish a change:

```sh
git add <files>
git commit -m "..."
git push origin main
```

The workflow runs automatically a minute or two after the push lands on `main` — no separate
deploy step or build process. Check progress under the repo's **Actions** tab (`Deploy Pages`).

`morning.html` redirects to the root morning page so there is only one source file to maintain.
