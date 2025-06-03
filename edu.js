document.addEventListener('DOMContentLoaded', () => {
    // Floating elements in the Hero section
    const floatingElements = document.querySelector('.floating-elements');
    const elementCount = 5; // You can increase this number if you want more floating elements

    // Create floating elements
    for (let i = 0; i < elementCount; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.classList.add('floating-element');
        // Randomize positions for each element
        floatingElement.style.left = `${Math.random() * 100}%`;
        floatingElement.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize animation duration for variety
        floatingElements.appendChild(floatingElement);
    }

    // Scroll Down Indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', () => {
        // Show/hide scroll down arrow based on the position
        if (window.scrollY >= heroSection.clientHeight / 2) {
            scrollIndicator.style.opacity = 0;
        } else {
            scrollIndicator.style.opacity = 1;
        }
    });

    // Smooth scroll on "Scroll Down" arrow click
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight, // Scroll to the next section (hero section height)
            behavior: 'smooth'
        });
    });

    // Toggle Menu on Mobile Devices
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    // Scroll to specific section when buttons are clicked
    const buttons = document.querySelectorAll('.hero-buttons a');
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust scroll position
                behavior: 'smooth'
            });
        });
    });
});






// edu.js - Updated Code with Scroll Speed-Based Animation


    // Initialize animations when DOM is loaded
    document.addEventListener('DOMContentLoaded', animateSkillBars);

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.education-item, .timeline-item, .workshop-card, .seminar-item');
    
    const options = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // triggers when 10% of the item is visible
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation when the section comes into view
                entry.target.classList.add('animate');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section); // Start observing each section
    });

    // Function to make animations sync with scroll speed
    const syncAnimationWithScroll = () => {
        const scrollPosition = window.scrollY;
        const sectionsInView = document.querySelectorAll('.animate');
        
        sectionsInView.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const visibilityPercent = Math.min(Math.max(0, rect.top), window.innerHeight) / window.innerHeight;
            const animationSpeed = 1 - visibilityPercent; // Adjust animation speed based on how much of the element is visible

            // You can scale this factor as needed to match the desired animation speed
            section.style.transitionDuration = `${Math.max(0.3, animationSpeed)}s`;
            section.style.transform = `translateY(${(1 - visibilityPercent) * 20}px)`; // Adjust how much movement you want
        });
    };

    // Call the function to sync animation on scroll
    window.addEventListener('scroll', syncAnimationWithScroll);

    // Add smooth scroll for navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});



//contact //


 // Form validation and submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message (in real implementation, you would send data to server)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });

        // Smooth scrolling for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.contact_inner, .map_inner').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add hover effects to form inputs
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateX(5px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateX(0)';
            });
        });



        ///core modules///


        // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // Get all course items
  const courseItems = document.querySelectorAll('.ag-courses-item_link');

  // Loop through each course item
  courseItems.forEach(item => {

    // Add event listener for click event on each course item
    item.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default link behavior

      // Retrieve and log course title and start date for the clicked item
      const courseTitle = this.querySelector('.ag-courses-item_title').textContent.trim();
      const courseDate = this.querySelector('.ag-courses-item_date').textContent.trim();
      
      console.log(`Course Selected: ${courseTitle}`);
      console.log(`Start Date: ${courseDate}`);

      // You can handle more complex functionality here,
      // such as navigating to a detailed page, etc.
      alert(`You selected the course: ${courseTitle}, starting on ${courseDate}`);
    });
  });

});


///projects///
// Simple JavaScript to handle menu toggle functionality
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
});

// For smooth scrolling (if not already included in your code)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



 // Resume download functionality
    const resumeBtn = document.querySelector('.resume-btn');
    resumeBtn.addEventListener('click', function() {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = 'path/to/your/resume.pdf'; // Replace with your actual resume path
        link.download = 'Abdullah_sami_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Button click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });


    ////ABOUT/////

        // Skill bar animation on scroll
        function animateSkillBars() {
            const skillItems = document.querySelectorAll('.skill-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillItem = entry.target;
                        const progressBar = skillItem.querySelector('.skill-progress');
                        const percentage = skillItem.getAttribute('data-percentage');
                        
                        // Add animation class
                        skillItem.classList.add('animate');
                        
                        // Animate the progress bar
                        setTimeout(() => {
                            progressBar.style.width = percentage + '%';
                        }, 200);
                        
                        // Stop observing this element
                        observer.unobserve(skillItem);
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            });
            
            skillItems.forEach(item => {
                observer.observe(item);
            });
        }



        ///hero///

        
        // Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation for the name
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 150);
        }, 1000);
    }

    // Parallax effect for hero background
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply parallax effect on scroll
    window.addEventListener('scroll', throttle(parallaxScroll, 10));

    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('animated');
            }
        });
    }

    // Scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.text-container, .image-container');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
        
        // Animate skill bars
        animateSkillBars();
    }

    window.addEventListener('scroll', throttle(handleScrollAnimations, 100));

    // Social media hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects with ripple
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

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Floating icons animation control
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Hide scroll indicator on scroll
    window.addEventListener('scroll', function() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const scrolled = window.pageYOffset;
            const opacity = Math.max(0, 1 - scrolled / 300);
            scrollIndicator.style.opacity = opacity;
        }
    });

    // Dynamic text color based on scroll
    function updateTextColor() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const textElements = heroSection.querySelectorAll('.greeting, .name, .title, .description');
        
        if (scrolled > 100) {
            textElements.forEach(element => {
                element.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
            });
        } else {
            textElements.forEach(element => {
                element.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
            });
        }
    }

    window.addEventListener('scroll', throttle(updateTextColor, 50));

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.text-container > *, .social-icons, .hero-buttons');
    animatableElements.forEach(element => {
        observer.observe(element);
    });

    // Profile image tilt effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Preload images for better performance
    function preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1436262513933-a0b06755c784?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize everything
    preloadImages();
    handleScrollAnimations();
    updateTextColor();

    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
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
            opacity: 1;
            transform: translateY(0);
            transition: all 0.6s ease-out;
        }
        
        .text-container > *:not(.fade-in) {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .skill-progress {
            width: 0;
            transition: width 1.5s ease-out;
        }
        
        .visible {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);

    // Contact form functionality (if exists)
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || document.querySelector('#name').value;
            const email = formData.get('email') || document.querySelector('#email').value;
            const message = formData.get('message') || document.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Mobile menu toggle (if exists)
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = navMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Back to top button functionality
    const backToTopButton = document.querySelector('#back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Additional utility functions
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

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
}

measurePerformance();