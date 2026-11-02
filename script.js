/**
 * ECOLIFE SIGNATURE — V4 FULL-SCREEN SCROLL STORY & INTERACTIVE CINEMA CONTROLLER
 * Rule: Zero small text clutter on main canvas; Main Highlight + 1-Line Tagline + Basic Spec Drawer
 */

(function () {
  'use strict';

  const TPL_URI = (typeof window.ECOLIFE_THEME_URI !== 'undefined' && window.ECOLIFE_THEME_URI)
    ? window.ECOLIFE_THEME_URI.replace(/\/$/, '')
    : '.';

  function assetUrl(relPath) {
    if (!relPath) return '';
    if (/^(https?:)?\/\//i.test(relPath) || relPath.startsWith('data:')) return relPath;
    return `${TPL_URI}/${relPath.replace(/^\.?\//, '')}`;
  }

  /* ==========================================================================
     1. BASIC SPECIFICATION TABLES (OPENED ON DEMAND VIA "MỞ BẢNG BASIC")
     ========================================================================== */
  const BASIC_TABLES = {
    overview: {
      title: 'Bảng Thông Số Tổng Quan Dự Án',
      sub: 'EcoLife Signature Đà Nẵng • Capital House Group',
      rows: [
        ['Tên thương mại', 'EcoLife Signature Đà Nẵng'],
        ['Chủ đầu tư phát triển', 'Tập đoàn Capital House'],
        ['Vị trí dự án', 'Mặt tiền Đại lộ Mê Linh, KĐT Golden Hills, Liên Chiểu, Đà Nẵng'],
        ['Quy mô khối tháp', '03 Tòa tháp giật cấp (17 tầng nổi & 01 tầng hầm thông đế)'],
        ['Tổng sản phẩm', '679 Căn hộ cao cấp • 26 Shophouse khối đế • 06 Penthouse'],
        ['Hệ thống tiện ích', '23+ Tiện ích nội khu • 04 Hệ không gian • 04 Tầng vườn chân mây'],
        ['Chứng nhận công trình xanh', 'EDGE Quốc tế (IFC – World Bank Group): -24% Điện, -30% Nước'],
        ['Thời điểm bàn giao dự kiến', 'Tháng 05/2027 (Nhận Sổ hồng dự kiến Tháng 11/2027)'],
        ['Hình thức sở hữu', 'Sổ hồng lâu dài (Người Việt Nam)']
      ]
    },
    location: {
      title: 'Bảng Khoảng Cách Kết Nối Thực Tế',
      sub: 'Tâm điểm Đại lộ Mê Linh — Tây Bắc Đà Nẵng',
      rows: [
        ['Bãi biển Xuân Thiều & Công viên Hồ Bàu Tràm', '02 Phút di chuyển'],
        ['Siêu cảng Quốc tế Liên Chiểu & Khu Thương mại Tự do FTZ', '05 Phút di chuyển'],
        ['Khu Công nghệ cao Đà Nẵng & Khu CN Liên Chiểu', '07 Phút di chuyển'],
        ['Hệ thống Đại học Bách Khoa, Sư Phạm & Bệnh viện tuyến đầu', '10 Phút di chuyển'],
        ['Sân bay Quốc tế Đà Nẵng & Trung tâm Hành chính Thành phố', '15 Phút di chuyển']
      ]
    },
    amenities: {
      title: 'Bảng Danh Mục 23+ Tiện Ích Chuẩn Sống Xanh',
      sub: 'Quy hoạch 04 Hệ không gian từ Tầng 1 lên Tầng Thượng',
      rows: [
        ['01. Hệ Sinh Khí (Vitality Hub)', 'Hồ bơi vô cực 365m², Hồ bơi trẻ em, Bể sục Jacuzzi, Hồ cá Koi, Đường chạy bộ'],
        ['02. Hệ Cộng Đồng (Community)', 'Quảng trường sự kiện, Sân Pickleball, Vườn nướng BBQ, Phố Shophouse Tầng 1–2'],
        ['03. Hệ Thân Tâm Trí (Mindfulness)', 'Sàn tập Yoga bình minh, Vườn dưỡng sinh, Vườn cờ, Đồi vọng cảnh Vịnh biển'],
        ['04. Hệ Sinh Thái Học Tập (Eco-Edu)', 'Trường mầm non nội khu, Khu vui chơi trẻ em liên hoàn, Vườn thực vật giáo dục'],
        ['Kiến trúc cảnh quan đặc biệt', 'Vườn trung tâm Atrio, Cổng vòm Ostia, 04 Tầng vườn chân mây liên hoàn']
      ]
    },
    edge: {
      title: 'Bảng Tiêu Chuẩn Công Trình Xanh Quốc Tế EDGE',
      sub: 'Bảo chứng bởi IFC — Thành viên Nhóm Ngân hàng Thế giới (World Bank Group)',
      rows: [
        ['Tiết kiệm năng lượng điện', 'Giảm 24% điện năng tiêu thụ hàng tháng'],
        ['Tiết kiệm tài nguyên nước', 'Giảm 30% lượng nước sinh hoạt'],
        ['Năng lượng hàm chứa vật liệu', 'Giảm 30% phát thải từ vật liệu xây dựng'],
        ['Hệ kính mặt dựng', 'Kính hộp cản nhiệt Solar Control ngăn tia UV & giảm tải điều hòa'],
        ['Giải pháp cảnh quan nước', 'Giải pháp tuần hoàn nước tự nhiên (Phương pháp bọt biển) lọc nước mưa tưới cây'],
        ['Thông gió & Chiếu sáng', 'Cổng vòm Ostia & Lõi thông tầng Vườn Atrio đối lưu khí tươi tự nhiên']
      ]
    },
    payment: {
      title: 'Bảng Chính Sách Sở Hữu & Tiến Độ Thanh Toán 05 Đợt',
      sub: 'Áp dụng chính thức từ Chủ đầu tư Capital House',
      rows: [
        ['Đặt cọc giữ chỗ', '50.000.000 VNĐ / căn'],
        ['Phương án 1: Thanh toán sớm 95%', 'Chiết khấu trực tiếp 10% (Căn 2PN 66m² từ 2,60 Tỷ)'],
        ['Phương án 2: Thanh toán chuẩn 05 đợt', 'Chiết khấu trực tiếp 6% (Căn 2PN 66m² từ 2,74 Tỷ)'],
        ['Phương án 3: Vay ngân hàng 70%', 'Hỗ trợ lãi suất 0% & Ân hạn nợ gốc 18 tháng (Vốn tự có ~780 Triệu)'],
        ['Tiến độ 5 đợt chuẩn', 'Đợt 1 (30% HĐMB) • Đợt 2 (20%) • Đợt 3 (20%) • Đợt 4 (25% Bàn giao 05/2027) • Đợt 5 (5% Sổ hồng 11/2027)'],
        ['Quà tặng Vàng Lộc Phát', 'Tặng 01 Chỉ Vàng (Căn 2PN) • Tặng 02 Chỉ Vàng (Căn 2PN+ & 3PN)'],
        ['Chiết khấu khách sỉ / địa phương', 'Cộng thêm +1% cho khách mua từ 02 căn hoặc hộ khẩu Đà Nẵng – Huế'],
        ['05 Ngân hàng bảo lãnh & tài trợ', 'VietinBank • BIDV • Vietcombank • MB Bank • VPBank']
      ]
    }
  };

  /* ==========================================================================
     2. 08 PRODUCT LINES (DUAL-STAGE: CAPCUT VIDEO + 3D FLOORPLAN WITH M2)
     ========================================================================== */
  const UNITS = {
    a1: {
      headline: 'Căn Hộ Mẫu A1 — 66,0 m² (2 Phòng Ngủ Chuẩn)',
      tagline: '02 Phòng ngủ • 02 WC • Bếp tách biệt nối thẳng logia • Giá từ 2,60 Tỷ',
      video: 'videos/units/walkthrough_a1.mp4',
      poster: 'images/apartments/a1_living_1.webp',
      floorplan: 'images/units/fp_2pn_a1_66m2.webp',
      rows: [
        ['Mã căn hộ', 'CH-A1 (Tầng 03–17 • Tổng 196 căn)'],
        ['Diện tích thông thủy', '66,0 m² (Tim tường: 70,5 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ • 02 WC • 02 Logia'],
        ['Ngôn ngữ nội thất', 'Tủ kịch trần phẳng phiu & đường bo cong mềm mại xử lý mọi góc cạnh'],
        ['Điểm nhấn bố cục', 'Bếp chữ L tách biệt kết nối trực tiếp logia phụ ngăn mùi tuyệt đối'],
        ['Giá tham chiếu & Ưu đãi', 'Từ 2,60 Tỷ (TT sớm 95%) • Tặng 01 Chỉ Vàng']
      ],
      gallery: [
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
      headline: 'Căn Hộ Mẫu A2 — 68,9 m² (2 Phòng Ngủ Gia Đình)',
      tagline: '02 Phòng ngủ • 02 WC • Phòng ngủ phụ giường tầng đôi • Giá từ 2,72 Tỷ',
      video: 'videos/units/walkthrough_a2.mp4',
      poster: 'images/apartments/a2_living_1.webp',
      floorplan: 'images/units/fp_2pn_a2_68_9m2.webp',
      rows: [
        ['Mã căn hộ', 'CH-A2 (Tầng 03–17 • Tổng 290 căn chủ đạo)'],
        ['Diện tích thông thủy', '68,9 m² (Tim tường: 73,6 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ • 02 WC • 02 Logia'],
        ['Ngôn ngữ nội thất', 'Tủ kịch trần phẳng phiu & đường bo cong mềm mại an toàn cho trẻ nhỏ'],
        ['Điểm nhấn bố cục', 'Phòng ngủ trẻ em thiết kế giường tầng đôi kết hợp bàn học đôi thông minh'],
        ['Giá tham chiếu & Ưu đãi', 'Từ 2,72 Tỷ (TT sớm 95%) • Tặng 01 Chỉ Vàng']
      ],
      gallery: [
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
      headline: 'Căn Góc B1 — 77,8 m² (2 Phòng Ngủ Góc 2 Mặt Thoáng)',
      tagline: 'Vị trí căn góc 2 mặt thoáng • Bếp đảo hiện đại • 100% phòng đón gió biển',
      video: 'videos/units/walkthrough_b1.mp4',
      poster: 'images/apartments/b1_living_1.webp',
      floorplan: 'images/units/fp_2pn_b1_77_8m2.webp',
      rows: [
        ['Mã căn hộ', 'CH-B1 (Tầng 03–16 • Tổng 76 căn góc)'],
        ['Diện tích thông thủy', '77,8 m² (Tim tường: 83,2 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ góc • 02 WC • Bàn đảo bếp'],
        ['Ngôn ngữ nội thất', 'Tủ kịch trần phẳng phiu & đường bo cong mềm mại xử lý góc cạnh'],
        ['Điểm nhấn bố cục', 'Sở hữu 2 mặt thoáng đón trọn ánh sáng tự nhiên vào mọi phòng'],
        ['Ưu đãi giao dịch', 'Tặng 01 Chỉ Vàng • Hỗ trợ lãi suất 0% / 18 tháng']
      ],
      gallery: [
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
      headline: 'Căn Hộ Mẫu B2 — 87,3 m² (2PN+ Đa Năng Linh Hoạt)',
      tagline: '02 Phòng ngủ lớn + 01 Không gian đa năng (+1) • Giới hạn 13 căn toàn dự án',
      video: 'videos/units/walkthrough_b2.mp4',
      poster: 'images/apartments/b2_living_1.webp',
      floorplan: 'images/units/fp_3pn_b2_87_3m2.webp',
      rows: [
        ['Mã căn hộ', 'CH-B2 (Tầng 03–15 • Phiên bản giới hạn 13 căn)'],
        ['Diện tích thông thủy', '87,3 m² (Tim tường: 93,4 m²)'],
        ['Cấu trúc công năng', '02 Phòng ngủ lớn + 01 Phòng đa năng (+1) • 02 WC'],
        ['Ngôn ngữ nội thất', 'Tủ kịch trần phẳng phiu & đường bo cong mềm mại sang trọng'],
        ['Điểm nhấn bố cục', 'Không gian +1 dễ dàng tùy biến thành phòng làm việc hoặc phòng ngủ thứ 3'],
        ['Ưu đãi giao dịch', 'Tặng 02 Chỉ Vàng • Chiết khấu thanh toán sớm 10%']
      ],
      gallery: [
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
      headline: 'Căn Hộ Mẫu B6 — 87,1 m² (3 Phòng Ngủ • 3 WC Riêng Tư)',
      tagline: '03 Phòng ngủ • 03 Phòng vệ sinh độc lập • Chuẩn gia đình đa thế hệ',
      video: 'videos/units/walkthrough_b6.mp4',
      poster: 'images/apartments/b6_living_1.webp',
      floorplan: 'images/units/fp_3pn_b6_87_1m2.webp',
      rows: [
        ['Mã căn hộ', 'CH-B6 (Tầng 03–17 • Tổng 55 căn)'],
        ['Diện tích thông thủy', '87,1 m² (Tim tường: 93,1 m²)'],
        ['Cấu trúc công năng', '03 Phòng ngủ • 03 WC khép kín • 02 Logia'],
        ['Ngôn ngữ nội thất', 'Tủ kịch trần phẳng phiu & đường bo cong mềm mại cho gia đình 3 thế hệ'],
        ['Điểm nhấn bố cục', '02 Phòng ngủ Master có WC riêng đảm bảo sự riêng tư tuyệt đối'],
        ['Ưu đãi giao dịch', 'Tặng 02 Chỉ Vàng • Hỗ trợ lãi suất 0% / 18 tháng']
      ],
      gallery: [
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
      headline: 'Căn Góc Hoa Hậu B3 — 88,8 m² (3 Phòng Ngủ Panorama)',
      tagline: 'Tầm nhìn góc Panorama Đại lộ Mê Linh & Hồ Bàu Tràm • Giới hạn 13 căn',
      video: 'videos/units/walkthrough_b3.mp4',
      poster: 'images/apartments/b3_living_1.webp',
      floorplan: 'images/units/fp_3pn_b3_88_8m2.webp',
      rows: [
        ['Mã căn hộ', 'CH-B3 (Tầng 03–15 • 13 Căn góc Hoa hậu)'],
        ['Diện tích thông thủy', '88,8 m² (Tim tường: 95,0 m²)'],
        ['Cấu trúc công năng', '03 Phòng ngủ góc Panorama • 02 WC • 02 Logia'],
        ['Ngôn ngữ nội thất', 'Tủ kịch trần phẳng phiu & các góc bo cong tinh xảo'],
        ['Điểm nhấn bố cục', 'Phòng khách bề thế với bàn ăn 6 ghế và tầm nhìn kép Hồ – Biển'],
        ['Ưu đãi giao dịch', 'Tặng 02 Chỉ Vàng • Chiết khấu thêm +1% khách mua sỉ']
      ],
      gallery: [
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
      headline: '26 Shophouse Khối Đế Đại Lộ Mê Linh',
      tagline: 'Tầng 01–02 mặt tiền Đại lộ Mê Linh • Đón trọn nguồn khách 679 hộ cư dân',
      video: 'videos/melinh_aerial_complex.mp4',
      poster: 'images/architecture/melinh_boulevard_shophouse.webp',
      floorplan: 'images/masterplan/ground_fl_amenities.webp',
      rows: [
        ['Loại hình sản phẩm', 'Shophouse thương mại khối đế (Tầng 01 – Tầng 02)'],
        ['Số lượng giới hạn', '26 Căn toàn dự án'],
        ['Vị trí khai thác', 'Mặt tiền Đại lộ Mê Linh & Quảng trường nội khu'],
        ['Tiềm năng kinh doanh', 'Café, nhà hàng, siêu thị, showroom, văn phòng đại diện']
      ],
      gallery: [
        'images/architecture/melinh_boulevard_shophouse.webp',
        'images/architecture/ostia_arch_shophouse.webp',
        'images/masterplan/ground_fl_amenities.webp'
      ]
    },
    penthouse: {
      headline: '06 Penthouse Sân Vườn Chân Mây (Tầng 16–17)',
      tagline: 'Dinh thự trên không kết nối trực tiếp 04 tầng vườn chân mây • Tầm nhìn 360°',
      video: 'videos/amenities_4_sky_gardens.mp4',
      poster: 'images/amenities/rooftop_sky_garden.webp',
      floorplan: 'images/masterplan/typical_fl_17_clean.webp',
      rows: [
        ['Loại hình sản phẩm', 'Penthouse sân vườn trên không (Tầng 16 – Tầng 17)'],
        ['Số lượng độc bản', 'Chỉ 06 Căn toàn dự án'],
        ['Đặc quyền không gian', 'Sân vườn riêng kết nối 04 khu vườn chân mây liên hoàn'],
        ['Tầm nhìn', '360° Vịnh Đà Nẵng • Hồ Bàu Tràm • Đèo Hải Vân']
      ],
      gallery: [
        'images/amenities/rooftop_sky_garden.webp',
        'images/masterplan/typical_fl_16_clean.webp',
        'images/masterplan/typical_fl_17_clean.webp'
      ]
    }
  };

  let activeUnitKey = 'a1';

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSpineObserver();
    initHeroCameraSwitcher();
    initLocationNodes();
    initShowroom();
    initModals();
    initLeadForms();
  });

  function initMobileMenu() {
    const btn = document.getElementById('v4-mobile-btn');
    const nav = document.getElementById('v4-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
      });
    });
  }

  function initSpineObserver() {
    const stages = document.querySelectorAll('.v4-stage[id]');
    const dots = document.querySelectorAll('.v4-spine-dot');
    const navLinks = document.querySelectorAll('.v4-nav-link[href^="#"]');
    if (!stages.length || !('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          dots.forEach(function (d) {
            d.classList.toggle('active', d.getAttribute('href') === '#' + id);
          });
          navLinks.forEach(function (n) {
            n.classList.toggle('active', n.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.45 });

    stages.forEach(function (s) { obs.observe(s); });
  }

  function initHeroCameraSwitcher() {
    const camBtns = document.querySelectorAll('[data-hero-video]');
    const heroVideo = document.getElementById('v4-hero-video');
    if (!camBtns.length || !heroVideo) return;

    camBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        camBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const nextSrc = assetUrl(btn.getAttribute('data-hero-video'));
        if (heroVideo.getAttribute('src') !== nextSrc) {
          heroVideo.setAttribute('src', nextSrc);
          heroVideo.load();
          heroVideo.play().catch(function () {});
        }
      });
    });
  }

  function initLocationNodes() {
    const nodes = document.querySelectorAll('[data-loc-video]');
    const locVideo = document.getElementById('v4-loc-video');
    const locLabel = document.getElementById('v4-loc-screen-label');
    if (!nodes.length || !locVideo) return;

    nodes.forEach(function (node) {
      node.addEventListener('click', function () {
        nodes.forEach(function (n) { n.classList.remove('active'); });
        node.classList.add('active');
        const vSrc = assetUrl(node.getAttribute('data-loc-video'));
        const lbl = node.getAttribute('data-loc-label') || '';
        if (locVideo.getAttribute('src') !== vSrc) {
          locVideo.setAttribute('src', vSrc);
          locVideo.load();
          locVideo.play().catch(function () {});
        }
        if (locLabel) locLabel.textContent = lbl;
      });
    });
  }

  function initShowroom() {
    const tabs = document.querySelectorAll('[data-unit-tab]');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const key = tab.getAttribute('data-unit-tab');
        if (!UNITS[key]) return;
        activeUnitKey = key;
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        renderActiveUnit();
      });
    });

    renderActiveUnit();
  }

  function renderActiveUnit() {
    const u = UNITS[activeUnitKey];
    if (!u) return;

    const stageEl = document.getElementById('v4-unit-video-stage');
    const thumbsEl = document.getElementById('v4-unit-thumbs');
    const fpImgEl = document.getElementById('v4-unit-fp-img');
    const fpWrapEl = document.getElementById('v4-unit-fp-wrap');
    const headlineEl = document.getElementById('v4-unit-headline');
    const taglineEl = document.getElementById('v4-unit-tagline');
    const playVideoBtn = document.getElementById('v4-play-unit-video');

    if (stageEl) {
      const vUrl = assetUrl(u.video);
      const pUrl = assetUrl(u.poster);
      stageEl.innerHTML = '<video src="' + vUrl + '" poster="' + pUrl + '" autoplay muted loop playsinline controls></video>';
      const vid = stageEl.querySelector('video');
      if (vid) vid.play().catch(function () {});
    }

    if (playVideoBtn) {
      playVideoBtn.onclick = function () {
        renderActiveUnit();
      };
    }

    if (fpImgEl) {
      fpImgEl.setAttribute('src', assetUrl(u.floorplan));
      fpImgEl.setAttribute('alt', u.headline);
    }

    if (fpWrapEl) {
      fpWrapEl.setAttribute('data-lightbox-src', assetUrl(u.floorplan));
      fpWrapEl.setAttribute('data-lightbox-caption', u.headline + ' — Mặt Bằng 3D Bóc Tách');
    }

    if (headlineEl) headlineEl.textContent = u.headline;
    if (taglineEl) taglineEl.textContent = u.tagline;

    if (thumbsEl) {
      thumbsEl.innerHTML = u.gallery.map(function (imgRel, idx) {
        const full = assetUrl(imgRel);
        return '<button type="button" class="v4-thumb-btn' + (idx === 0 ? ' active' : '') + '" data-room-img="' + full + '">' +
          '<img src="' + full + '" alt="' + u.headline + '" loading="lazy">' +
          '</button>';
      }).join('');

      thumbsEl.querySelectorAll('.v4-thumb-btn').forEach(function (tBtn) {
        tBtn.addEventListener('click', function () {
          thumbsEl.querySelectorAll('.v4-thumb-btn').forEach(function (b) { b.classList.remove('active'); });
          tBtn.classList.add('active');
          const imgUrl = tBtn.getAttribute('data-room-img');
          if (stageEl) {
            stageEl.innerHTML = '<img src="' + imgUrl + '" alt="' + u.headline + '" style="cursor:zoom-in;" data-lightbox-src="' + imgUrl + '" data-lightbox-caption="' + u.headline + '">';
          }
        });
      });
    }
  }

  function initModals() {
    const basicModal = document.getElementById('v4-basic-modal');
    const basicTitle = document.getElementById('v4-basic-title');
    const basicSub = document.getElementById('v4-basic-sub');
    const basicBody = document.getElementById('v4-basic-tbody');

    const quoteModal = document.getElementById('v4-quote-modal');
    const lbModal = document.getElementById('v4-lightbox-modal');
    const lbImg = document.getElementById('v4-lightbox-img');
    const lbCap = document.getElementById('v4-lightbox-cap');
    const modelModal = document.getElementById('v4-model-modal');
    const modelWrap = document.getElementById('v4-model-wrap');

    document.addEventListener('click', function (e) {
      // 1. Open Basic Specification Table Modal
      const basicTrigger = e.target.closest('[data-basic-table]');
      if (basicTrigger && basicModal && basicBody) {
        e.preventDefault();
        const key = basicTrigger.getAttribute('data-basic-table');
        let tableData = null;
        if (key === 'current-unit') {
          const u = UNITS[activeUnitKey];
          if (u) {
            tableData = {
              title: u.headline,
              sub: u.tagline,
              rows: u.rows
            };
          }
        } else {
          tableData = BASIC_TABLES[key];
        }
        if (tableData) {
          if (basicTitle) basicTitle.textContent = tableData.title;
          if (basicSub) basicSub.textContent = tableData.sub;
          basicBody.innerHTML = tableData.rows.map(function (r) {
            return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>';
          }).join('');
          basicModal.classList.add('is-open');
        }
        return;
      }

      // 2. Open Quote Modal
      const qTrigger = e.target.closest('[data-open-quote]');
      if (qTrigger && quoteModal) {
        e.preventDefault();
        quoteModal.classList.add('is-open');
        return;
      }

      // 3. Open Lightbox
      const lbTrigger = e.target.closest('[data-lightbox-src]');
      if (lbTrigger && lbModal && lbImg) {
        e.preventDefault();
        lbImg.setAttribute('src', assetUrl(lbTrigger.getAttribute('data-lightbox-src')));
        if (lbCap) lbCap.textContent = lbTrigger.getAttribute('data-lightbox-caption') || '';
        lbModal.classList.add('is-open');
        return;
      }

      // 4. Open 3D GLB Model
      const mTrigger = e.target.closest('[data-open-3d-model]');
      if (mTrigger && modelModal && modelWrap) {
        e.preventDefault();
        modelModal.classList.add('is-open');
        if (!modelWrap.querySelector('model-viewer')) {
          const glb = assetUrl('models/building.glb');
          modelWrap.innerHTML = '<model-viewer src="' + glb + '" camera-controls auto-rotate shadow-intensity="1" style="width:100%;height:72vh;background:#071d15;border-radius:14px;"></model-viewer>';
        }
        return;
      }

      // 5. Close Modal
      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn) {
        const bd = closeBtn.closest('.v4-modal-backdrop');
        if (bd) bd.classList.remove('is-open');
        return;
      }

      if (e.target.classList && e.target.classList.contains('v4-modal-backdrop')) {
        e.target.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.v4-modal-backdrop.is-open').forEach(function (m) {
          m.classList.remove('is-open');
        });
      }
    });
  }

  function initLeadForms() {
    document.querySelectorAll('.v4-lead-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const oldTxt = btn ? btn.textContent : '';
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Đang gửi...';
        }
        const fd = new FormData(form);
        fd.append('action', 'ecolife_submit_lead');
        const ajaxUrl = (typeof window.ECOLIFE_AJAX_URL !== 'undefined' && window.ECOLIFE_AJAX_URL)
          ? window.ECOLIFE_AJAX_URL
          : '/wp-admin/admin-ajax.php';

        fetch(ajaxUrl, { method: 'POST', body: fd })
          .catch(function () {})
          .finally(function () {
            if (btn) {
              btn.disabled = false;
              btn.textContent = 'Đã gửi thành công!';
              setTimeout(function () {
                btn.textContent = oldTxt;
                form.reset();
                document.querySelectorAll('.v4-modal-backdrop.is-open').forEach(function (m) {
                  m.classList.remove('is-open');
                });
              }, 2200);
            }
          });
      });
    });
  }
})();
