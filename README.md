# Nawaporn & Pharuj wedding website

A self-contained, mobile-first wedding invitation based on the original Manita Wedding e-card.
It uses local copies of the couple's artwork and photos, so the published site does not depend on
the organizer's WordPress server.

## Preview locally

```sh
npm run dev
```

Then open <http://localhost:4173>.

- Morning celebration: <http://localhost:4173/>
- Dinner celebration: <http://localhost:4173/evening.html>

For font sizes, line spacing, word spacing, and section spacing, see
[`TYPOGRAPHY_GUIDE.md`](./TYPOGRAPHY_GUIDE.md).

## Edit wedding information

Most frequently changed details are in [`wedding-config.js`](./wedding-config.js):

- `weddingDate` controls the live countdown.
- `rsvpUrl` controls the RSVP button.
- `gallery` controls the photo carousel and its order.
- `instagramUrl` controls the black Instagram icon beside Location in the bottom navigation.
- `venues` controls both venue names, addresses, map embeds, and Google Maps links.

Dinner-only changes are in [`wedding-config-evening.js`](./wedding-config-evening.js). The dinner
page inherits the shared gallery and contact details, then overrides its countdown, RSVP link, and
single venue.

The visual wedding date is still an artwork file. Replace it while keeping the same filename to
update it without touching the layout:

- `assets/date.png`
- `assets/schedule_morning.png` for the complete morning schedule artwork.

Update `wedding.ics` at the same time if the date or event description changes.

## Publish with GitHub Pages

In the repository settings, open **Pages**, choose **Deploy from a branch**, then select the branch
and `/ (root)`. All links are relative, so the site works from a project subdirectory.
