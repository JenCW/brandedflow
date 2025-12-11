// Service Modal System
const serviceData = {
    tenant: {
        title: 'Tenant Improvements',
        image: 'images/Work-pics-and-vids/IMG_0480.webp',
        description: 'Transform commercial spaces with complete tenant improvement build-outs that exceed expectations. We handle every aspect of your project from initial design through final inspection.',
        details: `Our tenant improvement services include comprehensive planning, permitting, construction, and finish work that creates impressive commercial environments. We specialize in minimizing disruption to existing tenants while delivering high-quality results on time and on budget.`,
        includes: [
            'Complete space planning and design',
            'Permit acquisition and code compliance',
            'Demolition and site preparation',
            'Electrical, plumbing, and HVAC systems',
            'Framing, drywall, and ceiling installation',
            'Flooring installation (carpet, tile, hardwood)',
            'Custom millwork and cabinetry',
            'Lighting and fixture installation',
            'Final finishes and punch list completion',
            'ADA compliance and accessibility features'
        ]
    },
    hotel: {
        title: 'Hotel Upgrades',
        image: 'images/Work-pics-and-vids/IMG_0468.webp',
        description: 'Elevate guest experiences with stunning hotel renovations that increase property value and guest satisfaction ratings.',
        details: `From guest room refreshes to complete lobby transformations, we understand the unique challenges of hotel renovations. Our team works efficiently to minimize downtime while delivering luxurious results that wow guests and drive bookings.`,
        includes: [
            'Guest room renovations and upgrades',
            'Lobby and reception area transformations',
            'Bathroom modernization with luxury fixtures',
            'Custom furniture and built-in installations',
            'Upgraded lighting and ambiance systems',
            'High-end flooring and wall treatments',
            'Energy-efficient HVAC and systems',
            'Soundproofing and privacy enhancements',
            'ADA-compliant accessibility upgrades',
            'Phased construction to maintain operations'
        ]
    },
    commercial: {
        title: 'Commercial Remodels',
        image: 'images/Work-pics-and-vids/IMG_0475.webp',
        description: 'Complete commercial space transformations for offices, warehouses, and mixed-use properties that enhance functionality and aesthetics.',
        details: `Whether you're updating an outdated office or converting a warehouse to modern commercial space, our team brings expertise in large-scale commercial renovations. We manage complex projects with multiple trades, ensuring seamless coordination and exceptional results.`,
        includes: [
            'Full structural assessments and planning',
            'Open floor plan conversions',
            'Modern HVAC and electrical systems',
            'Commercial-grade plumbing installations',
            'Steel and concrete structural work',
            'Loading dock and warehouse modifications',
            'Office buildout and partitioning',
            'Break room and restroom upgrades',
            'Exterior facade improvements',
            'Parking lot and site work coordination'
        ]
    },
    retail: {
        title: 'Retail Renovations',
        image: 'images/Work-pics-and-vids/IMG_0466.webp',
        description: 'Create retail environments that attract customers and drive sales through strategic design and quality construction.',
        details: `Your retail space is your brand's physical expression. We create compelling shopping environments with attention to customer flow, product display, and brand identity. From boutique storefronts to large retail spaces, we deliver renovations that boost your bottom line.`,
        includes: [
            'Storefront design and installation',
            'Custom display fixtures and shelving',
            'Strategic lighting for product presentation',
            'Durable commercial flooring solutions',
            'Point-of-sale area optimization',
            'Fitting room construction and upgrades',
            'Security system integration',
            'ADA-compliant accessibility features',
            'HVAC for customer comfort',
            'Signage coordination and installation'
        ]
    },
    office: {
        title: 'Office Remodels',
        image: 'images/Work-pics-and-vids/IMG_0463.webp',
        description: 'Modern office spaces that enhance productivity, reflect your brand, and attract top talent.',
        details: `The modern workplace is evolving, and your office should too. We create collaborative, inspiring work environments with flexible layouts, modern technology infrastructure, and design elements that boost employee morale and productivity.`,
        includes: [
            'Open office and collaborative space design',
            'Private office and conference room construction',
            'Modern lighting and electrical systems',
            'Data and network infrastructure',
            'Soundproofing and acoustic treatments',
            'Break room and kitchen installations',
            'Restroom upgrades and ADA compliance',
            'Custom millwork and built-ins',
            'Flooring installation (carpet, tile, hardwood)',
            'HVAC zoning for comfort and efficiency'
        ]
    },
    reception: {
        title: 'Hotel Reception & Lobby',
        image: 'images/Work-pics-and-vids/IMG_0464.webp',
        description: 'First impressions that wow guests and set the tone for an exceptional stay.',
        details: `Your lobby and reception area are the gateway to your guest experience. We create stunning, functional spaces that combine luxury aesthetics with operational efficiency, ensuring smooth check-ins and memorable first impressions.`,
        includes: [
            'Custom reception desk design and build',
            'Luxury flooring installations',
            'Statement lighting and chandeliers',
            'Seating area construction and furnishing',
            'Accent walls and architectural details',
            'Technology integration (TVs, displays, WiFi)',
            'Concierge and bell desk areas',
            'Luggage storage solutions',
            'Ambient lighting and mood systems',
            'High-end finishes and millwork'
        ]
    }
};

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.service-modal-close');
    const serviceCards = document.querySelectorAll('.service-card');

    // Add click event to all service cards
    serviceCards.forEach(card => {
        const btn = card.querySelector('.service-detail-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceType = card.getAttribute('data-service');
                openModal(serviceType);
            });
        }
    });

    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function openModal(serviceType) {
        const data = serviceData[serviceType];
        if (!data) return;

        // Set image
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalImage').alt = data.title;

        // Build content
        const includesList = data.includes.map(item => `<li>${item}</li>`).join('');

        const content = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <p>${data.details}</p>
            <h3>What's Included:</h3>
            <ul>
                ${includesList}
            </ul>
            <div style="margin-top: 3rem; text-align: center;">
                <a href="contact.html" class="cta-button">Request a Free Quote</a>
            </div>
        `;

        document.getElementById('modalBody').innerHTML = content;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
