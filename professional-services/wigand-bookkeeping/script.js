/* ===================================================
   WIGAND BOOKKEEPING SERVICE LLC
   script.js
   =================================================== */

/* ── NAV SCROLL STATE ── */
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-section').forEach(el => {
  revealObserver.observe(el);
});

/* ── HERO IMMEDIATE REVEAL ── */
// Trigger hero elements right away
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal-up, .hero .reveal-scale');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 + i * 120);
  });
});

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navHeight = document.getElementById('nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── CYCLE STEP STAGGER ── */
const cycleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = entry.target.querySelectorAll('.cycle-step');
        steps.forEach((step, i) => {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
          }, i * 200);
        });
        cycleObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const approachCycle = document.querySelector('.approach-cycle');
if (approachCycle) {
  // Initialize hidden state
  approachCycle.querySelectorAll('.cycle-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(20px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  cycleObserver.observe(approachCycle);
}

/* ── SERVICE CARD HOVER LINE ── */
// Pure CSS handles this — no JS needed

/* ── PARALLAX HERO TEXT ── */
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual  = document.querySelector('.hero-visual');
  const scrollY = window.pageYOffset;

  if (scrollY < window.innerHeight && heroContent && heroVisual) {
    heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
    heroVisual.style.transform  = `translateY(${scrollY * 0.06}px)`;
  }
}, { passive: true });

/* ── VALUE ITEMS STAGGER ── */
const valueObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.value-item');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, i * 120);
        });
        valueObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const aboutValues = document.querySelector('.about-values');
if (aboutValues) {
  aboutValues.querySelectorAll('.value-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-16px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  valueObserver.observe(aboutValues);
}

/* ── STRIP COUNTER ANIMATION (simple fade stagger) ── */
const stripObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.strip-item').forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 150);
        });
        stripObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const strip = document.querySelector('.strip');
if (strip) stripObserver.observe(strip);
