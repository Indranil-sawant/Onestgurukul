/* ==========================================================================
   ONEST GURUKUL - CAMPUS FACILITIES PAGE SCRIPTS
   File: assets/js/onest-campus.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('onest-campus-theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check local storage
    const currentTheme = localStorage.getItem('onest-theme');
    if (currentTheme === 'dark') {
        body.classList.add('onest-campus-dark-mode');
        if (icon) icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('onest-campus-dark-mode');
            const isDark = body.classList.contains('onest-campus-dark-mode');

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
    const mobileToggle = document.getElementById('onest-campus-mobile-toggle');
    const mobileClose = document.getElementById('onest-campus-mobile-close');
    const mobileMenu = document.getElementById('onest-campus-mobile-menu');
    const mobileLinks = document.querySelectorAll('.onest-campus-mobile-list a');

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
    const revealElements = document.querySelectorAll('.onest-campus-stat-item, .onest-campus-facility-card, .onest-campus-tour-content, .onest-campus-tour-video');

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

    /* --- Video Play Button --- */
    const videoContainer = document.querySelector('.onest-campus-tour-video');
    const video = videoContainer ? videoContainer.querySelector('video') : null;
    const playOverlay = document.querySelector('.onest-campus-play-overlay');

    if (video && playOverlay) {
        playOverlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playOverlay.style.opacity = 0;
                playOverlay.style.pointerEvents = 'none';
                video.setAttribute('controls', 'controls');
            }
        });
    }

});
