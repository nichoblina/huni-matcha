/**
 * Next Huni Matcha pop-up(s)
 * Add every booked stall to HUNI_POPUPS, soonest first.
 * Catch us shows one card at a time (manual pager). The hero rotates them.
 *
 * venue      — location name
 * street     — street / area
 * date       — display date
 * until      — last day YYYY-MM-DD; drops off after that
 * mapsUrl    — Google Maps
 * ctaHref    — Instagram or Facebook URL; omit for no social button
 * ctaLabel   — button text
 * ctaNetwork — "instagram" | "facebook" (guessed from the URL if omitted)
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
    ctaLabel: "ukaytabai.official",
    ctaHref: "https://www.instagram.com/ukaytabai.official/",
    ctaNetwork: "instagram"
  },
  {
    venue: "Raketz Cebu 2026",
    street: "Ayala Center Cebu, Activity Center · Booth R7",
    date: "October 10–11 · Mall hours",
    until: "2026-10-11",
    mapsUrl: "https://maps.google.com/?q=Ayala%20Center%20Cebu%20Activity%20Center",
    ctaLabel: "ZA Entertainment",
    ctaHref: "https://www.facebook.com/zaentertainmentprod",
    ctaNetwork: "facebook"
  },
  {
    venue: "USC Days",
    street: "University of San Carlos – Main Campus",
    date: "October 19–23 · 9AM – 5PM",
    until: "2026-10-23",
    mapsUrl: "https://maps.google.com/?q=University%20of%20San%20Carlos%20Main%20Campus%20Cebu"
  },
  {
    venue: "Burn Wellness x Temple of Leah",
    street: "Temple of Leah · Barre, Pilates, Yoga, and Art Workshops",
    date: "October 29–31 · 7AM – 7PM",
    until: "2026-10-31",
    mapsUrl: "https://maps.google.com/?q=Temple%20of%20Leah%20Cebu",
    ctaLabel: "thetempleofleah",
    ctaHref: "https://www.instagram.com/thetempleofleah/",
    ctaNetwork: "instagram"
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

  function networkOf(item) {
    if (item.ctaNetwork) return item.ctaNetwork;
    var href = String(item.ctaHref || "").toLowerCase();
    if (href.indexOf("facebook.com") !== -1) return "facebook";
    if (href.indexOf("instagram.com") !== -1) return "instagram";
    return "instagram";
  }

  var list = (window.HUNI_POPUPS || []).filter(stillOn);
  var showSoon = !list.length;
  var page = 0;

  var igIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<rect x="3" y="3" width="18" height="18" rx="5"/>' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<circle cx="17.5" cy="6.5" r="0.7" fill="currentColor"/>' +
    "</svg>";

  var fbIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">' +
      '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' +
    "</svg>";

  var mapsIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/>' +
      '<circle cx="12" cy="10" r="2.4"/>' +
    "</svg>";

  function socialButton(item) {
    if (!item.ctaHref) return "";
    var net = networkOf(item);
    var icon = net === "facebook" ? fbIcon : igIcon;
    var label = item.ctaLabel || (net === "facebook" ? "Facebook" : "Instagram");
    return (
      '<a class="btn-green" href="' + esc(item.ctaHref) + '" target="_blank" rel="noopener">' +
        icon + esc(label) +
      "</a>"
    );
  }

  function eventCard(item, index) {
    var label = index === 0 ? "Next pop-up" : "Then";
    var maps = item.mapsUrl
      ? '<a class="popup-ghost" href="' + esc(item.mapsUrl) + '" target="_blank" rel="noopener">' + mapsIcon + "Directions</a>"
      : "";
    return (
      '<article class="popup-card">' +
        '<p class="popup-label">' + label + "</p>" +
        "<h3>" + esc(item.venue) + "</h3>" +
        '<p class="popup-street">' + esc(item.street) + "</p>" +
        '<p class="popup-when">' + esc(item.date) + "</p>" +
        '<div class="popup-actions">' + maps + socialButton(item) + "</div>" +
      "</article>"
    );
  }

  function paintCatchUs() {
    if (!root || !list.length) return;
    root.innerHTML = eventCard(list[page], page) + pagerHtml();
    var status = root.querySelector(".popup-pager-status");
    if (status) status.textContent = (page + 1) + " / " + list.length;
    var prev = root.querySelector(".popup-prev");
    var next = root.querySelector(".popup-next");
    if (prev) {
      prev.disabled = page === 0;
      prev.addEventListener("click", function () { go(-1); });
    }
    if (next) {
      next.disabled = page === list.length - 1;
      next.addEventListener("click", function () { go(1); });
    }
  }

  function go(step) {
    var nextPage = page + step;
    if (nextPage < 0 || nextPage >= list.length) return;
    page = nextPage;
    paintCatchUs();
  }

  function pagerHtml() {
    if (list.length < 2) return "";
    return (
      '<div class="popup-pager" role="navigation" aria-label="Pop-up dates">' +
        '<button type="button" class="popup-prev" aria-label="Previous pop-up">' +
          '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' +
        "</button>" +
        '<span class="popup-pager-status" aria-live="polite"></span>' +
        '<button type="button" class="popup-next" aria-label="Next pop-up">' +
          '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>' +
        "</button>" +
      "</div>"
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
    if (showSoon) {
      renderSoon();
    } else {
      paintCatchUs();
      var startX = 0;
      root.addEventListener("touchstart", function (e) {
        startX = e.changedTouches[0].clientX;
      }, { passive: true });
      root.addEventListener("touchend", function (e) {
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      });
    }
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
