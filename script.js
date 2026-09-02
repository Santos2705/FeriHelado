document.addEventListener('DOMContentLoaded', () => {
  // Transición de entrada suave
  document.body.classList.add('page-loaded');

  // NAVEGACIÓN ENTRE PÁGINAS
  const links = document.querySelectorAll('a[href]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (!href) return;

      // 1. Validaciones para ignorar links especiales
      const isExternal = href.startsWith('http') || link.hasAttribute('target');
      const isAnchor = href.startsWith('#');
      const isMailto = href.startsWith('mailto:');
      const isTel = href.startsWith('tel:');

      // Si es un link externo, ancla o mail, dejamos que el navegador actúe normal
      if (isExternal || isAnchor || isMailto || isTel) {
        return;
      }

      // 2. Normalizar ruta actual y destino para comparar si es la misma página
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage = href.split('/').pop();

      // Si la persona hace clic en la página donde YA está, no hacemos nada
      if (currentPage === targetPage) {
        return;
      }

      // 3. Si es una página HTML diferente, ejecutamos el cambio con animación
      e.preventDefault();
      document.body.classList.add('page-exiting');

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // --- LÓGICA DE CARRUSELES ---
  const allCarousels = document.querySelectorAll('.carousel-container, .mini-carousel');

  allCarousels.forEach(container => {
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    if (slides.length > 0) {
      let currentSlide = 0;

      const showSlide = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
      };

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showSlide(currentSlide + 1);
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showSlide(currentSlide - 1);
        });
      }

      setInterval(() => {
        showSlide(currentSlide + 1);
      }, 4000);
    }
  });

  // --- MANTENER TAMAÑO FIJO DEL HEADER ---
  const header = document.querySelector('.header');
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Ejecuta al cargar para evitar saltos de tamaño
  }

  // --- MARQUESINA INFINITA FLUIDA PARA PATROCINANTES (PC Y MÓVIL) ---
  const sponsorTracks = document.querySelectorAll('.sponsors-track');

  sponsorTracks.forEach(track => {
    // Clonamos los logos dinámicamente para que la lista nunca se quede vacía
    const originalLogos = Array.from(track.children);
    originalLogos.forEach(logo => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });

    let scrollPos = 0;
    const speed = 0.6; // Ajusta la velocidad según tu preferencia (más alto = más rápido)

    function animateSponsors() {
      scrollPos += speed;

      // Al desplazarse la mitad del riel (los elementos originales), se reinicia a 0 imperceptiblemente
      if (scrollPos >= track.scrollWidth / 2) {
        scrollPos = 0;
      }

      track.style.transform = `translateX(-${scrollPos}px)`;
      requestAnimationFrame(animateSponsors);
    }

    animateSponsors();
  });
});

// LÓGICA DE GIRADO DE TARJETAS (FLIP CARD)
function toggleCard(cardElement) {
  // 1. Si la tarjeta clickeada ya está volteada, la regresamos a su estado normal
  if (cardElement.classList.contains('flipped')) {
    cardElement.classList.remove('flipped');
    return;
  }

  // 2. Cerramos (des-volteamos) cualquier otra tarjeta que esté abierta
  const allCards = document.querySelectorAll('.flip-card');
  allCards.forEach(card => {
    card.classList.remove('flipped');
  });

  // 3. Volteamos únicamente la tarjeta seleccionada
  cardElement.classList.add('flipped');
}