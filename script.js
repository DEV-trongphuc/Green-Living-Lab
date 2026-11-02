/**
 * ECOLIFE SIGNATURE V2 — QUIET LUXURY LIVING JOURNEY ENGINE
 * 7-Chapter Full-Screen Interactive Architecture, 3D GLB, Studio Showcase & Lead Capture
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const THEME_BASE = (window.ecolifeData && window.ecolifeData.themeUrl)
    ? window.ecolifeData.themeUrl.replace(/\/$/, '') + '/'
    : '';

  const resolveAsset = (relPath) => {
    if (!relPath) return '';
    if (relPath.startsWith('http://') || relPath.startsWith('https://') || relPath.startsWith('/')) {
      return relPath;
    }
    return THEME_BASE + relPath;
  };

  // ==========================================================================
  // 1. HEADER GLASSMORPHISM, MOBILE MENU & CHAPTER PROGRESS RAIL
  // ==========================================================================
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const backToTopBtn = document.getElementById('float-backtop');

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) {
      header.classList.toggle('scrolled', y > 40);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', y > 500);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = header ? header.offsetHeight - 4 : 64;
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Scroll Reveal (.reveal-up)
  const revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window && revealEls.length > 0) {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Chapter Progress Rail Spy
  const chapters = document.querySelectorAll('section[data-chapter]');
  const railDots = document.querySelectorAll('.rail-dot');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if ('IntersectionObserver' in window && chapters.length > 0) {
    const chapterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          railDots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === id));
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-35% 0px -45% 0px' });
    chapters.forEach(ch => chapterObs.observe(ch));
  }

  // ==========================================================================
  // 2. CHAPTER 01: HERO VIDEO SCENE SWITCHER & FULL VIDEO MODAL
  // ==========================================================================
  const heroBgVideo = document.getElementById('hero-bg-video');
  const heroScenePills = document.querySelectorAll('.hero-scene-pill');

  heroScenePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const videoSrc = pill.getAttribute('data-video');
      if (!heroBgVideo || !videoSrc) return;
      heroScenePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      heroBgVideo.style.opacity = '0.3';
      setTimeout(() => {
        heroBgVideo.src = resolveAsset(videoSrc);
        heroBgVideo.play().catch(() => {});
        heroBgVideo.style.opacity = '1';
      }, 180);
    });
  });

  // ==========================================================================
  // 3. CHAPTER 02: THE CONVERGENCE (ĐẠI LỘ MÊ LINH • HỒ BÀU TRÀM • BẢN ĐỒ)
  // ==========================================================================
  const convTabBtns = document.querySelectorAll('.conv-tab-btn');
  const convPanes = document.querySelectorAll('.conv-media-pane');
  const convTitleEl = document.getElementById('conv-caption-title');
  const convDescEl = document.getElementById('conv-caption-desc');

  convTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.getAttribute('data-pane');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');

      convTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      convPanes.forEach(pane => {
        const isMatch = pane.id === targetPaneId;
        pane.classList.toggle('active', isMatch);
        const vid = pane.querySelector('video');
        if (vid) {
          if (isMatch) vid.play().catch(() => {});
          else vid.pause();
        }
      });

      if (convTitleEl && title) convTitleEl.textContent = title;
      if (convDescEl && desc) convDescEl.textContent = desc;
    });
  });

  // ==========================================================================
  // 4. CHAPTER 03: INTERACTIVE 3D .GLB VIEWER TOGGLE
  // ==========================================================================
  const btnToggleGlb = document.getElementById('btn-toggle-3d-glb');
  const glbContainer = document.getElementById('arch-glb-container');
  const archSteppedVideo = document.getElementById('arch-stepped-video');
  let glbLoaded = false;
  let glbActive = false;

  if (btnToggleGlb && glbContainer) {
    btnToggleGlb.addEventListener('click', () => {
      glbActive = !glbActive;
      if (glbActive) {
        if (!glbLoaded) {
          const script = document.createElement('script');
          script.type = 'module';
          script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
          document.head.appendChild(script);
          glbContainer.innerHTML = `
            <model-viewer
              src="${resolveAsset('assets/models/ecolife_tower_3d.glb')}"
              alt="Mô hình 3D Tòa tháp EcoLife Signature 17 tầng nổi & 04 vườn chân mây"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              exposure="1.05"
              style="width:100%;height:100%;background:#0d261c;">
            </model-viewer>
          `;
          glbLoaded = true;
        }
        glbContainer.style.display = 'block';
        if (archSteppedVideo) archSteppedVideo.style.display = 'none';
        btnToggleGlb.innerHTML = '<i class="fa-solid fa-video"></i> <span>Xem Video Phối Cảnh</span>';
      } else {
        glbContainer.style.display = 'none';
        if (archSteppedVideo) archSteppedVideo.style.display = 'block';
        btnToggleGlb.innerHTML = '<i class="fa-solid fa-cube"></i> <span>Xoay Mô Hình 3D 360°</span>';
      }
    });
  }

  // ==========================================================================
  // 5. LIGHTBOX GALLERY ENGINE (IMAGES, DIAGRAMS, CERTIFICATES, MASTERPLANS)
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbCounter = document.getElementById('lb-counter');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');

  let lbItems = [];
  let lbIndex = 0;

  const renderLightboxSlide = () => {
    if (!lbItems.length || !lightboxImg) return;
    const item = lbItems[lbIndex];
    lightboxImg.src = resolveAsset(item.src);
    lightboxImg.alt = item.title || 'EcoLife Signature';
    if (lbTitle) lbTitle.textContent = item.title || 'EcoLife Signature';
    if (lbDesc) lbDesc.textContent = item.desc || '';
    if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbItems.length}`;
  };

  window.openLightboxWithItems = (items, startIndex = 0) => {
    if (!items || !items.length || !lightboxModal) return;
    lbItems = items;
    lbIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    renderLightboxSlide();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  if (lbPrev) {
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!lbItems.length) return;
      lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length;
      renderLightboxSlide();
    });
  }
  if (lbNext) {
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!lbItems.length) return;
      lbIndex = (lbIndex + 1) % lbItems.length;
      renderLightboxSlide();
    });
  }

  // Bind single-image or group lightbox triggers
  document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = trigger.getAttribute('data-lightbox-src');
      const title = trigger.getAttribute('data-lightbox-title') || 'EcoLife Signature';
      const desc = trigger.getAttribute('data-lightbox-desc') || '';
      window.openLightboxWithItems([{ src, title, desc }], 0);
    });
  });

  // Realm Gallery Triggers (Chapter 04: 4 Lớp Không Gian Tiện Ích Chuẩn CĐT)
  const realmGalleries = {
    vitality: [
      { src: 'images/tien_ich/ho_boi_resort_01.webp', title: 'SINH KHÍ | VITALITY HUB — Hồ Bơi 32m & Jacuzzi', desc: 'Đặt tại các vị trí dễ tiếp cận: mang lại thẩm mỹ, sinh khí, năng lượng và kết nối với thiên nhiên.' },
      { src: 'images/tien_ich/ho_ca_koi_01.webp', title: 'SINH KHÍ | VITALITY HUB — Hồ Cá Koi Sinh Thái', desc: 'Không gian mặt nước tuần hoàn điều hòa vi khí hậu nội khu.' },
      { src: 'images/tien_ich/duong_chay_bo.webp', title: 'SINH KHÍ | VITALITY HUB — Đường Dạo Bộ & Chạy Bộ', desc: 'Tuyến đường dạo bộ xanh mát bao quanh nội khu.' }
    ],
    community: [
      { src: 'images/tien_ich/shophouse_26_can_dao_pho.webp', title: 'CỘNG ĐỒNG | COMMUNITY — Phố Shophouse Khối Đế 26 Căn', desc: 'Các không gian được thiết kế để kết nối, tăng cường tương tác giữa các cư dân/hàng xóm.' },
      { src: 'images/tien_ich/quang_truong_su_kien.webp', title: 'CỘNG ĐỒNG | COMMUNITY — Quảng Trường Sự Kiện', desc: 'Tâm điểm giao lưu văn hóa và gắn kết cộng đồng cư dân văn minh.' },
      { src: 'images/tien_ich/san_pickleball_01.webp', title: 'CỘNG ĐỒNG | COMMUNITY — Cụm Sân Pickleball & Thể Thao', desc: 'Tiện ích thể thao thời thượng kết nối năng lượng mỗi ngày.' },
      { src: 'images/noi_that/layouts/sanh_01.webp', title: 'CỘNG ĐỒNG | COMMUNITY — Sảnh Đón 5 Sao Atrio', desc: 'Sảnh lễ tân sang trọng đón gió tự nhiên từ Vườn Atrio.' }
    ],
    mindfulness: [
      { src: 'images/tien_ich/vuon_mai_duong_sinh_atrio.webp', title: 'THÂN TÂM TRÍ | MINDFULNESS — Vườn Dưỡng Sinh & Thiền Định', desc: 'Các không gian yên tĩnh, tách biệt khỏi ồn ào. Không gian mở hoặc bán mái, giúp cân bằng cảm xúc, phát triển cá nhân, kết nối bản thân.' },
      { src: 'images/perspectives/rooftop_bbq_details.webp', title: 'THÂN TÂM TRÍ | MINDFULNESS — 04 Tầng Vườn Chân Mây & BBQ', desc: 'Tầng vườn chân mây giật cấp từ tầng 17 xuống tầng 6.' },
      { src: 'images/perspectives/booklet_astronomy_deck.jpg', title: 'THÂN TÂM TRÍ | MINDFULNESS — Đài Thiên Văn & Cafe Tầng Thượng', desc: 'Không gian tĩnh tại ngắm trọn Vịnh Đà Nẵng và bầu trời đêm.' }
    ],
    eco_edu: [
      { src: 'images/tien_ich/mam_non_gca_chuan_toa_trang_xanh.webp', title: 'SINH THÁI HỌC TẬP | ECO-EDU — Trường Mầm Non Chuẩn Công Trình Xanh GCA', desc: 'Các khu vườn giáo dục - thực hành nhỏ gọn, tích hợp vào sân trong hoặc khu vực sân thượng.' },
      { src: 'images/tien_ich/eco_edu_vuon_thuc_nghiem_san_thuong.webp', title: 'SINH THÁI HỌC TẬP | ECO-EDU — Vườn Thực Nghiệm Sân Thượng', desc: 'Vườn ươm thực hành nông nghiệp xanh cho cư dân nhí.' },
      { src: 'images/tien_ich/eco_edu_san_choi_sinh_thai.webp', title: 'SINH THÁI HỌC TẬP | ECO-EDU — Sân Chơi Khám Phá Tự Nhiên', desc: 'Không gian tuổi thơ gắn liền với hệ sinh thái xanh an lành.' }
    ]
  };

  document.querySelectorAll('[data-realm-gallery]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-realm-gallery');
      if (realmGalleries[key]) {
        window.openLightboxWithItems(realmGalleries[key], 0);
      }
    });
  });

  // ==========================================================================
  // 6. CHAPTER 05: STUDIO SHOWCASE ENGINE (06 CĂN MẪU + SHOPHOUSE + PENTHOUSE)
  // ==========================================================================
  const STUDIO_UNITS = {
    a1: {
      badge: 'Mẫu Điển Hình A1 • 2 Phòng Ngủ • Tầng 03–15',
      title: 'Căn Hộ Mẫu CH-A1 (66,0 m² Thông Thủy)',
      desc: 'Thiết kế phong cách Nhật Bản tối giản (Japandi) với tông gỗ sồi sáng ấm cúng. Xử lý khéo léo mọi góc cạnh bằng hệ tủ kịch trần liền mạch, trục phòng khách – bàn ăn nối thẳng ra ban công đón gió biển.',
      area: '66,0 m² (Tim tường 71,2 m²)',
      layout: '2 Phòng Ngủ • 2 WC • Ban công & Lô gia',
      priceEarly: 'Từ 2,60 Tỷ (CK 10%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/units/walkthrough_a1.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/fp3d_a1_66m2.webp', title: 'Mặt Bằng Bóc Tách 3D Góc — Căn Mẫu A1 (66,0 m²)' },
        { src: 'images/floorplans_3d/slide_a1.webp', title: 'Thông Số Kỹ Thuật & Mặt Bằng Chi Tiết — Căn Mẫu A1' }
      ],
      photos: [
        'images/noi_that/layouts/can_a1_01.webp',
        'images/noi_that/layouts/can_a1_02.webp',
        'images/noi_that/layouts/can_a1_03.webp',
        'images/noi_that/layouts/can_a1_04.webp',
        'images/noi_that/layouts/can_a1_05.webp',
        'images/noi_that/layouts/can_a1_06.webp',
        'images/noi_that/layouts/can_a1_07.webp'
      ]
    },
    a2: {
      badge: 'Mẫu Điển Hình A2 • 2 Phòng Ngủ • Tầng 03–15',
      title: 'Căn Hộ Mẫu CH-A2 (68,9 m² Thông Thủy)',
      desc: 'Nổi bật với cá tính hiện đại: tông đen nhám tương phản đá trắng vân mây. Phòng ngủ phụ được thiết kế thông minh với giường tầng đôi liền bàn học kép, tối ưu từng ngóc ngách cho gia đình trẻ có 2 con.',
      area: '68,9 m² (Tim tường 74,5 m²)',
      layout: '2 Phòng Ngủ • 2 WC • Giường tầng đôi thông minh',
      priceEarly: 'Từ 2,68 Tỷ (CK 10%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/units/walkthrough_a2.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/fp3d_a2_68p9m2.webp', title: 'Mặt Bằng Bóc Tách 3D Góc — Căn Mẫu A2 (68,9 m²)' },
        { src: 'images/floorplans_3d/slide_a2.webp', title: 'Thông Số Kỹ Thuật & Mặt Bằng Chi Tiết — Căn Mẫu A2' }
      ],
      photos: [
        'images/noi_that/layouts/can_a2_01.webp',
        'images/noi_that/layouts/can_a2_02.webp',
        'images/noi_that/layouts/can_a2_03.webp',
        'images/noi_that/layouts/can_a2_04.webp',
        'images/noi_that/layouts/can_a2_05.webp',
        'images/noi_that/layouts/can_a2_06.webp',
        'images/noi_that/layouts/can_a2_07.webp',
        'images/noi_that/layouts/can_a2_08.webp'
      ]
    },
    b1: {
      badge: 'Căn Góc B1 • 2 Phòng Ngủ Góc • Tầng 03–15',
      title: 'Căn Hộ Góc CH-B1 (77,8 m² Thông Thủy)',
      desc: 'Sở hữu vị trí góc 2 mặt thoáng đắt giá cùng hệ cửa kính hộp Solar Control rộng mở. Thiết kế bếp chữ L kết hợp bàn đảo mặt đá sang trọng, hóa giải hoàn toàn các góc chết kiến trúc.',
      area: '77,8 m² (Căn góc 2 mặt thoáng)',
      layout: '2 Phòng Ngủ Lớn • 2 WC • Bàn đảo bếp',
      priceEarly: 'Từ 2,85 Tỷ (CK 10%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/units/walkthrough_b1.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/fp3d_b1_77p8m2.webp', title: 'Mặt Bằng Bóc Tách 3D Góc — Căn Góc B1 (77,8 m²)' },
        { src: 'images/floorplans_3d/slide_b1.webp', title: 'Thông Số Kỹ Thuật & Mặt Bằng Chi Tiết — Căn Góc B1' }
      ],
      photos: [
        'images/noi_that/layouts/can_b1_01.webp',
        'images/noi_that/layouts/can_b1_02.webp',
        'images/noi_that/layouts/can_b1_03.webp',
        'images/noi_that/layouts/can_b1_04.webp',
        'images/noi_that/layouts/can_b1_05.webp',
        'images/noi_that/layouts/can_b1_06.webp',
        'images/noi_that/layouts/can_b1_07.webp',
        'images/noi_that/layouts/can_b1_08.webp'
      ]
    },
    b2: {
      badge: 'Mẫu Điển Hình B2 • 2PN+ / 3PN Linh Hoạt • Tầng 03–15',
      title: 'Căn Hộ Mẫu CH-B2 (87,3 m² Thông Thủy)',
      desc: 'Không gian 87,3 m² rộng rãi với khu vực đa năng (+1) linh hoạt làm phòng làm việc, phòng đọc sách hoặc phòng ngủ thứ 3. Hệ tủ âm tường và vách gỗ bo cong tạo cảm giác sang trọng như khách sạn 5 sao.',
      area: '87,3 m² (Không gian đa năng)',
      layout: '2PN+ (3PN Linh hoạt) • 2 WC • Ban công dài',
      priceEarly: 'Từ 2,95 Tỷ (CK 10%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/units/walkthrough_b2.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/fp3d_b2_87p3m2.webp', title: 'Mặt Bằng Bóc Tách 3D Góc — Căn Mẫu B2 (87,3 m²)' },
        { src: 'images/floorplans_3d/slide_b2.webp', title: 'Thông Số Kỹ Thuật & Mặt Bằng Chi Tiết — Căn Mẫu B2' }
      ],
      photos: [
        'images/noi_that/layouts/can_b2_01.webp',
        'images/noi_that/layouts/can_b2_02.webp',
        'images/noi_that/layouts/can_b2_03.webp',
        'images/noi_that/layouts/can_b2_04.webp',
        'images/noi_that/layouts/can_b2_05.webp',
        'images/noi_that/layouts/can_b2_06.webp',
        'images/noi_that/layouts/can_b2_07.webp',
        'images/noi_that/layouts/can_b2_08.webp'
      ]
    },
    b6: {
      badge: 'Mẫu Đặc Quyền B6 • 3PN & 3WC Riêng Tư • Tầng 06–15',
      title: 'Căn Hộ Mẫu CH-B6 (87,1 m² • 3PN – 3WC)',
      desc: 'Thiết kế 3 phòng ngủ đi kèm 3 phòng tắm riêng tư hiếm có. Tông màu kem gỗ sáng chủ đạo kết hợp ngôn ngữ nội thất bo cong mềm mại giúp xử lý triệt để mọi góc cạnh, nâng tầm trải nghiệm sống đa thế hệ.',
      area: '87,1 m² (Thiết kế 3WC độc bản)',
      layout: '3 Phòng Ngủ • 3 WC Riêng Tư • Ban công thoáng',
      priceEarly: 'Từ 3,05 Tỷ (CK 10%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/units/walkthrough_b6.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/fp3d_b6_87p1m2.webp', title: 'Mặt Bằng Bóc Tách 3D Góc — Căn Mẫu B6 (87,1 m² • 3PN-3WC)' },
        { src: 'images/floorplans_3d/slide_b6.webp', title: 'Thông Số Kỹ Thuật & Mặt Bằng Chi Tiết — Căn Mẫu B6' }
      ],
      photos: [
        'images/noi_that/layouts/can_b6_01.webp',
        'images/noi_that/layouts/can_b6_02.webp',
        'images/noi_that/layouts/can_b6_03.webp',
        'images/noi_that/layouts/can_b6_04.webp',
        'images/noi_that/layouts/can_b6_05.webp',
        'images/noi_that/layouts/can_b6_06.webp',
        'images/noi_that/layouts/can_b6_07.webp',
        'images/noi_that/layouts/can_b6_08.webp',
        'images/noi_that/layouts/can_b6_09.webp'
      ]
    },
    b3: {
      badge: 'Căn Góc Hoa Hậu B3 • 3 Phòng Ngủ Panorama • Tầng 03–15',
      title: 'Căn Hộ Góc CH-B3 (88,8 m² Thông Thủy)',
      desc: 'Dòng căn góc 3 phòng ngủ diện tích lớn nhất khối căn hộ tiêu chuẩn, thu trọn tầm nhìn Panorama kép ra Vịnh Đà Nẵng và Hồ Bàu Tràm. Phòng khách nối liền bàn ăn 6 ghế và hệ tủ trưng bày sang trọng.',
      area: '88,8 m² (Căn góc Panorama)',
      layout: '3 Phòng Ngủ • 2 WC • 2 Mặt thoáng hướng biển & hồ',
      priceEarly: 'Từ 3,18 Tỷ (CK 10%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/units/walkthrough_b3.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/fp3d_b3_88p8m2.webp', title: 'Mặt Bằng Bóc Tách 3D Góc — Căn Góc B3 (88,8 m²)' },
        { src: 'images/floorplans_3d/slide_b3.webp', title: 'Thông Số Kỹ Thuật & Mặt Bằng Chi Tiết — Căn Góc B3' }
      ],
      photos: [
        'images/noi_that/layouts/can_b3_01.webp',
        'images/noi_that/layouts/can_b3_02.webp',
        'images/noi_that/layouts/can_b3_03.webp',
        'images/noi_that/layouts/can_b3_04.webp',
        'images/noi_that/layouts/can_b3_05.webp',
        'images/noi_that/layouts/can_b3_06.webp',
        'images/noi_that/layouts/can_b3_07.webp',
        'images/noi_that/layouts/can_b3_08.webp'
      ]
    },
    shophouse: {
      badge: 'Phiên Bản Giới Hạn • 26 Căn Shophouse Khối Đế • Tầng 01–02',
      title: 'Shophouse Thương Mại Khối Đế (129 – 219 m²)',
      desc: 'Chỉ 26 căn Shophouse thông tầng tại khối đế Tầng 1–2 mặt tiền Đại lộ Mê Linh và quảng trường nội khu, đón trọn nhu cầu mua sắm – ẩm thực – dịch vụ của hơn 4.000 cư dân toàn quần thể dự án.',
      area: '129,0 – 219,0 m² (Thông tầng T1–T2)',
      layout: '26 Căn Giới Hạn • Mặt tiền kinh doanh sầm uất',
      priceEarly: 'Từ 5,80 Tỷ (TT Sớm 95%)',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/shophouse_podium.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/mat_bang_tang_tret_chuan.webp', title: 'Mặt Bằng Tổng Thể Khối Đế Thương Mại & 26 Căn Shophouse' },
        { src: 'images/tien_ich/shophouse_26_can_dao_pho.webp', title: 'Phối Cảnh Phố Thương Mại 26 Căn Shophouse Khối Đế' }
      ],
      photos: [
        'images/tien_ich/shophouse_26_can_dao_pho.webp',
        'images/architecture/shophouse_podium_26can.webp',
        'images/tien_ich/pho_cafe_am_thuc_01.webp',
        'images/tien_ich/pho_cafe_am_thuc_02.webp'
      ]
    },
    penthouse: {
      badge: 'Bộ Sưu Tập Độc Bản • 06 Căn Penthouse Tầng Đỉnh 16–17',
      title: 'Penthouse Sân Vườn Chân Mây (192 – 211 m²)',
      desc: 'Chỉ 06 tuyệt tác Penthouse tại tầng 16–17 sở hữu sân vườn riêng biệt trên không, kết nối trực tiếp với hệ vườn chân mây và tầm nhìn độc tôn bao quát trọn Vịnh Đà Nẵng – Bán đảo Sơn Trà – Hồ Bàu Tràm.',
      area: '192,0 – 211,0 m² + Sân vườn riêng',
      layout: '06 Căn Độc Bản • Tầng 16–17 • Sân vườn chân mây',
      priceEarly: 'Suất Ngoại Giao Đặc Quyền',
      bankPolicy: 'Vay 70% • HTLS 0% / 18 tháng',
      video: 'videos/penthouse_sky_garden.mp4',
      floorplans: [
        { src: 'images/floorplans_3d/mat_bang_tang_mai_chuan.webp', title: 'Mặt Bằng Tầng Đỉnh & Không Gian Vườn Chân Mây' },
        { src: 'images/architecture/penthouse_san_vuon_rieng.webp', title: 'Phối Cảnh Penthouse Sân Vườn Riêng Tầng 16–17' }
      ],
      photos: [
        'images/architecture/penthouse_san_vuon_rieng.webp',
        'images/perspectives/rooftop_bbq_details.webp',
        'images/tien_ich/vuon_mai_duong_sinh_atrio.webp'
      ]
    }
  };

  let currentUnitKey = 'a1';
  let currentStudioMode = 'video'; // 'video' | 'floorplan' | 'gallery'
  let currentThumbIndex = 0;

  const studioViewport = document.getElementById('studio-viewport');
  const studioThumbsBar = document.getElementById('studio-thumbs-bar');
  const unitBadgeEl = document.getElementById('studio-unit-badge');
  const unitTitleEl = document.getElementById('studio-unit-title');
  const unitDescEl = document.getElementById('studio-unit-desc');
  const unitAreaEl = document.getElementById('studio-kpi-area');
  const unitLayoutEl = document.getElementById('studio-kpi-layout');
  const unitPriceEl = document.getElementById('studio-kpi-price');
  const unitBankEl = document.getElementById('studio-kpi-bank');
  const unitDockBtns = document.querySelectorAll('.unit-dock-btn');
  const studioModeBtns = document.querySelectorAll('.studio-mode-btn');
  const btnStudioOpenLb = document.getElementById('btn-studio-open-lightbox');

  const renderStudioStage = () => {
    const unit = STUDIO_UNITS[currentUnitKey];
    if (!unit || !studioViewport) return;

    // Update right spec panel
    if (unitBadgeEl) unitBadgeEl.textContent = unit.badge;
    if (unitTitleEl) unitTitleEl.textContent = unit.title;
    if (unitDescEl) unitDescEl.textContent = unit.desc;
    if (unitAreaEl) unitAreaEl.textContent = unit.area;
    if (unitLayoutEl) unitLayoutEl.textContent = unit.layout;
    if (unitPriceEl) unitPriceEl.textContent = unit.priceEarly;
    if (unitBankEl) unitBankEl.textContent = unit.bankPolicy;

    // Update mode buttons
    studioModeBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-mode') === currentStudioMode);
    });

    if (currentStudioMode === 'video') {
      studioViewport.innerHTML = `
        <video src="${resolveAsset(unit.video)}" autoplay muted loop playsinline controls style="width:100%;height:100%;object-fit:cover;"></video>
      `;
      if (studioThumbsBar) {
        studioThumbsBar.innerHTML = unit.photos.map((p, idx) => `
          <div class="studio-thumb" data-photo-idx="${idx}" title="Xem phối cảnh 3D #${idx + 1}">
            <img src="${resolveAsset(p)}" alt="${unit.title}" loading="lazy">
          </div>
        `).join('');
        studioThumbsBar.querySelectorAll('.studio-thumb').forEach(th => {
          th.addEventListener('click', () => {
            currentStudioMode = 'gallery';
            currentThumbIndex = parseInt(th.getAttribute('data-photo-idx') || '0', 10);
            renderStudioStage();
          });
        });
      }
    } else if (currentStudioMode === 'floorplan') {
      const fpList = unit.floorplans || [];
      const activeFp = fpList[currentThumbIndex] || fpList[0];
      studioViewport.innerHTML = `
        <img src="${resolveAsset(activeFp.src)}" alt="${activeFp.title}" class="is-floorplan" style="cursor:zoom-in;" id="studio-active-img">
      `;
      if (studioThumbsBar) {
        studioThumbsBar.innerHTML = fpList.map((fp, idx) => `
          <div class="studio-thumb ${idx === currentThumbIndex ? 'active' : ''}" data-fp-idx="${idx}">
            <img src="${resolveAsset(fp.src)}" alt="${fp.title}">
          </div>
        `).join('');
        studioThumbsBar.querySelectorAll('.studio-thumb').forEach(th => {
          th.addEventListener('click', () => {
            currentThumbIndex = parseInt(th.getAttribute('data-fp-idx') || '0', 10);
            renderStudioStage();
          });
        });
      }
      const activeImg = document.getElementById('studio-active-img');
      if (activeImg) {
        activeImg.addEventListener('click', () => {
          window.openLightboxWithItems(fpList.map(f => ({ src: f.src, title: f.title, desc: unit.title })), currentThumbIndex);
        });
      }
    } else {
      // gallery mode
      const photos = unit.photos || [];
      const activePhoto = photos[currentThumbIndex] || photos[0];
      studioViewport.innerHTML = `
        <img src="${resolveAsset(activePhoto)}" alt="${unit.title}" style="cursor:zoom-in;" id="studio-active-img">
      `;
      if (studioThumbsBar) {
        studioThumbsBar.innerHTML = photos.map((p, idx) => `
          <div class="studio-thumb ${idx === currentThumbIndex ? 'active' : ''}" data-photo-idx="${idx}">
            <img src="${resolveAsset(p)}" alt="${unit.title}" loading="lazy">
          </div>
        `).join('');
        studioThumbsBar.querySelectorAll('.studio-thumb').forEach(th => {
          th.addEventListener('click', () => {
            currentThumbIndex = parseInt(th.getAttribute('data-photo-idx') || '0', 10);
            renderStudioStage();
          });
        });
      }
      const activeImg = document.getElementById('studio-active-img');
      if (activeImg) {
        activeImg.addEventListener('click', () => {
          window.openLightboxWithItems(photos.map((p, i) => ({
            src: p,
            title: `${unit.title} — Góc nhìn #${i + 1}`,
            desc: unit.desc
          })), currentThumbIndex);
        });
      }
    }
  };

  unitDockBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-unit');
      if (!key || !STUDIO_UNITS[key]) return;
      currentUnitKey = key;
      currentThumbIndex = 0;
      unitDockBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStudioStage();
    });
  });

  studioModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (!mode) return;
      currentStudioMode = mode;
      currentThumbIndex = 0;
      renderStudioStage();
    });
  });

  if (btnStudioOpenLb) {
    btnStudioOpenLb.addEventListener('click', () => {
      const unit = STUDIO_UNITS[currentUnitKey];
      if (!unit) return;
      const items = [
        ...unit.floorplans.map(f => ({ src: f.src, title: f.title, desc: unit.desc })),
        ...unit.photos.map((p, i) => ({ src: p, title: `${unit.title} — Phối cảnh #${i + 1}`, desc: unit.desc }))
      ];
      window.openLightboxWithItems(items, 0);
    });
  }

  renderStudioStage();

  // ==========================================================================
  // 7. FULL VIDEO PLAYER MODAL (HERO "XEM PHIM DỰ ÁN")
  // ==========================================================================
  const videoModal = document.getElementById('video-player-modal');
  const videoModalPlayer = document.getElementById('modal-full-video');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoModalBackdrop = document.getElementById('video-modal-backdrop');

  document.querySelectorAll('[data-open-video-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-open-video-modal') || 'videos/hero_trailer_15s.mp4';
      if (videoModal && videoModalPlayer) {
        videoModalPlayer.src = resolveAsset(src);
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        videoModalPlayer.play().catch(() => {});
      }
    });
  });

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    if (videoModalPlayer) videoModalPlayer.pause();
  };
  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoModal);

  // ==========================================================================
  // 8. QUOTATION MODAL, SUCCESS MODAL & LEAD SUBMISSION ENGINE
  // ==========================================================================
  const quoteModal = document.getElementById('quotation-modal');
  const quoteModalClose = document.getElementById('quote-modal-close');
  const quoteModalBackdrop = document.getElementById('quote-modal-backdrop');
  const quoteModalForm = document.getElementById('quote-modal-form');
  const leadForm = document.getElementById('lead-form');

  const successModal = document.getElementById('success-modal');
  const successModalClose = document.getElementById('success-modal-close');
  const successModalBackdrop = document.getElementById('success-modal-backdrop');
  const btnSuccessDone = document.getElementById('btn-success-done');
  const toastContainer = document.getElementById('toast-container');

  const openQuoteModal = (preselectInterest = '') => {
    if (!quoteModal) return;
    if (preselectInterest) {
      const sel = document.getElementById('quote-interest');
      if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value.includes(preselectInterest)) {
            sel.selectedIndex = i;
            break;
          }
        }
      }
    }
    quoteModal.classList.add('active');
    quoteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeQuoteModal = () => {
    if (!quoteModal) return;
    quoteModal.classList.remove('active');
    quoteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn-trigger-quote').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const interest = btn.getAttribute('data-interest') || '';
      openQuoteModal(interest);
    });
  });

  if (quoteModalClose) quoteModalClose.addEventListener('click', closeQuoteModal);
  if (quoteModalBackdrop) quoteModalBackdrop.addEventListener('click', closeQuoteModal);

  const showSuccessModal = (name, phone) => {
    if (!successModal) return;
    const nameEl = document.getElementById('success-display-name');
    const phoneEl = document.getElementById('success-display-phone');
    if (nameEl) nameEl.textContent = name || 'Quý khách';
    if (phoneEl) phoneEl.textContent = phone || '';
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeSuccessModal = () => {
    if (!successModal) return;
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (successModalClose) successModalClose.addEventListener('click', closeSuccessModal);
  if (successModalBackdrop) successModalBackdrop.addEventListener('click', closeSuccessModal);
  if (btnSuccessDone) btnSuccessDone.addEventListener('click', closeSuccessModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeVideoModal();
      closeQuoteModal();
      closeSuccessModal();
    }
  });

  const showToast = (message, type = 'success') => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}" style="color:${type === 'success' ? '#0d3b29' : '#dc2626'};font-size:1.2rem;"></i>
      <div>
        <strong style="display:block;font-size:0.8rem;">${type === 'success' ? 'ĐĂNG KÝ THÀNH CÔNG' : 'THÔNG BÁO'}</strong>
        <span style="font-size:0.8rem;color:#4a5550;">${message}</span>
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  };

  let isSubmitting = false;
  const handleLeadSubmission = async (formData, submitBtn, formEl, isModal) => {
    if (isSubmitting) return;
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])[0-9]{8}$/;
    const cleanedPhone = (formData.phoneNumber || '').replace(/[\s.-]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      showToast('Vui lòng nhập số điện thoại hợp lệ (10 số).', 'error');
      return;
    }

    isSubmitting = true;
    if (submitBtn) submitBtn.disabled = true;

    const currentRef = window.ECOLIFE_REF || localStorage.getItem('ecolife_ref') || sessionStorage.getItem('ecolife_ref') || '';
    const baseSource = isModal ? 'Popup Nhận Báo Giá V2' : 'Form Private Lounge V2';
    const leadData = {
      fullName: formData.fullName || '',
      phoneNumber: cleanedPhone,
      email: formData.email || '',
      interestType: formData.interestType || 'Căn hộ Thương mại 2PN',
      consultTime: formData.consultTime || 'Sớm nhất có thể',
      source: currentRef ? `ref=${currentRef} - ${baseSource}` : baseSource,
      ref: currentRef
    };

    try {
      const stored = JSON.parse(localStorage.getItem('ecolife_leads') || '[]');
      stored.push({ ...leadData, timestamp: new Date().toLocaleString('vi-VN') });
      localStorage.setItem('ecolife_leads', JSON.stringify(stored));
    } catch (e) {}

    const endpoints = [];
    if (window.ecolifeData && window.ecolifeData.restUrl) {
      endpoints.push(window.ecolifeData.restUrl);
    } else {
      endpoints.push('/wp-json/ecolife/v1/lead');
    }
    endpoints.push((window.ecolifeData?.themeUrl || '') + '/api/submit-lead.php');

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.ecolifeData?.nonce || ''
          },
          body: JSON.stringify(leadData)
        });
        if (res.ok) {
          const json = await res.json();
          if (json && (json.success || json.lead_id)) break;
        }
      } catch (err) {}
    }

    if (submitBtn) submitBtn.disabled = false;
    setTimeout(() => { isSubmitting = false; }, 2000);
    if (formEl) formEl.reset();
    if (isModal) closeQuoteModal();

    showSuccessModal(leadData.fullName, leadData.phoneNumber);
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: leadData.interestType, currency: 'VND', value: 1.0 });
    }
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', { currency: 'VND', value: 1.0, event_label: leadData.interestType });
    }
    showToast(`Đã ghi nhận yêu cầu của ${leadData.fullName}. Chuyên viên sẽ liên hệ trong 15 phút!`, 'success');
  };

  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLeadSubmission({
        fullName: document.getElementById('quote-name')?.value.trim(),
        phoneNumber: document.getElementById('quote-phone')?.value.trim(),
        email: document.getElementById('quote-email')?.value.trim(),
        interestType: document.getElementById('quote-interest')?.value,
        consultTime: document.getElementById('quote-time')?.value
      }, document.getElementById('btn-submit-quote-modal'), quoteModalForm, true);
    });
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLeadSubmission({
        fullName: document.getElementById('full-name')?.value.trim(),
        phoneNumber: document.getElementById('phone-number')?.value.trim(),
        email: document.getElementById('contact-email')?.value.trim(),
        interestType: document.getElementById('interest-type')?.value,
        consultTime: 'Sớm nhất có thể'
      }, document.getElementById('btn-submit-lead'), leadForm, false);
    });
  }
});
