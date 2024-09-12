document.addEventListener('DOMContentLoaded', () => {
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const cardWidth = document.querySelector('.carousel-wrapper > *').offsetWidth + 32; // 32px for margins

  let offset = 0;

  function updateCarousel() {
    carouselWrapper.style.transform = `translateX(-${offset}px)`;
  }

  prevBtn.addEventListener('click', () => {
    offset = Math.max(offset - cardWidth, 0);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    const maxOffset = carouselWrapper.scrollWidth - carouselWrapper.offsetWidth;
    offset = Math.min(offset + cardWidth, maxOffset);
    updateCarousel();
  });
});
