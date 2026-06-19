// ===== DOM Elements =====
const header = document.querySelector('header');
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const barsBox = document.querySelector('.bars-box');
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

// ===== Mobile Menu Toggle =====
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

// ===== Close mobile menu on link click =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    });
});

// ===== Navigation & Section Switching =====
function handleNavigation() {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);

    sections.forEach(section => {
        if (section.id === targetId || (targetId === '' && section.id === 'home')) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        const linkHash = link.getAttribute('href');
        if (linkHash === hash || (hash === '#home' && linkHash === '#home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (header) header.classList.add('active');

    if (barsBox && barsBox.classList.contains('active')) {
        setTimeout(() => {
            barsBox.classList.remove('active');
        }, 500);
    }
}

// ===== Smooth Nav Click =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            history.pushState(null, null, `#${targetId}`);
            handleNavigation();
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Resume Tab Switching =====
if (resumeBtns.length > 0) {
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resumeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');

            resumeDetails.forEach(detail => {
                detail.classList.remove('active');
                if (detail.id === `${tabId}-detail`) {
                    detail.classList.add('active');
                }
            });
        });
    });
}

// ===== Initial Load =====
window.addEventListener('load', () => {
    if (!window.location.hash || window.location.hash === '') {
        window.location.hash = '#home';
    }
    handleNavigation();

    if (resumeBtns.length > 0 && !document.querySelector('.resume-btn.active')) {
        resumeBtns[0].classList.add('active');
    }

    if (resumeDetails.length > 0 && !document.querySelector('.resume-detail.active')) {
        const firstDetail = document.getElementById('experience-detail');
        if (firstDetail) firstDetail.classList.add('active');
    }

    setTimeout(animateOnScroll, 500);
});

window.addEventListener('hashchange', handleNavigation);

// ===== Contact Form =====
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e24b4a';
                input.style.boxShadow = '0 0 0 3px rgba(226, 75, 74, 0.15)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });

        if (isValid) {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });

    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const colors = {
        success: '#1D9E75',
        error: '#e24b4a',
        info: '#378ADD'
    };

    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        info: 'bx-info-circle'
    };

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${icons[type]}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${colors[type]};
        color: white;
        padding: 1.4rem 2rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        gap: 1.4rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-size: 1.45rem;
        min-width: 280px;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0 4px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => { if (notification.parentNode) notification.remove(); }, 300);
        }
    }, 5000);

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => { if (notification.parentNode) notification.remove(); }, 300);
    });
}

// ===== Notification Keyframes =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(110%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(110%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// ===== Scroll to Top Button =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--main-color);
    color: var(--bg-color);
    border: none;
    cursor: pointer;
    font-size: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    font-family: 'boxicons';
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'translateY(-5px)';
    scrollBtn.style.boxShadow = '0 8px 20px rgba(55, 138, 221, 0.4)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'translateY(0)';
    scrollBtn.style.boxShadow = 'none';
});

// ===== Active Nav on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Parallax on Home Image =====
const homeImg = document.querySelector('.home-img .img-item');
if (homeImg) {
    window.addEventListener('mousemove', (e) => {
        const moveX = ((e.clientX / window.innerWidth) - 0.5) * 10;
        const moveY = ((e.clientY / window.innerHeight) - 0.5) * 10;
        homeImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ===== Animate Elements on Scroll =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.services-box, .portfolio-box, .resume-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        observer.observe(el);
    });
}

// ===== Console Welcome =====
console.log('%c M. Abdur Rehman Arif — Portfolio', 'color: #378ADD; font-size: 16px; font-weight: bold;');
console.log('%c Software Engineer | Python & Game Dev | Web Dev | ML Enthusiast', 'color: #185FA5; font-size: 12px;');
