/**
 * Huni Matcha drinks
 * Add or edit entries in HUNI_DRINKS, then refresh. Menu, hero count,
 * and the Everyday Ritual carousel all read from this list.
 *
 * name       — card title
 * series     — "matcha" or "hojicha" (menu toggle)
 * desc       — one-line description
 * price      — number (shown as ₱) or a string
 * src        — image path in /images
 * label      — optional longer name for the carousel pill
 * featured   — true to include in Everyday Ritual
 * bestSeller — true to mark a drink; pill is off until SHOW_BEST_SELLERS is true
 */
window.HUNI_SHOW_BEST_SELLERS = false;
window.HUNI_DRINKS = [
  {
    name: "Cookie Butter",
    series: "matcha",
    desc: "Biscoff blended into creamy matcha, cookie crumble on top.",
    price: 260,
    src: "images/cookie-butter.jpg",
    label: "Cookie Butter Matcha",
    featured: true,
    bestSeller: true
  },
  {
    name: "Strawberry Foam",
    series: "matcha",
    desc: "Smooth latte under a sweet strawberry cloud.",
    price: 260,
    src: "images/strawberry-foam.jpg"
  },
  {
    name: "Coconut Cloud",
    series: "matcha",
    desc: "Light coconut foam over iced matcha.",
    price: 261,
    src: "images/coconut-cloud.jpg"
  },
  {
    name: "Iced Matcha Latte",
    series: "matcha",
    desc: "Classic iced matcha and creamy milk.",
    price: 230,
    src: "images/iced-latte.jpg",
    featured: true
  },
  {
    name: "Cereal Milk",
    series: "matcha",
    desc: "Cereal-sweet latte with a crunchy topping.",
    price: 261,
    src: "images/cereal-matcha.jpeg",
    label: "Cereal Milk Matcha",
    featured: true,
    bestSeller: true
  },
  {
    name: "Ube Foam",
    series: "matcha",
    desc: "Creamy matcha, smooth ube foam.",
    price: 250,
    src: "images/ube-foam.jpg"
  },
  {
    name: "Seasalt Matcha Latte",
    series: "matcha",
    desc: "Sea-salt cream for a sweet-and-salty finish.",
    price: 230,
    src: "images/seasalt-matcha.jpg",
    bestSeller: true
  },
  {
    name: "Classic Hojicha",
    series: "hojicha",
    desc: "Roasted, nutty, naturally rich.",
    price: 230,
    src: "images/classic-hojicha.jpg"
  },
  {
    name: "Seasalt Hojicha",
    series: "hojicha",
    desc: "Roasted hojicha under sea-salt foam.",
    price: 260,
    src: "images/seasalt-hojicha.jpg"
  },
  {
    name: "Cookie Butter Hojicha",
    series: "hojicha",
    desc: "Hojicha blended with Biscoff and cookie crumble.",
    price: 260,
    src: "images/cookie-butter-hojicha.jpg"
  }
];

(function () {
  var drinks = window.HUNI_DRINKS || [];

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function peso(price) {
    if (typeof price === "number" && isFinite(price)) return "₱" + price;
    return String(price || "");
  }

  function altText(drink) {
    return drink.label || drink.name || "Huni Matcha drink";
  }

  var count = document.getElementById("drink-count");
  if (count && drinks.length) count.textContent = String(drinks.length);

  var grid = document.getElementById("menu-grid");
  if (grid && drinks.length) {
    grid.innerHTML = drinks.map(function (drink) {
      var badge = window.HUNI_SHOW_BEST_SELLERS && drink.bestSeller
        ? '<span class="best-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.6 14.7 9l6.8.6-5.2 4.5 1.6 6.6L12 17.4 6.1 20.7l1.6-6.6L2.5 9.6 9.3 9z"/></svg>best-seller</span>'
        : "";
      return (
        '<article class="card" data-series="' + esc(drink.series) + '">' +
          '<div class="card-img">' +
            '<img src="' + esc(drink.src) + '" alt="' + esc(altText(drink)) + '" onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'ph\',textContent:\'photo\'}))" />' +
          "</div>" +
          "<div>" +
            '<div class="card-title"><h3>' + esc(drink.name) + "</h3>" + badge + "</div>" +
            '<p class="desc">' + esc(drink.desc) + "</p>" +
            '<p class="price">' + esc(peso(drink.price)) + "</p>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  var featured = drinks.filter(function (d) { return d.featured; });
  if (!featured.length) featured = drinks.slice(0, 3);
  if (!featured.length) return;

  var i = 0;
  var prevImg = document.querySelector('[data-pos="prev"] img');
  var currImg = document.querySelector('[data-pos="current"] img');
  var nextImg = document.querySelector('[data-pos="next"] img');
  var label = document.getElementById("ritual-name");
  var track = document.querySelector(".carousel-track");
  if (!prevImg || !currImg || !nextImg || !label || !track) return;

  function at(n) {
    return featured[(i + n + featured.length) % featured.length];
  }

  function render() {
    var prev = at(-1);
    var curr = at(0);
    var next = at(1);
    prevImg.src = prev.src;
    currImg.src = curr.src;
    currImg.alt = altText(curr);
    nextImg.src = next.src;
    label.textContent = curr.label || curr.name;
  }

  featured.forEach(function (d) {
    var p = new Image();
    p.src = d.src;
  });
  render();

  function go(step) {
    if (track.classList.contains("going-next") || track.classList.contains("going-prev")) return;
    track.classList.add(step > 0 ? "going-next" : "going-prev");
    setTimeout(function () {
      i = (i + step + featured.length) % featured.length;
      render();
      requestAnimationFrame(function () {
        track.classList.remove("going-next", "going-prev");
      });
    }, window.matchMedia("(min-width: 861px)").matches ? 200 : 320);
  }

  var prevSlide = document.querySelector('[data-pos="prev"]');
  var nextSlide = document.querySelector('[data-pos="next"]');
  if (prevSlide) prevSlide.addEventListener("click", function () { go(-1); });
  if (nextSlide) nextSlide.addEventListener("click", function () { go(1); });

  var startX = 0;
  track.addEventListener("touchstart", function (e) {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });

  setInterval(function () { go(1); }, 4500);
})();
