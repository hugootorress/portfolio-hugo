export function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');

        if (entry.target.classList.contains('skill-progress')) {
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 300);
        }
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .detail-card, .tech-item'
  );
  animateElements.forEach((el) => observer.observe(el));
}
