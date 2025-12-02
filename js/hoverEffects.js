export function initHoverEffects() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  const techs = document.querySelectorAll('.tech-item');
  techs.forEach((item) => {
    const logo = item.querySelector('.tech-logo');
    if (!logo) return;
    item.addEventListener('mouseenter', () => {
      logo.style.transform = 'rotate(15deg) scale(1.1)';
    });
    item.addEventListener('mouseleave', () => {
      logo.style.transform = 'rotate(0) scale(1)';
    });
  });
}
