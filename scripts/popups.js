/**
 * Next Huni Matcha pop-up(s)
 * Edit HUNI_POPUPS when a stall is booked. The first item is featured as “next.”
 * Extra entries rotate in the hero (same idea as testimonials).
 *
 * Leave HUNI_POPUPS empty — or set comingSoon: true on an item — to show
 * the Coming soon card. Tweak copy in HUNI_COMING_SOON.
 *
 * venue     — location name (shown large)
 * street    — street / area
 * date      — when
 * mapsUrl   — Google Maps search/link
 * ctaLabel  — Instagram button text
 * ctaHref   — venue Instagram
 * comingSoon — true to force the Coming soon card instead of a date
 */
window.HUNI_COMING_SOON = {
  label: "Next pop-up",
  title: "Coming soon",
  note: "No public stall date yet. Follow us on Instagram for updates when the next pop-up drops.",
  ctaLabel: "hunimatcha.cebu",
  ctaHref: "https://www.instagram.com/hunimatcha.cebu/",
  heroPlace: "Coming soon",
  heroWhen: "Follow us on Instagram"
};

window.HUNI_POPUPS = [];

(function () {
  var root = document.getElementById("next-popup");
  var list = window.HUNI_POPUPS || [];
  var soon = window.HUNI_COMING_SOON || {};
  var next = list[0];
  var showSoon = !next || next.comingSoon;

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

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

  function renderSoon() {
    if (!root) return;
    root.classList.add("is-soon");
    root.innerHTML =
      '<p class="popup-label">' + esc(soon.label || "Next pop-up") + "</p>" +
      "<h3>" + esc(soon.title || "Coming soon") + "</h3>" +
      '<p class="popup-when">' + esc(soon.note || "") + "</p>" +
      '<div class="popup-actions">' +
        '<a class="btn-green" href="' + esc(soon.ctaHref || "https://www.instagram.com/hunimatcha.cebu/") + '" target="_blank" rel="noopener">' +
          igIcon + esc(soon.ctaLabel || "Instagram") +
        "</a>" +
      "</div>";
  }

  function renderEvent(item) {
    if (!root) return;
    root.classList.remove("is-soon");
    var maps = item.mapsUrl
      ? '<a class="popup-ghost" href="' + esc(item.mapsUrl) + '" target="_blank" rel="noopener">' + mapsIcon + "Directions</a>"
      : "";
    var cta = item.ctaHref
      ? '<a class="btn-green" href="' + esc(item.ctaHref) + '" target="_blank" rel="noopener">' +
          igIcon + esc(item.ctaLabel || "Instagram") +
        "</a>"
      : "";
    root.innerHTML =
      '<p class="popup-label">Next pop-up</p>' +
      "<h3>" + esc(item.venue) + "</h3>" +
      '<p class="popup-street">' + esc(item.street) + "</p>" +
      '<p class="popup-when">' + esc(item.date) + "</p>" +
      '<div class="popup-actions">' + maps + cta + "</div>";
  }

  if (root) {
    if (showSoon) renderSoon();
    else renderEvent(next);
  }

  var heroPlace = document.getElementById("hero-popup-place");
  var heroWhen = document.getElementById("hero-popup-when");
  var heroBlock = document.getElementById("hero-popup");
  var i = 0;
  var heroList = showSoon ? [] : list.filter(function (p) { return !p.comingSoon; });

  function paintHero() {
    if (!heroPlace) return;
    if (!heroList.length) {
      heroPlace.textContent = soon.heroPlace || "Coming soon";
      if (heroWhen) heroWhen.textContent = soon.heroWhen || "Next stall TBA";
      return;
    }
    var p = heroList[i % heroList.length];
    heroPlace.textContent = p.venue;
    if (heroWhen) heroWhen.textContent = p.date || p.street || "";
  }

  paintHero();
  if (heroList.length > 1 && heroBlock) {
    setInterval(function () {
      heroBlock.classList.add("is-fading");
      setTimeout(function () {
        i = (i + 1) % heroList.length;
        paintHero();
        heroBlock.classList.remove("is-fading");
      }, 320);
    }, 5200);
  }
})();
