# Typography and spacing guide

This guide explains how to change text size and spacing without editing JavaScript.

Both wedding pages use the same [`styles.css`](./styles.css):

- Morning: `index.html`
- Dinner: `evening.html`

A change in `styles.css` normally affects both pages.

## Quick editing workflow on GitHub

1. Open `styles.css` in the GitHub repository.
2. Click the pencil icon to edit the file.
3. Search for the selector listed in the table below.
4. Change only the required CSS value.
5. Use **Preview changes** to review the diff.
6. Commit the change and wait for GitHub Pages to redeploy.
7. Check both page URLs on a phone and a computer.

## Text control map

| Text on the website | Search for this selector | Main setting |
| --- | --- | --- |
| Default HTML text | `body` | `font-size`, `line-height` |
| Countdown numbers | `.countdown__unit` | `font-size` |
| Countdown labels | `.countdown__unit strong` | percentage `font-size` |
| Normal outlined buttons | `.pill-button` | `font-size`, `padding` |
| Gallery title | `.gallery h2` | `font-size`, `margin` |
| RSVP Thai message | `.rsvp__copy` | `font-size`, `padding` |
| RSVP English message | `.rsvp__hope` | `font-size` |
| RSVP button | `.rsvp__copy .pill-button` | `font-size`, `line-height` |
| “The Venue” | `.venue__heading p` | `font-size`, `line-height` |
| Venue name | `.venue__heading h2` | `font-size`, `line-height` |
| Venue address | `.venue__address` | `font-size`, `line-height` |
| Bottom mobile navigation | `.mobile-nav__link` | `font-size`, `line-height` |
| Instagram icon | `.mobile-nav__link--instagram img` | `width`, `height` |

## Understanding `font-size`

Simple fixed size:

```css
.rsvp__hope {
  font-size: 1.25rem;
}
```

Increasing `1.25rem` to `1.5rem` makes the text 20% larger.

The base browser size is normally `1rem = 16px`:

| Value | Approximate size |
| --- | ---: |
| `0.75rem` | 12px |
| `1rem` | 16px |
| `1.25rem` | 20px |
| `1.5rem` | 24px |
| `2rem` | 32px |
| `3rem` | 48px |

English text uses Prompt. Live Thai text marked with `lang="th"` uses TF Srivichai. TF Srivichai
has smaller-looking letter shapes than many fonts, so the same CSS size can look smaller.

## Understanding the responsive breakpoints

The layout follows the original e-card's two breakpoints:

```css
@media (min-width: 550px) {
  /* Tablet and split-screen laptop rules */
}

@media (min-width: 850px) {
  /* Full laptop and desktop rules */
}
```

Base rules are the phone size. When changing a responsive element, check whether it also has a
550px or 850px override and adjust every size that should change.

## Changing Gallery and venue text

Current Gallery settings:

```css
.gallery h2 {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 22px;
}
```

- Change `font-size` to resize “Gallery”.
- Change the final `22px` in `margin` to alter the gap below the title.
- Gallery also changes to `1.5rem` at 550px and `2rem` at 850px.

Current venue settings:

```css
.venue__heading p {
  font-size: 1rem;
  line-height: 1.6;
}

.venue__heading h2 {
  font-size: 1rem;
  line-height: 1.6;
}
```

- `.venue__heading p` controls “The Venue”.
- `.venue__heading h2` controls the actual venue name.
- Both change to `1.2rem` at 850px, matching the source e-card.

To resize the map address below the map, add or change `font-size` here:

```css
.venue__address {
  font-size: 14px;
  line-height: 2.4;
}
```

The full-width Direction button has its own size:

```css
.pill-button--wide {
  font-size: 0.96rem;
  min-height: 38.4px;
}
```

## Changing RSVP text

The Thai message has a base mobile size and a desktop override.

Mobile and default size:

```css
.rsvp__copy {
  font-size: 1rem;
}
```

Tablet and desktop size inside `@media (min-width: 550px)`:

```css
.rsvp__copy {
  font-size: 1.2rem;
}
```

Change both values if the message should be larger on every screen.

The RSVP button has its own size:

```css
.rsvp__copy .pill-button {
  font-size: 1.2rem;
  line-height: 1.15;
}
```

From 550px upward, its larger responsive value is:

```css
.rsvp__copy .pill-button {
  font-size: 1.35rem;
}
```

## Changing countdown text

Countdown number size:

```css
.countdown__unit {
  font-size: 2.4rem;
}
```

Labels such as WEEKS, DAYS, and HOURS:

```css
.countdown__unit strong {
  font-size: 30%;
}
```

The number changes to `2.8224rem` at 550px and `3.36rem` at 850px. The label stays at 30% of the
number, so both scale together. Padding and `line-height` on `.countdown__unit` control the height
of the complete number-and-label block.

## Font and word spacing

These settings do different jobs:

```css
.example {
  font-size: 1.5rem;
  line-height: 1.4;
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
}
```

- `font-size` changes the size of the letters.
- `line-height` changes vertical space between lines.
- `letter-spacing` changes space between individual characters.
- `word-spacing` changes space between words.

For Thai text, adjust `line-height` first. Thai normally does not use spaces between every word,
so `word-spacing` has less effect than it does in English.

Recommended safe ranges:

| Property | Normal range |
| --- | --- |
| `line-height` for headings | `1.1`–`1.3` |
| `line-height` for paragraphs | `1.4`–`1.8` |
| `letter-spacing` | `-0.01em`–`0.04em` |
| `word-spacing` | `0`–`0.15em` |

## Space around text

Use the following properties instead of adding blank lines in HTML:

```css
.example {
  margin: 20px 0;
  padding: 10px 20px;
}
```

- `margin` is empty space outside an element.
- `padding` is empty space inside an element.
- `gap` controls space between children in a grid or flex layout.
- `padding-block` controls top and bottom space together.

Four-value order is always top, right, bottom, left:

```css
margin: 10px 20px 30px 40px;
```

Two-value order is vertical, horizontal:

```css
padding: 10px 20px;
```

## Mobile versus desktop rules

Base rules apply to every screen. Rules inside this block apply only to larger screens:

```css
@media (min-width: 550px) {
  /* Tablet and split-screen laptop settings */
}

@media (min-width: 850px) {
  /* Full laptop and desktop settings */
}
```

Rules inside this block apply only to phones and smaller tablets:

```css
@media (max-width: 849px) {
  /* Mobile-only settings */
}
```

If changing a base value appears to do nothing on a computer, search for the same selector inside
`@media (min-width: 850px)`. A later desktop rule may be overriding it.

## Text that is part of an image

CSS cannot change text baked into a PNG. These files contain image-based text:

- `assets/couple-heading.png`
- `assets/bride-name.png`
- `assets/groom-name.png`
- `assets/names.png`
- `assets/together.png`
- `assets/date.png`
- `assets/schedule-heading.png`
- `assets/schedule_morning.png`
- `assets/schedule_evening.png`
- `assets/rsvp-heading.png`

To change the font inside one of these, edit the source artwork and replace the PNG while keeping
the same filename and dimensions.

## Test before publishing

Start the local website:

```sh
npm run dev
```

Check both URLs:

- <http://localhost:4173/>
- <http://localhost:4173/evening.html>

Then validate JavaScript:

```sh
npm run check
```

After deployment, refresh the browser without cache if an old font size is still visible.
