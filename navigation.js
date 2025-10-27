// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    showSection('home');
    initEventListeners();
});

function initEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Login modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
        });

        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });

        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Initialize animations for the section
        setTimeout(() => {
            initAnimations();
        }, 100);
    }
}