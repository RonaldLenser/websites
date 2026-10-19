/* ═══════════════════════════════════════════════════════════════
   HONEY'S CAFÉ & SOCIAL™ — script.js
   Handles: custom cursor · scroll reveal · nav · form · parallax
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // CUSTOM CURSOR (desktop only)
  // ─────────────────────────────────────────────
  if (window.innerWidth > 900) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cur-dot';
    ring.className = 'cur-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    const hoverTargets = 'a, button, .cafe__card, .suite-card__inner, .vtag, .vcard';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('big');
        ring.classList.add('big');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('big');
        ring.classList.remove('big');
      });
    });

    // Hide on leave, show on enter
    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '';
      ring.style.opacity = '';
    });
  }


  // ─────────────────────────────────────────────
  // NAVIGATION — scroll shadow + hamburger
  // ─────────────────────────────────────────────
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 48);
    highlightNavLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });


  // ─────────────────────────────────────────────
  // SCROLL REVEAL — IntersectionObserver
  // ─────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => entry.target.classList.add('vis'), delay);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -56px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // ─────────────────────────────────────────────
  // SMOOTH SCROLL — anchor links
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '76',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ─────────────────────────────────────────────
  // HERO PARALLAX — orbs drift on scroll
  // ─────────────────────────────────────────────
  const orbs = document.querySelectorAll('.hero__orb');
  if (orbs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.14;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }


  // ─────────────────────────────────────────────
  // VENDOR CARD STACK — mouse parallax
  // ─────────────────────────────────────────────
  const stack = document.querySelector('.vendor-stack');
  if (stack) {
    const vcards = stack.querySelectorAll('.vcard');
    stack.addEventListener('mousemove', e => {
      const r  = stack.getBoundingClientRect();
      const cx = (e.clientX - r.left - r.width  / 2) / r.width;
      const cy = (e.clientY - r.top  - r.height / 2) / r.height;
      vcards.forEach((card, i) => {
        const f = (i + 1) * 7;
        card.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
      });
    });
    stack.addEventListener('mouseleave', () => {
      vcards.forEach(card => { card.style.transform = ''; });
    });
  }


  // ─────────────────────────────────────────────
  // ACTIVE NAV LINK highlight on scroll
  // ─────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav__links a:not(.nav__cta-link)');

  function highlightNavLink() {
    const scrollMid = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollMid >= top && scrollMid < bottom) {
        navAs.forEach(a => {
          const active = a.getAttribute('href') === `#${sec.id}`;
          a.style.color = active ? 'var(--gold-dk)' : '';
        });
      }
    });
  }


  // ─────────────────────────────────────────────
  // CONTACT FORM — success state
  // ─────────────────────────────────────────────
  const form    = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const successMsg  = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Brief loading state
      submitBtn.textContent = 'Sending…';
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'Send Inquiry';
        submitBtn.style.pointerEvents = '';
        submitBtn.style.opacity = '';
        successMsg.classList.add('show');

        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }, 1200);
    });
  }


  // ─────────────────────────────────────────────
  // CAFÉ CARDS — staggered delay setup
  // ─────────────────────────────────────────────
  document.querySelectorAll('.cafe__card').forEach((card, i) => {
    card.dataset.delay = String(i * 110);
  });


  // ─────────────────────────────────────────────
  // SUITE CARDS — staggered delay
  // ─────────────────────────────────────────────
  document.querySelectorAll('.reveal-left, .reveal-right').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = String(i * 80);
  });


  // ─────────────────────────────────────────────
  // UTIL: Re-trigger cursor hover for dynamic
  // elements (called after DOM mutations if any)
  // ─────────────────────────────────────────────
  window.__honeyRefreshCursor = function () {
    if (window.innerWidth <= 900) return;
    const dot  = document.querySelector('.cur-dot');
    const ring = document.querySelector('.cur-ring');
    if (!dot || !ring) return;
    document.querySelectorAll('a, button, .cafe__card, .suite-card__inner, .vtag, .vcard').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('big'); ring.classList.add('big'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('big'); ring.classList.remove('big'); });
    });
  };

})();
