/* ==========================================================================
   ONEST GURUKUL - CONTACT PAGE SCRIPTS
   File: assets/js/onest-contact.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('onest-contact-theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check local storage
    const currentTheme = localStorage.getItem('onest-theme');
    if (currentTheme === 'dark') {
        body.classList.add('onest-contact-dark-mode');
        if (icon) icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('onest-contact-dark-mode');
            const isDark = body.classList.contains('onest-contact-dark-mode');

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
    const mobileToggle = document.getElementById('onest-contact-mobile-toggle');
    const mobileClose = document.getElementById('onest-contact-mobile-close');
    const mobileMenu = document.getElementById('onest-contact-mobile-menu');
    const mobileLinks = document.querySelectorAll('.onest-contact-mobile-list a');

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

    /* --- Form Submission Logic --- */
    const form = document.getElementById('onest-contact-form');
    const sentMessage = document.querySelector('.onest-contact-sent-message');
    const errorMessage = document.querySelector('.onest-contact-error-message');
    const submitBtn = document.querySelector('.onest-contact-submit-btn');

    if (form) {
        form.addEventListener('submit', function (e) {
            // We are using target="hidden_iframe" so the page doesn't reload
            // But we want to show visual feedback

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Allow the form to submit to the iframe
            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';

                if (sentMessage) {
                    sentMessage.style.display = 'block';
                    setTimeout(() => {
                        sentMessage.style.display = 'none';
                    }, 5000);
                }
            }, 1500); // Simulate wait time for better UX
        });
    }

});
