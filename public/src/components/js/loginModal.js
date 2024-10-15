document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const loginModal = document.getElementById("login-modal");

    // Función para abrir el modal
    function openModal() {
        if (loginModal) {
            loginModal.classList.remove("opacity-0", "pointer-events-none");
            loginModal.classList.add("opacity-100", "pointer-events-auto");
        }
    }

    // Añade el evento de clic al botón
    if (loginButton) {
        loginButton.addEventListener("click", openModal);
    }

    // Cierra el modal si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (event.target === loginModal) {
            loginModal.classList.add("opacity-0", "pointer-events-none");
            loginModal.classList.remove("opacity-100", "pointer-events-auto");
        }
    }
});