// src/scripts/modalHandler.js

function initializeModals() {
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const loginModal = document.getElementById('login-modal');
    const registroModal = document.getElementById('register-modal');
    const registerLink = document.getElementById('register-link-2');
  
    function showModal(modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      setTimeout(() => {
        const modalContent = modal.querySelector('div');
        modalContent.classList.remove('scale-95', 'translate-y-4');
      }, 10);
      document.body.style.overflow = 'hidden';
    }
  
    function hideModal(modal) {
      const modalContent = modal.querySelector('div');
      modalContent.classList.add('scale-95', 'translate-y-4');
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        hideModal(loginModal);
        hideModal(registroModal);
      }
    }
  
    loginButton.addEventListener('click', () => showModal(loginModal));
    registerButton.addEventListener('click', () => showModal(registroModal));
  
    // Switch from login to register modal
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      hideModal(loginModal);
      setTimeout(() => showModal(registroModal), 300); // Wait for the hide transition to complete
    });
  
    // Close modals when clicking outside
    [loginModal, registroModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          hideModal(modal);
        }
      });
    });
  
    // Handle the Escape key
    document.addEventListener('keydown', handleEscapeKey);
  
    // Handle form submissions (prevent default for now)
    const loginForm = loginModal.querySelector('form');
    const registerForm = registroModal.querySelector('form');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your login logic here
      console.log('Login submitted');
    });
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your registration logic here
      console.log('Registration submitted');
    });
  }
  
  // Initialize modals when the page loads
  document.addEventListener('DOMContentLoaded', initializeModals);
  
  // Initialize modals when navigating to a new page (for SPA)
  document.addEventListener('astro:page-load', initializeModals);