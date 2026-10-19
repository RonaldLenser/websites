/* =========================================
   Business Outcome Engineering — script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== CUSTOM CURSOR ========== */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
  }

  /* ========== GSAP REGISTER ========== */
  gsap.registerPlugin(ScrollTrigger);

  /* ========== NAVBAR SCROLL ========== */
  const navbar = document.getElementById('navbar');

  ScrollTrigger.create({
    start: 60,
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });

  /* ========== MOBILE MENU ========== */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ========== HERO ENTRANCE ========== */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('.hero-headline', { opacity: 1, y: 0, duration: 1, stagger: 0.05 }, '-=0.4')
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-body', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('.hero-scroll', { opacity: 1, duration: 0.8 }, '-=0.2');

  /* ========== PARALLAX ORBS ========== */
  gsap.to('.orb-1', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  gsap.to('.orb-2', {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });

  /* ========== SCROLL REVEAL HELPER ========== */
  function revealOnScroll(targets, vars = {}) {
    const defaults = {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: typeof targets === 'string' ? targets : targets[0],
        start: 'top 82%',
        toggleActions: 'play none none none',
      }
    };
    const merged = { ...defaults, ...vars };
    gsap.to(targets, merged);
  }

  /* ========== WHAT I DO ========== */
  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  gsap.to('.wid-left', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#what-i-do',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.wid-right', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.15,
    scrollTrigger: {
      trigger: '#what-i-do',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.feature-row', {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.glass-card-main',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  /* ========== TIERS ========== */
  gsap.to('.tiers-header', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#tiers',
      start: 'top 78%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.tier-card-1', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0,
    scrollTrigger: {
      trigger: '#tiers .grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.tier-card-2', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.14,
    scrollTrigger: {
      trigger: '#tiers .grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.tier-card-3', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.28,
    scrollTrigger: {
      trigger: '#tiers .grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    }
  });

  /* ========== PHILOSOPHY ========== */
  gsap.to('.quote-mark', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#philosophy',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.philo-quote', {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.15,
    scrollTrigger: {
      trigger: '#philosophy',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.philo-attr', {
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.4,
    scrollTrigger: {
      trigger: '#philosophy',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  // Parallax quote
  gsap.to('.philo-bg-text', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#philosophy',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  /* ========== CTA SECTION ========== */
  gsap.to('.cta-content', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 78%',
      toggleActions: 'play none none none',
    }
  });

  /* ========== SMOOTH ANCHOR SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== TIER CARD TILT ========== */
  document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 6;
      const tiltY = ((cx - x) / cx) * 6;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ========== MAGNETIC BUTTONS ========== */
  document.querySelectorAll('.primary-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });

  /* ========== ANIMATED GRID FADE ========== */
  gsap.to('.grid-bg', {
    opacity: 0.6,
    duration: 2,
    ease: 'power2.out',
    delay: 0.5,
  });

});
