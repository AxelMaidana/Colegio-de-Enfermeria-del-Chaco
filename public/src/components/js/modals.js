document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const finalModal = document.getElementById("final-modal");
  
    document.getElementById("inscribirme-btn").onclick = function () {
      modal.classList.remove("opacity-0", "pointer-events-none");
    };
  
    document.getElementById("login-btn").onclick = function () {
      modal.classList.add("opacity-0", "pointer-events-none");
      loginModal.classList.remove("opacity-0", "pointer-events-none");
    };
  
    document.getElementById("register-link").onclick = function () {
      modal.classList.add("opacity-0", "pointer-events-none");
      registerModal.classList.remove("opacity-0", "pointer-events-none");
    };
  
    document.getElementById("register-btn").onclick = function () {
      registerModal.classList.add("opacity-0", "pointer-events-none");
      finalModal.classList.remove("opacity-0", "pointer-events-none");
    };
  
    document.getElementById("close-final-btn").onclick = function () {
      finalModal.classList.add("opacity-0", "pointer-events-none");
    };
  
    // Puedes agregar lógica adicional para cerrar los modales si es necesario
  });
  