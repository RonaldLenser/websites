/* =============================================
   MENDI BARON — BOOK LANDING PAGE
   Script: Animations, Nav, Form
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger siblings that enter at the same time
                const siblings = Array.from(entry.target.parentElement.children).filter(
                    el => el.classList.contains('reveal') && !el.classList.contains('visible')
                );
                const siblingIndex = siblings.indexOf(entry.target);
                const delay = siblingIndex >= 0 ? siblingIndex * 80 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Nav Scroll Behavior ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    let ticking = false;

    function updateNav() {
        const scrollY = window.scrollY;
        
        if (scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Opt-In Form ---
    const submitBtn = document.getElementById('optin-submit');
    const nameInput = document.getElementById('optin-name');
    const emailInput = document.getElementById('optin-email');

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            // Basic validation
            if (!name) {
                nameInput.style.borderColor = '#c0392b';
                nameInput.focus();
                setTimeout(() => nameInput.style.borderColor = '', 2000);
                return;
            }

            if (!email || !isValidEmail(email)) {
                emailInput.style.borderColor = '#c0392b';
                emailInput.focus();
                setTimeout(() => emailInput.style.borderColor = '', 2000);
                return;
            }

            // Success state
            submitBtn.textContent = 'Sending...';
            submitBtn.style.pointerEvents = 'none';
            submitBtn.style.opacity = '0.7';

            // Simulate submission (replace with real form endpoint)
            setTimeout(() => {
                const form = document.getElementById('optin-form');
                form.innerHTML = `
                    <div style="padding: 32px 0; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 16px;">✓</div>
                        <p style="font-family: var(--font-display); font-size: 1.3rem; color: var(--cream); margin-bottom: 8px;">You're in, ${name}!</p>
                        <p style="font-size: 0.95rem; color: rgba(232, 223, 208, 0.7);">Check your inbox for Chapter 1.</p>
                    </div>
                `;
            }, 1200);
        });

        // Enter key submission
        [nameInput, emailInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    submitBtn.click();
                }
            });
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // --- Book Cover Parallax on Scroll ---
    const bookImg = document.querySelector('.book-cover-img');
    if (bookImg && window.innerWidth > 1024) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                const translateY = progress * 30;
                bookImg.style.transform = `rotateY(-6deg) rotateX(2deg) translateY(${translateY}px)`;
            }
        }, { passive: true });
    }

    // --- Subtle hover effect on concept cards ---
    document.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
            card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
