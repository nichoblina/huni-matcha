/**
 * Next Huni Matcha pop-up(s)
 * Add every booked stall to HUNI_POPUPS, soonest first.
 * Catch us renders a card per live stall. The hero rotates them.
 *
 * Leave the list empty — or set comingSoon: true — for the Coming soon card.
 *
 * venue      — location name (shown large)
 * street     — street / area
 * date       — display date (e.g. "October 4–5")
 * until      — last day as YYYY-MM-DD; after that the stall drops off by itself
 * mapsUrl    — Google Maps search/link
 * ctaLabel   — Instagram button text
 * ctaHref    — venue Instagram
 * comingSoon — true to force Coming soon instead of a date
 */
window.HUNI_COMING_SOON = {
  label: "Next pop-up",
  title: "Coming soon",
  note: "No public stall date yet. Follow us on Instagram for updates when the next pop-up drops.",
  ctaLabel: "hunimatcha.cebu",
  ctaHref: "https://www.instagram.com/hunimatcha.cebu/",
  heroPlace: "Next pop-up",
  heroWhen: "Coming soon"
};

window.HUNI_POPUPS = [
  {
    venue: "Ukay Ta Bai",
    street: "Vibo Place Escario",
    date: "October 2–4 · 3PM – 11PM",
    until: "2026-10-04",
    mapsUrl: "https://maps.google.com/?q=Vibo%20Place%20Escario%20Cebu",
    ctaLabel: "hunimatcha.cebu",
    ctaHref: "https://www.instagram.com/hunimatcha.cebu/"
  },
  {
    venue: "Raketz Cebu 2026",
    street: "Ayala Center Cebu, Activity Center · Booth R7",
    date: "October 10–11 · Mall hours",
    until: "2026-10-11",
    mapsUrl: "https://maps.google.com/?q=Ayala%20Center%20Cebu%20Activity%20Center",
    ctaLabel: "hunimatcha.cebu",
    ctaHref: "https://www.instagram.com/hunimatcha.cebu/"
  },
  {
    venue: "USC Days",
    street: "University of San Carlos – Main Campus",
    date: "October 19–23 · 9AM – 5PM",
    until: "2026-10-23",
    mapsUrl: "https://maps.google.com/?q=University%20of%20San%20Carlos%20Main%20Campus%20Cebu",
    ctaLabel: "hunimatcha.cebu",
    ctaHref: "https://www.instagram.com/hunimatcha.cebu/"
  },
  {
    venue: "Burn Wellness x Temple of Leah",
    street: "Temple of Leah · Barre, Pilates, Yoga, and Art Workshops",
    date: "October 29–31 · 7AM – 7PM",
    until: "2026-10-31",
    mapsUrl: "https://maps.google.com/?q=Temple%20of%20Leah%20Cebu",
    ctaLabel: "hunimatcha.cebu",
    ctaHref: "https://www.instagram.com/hunimatcha.cebu/"
  }
];

(function () {
  var root = document.getElementById("next-popup");
  var soon = window.HUNI_COMING_SOON || {};

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function stillOn(item) {
    if (!item || item.comingSoon) return false;
    if (!item.until) return true;
    var end = new Date(String(item.until) + "T23:59:59");
    if (isNaN(end.getTime())) return true;
    return Date.now() <= end.getTime();
  }

  var list = (window.HUNI_POPUPS || []).filter(stillOn);
  var showSoon = !list.length;

  var igIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<rect x="3" y="3" width="18" height="18" rx="5"/>' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<circle cx="17.5" cy="6.5" r="0.7" fill="currentColor"/>' +
    "</svg>";

  var mapsIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/>' +
      '<circle cx="12" cy="10" r="2.4"/>' +
    "</svg>";

  function eventCard(item, index) {
    var label = index === 0 ? "Next pop-up" : "Then";
    var maps = item.mapsUrl
      ? '<a class="popup-ghost" href="' + esc(item.mapsUrl) + '" target="_blank" rel="noopener">' + mapsIcon + "Directions</a>"
      : "";
    var cta = item.ctaHref
      ? '<a class="btn-green" href="' + esc(item.ctaHref) + '" target="_blank" rel="noopener">' +
          igIcon + esc(item.ctaLabel || "Instagram") +
        "</a>"
      : "";
    return (
      '<article class="popup-card">' +
        '<p class="popup-label">' + label + "</p>" +
        "<h3>" + esc(item.venue) + "</h3>" +
        '<p class="popup-street">' + esc(item.street) + "</p>" +
        '<p class="popup-when">' + esc(item.date) + "</p>" +
        '<div class="popup-actions">' + maps + cta + "</div>" +
      "</article>"
    );
  }

  function renderSoon() {
    if (!root) return;
    root.innerHTML =
      '<article class="popup-card is-soon">' +
        '<p class="popup-label">' + esc(soon.label || "Next pop-up") + "</p>" +
        "<h3>" + esc(soon.title || "Coming soon") + "</h3>" +
        '<p class="popup-when">' + esc(soon.note || "") + "</p>" +
        '<div class="popup-actions">' +
          '<a class="btn-green" href="' + esc(soon.ctaHref || "https://www.instagram.com/hunimatcha.cebu/") + '" target="_blank" rel="noopener">' +
            igIcon + esc(soon.ctaLabel || "Instagram") +
          "</a>" +
        "</div>" +
      "</article>";
  }

  if (root) {
    if (showSoon) renderSoon();
    else root.innerHTML = list.map(eventCard).join("");
  }

  var heroPlace = document.getElementById("hero-popup-place");
  var heroWhen = document.getElementById("hero-popup-when");
  var heroBlock = document.getElementById("hero-popup");
  var i = 0;

  function paintHero() {
    if (!heroPlace) return;
    if (!list.length) {
      heroPlace.textContent = soon.heroPlace || "Next pop-up";
      if (heroWhen) heroWhen.textContent = soon.heroWhen || "Coming soon";
      return;
    }
    var p = list[i % list.length];
    heroPlace.textContent = p.venue;
    if (heroWhen) heroWhen.textContent = p.date || p.street || "";
  }

  paintHero();
  if (list.length > 1 && heroBlock) {
    setInterval(function () {
      heroBlock.classList.add("is-fading");
      setTimeout(function () {
        i = (i + 1) % list.length;
        paintHero();
        heroBlock.classList.remove("is-fading");
      }, 320);
    }, 5200);
  }
})();
