// =========================================================
// Architect of Silence — Interactive Behaviors
// =========================================================

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('active');
  });

  // Close mobile nav when any link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    }
  });
}

// Smooth Scroll with Offset for Fixed Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Allow default behavior for # and #top
    if (href === '#' || href === '#top') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // Handle other anchor links
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 90;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active Nav State Based on Scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__links a[href^="#"]');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    highlightNavOnScroll();
  });
});

// Fade-in animation for excerpt cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe excerpt cards and theme cards
document.addEventListener('DOMContentLoaded', () => {
  highlightNavOnScroll();
  
  const cards = document.querySelectorAll('.excerpt-card, .theme-card, .about-card');
  cards.forEach(card => {
    fadeInObserver.observe(card);
  });
});

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero__wrap');
  if (hero) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    hero.style.transform = `translateY(${parallax}px)`;
    hero.style.opacity = 1 - (scrolled / 600);
  }
});

// Glitch effect on brand name (subtle)
const brand = document.querySelector('.brand__text');
if (brand) {
  const originalText = brand.textContent;
  
  setInterval(() => {
    if (Math.random() > 0.95) { // 5% chance
      brand.textContent = originalText
        .split('')
        .map(char => Math.random() > 0.7 ? String.fromCharCode(Math.random() * 26 + 65) : char)
        .join('');
      
      setTimeout(() => {
        brand.textContent = originalText;
      }, 50);
    }
  }, 3000);
}