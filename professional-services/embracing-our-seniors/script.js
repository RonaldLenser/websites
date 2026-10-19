/* =============================================
   EMBRACING OUR SENIORS — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);

    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 82;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== INTERSECTION OBSERVER — REVEAL ANIMATIONS =====
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger within same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let siblingIndex = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) siblingIndex = idx;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, siblingIndex * 90);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== WHO CARD STAGGERED REVEAL =====
  const whoCards = document.querySelectorAll('.who-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = Array.from(whoCards);
        const idx = cards.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 110);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  whoCards.forEach(card => cardObserver.observe(card));

  // ===== WHY FEATURE STAGGERED REVEAL =====
  const whyFeatures = document.querySelectorAll('.why-feature');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const features = Array.from(whyFeatures);
        const idx = features.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 100);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  whyFeatures.forEach(feat => featureObserver.observe(feat));

  // ===== ACCEPTING BANNER REVEAL =====
  const acceptingItems = document.querySelectorAll('.accepting-banner .reveal');
  const bannerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        bannerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  acceptingItems.forEach(item => bannerObserver.observe(item));

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // Add active nav style
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active:not(.nav-cta) { color: var(--green); background: var(--green-subtle); }`;
  document.head.appendChild(style);

  // ===== FORM SUBMISSION =====
  const form = document.getElementById('placementForm');
  const toast = document.getElementById('successToast');

  if (form) {
    form.addEventListener('submit', (e) => {
      // If Netlify handles submission, let it go through
      // This handles the thank-you state for demo/non-Netlify usage
      const isNetlify = form.hasAttribute('netlify') || form.hasAttribute('data-netlify');

      if (!isNetlify) {
        e.preventDefault();
      }

      // Show success toast
      setTimeout(() => {
        showToast();
        form.reset();
      }, isNetlify ? 0 : 300);
    });
  }

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // ===== PHONE NUMBER FORMATTING =====
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 10);
      if (val.length >= 6) {
        val = `(${val.substring(0,3)}) ${val.substring(3,6)}-${val.substring(6)}`;
      } else if (val.length >= 3) {
        val = `(${val.substring(0,3)}) ${val.substring(3)}`;
      }
      e.target.value = val;
    });
  }

  // ===== SUBTLE PARALLAX ON HERO PATTERN =====
  const heroBg = document.querySelector('.hero-bg-pattern');
  if (heroBg && window.matchMedia('(min-width: 820px)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }, { passive: true });
  }

  // ===== WHY-STAT HOVER MICRO-INTERACTION =====
  document.querySelectorAll('.why-stat').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      stat.querySelector('.why-stat-icon').style.transform = 'scale(1.2) rotate(-5deg)';
      stat.querySelector('.why-stat-icon').style.transition = '0.25s ease';
    });
    stat.addEventListener('mouseleave', () => {
      stat.querySelector('.why-stat-icon').style.transform = '';
    });
  });

  // ===== TRUST ITEM PULSE ON LOAD =====
  const trustItems = document.querySelectorAll('.trust-item');
  trustItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-12px)';
    item.style.transition = `opacity 0.5s ease ${0.9 + i * 0.15}s, transform 0.5s ease ${0.9 + i * 0.15}s`;
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 100);
  });

  // ===== WHO CARD ICON HOVER =====
  document.querySelectorAll('.who-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.who-icon');
      icon.style.transform = 'scale(1.08) rotate(-3deg)';
      icon.style.transition = '0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.who-icon');
      icon.style.transform = '';
    });
  });

});
