/**
 * duso_ecom Shopify Theme - Global JavaScript
 */

(function() {
  'use strict';

  // Header scroll effect
  const header = document.getElementById('main-header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileMenu.style.display = 'none';
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      } else {
        mobileMenu.classList.add('open');
        mobileMenu.style.display = 'block';
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      }
    });
  }

  // Services dropdown hover (desktop)
  const servicesDropdown = document.getElementById('services-dropdown');
  const servicesMenu = document.getElementById('services-menu');

  if (servicesDropdown && servicesMenu) {
    let dropdownTimeout;

    servicesDropdown.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      servicesMenu.style.display = 'block';
    });

    servicesDropdown.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(function() {
        servicesMenu.style.display = 'none';
      }, 100);
    });

    servicesMenu.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
    });

    servicesMenu.addEventListener('mouseleave', function() {
      servicesMenu.style.display = 'none';
    });
  }

  // Auto-scroll for stores carousel
  const storesTrack = document.getElementById('stores-track');
  
  if (storesTrack) {
    let scrollPosition = 0;
    const speed = 0.5;
    let isInView = false;

    // Intersection Observer to check if in view
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        isInView = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    observer.observe(storesTrack);

    function animateScroll() {
      if (isInView) {
        scrollPosition += speed;
        if (scrollPosition >= storesTrack.scrollWidth / 2) {
          scrollPosition = 0;
        }
        storesTrack.scrollLeft = scrollPosition;
      }
      requestAnimationFrame(animateScroll);
    }

    animateScroll();
  }

  // Contact form tabs
  const tabQuote = document.getElementById('tab-quote');
  const tabCall = document.getElementById('tab-call');
  const formQuote = document.getElementById('form-quote');
  const formCall = document.getElementById('form-call');

  if (tabQuote && tabCall && formQuote && formCall) {
    tabQuote.addEventListener('click', function() {
      tabQuote.classList.add('active', 'orange');
      tabQuote.classList.remove('emerald');
      tabCall.classList.remove('active', 'orange', 'emerald');
      formQuote.style.display = 'block';
      formCall.style.display = 'none';
    });

    tabCall.addEventListener('click', function() {
      tabCall.classList.add('active', 'emerald');
      tabCall.classList.remove('orange');
      tabQuote.classList.remove('active', 'orange', 'emerald');
      formCall.style.display = 'block';
      formQuote.style.display = 'none';
    });
  }

  // Form submission handler
  document.querySelectorAll('form[data-ajax]').forEach(function(form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span style="display: flex; align-items: center; gap: 0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Отправка...</span>';
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // Here you would send data to your backend
        // For now, just show success message
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        form.reset();
      } catch (error) {
        alert('Ошибка при отправке. Попробуйте позже.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

  // Add CSS animation for spin
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

})();
