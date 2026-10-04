# Where to put new site data

Live page is `index.html` (GitHub Pages). Edit the matching file below, then refresh. Copy `melange.html` → `index.html` before you publish if you edited the page itself.

## Next pop-up — `scripts/popups.js`

**Booked stall:** put it in `HUNI_POPUPS`. The first item is the Catch us card. Extra items rotate in the hero.

```js
window.HUNI_POPUPS = [
  {
    venue: "Venue name",
    street: "Street, city",
    date: "October 4–5",
    mapsUrl: "https://maps.google.com/?q=Venue+Name+Cebu",
    ctaLabel: "Venue Instagram",
    ctaHref: "https://www.instagram.com/thevenue/"
  }
];
```

**No date yet:** leave `HUNI_POPUPS` empty (`[]`). Catch us and the hero switch to the Coming soon card.

Coming soon copy lives in `HUNI_COMING_SOON` in the same file (title, note, Instagram button). Hero reads **Next pop-up** / **Coming soon**. You can also force the card with `comingSoon: true` on a popup object.

## Drinks / menu — `scripts/drinks.js`

Add or edit objects in `HUNI_DRINKS`. The menu grid, hero drink count, and Everyday Ritual carousel all read this list.

| Field | What it does |
|---|---|
| `name` | Card title |
| `series` | `"matcha"` or `"hojicha"` (menu toggle) |
| `desc` | One-line description |
| `price` | Number (shown as ₱) |
| `src` | Photo path, e.g. `images/cookie-butter.jpg` |
| `label` | Optional longer name on the carousel pill |
| `featured` | `true` = Everyday Ritual rotator |
| `bestSeller` | Marks the drink; pill is off until `HUNI_SHOW_BEST_SELLERS` is `true` |

Drop new photos in `images/` and point `src` at the filename. After Cloudflare R2 is on, set `HUNI_MEDIA` in `scripts/media.js` to the public folder URL; drink cards, the carousel, and page photos (not logos/favicon) will load from there.

## Aftersips (reviews) — `scripts/testimonials.js`

Add objects to `HUNI_TESTIMONIALS`: `quote`, `name`, `source` (Instagram, Facebook, etc.). Quotes around the text are added for you.

## Still in the HTML

Kitchen hours, Guadalupe address, and the map are in `melange.html` / `index.html` under **Catch us** (`#find-us`). Contacts and social links are in the hero, Catch us, and footer.
