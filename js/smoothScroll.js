// Desplazamiento suave a anclas
export function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#home') return;
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector('.main-nav');
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
