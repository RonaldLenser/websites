/* ============================================================
   THE PLUGG EV — script.js
   ============================================================ */

// CUSTOM CURSOR
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .why-card, .pillar, .vstat, .who-card, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });
}

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// MOBILE MENU
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// PROGRESS BARS
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.vstat-bar-fill').forEach(fill => fill.classList.add('animated'));
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const statGrid = document.querySelector('.vision-stat-grid');
if (statGrid) barObserver.observe(statGrid);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(contactForm) });
      const json = await res.json();
      if (json.success) { contactForm.style.display = 'none'; formSuccess.style.display = 'block'; }
      else { btn.textContent = 'Send Message →'; btn.disabled = false; alert('Something went wrong. Please try again.'); }
    } catch { btn.textContent = 'Send Message →'; btn.disabled = false; alert('Connection error. Please try again.'); }
  });
}

// WHO CARDS ENTRANCE
document.querySelectorAll('.who-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(-30px)';
  card.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateX(0)'; }, i * 120);
      }
    });
  }, { threshold: 0.2 }).observe(card);
});

// ══════════════════════════════════════════════
//  3D GLOBE
// ══════════════════════════════════════════════
function initGlobe() {
  if (typeof THREE === 'undefined') return;
  const container = document.getElementById('heroGlobe');
  if (!container) return;

  const W = container.offsetWidth  || 620;
  const H = container.offsetHeight || 620;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.z = 2.75;

  const earthGroup = new THREE.Group();
  scene.add(earthGroup);

  // ── Dark inner sphere ──
  const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
  const sphereMat = new THREE.MeshPhongMaterial({
    color:             new THREE.Color(0x020c1a),
    emissive:          new THREE.Color(0x001833),
    emissiveIntensity: 0.9,
    shininess:         6,
    specular:          new THREE.Color(0x004488),
  });
  earthGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

  // ── Grid lines (lat/lon) ──
  function buildGrid() {
    const verts = [];
    const segs  = 72;
    const R     = 1.002;

    // Latitude rings
    for (let lat = -80; lat <= 80; lat += 18) {
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const r   = R * Math.sin(phi);
      const y   = R * Math.cos(phi);
      for (let i = 0; i < segs; i++) {
        const t1 = (i / segs) * Math.PI * 2;
        const t2 = ((i + 1) / segs) * Math.PI * 2;
        verts.push(r * Math.cos(t1), y, r * Math.sin(t1));
        verts.push(r * Math.cos(t2), y, r * Math.sin(t2));
      }
    }
    // Longitude arcs
    for (let lon = 0; lon < 360; lon += 18) {
      const theta = THREE.MathUtils.degToRad(lon);
      for (let i = 0; i < segs; i++) {
        const p1 = (i / segs) * Math.PI;
        const p2 = ((i + 1) / segs) * Math.PI;
        verts.push(R * Math.sin(p1) * Math.cos(theta), R * Math.cos(p1), R * Math.sin(p1) * Math.sin(theta));
        verts.push(R * Math.sin(p2) * Math.cos(theta), R * Math.cos(p2), R * Math.sin(p2) * Math.sin(theta));
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00BFFF), transparent: true, opacity: 0.18
    }));
  }
  earthGroup.add(buildGrid());

  // ── Surface dots (charging hubs) ──
  function buildDots() {
    const positions = [], colors = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even spread
      const y    = 1 - (i / (count - 1)) * 2;
      const r    = Math.sqrt(1 - y * y);
      const phi  = i * 2.399963; // golden angle
      const x    = r * Math.cos(phi) * 1.012;
      const z    = r * Math.sin(phi) * 1.012;
      const yy   = y * 1.012;
      positions.push(x, yy, z);
      // 70% blue, 30% green
      if (Math.random() > 0.7) {
        colors.push(0, 0.91, 0.478); // green
      } else {
        colors.push(0, 0.749, 1.0);  // blue
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.Float32BufferAttribute(colors, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.022, vertexColors: true, transparent: true, opacity: 0.9,
      sizeAttenuation: true,
    }));
  }
  earthGroup.add(buildDots());

  // ── Atmosphere (inner glow) ──
  const atmMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.06, 64, 64),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00BFFF), transparent: true, opacity: 0.045, side: THREE.BackSide })
  );
  scene.add(atmMesh);

  // ── Outer halo ──
  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(1.18, 64, 64),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00E87A), transparent: true, opacity: 0.018, side: THREE.BackSide })
  ));

  // ── Lights ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const keyLight = new THREE.DirectionalLight(new THREE.Color(0x00BFFF), 1.8);
  keyLight.position.set(4, 2, 4);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(new THREE.Color(0x00E87A), 0.6);
  fillLight.position.set(-4, -1, 1);
  scene.add(fillLight);
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set(0, 4, -4);
  scene.add(rimLight);

  // ── Mouse parallax ──
  let targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 0.4;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.2;
  });

  // ── Animate ──
  let frame = 0;
  (function animate() {
    requestAnimationFrame(animate);
    frame += 0.003;
    earthGroup.rotation.y += 0.0025;
    earthGroup.rotation.x += (targetY * 0.5 - earthGroup.rotation.x) * 0.025;
    atmMesh.rotation.y = earthGroup.rotation.y;

    // Subtle pulsing glow
    const pulse = Math.sin(frame) * 0.01;
    atmMesh.material.opacity = 0.045 + pulse;

    renderer.render(scene, camera);
  })();

  // ── Resize ──
  window.addEventListener('resize', () => {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// Init globe — wait for full window load so Three.js CDN is ready and container has real dimensions
window.addEventListener('load', () => {
  setTimeout(initGlobe, 100); // small delay ensures layout is settled
});
