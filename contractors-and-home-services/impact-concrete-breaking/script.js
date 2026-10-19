/* ============================================================
   IMPACT CONCRETE BREAKING — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    var pre = document.getElementById("preloader");
    if (pre) setTimeout(function () { pre.classList.add("done"); }, 1150);
  });

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Custom cursor ---------- */
  var ring = document.getElementById("cursor");
  var dot = document.getElementById("cursorDot");
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (fine && ring && dot) {
    var rx = 0, ry = 0, dx = 0, dy = 0, tx = 0, ty = 0;
    document.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      dx += (tx - dx) * 0.85; dy += (ty - dy) * 0.85;
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      dot.style.transform = "translate(" + dx + "px," + dy + "px) translate(-50%,-50%)";
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    var big = document.querySelectorAll('a,button,[data-cursor="big"]');
    big.forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-big"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-big"); });
    });
  }

  /* ---------- Nav shrink ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 30) nav.classList.add("shrink");
    else nav.classList.remove("shrink");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Burger / mobile ---------- */
  var burger = document.getElementById("burger");
  var mobile = document.getElementById("mobile");
  function closeMenu() {
    if (!burger || !mobile) return;
    burger.classList.remove("open");
    mobile.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    mobile.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = burger.classList.toggle("open");
      mobile.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      mobile.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Card tilt ---------- */
  if (fine) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "translateY(-6px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 5).toFixed(2) + "deg)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---------- Subtle hero parallax ---------- */
  var heroBg = document.querySelector(".hero__bg");
  if (heroBg && fine) {
    window.addEventListener("scroll", function () {
      var off = window.scrollY * 0.12;
      heroBg.style.transform = "translateY(" + off + "px)";
    }, { passive: true });
  }
})();
