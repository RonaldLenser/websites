/* =============================================
   BRIGHT RENOVATIONS LLC — script.js
   Premium Interactions & Animations
   ============================================= */

// ==================== NAV ====================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ==================== REVEAL ON SCROLL ====================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay;
      if (delay) {
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      } else {
        entry.target.classList.add('visible');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ==================== SMOOTH ANCHOR SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ==================== HERO PARALLAX ====================
const heroBoltL = document.querySelector('.hero-bolt-left');
const heroBoltR = document.querySelector('.hero-bolt-right');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBoltL) heroBoltL.style.transform = `translateY(${y * 0.15}px)`;
  if (heroBoltR) heroBoltR.style.transform = `translateY(${y * -0.1}px)`;
}, { passive: true });

// ==================== SERVICE CARD MICRO HOVER ====================
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-4px) rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==================== CONTACT FORM ====================
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending...
    `;
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Message Sent! We'll be in touch.
        `;
        btn.style.background = '#16a085';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 5000);
      } else {
        throw new Error('Submit failed');
      }
    } catch {
      btn.innerHTML = `Request a Callback: (571) 455-6686`;
      btn.style.background = '#e74c3c';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}

// ==================== SPINNER KEYFRAMES ====================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ==================== ACTIVE NAV LINK HIGHLIGHT ====================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ==================== TEAL CURSOR TRAIL (desktop only) ====================
if (window.matchMedia('(pointer: fine)').matches) {
  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(42,157,143,0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    transform: translate(-50%,-50%);
    mix-blend-mode: screen;
  `;
  document.body.appendChild(trail);

  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    trail.style.left = mx + 'px';
    trail.style.top = my + 'px';
    trail.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    trail.style.opacity = '0';
  });
}
