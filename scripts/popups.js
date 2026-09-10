/**
 * Next Huni Matcha pop-up(s)
 * Edit this list when the stall moves. The first item is featured as “next.”
 * Extra entries rotate in the hero (same idea as testimonials).
 *
 * venue     — location name (shown large)
 * street    — street / area
 * date      — when
 * mapsUrl   — Google Maps search/link
 * ctaLabel  — Instagram button text
 * ctaHref   — venue Instagram
 */
window.HUNI_POPUPS = [
  {
    venue: "Dynamic Herb Sports Complex",
    street: "Cebu South Coastal Road, Talisay",
    date: "September 12–13",
    mapsUrl: "https://maps.google.com/?q=Dynamic%20Herb%20Sports%20Complex%20Talisay%20Cebu",
    ctaLabel: "Dynamic Herb",
    ctaHref: "https://www.instagram.com/dynamicherbsports/"
  }
];

(function () {
  var root = document.getElementById("next-popup");
  if (!root) return;
  var next = (window.HUNI_POPUPS || [])[0];
  if (!next) return;

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

  var maps = next.mapsUrl
    ? '<a class="popup-ghost" href="' + esc(next.mapsUrl) + '" target="_blank" rel="noopener">' + mapsIcon + "Directions</a>"
    : "";

  root.innerHTML =
    '<p class="popup-label">Next pop-up</p>' +
    "<h3>" + esc(next.venue) + "</h3>" +
    '<p class="popup-street">' + esc(next.street) + "</p>" +
    '<p class="popup-when">' + esc(next.date) + "</p>" +
    '<div class="popup-actions">' +
      maps +
      '<a class="btn-green" href="' + esc(next.ctaHref) + '" target="_blank" rel="noopener">' +
        igIcon + esc(next.ctaLabel) +
      "</a>" +
    "</div>";

  var heroPlace = document.getElementById("hero-popup-place");
  var heroWhen = document.getElementById("hero-popup-when");
  var heroBlock = document.getElementById("hero-popup");
  var list = window.HUNI_POPUPS || [];
  var i = 0;

  function paintHero() {
    if (!heroPlace || !list.length) return;
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
