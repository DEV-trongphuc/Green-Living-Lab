/**
 * HÒA HIỆP SPONGE CITY - GREEN LIVING LAB
 * Luxury Real Estate Landing Page Interactive Engine
 * Developed with Vanilla JS & Modern Browser APIs
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Navigation & Header Scroll State
  // ==========================================================================
  const header = document.getElementById('main-header') || document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('float-backtop');

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header glassmorphism & shrink
    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Floating Back to Top Button
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Parallax background in Dark Section
    const parallaxBg = document.getElementById('parallax-bg');
    const masterplanSec = document.getElementById('masterplan');
    if (parallaxBg && masterplanSec) {
      const rect = masterplanSec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.15;
        parallaxBg.style.transform = `translateY(${offset}px)`;
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Subtle 3D Mouse Parallax for Hero Visual
  const heroVisual = document.querySelector('.hero-visual-container');
  if (heroVisual && window.innerWidth > 992) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transition = 'transform 0.6s ease';
      heroVisual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
    heroVisual.addEventListener('mouseenter', () => {
      heroVisual.style.transition = 'none';
    });
  }

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth Scroll for Internal Anchor Links with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active Link Spy via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));
  }


  // ==========================================================================
  // 2. Scroll Reveal Animations (IntersectionObserver)
  // ==========================================================================
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const checkInitialVisibility = () => {
    animateElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80) {
        el.classList.add('is-visible');
      }
    });
  };

  if ('IntersectionObserver' in window && animateElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.02,
      rootMargin: '0px 0px 60px 0px'
    });

    animateElements.forEach(el => revealObserver.observe(el));
    checkInitialVisibility();
  } else {
    animateElements.forEach(el => el.classList.add('is-visible'));
  }


  // ==========================================================================
  // 3. KPI Animated Counters
  // ==========================================================================
  const kpiNumbers = document.querySelectorAll('.kpi-number[data-target]');
  let hasCounted = false;

  const runCounters = () => {
    kpiNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const isPercent = target === 100;
      const isFourThousand = target === 4000;
      const duration = 2200; // ms
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let currentFrame = 0;

      const easeOutQuad = t => t * (2 - t);

      const updateCounter = () => {
        currentFrame++;
        const progress = easeOutQuad(currentFrame / totalFrames);
        const currentValue = Math.round(target * progress);

        if (isFourThousand) {
          counter.textContent = currentValue.toLocaleString('vi-VN') + '+';
        } else if (isPercent) {
          counter.textContent = currentValue + '%';
        } else {
          counter.textContent = currentValue + '+';
        }

        if (currentFrame < totalFrames) {
          requestAnimationFrame(updateCounter);
        } else {
          if (isFourThousand) counter.textContent = '4.000+';
          else if (isPercent) counter.textContent = '100%';
          else counter.textContent = target + '+';
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const heroKpiSection = document.querySelector('.hero-kpi-bar');
  if (heroKpiSection && 'IntersectionObserver' in window) {
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          runCounters();
        }
      });
    }, { threshold: 0.2 });

    kpiObserver.observe(heroKpiSection);
  } else {
    runCounters();
  }


  // ==========================================================================
  // 4. 4 Pillars Interactive Tab Switcher
  // ==========================================================================
  const pillarBtns = document.querySelectorAll('.pillar-tab-btn');
  const pillarPanels = document.querySelectorAll('.pillar-content-panel');

  pillarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pillarKey = btn.getAttribute('data-pillar');
      if (!pillarKey) return;

      // Toggle button states
      pillarBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle panel states
      pillarPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel-${pillarKey}`) {
          panel.classList.add('active');
        }
      });
    });
  });


  // ==========================================================================
  // 5. Masterplan View Switcher (Ground vs Rooftop)
  // ==========================================================================
  const btnGround = document.getElementById('btn-view-ground');
  const btnRooftop = document.getElementById('btn-view-rooftop');
  const viewGround = document.getElementById('view-ground');
  const viewRooftop = document.getElementById('view-rooftop');

  if (btnGround && btnRooftop && viewGround && viewRooftop) {
    btnGround.addEventListener('click', () => {
      btnGround.classList.add('active');
      btnRooftop.classList.remove('active');
      viewGround.classList.add('active');
      viewRooftop.classList.remove('active');
    });

    btnRooftop.addEventListener('click', () => {
      btnRooftop.classList.add('active');
      btnGround.classList.remove('active');
      viewRooftop.classList.add('active');
      viewGround.classList.remove('active');
    });
  }


  // ==========================================================================
  // 6. 3D Gallery Filter System
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  // ==========================================================================
  // 7. Luxury Lightbox Modal
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');

  const openLightbox = (imgSrc, title, desc) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title || 'Phối cảnh dự án Hòa Hiệp';
    if (lbTitle) lbTitle.textContent = title || 'Hòa Hiệp Sponge City';
    if (lbDesc) lbDesc.textContent = desc || 'Phối cảnh không gian sống sinh thái tuần hoàn.';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  };

  // Attach lightbox to gallery cards
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img') || card.querySelector('img')?.src;
      const title = card.getAttribute('data-title') || card.querySelector('h4')?.textContent;
      const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent;
      if (imgSrc) {
        openLightbox(imgSrc, title, desc);
      }
    });
  });

  // Attach lightbox to zoomable images (like masterplans, showcase)
  document.querySelectorAll('.zoomable-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const imgSrc = img.src;
      const title = img.getAttribute('alt') || 'Bản vẽ dự án';
      const desc = img.getAttribute('data-caption') || 'Chi tiết mặt bằng kiến trúc & cảnh quan';
      openLightbox(imgSrc, title, desc);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });


  // ==========================================================================
  // 8. Google Sheets Integration & Quotation/Success Modals
  // ==========================================================================
  const GOOGLE_SHEET_ID = '1r_Mh2zjcLZio3m-ozGoDRfDu0uJPHKrp9lPAF1YUds0';
  // Deployed Google Apps Script Web App URL (Live Connected)
  const GOOGLE_SHEET_SCRIPT_URL = window.HOA_HIEP_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzHk3rzOzwwFVErevqP41BAjT9sebhnele14QWHYvFyjHaQUXL2C-nBw-CUNRQq7Jxp/exec';

  // Quotation Modal Elements
  const quoteModal = document.getElementById('quotation-modal');
  const quoteModalBackdrop = document.getElementById('quote-modal-backdrop');
  const quoteModalClose = document.getElementById('quote-modal-close');
  const quoteModalForm = document.getElementById('quote-modal-form');
  const triggerQuoteBtns = document.querySelectorAll('.btn-trigger-quote');

  // Success Modal Elements
  const successModal = document.getElementById('success-modal');
  const successModalBackdrop = document.getElementById('success-modal-backdrop');
  const successModalClose = document.getElementById('success-modal-close');
  const successModalDone = document.getElementById('btn-success-done');
  const successDisplayName = document.getElementById('success-display-name');
  const successDisplayPhone = document.getElementById('success-display-phone');

  // Open Quotation Modal
  const openQuoteModal = () => {
    if (quoteModal) {
      quoteModal.classList.add('active');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = quoteModal.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }
  };

  // Close Quotation Modal
  const closeQuoteModal = () => {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Open Success Modal
  const showSuccessModal = (name, phone) => {
    if (successModal) {
      if (successDisplayName) successDisplayName.textContent = name || 'Quý khách';
      if (successDisplayPhone) successDisplayPhone.textContent = phone || 'liên hệ';
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  // Close Success Modal
  const closeSuccessModal = () => {
    if (successModal) {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Event Listeners for Quotation Modal Triggers
  triggerQuoteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  });

  if (quoteModalClose) quoteModalClose.addEventListener('click', closeQuoteModal);
  if (quoteModalBackdrop) quoteModalBackdrop.addEventListener('click', closeQuoteModal);
  if (successModalClose) successModalClose.addEventListener('click', closeSuccessModal);
  if (successModalBackdrop) successModalBackdrop.addEventListener('click', closeSuccessModal);
  if (successModalDone) successModalDone.addEventListener('click', closeSuccessModal);

  // Close all modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quoteModal && quoteModal.classList.contains('active')) closeQuoteModal();
      if (successModal && successModal.classList.contains('active')) closeSuccessModal();
    }
  });

  // Lead Generation & Google Sheets Submission Handler
  const leadForm = document.getElementById('lead-form');
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message, type = 'success') => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    const icon = type === 'success' 
      ? '<i class="fa-solid fa-circle-check"></i>' 
      : '<i class="fa-solid fa-triangle-exclamation"></i>';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <h4>${type === 'success' ? 'ĐĂNG KÝ THÀNH CÔNG' : 'LỖI THÔNG TIN'}</h4>
        <p>${message}</p>
      </div>
      <button class="toast-close" aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button>
    `;

    toastContainer.appendChild(toast);
    const autoRemove = setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 400);
    }, 5500);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(autoRemove);
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 400);
    });
  };

  // Generic Submit Function to Google Sheets & LocalStorage
  const handleLeadSubmission = async (formData, submitBtn, formElement, isModal = false) => {
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])[0-9]{8}$/;
    const cleanedPhone = (formData.phoneNumber || '').replace(/[\s.-]/g, '');

    if (!phoneRegex.test(cleanedPhone)) {
      showToast('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, ví dụ 0912345678).', 'error');
      return;
    }

    // Set Loading State
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }

    const leadData = {
      timestamp: new Date().toLocaleString('vi-VN'),
      fullName: formData.fullName || '',
      phoneNumber: cleanedPhone,
      email: formData.email || 'Chưa cung cấp',
      interestType: formData.interestType || 'Căn hộ NOXH',
      consultTime: formData.consultTime || 'Sớm nhất có thể',
      source: isModal ? 'Popup Nhận Báo Giá' : 'Form Đăng Ký Chân Trang'
    };

    // 1. Save to LocalStorage for offline safeguard
    try {
      const storedLeads = JSON.parse(localStorage.getItem('hoa_hiep_leads') || '[]');
      storedLeads.push(leadData);
      localStorage.setItem('hoa_hiep_leads', JSON.stringify(storedLeads));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // 2. Post to Google Apps Script (if configured)
    if (GOOGLE_SHEET_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SHEET_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });
      } catch (err) {
        console.warn('Google Sheets fetch warning:', err);
      }
    }

    // Simulate realistic network delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Reset button & form
    if (submitBtn) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
    if (formElement) formElement.reset();

    // Close quote modal if submitting from inside it
    if (isModal) closeQuoteModal();

    // Show Gorgeous Success Modal
    showSuccessModal(leadData.fullName, leadData.phoneNumber);

    // Also trigger brief toast notification
    showToast(`Đã ghi nhận yêu cầu của Quý khách ${leadData.fullName}. Chuyên viên sẽ liên hệ trong 15 phút.`, 'success');
  };

  // Submit Handler for Popup Modal Form
  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-submit-quote-modal');
      const formData = {
        fullName: document.getElementById('quote-name')?.value.trim(),
        phoneNumber: document.getElementById('quote-phone')?.value.trim(),
        email: document.getElementById('quote-email')?.value.trim(),
        interestType: document.getElementById('quote-interest')?.value,
        consultTime: document.getElementById('quote-time')?.value
      };
      handleLeadSubmission(formData, submitBtn, quoteModalForm, true);
    });
  }

  // Submit Handler for In-Page Contact Section Form
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-submit-lead');
      const formData = {
        fullName: document.getElementById('full-name')?.value.trim(),
        phoneNumber: document.getElementById('phone-number')?.value.trim(),
        email: '',
        interestType: document.getElementById('interest-type')?.value,
        consultTime: 'Sớm nhất có thể'
      };
      handleLeadSubmission(formData, submitBtn, leadForm, false);
    });
  }

  // ==========================================================================
  // 11. Mobile Slidedots Pagination Engine
  // ==========================================================================
  const initMobileSliderDots = () => {
    const sliders = [
      { container: document.querySelector('.concept-grid'), dotsWrap: document.getElementById('dots-concept') },
      { container: document.querySelector('.living-timeline-grid'), dotsWrap: document.getElementById('dots-living') },
      { container: document.querySelector('.gallery-grid'), dotsWrap: document.getElementById('dots-gallery') },
      { container: document.querySelector('.location-grid'), dotsWrap: document.getElementById('dots-location') }
    ];

    sliders.forEach(({ container, dotsWrap }) => {
      if (!container || !dotsWrap) return;

      const refreshDots = () => {
        if (window.innerWidth > 768) {
          dotsWrap.innerHTML = '';
          return;
        }

        const cards = Array.from(container.children).filter(c => {
          return c.classList.contains('concept-card') ||
                 c.classList.contains('living-card') ||
                 c.classList.contains('gallery-card') ||
                 c.classList.contains('location-card');
        }).filter(c => window.getComputedStyle(c).display !== 'none');

        if (cards.length <= 1) {
          dotsWrap.innerHTML = '';
          return;
        }

        if (dotsWrap.children.length !== cards.length) {
          dotsWrap.innerHTML = '';
          cards.forEach((card, idx) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Trang ${idx + 1}`);
            dot.addEventListener('click', (e) => {
              e.stopPropagation();
              const cardOffset = card.offsetLeft - container.offsetLeft;
              const centerOffset = cardOffset - (container.offsetWidth - card.offsetWidth) / 2;
              container.scrollTo({ left: Math.max(0, centerOffset), behavior: 'smooth' });
            });
            dotsWrap.appendChild(dot);
          });
        }

        // Active dot calculation based on center position
        const scrollLeft = container.scrollLeft;
        const containerCenter = scrollLeft + container.offsetWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const cardCenter = card.offsetLeft - container.offsetLeft + card.offsetWidth / 2;
          const diff = Math.abs(containerCenter - cardCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        Array.from(dotsWrap.children).forEach((dot, idx) => {
          dot.classList.toggle('active', idx === closestIdx);
        });
      };

      refreshDots();
      container.addEventListener('scroll', () => {
        requestAnimationFrame(refreshDots);
      }, { passive: true });

      container._refreshDots = refreshDots;
    });
  };

  initMobileSliderDots();

  window.addEventListener('resize', () => {
    document.querySelectorAll('.concept-grid, .living-timeline-grid, .gallery-grid, .location-grid').forEach(c => {
      if (c._refreshDots) c._refreshDots();
    });
  }, { passive: true });

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid && galleryGrid._refreshDots) {
          galleryGrid._refreshDots();
        }
      }, 300);
    });
  });

  // Console Welcome Branding
  console.log(
    '%c🌿 HÒA HIỆP SPONGE CITY - GREEN LIVING LAB\n%cThiết kế Cảnh quan bởi APA Consultant | Chủ Đầu Tư: Capital House\n%cGoogle Sheet Connected: ' + GOOGLE_SHEET_ID,
    'color: #d4af37; font-size: 16px; font-weight: bold; background: #07130e; padding: 8px 14px; border-radius: 6px;',
    'color: #8fa89b; font-size: 12px; margin-top: 4px;',
    'color: #10b981; font-size: 11px; margin-top: 2px;'
  );
});
