
    // Initialize AOS for scroll animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Counter animation with Intersection Observer
    const counters = [
        { id: 'counter1', target: 12500, suffix: '+' },
        { id: 'counter2', target: 620, suffix: '+' },
        { id: 'counter3', target: 187, suffix: '+' },
        { id: 'counter4', target: 45000, suffix: '+' }
    ];
    
    function animateCounter(element, start, end, duration, suffix) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentVal = Math.floor(progress * (end - start) + start);
            element.innerText = currentVal.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.innerText = end.toLocaleString() + suffix;
            }
        };
        requestAnimationFrame(step);
    }

    const observerOptions = { threshold: 0.4 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const counterData = counters.find(c => c.id === id);
                if (counterData && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, 0, counterData.target, 1800, counterData.suffix);
                }
                // unobserve after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(c => {
        const elem = document.getElementById(c.id);
        if (elem) observer.observe(elem);
    });

    // Extra: small parallax or navbar background change
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(255, 252, 240, 0.98)';
            navbar.style.boxShadow = '0 6px 18px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(255, 252, 240, 0.96)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
        }
    });

    // Auto-play carousel with smooth transition
document.addEventListener('DOMContentLoaded', function() {
    var myCarousel = document.getElementById('heroCarousel');
    if (myCarousel) {
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000,
            wrap: true,
            ride: 'carousel',
            pause: 'hover'
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('modernNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search button click effect
document.getElementById('searchBtn')?.addEventListener('click', function() {
    // You can add your search functionality here
    alert('Search feature coming soon!');
});

// Add active class to current nav item based on scroll position (optional)
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after click
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.custom-toggler');
                    toggler.click();
                }
            }
        }
    });
});

// Add scroll animation for hero elements
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
    
    // Add hover effect to exam alert
    const examAlert = document.querySelector('.exam-alert-card');
    if (examAlert) {
        examAlert.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    }
});

// Enhanced Counter Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const counters = [
        { id: 'counter1', target: 12500, suffix: '+', hasComma: true },
        { id: 'counter2', target: 620, suffix: '+', hasComma: false },
        { id: 'counter3', target: 187, suffix: '+', hasComma: false },
        { id: 'counter4', target: 45000, suffix: '+', hasComma: true }
    ];
    
    function animateCounter(element, start, end, duration, suffix, hasComma) {
        let startTime = null;
        
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeOutQuart * (end - start) + start);
            
            if (hasComma) {
                element.innerText = currentVal.toLocaleString() + suffix;
            } else {
                element.innerText = currentVal + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                if (hasComma) {
                    element.innerText = end.toLocaleString() + suffix;
                } else {
                    element.innerText = end + suffix;
                }
            }
        };
        
        requestAnimationFrame(step);
    }
    
    // Intersection Observer for triggering counters
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const id = entry.target.id;
                const counterData = counters.find(c => c.id === id);
                if (counterData) {
                    animateCounter(
                        entry.target, 
                        0, 
                        counterData.target, 
                        2000, 
                        counterData.suffix, 
                        counterData.hasComma
                    );
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all counter elements
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            observer.observe(element);
        }
    });
    
    // Add hover effect to show pulse animation
    const statCards = document.querySelectorAll('.stat-card-modern');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const numberElement = this.querySelector('.stat-number');
            if (numberElement && !numberElement.classList.contains('counted')) {
                numberElement.style.animation = 'countUp 0.6s ease-out';
                setTimeout(() => {
                    numberElement.style.animation = '';
                }, 600);
            }
        });
    });
});


// Live Visitors Counter Simulation
document.addEventListener('DOMContentLoaded', function() {
    const visitorsElement = document.getElementById('liveVisitors');
    let currentVisitors = 1284;
    
    // Simulate real-time visitor updates
    function updateLiveVisitors() {
        // Random fluctuation between -5 and +8
        const change = Math.floor(Math.random() * 14) - 5;
        let newCount = currentVisitors + change;
        
        // Keep within reasonable bounds
        if (newCount < 1000) newCount = 1000;
        if (newCount > 2500) newCount = 2500;
        
        currentVisitors = newCount;
        
        // Add animation effect
        visitorsElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            visitorsElement.style.transform = 'scale(1)';
        }, 200);
        
        visitorsElement.textContent = currentVisitors.toLocaleString();
        
        // Update trend indicator
        const trendElement = document.querySelector('.trend-up');
        if (trendElement) {
            if (change > 0) {
                trendElement.innerHTML = `<i class="fas fa-arrow-up"></i> +${change}`;
                trendElement.style.color = '#10b981';
            } else if (change < 0) {
                trendElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${change}`;
                trendElement.style.color = '#ef4444';
            }
        }
    }
    
    // Update every 8-12 seconds
    setInterval(updateLiveVisitors, Math.random() * 4000 + 8000);
    
    // Add hover effect on dignitary cards
    const cards = document.querySelectorAll('.dignitary-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });
});


{/*     
    // Dynamic hero background smoothness + confirm the exact exam info from original site is displayed
    console.log("Modern Landing Page — University of Allahabad clone with animations"); */}