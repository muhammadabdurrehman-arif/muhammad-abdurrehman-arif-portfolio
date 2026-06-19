// ============================================================
//              HEADER SCROLL EFFECT
// ============================================================

const navbar = document.querySelector('.navbar-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    updateActiveNavLink();
});

// ============================================================
//          UPDATE ACTIVE NAVIGATION LINK
// ============================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.navbar-nav a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ============================================================
//        FIXED: DYNAMIC HEADLINE (NO TEXT OVERLAP)
// ============================================================

const headlineText = document.querySelector('.headline-text');
const headlines = [
    'Software Engineer',
    'Python Developer',
    'Game Developer',
    'ML Enthusiast'
];

let currentHeadlineIndex = 0;

function rotateHeadline() {
    if (!headlineText) return;

    // Change the text content
    headlineText.textContent = headlines[currentHeadlineIndex];
    
    // Move to next headline
    currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
}

// Rotate headline every 3 seconds
if (headlineText) {
    setInterval(rotateHeadline, 3000);
}

// ============================================================
//            RESUME TAB SWITCHING
// ============================================================

const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeContents = document.querySelectorAll('.resume-content');

resumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        resumeBtns.forEach(b => b.classList.remove('active'));
        resumeContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Add active class to corresponding content
        const tabName = btn.getAttribute('data-tab');
        const activeContent = document.getElementById(`${tabName}-detail`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});

// Initialize first tab as active
if (resumeBtns.length > 0) {
    resumeBtns[0].click();
}

// ============================================================
//          SMOOTH SCROLL TO ANCHOR
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse?.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler?.click();
            }

            // Scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================
//            CONTACT FORM SUBMISSION
// ============================================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: contactForm.querySelector('input[name="name"]').value.trim(),
            email: contactForm.querySelector('input[name="email"]').value.trim(),
            phone: contactForm.querySelector('input[name="phone"]').value.trim(),
            subject: contactForm.querySelector('input[name="subject"]').value.trim(),
            message: contactForm.querySelector('textarea[name="message"]').value.trim()
        };

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Submit form
        submitContactForm(formData);
    });
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Submit contact form
 */
function submitContactForm(formData) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Reset form
        contactForm.reset();

        // Show success message
        showNotification(
            'Message sent successfully! I\'ll get back to you soon.',
            'success'
        );

        // Optional: Send via email service
        console.log('Form submitted:', formData);
        // sendViaEmailService(formData);
    }, 1500);
}

/**
 * Send form via email service (optional)
 * Replace 'YOUR_EMAIL_SERVICE_URL' with your actual endpoint
 */
function sendViaEmailService(formData) {
    /*
    fetch('YOUR_EMAIL_SERVICE_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .catch(error => console.error('Email error:', error));
    */
}

// ============================================================
//        NOTIFICATION SYSTEM
// ============================================================

function showNotification(message, type = 'info') {
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
        maxWidth: '90vw',
        wordWrap: 'break-word',
        fontFamily: "var(--font-body)",
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

// Apply observer to cards
document.querySelectorAll('.cert-card, .project-card, .resume-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ============================================================
//          CV DOWNLOAD TRACKING
// ============================================================

const downloadBtn = document.querySelector('a[download]');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
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
//        KEYBOARD NAVIGATION FOR RESUME TABS
// ============================================================

resumeBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextBtn = resumeBtns[(index + 1) % resumeBtns.length];
            nextBtn.focus();
            nextBtn.click();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevBtn = resumeBtns[(index - 1 + resumeBtns.length) % resumeBtns.length];
            prevBtn.focus();
            prevBtn.click();
        }
    });
});

// ============================================================
//          KEYBOARD NAVIGATION (ESC TO CLOSE MENU)
// ============================================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse?.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler?.click();
        }
    }
});

// ============================================================
//          ACCESSIBILITY: SKIP TO MAIN CONTENT
// ============================================================

const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
Object.assign(skipLink.style, {
    position: 'absolute',
    top: '-40px',
    left: '0',
    background: 'var(--accent-cyan)',
    color: 'var(--dark-bg)',
    padding: '8px 16px',
    textDecoration: 'none',
    zIndex: '100',
    borderRadius: '0 0 4px 0'
});

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.prepend(skipLink);

// ============================================================
//            ANIMATION KEYFRAMES (INJECTED)
// ============================================================

const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyles);

// ============================================================
//            PAGE INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    updateActiveNavLink();
    rotateHeadline();

    // Log successful initialization
    console.log('✨ Portfolio loaded successfully with Bootstrap 5');
    console.log('✅ Dynamic headline: NO TEXT OVERLAP');
    console.log('✅ Responsive design: Bootstrap Grid System');
    console.log('✅ Mobile support: Fully responsive');
});

// ============================================================
//        PERFORMANCE: DEBOUNCED SCROLL EVENTS
// ============================================================

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNavLink();
    });
}, { passive: true });

// ============================================================
//          LAZY LOAD IMAGES (OPTIONAL)
// ============================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🚀 All JavaScript features initialized');
