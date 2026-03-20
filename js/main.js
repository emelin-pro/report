/* ============================================
   Гарант-Профит — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu ---
  const burger = document.querySelector('.navbar__burger');
  const menu = document.querySelector('.navbar__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('active');
      burger.classList.toggle('active');
    });
    // Close on link click
    menu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        burger.classList.remove('active');
      });
    });
  }

  // --- Login Modal ---
  const loginBtn = document.querySelector('.navbar__login');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (loginBtn && modalOverlay) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.closest('.modal__close')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Navbar CTA visibility on scroll ---
  const navCta = document.querySelector('.navbar__cta');
  const accessSection = document.getElementById('access');
  if (navCta && accessSection) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        navCta.classList.add('visible');
      }
    }, { threshold: 0.1 });
    observer.observe(accessSection);
    // Also show on scroll past 60%
    window.addEventListener('scroll', () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5) {
        navCta.classList.add('visible');
      }
    }, { passive: true });
  }

  // --- Ratings Carousel ---
  // Duplicate items for infinite scroll
  const ratingsTrack = document.querySelector('.ratings__track');
  if (ratingsTrack) {
    const items = ratingsTrack.innerHTML;
    ratingsTrack.innerHTML = items + items;
  }

  // --- Scroll Animations (fade-in) ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // --- Services Horizontal Scroll (drag) ---
  const scrollContainers = document.querySelectorAll('.services__grid');
  scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = '';
    });
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = '';
    });
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  });

  // --- Filters (services/cases pages) ---
  document.querySelectorAll('.filters').forEach(filterBar => {
    const buttons = filterBar.querySelectorAll('.filter-btn');
    const cards = filterBar.closest('.section, main')?.querySelectorAll('[data-tags]') || [];
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        // Toggle active
        if (filter === 'all') {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else {
          filterBar.querySelector('[data-filter="all"]')?.classList.remove('active');
          btn.classList.toggle('active');
        }
        // Get active filters
        const activeFilters = Array.from(filterBar.querySelectorAll('.filter-btn.active'))
          .map(b => b.dataset.filter)
          .filter(f => f !== 'all');
        // Filter cards
        cards.forEach(card => {
          if (activeFilters.length === 0) {
            card.style.display = '';
            return;
          }
          const cardTags = card.dataset.tags?.split(',') || [];
          const match = activeFilters.some(f => cardTags.includes(f));
          card.style.display = match ? '' : 'none';
        });
      });
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Login form submit prevention ---
  const loginForm = document.querySelector('.modal form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // --- Access request form ---
  const accessForm = document.getElementById('access-form');
  if (accessForm) {
    accessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = accessForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Запрос отправлен';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
      }
    });
  }
});
