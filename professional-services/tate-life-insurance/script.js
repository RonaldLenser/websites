// Replace with client's actual Web3Forms access key before deploy
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__link");
const heroParticles = document.getElementById("hero-particles");
const parallaxBg = document.querySelector(".hero__parallax--bg");
const parallaxGrain = document.querySelector(".hero__parallax--grain");
const parallaxCross = document.querySelector(".hero__parallax--cross");
const heroForm = document.getElementById("hero-form");
const heroFormBody = document.getElementById("hero-form-body");
const heroFormStatus = document.getElementById("hero-form-status");

const SECTION_IDS = ["hero", "coverage", "about", "why-insurance", "contact"];

const onScrollNav = () => {
  if (!header) return;
  if (window.scrollY >= 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

const closeMobileMenu = () => {
  if (!navToggle || !navMenu) return;
  navToggle.classList.remove("is-open");
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  document.body.style.overflow = "";
};

const toggleMobileMenu = () => {
  if (!navToggle || !navMenu) return;
  const open = navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
};

const initNavToggle = () => {
  if (!navToggle || !navMenu) return;
  navToggle.addEventListener("click", () => toggleMobileMenu());
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        closeMobileMenu();
      }
    });
  });
};

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = header ? header.offsetHeight : 0;
      const extra = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - extra;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  });
};

const initReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = el.getAttribute("data-delay");
        if (delay !== null) {
          el.style.setProperty("--reveal-delay", `${delay}ms`);
        }
        el.classList.add("visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => observer.observe(el));
};

const runHeroStagger = () => {
  const steps = [
    { sel: '[data-hero-step="1"]', delay: 150, mod: "from-left" },
    { sel: '[data-hero-step="2"]', delay: 300, mod: null },
    { sel: '[data-hero-step="3"]', delay: 450, mod: null },
    { sel: '[data-hero-step="4"]', delay: 600, mod: null },
    { sel: '[data-hero-step="5"]', delay: 750, mod: null },
    { sel: '[data-hero-step="6"]', delay: 900, mod: null },
    { sel: '[data-hero-step="7"]', delay: 1050, mod: null },
    { sel: '[data-hero-step="8"]', delay: 1200, mod: null },
    { sel: '[data-hero-step="9"]', delay: 1350, mod: "from-right" },
  ];
  steps.forEach(({ sel, delay, mod }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (mod) el.classList.add(`hero-animate--${mod}`);
    window.setTimeout(() => {
      el.classList.add("is-visible");
    }, delay);
  });
};

const initParticles = () => {
  if (!heroParticles) return;
  const count = 40;
  for (let i = 0; i < count; i += 1) {
    const p = document.createElement("div");
    p.className = "particle";
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = 15 + Math.random() * 20;
    const op = 0.2 + Math.random() * 0.4;
    p.style.left = `${x}%`;
    p.style.top = `${y}%`;
    p.style.opacity = String(op);
    p.style.animationDuration = `${dur}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    heroParticles.appendChild(p);
  }
};

let parallaxTicking = false;
const updateParallax = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    parallaxTicking = false;
    return;
  }
  const y = window.scrollY;
  if (parallaxBg) {
    parallaxBg.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
  }
  if (parallaxGrain) {
    parallaxGrain.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
  }
  if (parallaxCross) {
    parallaxCross.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
  }
  parallaxTicking = false;
};

const onParallaxScroll = () => {
  if (parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(updateParallax);
};

const initParallax = () => {
  updateParallax();
  window.addEventListener("scroll", onParallaxScroll, { passive: true });
};

const initActiveNav = () => {
  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;
  const map = new Map(
    sections.map((sec) => [sec.id, document.querySelector(`.nav__link[data-section="${sec.id}"]`)])
  );
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const id = visible[0].target.id;
      navLinks.forEach((l) => l.classList.remove("is-active"));
      const link = map.get(id);
      if (link) link.classList.add("is-active");
    },
    { rootMargin: "-25% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] }
  );
  sections.forEach((sec) => observer.observe(sec));
};

const magneticRadius = 80;
const initMagnetic = () => {
  document.querySelectorAll(".magnetic-target").forEach((btn) => {
    btn.addEventListener(
      "mousemove",
      (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > magneticRadius) {
          btn.style.transform = "";
          return;
        }
        const pull = (magneticRadius - dist) / magneticRadius;
        const mx = dx * 0.12 * pull;
        const my = dy * 0.12 * pull;
        btn.style.transform = `translate(${mx}px, ${my}px)`;
      },
      { passive: true }
    );
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
};

const initHeroForm = () => {
  if (!heroForm || !heroFormBody || !heroFormStatus) return;
  heroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    heroFormStatus.textContent = "";
    heroFormStatus.classList.remove("is-success", "is-error");

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "YOUR_ACCESS_KEY_HERE") {
      heroFormStatus.textContent = "Form is not configured yet. Add your Web3Forms access key in script.js.";
      heroFormStatus.classList.add("is-error");
      return;
    }

    const name = heroFormBody.querySelector('[name="name"]')?.value?.trim();
    const phone = heroFormBody.querySelector('[name="phone"]')?.value?.trim();
    const interest = heroFormBody.querySelector('[name="interest"]')?.value;
    const message = heroFormBody.querySelector('[name="message"]')?.value?.trim() || "";

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: "Tate Life Insurance — New Lead",
      name,
      phone,
      interest,
      message,
      botcheck: "",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        heroFormBody.hidden = true;
        heroFormStatus.textContent = "✓ Message received! Art will reach out within 24 hours.";
        heroFormStatus.classList.add("is-success");
      } else {
        heroFormStatus.textContent = data.message || "Something went wrong. Please try again.";
        heroFormStatus.classList.add("is-error");
      }
    } catch {
      heroFormStatus.textContent = "Network error. Please try again or call directly.";
      heroFormStatus.classList.add("is-error");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.nav__link[data-section="hero"]')?.classList.add("is-active");
  initNavToggle();
  initSmoothScroll();
  initReveal();
  initParticles();
  initParallax();
  initActiveNav();
  initMagnetic();
  initHeroForm();
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    runHeroStagger();
  } else {
    document.querySelectorAll(".hero-animate").forEach((el) => el.classList.add("is-visible"));
  }
});
