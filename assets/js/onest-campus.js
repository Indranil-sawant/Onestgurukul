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

    /* --- Infrastructure Gallery Lightbox --- */
    const galleryItems = document.querySelectorAll('.onest-campus-gallery-item');
    const modal = document.getElementById('onest-campus-gallery-modal');
    const modalImg = document.getElementById('onest-campus-modal-img');
    const closeBtn = document.querySelector('.onest-campus-gallery-close');
    const prevBtn = document.querySelector('.onest-campus-gallery-prev');
    const nextBtn = document.querySelector('.onest-campus-gallery-next');
    let currentImageIndex = 0;

    // Create array of all images
    const images = Array.from(galleryItems).map(item => {
        return item.querySelector('img').src;
    });

    function openModal(index) {
        currentImageIndex = index;
        modal.style.display = 'block';
        modalImg.src = images[currentImageIndex];
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImg.src = images[currentImageIndex];
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentImageIndex];
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') closeModal();
        }
    });

    /* --- Bento Facility Detail Popup Modal --- */
    const detailModal = document.getElementById('onest-facility-detail-modal');
    const detailModalBody = document.getElementById('onest-facility-modal-body');
    const detailModalClose = document.getElementById('onest-facility-modal-close');
    const bentoCards = document.querySelectorAll('.onest-bento-card');

    const facilityData = {
        labs: {
            title: "Labs & Innovation",
            subtitle: "State-of-the-Art Research Infrastructures",
            description: "Our laboratory setups encourage hands-on research and logical discovery. We provide advanced experimental workspaces equipped with high-grade testing gear, custom Robotics and Maker setups, and professional computational systems.",
            bullets: [
                "Advanced Chemistry, Physics, and Biology laboratory modules.",
                "Computational innovation rooms for building software and IoT designs.",
                "Interactive learning tasks that encourage design and engineering ideas."
            ]
        },
        library: {
            title: "The Knowledge Hub",
            subtitle: "Vast Educational Resources Center",
            description: "The intellectual home of O'Nest Gurukul. Our libraries support extensive study, research, and quiet reading sessions with physical volumes, periodicals, and robust e-library catalogs.",
            bullets: [
                "Over 5,000 reference catalogs, fiction, non-fiction, and academic guides.",
                "High-speed study centers with access to global journals and databases.",
                "Silent study zones designed to nurture focused learning."
            ]
        },
        classrooms: {
            title: "Smart Classrooms",
            subtitle: "Modern Immersive Interactive Environments",
            description: "Our digital smart classrooms are fully equipped to present engaging AR, VR, and multi-media learning flows, converting typical classes into immersive, visually rich explorations.",
            bullets: [
                "Interactive smart panels and projection screens.",
                "Ergonomically designed seating to keep children comfortable.",
                "Ventilated, open spaces providing comfortable learning hubs."
            ]
        },
        sports: {
            title: "Sports & Wellness",
            subtitle: "Olympic-Grade Athletic Facilities",
            description: "Supporting athletic performance and health. We feature professional-level playgrounds, dedicated mindfulness spaces, and indoor game courts.",
            bullets: [
                "High-quality turf courts for football, cricket, and athletic events.",
                "Quiet yoga and meditation halls to develop peace of mind.",
                "Indoor games support for table tennis, carrom, chess, and gymnastics."
            ]
        },
        dining: {
            title: "Living & Dining",
            subtitle: "Nutritious Sattvic Feeding and Comfort Center",
            description: "Providing premium organic nourishment to keep kids healthy and energized. Our food spaces prepare freshly sourced organic meals daily.",
            bullets: [
                "Spacious, highly hygienic dining areas.",
                "100% organic, locally sourced Sattvic menus prepared by nutritionists.",
                "Dedicated comfort zones and rest rooms for younger primary kids."
            ]
        },
        arts: {
            title: "Arts & Culture",
            subtitle: "Spacious Multi-Aesthetic Creative Spaces",
            description: "Encouraging artistic discovery, performative confidence, and cultural design. Our studios cover traditional visual arts, music, dance, and modern media.",
            bullets: [
                "Well-stocked painting, pottery, and craft studios.",
                "Equipped music production and choreography studios.",
                "Vibrant outdoor auditorium for drama, guest lectures, and festivals."
            ]
        }
    };

    function openDetailModal(key) {
        const data = facilityData[key];
        if (!data) return;

        let bulletHtml = '';
        data.bullets.forEach(bullet => {
            bulletHtml += `<li class="flex items-start space-x-2 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span class="text-on-surface-variant">${bullet}</span>
            </li>`;
        });

        detailModalBody.innerHTML = `
            <div>
              <span class="text-xs uppercase tracking-wider font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">${data.subtitle}</span>
              <h3 class="font-display-lg text-2xl font-bold text-on-surface mt-3">${data.title}</h3>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">${data.description}</p>
            <ul class="space-y-2 py-2">
              ${bulletHtml}
            </ul>
            <div class="pt-4 border-t border-on-background/10 flex flex-col sm:flex-row gap-3">
              <a href="admissions.html" class="flex-1 bg-primary text-on-primary text-center py-3 rounded-lg font-bold hover:bg-primary/90 transition-all text-sm flex items-center justify-center">
                Apply for Admission
              </a>
              <button id="onest-facility-modal-body-close" class="flex-1 border border-on-background/20 text-on-surface-variant hover:bg-primary/5 text-center py-3 rounded-lg font-bold transition-all text-sm">
                Close Details
              </button>
            </div>
        `;

        // Bind internal close button
        const bodyCloseBtn = document.getElementById('onest-facility-modal-body-close');
        if (bodyCloseBtn) bodyCloseBtn.addEventListener('click', closeDetailModal);

        detailModal.classList.remove('hidden');
        // Trigger reflow for animations
        setTimeout(() => {
            const innerDiv = detailModal.querySelector('div');
            innerDiv.classList.remove('scale-95', 'opacity-0');
            innerDiv.classList.add('scale-100', 'opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeDetailModal() {
        const innerDiv = detailModal.querySelector('div');
        innerDiv.classList.remove('scale-100', 'opacity-100');
        innerDiv.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            detailModal.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }

    bentoCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-facility');
            if (key) openDetailModal(key);
        });
    });

    if (detailModalClose) detailModalClose.addEventListener('click', closeDetailModal);
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) closeDetailModal();
        });
    }

});
