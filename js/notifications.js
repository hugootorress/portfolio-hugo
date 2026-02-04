export function initNotificationStyles() {
  if (document.getElementById('app-notification-styles')) return;
  const style = document.createElement('style');
  style.id = 'app-notification-styles';
  style.textContent = `
  .notification.success { background: linear-gradient(135deg,#10b981,#34d399); }
  .notification.info { background: linear-gradient(135deg,#6366f1,#8b5cf6); }
  .notification { color: white; padding: 15px 25px; border-radius: 8px; display:flex; align-items:center; gap:10px; box-shadow:0 10px 25px rgba(0,0,0,0.3); z-index:10000; transform: translateX(120%); transition: transform .3s ease; position: fixed; top: 20px; right: 20px; }
  .notification i { font-size: 1.2rem; }
  `;
  document.head.appendChild(style);
}

export function showNotification(message, type = 'info') {
  initNotificationStyles();
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `\n    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>\n    <span>${message}</span>\n  `;
  document.body.appendChild(notification);
  requestAnimationFrame(() => (notification.style.transform = 'translateX(0)'));
  setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
