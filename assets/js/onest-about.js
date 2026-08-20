/* ==========================================================================
   ONEST GURUKUL - ABOUT PAGE SCRIPTS
   File: assets/js/onest-about.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('onest-about-theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check local storage
    const currentTheme = localStorage.getItem('onest-theme');
    if (currentTheme === 'dark') {
        body.classList.add('onest-about-dark-mode');
        if (icon) icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('onest-about-dark-mode');
            const isDark = body.classList.contains('onest-about-dark-mode');

            // Update Icon
            if (icon) {
                if (isDark) {
                    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
                } else {
                    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
                }
            }

            // Save preference
            localStorage.setItem('onest-theme', isDark ? 'dark' : 'light');
        });
    }

    /* --- Mobile Menu --- */
    const mobileToggle = document.getElementById('onest-about-mobile-toggle');
    const mobileClose = document.getElementById('onest-about-mobile-close');
    const mobileMenu = document.getElementById('onest-about-mobile-menu');
    const mobileLinks = document.querySelectorAll('.onest-about-mobile-list a');

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.onest-about-mv-card, .onest-about-value-card, .onest-about-timeline-item, .onest-about-program-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });

});
