/* ==========================================================================
   ONEST GURUKUL - ADMISSIONS PAGE SCRIPTS
   File: assets/js/onest-admissions.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('onest-admissions-theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check local storage
    const currentTheme = localStorage.getItem('onest-theme');
    if (currentTheme === 'dark') {
        body.classList.add('onest-admissions-dark-mode');
        if (icon) icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('onest-admissions-dark-mode');
            const isDark = body.classList.contains('onest-admissions-dark-mode');

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
    const mobileToggle = document.getElementById('onest-admissions-mobile-toggle');
    const mobileClose = document.getElementById('onest-admissions-mobile-close');
    const mobileMenu = document.getElementById('onest-admissions-mobile-menu');
    const mobileLinks = document.querySelectorAll('.onest-admissions-mobile-list a');

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

    /* --- Form Submission --- */
    const admissionsForm = document.querySelector('.onest-admissions-form');

    if (admissionsForm) {
        admissionsForm.addEventListener('submit', function (e) {
            const submitBtn = admissionsForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Disable button and show sending state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting Application...';

            // Create success message element if it doesn't exist
            let successMessage = admissionsForm.querySelector('.form-success-message');
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.style.cssText = `
                    background-color: #10b981;
                    color: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: 600;
                    display: none;
                    animation: slideDown 0.3s ease;
                `;
                admissionsForm.insertBefore(successMessage, admissionsForm.firstChild);
            }

            // Wait for form submission to complete
            setTimeout(() => {
                // Show success message
                successMessage.textContent = '✓ Application submitted successfully! We\'ll contact you within 24 hours.';
                successMessage.style.display = 'block';

                // Reset form
                admissionsForm.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide success message after 8 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 8000);
            }, 1500);
        });
    }

    /* --- Smooth Scroll for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
