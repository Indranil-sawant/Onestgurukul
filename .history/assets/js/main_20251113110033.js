

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();


let form = document.getElementById("leadForm");
let successEl = form.querySelector(".sent-message");
let errorEl = form.querySelector(".error-message");

let submitted = false;

form.addEventListener("submit", function() {
  submitted = true;

  setTimeout(() => {
    if(submitted) {
      successEl.style.display = "block";
      errorEl.style.display = "none";
      form.reset();
      submitted = false;
    }
  }, 1000);
});



  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');

  // 1️⃣ Load the saved theme (if any)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-background');
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
  } else {
    body.classList.add('light-background');
  }

  // 2️⃣ Toggle theme on click
  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-background')) {
      body.classList.replace('dark-background', 'light-background');
      icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.replace('light-background', 'dark-background');
      icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
      localStorage.setItem('theme', 'dark');
    }
  });


document.documentElement.style.colorScheme = "light";


// === Banner Carousel ===
(function () {
  const slides = document.querySelectorAll(".banner-carousel .slide");
  const dotsContainer = document.querySelector(".banner-carousel .dots");
  const nextBtn = document.querySelector(".banner-carousel .next");
  const prevBtn = document.querySelector(".banner-carousel .prev");
  let index = 0;
  let timer;

  function createDots() {
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      if (i === 0) btn.classList.add("active");
      btn.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(btn);
    });
  }

  function goToSlide(n) {
    slides[index].classList.remove("active");
    dotsContainer.children[index].classList.remove("active");
    index = (n + slides.length) % slides.length;
    slides[index].classList.add("active");
    dotsContainer.children[index].classList.add("active");
    resetTimer();
  }

  function nextSlide() {
    goToSlide(index + 1);
  }

  function prevSlide() {
    goToSlide(index - 1);
  }

  function autoSlide() {
    timer = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  function resetTimer() {
    clearInterval(timer);
    autoSlide();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  createDots();
  autoSlide();
})();

// Force light mode on load (ignore system theme)
localStorage.setItem("theme", "light");
document.body.classList.remove("dark");
document.body.classList.add("light");


// ---------------- HERO CAROUSEL ----------------
function(){
  const slides = document.querySelectorAll(".og-carousel-slide");
  const nextBtn = document.querySelector(".og-carousel-next");
  const prevBtn = document.querySelector(".og-carousel-prev");
  const dotsContainer = document.querySelector(".og-carousel-dots");

  let index = 0;
  let timer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if(i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(n) {
    slides[index].classList.remove("active");
    dotsContainer.children[index].classList.remove("active");
    index = (n + slides.length) % slides.length;
    slides[index].classList.add("active");
    dotsContainer.children[index].classList.add("active");
    resetTimer();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  function autoPlay() {
    timer = setInterval(next, 5000);
  }

  function resetTimer() {
    clearInterval(timer);
    autoPlay();
  }

  autoPlay();
})();
