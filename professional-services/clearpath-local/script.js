/* ====== ClearPathLocal ====== */
(function () {
  "use strict";

  /* preloader */
  window.addEventListener("load", function () {
    var p = document.getElementById("preloader");
    setTimeout(function () { p.classList.add("done"); }, 550);
  });

  /* year */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* nav scroll state */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() { burger.classList.remove("open"); menu.classList.remove("open"); document.body.style.overflow = ""; }
  burger.addEventListener("click", function () {
    var open = burger.classList.toggle("open");
    menu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        var sibs = Array.prototype.slice.call(el.parentElement.querySelectorAll(":scope > .reveal"));
        var idx = sibs.indexOf(el);
        el.style.transitionDelay = (idx > -1 ? Math.min(idx, 6) * 0.08 : 0) + "s";
        el.classList.add("in");
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* animate hero rank card + process path when in view */
  var trigger = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); trigger.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".rank-card,.path-wrap").forEach(function (el) { trigger.observe(el); });

  /* custom cursor */
  var dot = document.getElementById("cursorDot");
  var ring = document.getElementById("cursorRing");
  if (window.matchMedia("(hover:hover)").matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", function (ev) {
      mx = ev.clientX; my = ev.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a,button,input,textarea,.svc-card,.step,.prop-item").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("grow"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("grow"); });
    });
  }

  /* magnetic buttons */
  document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
    btn.addEventListener("mousemove", function (e) {
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      btn.style.transform = "translate(" + x * 0.18 + "px," + y * 0.28 + "px)";
    });
    btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
  });

  /* subtle hero parallax */
  var glow = document.querySelector(".hero-glow");
  if (glow) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight) glow.style.transform = "translateY(" + y * 0.25 + "px)";
    }, { passive: true });
  }

  /* form feedback */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var key = form.querySelector('[name="access_key"]').value;
      if (key === "YOUR_WEB3FORMS_KEY_HERE") {
        e.preventDefault();
        alert("Form is ready. Add your Web3Forms access key to start receiving leads.");
      }
    });
  }
})();
