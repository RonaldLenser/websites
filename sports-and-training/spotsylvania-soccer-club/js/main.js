// Nav toggle
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const sheet = document.querySelector('.nav__sheet');

if (toggle && nav && sheet) {
  toggle.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    sheet.style.display = !open ? 'block' : 'none';
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

// Intersection-observer reveals
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// Contact form — stub handler for plug-and-play template.
// Replace with your backend endpoint, Formspree, Netlify Forms, etc.
const form = document.querySelector('[data-form="contact"]');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[data-form-status]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    setTimeout(() => {
      if (status) {
        status.textContent = 'Thanks — we\'ll get back to you within 48 hours.';
        status.hidden = false;
      }
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = 'Send message'; }
    }, 600);
  });
}
