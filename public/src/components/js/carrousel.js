document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const items = Array.from(carouselWrapper.children);
    const itemWidth = items[0].offsetWidth + 32; // Ajusta el margen si es necesario

    // Duplicar los elementos
    items.forEach(item => {
      const clone = item.cloneNode(true);
      carouselWrapper.appendChild(clone);
    });

    // Ajustar el ancho del contenedor del carrusel
    carouselWrapper.style.width = `${itemWidth * items.length * 2}px`;

    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * itemWidth;
      carouselWrapper.style.transform = `translateX(${offset}px)`;
    }

    function moveToIndex(index) {
      if (index < 0) {
        carouselWrapper.style.transition = 'none';
        currentIndex = items.length - 1;
        updateCarousel();
        setTimeout(() => {
          carouselWrapper.style.transition = 'transform 0.5s ease-in-out';
          currentIndex = items.length;
          updateCarousel();
        }, 0);
    } else if (index >= items.length * 2) {
        carouselWrapper.style.transition = 'none';
        currentIndex = items.length;
        updateCarousel();
        setTimeout(() => {
          carouselWrapper.style.transition = 'transform 0.5s ease-in-out';
          currentIndex = items.length + 1;
          updateCarousel();
        }, 0);
      } else {
        currentIndex = index;
        updateCarousel();
      }
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
      moveToIndex(currentIndex - 1);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      moveToIndex(currentIndex + 1);
    });

    // Inicializar en la primera imagen
    moveToIndex(items.length);
  });