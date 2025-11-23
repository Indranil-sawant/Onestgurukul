/* ==========================================================================
   ONEST GURUKUL - PRE-PRIMARY PAGE JAVASCRIPT
   File: assets/js/onest-preprimary.js
   ========================================================================== */

(function () {
    'use strict';

    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('onest-preprimary-theme-toggle');
    const wrapper = document.querySelector('.onest-preprimary-wrapper');
    const toggleIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('onest-preprimary-theme') || 'light';

    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        wrapper.classList.add('onest-preprimary-dark-mode');
        if (toggleIcon) {
            toggleIcon.classList.remove('bi-moon-fill');
            toggleIcon.classList.add('bi-sun-fill');
        }
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            wrapper.classList.toggle('onest-preprimary-dark-mode');

            // Update icon
            if (wrapper.classList.contains('onest-preprimary-dark-mode')) {
                toggleIcon.classList.remove('bi-moon-fill');
                toggleIcon.classList.add('bi-sun-fill');
                localStorage.setItem('onest-preprimary-theme', 'dark');
            } else {
                toggleIcon.classList.remove('bi-sun-fill');
                toggleIcon.classList.add('bi-moon-fill');
                localStorage.setItem('onest-preprimary-theme', 'light');
            }
        });
    }

    // --- Mobile Menu Functionality ---
    const mobileToggle = document.getElementById('onest-preprimary-mobile-toggle');
    const mobileMenu = document.getElementById('onest-preprimary-mobile-menu');
    const mobileClose = document.getElementById('onest-preprimary-mobile-close');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function () {
            mobileMenu.classList.add('active');
        });
    }

    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.onest-preprimary-mobile-list a');
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    if (mobileMenu) {
        document.addEventListener('click', function (e) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = 100;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Fade-in on Scroll) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.onest-preprimary-value-card, .onest-preprimary-curriculum-card, .onest-preprimary-pedagogy-card, .onest-preprimary-facility-card, .onest-preprimary-timeline-item, .onest-preprimary-gallery-item'
    );

    animateElements.forEach(function (el, index) {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = (index % 4) * 0.1 + 's';

        // Observe
        observer.observe(el);
    });

    // --- Gallery Lightbox (Simple Implementation) ---
    const galleryItems = document.querySelectorAll('.onest-preprimary-gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                `;

                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                `;

                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);

                // Fade in animation
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);

                // Close on click
                lightbox.addEventListener('click', function () {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                });
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.onest-preprimary-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '12px 0';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '16px 0';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // --- Contact Form Success Message ---
    const forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function () {
            setTimeout(function () {
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            }, 500);
        });
    });

    // --- Add Active State to Current Page Navigation ---
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.onest-preprimary-nav-link');

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- Console Welcome Message ---
    console.log('%c🏫 ONEST Gurukul - Pre-Primary Page', 'color: #FACC15; font-size: 20px; font-weight: bold;');
    console.log('%cWhere Little Minds Begin Big Journeys', 'color: #4b5563; font-size: 14px;');

})();
