// duso_ecom Shopify Theme - Global JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  initMobileMenu();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Lazy loading images
  initLazyLoad();
  
  // Animation on scroll
  initScrollAnimations();
});

function initMobileMenu() {
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.contains('is-open');
    
    if (isOpen) {
      mobileMenu.classList.remove('is-open');
      menuOverlay?.classList.remove('is-visible');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('is-open');
      menuOverlay?.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
  });
  
  menuOverlay?.addEventListener('click', function() {
    mobileMenu.classList.remove('is-open');
    menuOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('is-loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1
    });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
      animateObserver.observe(el);
    });
  }
}

// Dropdown menus
document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
  const trigger = dropdown.querySelector('[data-dropdown-trigger]');
  const content = dropdown.querySelector('[data-dropdown-content]');
  
  if (!trigger || !content) return;
  
  let timeout;
  
  dropdown.addEventListener('mouseenter', function() {
    clearTimeout(timeout);
    content.classList.add('is-open');
  });
  
  dropdown.addEventListener('mouseleave', function() {
    timeout = setTimeout(() => {
      content.classList.remove('is-open');
    }, 150);
  });
});

// Form validation
document.querySelectorAll('form[data-validate]').forEach(form => {
  form.addEventListener('submit', function(e) {
    let isValid = true;
    
    form.querySelectorAll('[required]').forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('is-error');
      } else {
        input.classList.remove('is-error');
      }
    });
    
    if (!isValid) {
      e.preventDefault();
    }
  });
});
