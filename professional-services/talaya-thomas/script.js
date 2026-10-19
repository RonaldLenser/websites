/* ============================================
   TALAYA THOMAS | Licensed Insurance Agent
   script.js — Premium Interactions
   ============================================ */

(function () {
  'use strict';

  /* ========== PRELOADER ========== */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    setTimeout(() => {
      preloader.classList.add('hidden');
      initHeroAnimations();
    }, 2000);
  });

  /* ========== CUSTOM CURSOR ========== */
  const cursor = document.getElementById('cursor');
  const cursorOuter = document.getElementById('cursorOuter');
  if (cursor && cursorOuter && window.innerWidth > 768) {
    let mx = -100, my = -100;
    let ox = -100, oy = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    function animateCursorOuter() {
      ox += (mx - ox) * 0.14;
      oy += (my - oy) * 0.14;
      cursorOuter.style.left = ox + 'px';
      cursorOuter.style.top  = oy + 'px';
      requestAnimationFrame(animateCursorOuter);
    }
    animateCursorOuter();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorOuter.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorOuter.style.opacity = '1';
    });
  }

  /* ========== PARTICLE CANVAS ========== */
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size  = Math.random() * 1.6 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha  = Math.random() * 0.5 + 0.1;
      this.pulse  = Math.random() * Math.PI * 2;
      this.pulseSpeed = (Math.random() * 0.01) + 0.005;
    }
    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;
      this.currentAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse));
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    };
    Particle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.currentAlpha;
      ctx.fillStyle = '#c9a547';
      ctx.shadowColor = '#c9a547';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    function initParticles() {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
      particles = [];
      for (let i = 0; i < count; i++) { particles.push(new Particle()); }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(animId); }
      else { animateParticles(); }
    });
  }

  /* ========== NAVIGATION ========== */
  const nav = document.getElementById('nav');
  function handleNavScroll() {
    if (window.scrollY > 60) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Smooth nav link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== MOBILE MENU ========== */
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');
  const menuClose    = document.getElementById('menuClose');
  const menuBackdrop = document.getElementById('menuBackdrop');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger)    hamburger.addEventListener('click', openMobileMenu);
  if (menuClose)    menuClose.addEventListener('click', closeMobileMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMobileMenu);

  /* ========== HERO STAGGER ANIMATIONS ========== */
  function initHeroAnimations() {
    const heroEls = [
      document.querySelector('.hero-eyebrow'),
      document.querySelector('.hero-headline'),
      document.querySelector('.hero-sub'),
      document.querySelector('.hero-body'),
      document.querySelector('.hero-actions'),
      document.querySelector('.hero-pills'),
    ];
    heroEls.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 140 + 100);
    });

    // Hero right
    const heroRight = document.querySelector('.agent-frame');
    if (heroRight) {
      setTimeout(() => {
        heroRight.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
        heroRight.style.opacity = '1';
        heroRight.style.transform = 'translateX(0)';
      }, 500);
    }
  }

  /* ========== SCROLL REVEAL ========== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || 0);
        setTimeout(() => { el.classList.add('revealed'); }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* ========== CARD TILT ========== */
  const tiltCards = document.querySelectorAll('.coverage-card, .program-card');
  if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const rx = (e.clientY - cy) / rect.height * -8;
        const ry = (e.clientX - cx) / rect.width  *  8;
        card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  /* ========== VALUE STRIP PAUSE ON HOVER ========== */
  const stripInner = document.querySelector('.value-strip-inner');
  if (stripInner) {
    stripInner.addEventListener('mouseenter', () => {
      stripInner.style.animationPlayState = 'paused';
    });
    stripInner.addEventListener('mouseleave', () => {
      stripInner.style.animationPlayState = 'running';
    });
  }

  /* ========== BUTTON RIPPLE ========== */
  document.querySelectorAll('.btn-gold, .nav-cta, .menu-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.3);
        width:4px; height:4px;
        top:${y}px; left:${x}px;
        transform:translate(-50%,-50%) scale(0);
        animation:rippleAnim 0.6s ease-out forwards;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes rippleAnim {
      to { transform: translate(-50%,-50%) scale(60); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  /* ========== FLOAT CTA VISIBILITY ========== */
  const floatCta = document.querySelector('.float-cta');
  if (floatCta) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 300) {
        floatCta.style.opacity = '1';
        floatCta.style.transform = 'scale(1)';
      } else {
        floatCta.style.opacity = '0';
        floatCta.style.transform = 'scale(0.8)';
      }
      lastScroll = y;
    }, { passive: true });
    floatCta.style.transition = 'opacity 0.4s, transform 0.4s, box-shadow 0.3s';
    floatCta.style.opacity = '0';
    floatCta.style.transform = 'scale(0.8)';
  }

  /* ========== ACTIVE NAV LINK HIGHLIGHT ========== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  const activeStyle = document.createElement('style');
  activeStyle.textContent = `.nav-link.active { color: var(--gold-light) !important; }
    .nav-link.active::after { transform: scaleX(1) !important; }`;
  document.head.appendChild(activeStyle);

})();
