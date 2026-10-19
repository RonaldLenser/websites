/* KBA Audit & Advisory LLC — interactions */
(function () {
  'use strict';

  /* year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* nav scroll state */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  function closeMenu() {
    links.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* hero watermark parallax */
  var wm = document.querySelector('.hero-watermark');
  if (wm && window.matchMedia('(hover:hover)').matches) {
    window.addEventListener('scroll', function () {
      var off = window.scrollY * 0.12;
      wm.style.transform = 'translateY(' + off + 'px)';
    }, { passive: true });
  }

  /* custom cursor */
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(hover:hover)').matches) {
    var rx = 0, ry = 0, mx = 0, my = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,input,select,textarea,.svc,.pillar').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
    });
  }

  /* form submit via Web3Forms */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var btn = document.getElementById('submitBtn');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var key = form.querySelector('[name="access_key"]').value;
      if (!key || key === 'YOUR_WEB3FORMS_KEY_HERE') {
        note.textContent = 'Form is not connected yet. Add your Web3Forms key to go live.';
        note.className = 'form-note err';
        return;
      }
      var data = Object.fromEntries(new FormData(form));
      btn.disabled = true;
      var original = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      note.textContent = '';
      note.className = 'form-note';

      fetch('https://api.web3forms.com/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            form.reset();
            note.textContent = 'Thank you. Your request has been received and we will be in touch shortly.';
            note.className = 'form-note ok';
          } else {
            note.textContent = 'Something went wrong. Please try again or email us directly.';
            note.className = 'form-note err';
          }
        })
        .catch(function () {
          note.textContent = 'Network error. Please try again or email us directly.';
          note.className = 'form-note err';
        })
        .finally(function () {
          btn.disabled = false;
          btn.innerHTML = original;
        });
    });
  }
})();
