// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('show');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        if (isElementInViewport(bar)) {
            bar.style.width = percentage + '%';
        }
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Run once on page load
animateSkillBars();

// Run on scroll
window.addEventListener('scroll', animateSkillBars);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toastContainer = document.getElementById('toastContainer');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    
    try {
        // In a real implementation, you would send this data to your server
        // For demo purposes, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showToast('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showToast('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
    }
});

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'i'}
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close">&times;</button>
        </div>
        <div class="toast-progress"></div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove toast after 5 seconds
    const autoRemove = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll animations
document.querySelectorAll('.education-item, .training-card, .timeline-item, .seminar-item, .project-card1').forEach(el => {
    observer.observe(el);
});

// Typing animation for the about section title
const typingTitle = document.getElementById('typing-title');
const titles = ["Aircraft Engineer", "Aviation Specialist", "Problem Solver"];
let currentTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const currentTitle = titles[currentTitleIndex];
    
    if (isDeleting) {
        typingTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeTitle, typingSpeed);
}

// Start typing animation after a delay
setTimeout(typeTitle, 1000);

// Floating elements animation
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach(icon => {
    // Randomize initial position and animation delay
    const randomX = (Math.random() * 20) - 10;
    const randomY = (Math.random() * 20) - 10;
    const randomDelay = Math.random() * 2;
    
    icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    icon.style.animationDelay = `${randomDelay}s`;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .contact_form_submit').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for the scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // You can also add this for any anchor links on the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});