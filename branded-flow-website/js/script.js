// Branded + Flow - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }

    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll('.service-card, .blog-card, .grid-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Pricing toggle
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingGrids = document.querySelectorAll('.pricing-grid');

    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            pricingTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get the category
            const category = this.dataset.category;

            // Show/hide pricing grids
            pricingGrids.forEach(grid => {
                if (grid.dataset.category === category) {
                    grid.classList.remove('hidden');
                } else {
                    grid.classList.add('hidden');
                }
            });
        });
    });
});
