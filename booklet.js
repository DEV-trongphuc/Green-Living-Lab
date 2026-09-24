/**
 * EcoLife Signature - Luxury Architectural Editorial Booklet Controller
 * Supports: 
 * - Desktop: 2-page Spread Mode auto-scaled to fit viewport, top toolbar
 * - Mobile: Continuous vertical 1:1 square scroll ("column scroll"), floating bottom sheet dock
 */

document.addEventListener('DOMContentLoaded', () => {
  const pages = Array.from(document.querySelectorAll('.booklet-page'));
  const totalPages = pages.length; // 24 pages
  
  const btnPrev = document.getElementById('btnPrevSpread');
  const btnNext = document.getElementById('btnNextSpread');
  const currentSpreadDisplay = document.getElementById('currentSpreadDisplay');
  const btnToggleSpread = document.getElementById('btnToggleSpreadView');
  const txtSpreadMode = document.getElementById('txtSpreadMode');

  let isSpreadMode = window.innerWidth >= 992;
  let currentSpreadIndex = 0; // 0: pages 1-2, 1: pages 3-4 on desktop; 0..23 on mobile
  let currentMobilePage = 0;

  // Wrap pages in square frames for pixel-perfect 1:1 scaling
  function setupPageFrames() {
    pages.forEach((page, idx) => {
      page.setAttribute('data-page-index', idx);
      if (!page.parentElement.classList.contains('booklet-page-frame')) {
        const frame = document.createElement('div');
        frame.className = 'booklet-page-frame';
        frame.setAttribute('data-page-index', idx);
        page.parentNode.insertBefore(frame, page);
        frame.appendChild(page);
      }
    });
  }

  // Dynamic Auto-Scaling for Desktop and Mobile
  function updateBookletScale() {
    const isMobile = window.innerWidth < 992;
    if (isMobile) {
      document.documentElement.style.removeProperty('--booklet-scale');
      const availW = Math.min(window.innerWidth - 24, 520);
      const mobileScale = availW / 880;
      document.documentElement.style.setProperty('--mobile-page-scale', mobileScale.toString());
      document.documentElement.style.setProperty('--frame-size', `${availW}px`);
      return;
    }

    document.documentElement.style.removeProperty('--mobile-page-scale');
    document.documentElement.style.removeProperty('--frame-size');
    const isDesktopSpread = isSpreadMode && window.innerWidth >= 992;
    const baseW = isDesktopSpread ? 1760 : 880;
    const baseH = 880;

    const header = document.querySelector('.booklet-nav-header');
    const headerH = header ? header.offsetHeight : 64;
    
    // Available dimensions with safe padding
    const availW = Math.max(window.innerWidth - 48, 400);
    const availH = Math.max(window.innerHeight - headerH - 36, 350);

    let scale = Math.min(availW / baseW, availH / baseH);
    if (scale > 1.0) scale = 1.0;

    document.documentElement.style.setProperty('--booklet-scale', scale.toFixed(4));
  }

  // Update Visibility of Pages
  function updateSpreadView() {
    const isMobile = window.innerWidth < 992;
    const frames = document.querySelectorAll('.booklet-page-frame');

    if (isMobile) {
      // Mobile: Continuous Vertical Column Scroll - ALL pages are visible!
      document.body.classList.remove('single-page-mode');
      frames.forEach((frame) => {
        frame.style.display = 'block';
      });
      pages.forEach((page) => {
        page.style.display = 'flex';
      });

      const p1 = currentMobilePage + 1;
      if (currentSpreadDisplay) {
        currentSpreadDisplay.textContent = `${p1 < 10 ? '0' + p1 : p1}`;
      }

      if (btnPrev) btnPrev.style.opacity = currentMobilePage === 0 ? '0.4' : '1';
      if (btnNext) btnNext.style.opacity = currentMobilePage >= totalPages - 1 ? '0.4' : '1';
    } else {
      // Desktop: Spread / Single Page View
      if (isSpreadMode) {
        document.body.classList.remove('single-page-mode');
        if (txtSpreadMode) txtSpreadMode.textContent = '2 Trang (Spread)';
        if (btnToggleSpread) btnToggleSpread.classList.add('active');

        const startIdx = currentSpreadIndex * 2;
        const endIdx = startIdx + 1;

        frames.forEach((frame, idx) => {
          if (idx === startIdx || idx === endIdx) {
            frame.style.display = 'contents';
            if (pages[idx]) pages[idx].style.display = 'flex';
          } else {
            frame.style.display = 'none';
            if (pages[idx]) pages[idx].style.display = 'none';
          }
        });

        const p1 = startIdx + 1;
        const p2 = Math.min(endIdx + 1, totalPages);
        if (currentSpreadDisplay) {
          currentSpreadDisplay.textContent = `${p1 < 10 ? '0' + p1 : p1} - ${p2 < 10 ? '0' + p2 : p2}`;
        }
      } else {
        document.body.classList.add('single-page-mode');
        if (txtSpreadMode) txtSpreadMode.textContent = '1 Trang';
        if (btnToggleSpread) btnToggleSpread.classList.remove('active');

        frames.forEach((frame, idx) => {
          if (idx === currentSpreadIndex) {
            frame.style.display = 'contents';
            if (pages[idx]) pages[idx].style.display = 'flex';
          } else {
            frame.style.display = 'none';
            if (pages[idx]) pages[idx].style.display = 'none';
          }
        });

        const p1 = currentSpreadIndex + 1;
        if (currentSpreadDisplay) {
          currentSpreadDisplay.textContent = `${p1 < 10 ? '0' + p1 : p1}`;
        }
      }

      // Update buttons disabled state on desktop
      const maxIndex = isSpreadMode ? Math.floor((totalPages - 1) / 2) : totalPages - 1;
      if (btnPrev) btnPrev.style.opacity = currentSpreadIndex === 0 ? '0.4' : '1';
      if (btnNext) btnNext.style.opacity = currentSpreadIndex >= maxIndex ? '0.4' : '1';

      updateBookletScale();
    }
  }

  function goToSpread(index) {
    const isMobile = window.innerWidth < 992;
    if (isMobile) {
      const frames = document.querySelectorAll('.booklet-page-frame');
      if (index >= 0 && index < totalPages) {
        currentMobilePage = index;
        const target = frames[index] || pages[index];
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const p1 = currentMobilePage + 1;
        if (currentSpreadDisplay) {
          currentSpreadDisplay.textContent = `${p1 < 10 ? '0' + p1 : p1}`;
        }
      }
    } else {
      const maxIndex = isSpreadMode ? Math.floor((totalPages - 1) / 2) : totalPages - 1;
      if (index >= 0 && index <= maxIndex) {
        currentSpreadIndex = index;
        updateSpreadView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  function nextSpread() {
    const isMobile = window.innerWidth < 992;
    if (isMobile) {
      if (currentMobilePage < totalPages - 1) {
        goToSpread(currentMobilePage + 1);
      }
    } else {
      const maxIndex = isSpreadMode ? Math.floor((totalPages - 1) / 2) : totalPages - 1;
      if (currentSpreadIndex < maxIndex) {
        goToSpread(currentSpreadIndex + 1);
      }
    }
  }

  function prevSpread() {
    const isMobile = window.innerWidth < 992;
    if (isMobile) {
      if (currentMobilePage > 0) {
        goToSpread(currentMobilePage - 1);
      }
    } else {
      if (currentSpreadIndex > 0) {
        goToSpread(currentSpreadIndex - 1);
      }
    }
  }

  // Mobile IntersectionObserver to auto-update active page counter on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.2
  };

  const pageObserver = new IntersectionObserver((entries) => {
    if (window.innerWidth >= 992) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.getAttribute('data-page-index'), 10);
        if (!isNaN(idx)) {
          currentMobilePage = idx;
          const p1 = idx + 1;
          if (currentSpreadDisplay) {
            currentSpreadDisplay.textContent = `${p1 < 10 ? '0' + p1 : p1}`;
          }
          if (btnPrev) btnPrev.style.opacity = currentMobilePage === 0 ? '0.4' : '1';
          if (btnNext) btnNext.style.opacity = currentMobilePage >= totalPages - 1 ? '0.4' : '1';
        }
      }
    });
  }, observerOptions);

  // Setup frames, observers and listeners
  setupPageFrames();
  const allFrames = document.querySelectorAll('.booklet-page-frame');
  allFrames.forEach((frame) => pageObserver.observe(frame));

  // Expose to window for automation and testing
  window.goToSpread = goToSpread;
  window.nextSpread = nextSpread;
  window.prevSpread = prevSpread;
  window.updateSpreadView = updateSpreadView;
  window.updateBookletScale = updateBookletScale;

  // Navigation Event Listeners
  if (btnNext) btnNext.addEventListener('click', nextSpread);
  if (btnPrev) btnPrev.addEventListener('click', prevSpread);

  if (btnToggleSpread) {
    btnToggleSpread.addEventListener('click', () => {
      isSpreadMode = !isSpreadMode;
      if (isSpreadMode) {
        currentSpreadIndex = Math.floor(currentSpreadIndex / 2);
      } else {
        currentSpreadIndex = currentSpreadIndex * 2;
      }
      updateSpreadView();
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      nextSpread();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevSpread();
    } else if (e.key === 'Home') {
      goToSpread(0);
    } else if (e.key === 'End') {
      const isMobile = window.innerWidth < 992;
      goToSpread(isMobile ? totalPages - 1 : (isSpreadMode ? Math.floor((totalPages - 1) / 2) : totalPages - 1));
    }
  });

  // Touch Swipe Navigation for Tablets & Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSpread();
      } else {
        prevSpread();
      }
    }
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    const shouldBeSpread = window.innerWidth >= 992;
    if (shouldBeSpread !== isSpreadMode) {
      isSpreadMode = shouldBeSpread;
    }
    updateSpreadView();
    updateBookletScale();
  });

  // Check URL Hash for Deep Linking (e.g. #page-15)
  function handleHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#page-')) {
      const pageNum = parseInt(hash.replace('#page-', ''), 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        const pageIdx = pageNum - 1;
        goToSpread(window.innerWidth < 992 ? pageIdx : (isSpreadMode ? Math.floor(pageIdx / 2) : pageIdx));
      }
    }
  }

  // Initialize
  updateSpreadView();
  updateBookletScale();
  handleHash();
});
