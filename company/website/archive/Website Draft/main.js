// ============================================
// BRANDED + FLOW - PREMIUM PARALLAX ANIMATIONS
// Inspired by companion.uprock.pro
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. GIANT PARALLAX WORD - THE HERO EFFECT
    // This word scrolls down the entire page
    // ============================================

    // ============================================
    // STACKED WORDS - PARALLAX EFFECT
    // Words are visible immediately, move as you scroll
    // ============================================

    const parallaxContainer = document.querySelector('.parallax-words-container');
    const parallaxWords = document.querySelectorAll('.parallax-word-line');

    if (parallaxContainer && parallaxWords.length > 0) {
        console.log('Parallax initialized with', parallaxWords.length, 'words');

        // Make all words visible immediately
        parallaxWords.forEach(word => word.classList.add('visible'));

        function updateParallax() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // PARALLAX: Container moves DOWN slower than scroll (creates depth)
            const parallaxSpeed = 0.4; // 40% of scroll speed
            const translateY = scrollY * parallaxSpeed;

            // Apply transform
            parallaxContainer.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;

            // COLOR CHANGE: "inseparable" changes color based on scroll
            const highlightWord = document.querySelector('.parallax-word-highlight');
            if (highlightWord) {
                const scrollProgress = scrollY / windowHeight;
                if (scrollProgress > 0.3 && scrollProgress < 0.7) {
                    highlightWord.style.color = '#00bcd4'; // Cyan
                } else {
                    highlightWord.style.color = '#f4c430'; // Gold
                }
            }

            // FADE OUT when scrolled past hero
            const fadeStart = windowHeight * 0.6;
            const fadeEnd = windowHeight * 1.5;
            if (scrollY > fadeStart) {
                const fadeProgress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
                parallaxContainer.style.opacity = 1 - fadeProgress;
            } else {
                parallaxContainer.style.opacity = 1;
            }
        }

        // Initial call
        updateParallax();

        // Scroll handler with requestAnimationFrame for smooth performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });

        console.log('Parallax ready!');
    } else {
        console.warn('Parallax elements not found!');
    }

    // ============================================
    // 2. SECTION KEY WORDS - Each section has ONE key word
    // ============================================

    const sectionKeyWords = document.querySelectorAll('.section-key-word');

    function updateSectionKeyWords() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        sectionKeyWords.forEach(word => {
            const rect = word.getBoundingClientRect();
            const section = word.closest('section');

            if (!section) return;

            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;

            // Calculate progress through section (0 = top of viewport, 1 = bottom)
            const progress = 1 - (sectionTop / windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            // Parallax movement within section
            const speed = parseFloat(word.dataset.speed) || 0.5;
            const maxMove = 100;
            const translateY = (clampedProgress - 0.5) * maxMove * speed;

            // Color transition
            const startColor = word.dataset.colorStart || '#1a1a1a';
            const endColor = word.dataset.colorEnd || '#f4c430';

            // Scale effect
            const scale = 1 + (clampedProgress * 0.2);

            word.style.transform = `translateY(${translateY}px) scale(${scale})`;

            // Color changes when word is in center of viewport
            if (clampedProgress > 0.4 && clampedProgress < 0.8) {
                word.style.color = endColor;
            } else {
                word.style.color = startColor;
            }
        });
    }

    // Throttled scroll handler for section words
    let sectionWordsTicking = false;
    window.addEventListener('scroll', () => {
        if (!sectionWordsTicking) {
            requestAnimationFrame(() => {
                updateSectionKeyWords();
                sectionWordsTicking = false;
            });
            sectionWordsTicking = true;
        }
    });

    // Initial call
    updateSectionKeyWords();

    // ============================================
    // 3. HEADER SCROLL EFFECT
    // ============================================

    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // 4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.animate-fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // ============================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 6. HORIZONTAL PARALLAX FOR PROOF SECTION
    // ============================================

    const proofContainer = document.querySelector('.proof-parallax-container');
    const proofWrapper = document.querySelector('.proof-content-wrapper');

    if (proofContainer && proofWrapper) {
        function updateHorizontalParallax() {
            const containerRect = proofContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only animate when section is in viewport
            if (containerRect.top < windowHeight && containerRect.bottom > 0) {
                // Calculate how far through the viewport the section is
                const sectionHeight = containerRect.height;
                const visibleTop = Math.max(0, -containerRect.top);
                const visibleProgress = visibleTop / (sectionHeight - windowHeight + 200);
                const clampedProgress = Math.max(0, Math.min(1, visibleProgress));

                // Horizontal movement: start at 0, move left as you scroll
                // Limit to 200px max movement
                const maxOffset = 200;
                const offset = clampedProgress * maxOffset;

                proofWrapper.style.transform = `translateX(-${offset}px)`;
            }
        }

        let horizontalTicking = false;
        window.addEventListener('scroll', () => {
            if (!horizontalTicking) {
                requestAnimationFrame(() => {
                    updateHorizontalParallax();
                    horizontalTicking = false;
                });
                horizontalTicking = true;
            }
        });

        updateHorizontalParallax();
        window.addEventListener('resize', updateHorizontalParallax);
    }

    // ============================================
    // 7. CUSTOM CURSOR
    // ============================================

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .showcase-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // ============================================
    // 8. STAGGERED GRID ITEM ANIMATIONS
    // ============================================

    const gridItems = document.querySelectorAll('.system-item, .build-item, .quick-start-item, .flow-step');
    gridItems.forEach((item, index) => {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });
        itemObserver.observe(item);
    });

    // ============================================
    // 9. SHOWCASE ITEMS - MAGNETIC HOVER
    // ============================================

    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const tiltX = deltaY * 8;
            const tiltY = deltaX * -8;

            item.style.transform = `
                translateY(-16px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                scale(1.02)
            `;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // ============================================
    // 10. FAQ ACCORDION
    // ============================================

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });

            item.classList.toggle('open', !isOpen);
        });
    });

    // ============================================
    // 11. MORPHING BLOB BACKGROUND
    // ============================================

    const blob = document.createElement('div');
    blob.className = 'morphing-blob';
    blob.style.cssText = `
        position: fixed;
        width: 500px;
        height: 500px;
        background: linear-gradient(135deg, rgba(244, 196, 48, 0.1), rgba(0, 188, 212, 0.1));
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        filter: blur(80px);
        pointer-events: none;
        z-index: 0;
        animation: morph 20s ease-in-out infinite;
        opacity: 0;
        transition: opacity 1s;
    `;
    document.body.appendChild(blob);

    setTimeout(() => blob.style.opacity = '1', 100);

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 200;
        const y = (e.clientY / window.innerHeight - 0.5) * 200;
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });

    // ============================================
    // 12. HERO DECORATION PARALLAX
    // ============================================

    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroDecoration.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    console.log("Branded + Flow: Premium Parallax System Loaded!");
});
