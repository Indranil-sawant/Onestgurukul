/* ==========================================================================
   ONEST GURUKUL - GLOBAL INJECTOR & DYNAMIC UTILITIES (onest-global.js)
   File: New_features/onest-global.js
   Automatically injects:
   1. Emergency Announcement Banner (at top)
   2. Sticky Floating Apply Now Button
   3. WhatsApp Support Floating Icon
   4. AI Admission Assistant Chatbot Drawer (Simulated)
   5. Global Search Modal (Ctrl + K / Search Button)
   6. Core Web Vitals Analytics Loggers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Prevent double execution guard
    if (window.OnestGlobalLoaded) return;
    window.OnestGlobalLoaded = true;

    // Ensure OnestDB is loaded
    if (!window.OnestDB) {
        console.error("OnestDB database script is missing! Please load db.js before loading this script.");
        return;
    }

    const DB = window.OnestDB;

    // --- 1. Theme State Manager & Syncer ---
    function syncTheme() {
        const body = document.body;
        const currentTheme = localStorage.getItem('onest-theme');
        const themeToggles = document.querySelectorAll('#onest-home-theme-toggle, #onest-mobile-theme-toggle');

        if (currentTheme === 'dark') {
            body.classList.add('onest-dark-mode');
            body.classList.add('onest-home-dark-mode');
            themeToggles.forEach(btn => {
                const icon = btn.querySelector('i');
                if (icon) icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            });
        } else {
            body.classList.remove('onest-dark-mode');
            body.classList.remove('onest-home-dark-mode');
            themeToggles.forEach(btn => {
                const icon = btn.querySelector('i');
                if (icon) icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            });
        }
    }

    // Bind event listeners to existing theme toggles
    document.querySelectorAll('#onest-home-theme-toggle, #onest-mobile-theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('onest-dark-mode') || document.body.classList.contains('onest-home-dark-mode');
            localStorage.setItem('onest-theme', isDark ? 'light' : 'dark');
            syncTheme();
        });
    });
    syncTheme(); // Sync on load


    // --- 2. Emergency Announcement Banner ---
    function injectEmergencyBanner() {
        const settings = DB.getSettings();
        if (!settings.emergencyBannerActive || !settings.emergencyBannerText) return;

        // Check if dismissed in this session
        if (sessionStorage.getItem('onest_emergency_dismissed') === 'true') return;

        const banner = document.createElement('div');
        banner.id = 'onest-emergency-banner';
        banner.className = 'w-full z-[100] relative text-white py-3 px-gutter font-semibold flex justify-between items-center text-sm md:text-base transition-all duration-300';
        
        // Priority colors
        if (settings.emergencyBannerPriority === 'critical') {
            banner.classList.add('bg-red-600', 'border-b', 'border-red-700');
        } else if (settings.emergencyBannerPriority === 'warning') {
            banner.classList.add('bg-orange-500', 'border-b', 'border-orange-600');
        } else {
            banner.classList.add('bg-primary', 'border-b', 'border-primary-dark'); // Info
        }

        banner.innerHTML = `
            <div class="flex items-center gap-3 max-w-[90%] mx-auto text-center justify-center">
                <i class="bi ${settings.emergencyBannerPriority === 'critical' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'} animate-pulse text-lg"></i>
                <span class="tracking-wide">${settings.emergencyBannerText}</span>
            </div>
            <button id="onest-emergency-dismiss" class="text-white hover:text-white/80 text-xl font-bold cursor-pointer pr-4" aria-label="Dismiss Banner">&times;</button>
        `;

        document.body.prepend(banner);

        document.getElementById('onest-emergency-dismiss').addEventListener('click', () => {
            banner.style.maxHeight = banner.scrollHeight + 'px';
            setTimeout(() => {
                banner.style.maxHeight = '0';
                banner.style.paddingTop = '0';
                banner.style.paddingBottom = '0';
                banner.style.overflow = 'hidden';
            }, 10);
            sessionStorage.setItem('onest_emergency_dismissed', 'true');
        });
    }
    injectEmergencyBanner();


    // --- 3. Sticky Floating Apply Button ---
    function injectFloatingApply() {
        // Only inject if not already on the admissions page
        if (window.location.pathname.includes('admissions.html')) return;

        const applyBtn = document.createElement('div');
        applyBtn.id = 'onest-floating-apply';
        applyBtn.className = 'fixed right-6 bottom-24 z-40 transition-all duration-500 transform translate-y-20 opacity-0';
        applyBtn.innerHTML = `
            <a href="admissions.html" class="flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold px-6 py-4 rounded-full shadow-2xl border border-primary/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group">
                <span class="text-xs uppercase tracking-widest font-black">Apply Now</span>
                <i class="bi bi-arrow-right-short text-xl group-hover:translate-x-1 transition-transform"></i>
            </a>
        `;
        document.body.appendChild(applyBtn);

        // Slide in animation
        setTimeout(() => {
            applyBtn.classList.remove('translate-y-20', 'opacity-0');
        }, 1000);

        // Auto hide/show near footer
        window.addEventListener('scroll', () => {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top < window.innerHeight) {
                    applyBtn.classList.add('scale-0', 'opacity-0');
                } else {
                    applyBtn.classList.remove('scale-0', 'opacity-0');
                }
            }
        });
    }
    injectFloatingApply();


    // --- 4. WhatsApp Support Button ---
    function injectWhatsAppButton() {
        const waBtn = document.createElement('div');
        waBtn.id = 'onest-floating-whatsapp';
        waBtn.className = 'fixed right-6 bottom-6 z-40 transition-all duration-500 transform translate-y-20 opacity-0';
        waBtn.innerHTML = `
            <a href="https://wa.me/917888056699?text=Hello%21%20I%20am%20interested%20in%20school%20admissions%20at%20O%27Nest%20Gurukul.%20Please%20provide%20more%20details." 
               target="_blank" rel="noopener"
               class="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300 relative group"
               aria-label="Contact via WhatsApp">
                <i class="bi bi-whatsapp text-3xl"></i>
                <span class="absolute right-16 bg-white text-secondary text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Admission Enquiry
                </span>
            </a>
        `;
        document.body.appendChild(waBtn);

        // Slide in
        setTimeout(() => {
            waBtn.classList.remove('translate-y-20', 'opacity-0');
        }, 1200);

        // Move up when apply button disappears or down depending on overlap
        window.addEventListener('scroll', () => {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const applyBtn = document.getElementById('onest-floating-apply');
                if (footerRect.top < window.innerHeight && applyBtn) {
                    waBtn.classList.add('bottom-6');
                }
            }
        });
    }
    injectWhatsAppButton();


    // --- 5. AI Admission Assistant (Chatbot Drawer) ---
    function injectChatbot() {
        const botBubble = document.createElement('div');
        botBubble.id = 'onest-chatbot-bubble';
        botBubble.className = 'fixed left-6 bottom-6 z-40 transition-all duration-500 transform translate-y-20 opacity-0';
        botBubble.innerHTML = `
            <button class="w-14 h-14 bg-secondary hover:bg-primary text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 hover:scale-110 transition-all duration-300 relative group"
               aria-label="Open Admission Chat Assistant">
                <i class="bi bi-chat-left-dots-fill text-2xl text-primary-light"></i>
                <span class="absolute left-16 bg-white text-secondary text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    AI Admission Assistant
                </span>
                <span class="absolute -top-1 -right-1 flex h-4 w-4">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-[#facc15]"></span>
                </span>
            </button>
        `;
        document.body.appendChild(botBubble);

        // Slide in
        setTimeout(() => {
            botBubble.classList.remove('translate-y-20', 'opacity-0');
        }, 1500);

        // Create Chat Drawer in DOM
        const chatDrawer = document.createElement('div');
        chatDrawer.id = 'onest-chat-drawer';
        chatDrawer.className = 'fixed bottom-24 left-6 z-50 w-[350px] max-w-[90vw] h-[450px] bg-white dark:bg-amber-50 rounded-3xl shadow-2xl border border-primary/20 overflow-hidden transform scale-90 opacity-0 pointer-events-none origin-bottom-left transition-all duration-300 flex flex-col';
        chatDrawer.innerHTML = `
            <!-- Chat Header -->
            <div class="bg-secondary text-white p-4 flex items-center justify-between border-b border-primary/10">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <i class="bi bi-robot text-xl text-primary-light"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm font-display text-white">O'Nest Gurukul Bot</h4>
                        <span class="text-[10px] text-primary-light font-semibold tracking-wider flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span> ONLINE ASSISTANT</span>
                    </div>
                </div>
                <button id="onest-chat-close" class="text-white hover:text-white/80 text-xl font-bold cursor-pointer">&times;</button>
            </div>
            
            <!-- Chat Messages Area -->
            <div id="onest-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                <!-- Welcome Msg -->
                <div class="flex gap-2">
                    <div class="w-8 h-8 rounded-full bg-secondary text-white shrink-0 flex items-center justify-center"><i class="bi bi-robot"></i></div>
                    <div class="bg-gray-100 text-secondary p-3 rounded-2xl max-w-[80%] font-medium">
                        Namaste! Welcome to O'Nest Gurukul. I am your virtual Admission Assistant. How may I help you today?
                    </div>
                </div>
            </div>

            <!-- Pre-defined questions -->
            <div class="p-3 bg-gray-50 dark:bg-amber-100/50 border-t border-primary/5 flex flex-wrap gap-2 justify-center select-none shrink-0">
                <button class="chat-opt bg-white border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer" data-q="admissions">How to Apply?</button>
                <button class="chat-opt bg-white border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer" data-q="fees">Fee Structure?</button>
                <button class="chat-opt bg-white border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer" data-q="transport">Is bus available?</button>
                <button class="chat-opt bg-white border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer" data-q="human">Talk to Agent</button>
            </div>
        `;
        document.body.appendChild(chatDrawer);

        // Click actions
        const bubbleBtn = botBubble.querySelector('button');
        const closeBtn = document.getElementById('onest-chat-close');

        function toggleChat() {
            const isOpen = chatDrawer.classList.contains('opacity-100');
            if (isOpen) {
                chatDrawer.classList.replace('scale-100', 'scale-90');
                chatDrawer.classList.replace('opacity-100', 'opacity-0');
                chatDrawer.classList.add('pointer-events-none');
                trackAnalytics('close_chatbot');
            } else {
                chatDrawer.classList.remove('pointer-events-none');
                chatDrawer.classList.replace('scale-90', 'scale-100');
                chatDrawer.classList.replace('opacity-0', 'opacity-100');
                trackAnalytics('open_chatbot');
            }
        }

        bubbleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // Predefined answers dictionary
        const ANSWERS = {
            admissions: "Admissions for 2026-27 are open! You can submit our multi-step application form on the [Admissions Page](admissions.html). After submission, our panel will contact you for a parent-child interaction.",
            fees: "Our fee structure is divided into easy term installments. Average annual tuition ranges from INR 40,000 to 65,000 depending on the grade. Complete schedules can be obtained by contacting the office or visiting our [Admissions Page](admissions.html).",
            transport: "Yes, we run a secure GPS-enabled bus fleet covering Ratnagiri city and surrounding areas. The buses are monitored 24/7 with dedicated speed-limiting devices. Check route details on our [Campus & Facilities Page](campus-facilities.html).",
            human: "You can reach our official administration desk directly at **+91 78880 56699** or email us at **info@onestgurukul.in**. We are also available on [WhatsApp](https://wa.me/917888056699)!"
        };

        const msgBox = document.getElementById('onest-chat-messages');

        // Handling user options click
        chatDrawer.querySelectorAll('.chat-opt').forEach(opt => {
            opt.addEventListener('click', () => {
                const qKey = opt.getAttribute('data-q');
                const qText = opt.textContent;
                
                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'flex gap-2 justify-end';
                userMsg.innerHTML = `
                    <div class="bg-primary text-white p-3 rounded-2xl max-w-[80%] font-medium">
                        ${qText}
                    </div>
                `;
                msgBox.appendChild(userMsg);
                msgBox.scrollTop = msgBox.scrollHeight;
                trackAnalytics('chatbot_query_' + qKey);

                // Typing indicator simulation
                const typingMsg = document.createElement('div');
                typingMsg.className = 'flex gap-2 items-center text-gray-400';
                typingMsg.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-secondary text-white shrink-0 flex items-center justify-center"><i class="bi bi-robot"></i></div>
                    <span class="animate-pulse">Typing...</span>
                `;
                msgBox.appendChild(typingMsg);
                msgBox.scrollTop = msgBox.scrollHeight;

                setTimeout(() => {
                    typingMsg.remove();
                    // Add Bot response
                    const botResponse = document.createElement('div');
                    botResponse.className = 'flex gap-2';
                    botResponse.innerHTML = `
                        <div class="w-8 h-8 rounded-full bg-secondary text-white shrink-0 flex items-center justify-center"><i class="bi bi-robot"></i></div>
                        <div class="bg-gray-100 text-secondary p-3 rounded-2xl max-w-[80%] font-medium">
                            ${ANSWERS[qKey]}
                        </div>
                    `;
                    msgBox.appendChild(botResponse);
                    msgBox.scrollTop = msgBox.scrollHeight;
                }, 1000);
            });
        });
    }
    injectChatbot();


    // --- 6. Global Search Modal (Ctrl + K / Search Button) ---
    function injectGlobalSearch() {
        // Create search modal elements
        const searchModal = document.createElement('div');
        searchModal.id = 'onest-search-modal';
        searchModal.className = 'fixed inset-0 z-[250] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4 opacity-0 pointer-events-none transition-opacity duration-300';
        searchModal.innerHTML = `
            <div class="bg-white dark:bg-amber-50 w-full max-w-2xl rounded-3xl shadow-2xl border border-primary/20 overflow-hidden transform -translate-y-4 scale-95 transition-all duration-300 flex flex-col max-h-[70vh]">
                <!-- Search Box Header -->
                <div class="flex items-center gap-3 p-5 border-b border-primary/10 shrink-0">
                    <i class="bi bi-search text-xl text-secondary"></i>
                    <input type="text" id="onest-search-input" placeholder="Search pages, documents, notices, faculty, FAQs..." 
                           class="flex-1 bg-transparent border-0 focus:ring-0 text-secondary font-semibold text-base outline-none w-full"
                           autocomplete="off">
                    <span class="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded-md font-bold uppercase select-none shrink-0">ESC to Close</span>
                </div>
                
                <!-- Results list -->
                <div id="onest-search-results" class="flex-1 p-5 overflow-y-auto space-y-4 min-h-[150px]">
                    <p class="text-center text-xs text-on-surface-variant/80 py-8">Start typing to search the website...</p>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);

        const modalBox = searchModal.querySelector('div');
        const input = document.getElementById('onest-search-input');
        const resultsBox = document.getElementById('onest-search-results');

        function openSearch() {
            searchModal.classList.remove('pointer-events-none');
            searchModal.classList.replace('opacity-0', 'opacity-100');
            modalBox.classList.replace('-translate-y-4', 'translate-y-0');
            modalBox.classList.replace('scale-95', 'scale-100');
            input.value = '';
            resultsBox.innerHTML = '<p class="text-center text-xs text-on-surface-variant/80 py-8">Start typing to search the website...</p>';
            setTimeout(() => input.focus(), 150);
            trackAnalytics('open_search');
        }

        function closeSearch() {
            searchModal.classList.add('pointer-events-none');
            searchModal.classList.replace('opacity-100', 'opacity-0');
            modalBox.classList.replace('translate-y-0', '-translate-y-4');
            modalBox.classList.replace('scale-100', 'scale-95');
        }

        // Close on clicking overlay
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearch();
        });

        // Close on escape key, open on Ctrl + K or '/'
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
            if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '/') {
                // Prevent browser default behavior
                e.preventDefault();
                openSearch();
            }
        });

        // Handle typing input
        input.addEventListener('input', (e) => {
            const query = e.target.value;
            if (!query || query.trim() === '') {
                resultsBox.innerHTML = '<p class="text-center text-xs text-on-surface-variant/80 py-8">Start typing to search the website...</p>';
                return;
            }

            const results = DB.globalSearch(query);
            if (results.length === 0) {
                resultsBox.innerHTML = `
                    <div class="text-center py-8">
                        <i class="bi bi-emoji-frown text-2xl text-on-surface-variant/50"></i>
                        <p class="text-xs text-on-surface-variant mt-2">No matching results found for "${query}"</p>
                    </div>
                `;
                return;
            }

            resultsBox.innerHTML = '';
            results.forEach(res => {
                const item = document.createElement('a');
                item.href = res.link;
                item.className = 'block p-4 bg-gray-50 dark:bg-amber-100/50 hover:bg-primary/10 border border-primary/10 rounded-2xl transition-all group';
                item.innerHTML = `
                    <div class="flex justify-between items-start">
                        <span class="text-[9px] bg-secondary text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">${res.type}</span>
                    </div>
                    <h5 class="text-sm font-bold text-secondary mt-1 group-hover:text-primary transition-colors">${res.title}</h5>
                    <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">${res.desc}</p>
                `;
                item.addEventListener('click', () => {
                    closeSearch();
                    trackAnalytics('search_result_click_' + res.type);
                });
                resultsBox.appendChild(item);
            });
        });

        // Add Search Icon click triggers dynamically to any elements with search triggers
        document.querySelectorAll('.onest-search-trigger').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                openSearch();
            });
        });

        // Also inject a search trigger to the header menu bar if not there
        const menuNav = document.querySelector('header nav');
        if (menuNav && !menuNav.querySelector('.onest-search-trigger')) {
            const searchIcon = document.createElement('a');
            searchIcon.href = '#';
            searchIcon.className = 'text-secondary/80 font-bold hover:text-primary transition-colors text-sm flex items-center gap-1.5 onest-search-trigger';
            searchIcon.innerHTML = `<i class="bi bi-search"></i> Search`;
            searchIcon.addEventListener('click', (e) => {
                e.preventDefault();
                openSearch();
            });
            menuNav.appendChild(searchIcon);
        }
    }
    injectGlobalSearch();


    // --- 7. Simulated Analytics Dispatcher ---
    function trackAnalytics(eventName, params = {}) {
        const settings = DB.getSettings();
        if (!settings.analyticsEnabled) return;
        
        const timestamp = new Date().toISOString();
        console.log(`%c[OnestAnalytics] Event Logged: "${eventName}" at ${timestamp}`, 'color: #735c00; font-weight: bold; background-color: #FFF9D9; padding: 4px 8px; border-radius: 4px;', params);
        
        // Expose hooks for future GA4 / Pixel integrations
        if (window.gtag) {
            window.gtag('event', eventName, params);
        }
        if (window.fbq) {
            window.fbq('track', eventName, params);
        }
    }

    // Expose analytics tracker globally
    window.trackOnestAnalytics = trackAnalytics;

});
