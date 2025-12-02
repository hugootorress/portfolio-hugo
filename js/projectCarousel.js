export function initProjectCarousels() {
  const carousels = document.querySelectorAll('.project-carousel');

  carousels.forEach((carousel) => {
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelector('.carousel-slides');
    const slideElements = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const indicators = carousel.querySelectorAll('.indicator');
    const thumbnails = carousel.querySelectorAll('.thumbnail');
    const currentSlideSpan = carousel.querySelector('.current-slide');
    const totalSlidesSpan = carousel.querySelector('.total-slides');

    let currentSlide = 0;
    const totalSlides = slideElements.length;

    if (totalSlidesSpan) {
      totalSlidesSpan.textContent = totalSlides;
    }

    function updateCarousel() {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;

      slideElements.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
      });

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });

      thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === currentSlide);
      });

      if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide + 1;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    let autoSlideInterval;

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      }, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    }

    startAutoSlide();

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    carousel.addEventListener('touchstart', stopAutoSlide);
    carousel.addEventListener('touchend', startAutoSlide);

    updateCarousel();
  });

  const demoBtns = document.querySelectorAll('.demo-btn');
  const demoModal = document.querySelector('.demo-modal');
  const closeModal = document.querySelector('.close-modal');

  if (demoModal && closeModal) {
    demoBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeModal.addEventListener('click', () => {
      demoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        demoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
}
