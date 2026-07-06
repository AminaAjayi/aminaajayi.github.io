/* ==========================================================================
   Amina Ajayi Personal Portfolio — Interactive Scripts
   Vanilla JS (No Dependencies)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initRotatingText();
  initStatCounters();
  initScrollAnimations();
  initHeaderScroll();
});

/* 1. Mobile Menu Toggle */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileOverlay) return;

  const openMenu = () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* 2. Rotating Tagline Text in Hero Section */
function initRotatingText() {
  const textElement = document.getElementById('rotating-text');
  if (!textElement) return;

  const phrases = [
    'ASPIRING CHARTERED SURVEYOR',
    'PROPERTY DEVELOPMENT ENTHUSIAST',
    'REAL ESTATE AGENT & ADVISOR',
    'URBAN REGENERATION ADVOCATE',
    'ENTREPRENEUR & FOUNDER'
  ];

  let currentIndex = 0;

  setInterval(() => {
    textElement.style.opacity = '0';
    textElement.style.transform = 'translateY(-8px)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      textElement.textContent = phrases[currentIndex];
      textElement.style.opacity = '1';
      textElement.style.transform = 'translateY(0)';
    }, 300);
  }, 3500);
}

/* 3. Stat Counters Animation with IntersectionObserver */
function initStatCounters() {
  const statCards = document.querySelectorAll('.stat-number');
  if (statCards.length === 0) return;

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      el.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statCards.forEach(card => observer.observe(card));
}

/* 4. Scroll-in Animations for Sections */
function initScrollAnimations() {
  const fadeSections = document.querySelectorAll('.fade-in-section');
  if (fadeSections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  fadeSections.forEach(sec => observer.observe(sec));
}

/* 5. Sticky Header Scroll Shadow */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
