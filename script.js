// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initTabs();
    initForms();
    initScrollEffects();
    initFloatingCards();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .event-card, .job-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelector('.hero-stats');

    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('animate-fade-in-up'), 200);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.classList.add('animate-fade-in-up'), 400);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('animate-fade-in-up'), 600);
    }
    if (heroStats) {
        setTimeout(() => heroStats.classList.add('animate-fade-in-up'), 800);
    }
}

// Tab functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Form functionality
function initForms() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Sending message...', 'info');
            
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
            }, 2000);
        });
    }

    // Button click handlers
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3, .about-stat h3, .talent-stat h4');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const suffix = element.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Floating cards animation
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Event listeners for interactive elements
document.addEventListener('click', function(e) {
    // Event card interactions
    if (e.target.closest('.event-card')) {
        const card = e.target.closest('.event-card');
        const button = card.querySelector('.btn');
        
        if (e.target === button) {
            const eventName = card.querySelector('h3').textContent;
            // showNotification(`Joining ${eventName}...`, 'info');
            
            // setTimeout(() => {
            //     showNotification(`Successfully joined ${eventName}!`, 'success');
            // }, 1500);
            // window.open(`https://docs.google.com/forms/d/e/1FAIpQLSf50-0000000000000000000000000000000000000000/viewform?usp=header`, '_blank');
        }
    }
    
    // Job card interactions
    if (e.target.closest('.job-card')) {
        const card = e.target.closest('.job-card');
        const button = card.querySelector('.btn');
        
        if (e.target === button) {
            const jobTitle = card.querySelector('h3').textContent;
            // showNotification(`Applying for ${jobTitle}...`, 'info');
            
            // setTimeout(() => {
            //     showNotification(`Application submitted for ${jobTitle}!`, 'success');
            // }, 1500);
            // window.open(`https://docs.google.com/forms/d/e/1FAIpQLSf50-0000000000000000000000000000000000000000/viewform?usp=header`, '_blank');
        }
    }
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages(); 