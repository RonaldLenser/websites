/* ============================================
   POP N' POUR & ACE OF SPIRITS
   Premium Mobile Bartending — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    });
    // Fallback
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // ---- Custom Cursor ----
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (dot && ring && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX - 4 + 'px';
            dot.style.top = mouseY - 4 + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = ringX - 20 + 'px';
            ring.style.top = ringY - 20 + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverTargets = document.querySelectorAll('a, button, .btn, .feature-card, .about-card, .mood-card, .included-item, input, select, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    }

    // ---- Sparkles in Hero ----
    const sparkleContainer = document.getElementById('heroSparkles');
    if (sparkleContainer) {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
            sparkle.style.width = (2 + Math.random() * 3) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkleContainer.appendChild(sparkle);
        }
    }

    // ---- Navigation Scroll ----
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // ---- Mobile Menu ----
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Contact Form ----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Replace this with your actual form endpoint (Formspree, Netlify Forms, etc.)
            console.log('Booking Request:', data);

            // Show success state
            const wrapper = document.querySelector('.contact-form-wrapper');
            wrapper.innerHTML = `
                <div class="form-success">
                    <div class="form-success-icon">🥂</div>
                    <h3>Request Sent!</h3>
                    <p>We got your booking request and will get back to you within 24 hours with a custom quote. Get ready to party!</p>
                </div>
            `;
            wrapper.querySelector('.form-success').classList.add('reveal', 'visible');
        });
    }

    // ---- Parallax Effect on Hero Logo ----
    const heroLogo = document.querySelector('.hero-logo-img');
    if (heroLogo && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                heroLogo.style.transform = `translateY(${progress * -30}px) scale(${1 - progress * 0.1})`;
                heroLogo.style.opacity = 1 - progress * 0.8;
            }
        });
    }

    // ---- Tilt Effect on Mood Cards ----
    if (window.innerWidth > 768) {
        document.querySelectorAll('.mood-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateY(-4px) perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) perspective(800px) rotateX(0) rotateY(0)';
            });
        });
    }

    // ---- Animated Gradient on Hero (subtle) ----
    const heroGrad1 = document.querySelector('.hero-gradient-1');
    if (heroGrad1) {
        let hue = 0;
        function animateHeroGrad() {
            hue = (hue + 0.1) % 360;
            const shift = Math.sin(hue * Math.PI / 180) * 5;
            heroGrad1.style.background = `linear-gradient(${160 + shift}deg, #1a1014 0%, #2a1520 30%, #3a1a30 60%, #1a1014 100%)`;
            requestAnimationFrame(animateHeroGrad);
        }
        animateHeroGrad();
    }

});
