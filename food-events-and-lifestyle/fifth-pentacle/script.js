/* ============================================================
   THE FIFTH PENTACLE — script.js
   Particles, parallax panels, scroll reveals, video grid, tilt
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVIGATION =====
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ===== PARALLAX SIDE PANELS =====
    const leftPanel = document.getElementById('sidePanelLeft');
    const rightPanel = document.getElementById('sidePanelRight');

    if (leftPanel && rightPanel) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const offsetL = scrollY * -0.15;
                    const offsetR = scrollY * -0.1;
                    leftPanel.style.transform = `translateY(${offsetL}px)`;
                    rightPanel.style.transform = `translateY(${offsetR}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ===== GOLD PARTICLE SYSTEM =====
    const canvas = document.getElementById('heroParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrame;
        const COUNT = 55;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.offsetWidth;
                this.y = Math.random() * canvas.offsetHeight;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -Math.random() * 0.4 - 0.1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeSpeed = Math.random() * 0.003 + 0.001;
                this.growing = Math.random() > 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.growing) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 0.6) this.growing = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) this.reset();
                }
                if (this.y < -10 || this.x < -10 || this.x > canvas.offsetWidth + 10) {
                    this.reset();
                    this.y = canvas.offsetHeight + 10;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity * 0.12})`;
                ctx.fill();
            }
        }

        function init() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < COUNT; i++) particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            particles.forEach(p => { p.update(); p.draw(); });
            animFrame = requestAnimationFrame(animate);
        }

        init();
        animate();

        let rt;
        window.addEventListener('resize', () => {
            clearTimeout(rt);
            rt = setTimeout(() => { cancelAnimationFrame(animFrame); init(); animate(); }, 200);
        });
    }

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ===== VIDEO ARCHIVE =====
    const archiveGrid = document.getElementById('archiveGrid');
    const loadMoreBtn = document.getElementById('loadMore');

    const videos = [
        { title: 'Full Moon Reading — What the Universe Wants You to Know', type: 'live', views: '2.3K' },
        { title: 'Five of Pentacles Deep Dive — Finding Hope', type: 'live', views: '1.8K' },
        { title: 'New Deck Unboxing — Ethereal Visions Tarot', type: 'deck', views: '3.1K' },
        { title: 'Pick a Card — Your Next Chapter', type: 'pick', views: '5.4K' },
        { title: 'Weekly Energy Check-In — Fire Signs', type: 'live', views: '1.2K' },
        { title: 'Rider-Waite vs Thoth — Which Deck is Right?', type: 'deck', views: '4.6K' },
        { title: 'Pick a Card — Messages From Your Spirit Guides', type: 'pick', views: '6.8K' },
        { title: 'New Moon Manifestation Reading', type: 'live', views: '2.0K' },
        { title: 'Deck Review — Deviant Moon Tarot', type: 'deck', views: '1.5K' },
    ];

    let currentFilter = 'all';
    let visibleCount = 6;

    // SVG pentacle for video thumbnails
    const thumbPentacle = `<svg viewBox="0 0 60 60" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="24" fill="none" stroke="#C9A84C" stroke-width="1.2"/><polygon points="30,8 34.8,21 49,21 37.5,29 41.5,42 30,34.5 18.5,42 22.5,29 11,21 25.2,21" fill="none" stroke="#C9A84C" stroke-width="0.8"/></svg>`;

    function renderVideos() {
        archiveGrid.innerHTML = '';
        const filtered = currentFilter === 'all' ? videos : videos.filter(v => v.type === currentFilter);
        const toShow = filtered.slice(0, visibleCount);

        toShow.forEach((video, i) => {
            if (i > 0 && i % 6 === 0) {
                const ad = document.createElement('div');
                ad.className = 'ad-in-feed reveal visible';
                ad.innerHTML = `<!-- ADSENSE: In-feed Native Ad --><div class="ad-placeholder" style="height:90px;width:100%"><span>In-Feed Ad — 728×90</span></div>`;
                archiveGrid.appendChild(ad);
            }

            const card = document.createElement('div');
            card.className = 'video-card reveal visible';
            card.dataset.type = video.type;
            card.innerHTML = `
                <div class="video-thumb">
                    <div class="video-thumb-placeholder">${thumbPentacle}</div>
                </div>
                <div class="video-info">
                    <span class="video-tag">${video.type === 'live' ? 'Live Reading' : video.type === 'deck' ? 'Deck Review' : 'Pick a Card'}</span>
                    <h3 class="video-title">${video.title}</h3>
                    <span class="video-meta">${video.views} views</span>
                </div>`;
            archiveGrid.appendChild(card);
        });

        if (loadMoreBtn) {
            loadMoreBtn.style.display = toShow.length < filtered.length ? 'inline-flex' : 'none';
        }
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            visibleCount = 6;
            renderVideos();
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => { visibleCount += 6; renderVideos(); });
    }

    renderVideos();

    // ===== TAROT CARD TILT =====
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const inner = card.querySelector('.tarot-card-inner');
        if (!inner) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
            }
        });
    });

    // ===== STAGGER SCHEDULE CARDS =====
    document.querySelectorAll('.schedule-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.06}s`;
        card.classList.add('reveal');
        revealObserver.observe(card);
    });

    // ===== CAROUSEL DRAG =====
    const carousel = document.getElementById('carouselTrack');
    if (carousel) {
        let isDown = false, startX, scrollLeft;
        carousel.addEventListener('mousedown', (e) => {
            isDown = true; carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft; scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => { isDown = false; carousel.style.cursor = 'grab'; });
        carousel.addEventListener('mouseup', () => { isDown = false; carousel.style.cursor = 'grab'; });
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return; e.preventDefault();
            carousel.scrollLeft = scrollLeft - ((e.pageX - carousel.offsetLeft) - startX) * 2;
        });
        carousel.style.cursor = 'grab';
    }

});
