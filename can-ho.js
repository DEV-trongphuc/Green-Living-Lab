/**
 * EcoLife Signature - Property Listing Controller (can-ho.js)
 * High-performance gallery carousel, fullscreen lightbox & lead capture handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const baseUri = window.ecolifePropertyThemeUri ? (window.ecolifePropertyThemeUri.replace(/\/$/, '') + '/') : '';

  // Gallery Dataset (28 New 3D Renders + Floorplans & Perspectives)
  const galleryImages = [
    { id: 1, src: baseUri + 'images/noi_that/3d/noi_that_3d_01.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_01.jpg', title: 'Phối cảnh 3D phòng khách sang trọng, ngập tràn ánh sáng tự nhiên', category: 'living' },
    { id: 2, src: baseUri + 'images/noi_that/3d/noi_that_3d_02.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_02.jpg', title: 'Góc nhìn liên hoàn phòng khách kết nối logia đón gió biển', category: 'living' },
    { id: 3, src: baseUri + 'images/noi_that/3d/noi_that_3d_03.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_03.jpg', title: 'Thiết kế sofa nỉ cao cấp cùng hệ kệ tivi ốp đá cẩm thạch sang trọng', category: 'living' },
    { id: 4, src: baseUri + 'images/noi_that/3d/noi_that_3d_04.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_04.jpg', title: 'Không gian mở liên kết phòng khách và khu bàn ăn trang nhã', category: 'living' },
    { id: 5, src: baseUri + 'images/noi_that/3d/noi_that_3d_05.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_05.jpg', title: 'Góc thư giãn phòng khách ngắm trọn cảnh quan vịnh biển Đà Nẵng', category: 'living' },
    { id: 6, src: baseUri + 'images/noi_that/3d/noi_that_3d_06.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_06.jpg', title: 'Khu vực bàn ăn gia đình 6 ghế phong cách Scandinavian hiện đại', category: 'living' },
    { id: 7, src: baseUri + 'images/noi_that/3d/noi_that_3d_07.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_07.jpg', title: 'Hệ tủ bếp chữ L cao cấp, bề mặt phủ Acrylic bóng gương tinh tế', category: 'living' },
    { id: 8, src: baseUri + 'images/noi_that/3d/noi_that_3d_08.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_08.jpg', title: 'Chi tiết đảo bếp thông minh kết hợp quầy bar tiện nghi', category: 'living' },
    { id: 9, src: baseUri + 'images/noi_that/3d/noi_that_3d_09.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_09.jpg', title: 'Khu bếp nấu hiện đại trang bị thiết bị Hafele âm tủ đồng bộ', category: 'living' },
    { id: 10, src: baseUri + 'images/noi_that/3d/noi_that_3d_10.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_10.jpg', title: 'Sảnh đón tiền sảnh căn hộ với tủ giày kịch trần thông minh', category: 'living' },
    { id: 11, src: baseUri + 'images/noi_that/3d/noi_that_3d_11.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_11.jpg', title: 'Phòng ngủ Master ấm cúng với gam màu trung tính chuẩn resort', category: 'bedroom' },
    { id: 12, src: baseUri + 'images/noi_that/3d/noi_that_3d_12.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_12.jpg', title: 'Giường ngủ King size bọc da cao cấp cùng vách ốp đầu giường hiện đại', category: 'bedroom' },
    { id: 13, src: baseUri + 'images/noi_that/3d/noi_that_3d_13.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_13.jpg', title: 'Tủ quần áo cánh kính sang trọng tích hợp đèn led cảm ứng', category: 'bedroom' },
    { id: 14, src: baseUri + 'images/noi_that/3d/noi_that_3d_14.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_14.jpg', title: 'Bàn trang điểm và làm việc bên khung cửa sổ ngập tràn ánh sáng', category: 'bedroom' },
    { id: 15, src: baseUri + 'images/noi_that/3d/noi_that_3d_15.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_15.jpg', title: 'Góc nhìn Panorama từ giường ngủ Master đón trọn gió biển tươi mát', category: 'bedroom' },
    { id: 16, src: baseUri + 'images/noi_that/3d/noi_that_3d_16.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_16.jpg', title: 'Chi tiết trần thạch cao gián tiếp và sàn gỗ chịu ẩm cao cấp', category: 'bedroom' },
    { id: 17, src: baseUri + 'images/noi_that/3d/noi_that_3d_17.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_17.jpg', title: 'Phòng ngủ thứ 2 đa năng, thiết kế tối ưu cho con trẻ hoặc khách quý', category: 'bedroom' },
    { id: 18, src: baseUri + 'images/noi_that/3d/noi_that_3d_18.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_18.jpg', title: 'Không gian học tập và làm việc tiện nghi trong phòng ngủ phụ', category: 'bedroom' },
    { id: 19, src: baseUri + 'images/noi_that/3d/noi_that_3d_19.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_19.jpg', title: 'Giường thông minh tích hợp ngăn kéo chứa đồ tiện dụng', category: 'bedroom' },
    { id: 20, src: baseUri + 'images/noi_that/3d/noi_that_3d_20.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_20.jpg', title: 'Cửa sổ Low-E cách âm cách nhiệt hoàn hảo, tầm nhìn khoáng đạt', category: 'bedroom' },
    { id: 21, src: baseUri + 'images/noi_that/3d/noi_that_3d_21.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_21.jpg', title: 'Phòng tắm Master trang bị thiết bị vệ sinh Kohler cao cấp', category: 'bathroom' },
    { id: 22, src: baseUri + 'images/noi_that/3d/noi_that_3d_22.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_22.jpg', title: 'Vách kính cường lực phòng tắm đứng cùng sen cây ổn định nhiệt', category: 'bathroom' },
    { id: 23, src: baseUri + 'images/noi_that/3d/noi_that_3d_23.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_23.jpg', title: 'Gương LED chống mờ thông minh và lavabo sứ tinh tế', category: 'bathroom' },
    { id: 24, src: baseUri + 'images/noi_that/3d/noi_that_3d_24.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_24.jpg', title: 'Ban công sinh thái ngập sắc xanh, bố trí bàn trà thư giãn ngoài trời', category: 'balcony' },
    { id: 25, src: baseUri + 'images/noi_that/3d/noi_that_3d_25.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_25.jpg', title: 'Tầm nhìn ngoạn mục hướng về vịnh Đà Nẵng và bán đảo Sơn Trà', category: 'balcony' },
    { id: 26, src: baseUri + 'images/noi_that/3d/noi_that_3d_26.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_26.jpg', title: 'Khu vực logia giặt phơi riêng biệt, tối ưu lưu thông gió tự nhiên', category: 'balcony' },
    { id: 27, src: baseUri + 'images/noi_that/3d/noi_that_3d_27.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_27.jpg', title: 'Cảnh hoàng hôn tuyệt mỹ nhìn từ ban công căn hộ EcoLife Signature', category: 'balcony' },
    { id: 28, src: baseUri + 'images/noi_that/3d/noi_that_3d_28.webp', fallback: baseUri + 'images/noi_that/3d/noi_that_3d_28.jpg', title: 'Toàn cảnh không gian sống xanh đẳng cấp chuẩn sinh thái tuần hoàn', category: 'living' },
    { id: 29, src: baseUri + 'images/noi_that/can_ho_2pn_17.webp', fallback: baseUri + 'images/noi_that/can_ho_2pn_17.jpg', title: 'Mặt bằng bóc tách layout căn hộ 2PN (66m²) tối ưu không góc chết', category: 'floorplan' },
    { id: 30, src: baseUri + 'images/noi_that/can_ho_2pn_18.webp', fallback: baseUri + 'images/noi_that/can_ho_2pn_18.jpg', title: 'Mặt bằng phân khu tầng & vị trí căn hộ H0603 view biển đắt giá', category: 'floorplan' },
    { id: 31, src: baseUri + 'images/noi_that/can_ho_2pn_19.webp', fallback: baseUri + 'images/noi_that/can_ho_2pn_19.jpg', title: 'Phối cảnh kết nối đại lộ Mê Linh kề vịnh biển & hồ Bàu Tràm', category: 'exterior' },
    { id: 32, src: baseUri + 'images/noi_that/can_ho_2pn_20.webp', fallback: baseUri + 'images/noi_that/can_ho_2pn_20.jpg', title: 'Phối cảnh tổng thể tòa tháp căn hộ thương mại EcoLife Signature', category: 'exterior' }
  ];

  let currentIndex = 0;
  let filteredImages = [...galleryImages];

  // DOM Elements
  const featuredImg = document.getElementById('gallery-featured-img');
  const counterPill = document.getElementById('gallery-counter-num');
  const captionText = document.getElementById('gallery-caption-text');
  const thumbsTrack = document.getElementById('gallery-thumbs-track');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const fullscreenBtn = document.getElementById('gallery-fullscreen-btn');

  // Lightbox DOM Elements
  const lightboxModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-main-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // Render Thumbnails
  const renderThumbnails = () => {
    if (!thumbsTrack) return;
    thumbsTrack.innerHTML = '';
    filteredImages.forEach((img, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === currentIndex ? 'active' : ''}`;
      thumb.setAttribute('data-index', idx);
      thumb.setAttribute('title', img.title);
      thumb.innerHTML = `
        <picture>
          <source srcset="${img.src}" type="image/webp">
          <img src="${img.fallback}" alt="${img.title}" loading="lazy">
        </picture>
      `;
      thumb.addEventListener('click', () => {
        showImage(idx);
      });
      thumbsTrack.appendChild(thumb);
    });
  };

  // Show Image Function
  const showImage = (index) => {
    if (!filteredImages.length) return;
    if (index < 0) index = filteredImages.length - 1;
    if (index >= filteredImages.length) index = 0;
    currentIndex = index;

    const item = filteredImages[currentIndex];

    // Smooth transition
    if (featuredImg) {
      featuredImg.style.opacity = '0.3';
      setTimeout(() => {
        featuredImg.src = item.src;
        featuredImg.onerror = () => { featuredImg.src = item.fallback; };
        featuredImg.alt = item.title;
        featuredImg.style.opacity = '1';
      }, 150);
    }

    if (counterPill) {
      counterPill.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
    }

    if (captionText) {
      captionText.textContent = item.title;
    }

    // Update active thumb
    const allThumbs = thumbsTrack?.querySelectorAll('.thumb-item');
    allThumbs?.forEach((th, idx) => {
      if (idx === currentIndex) {
        th.classList.add('active');
        th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        th.classList.remove('active');
      }
    });

    // Update Lightbox if active
    if (lightboxModal && lightboxModal.classList.contains('is-active')) {
      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.onerror = () => { lightboxImg.src = item.fallback; };
      }
      if (lightboxCaption) lightboxCaption.textContent = item.title;
      if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
    }
  };

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      if (cat === 'all') {
        filteredImages = [...galleryImages];
      } else {
        filteredImages = galleryImages.filter(img => img.category === cat);
      }

      currentIndex = 0;
      renderThumbnails();
      showImage(0);
    });
  });

  // Gallery Navigation
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

  // Lightbox Triggers
  const openLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    showImage(currentIndex);
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', openLightbox);
  const featuredWrap = document.getElementById('gallery-featured-wrap');
  if (featuredWrap) featuredWrap.addEventListener('click', openLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

  // Lightbox Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Initialize Gallery
  renderThumbnails();
  showImage(0);

  // ==========================================================================
  // LEAD CAPTURE FORM CONTROLLER ("Điền form để lại thông tin lead")
  // ==========================================================================
  const leadForm = document.getElementById('property-lead-form');
  const submitBtn = document.getElementById('btn-submit-property-lead');
  const successModal = document.getElementById('property-success-modal');
  const successCloseBtn = document.getElementById('btn-close-success-modal');
  const successCustomerName = document.getElementById('success-customer-name');

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('lead-full-name')?.value.trim() || '';
      const phoneInput = document.getElementById('lead-phone-number')?.value.trim() || '';
      const email = document.getElementById('lead-email')?.value.trim() || '';
      const interest = document.getElementById('lead-interest-plan')?.value || 'Căn 2PN H0603 (66m²) - Thanh toán sớm 95% (2.495 tỷ)';
      const notes = document.getElementById('lead-notes')?.value.trim() || '';

      // Vietnamese Phone Regex Validation (10 digits starting with valid VN prefixes)
      const cleanedPhone = phoneInput.replace(/[\s.-]/g, '');
      const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])[0-9]{8}$/;

      if (!phoneRegex.test(cleanedPhone)) {
        alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, ví dụ: 0912345678).');
        document.getElementById('lead-phone-number')?.focus();
        return;
      }

      // Button loading state
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang Gửi Thông Tin...</span>';
      }

      const leadData = {
        fullName: fullName || `Khách Hàng (${cleanedPhone.slice(-4)})`,
        phoneNumber: cleanedPhone,
        email: email || '',
        interestType: interest,
        consultTime: 'Sớm nhất có thể',
        source: 'Trang Rao Bán Căn Hộ 2PN H0603 (Ecolife Signature)',
        notes: notes,
        timestamp: new Date().toLocaleString('vi-VN')
      };

      // 1. Save to LocalStorage for offline safeguard
      try {
        const stored = JSON.parse(localStorage.getItem('ecolife_leads') || '[]');
        stored.push(leadData);
        localStorage.setItem('ecolife_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      // 2. Submit to WordPress REST API or Fallback Endpoint
      const endpoints = [
        window.ecolifeData?.restUrl || '/wp-json/ecolife/v1/lead',
        '/wp-admin/admin-ajax.php'
      ];

      try {
        let sent = false;
        // Attempt REST API
        try {
          const res = await fetch(endpoints[0], {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-WP-Nonce': window.ecolifeData?.nonce || ''
            },
            body: JSON.stringify(leadData)
          });
          if (res.ok) sent = true;
        } catch (e) {
          console.warn('REST API endpoint unavailable, trying fallback AJAX...');
        }

        // Fallback AJAX if not sent
        if (!sent && window.ecolifeData?.ajaxUrl) {
          const params = new URLSearchParams();
          params.append('action', 'ecolife_submit_lead');
          params.append('fullName', leadData.fullName);
          params.append('phoneNumber', leadData.phoneNumber);
          params.append('email', leadData.email);
          params.append('interestType', leadData.interestType);
          params.append('consultTime', leadData.consultTime);
          params.append('source', leadData.source);
          params.append('notes', leadData.notes);
          await fetch(window.ecolifeData.ajaxUrl, { method: 'POST', body: params });
        }
      } catch (networkErr) {
        console.warn('Submission network notice:', networkErr);
      }

      // Small delay for smooth UX transition
      await new Promise(r => setTimeout(r, 600));

      // Reset button
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Đăng Ký Nhận Báo Giá Gốc</span>';
      }

      // Reset form
      leadForm.reset();

      // Show Success Modal
      if (successCustomerName) {
        successCustomerName.textContent = leadData.fullName;
      }
      if (successModal) {
        successModal.classList.add('is-active');
      }
    });
  }

  // Close Success Modal
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      successModal?.classList.remove('is-active');
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('is-active');
    });
  }

  // Smooth scroll trigger from action buttons to lead form
  document.querySelectorAll('.trigger-lead-scroll').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('property-lead-form');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          document.getElementById('lead-full-name')?.focus();
        }, 500);
      }
    });
  });

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Touch Swipe Support for Main Gallery Carousel on Mobile & Tablet
  if (featuredWrap) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    featuredWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    featuredWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          showImage(currentIndex + 1);
        } else {
          showImage(currentIndex - 1);
        }
      }
    }, { passive: true });
  }

  // Touch Swipe for Lightbox Modal on Mobile
  if (lightboxModal) {
    let lbStartX = 0;
    let lbEndX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      lbStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      lbEndX = e.changedTouches[0].screenX;
      const diffX = lbEndX - lbStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          showImage(currentIndex + 1);
        } else {
          showImage(currentIndex - 1);
        }
      }
    }, { passive: true });
  }
});
