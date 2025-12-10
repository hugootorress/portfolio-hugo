import { showNotification } from './notifications.js';

export function initFormSubmit() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      try {
        // Recopilar datos del formulario
        const formData = new FormData(contactForm);
        const urlEncoded = new URLSearchParams(formData);

        // Enviar a la función serverless
        const response = await fetch('/.netlify/functions/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: urlEncoded.toString(),
        });

        if (response.ok) {
          showNotification('¡Mensaje enviado correctamente!', 'success');
          contactForm.reset();
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error: ${response.status}`);
        }
      } catch (error) {
        console.error('Error enviando formulario:', error);
        showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'info');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}
