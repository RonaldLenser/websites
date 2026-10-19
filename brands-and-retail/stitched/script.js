/* ============================================
   STITCHED — Premium JavaScript
   Cursor · Scroll · Animations · Form
============================================ */

(function () {
  'use strict';

  // ─── Preloader ───────────────────────────────
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('done');
      document.body.style.overflow = '';
      initReveal();
    }, 2000);
  });

  document.body.style.overflow = 'hidden';

  // ─── Custom Cursor ─────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      const speed = 0.1;
      followerX += (mouseX - followerX) * speed;
      followerY += (mouseY - followerY) * speed;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      raf = requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const hoverables = document.querySelectorAll('a, button, [data-hover]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        cursorFollower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        cursorFollower.classList.remove('hovering');
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });
  }

  // ─── Navigation ────────────────────────────
  const nav = document.getElementById('nav');
  const navHamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('[data-close]');

  let lastScrollY = 0;
  let ticking = false;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  // Mobile menu
  if (navHamburger && mobileMenu) {
    navHamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navHamburger.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navHamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll Reveal ──────────────────────────
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || '0';
          setTimeout(() => {
            el.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ─── Parallax Hero ────────────────────────
  const heroGradient = document.querySelector('.hero-gradient');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.65));
      }
      if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    }
  }, { passive: true });

  // ─── Marquee pause on hover ───────────────
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const strip = document.querySelector('.marquee-strip');
    if (strip) {
      strip.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
      });
      strip.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
      });
    }
  }

  // ─── Smooth Anchor Scroll ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Collection Card Hover Tilt ──────────
  const cards = document.querySelectorAll('.collection-card-inner');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
    });
    card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
  });

  // ─── Feature image parallax ───────────────
  const featureImgs = document.querySelectorAll('.feature-img');
  if (featureImgs.length) {
    window.addEventListener('scroll', () => {
      featureImgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.top < viewH && rect.bottom > 0) {
          const progress = (viewH - rect.top) / (viewH + rect.height);
          const shift = (progress - 0.5) * 40;
          img.style.backgroundPositionY = `calc(50% + ${shift}px)`;
        }
      });
    }, { passive: true });
  }

  // ─── Process Steps Stagger ────────────────
  // Already handled by CSS delay + IntersectionObserver

  // ─── Material Card Glow ───────────────────
  const materialCards = document.querySelectorAll('.material-card');
  materialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(122,28,46,0.07), transparent 60%), var(--dark)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ─── Commission Form ─────────────────────
  const form = document.getElementById('commissionForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form && formSuccess) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate submission (in production, connect to Netlify Forms or backend)
      setTimeout(() => {
        form.style.opacity = '0';
        form.style.transform = 'translateY(-20px)';
        form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
          form.style.display = 'none';
          formSuccess.classList.add('visible');
          formSuccess.style.opacity = '0';
          formSuccess.style.transform = 'translateY(20px)';
          formSuccess.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              formSuccess.style.opacity = '1';
              formSuccess.style.transform = 'translateY(0)';
            });
          });
        }, 500);
      }, 1500);
    });

    // Input label animations
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const label = input.previousElementSibling;
      if (!label) return;

      input.addEventListener('focus', () => {
        if (label) label.style.color = 'var(--maroon-bright)';
      });
      input.addEventListener('blur', () => {
        if (label) label.style.color = '';
      });
    });
  }

  // ─── Hero Badge animate in ────────────────
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    heroBadge.style.opacity = '0';
    setTimeout(() => {
      heroBadge.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroBadge.style.opacity = '1';
      heroBadge.style.transform = 'translateY(0)';
    }, 2200);
  }

  // ─── Scroll-triggered counter ─────────────
  // No fake stats — removed per brief

  // ─── Shoe style pill hover ───────────────
  const pills = document.querySelectorAll('.shoe-style-pill');
  pills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transition = 'border-color 0.3s ease, color 0.3s ease, background 0.3s ease';
    });
  });

  // ─── Collection card image depth ─────────
  const collectionCards = document.querySelectorAll('.collection-card-bg');
  collectionCards.forEach(bg => {
    const parent = bg.closest('.collection-card-inner');
    if (!parent) return;
    parent.addEventListener('mouseenter', () => {
      bg.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    });
  });

  // ─── Typing effect for hero eyebrow ───────
  const eyebrowSpans = document.querySelectorAll('.hero-eyebrow span:not(.eyebrow-line)');
  if (eyebrowSpans.length) {
    const el = eyebrowSpans[0];
    const text = el.textContent;
    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 40);
    // Start after preloader
    setTimeout(() => {
      clearInterval(typeInterval);
      el.textContent = text;
    }, 2100);
  }

  // ─── Philosophy image glow on scroll ─────
  const philImg = document.querySelector('.philosophy-img-frame');
  if (philImg) {
    window.addEventListener('scroll', () => {
      const rect = philImg.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = 1 - (rect.top / window.innerHeight);
        const glow = Math.min(progress * 0.4, 0.3);
        philImg.style.boxShadow = `0 0 ${80 * progress}px rgba(122, 28, 46, ${glow})`;
      }
    }, { passive: true });
  }

  // ─── Stagger feature lists ────────────────
  const featureLists = document.querySelectorAll('.feature-list');
  featureLists.forEach(list => {
    const items = list.querySelectorAll('li');
    const listObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, idx) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            item.style.transition = `opacity 0.5s ease ${idx * 0.08}s, transform 0.5s ease ${idx * 0.08}s`;
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, 100 + idx * 80);
          });
          listObserver.unobserve(list);
        }
      });
    }, { threshold: 0.2 });
    listObserver.observe(list);
  });

  // ─── Nav logo subtle animation ───────────
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        navLogo.style.letterSpacing = '0.35em';
      } else {
        navLogo.style.letterSpacing = '0.45em';
      }
    }, { passive: true });
  }

  // ─── Footer reveal ────────────────────────
  const footer = document.querySelector('.footer');
  if (footer) {
    const footerCols = footer.querySelectorAll('.footer-col, .footer-brand');
    const footerObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footerCols.forEach((col, idx) => {
            col.style.opacity = '0';
            col.style.transform = 'translateY(20px)';
            col.style.transition = `opacity 0.7s ease ${idx * 0.1}s, transform 0.7s ease ${idx * 0.1}s`;
            setTimeout(() => {
              col.style.opacity = '1';
              col.style.transform = 'translateY(0)';
            }, idx * 100);
          });
          footerObs.unobserve(footer);
        }
      });
    }, { threshold: 0.1 });
    footerObs.observe(footer);
  }

  // ─── Ambient sound note (no actual audio - just UX touch) ───
  // Disabled: no audio without explicit user interaction

  console.log('%c STITCHED ', 'background:#7a1c2e;color:#f4f0e8;font-size:14px;padding:4px 8px;letter-spacing:4px;font-family:Georgia,serif;', '\nBespoke Leather & Tailored Luxury\nHandcrafted. One of one.');

})();
