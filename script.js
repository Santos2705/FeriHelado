document.addEventListener('DOMContentLoaded', () => {
  // 1. Activa el desvanecimiento de entrada al cargar la página
  document.body.classList.add('page-loaded');

  // 2. Transición suave al hacer clic en enlaces internos
  const links = document.querySelectorAll('a[href]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Solo aplica si es un enlace interno a otra página (.html) y no un ancla (#) o enlace externo
      if (href && !href.startsWith('#') && !href.startsWith('http') && !link.hasAttribute('target')) {
        e.preventDefault(); // Detiene el cambio de golpe
        document.body.classList.add('page-exiting'); // Inicia la animación de salida

        // Espera 350ms a que termine la animación antes de cambiar de página
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      }
    });
  });

  // --- Lógica previa (Carrusel y Navegación) ---
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (slides.length > 0) {
    let currentSlide = 0;

    const showSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove('active'));
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
    };

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
      prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4000);
  }

  // Sombra del header al hacer scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  });
});