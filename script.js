document.addEventListener('DOMContentLoaded', () => {
  // 1. Mensaje dinámico al enviar el formulario de Netlify
  const formExpositor = document.querySelector('.form-expositor');

  if (formExpositor) {
    formExpositor.addEventListener('submit', (e) => {
      // Si el envío se procesa correctamente en Netlify, podemos dar retroalimentación visual al usuario
      const submitButton = formExpositor.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerText = 'Enviando solicitud...';
    });
  }

  // 2. Efecto de sombra dinámica en la barra de navegación al hacer scroll
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      header.style.transition = 'box-shadow 0.3s ease';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  });

  // 3. Confirmación en consola para verificar que el script cargó correctamente
  console.log('Sitio web de FeriHelado (FEXVEN) inicializado correctamente.');
});