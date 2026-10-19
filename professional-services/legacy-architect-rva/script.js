/* ─── LEGACY ARCHITECT RVA — script.js ─── */

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1200);
});

/* ─── CUSTOM CURSOR ─── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (dot && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .pillar-item, .faq-q').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 7-PILLAR ASSESSMENT ─── */
const pillarsData = [
  {
    num: '01', title: 'Digital Life',
    items: ['Primary email access', 'Password manager', 'Cloud storage', '2FA recovery keys', 'Social media access', 'Digital archives']
  },
  {
    num: '02', title: 'Finances',
    items: ['Bank account details', 'Investment accounts', 'Insurance policies', 'Debt and loan records', 'Subscription inventory', 'Beneficiary designations']
  },
  {
    num: '03', title: 'Household',
    items: ['Utility accounts', 'Property documents', 'Recurring payments', 'Maintenance contacts', 'Emergency procedures', 'Vehicle information']
  },
  {
    num: '04', title: 'Health',
    items: ['Primary care contacts', 'Insurance cards', 'Medication list', 'Medical history summary', 'Healthcare proxy', 'Specialist contacts']
  },
  {
    num: '05', title: 'Legal',
    items: ['Will location', 'Power of attorney', 'Trust documents', 'Vital records', 'Safe or lockbox access', 'Attorney contact']
  },
  {
    num: '06', title: 'Business',
    items: ['Business accounts', 'Key client contacts', 'Vendor list', 'Operational procedures', 'Partner agreements', 'Succession plan']
  },
  {
    num: '07', title: 'Legacy',
    items: ['Final wishes', 'Funeral preferences', 'Memorial guidance', 'Personal letters', 'Digital asset wishes', 'Charitable intentions']
  }
];

const totalItems = pillarsData.reduce((acc, p) => acc + p.items.length, 0);
let checkedCount = 0;

const pillarsGrid = document.getElementById('pillarsGrid');
const trackerFill = document.getElementById('trackerFill');
const trackerScore = document.getElementById('trackerScore');
const trackerTotal = document.getElementById('trackerTotal');
const assessmentResult = document.getElementById('assessmentResult');

if (trackerTotal) trackerTotal.textContent = totalItems;

function getResultText(count, total) {
  const pct = (count / total) * 100;
  if (pct === 0) return 'Start checking items to discover your gaps.';
  if (pct < 25) return 'Significant gaps. Your family would face real difficulty in a crisis.';
  if (pct < 50) return 'You\'ve made a start — but critical areas remain unprotected.';
  if (pct < 75) return 'Good progress. A few key gaps could still cause major disruption.';
  if (pct < 100) return 'You\'re close. Let\'s close the final gaps before they matter.';
  return 'Exceptional. Your family has the clarity they need.';
}

function updateTracker() {
  const pct = (checkedCount / totalItems) * 100;
  trackerFill.style.width = pct + '%';
  trackerScore.textContent = checkedCount;
  assessmentResult.textContent = getResultText(checkedCount, totalItems);
}

if (pillarsGrid) {
  pillarsData.forEach(pillar => {
    const card = document.createElement('div');
    card.className = 'pillar-card reveal';

    let itemsHTML = pillar.items.map(item => `
      <label class="pillar-item">
        <input type="checkbox" />
        <span class="check-box"></span>
        <span>${item}</span>
      </label>
    `).join('');

    card.innerHTML = `
      <div class="pillar-header">
        <span class="pillar-title">${pillar.title}</span>
        <span class="pillar-num">Pillar ${pillar.num}</span>
      </div>
      <div class="pillar-items">${itemsHTML}</div>
    `;

    card.querySelectorAll('.pillar-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') return;
        const cb = item.querySelector('input');
        cb.checked = !cb.checked;
        item.classList.toggle('checked', cb.checked);
        checkedCount += cb.checked ? 1 : -1;
        const allChecked = card.querySelectorAll('input:checked').length === pillar.items.length;
        card.classList.toggle('completed', allChecked);
        updateTracker();
      });
      item.querySelector('input').addEventListener('change', function() {
        item.classList.toggle('checked', this.checked);
        checkedCount += this.checked ? 1 : -1;
        const allChecked = card.querySelectorAll('input:checked').length === pillar.items.length;
        card.classList.toggle('completed', allChecked);
        updateTracker();
      });
    });

    pillarsGrid.appendChild(card);
    revealObserver.observe(card);
  });

  updateTracker();
}

/* ─── FAQ ACCORDION ─── */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ─── PARALLAX HERO ─── */
const heroBg = document.querySelector('.hero-bg-texture');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

/* ─── CURSOR HOVER REFRESH (for dynamic elements) ─── */
function refreshCursorTargets() {
  document.querySelectorAll('a, button, .pillar-item, .faq-q, .wp-item').forEach(el => {
    el.removeEventListener('mouseenter', addHover);
    el.removeEventListener('mouseleave', removeHover);
    el.addEventListener('mouseenter', addHover);
    el.addEventListener('mouseleave', removeHover);
  });
}
function addHover() { if (ring) ring.classList.add('hover'); }
function removeHover() { if (ring) ring.classList.remove('hover'); }
setTimeout(refreshCursorTargets, 1500);
