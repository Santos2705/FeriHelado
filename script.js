document.addEventListener('DOMContentLoaded', () => {
  // Manejo del estado del formulario de Netlify
  const formExpositor = document.querySelector('.form-expositor');

  if (formExpositor) {
    formExpositor.addEventListener('submit', () => {
      const submitButton = formExpositor.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerText = 'Enviando solicitud...';
    });
  }

  // Sombra dinámica en el menú
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      header.style.transition = 'box-shadow 0.3s ease';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  });

  console.log('FeriHelado - FEXVEN inicializado correctamente.');
});