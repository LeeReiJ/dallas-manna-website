// Hero Gallery Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.gallery-dot');

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Click on dots to change slide
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        // Reset auto-advance timer
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuBtn.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            mobileMenuBtn.textContent = '☰';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('show');
            mobileMenuBtn.textContent = '☰';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.service-card, .ministry-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// LIVE CONTENT TOGGLE FUNCTIONALITY
// ============================================

// Function to check if it's worship time and show live content
function checkWorshipTime() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 3 = Wednesday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let isWorshipTime = false;

    // Sunday worship times (11:00 AM - 12:00 PM and 1:00 PM - 2:30 PM)
    if (day === 0) {
        const firstService = currentTime >= 660 && currentTime <= 720;  // 11:00 AM - 12:00 PM
        const secondService = currentTime >= 780 && currentTime <= 870; // 1:00 PM - 2:30 PM
        isWorshipTime = firstService || secondService;
    }

    // Wednesday prayer meeting (7:30 PM - 9:00 PM)
    if (day === 3) {
        isWorshipTime = currentTime >= 1170 && currentTime <= 1260; // 7:30 PM - 9:00 PM
    }

    // Show/hide content based on worship time
    const offlineContent = document.getElementById('offlineContent');
    const offlineMessage = document.getElementById('offlineMessage');
    const liveContent = document.getElementById('liveContent');

    if (isWorshipTime) {
        // Show live content
        if (offlineContent) offlineContent.style.display = 'none';
        if (offlineMessage) offlineMessage.style.display = 'none';
        if (liveContent) liveContent.style.display = 'flex';
    } else {
        // Show offline content
        if (offlineContent) offlineContent.style.display = 'flex';
        if (offlineMessage) offlineMessage.style.display = 'block';
        if (liveContent) liveContent.style.display = 'none';
    }
}

// Manual toggle function (for admin control)
function toggleLiveContent(isLive) {
    const offlineContent = document.getElementById('offlineContent');
    const offlineMessage = document.getElementById('offlineMessage');
    const liveContent = document.getElementById('liveContent');

    if (isLive) {
        if (offlineContent) offlineContent.style.display = 'none';
        if (offlineMessage) offlineMessage.style.display = 'none';
        if (liveContent) liveContent.style.display = 'flex';
    } else {
        if (offlineContent) offlineContent.style.display = 'flex';
        if (offlineMessage) offlineMessage.style.display = 'block';
        if (liveContent) liveContent.style.display = 'none';
    }
}

// Check worship time when page loads
checkWorshipTime();

// Check every minute if it's worship time
setInterval(checkWorshipTime, 60000);

// Optional: Manual override via browser console
// To manually show live: toggleLiveContent(true);
// To manually show offline: toggleLiveContent(false);

console.log('달라스만나교회 웹사이트 로드 완료');
console.log('라이브 콘텐츠 감지 시스템 활성화됨');
