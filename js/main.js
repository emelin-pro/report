/* ============================================================
   ГАРАНТ-ПРОФИТ — Main JavaScript
   Navigation, Modals, Carousel, Animations, Filters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header ---
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile Menu ---
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
      document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Modal ---
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseBtn = document.querySelector('.modal-close');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --- Fade-in on Scroll (IntersectionObserver) ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Ratings Carousel: duplicate items for infinite scroll ---
  const ratingsTrack = document.querySelector('.ratings-track');
  if (ratingsTrack) {
    const items = ratingsTrack.innerHTML;
    ratingsTrack.innerHTML = items + items;
  }

  // --- Filter Tabs (Cases page) ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const filterItems = document.querySelectorAll('[data-category]');

  if (filterTabs.length > 0 && filterItems.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.filter;

        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        filterItems.forEach(item => {
          if (category === 'all' || item.dataset.category.includes(category)) {
            item.style.display = '';
            // re-trigger fade
            item.classList.remove('visible');
            requestAnimationFrame(() => {
              item.classList.add('visible');
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

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

  // --- Form submission prevention (decorative forms) ---
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"], .btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Отправлено';
        btn.disabled = true;
        btn.style.opacity = '0.6';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.opacity = '';
        }, 3000);
      }
    });
  });

  // --- Tabs switching (admission page) ---
  const pathTabs = document.querySelectorAll('.path-tab');
  const pathPanels = document.querySelectorAll('.path-panel');

  if (pathTabs.length > 0 && pathPanels.length > 0) {
    pathTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.path;

        pathTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        pathPanels.forEach(panel => {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  }

  // --- Phone formatting ---
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.setAttribute('href', 'tel:+79771473887');
  });

});
