/**
 * ECOLIFE SIGNATURE — V3 CLEAN BASIC LUXURY INTERACTIVE CONTROLLER
 * - Location Segmented Video & 4K Image Switcher
 * - Apartment Studio 8-Unit Multi-Shot CapCut Video & 3D Floorplan Controller
 * - 3D GLB Architectural Model Modal & High-Res Lightbox
 * - Subpage Mobile Navigation & Lead Form Handler
 */

(function () {
  'use strict';

  const TPL_URI = (typeof window.ECOLIFE_THEME_URI !== 'undefined' && window.ECOLIFE_THEME_URI)
    ? window.ECOLIFE_THEME_URI.replace(/\/$/, '')
    : '.';

  function assetUrl(relPath) {
    if (!relPath) return '';
    if (/^(https?:)?\/\//i.test(relPath) || relPath.startsWith('data:')) return relPath;
    const clean = relPath.replace(/^\.?\//, '');
    return `${TPL_URI}/${clean}`;
  }

  /* ==========================================================================
     1. LOCATION MEDIA DATA
     ========================================================================== */
  const LOCATION_VIEWS = {
    melinh: {
      video: 'videos/melinh_aerial_complex.mp4',
      poster: 'images/architecture/melinh_boulevard_shophouse.webp',
      fullImg: 'images/architecture/melinh_boulevard_shophouse.webp',
      title: 'Trục Đại Lộ Mê Linh & Quần Thể 03 Tòa Tháp',
      desc: 'Mặt tiền Đại lộ Mê Linh rộng thoáng kết nối trực tiếp Hồ Bàu Tràm và Vịnh Đà Nẵng.'
    },
    bautram: {
      video: 'videos/dragon_bridge_beach_flycam.mp4',
      poster: 'images/architecture/persp_lake_view.webp',
      fullImg: 'images/architecture/persp_lake_view.webp',
      title: 'Tầm Nhìn Hồ Sinh Thái Bàu Tràm & Vịnh Đà Nẵng',
      desc: 'Thừa hưởng luồng gió biển tươi mát và hệ sinh thái mặt nước tự nhiên quy mô lớn.'
    },
    map: {
      video: 'videos/map_zoom_melinh.mp4',
      poster: 'images/location/location_map.webp',
      fullImg: 'images/location/location_map.webp',
      title: 'Bản Đồ Kết Nối Chiến Lược Tây Bắc Đà Nẵng',
      desc: '02 phút ra biển Xuân Thiều • 05 phút đến Cảng Liên Chiểu & FTZ • 15 phút về sân bay.'
    }
  };

  /* ==========================================================================
     2. 08 PRODUCT LINES (6 APARTMENT MODELS + SHOPHOUSE + PENTHOUSE)
        Multi-shot 12s CapCut Videos + 3D Floorplans + 3D Interior Galleries
     ========================================================================== */
  const STUDIO_UNITS = {
    a1: {
      code: 'MẪU CĂN CH-A1 • TẦNG 03–17 • 196 CĂN',
      title: 'Căn Hộ Mẫu A1 — 66,0 m² (2 Phòng Ngủ Chuẩn)',
      desc: 'Thiết kế tối ưu cho gia đình trẻ với phòng khách nối liền bàn ăn thoáng rộng, hệ tủ kịch trần phẳng phiu và các góc bo cong tinh tế. Bếp chữ L bố trí tách biệt kết nối trực tiếp logia phụ, giữ không gian sinh hoạt luôn thông thoáng.',
      video: 'videos/units/walkthrough_a1.mp4',
      poster: 'images/apartments/a1_living_1.webp',
      floorplan: 'images/units/fp_2pn_a1_66m2.webp',
      specs: [
        ['Diện tích thông thủy', '66,0 m² (Tim tường: 70,5 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ • 02 WC • 02 Logia'],
        ['Điểm nhấn thiết kế', 'Bếp tách biệt nối thẳng logia • Tủ kịch trần bo cong'],
        ['Giá tham chiếu (TT Sớm)', 'Từ 2,60 Tỷ / căn (Quà tặng 01 Chỉ Vàng)']
      ],
      gallery: [
        'images/units/fp_2pn_a1_66m2.webp',
        'images/apartments/a1_living_1.webp',
        'images/apartments/a1_living_2.webp',
        'images/apartments/a1_dining.webp',
        'images/apartments/a1_kitchen.webp',
        'images/apartments/a1_master_1.webp',
        'images/apartments/a1_bed2_1.webp',
        'images/apartments/a1_wc.webp'
      ]
    },
    a2: {
      code: 'MẪU CĂN CH-A2 • TẦNG 03–17 • 290 CĂN',
      title: 'Căn Hộ Mẫu A2 — 68,9 m² (2 Phòng Ngủ Gia Đình)',
      desc: 'Dòng căn hộ chủ đạo chiếm số lượng lớn nhất dự án. Không gian phòng khách – bàn ăn liên thông ra ban công đón sáng tự nhiên; phòng ngủ phụ thiết kế thông minh với hệ giường tầng đôi tối ưu cho gia đình có 2 trẻ nhỏ.',
      video: 'videos/units/walkthrough_a2.mp4',
      poster: 'images/apartments/a2_living_1.webp',
      floorplan: 'images/units/fp_2pn_a2_68_9m2.webp',
      specs: [
        ['Diện tích thông thủy', '68,9 m² (Tim tường: 73,6 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ • 02 WC • 02 Logia'],
        ['Điểm nhấn thiết kế', 'Phòng ngủ trẻ em giường tầng đôi • Ban công rộng'],
        ['Giá tham chiếu (TT Sớm)', 'Từ 2,72 Tỷ / căn (Quà tặng 01 Chỉ Vàng)']
      ],
      gallery: [
        'images/units/fp_2pn_a2_68_9m2.webp',
        'images/apartments/a2_living_1.webp',
        'images/apartments/a2_living_2.webp',
        'images/apartments/a2_kitchen.webp',
        'images/apartments/a2_master_1.webp',
        'images/apartments/a2_kids_1.webp',
        'images/apartments/a2_kids_2.webp',
        'images/apartments/a2_wc_1.webp'
      ]
    },
    b1: {
      code: 'CĂN GÓC CH-B1 • TẦNG 03–16 • 76 CĂN',
      title: 'Căn Góc B1 — 77,8 m² (2 Phòng Ngủ Góc 2 Mặt Thoáng)',
      desc: 'Sở hữu vị trí góc đắt giá với 2 mặt thoáng đón gió biển và ánh sáng tự nhiên vào mọi phòng chức năng. Khu vực bếp mở kết hợp bàn đảo hiện đại cùng phòng ngủ Master có cửa sổ lớn hướng hồ sinh thái và nội khu.',
      video: 'videos/units/walkthrough_b1.mp4',
      poster: 'images/apartments/b1_living_1.webp',
      floorplan: 'images/units/fp_2pn_b1_77_8m2.webp',
      specs: [
        ['Diện tích thông thủy', '77,8 m² (Tim tường: 83,2 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ góc • 02 WC • Bàn đảo bếp'],
        ['Điểm nhấn thiết kế', 'Vị trí căn góc 2 mặt thoáng • 100% phòng đón sáng'],
        ['Chính sách ưu đãi', 'Tặng 01 Chỉ Vàng • Hỗ trợ lãi suất 0% / 18 tháng']
      ],
      gallery: [
        'images/units/fp_2pn_b1_77_8m2.webp',
        'images/apartments/b1_living_1.webp',
        'images/apartments/b1_living_2.webp',
        'images/apartments/b1_kitchen_1.webp',
        'images/apartments/b1_master_1.webp',
        'images/apartments/b1_master_2.webp',
        'images/apartments/b1_bed2_1.webp',
        'images/apartments/b1_wc_1.webp'
      ]
    },
    b2: {
      code: 'MẪU CĂN CH-B2 • TẦNG 03–15 • 13 CĂN GIỚI HẠN',
      title: 'Căn Hộ Mẫu B2 — 87,3 m² (2PN+ Đa Năng Linh Hoạt)',
      desc: 'Phiên bản giới hạn chỉ 13 căn toàn dự án với không gian cộng thêm (+1) linh hoạt: dễ dàng tùy biến thành phòng làm việc riêng tư, phòng đọc sách hoặc phòng ngủ thứ 3 khi gia đình đón thêm thành viên.',
      video: 'videos/units/walkthrough_b2.mp4',
      poster: 'images/apartments/b2_living_1.webp',
      floorplan: 'images/units/fp_3pn_b2_87_3m2.webp',
      specs: [
        ['Diện tích thông thủy', '87,3 m² (Tim tường: 93,4 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ lớn + 01 Phòng đa năng • 02 WC'],
        ['Điểm nhấn thiết kế', 'Không gian +1 tùy biến linh hoạt • Phòng khách rộng'],
        ['Chính sách ưu đãi', 'Tặng 02 Chỉ Vàng • Chiết khấu thanh toán sớm 10%']
      ],
      gallery: [
        'images/units/fp_3pn_b2_87_3m2.webp',
        'images/apartments/b2_living_1.webp',
        'images/apartments/b2_living_2.webp',
        'images/apartments/b2_dining_1.webp',
        'images/apartments/b2_kitchen.webp',
        'images/apartments/b2_master_1.webp',
        'images/apartments/b2_bed2_1.webp',
        'images/apartments/b2_study_1.webp'
      ]
    },
    b6: {
      code: 'MẪU CĂN CH-B6 • TẦNG 03–17 • 55 CĂN',
      title: 'Căn Hộ Mẫu B6 — 87,1 m² (3 Phòng Ngủ • 3 WC Khép Kín)',
      desc: 'Thiết kế chuyên biệt cho gia đình đa thế hệ (Ông bà – Cha mẹ – Con cái) hoặc khai thác cho thuê dòng tiền cao với 03 phòng ngủ rộng rãi và 03 phòng vệ sinh độc lập, đảm bảo sự riêng tư tuyệt đối cho từng thành viên.',
      video: 'videos/units/walkthrough_b6.mp4',
      poster: 'images/apartments/b6_living_1.webp',
      floorplan: 'images/units/fp_3pn_b6_87_1m2.webp',
      specs: [
        ['Diện tích thông thủy', '87,1 m² (Tim tường: 93,1 m²)'],
        ['Cấu trúc công năng', '03 Phòng ngủ • 03 WC riêng biệt • 02 Logia'],
        ['Điểm nhấn thiết kế', '2 Phòng ngủ Master khép kín • Chuẩn gia đình 3 thế hệ'],
        ['Chính sách ưu đãi', 'Tặng 02 Chỉ Vàng • Ân hạn nợ gốc 18 tháng']
      ],
      gallery: [
        'images/units/fp_3pn_b6_87_1m2.webp',
        'images/apartments/b6_living_1.webp',
        'images/apartments/b6_living_2.webp',
        'images/apartments/b6_dining_1.webp',
        'images/apartments/b6_master_1.webp',
        'images/apartments/b6_bed2_1.webp',
        'images/apartments/b6_bed3_1.webp',
        'images/apartments/b6_wc_1.webp'
      ]
    },
    b3: {
      code: 'CĂN GÓC HOA HẬU CH-B3 • TẦNG 03–15 • 13 CĂN',
      title: 'Căn Góc B3 — 88,8 m² (3 Phòng Ngủ Góc Panorama)',
      desc: 'Tuyệt phẩm căn góc đẹp nhất dự án với tầm nhìn Panorama ôm trọn Đại lộ Mê Linh, Hồ Bàu Tràm và Vịnh Đà Nẵng. Phòng khách bề thế kết hợp bàn ăn 6 ghế sang trọng và hệ kính lớn đón trọn ánh sáng tự nhiên.',
      video: 'videos/units/walkthrough_b3.mp4',
      poster: 'images/apartments/b3_living_1.webp',
      floorplan: 'images/units/fp_3pn_b3_88_8m2.webp',
      specs: [
        ['Diện tích thông thủy', '88,8 m² (Tim tường: 95,0 m²)'],
        ['Cấu trúc công năng', '03 Phòng ngủ góc Panorama • 02 WC • 02 Logia'],
        ['Điểm nhấn thiết kế', 'Tầm nhìn kép Đại lộ Mê Linh & Hồ Bàu Tràm'],
        ['Chính sách ưu đãi', 'Tặng 02 Chỉ Vàng • Chiết khấu thêm 1% khách mua sỉ']
      ],
      gallery: [
        'images/units/fp_3pn_b3_88_8m2.webp',
        'images/apartments/b3_living_1.webp',
        'images/apartments/b3_living_2.webp',
        'images/apartments/b3_dining_1.webp',
        'images/apartments/b3_kitchen.webp',
        'images/apartments/b3_master_1.webp',
        'images/apartments/b3_bed2_1.webp',
        'images/apartments/b3_bed3_1.webp'
      ]
    },
    shophouse: {
      code: 'KHỐI ĐẾ THƯƠNG MẠI • TẦNG 01–02 • 26 CĂN',
      title: 'Shophouse Khối Đế Đại Lộ Mê Linh (26 Căn Giới Hạn)',
      desc: 'Tọa lạc tại mặt tiền Đại lộ Mê Linh và quảng trường nội khu, đón trọn nguồn khách từ hơn 679 hộ gia đình tại dự án cùng cư dân toàn khu đô thị sinh thái Tây Bắc Đà Nẵng.',
      video: 'videos/melinh_aerial_complex.mp4',
      poster: 'images/architecture/melinh_boulevard_shophouse.webp',
      floorplan: 'images/masterplan/ground_fl_amenities.webp',
      specs: [
        ['Số lượng giới hạn', '26 Căn Shophouse khối đế (Tầng 1 – Tầng 2)'],
        ['Vị trí khai thác', 'Mặt tiền Đại lộ Mê Linh & Quảng trường sự kiện'],
        ['Công năng gợi ý', 'Café, nhà hàng, siêu thị tiện lợi, showroom, văn phòng'],
        ['Pháp lý & Bàn giao', 'Bàn giao Tháng 05/2027 • Sổ hồng theo quy định']
      ],
      gallery: [
        'images/architecture/melinh_boulevard_shophouse.webp',
        'images/architecture/ostia_arch_shophouse.webp',
        'images/masterplan/ground_fl_amenities.webp',
        'images/masterplan/typical_fl_01_clean.webp'
      ]
    },
    penthouse: {
      code: 'DINH THỰ TRÊN KHÔNG • TẦNG 16–17 • 06 CĂN ĐỘC BẢN',
      title: 'Penthouse Sân Vườn Chân Mây (06 Căn Độc Bản)',
      desc: 'Chỉ 06 chủ nhân danh giá sở hữu không gian sống đỉnh cao tại tầng 16–17, kết nối trực tiếp hệ thống 04 khu vườn chân mây và tầm nhìn 360 độ hướng Vịnh biển Đà Nẵng – Hồ Bàu Tràm.',
      video: 'videos/amenities_4_sky_gardens.mp4',
      poster: 'images/amenities/rooftop_sky_garden.webp',
      floorplan: 'images/masterplan/typical_fl_17_clean.webp',
      specs: [
        ['Số lượng độc bản', 'Chỉ 06 Căn Penthouse toàn dự án (Tầng 16–17)'],
        ['Đặc quyền không gian', 'Sân vườn riêng kết nối 04 tầng vườn chân mây'],
        ['Tầm nhìn độc tôn', '360° Vịnh Đà Nẵng • Hồ Bàu Tràm • Núi Hải Vân'],
        ['Tư vấn riêng biệt', 'Làm việc trực tiếp phòng Kinh doanh Chủ đầu tư']
      ],
      gallery: [
        'images/amenities/rooftop_sky_garden.webp',
        'images/masterplan/typical_fl_16_clean.webp',
        'images/masterplan/typical_fl_17_clean.webp',
        'images/masterplan/rooftop_fl_amenities.webp'
      ]
    }
  };

  let currentUnitKey = 'a1';
  let currentStudioMode = 'video'; // 'video' | 'floorplan' | 'gallery'

  /* ==========================================================================
     3. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initLocationSwitcher();
    initStudioController();
    initModalsAndLightbox();
    initLeadForms();
  });

  /* Header Scroll & Mobile Menu */
  function initHeaderScroll() {
    const header = document.getElementById('v3-header');
    const toggle = document.getElementById('v3-mobile-toggle');
    const nav = document.getElementById('v3-nav');

    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }, { passive: true });
    }

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('is-open');
      });
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('is-open');
        });
      });
    }
  }

  /* Location Segmented Switcher */
  function initLocationSwitcher() {
    const tabs = document.querySelectorAll('[data-loc-tab]');
    const videoEl = document.getElementById('v3-loc-video');
    const titleEl = document.getElementById('v3-loc-caption-title');
    const descEl = document.getElementById('v3-loc-caption-desc');
    const zoomBtn = document.getElementById('v3-loc-zoom-btn');

    if (!tabs.length || !videoEl) return;

    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-loc-tab');
        const data = LOCATION_VIEWS[key];
        if (!data) return;

        tabs.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const nextSrc = assetUrl(data.video);
        if (videoEl.getAttribute('src') !== nextSrc) {
          videoEl.setAttribute('src', nextSrc);
          videoEl.setAttribute('poster', assetUrl(data.poster));
          videoEl.load();
          videoEl.play().catch(function () {});
        }

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (zoomBtn) {
          zoomBtn.setAttribute('data-lightbox-src', assetUrl(data.fullImg));
          zoomBtn.setAttribute('data-lightbox-caption', data.title);
        }
      });
    });
  }

  /* Apartment Studio Controller */
  function initStudioController() {
    const unitBtns = document.querySelectorAll('[data-unit-key]');
    const modeBtns = document.querySelectorAll('[data-studio-mode]');

    unitBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-unit-key');
        if (!STUDIO_UNITS[key]) return;
        currentUnitKey = key;
        unitBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        // Default to video mode when switching unit so user immediately sees the CapCut multi-shot clip
        currentStudioMode = 'video';
        modeBtns.forEach(function (m) {
          m.classList.toggle('active', m.getAttribute('data-studio-mode') === 'video');
        });
        renderStudioUnit();
      });
    });

    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const mode = btn.getAttribute('data-studio-mode');
        currentStudioMode = mode;
        modeBtns.forEach(function (m) { m.classList.remove('active'); });
        btn.classList.add('active');
        renderStudioStageOnly();
      });
    });

    renderStudioUnit();
  }

  function renderStudioUnit() {
    const unit = STUDIO_UNITS[currentUnitKey];
    if (!unit) return;

    const codeEl = document.getElementById('v3-unit-code');
    const titleEl = document.getElementById('v3-unit-title');
    const descEl = document.getElementById('v3-unit-desc');
    const specTableEl = document.getElementById('v3-unit-specs');
    const fpBtn = document.getElementById('v3-unit-fp-btn');
    const thumbsEl = document.getElementById('v3-studio-thumbs');

    if (codeEl) codeEl.textContent = unit.code;
    if (titleEl) titleEl.textContent = unit.title;
    if (descEl) descEl.textContent = unit.desc;

    if (specTableEl) {
      specTableEl.innerHTML = unit.specs.map(function (row) {
        return '<div class="v3-spec-row">' +
          '<span class="v3-spec-lbl">' + row[0] + '</span>' +
          '<span class="v3-spec-val">' + row[1] + '</span>' +
          '</div>';
      }).join('');
    }

    if (fpBtn) {
      fpBtn.setAttribute('data-lightbox-src', assetUrl(unit.floorplan));
      fpBtn.setAttribute('data-lightbox-caption', unit.title + ' — Mặt Bằng Bóc Tách 3D');
    }

    if (thumbsEl) {
      thumbsEl.innerHTML = unit.gallery.map(function (imgPath, idx) {
        const fullUrl = assetUrl(imgPath);
        return '<button type="button" class="v3-studio-thumb' + (idx === 0 ? ' active' : '') + '" data-thumb-src="' + fullUrl + '" data-thumb-is-fp="' + (idx === 0 ? '1' : '0') + '">' +
          '<img src="' + fullUrl + '" alt="' + unit.title + '" loading="lazy">' +
          '</button>';
      }).join('');

      thumbsEl.querySelectorAll('.v3-studio-thumb').forEach(function (tBtn) {
        tBtn.addEventListener('click', function () {
          thumbsEl.querySelectorAll('.v3-studio-thumb').forEach(function (b) { b.classList.remove('active'); });
          tBtn.classList.add('active');
          const imgSrc = tBtn.getAttribute('data-thumb-src');
          const isFp = tBtn.getAttribute('data-thumb-is-fp') === '1';
          showStaticImageInStage(imgSrc, isFp, unit.title);
          const modeBtns = document.querySelectorAll('[data-studio-mode]');
          modeBtns.forEach(function (m) {
            m.classList.toggle('active', m.getAttribute('data-studio-mode') === (isFp ? 'floorplan' : 'gallery'));
          });
        });
      });
    }

    renderStudioStageOnly();
  }

  function renderStudioStageOnly() {
    const unit = STUDIO_UNITS[currentUnitKey];
    const stageEl = document.getElementById('v3-studio-stage');
    if (!unit || !stageEl) return;

    if (currentStudioMode === 'video') {
      const vUrl = assetUrl(unit.video);
      const pUrl = assetUrl(unit.poster);
      stageEl.innerHTML = '<video src="' + vUrl + '" poster="' + pUrl + '" autoplay muted loop playsinline controls></video>';
      const vid = stageEl.querySelector('video');
      if (vid) {
        vid.play().catch(function () {});
      }
    } else if (currentStudioMode === 'floorplan') {
      showStaticImageInStage(assetUrl(unit.floorplan), true, unit.title + ' — Mặt Bằng 3D');
    } else {
      const firstRender = unit.gallery.length > 1 ? unit.gallery[1] : unit.poster;
      showStaticImageInStage(assetUrl(firstRender), false, unit.title + ' — Phối Cảnh Nội Thất');
    }
  }

  function showStaticImageInStage(src, isFloorplan, caption) {
    const stageEl = document.getElementById('v3-studio-stage');
    if (!stageEl) return;
    stageEl.innerHTML = '<img src="' + src + '" alt="' + caption + '" class="' + (isFloorplan ? 'is-floorplan' : '') + '" style="cursor: zoom-in;" data-lightbox-src="' + src + '" data-lightbox-caption="' + caption + '">';
  }

  /* ==========================================================================
     4. MODALS & HIGH-RES LIGHTBOX CONTROLLER
     ========================================================================== */
  function initModalsAndLightbox() {
    const quoteModal = document.getElementById('v3-quote-modal');
    const lightboxModal = document.getElementById('v3-lightbox-modal');
    const lightboxImg = document.getElementById('v3-lightbox-img');
    const lightboxCap = document.getElementById('v3-lightbox-caption');
    const modelModal = document.getElementById('v3-model-modal');
    const modelContainer = document.getElementById('v3-model-container');

    // Delegate clicks for opening modals
    document.addEventListener('click', function (e) {
      const quoteTrigger = e.target.closest('[data-open-quote]');
      if (quoteTrigger && quoteModal) {
        e.preventDefault();
        quoteModal.classList.add('is-open');
        return;
      }

      const lbTrigger = e.target.closest('[data-lightbox-src]');
      if (lbTrigger && lightboxModal && lightboxImg) {
        e.preventDefault();
        const src = assetUrl(lbTrigger.getAttribute('data-lightbox-src'));
        const cap = lbTrigger.getAttribute('data-lightbox-caption') || '';
        lightboxImg.setAttribute('src', src);
        if (lightboxCap) lightboxCap.textContent = cap;
        lightboxModal.classList.add('is-open');
        return;
      }

      const modelTrigger = e.target.closest('[data-open-3d-model]');
      if (modelTrigger && modelModal && modelContainer) {
        e.preventDefault();
        modelModal.classList.add('is-open');
        if (!modelContainer.querySelector('model-viewer')) {
          const glbUrl = assetUrl('models/building.glb');
          modelContainer.innerHTML = '<model-viewer src="' + glbUrl + '" camera-controls auto-rotate shadow-intensity="1" style="width:100%;height:72vh;background:#0b291e;border-radius:12px;"></model-viewer>';
        }
        return;
      }

      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn) {
        const backdrop = closeBtn.closest('.v3-modal-backdrop');
        if (backdrop) backdrop.classList.remove('is-open');
        return;
      }

      if (e.target.classList && e.target.classList.contains('v3-modal-backdrop')) {
        e.target.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.v3-modal-backdrop.is-open').forEach(function (m) {
          m.classList.remove('is-open');
        });
      }
    });
  }

  /* ==========================================================================
     5. LEAD CAPTURE FORMS (WORDPRESS AJAX + FALLBACK)
     ========================================================================== */
  function initLeadForms() {
    document.querySelectorAll('.v3-lead-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn ? btn.textContent : '';
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Đang gửi thông tin...';
        }

        const formData = new FormData(form);
        formData.append('action', 'ecolife_submit_lead');

        const ajaxUrl = (typeof window.ECOLIFE_AJAX_URL !== 'undefined' && window.ECOLIFE_AJAX_URL)
          ? window.ECOLIFE_AJAX_URL
          : '/wp-admin/admin-ajax.php';

        fetch(ajaxUrl, {
          method: 'POST',
          body: formData
        }).catch(function () {}).finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Đã gửi thành công! Chúng tôi sẽ liên hệ ngay';
            setTimeout(function () {
              btn.textContent = origText;
              form.reset();
              document.querySelectorAll('.v3-modal-backdrop.is-open').forEach(function (m) {
                m.classList.remove('is-open');
              });
            }, 2500);
          }
        });
      });
    });
  }
})();
