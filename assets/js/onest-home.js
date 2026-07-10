/* ==========================================================================
   ONEST GURUKUL - HOME PAGE SCRIPTS (PREMIUM)
   File: assets/js/onest-home.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('onest-home-theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check local storage
    const currentTheme = localStorage.getItem('onest-theme');
    if (currentTheme === 'dark') {
        body.classList.add('onest-home-dark-mode');
        if (icon) icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('onest-home-dark-mode');
            const isDark = body.classList.contains('onest-home-dark-mode');

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
    const mobileToggle = document.getElementById('onest-home-mobile-toggle');
    const mobileClose = document.getElementById('onest-home-mobile-close');
    const mobileMenu = document.getElementById('onest-home-mobile-menu');
    const mobileLinks = document.querySelectorAll('.onest-home-mobile-list a');

    function openMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        }
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
        }
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* --- Hero Carousel --- */
    const slides = document.querySelectorAll('.onest-home-hero-slide');
    const prevBtn = document.getElementById('onest-home-hero-prev');
    const nextBtn = document.getElementById('onest-home-hero-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        // Auto play
        slideInterval = setInterval(nextSlide, 6000); // Slower for better readability

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 6000);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 6000);
            });
        }
    }

    /* --- Text Changer (Intro) --- */
    const textChanger = document.getElementById('onest-home-text-changer');
    if (textChanger) {
        const texts = [
            "Where Children Learn Not Just for Exams, But for Life.",
            "Nurturing Curiosity, Creativity, and Confidence.",
            "Building a Strong Foundation for a Bright Future.",
            "Education Beyond Classrooms, Towards Excellence."
        ];
        let textIndex = 0;

        setInterval(() => {
            textChanger.style.opacity = 0;
            setTimeout(() => {
                textIndex = (textIndex + 1) % texts.length;
                textChanger.textContent = texts[textIndex];
                textChanger.style.opacity = 1;
            }, 500);
        }, 4000);
    }

    /* --- Stats Counter --- */
    const stats = document.querySelectorAll('.onest-home-stat-number');
    const statsSection = document.querySelector('.onest-home-stats');
    let started = false;

    if (statsSection && stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                started = true;
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2500; // ms
                    const increment = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateStat = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.ceil(current);
                            requestAnimationFrame(updateStat);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    updateStat();
                });
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.onest-home-feature-card, .onest-home-program-card, .onest-home-intro-content');

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

    /* --- Contact Form Submission --- */
    const contactForm = document.querySelector('.onest-home-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Disable button and show sending state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Create success message element if it doesn't exist
            let successMessage = contactForm.querySelector('.form-success-message');
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
                contactForm.insertBefore(successMessage, contactForm.firstChild);
            }

            // Wait for form submission to complete (simulate async)
            setTimeout(() => {
                // Show success message
                successMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
                successMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

});
