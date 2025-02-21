// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSmoothScroll();
    initNavbarScroll();
    initProductCardEffect();
    initAnimationObserver();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.dataset.theme = savedTheme;
        themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌓';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.dataset.theme = newTheme;
        themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌓';
        localStorage.setItem('theme', newTheme);
    });
}

// Smooth Scroll Functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 73, 88, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 73, 88, 0.8)';
        }
    });
}

// Product Card Shine Effect
function initProductCardEffect() {
    const productCard = document.querySelector('.product-card');
    if (productCard) {
        productCard.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = productCard.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            
            productCard.style.background = `
                linear-gradient(
                    135deg,
                    var(--card-bg) 0%,
                    var(--card-bg) 40%,
                    rgba(255, 255, 255, 0.2) 50%,
                    var(--card-bg) 60%,
                    var(--card-bg) 100%
                )
            `;
            productCard.style.backgroundPosition = `${x}% ${y}%`;
        });

        productCard.addEventListener('mouseleave', () => {
            productCard.style.background = 'var(--card-bg)';
        });
    }
}

// Animation Observer
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Get all sections
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const logoLink = document.querySelector('.logo-link');

    // Function to show active section and hide others
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the selected section
        const activeSection = document.querySelector(sectionId);
        if (activeSection) {
            activeSection.style.display = 'block';
            // Add active class to the current nav link
            const activeLink = document.querySelector(`a[href="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

        // Scroll to top if it's the home section
        if (sectionId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Add click event listeners to navigation links and logo
    [...navLinks, logoLink].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            showSection(sectionId);
            // Update URL without page reload
            history.pushState(null, '', sectionId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const sectionId = window.location.hash || '#home';
        showSection(sectionId);
    });

    // Show initial section based on URL hash or default to home
    const initialSection = window.location.hash || '#home';
    showSection(initialSection);
});

/*team section*/

document.querySelectorAll('.member-image img').forEach(img => {
    img.addEventListener('click', function() {
        this.style.filter = 'brightness(1.3)';
        setTimeout(() => {
            this.style.filter = 'brightness(1)';
        }, 200);
    });
});
