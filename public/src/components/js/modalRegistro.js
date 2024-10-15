// src/components/js/modalLogic.js

export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal?.classList.remove("opacity-0", "pointer-events-none");
    modal?.classList.add("opacity-100", "pointer-events-auto");
  }
  
  export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal?.classList.add("opacity-0", "pointer-events-none");
    modal?.classList.remove("opacity-100", "pointer-events-auto");
  }
  
  // Cerrar modal al hacer clic fuera del contenido del modal o al presionar 'Escape'
  export function initializeModal(modalId) {
    const modal = document.getElementById(modalId);
  
    // Cerrar al hacer clic fuera del modal
    modal?.addEventListener('click', function (e) {
      // Verifica si el objetivo del clic es el fondo del modal (no su contenido)
      if (e.target === modal) {
        closeModal(modalId);
      }
    });
  
    // Cerrar al presionar la tecla 'Escape'
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal(modalId);
      }
    });
  }
  