/* ============================================
   TANIA HOME HEALTH SERVICES
   Premium Script — Animations & Interactions
   ============================================ */

'use strict';

// ============ CUSTOM CURSOR ============
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let rafId;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  const ease = 0.14;
  ringX += (mouseX - ringX) * ease;
  ringY += (mouseY - ringY) * ease;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  rafId = requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand ring on interactive elements
const interactives = document.querySelectorAll('a, button, input, select, textarea, .service-card, .pkg-card, .policy-card, .about-col');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width = '52px';
    cursorRing.style.height = '52px';
    cursorRing.style.opacity = '0.25';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.opacity = '0.6';
  });
});


// ============ NAV SCROLL ============
const nav = document.getElementById('mainNav');

function handleNavScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


// ============ HAMBURGER / MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  toggleMenu(menuOpen);
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    toggleMenu(false);
  });
});

function toggleMenu(open) {
  if (open) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}


// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


// ============ HERO PARALLAX ============
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');

function heroParallax() {
  const scrollY = window.scrollY;
  if (heroBg && scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
  }
}

window.addEventListener('scroll', heroParallax, { passive: true });


// ============ SMOOTH ACTIVE NAV LINK ============
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sTop = section.offsetTop;
    const sH = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= sTop && scrollY < sTop + sH) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--gold-light)';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });


// ============ CONTACT FORM HANDLING ============
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('span');
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        contactForm.reset();
        formSuccess.classList.add('show');
        btnText.textContent = 'Sent!';
        setTimeout(() => {
          btnText.textContent = 'Send My Request';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }, 3500);
      } else {
        btnText.textContent = 'Try Again';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    } catch (err) {
      btnText.textContent = 'Try Again';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
}


// ============ CARD TILT EFFECT (desktop only) ============
function initTilt() {
  if (window.innerWidth < 768) return;

  const tiltCards = document.querySelectorAll('.pkg-card, .about-col');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

initTilt();


// ============ STAGGER CHILDREN ON LOAD ============
function staggerOnLoad() {
  const heroItems = document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-sub, .hero-actions, .hero-contact');
  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.75s ease, transform 0.75s ease`;
    el.style.transitionDelay = `${i * 120 + 200}ms`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 120 + 300);
  });
}

document.addEventListener('DOMContentLoaded', staggerOnLoad);


// ============ MARQUEE PAUSE ON HOVER ============
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}


// ============ SMOOTH HASH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ============ MICRO-INTERACTIONS: Service Card Hover ============
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.service-card-icon');
    if (icon) {
      icon.style.transform = 'scale(1.08) rotate(-3deg)';
      icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('.service-card-icon');
    if (icon) {
      icon.style.transform = '';
    }
  });
});


// ============ CONTACT ITEM MICRO-INTERACTION ============
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
  const icon = item.querySelector('.contact-item-icon');
  item.addEventListener('mouseenter', () => {
    if (icon) {
      icon.style.transform = 'scale(1.1)';
      icon.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  });
  item.addEventListener('mouseleave', () => {
    if (icon) icon.style.transform = '';
  });
});


// ============ CLEANUP ON UNLOAD ============
window.addEventListener('unload', () => {
  cancelAnimationFrame(rafId);
});
