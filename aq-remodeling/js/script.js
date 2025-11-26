// Luxury Interactive Enhancements for AQ Remodeling

// Hero Slider with Ken Burns Effect
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function nextSlide() {
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Auto-advance every 6 seconds
if (slides.length > 0) {
    setInterval(nextSlide, 6000);
}

// Smooth Scroll & Navbar Effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.textContent = '☰';
        }
    }
});

// FAQ Accordion with smooth animation
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Portfolio Filter with elegant animation
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            // Filter portfolio items with stagger effect
            portfolioItems.forEach((item, index) => {
                const categories = item.dataset.category.split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add transitions to portfolio items
    portfolioItems.forEach(item => {
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Contact Form Handling with validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Success
        console.log('Form submitted:', data);
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
        contactForm.reset();

        // In production, integrate with form service
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 1.5rem 2rem;
        background: ${type === 'success' ? 'rgba(212, 175, 55, 0.95)' : 'rgba(231, 76, 60, 0.95)'};
        color: #0a0a0a;
        border-radius: 4px;
        font-weight: 500;
        letter-spacing: 1px;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.card, .testimonial, .stat-item, .portfolio-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollObserver.observe(element);
});

// Stagger animation for grid items
document.querySelectorAll('.grid-3, .grid-2, .grid-4').forEach(grid => {
    const items = grid.querySelectorAll('.card, .testimonial');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Mouse move effect on cards (3D tilt)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Active navigation based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Number counter animation for stats
const animateNumbers = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    };

    updateNumber();
};

// Observe stat numbers for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            if (number && !number.classList.contains('animated')) {
                number.classList.add('animated');
                animateNumbers(number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Cursor trail effect (luxury touch)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 968) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }

        // Remove existing trail
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

        // Create new trail
        cursorTrail.forEach((point, index) => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: ${4 - (index * 0.3)}px;
                height: ${4 - (index * 0.3)}px;
                background: rgba(212, 175, 55, ${0.5 - (index * 0.05)});
                border-radius: 50%;
                pointer-events: none;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 100);
        });
    }
});

// Image lazy loading enhancement
document.querySelectorAll('.image-placeholder, .video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('mouseenter', () => {
        placeholder.classList.add('shimmer');
    });

    placeholder.addEventListener('mouseleave', () => {
        placeholder.classList.remove('shimmer');
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c⚡ AQ Remodeling - Luxury Experience Loaded', 'color: #d4af37; font-size: 16px; font-weight: bold;');
