// src/scripts/modalHandler.js

// Función para inicializar un modal
function initializeModal(modalId, buttonId, closeCallback) {
    const modal = document.getElementById(modalId);
    const button = document.getElementById(buttonId);
    
    // Verifica que los elementos existen
    if (!button || !modal) {
        console.error(`Elemento del modal o botón no encontrado: ${modalId} o ${buttonId}`);
        return;
    }

    // Función para mostrar el modal
    function showModal() {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');

        // Animar el contenido del modal
        setTimeout(() => {
            const modalContent = modal.querySelector('div');
            modalContent.classList.remove('scale-95', 'translate-y-4');
        }, 10);

        document.body.style.overflow = 'hidden';
    }

    // Función para ocultar el modal
    function hideModal() {
        const modalContent = modal.querySelector('div');
        modalContent.classList.add('scale-95', 'translate-y-4');
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';

        if (closeCallback) {
            closeCallback();
        }
    }

    // Manejar la tecla de escape para cerrar el modal
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            hideModal();
        }
    }

    // Agregar eventos para mostrar el modal
    button.addEventListener('click', showModal);

    // Cerrar el modal al hacer clic fuera de él
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Manejar la tecla de escape
    document.addEventListener('keydown', handleEscapeKey);

    return {
        show: showModal,
        hide: hideModal
    };
}

// Inicializar modales cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const loginModalHandler = initializeModal('login-modal', 'login-button');
    const registerModalHandler = initializeModal('register-modal', 'register-button');

    // Cambiar del modal de inicio de sesión al modal de registro
    const registerLink = document.getElementById('register-link-2');
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModalHandler.hide();
            setTimeout(() => registerModalHandler.show(), 300);
        });
    }
});
