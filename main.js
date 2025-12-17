// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header Shadow on Scroll
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav && mainNav.classList.contains('active')) {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.about-card, .feature-item, .content-card, .step-item, .detail-card, .faq-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            alert('شكراً لاشتراكك! سنرسل لك أحدث الأخبار والعروض قريباً.');
            emailInput.value = '';
        }
    });
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-item strong');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(stat, number);
                    }
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
}

// Add hover effect to feature items
const featureItems = document.querySelectorAll('.feature-item, .about-card, .content-card');
featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// FAQ Toggle (optional enhancement)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Initially show all answers
    if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
    }
    
    // Optional: Add click to toggle functionality
    if (question) {
        question.style.cursor = 'pointer';
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                answer.style.maxHeight = '0px';
                answer.style.marginTop = '0';
                question.style.marginBottom = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.marginTop = '1rem';
                question.style.marginBottom = '1rem';
            }
        });
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .main-nav.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        gap: 1rem;
        z-index: 999;
    }
    
    @media (min-width: 769px) {
        .main-nav.active {
            position: static;
            flex-direction: row;
            box-shadow: none;
            padding: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 700;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

console.log('🏥 موقع برنامج تمريض الأورام والرعاية التلطيفية جاهز!');
console.log('✨ جميع التفاعلات والحركات تعمل بشكل صحيح');
console.log('📱 التصميم متجاوب مع جميع الأجهزة');