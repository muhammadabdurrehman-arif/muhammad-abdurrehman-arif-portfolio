// ============================================================
//                    MOBILE MENU TOGGLE
// ============================================================

const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuIcon.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        nav.classList.remove('active');
        menuIcon.classList.remove('active');
    }
});

// ============================================================
//                ACTIVE LINK HIGHLIGHTING
// ============================================================

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    // Add active class to header on scroll
    if (window.scrollY > 100) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }

    // Update active navigation link
    updateActiveLink();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ============================================================
//            DYNAMIC HEADLINE TEXT ROTATION
// ============================================================

const dynamicHeadline = document.querySelector('.dynamic-headline');
const headlineSpans = document.querySelectorAll('.dynamic-headline span');

// Optional: Add periodic text update animation
let currentIndex = 0;

function rotateHeadlines() {
    headlineSpans.forEach((span, index) => {
        span.style.opacity = index === currentIndex ? '1' : '0';
        span.style.visibility = index === currentIndex ? 'visible' : 'hidden';
    });

    currentIndex = (currentIndex + 1) % headlineSpans.length;
}

// Rotate every 3 seconds
setInterval(rotateHeadlines, 3000);

// ============================================================
//              RESUME TAB SWITCHING
// ============================================================

const resumeButtons = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and details
        resumeButtons.forEach(btn => btn.classList.remove('active'));
        resumeDetails.forEach(detail => detail.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Add active class to corresponding detail
        const tabName = button.getAttribute('data-tab');
        const activeDetail = document.getElementById(`${tabName}-detail`);
        if (activeDetail) {
            activeDetail.classList.add('active');
        }
    });
});

// Initialize with first tab active
if (resumeButtons.length > 0) {
    resumeButtons[0].click();
}

// ============================================================
//              SMOOTH SCROLL TO ANCHOR
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================
//              CONTACT FORM SUBMISSION
// ============================================================

const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            showNotification(
                'Message sent successfully! I\'ll get back to you soon.',
                'success'
            );

            // Optional: Send via email service
            sendFormViaEmail(name, email, phone, subject, message);
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send form via email service (integrate with your backend)
function sendFormViaEmail(name, email, phone, subject, message) {
    // Replace with your actual email service endpoint
    // Example using EmailJS or your backend API
    
    const formData = {
        to: 'abdurrehman.arif.dev@gmail.com',
        from: email,
        name: name,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Uncomment to enable actual email sending
    /*
    fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .catch(error => console.error('Email error:', error));
    */

    console.log('Form data ready to send:', formData);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '0.95rem',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });

    // Set type-specific styles
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00D9FF, #7B2CBF)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 8px 20px rgba(0, 217, 255, 0.3)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #FF6B6B, #EE5A6F)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.3)';
    } else {
        notification.style.background = 'rgba(26, 31, 58, 0.95)';
        notification.style.color = '#E8EAED';
        notification.style.border = '1px solid rgba(0, 217, 255, 0.3)';
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add animation styles
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

// ============================================================
//              SCROLL ANIMATIONS
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to service boxes and portfolio items
document.querySelectorAll('.services-box, .portfolio-box, .resume-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ============================================================
//              DOWNLOAD CV TRACKING
// ============================================================

const downloadBtn = document.querySelector('a[download]');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        // Track download event
        console.log('CV Download initiated at:', new Date().toISOString());
        
        // Optional: Send analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cv_download', {
                'event_category': 'engagement',
                'event_label': 'Portfolio CV'
            });
        }
    });
}

// ============================================================
//              KEYBOARD NAVIGATION
// ============================================================

// Allow tab navigation between resume buttons
resumeButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextButton = resumeButtons[index + 1] || resumeButtons[0];
            nextButton.focus();
            nextButton.click();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevButton = resumeButtons[index - 1] || resumeButtons[resumeButtons.length - 1];
            prevButton.focus();
            prevButton.click();
        }
    });
});

// ============================================================
//              PAGE INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    updateActiveLink();

    // Initialize animated bars animation
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.setProperty('--i', bars.length - index);
    });

    // Add loaded state
    document.body.classList.add('loaded');

    // Log initialization
    console.log('Portfolio website loaded successfully');
});

// ============================================================
//              PERFORMANCE OPTIMIZATION
// ============================================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveLink();
    });
}, { passive: true });

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================
//              ACCESSIBILITY FEATURES
// ============================================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
Object.assign(skipLink.style, {
    position: 'absolute',
    top: '-40px',
    left: '0',
    background: 'var(--accent-cyan)',
    color: 'var(--dark-bg)',
    padding: '8px',
    textDecoration: 'none',
    zIndex: '100'
});

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.prepend(skipLink);

// Focus management for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on Escape
        nav.classList.remove('active');
        menuIcon.classList.remove('active');
    }
});

console.log('✨ Portfolio JavaScript loaded - Interactive features enabled');
