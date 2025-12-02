import { initMobileMenu } from './mobile.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initBackToTop } from './backToTop.js';
import { initCurrentYear } from './currentYear.js';
import { initFormSubmit } from './form.js';
import { initAnimations } from './animations.js';
import { initSkillBars } from './skillBars.js';
import { initProjectCarousels } from './projectCarousel.js';
import { initHoverEffects } from './hoverEffects.js';
import { initNotificationStyles } from './notifications.js';
import { loadPartials } from './htmlLoader.js';

// Punto único de entrada: inicializa todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function () {
  console.log('Portfolio Hugo Torres - Cargado (modular)');

  // Cargar partials HTML (si hay placeholders)
  await loadPartials();

  // Inicializar estilos de notificaciones si está disponible
  if (typeof initNotificationStyles === 'function') {
    initNotificationStyles();
  }

  // Inicializar módulos una vez el DOM (y partials) están listos
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initCurrentYear();
  initFormSubmit();
  initAnimations();
  initSkillBars();
  initProjectCarousels();
  initHoverEffects();
});

// Efecto visual en la navegación cuando el usuario hace scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.main-nav');
  const scrollY = window.scrollY;

  if (!nav) return;

  if (scrollY > 50) {
    nav.style.background = 'rgba(15, 23, 42, 0.98)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(15, 23, 42, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.boxShadow = 'none';
  }
});

// Preloader simple (opcional)
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
