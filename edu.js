// Portfolio JavaScript - Unified and Optimized

// Utility Functions
function throttle(func, wait) {
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

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing-text');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.classList.remove('typing-text');
            }, 1000);
        }
    }
    type();
}

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Skill bar animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target.closest('.skill-item');
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage') || 
                                skillItem?.getAttribute('data-percentage');
                
                if (percentage) {
                    skillItem?.classList.add('animate');
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                    }, 200);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Floating elements interactions
function initFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer) {
        const elementCount = 5;
        for (let i = 0; i < elementCount; i++) {
            const floatingElement = document.createElement('div');
            floatingElement.classList.add('floating-element');
            floatingElement.style.left = `${Math.random() * 100}%`;
            floatingElement.style.animationDuration = `${Math.random() * 3 + 2}s`;
            floatingContainer.appendChild(floatingElement);
        }
    }

    // Floating icons control
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });
}

// Toast Notification System
class ToastNotification {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.toasts = [];
    }

    show(message, type = 'success', duration = 4000) {
        const toast = this.createToast(message, type, duration);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    createToast(message, type, duration) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icon}</div>
                <div class="toast-message">${message}</div>
                <button class="toast-close" onclick="toastSystem.remove(this.closest('.toast'))">&times;</button>
            </div>
            <div class="toast-progress"></div>
        `;

        // Add click to close functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.remove(toast);
        });

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || icons.success;
    }

    remove(toast) {
        if (toast && toast.parentNode) {
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                    this.toasts = this.toasts.filter(t => t !== toast);
                }
            }, 500);
        }
    }

    removeAll() {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

// Enhanced Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.btnText = document.getElementById('btnText');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Add ripple effect to button
        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', createRipple);
        }

        // Add input focus effects
        this.initInputEffects();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name')?.value?.trim() || '',
            email: document.getElementById('email')?.value?.trim() || '',
            message: document.getElementById('message')?.value?.trim() || ''
        };

        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Simulate form submission
        this.simulateSubmission(formData);
    }

    validateForm(data) {
        if (!data.name || !data.email || !data.message) {
            toastSystem.show('Please fill in all fields.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toastSystem.show('Please enter a valid email address.', 'error');
            return false;
        }

        if (data.message.length < 10) {
            toastSystem.show('Message should be at least 10 characters long.', 'warning');
            return false;
        }

        return true;
    }

    simulateSubmission(data) {
        // Simulate API call delay
        setTimeout(() => {
            console.log('Form submitted with data:', data);
            
            // Show success toast
            toastSystem.show('Thank you for your message! I will get back to you soon.', 'success', 5000);
            
            // Reset form
            this.form.reset();
            
            // Remove loading state
            this.setLoadingState(false);
            
        }, 2000);
    }

    setLoadingState(loading) {
        if (this.btnText) {
            if (loading) {
                this.btnText.innerHTML = '<span class="spinner"></span>Sending...';
                this.submitBtn.disabled = true;
            } else {
                this.btnText.innerHTML = 'Send';
                this.submitBtn.disabled = false;
            }
        }
    }

    initInputEffects() {
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
}



// Main Portfolio App
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initHeroSection();
            this.initScrollAnimations();
            this.initCounterAnimations();
            this.initNavigation();
            this.initContactForm();
            this.initCourseSelection();
            this.initHoverEffects();
            this.initMobileMenu();
            this.initBackToTop();
            this.initResumeDownload();
            this.initProjectCards();
            this.addCustomStyles();
            this.initProjectLinks(); 
            
            // Initialize global functions
            initSkillAnimations();
            initFloatingElements();
            
            // Initialize typing animation
            const titleElement = document.getElementById('typing-title');
            if (titleElement) {
                const originalText = titleElement.textContent;
                setTimeout(() => {
                    typeWriter(titleElement, originalText, 150);
                }, 1000);
            }
        });
    }

    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card1');
        
        projectCards.forEach(card => {
            const button = card.querySelector('.card-button');
            if (button) {
                // Remove any existing click handlers to avoid duplication
                button.removeEventListener('click', this.handleProjectClick);
                button.addEventListener('click', this.handleProjectClick);
            }
        });
    }

    handleProjectClick(e) {
        // Allow default anchor behavior
        // Additional logic can be added here if needed
        console.log('Navigating to project details');
    }

initProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card1');
    
    projectCards.forEach(card => {
        const button = card.querySelector('.card-button');
        
        // Make only the button clickable (remove card-wide click)
        card.style.cursor = 'default';
        
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                if (category) {
                    window.location.href = `blog.html#${category}`;
                }
            });
        }
    });
}

    // Hero Section Functionality
    initHeroSection() {
        // Typing animation for name
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            const originalText = nameElement.textContent;
            setTimeout(() => {
                typeWriter(nameElement, originalText, 150);
            }, 1000);
        }

        // Parallax effect
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-background, .about-image');
            
            parallaxElements.forEach(element => {
                const speed = element.classList.contains('about-image') ? 0.2 : 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Update scroll indicator opacity
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                const opacity = Math.max(0, 1 - scrolled / 300);
                scrollIndicator.style.opacity = opacity;
            }

            // Update text shadow based on scroll
            this.updateTextShadow(scrolled);
        }, 10));

        // Scroll indicator functionality
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('#about') || document.querySelector('section:nth-of-type(2)');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Profile image tilt effect
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            this.initImageTiltEffect(profileImage);
        }
    }

    // Update text shadow based on scroll
    updateTextShadow(scrolled) {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const textElements = heroSection.querySelectorAll('.greeting, .name, .title, .description');
        const shadowIntensity = scrolled > 100 ? '2px 2px 4px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(0,0,0,0.5)';
        
        textElements.forEach(element => {
            element.style.textShadow = shadowIntensity;
        });
    }

    // Image tilt effect
    initImageTiltEffect(profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Counter Animations for Stats
    initCounterAnimations() {
        const stats = document.querySelectorAll('.stat h4');
        if (!stats.length) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    this.animateCounter(entry.target, number);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        stats.forEach(stat => counterObserver.observe(stat));
    }

    // Animate counter numbers
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const text = element.textContent;
            if (text.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // Scroll Animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.about-content, .about-image, .stat, .skill-item, .education-item, .timeline-item, .workshop-card,.training-card, .achievements-grid, .seminar-item, .contact_inner, .map_inner'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });

        animatedElements.forEach(el => scrollObserver.observe(el));
    }

    // Navigation & Smooth Scrolling
    initNavigation() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight - 60;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Contact Form (Legacy support)
    initContactForm() {
        const contactForm = document.querySelector('#contactForm');
        if (!contactForm) return;

        // This is for backward compatibility - main form handler is in ContactFormHandler class
        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const message = document.querySelector('#message');
        
        if (name && email && message) {
            // Form input hover effects
            const formControls = [name, email, message];
            formControls.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'translateX(5px)';
                    this.parentElement.style.transition = 'transform 0.3s ease';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'translateX(0)';
                });
            });
        }
    }

    // Course Selection
    initCourseSelection() {
        const courseItems = document.querySelectorAll('.ag-courses-item_link');
        
        courseItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const courseTitle = item.querySelector('.ag-courses-item_title')?.textContent?.trim();
                const courseDate = item.querySelector('.ag-courses-item_date')?.textContent?.trim();
                
                if (courseTitle && courseDate) {
                    console.log(`Course Selected: ${courseTitle}`);
                    console.log(`Start Date: ${courseDate}`);
                    alert(`You selected the course: ${courseTitle}, starting on ${courseDate}`);
                }
            });
        });
    }

    // Hover Effects
    initHoverEffects() {
        // Skill items hover
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Stat items hover
        const statItems = document.querySelectorAll('.stat');
        statItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });

        // Social icons hover
        const socialIcons = document.querySelectorAll('.social-icon, .social_icons-con a');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Contact info hover effects
        const infoItems = document.querySelectorAll('.info_single');
        infoItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', createRipple);
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle, #menu-toggle');
        const navMenu = document.querySelector('#nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close menu when clicking on links
            const mobileLinks = navMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('show', 'active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    // Back to Top Button
    initBackToTop() {
        const backToTopButton = document.querySelector('#back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Resume Download
    initResumeDownload() {
        const resumeBtn = document.querySelector('.resume-btn');
        if (!resumeBtn) return;

        resumeBtn.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/file/d/1Ecdtan3mCeiC42TYsKW2jQcPVJHBZY-U/view';
            link.download = 'Abdullah_Sami_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Add Custom Styles
    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
                z-index: 1;
            }
            
            @keyframes ripple-animation {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
            
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: all 0.6s ease-out;
            }
            
            .skill-progress {
                width: 0;
                transition: width 1.5s ease-out;
            }
            
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .visible {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .skill-item,
                .stat {
                    transition: all 0.3s ease !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();
const toastSystem = new ToastNotification();

// Initialize Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormHandler();
});

// Demo function to test different toast types (for development)
function showDemoToasts() {
    setTimeout(() => toastSystem.show('Success message!', 'success'), 500);
    setTimeout(() => toastSystem.show('Error occurred!', 'error'), 1000);
    setTimeout(() => toastSystem.show('Warning message!', 'warning'), 1500);
    setTimeout(() => toastSystem.show('Information message!', 'info'), 2000);
}

// In the click handler for project cards
button.addEventListener('click', (e) => {
    e.preventDefault();
    const category = card.getAttribute('data-category');
    if (category) {
        // Add loading state
        button.innerHTML = '<span class="spinner"></span> Loading...';
        
        setTimeout(() => {
            window.location.href = `blog.html#${category}`;
        }, 300); // Small delay for visual feedback
    }
});