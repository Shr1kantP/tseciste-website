// ===== GLOBAL FUNCTIONS =====

// Hide loading screen when page is fully loaded
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.style.display = 'none', 600);
    }
});

// Enhanced Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

if (navToggle && navMenu) {
    // Toggle menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== GALLERY PAGE FUNCTIONALITY =====

// Gallery filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('visible'), 10);
            } else {
                item.classList.remove('visible');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('.gallery-item'));

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(index);
    });
});

function openLightbox(index) {
    const item = galleryImages[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h4').textContent;
    const description = item.querySelector('p').textContent;
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Lightbox navigation
lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentImageIndex);
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(currentImageIndex);
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            lightboxPrev.click();
            break;
        case 'ArrowRight':
            lightboxNext.click();
            break;
    }
});

// Video modal functionality
const videoModal = document.getElementById('video-modal');
const videoIframe = document.getElementById('video-iframe');
const videoModalClose = document.querySelector('.video-modal-close');
const videoItems = document.querySelectorAll('.video-item');

videoItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoUrl = item.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        videoIframe.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

videoModalClose.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoIframe.src = '';
    document.body.style.overflow = 'auto';
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModalClose.click();
    }
});

// ===== EVENTS PAGE FUNCTIONALITY =====

// Event tabs functionality
const eventTabBtns = document.querySelectorAll('.tab-btn[data-tab]');
const eventSections = document.querySelectorAll('.events-section');

eventTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and sections
        eventTabBtns.forEach(b => b.classList.remove('active'));
        eventSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button and target section
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Event calendar functionality
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

if (calendarGrid && currentMonthElement) {
    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            if (date.getMonth() === currentMonth) {
                dayElement.textContent = date.getDate();
                dayElement.classList.add('current-month');
                
                // Check if date has events
                if (hasEvent(date)) {
                    dayElement.classList.add('has-event');
                }
            } else {
                dayElement.classList.add('other-month');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    function hasEvent(date) {
        // Mock event dates - replace with actual event data
        const eventDates = [
            new Date(2024, 11, 15), // Dec 15, 2024
            new Date(2024, 11, 20), // Dec 20, 2024
            new Date(2024, 11, 25)  // Dec 25, 2024
        ];
        
        return eventDates.some(eventDate => 
            eventDate.getDate() === date.getDate() && 
            eventDate.getMonth() === date.getMonth() && 
            eventDate.getFullYear() === date.getFullYear()
        );
    }
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    renderCalendar();
}

// ===== TEAM PAGE FUNCTIONALITY =====

// Team tabs functionality
const teamTabBtns = document.querySelectorAll('.team-tabs .tab-btn');
const teamSections = document.querySelectorAll('.team-section');

teamTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and sections
        teamTabBtns.forEach(b => b.classList.remove('active'));
        teamSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button and target section
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===== CONTACT PAGE FUNCTIONALITY =====

// Contact form functionality
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', data);
        
        // Show success modal
        if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Reset form
        contactForm.reset();
    });
}

// Close modal function
function closeModal() {
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Modal close functionality
const modalClose = document.querySelector('.modal-close');
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// ===== ANIMATIONS AND EFFECTS =====

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== UTILITY FUNCTIONS =====

// Smooth scrolling for anchor links
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

// ===== ACCORDION FUNCTIONALITY (About Page) =====
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
}); 