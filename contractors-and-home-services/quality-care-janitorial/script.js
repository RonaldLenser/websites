/* ========================================
   QUALITY CARE JANITORIAL SERVICES
   script.js
   ======================================== */

// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('nav');
function handleNavScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ---- MOBILE BURGER MENU ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ---- STAGGERED SERVICE CARDS ----
const serviceCards = document.querySelectorAll('.service-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0');
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 110);
      cardObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -20px 0px'
});

serviceCards.forEach(card => cardObserver.observe(card));

// ---- PILLAR STAGGER ----
const pillars = document.querySelectorAll('.pillar');
const pillarObserver = new IntersectionObserver((entries) => {
  let delay = 0;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, delay);
      delay += 100;
      pillarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

pillars.forEach(p => {
  p.style.opacity = '0';
  p.style.transform = 'translateX(20px)';
  p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  pillarObserver.observe(p);
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- HERO SUBTLE PARALLAX ----
const heroGlow = document.querySelector('.hero-glow');
const heroGrid = document.querySelector('.hero-grid');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroGlow) {
    heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.15}px)`;
  }
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
}, { passive: true });

// ---- CTA BUTTON PULSE ----
// Subtle attention pulse on primary CTAs after 4 seconds of inactivity
let inactivityTimer;
const primaryCTAs = document.querySelectorAll('.btn-primary');

function addPulse() {
  primaryCTAs.forEach(btn => btn.classList.add('pulse'));
  setTimeout(() => {
    primaryCTAs.forEach(btn => btn.classList.remove('pulse'));
  }, 1500);
}

function resetTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(addPulse, 5000);
}

['scroll', 'mousemove', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, resetTimer, { passive: true });
});
resetTimer();

// Add pulse keyframe via JS
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  .btn-primary.pulse {
    animation: ctaPulse 0.8s ease-in-out;
  }
  @keyframes ctaPulse {
    0% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.5); }
    50% { box-shadow: 0 0 0 16px rgba(201, 168, 76, 0); }
    100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0); }
  }
`;
document.head.appendChild(pulseStyle);
