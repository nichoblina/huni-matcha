/**
 * Photo host
 * Empty HUNI_MEDIA = load from this repo’s images/ folder (GitHub Pages / local).
 * After R2 is public, set it to the folder URL (trailing slash), e.g.
 *   "https://pub-xxxxxxxx.r2.dev/huni-matcha/"
 * Favicon, logos, and brand.png stay in the repo and are never rewritten.
 */
window.HUNI_MEDIA = "https://pub-93a605c79ac04785bf8fdddc3df010a8.r2.dev/huni-matcha/";

window.huniSrc = function (path) {
  var file = String(path || "").replace(/^images\//, "");
  var base = window.HUNI_MEDIA;
  if (!base) return "images/" + file;
  return base.replace(/\/?$/, "/") + file;
};

window.huniBindMedia = function () {
  if (!window.HUNI_MEDIA) return;
  var keep = /(favicon|apple-touch-icon|logo-hero|logo\.png|brand\.png)$/i;
  document.querySelectorAll("img[src^='images/']").forEach(function (img) {
    var src = img.getAttribute("src") || "";
    if (keep.test(src)) return;
    img.src = window.huniSrc(src);
  });
};
