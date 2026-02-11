// Smooth Scrolling for Nav Links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behaviour: 'smooth'
            });
        }
    });
});

//Navigation Background on Scroll

const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    //Add shadow when scrolling
    if (currentScroll > 50) {
        nav.computedStyleMap.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1';
    } else {
        nav.computedStyleMap.boxShadow = 'none'
    }

    lastScroll = currentScroll
});

//Intersection observer for Scroll animations

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

//Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

//Also observe individual project cards for staggered animation
const projectCards = document.querySelectorAll('.project-car');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s';
    observer.observe(card);
});

//Activate NavLink Highlighting

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a')

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#${sectionId}') {
                    link.style.color = 'var(--primary)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Dynamic Year in Footer

const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2024', currentYear)
}

// Dynamic Year in About
const yearTracker = document.querySelector('.year-number');
if (yearTracker) {
    const currentYear = new Date().getFullYear();
    const currentVal = currentYear - 2022;
    yearTracker.innerHTML = yearTracker.innerHTML.replace('3', currentVal)
}

//Parallax Effect for hero background

const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = 'translateY(${scrolled * parallaxSpeed}px)';
    });
}

//Project Card Hover Effects

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

//Skills Animation on Scroll

const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 50);
        }
    });
}, {threshold: 0.5});

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    skillObserver.observe(item);
});

//Debounce function for scroll events

function debounce(func, wait = 10) {
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

//Apply the debounce to scroll functions

const debouncedHighlight = debounce(highlightNavigation, 10);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);
