// Función para inicializar el menú
function initializeMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');

  // Asegúrate de que el menú esté oculto al inicializar
  if (mobileMenu) {
    mobileMenu.classList.add('translate-x-full');
  }

  if (menuToggle && mobileMenu && menuClose) {
    // Eliminar los event listeners existentes para evitar duplicados
    menuToggle.removeEventListener('click', toggleMenu);
    menuClose.removeEventListener('click', closeMenu);

    // Añadir nuevos event listeners
    menuToggle.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', closeMenu);
  }
}

// Función para alternar el menú
function toggleMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('translate-x-full');
}

// Función para cerrar el menú
function closeMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.add('translate-x-full');
}

// Inicializar el menú cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeMenu);

// Inicializar el menú cuando se navega a una nueva página
document.addEventListener('astro:page-load', initializeMenu);