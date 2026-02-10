/* =====================================================
   COMMUNITYHOSTELS — MAIN JAVASCRIPT
   Lightweight, performant, no dependencies
   ===================================================== */

(function () {
    'use strict';

    /* ===================== HEADER SCROLL EFFECT ===================== */
    const header = document.getElementById('site-header');

    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    /* ===================== MOBILE MENU TOGGLE ===================== */
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            const isActive = mobileMenu.classList.contains('active');

            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isActive);
            mobileMenu.setAttribute('aria-hidden', isActive);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        // Close menu when clicking a link
        var mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    /* ===================== SCROLL REVEAL ANIMATIONS ===================== */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -60px 0px',
            }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ===================== SCORE BAR ANIMATIONS ===================== */
    var scoreFills = document.querySelectorAll('.score-fill');

    if ('IntersectionObserver' in window && scoreFills.length > 0) {
        var scoreObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var score = entry.target.getAttribute('data-score');
                        if (score) {
                            entry.target.style.width = score + '%';
                        }
                        scoreObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        scoreFills.forEach(function (el) {
            scoreObserver.observe(el);
        });
    }

    /* ===================== SMOOTH SCROLL FOR ANCHOR LINKS ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    /* ===================== HIDE SCROLL INDICATOR ON SCROLL ===================== */
    var scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        var scrollHideHandler = function () {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        };
        window.addEventListener('scroll', scrollHideHandler, { passive: true });
    }

    /* ===================== NEWSLETTER FORM HANDLING ===================== */
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            // If form action is coming-soon.html, let it redirect naturally
            var action = form.getAttribute('action');
            if (action === 'coming-soon.html') return;

            // Otherwise prevent default and show feedback
            e.preventDefault();
            var emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                var btn = form.querySelector('button[type="submit"]');
                if (btn) {
                    var originalText = btn.textContent;
                    btn.textContent = 'Thank you!';
                    btn.style.background = '#2d8a4e';
                    btn.disabled = true;

                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                        emailInput.value = '';
                    }, 3000);
                }
            }
        });
    });
})();
