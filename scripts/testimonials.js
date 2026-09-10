/**
 * Huni Matcha testimonials
 * Add or edit entries in HUNI_TESTIMONIALS, then refresh the page.
 * quote  — the review text (quotes are added for you)
 * name   — first name or handle
 * source — where it came from (Cebu, Instagram, Facebook, etc.)
 */
window.HUNI_TESTIMONIALS = [
  {
    quote: "i love it! it's just so good. the matcha and milkiness are perfectly balanced.",
    name: "Anna",
    source: "Facebook"
  },
  {
    quote: "it was my first time trying your drinks and all i can say is worth it!",
    name: "Phoebe",
    source: "Instagram"
  },
  {
    quote: "Matcha so good, had to get another one!",
    name: "Bella",
    source: "Instagram"
  },
  {
    quote: "Not a matcha expert, but I enjoyed it :)",
    name: "Migs",
    source: "Facebook"
  },
];

(function () {
  var root = document.getElementById("quotes");
  if (!root) return;

  var items = window.HUNI_TESTIMONIALS || [];
  if (!items.length) return;

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function card(item) {
    var source = item.source ? " · " + esc(item.source) : "";
    return (
      '<blockquote class="quote">' +
        "<p>“" + esc(item.quote) + "”</p>" +
        "<cite>" + esc(item.name) + source + "</cite>" +
      "</blockquote>"
    );
  }

  var html = items.map(card).join("");
  root.innerHTML = '<div class="quotes-track">' + html + html + "</div>";
})();
