import { showNotification } from './notifications.js';

export function initFormSubmit() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch('/', { method: 'POST', body: formData })
        .then((response) => {
          if (response.ok) {
            showNotification('¡Mensaje enviado correctamente!', 'success');
            contactForm.reset();
          } else {
            throw new Error('Respuesta de red no válida');
          }
        })
        .catch((error) => {
          console.error('Error enviando formulario:', error);
          showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'info');
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }
}
