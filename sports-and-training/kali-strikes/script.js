/* =====================================================
   KALI STRIKES DEFENSE CO.
   script.js
   ===================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------
     MOBILE NAV
  ------------------------------------------------------- */
  const toggle   = document.querySelector('.mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.classList.toggle('is-open', !isOpen);
      mobileNav.setAttribute('aria-hidden', String(isOpen));
    });

    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* -------------------------------------------------------
     FAQ ACCORDION
  ------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;

      // Close all others
      document.querySelectorAll('.faq-question').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = other.nextElementSibling;
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* -------------------------------------------------------
     STICKY HEADER SHADOW
  ------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 1px 0 rgba(237,227,207,0.05)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------
     WAITLIST FORM (simple email collect)
  ------------------------------------------------------- */
  var waitlistForm = document.querySelector('.waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = waitlistForm.querySelector('input[type="email"]');
      var submitBtn  = waitlistForm.querySelector('button[type="submit"]');
      if (!emailInput || !emailInput.value) return;

      var original = submitBtn.textContent;
      submitBtn.textContent = 'Added';
      submitBtn.disabled = true;
      emailInput.value = '';

      // Reset after 4s
      setTimeout(function () {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
      }, 4000);

      // TODO: wire to your email platform (Mailchimp, ConvertKit, etc.)
      // or add a Formspree/Web3Forms action to the form element
    });
  }

  /* -------------------------------------------------------
     INQUIRY FORM — success state
  ------------------------------------------------------- */
  var inquiryForm = document.querySelector('.inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function () {
      var btn = inquiryForm.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
    });
  }

  /* -------------------------------------------------------
     FOOTER YEAR
  ------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------
     SMOOTH SCROLL for anchor links (fallback for older browsers)
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerOffset = 72;
      var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
