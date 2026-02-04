// Efecto de escritura para el nombre en el hero
export function initTypingEffect() {
  const typingElement = document.getElementById('typing-name');
  
  if (!typingElement) {
    console.log('typing-name element not found');
    return;
  }
  
  const text = 'Hugo.';
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 150);
    }
  }
  
  setTimeout(typeWriter, 500);
}
