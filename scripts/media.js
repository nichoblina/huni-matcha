/**
 * Photo host
 * Empty HUNI_MEDIA = load from this repo’s images/ folder (same origin).
 * Do not point production at *.r2.dev — it is rate-limited and flakes on
 * iPhone Safari. If photos move to R2, use a custom domain on the bucket
 * (e.g. https://images.hunimatcha.com/huni-matcha/).
 * Favicon, logos, and brand.png stay in the repo and are never rewritten.
 */
window.HUNI_MEDIA = "";

window.huniSrc = function (path) {
  var file = String(path || "").replace(/^images\//, "");
  var base = window.HUNI_MEDIA;
  if (!base) return "images/" + file;
  return base.replace(/\/?$/, "/") + file;
};

window.huniImgError = function (img) {
  if (!img || img.dataset.huniFallback) return;
  img.dataset.huniFallback = "1";
  var src = img.getAttribute("src") || "";
  var file = src.replace(/^.*\//, "");
  if (!file) return;
  if (src.indexOf("images/") === 0) return;
  img.src = "images/" + file;
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
