/**
 * EcoLife Signature - Property Listing & Multi-Layout Controller (can-ho.js)
 * Supports dynamic apartment layout switching (A1, A2, B1, B2, B3, B6, Shophouse)
 * Fixes mobile window auto-jump on load & duplicate swipe listeners
 */

document.addEventListener('DOMContentLoaded', () => {
  const baseUri = window.ecolifePropertyThemeUri ? (window.ecolifePropertyThemeUri.replace(/\/$/, '') + '/') : '';

  // Ensure page starts at top on mobile if no hash is present
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Helper to build layout image items
  const imgItem = (relPath, title, category) => ({
    src: baseUri + relPath,
    fallback: baseUri + relPath,
    title,
    category
  });

  // 1. Dedicated 3D Interior & Amenity Datasets per Apartment Layout Folder
  const layoutDatasets = {
    '2pn-a1': {
      code: 'Mẫu A1 (66,0 m² • Japandi)',
      codeShort: 'A1',
      breadcrumb: 'Căn 2PN Mẫu A1 (66,0 m²) Phong Cách Nhật Bản',
      title: 'Căn Hộ 2PN Mẫu A1 (66,0 m² – 2PN, 2WC, Ban Công & Lô Gia Riêng) | Giá Từ 2,60 Tỷ (TT Sớm 95%)',
      price: 'Từ 2,60 Tỷ (TT Sớm 95% - CK 10%)',
      priceSub: 'Tiến độ chuẩn 5 đợt: 2,74 Tỷ (CK 6%) • Vay 70%: 2,91 Tỷ (HTLS 0% / 18 tháng)',
      area: '66,0 m²',
      areaSub: 'Thông thủy tối ưu 100%',
      beds: '2 PN',
      bedsSub: 'Japandi Gỗ Sồi Sáng',
      baths: '2 WC',
      bathsSub: 'Ban công & Lô gia riêng',
      dir: 'Đông - Nam',
      dirSub: 'Đón gió biển & Vườn Atrio',
      sectionTitle: 'Thông Tin Chi Tiết Căn Hộ 2PN Mẫu A1 (66,0 m² – Phong Cách Nhật Bản Tối Giản)',
      leadOption: 'Căn 2PN Mẫu A1 (66,0m²) - Giá từ 2,60 tỷ (TT sớm 95%)',
      images: [
        imgItem('images/noi_that/layouts/can_a1_02.webp', 'Căn A1 (2PN - 66,0m²): Không gian phòng khách nối liền bàn ăn phong cách Nhật Bản tối giản (Japandi) gỗ sồi sáng ấm cúng', 'living'),
        imgItem('images/noi_that/layouts/can_a1_03.webp', 'Căn A1 (2PN - 66,0m²): Phòng khách kết nối trực tiếp ban công đón gió biển tự nhiên', 'living'),
        imgItem('images/noi_that/layouts/can_a1_05.webp', 'Căn A1 (2PN - 66,0m²): Bàn ăn gia đình tinh tế với đèn thả nghệ thuật', 'living'),
        imgItem('images/noi_that/layouts/can_a1_01.webp', 'Căn A1 (2PN - 66,0m²): Phòng ngủ Master ấm áp với hệ tủ gỗ kịch trần xử lý khéo léo mọi góc cạnh', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a1_04.webp', 'Căn A1 (2PN - 66,0m²): Góc nhìn giường ngủ Master hướng cửa sổ đón gió biển', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a1_06.webp', 'Căn A1 (2PN - 66,0m²): Bàn làm việc & kệ trang trí liền khối tối ưu góc phòng ngủ Master', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a1_07.webp', 'Căn A1 (2PN - 66,0m²): Phòng ngủ phụ đa năng thiết kế hệ phản gỗ Tatami thông minh', 'bedroom'),
        imgItem('images/commercial/apt_38.webp', 'Mặt bằng kỹ thuật Căn hộ 2PN điển hình – 100% phòng đón ánh sáng tự nhiên', 'floorplan'),
        imgItem('images/tien_ich/ho_boi_resort_01.webp', 'Không gian Sinh Khí: Hồ bơi 32m & bể sục Jacuzzi nghỉ dưỡng nội khu', 'exterior'),
        imgItem('images/tien_ich/ho_ca_koi_02.webp', 'Không gian Sinh Khí: Hồ cá Koi sinh thái & cafe sân vườn nội khu', 'exterior')
      ]
    },
    '2pn-a2': {
      code: 'Mẫu A2 (68,9 m² • Giường Tầng Đôi)',
      codeShort: 'A2',
      breadcrumb: 'Căn 2PN Mẫu A2 (68,9 m²) Đen Nhám & Đá Vân Mây',
      title: 'Căn Hộ 2PN Mẫu A2 (68,9 m² – Đen Nhám Tương Phản Đá Trắng Vân Mây, Giường Tầng Đôi) | Từ 2,60 Tỷ',
      price: 'Từ 2,60 Tỷ (TT Sớm 95% - CK 10%)',
      priceSub: 'Tiến độ chuẩn 5 đợt: 2,74 Tỷ (CK 6%) • Vay 70%: 2,91 Tỷ (HTLS 0% / 18 tháng)',
      area: '68,9 m²',
      areaSub: 'Thông thủy tối ưu',
      beds: '2 PN',
      bedsSub: 'Master + Phòng giường tầng đôi',
      baths: '2 WC',
      bathsSub: 'Ban công & Lô gia riêng',
      dir: 'Đông - Nam',
      dirSub: 'Đón gió biển & công viên',
      sectionTitle: 'Thông Tin Chi Tiết Căn Hộ 2PN Mẫu A2 (68,9 m² – Giường Tầng Đôi Liền Bàn Học Kép)',
      leadOption: 'Căn 2PN Mẫu A2 (68,9m²) - Giá từ 2,60 tỷ (TT sớm 95%)',
      images: [
        imgItem('images/noi_that/layouts/can_a2_04.webp', 'Căn A2 (2PN - 68,9m²): Mặt bằng 3D bóc tách từng phòng (Phòng khách, Bếp, Phòng ngủ 1 & 2)', 'floorplan'),
        imgItem('images/noi_that/layouts/can_a2_02.webp', 'Căn A2 (2PN - 68,9m²): Tông đen nhám cá tính tương phản cùng bề mặt đá trắng vân mây sang trọng', 'living'),
        imgItem('images/noi_that/layouts/can_a2_03.webp', 'Căn A2 (2PN - 68,9m²): Phòng khách ốp đá vân mây & hệ tủ âm kịch trần tối ưu không gian', 'living'),
        imgItem('images/noi_that/layouts/can_a2_11.webp', 'Căn A2 (2PN - 68,9m²): Góc nhìn toàn cảnh sofa phòng khách hướng ra ban công rộng', 'living'),
        imgItem('images/noi_that/layouts/can_a2_12.webp', 'Căn A2 (2PN - 68,9m²): Bàn ăn mặt đá 6 ghế kết nối không gian sinh hoạt chung ấm cúng', 'living'),
        imgItem('images/noi_that/layouts/can_a2_05.webp', 'Căn A2 (2PN - 68,9m²): Khu bếp chữ I hiện đại ốp đá vân mây & tủ lạnh Side-by-Side âm tủ', 'living'),
        imgItem('images/noi_that/layouts/can_a2_01.webp', 'Căn A2 (2PN - 68,9m²): Phòng ngủ Master sang trọng với vách đầu giường bọc nệm & đá Marble', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a2_06.webp', 'Căn A2 (2PN - 68,9m²): Góc tivi & bàn trang điểm tinh tế trong phòng ngủ Master', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a2_07.webp', 'Căn A2 (2PN - 68,9m²): Hệ tủ quần áo kịch trần kết hợp kệ trưng bày có đèn LED', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a2_08.webp', 'Căn A2 (2PN - 68,9m²): Tích hợp hệ giường tầng đôi liền bàn học kép thông minh cho gia đình có 2 bé', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a2_10.webp', 'Căn A2 (2PN - 68,9m²): Bàn học đôi tràn ngập ánh sáng tự nhiên trong phòng ngủ trẻ em', 'bedroom'),
        imgItem('images/noi_that/layouts/can_a2_09.webp', 'Căn A2 (2PN - 68,9m²): Cửa sổ lớn kịch trần đón trọn ánh sáng & gió biển Đà Nẵng', 'balcony')
      ]
    },
    '3pn-b1': {
      code: 'Căn Góc B1 (77,8 m² • Gỗ Óc Chó)',
      codeShort: 'B1',
      breadcrumb: 'Căn Góc 3PN Mẫu B1 (77,8 m²) Gỗ Óc Chó',
      title: 'Căn Góc 3PN Mẫu B1 (77,8 m² – 3PN, 2WC, Tông Nâu Trầm Gỗ Óc Chó Phối Đá Vân Khói) | Tặng 02 Chỉ Vàng',
      price: 'Từ 3,05 Tỷ (CK tới 10%)',
      priceSub: 'Hỗ trợ vay 70% HTLS 0% trong 18 tháng • Tặng 02 chỉ vàng (28 triệu)',
      area: '77,8 m²',
      areaSub: 'Căn góc 3PN tối ưu diện tích',
      beds: '3 PN',
      bedsSub: 'Gỗ óc chó & Đá vân khói',
      baths: '2 WC',
      bathsSub: 'Ban công & Lô gia riêng',
      dir: 'Căn góc 2 mặt thoáng',
      dirSub: 'Đón gió biển & Hồ Bàu Tràm',
      sectionTitle: 'Thông Tin Chi Tiết Căn Góc 3PN Mẫu B1 (77,8 m² – Tông Nâu Trầm Gỗ Óc Chó)',
      leadOption: 'Căn Góc 3PN Mẫu B1 (77,8m²) - Tặng 02 chỉ vàng',
      images: [
        imgItem('images/noi_that/layouts/can_b1_01.webp', 'Căn góc B1 (3PN - 77,8m²): Tông nâu trầm gỗ óc chó phối đá vân khói sang trọng', 'living'),
        imgItem('images/noi_that/layouts/can_b1_02.webp', 'Căn góc B1 (3PN - 77,8m²): Không gian phòng khách nối liền bàn ăn mặt đá lịch lãm', 'living'),
        imgItem('images/noi_that/layouts/can_b1_03.webp', 'Căn góc B1 (3PN - 77,8m²): Cửa kính lớn mở ra ban công đón ánh sáng tự nhiên', 'living'),
        imgItem('images/noi_that/layouts/can_b1_04.webp', 'Căn góc B1 (3PN - 77,8m²): Hệ tủ trưng bày kịch trần xử lý khéo léo các góc tường', 'living'),
        imgItem('images/noi_that/layouts/can_b1_06.webp', 'Căn góc B1 (3PN - 77,8m²): Phòng ngủ Master gỗ óc chó trầm ấm với cửa sổ rộng', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b1_08.webp', 'Căn góc B1 (3PN - 77,8m²): Hệ tủ quần áo cánh kính kịch trần sang trọng', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b1_10.webp', 'Căn góc B1 (3PN - 77,8m²): Phòng ngủ thứ 2 bố trí bàn học cạnh cửa sổ thoáng sáng', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b1_12.webp', 'Căn góc B1 (3PN - 77,8m²): Phòng ngủ thứ 3 đa năng cho gia đình đa thế hệ', 'bedroom')
      ]
    },
    '3pn-b2': {
      code: 'Mẫu B2 (87,3 m² • 2 Ban Công)',
      codeShort: 'B2',
      breadcrumb: 'Căn 3PN Mẫu B2 (87,3 m²) 2 Ban Công Trải Dài',
      title: 'Căn Hộ 3PN Mẫu B2 (87,3 m² – 3PN, 2WC, 2 Ban Công Trải Dài & Lô Gia) | Tặng 02 Chỉ Vàng',
      price: 'Từ 3,32 Tỷ (CK tới 10%)',
      priceSub: 'Hỗ trợ vay 70% HTLS 0% trong 18 tháng • Tặng 02 chỉ vàng (28 triệu)',
      area: '87,3 m²',
      areaSub: '2 Ban công trải dài thoáng rộng',
      beds: '3 PN',
      bedsSub: 'Tông ghi đen & Hệ vách lam',
      baths: '2 WC',
      bathsSub: '2 Ban công & 1 Lô gia',
      dir: 'Đông - Nam',
      dirSub: 'Đón trọn sinh khí Vườn Atrio',
      sectionTitle: 'Thông Tin Chi Tiết Căn Hộ 3PN Mẫu B2 (87,3 m² – 2 Ban Công Trải Dài)',
      leadOption: 'Căn 3PN Mẫu B2 (87,3m²) - 2 Ban công trải dài',
      images: [
        imgItem('images/noi_that/layouts/can_b2_01.webp', 'Căn B2 (3PN - 87,3m²): Tông ghi đen cùng hệ vách lam hiện đại, ban công trải dài', 'living'),
        imgItem('images/noi_that/layouts/can_b2_02.webp', 'Căn B2 (3PN - 87,3m²): Trục phòng khách – bàn ăn rộng mở kết nối ban công', 'living'),
        imgItem('images/noi_that/layouts/can_b2_04.webp', 'Căn B2 (3PN - 87,3m²): Bàn ăn 6 ghế kết nối khu bếp và lô gia riêng biệt', 'living'),
        imgItem('images/noi_that/layouts/can_b2_07.webp', 'Căn B2 (3PN - 87,3m²): Phòng ngủ Master sở hữu ban công riêng tư ngắm cảnh quan nội khu', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b2_10.webp', 'Căn B2 (3PN - 87,3m²): Hệ tủ quần áo kịch trần & bàn trang điểm tối ưu từng góc phòng', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b2_13.webp', 'Căn B2 (3PN - 87,3m²): Phòng ngủ thứ 2 ngập tràn ánh sáng tự nhiên', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b2_16.webp', 'Căn B2 (3PN - 87,3m²): Phòng ngủ thứ 3 thiết kế bàn học dài bên cửa sổ', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b2_12.webp', 'Ban công sinh thái trải dài đón gió biển & tầm nhìn hướng hồ bơi nội khu', 'balcony'),
        imgItem('images/noi_that/layouts/can_b2_15.webp', 'Phòng tắm hoàn thiện vách kính cường lực & thiết bị vệ sinh cao cấp', 'bathroom')
      ]
    },
    '3pn-b6': {
      code: 'Mẫu B6 (87,1 m² • 3PN & 3WC)',
      codeShort: 'B6',
      breadcrumb: 'Căn 3PN Mẫu B6 (87,1 m²) 3 Phòng Vệ Sinh Riêng Tư',
      title: 'Căn Hộ 3PN Mẫu B6 (87,1 m² – 3PN, 3 Phòng Vệ Sinh Riêng Tư, Nội Thất Bo Cong Mềm Mại) | Tặng 02 Chỉ Vàng',
      price: 'Từ 3,31 Tỷ (CK tới 10%)',
      priceSub: 'Hỗ trợ vay 70% HTLS 0% trong 18 tháng • Tặng 02 chỉ vàng (28 triệu)',
      area: '87,1 m²',
      areaSub: 'Thông thủy tối ưu góc cạnh',
      beds: '3 PN',
      bedsSub: 'Organic Modern bo cong mềm mại',
      baths: '3 WC',
      bathsSub: '3 Phòng vệ sinh khép kín riêng tư',
      dir: 'Đông - Nam',
      dirSub: 'Kề 04 tầng vườn chân mây',
      sectionTitle: 'Thông Tin Chi Tiết Căn Hộ 3PN Mẫu B6 (87,1 m² – 3PN, 3WC Riêng Tư)',
      leadOption: 'Căn 3PN Mẫu B6 (87,1m² - 3WC) - Tặng 02 chỉ vàng',
      images: [
        imgItem('images/noi_that/layouts/can_b6_01.webp', 'Căn B6 (3PN - 87,1m²): Tông kem gỗ sáng cùng nội thất bo cong mềm mại (Organic Modern) & 3WC riêng tư', 'living'),
        imgItem('images/noi_that/layouts/can_b6_07.webp', 'Căn B6 (3PN - 87,1m²): Góc nhìn cận cảnh phòng khách & khu bàn ăn ngập tràn ánh sáng', 'living'),
        imgItem('images/noi_that/layouts/can_b6_09.webp', 'Căn B6 (3PN - 87,1m²): Cửa kính ban công rộng mở đón trọn tầm nhìn từ sofa phòng khách', 'living'),
        imgItem('images/noi_that/layouts/can_b6_02.webp', 'Căn B6 (3PN - 87,1m²): Khu vực bàn ăn gia đình ấm cúng với ghế bọc da Cognac đồng bộ', 'living'),
        imgItem('images/noi_that/layouts/can_b6_08.webp', 'Xử lý khéo léo mọi góc khuất bằng hệ tủ lưu trữ âm tường kịch trần – triết lý xuyên suốt phần lớn căn hộ tại dự án', 'living'),
        imgItem('images/noi_that/layouts/can_b6_03.webp', 'Căn B6 (3PN - 87,1m²): Phòng ngủ Master với bàn làm việc bo góc chữ L liên hoàn bên cửa sổ lớn', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b6_04.webp', 'Căn B6 (3PN - 87,1m²): Phòng ngủ thứ 2 bố trí góc làm việc & kệ sách kịch trần hiện đại', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b6_06.webp', 'Căn B6 (3PN - 87,1m²): Hệ bàn học đôi dài cạnh cửa sổ thoáng sáng trong phòng ngủ phụ', 'bedroom'),
        imgItem('images/tien_ich/truong_mam_non_gca_3toa.webp', 'Tiện ích nội khu: Trường mầm non theo tiêu chuẩn công trình xanh GCA ngay dưới chân tòa tháp', 'exterior')
      ]
    },
    '3pn-b3': {
      code: 'Căn Góc B3 (88,8 m² • Panorama)',
      codeShort: 'B3',
      breadcrumb: 'Căn Góc 3PN Panorama B3 (88,8 m²)',
      title: 'Căn Góc 3PN Mẫu B3 (88,8 m² – 3PN, 2WC, Ban Công Góc Panorama & Lô Gia) | Tặng 02 Chỉ Vàng',
      price: 'Từ 3,38 Tỷ (CK tới 10%)',
      priceSub: 'Hỗ trợ vay 70% HTLS 0% trong 18 tháng • Tặng 02 chỉ vàng (28 triệu)',
      area: '88,8 m²',
      areaSub: 'Căn góc Panorama lớn nhất tầng',
      beds: '3 PN',
      bedsSub: 'Tông kem phối đen sang trọng',
      baths: '2 WC',
      bathsSub: 'Ban công góc & Lô gia riêng',
      dir: 'Đông Nam - Đông Bắc',
      dirSub: '2 Mặt thoáng view vịnh & công viên',
      sectionTitle: 'Thông Tin Chi Tiết Căn Góc 3PN Panorama Mẫu B3 (88,8 m²)',
      leadOption: 'Căn Góc 3PN Mẫu B3 (88,8m²) - Ban công góc Panorama',
      images: [
        imgItem('images/noi_that/layouts/can_b3_03.webp', 'Căn Góc B3 (3PN - 88,8m²): Mặt bằng 3D bóc tách căn góc (Phòng khách, Bếp, 3 Phòng ngủ)', 'floorplan'),
        imgItem('images/noi_that/layouts/can_b3_01.webp', 'Căn Góc B3 (3PN - 88,8m²): Tông kem phối đen cùng hệ vách ốp sang trọng, kết nối ban công góc Panorama', 'living'),
        imgItem('images/noi_that/layouts/can_b3_07.webp', 'Căn Góc B3 (3PN - 88,8m²): Không gian sinh hoạt chung sang trọng với sofa chữ L cỡ lớn', 'living'),
        imgItem('images/noi_that/layouts/can_b3_08.webp', 'Căn Góc B3 (3PN - 88,8m²): Góc nhìn phòng khách kết nối khu vực bàn ăn & tiền sảnh', 'living'),
        imgItem('images/noi_that/layouts/can_b3_04.webp', 'Căn Góc B3 (3PN - 88,8m²): Khu vực bàn ăn 6 ghế mặt đá cẩm thạch & tủ lạnh Side-by-Side', 'living'),
        imgItem('images/noi_that/layouts/can_b3_06.webp', 'Căn Góc B3 (3PN - 88,8m²): Sảnh đón căn hộ ốp gỗ sang trọng với hệ tủ âm khít từng góc tường', 'living'),
        imgItem('images/noi_that/layouts/can_b3_09.webp', 'Căn Góc B3 (3PN - 88,8m²): Phòng ngủ Master căn góc với 2 mặt cửa sổ đón gió biển', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b3_13.webp', 'Căn Góc B3 (3PN - 88,8m²): Hệ kệ tivi treo tường & bàn trang điểm trong phòng ngủ Master', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b3_10.webp', 'Căn Góc B3 (3PN - 88,8m²): Phòng ngủ thứ 2 ấm cúng với tủ quần áo kịch trần & cửa sổ thoáng', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b3_11.webp', 'Căn Góc B3 (3PN - 88,8m²): Bàn làm việc tiêu chuẩn bên cửa sổ trong phòng ngủ thứ 2', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b3_02.webp', 'Căn Góc B3 (3PN - 88,8m²): Phòng ngủ thứ 3 tinh tế, tối ưu công năng cho gia đình đa thế hệ', 'bedroom'),
        imgItem('images/noi_that/layouts/can_b3_12.webp', 'Căn Góc B3 (3PN - 88,8m²): Góc học tập & kệ sách trang nhã trong phòng ngủ thứ 3', 'bedroom'),
        imgItem('images/tien_ich/san_pickleball_02.webp', 'Không gian Cộng Đồng: Tổ hợp sân Pickleball, sân bóng rổ & khu vận động liên hoàn', 'exterior')
      ]
    },
    'shophouse': {
      code: 'Shophouse Khối Đế (26 Căn • Tầng 1–2)',
      codeShort: 'SH',
      breadcrumb: '26 Căn Shophouse Khối Đế & Sảnh Đón 5 Sao',
      title: 'Shophouse Khối Đế 2 Tầng (120,5 – 418,2 m²) Mặt Tiền Đại Lộ Mê Linh & Sảnh Đón 5 Sao | 26 Căn Giới Hạn',
      price: 'Từ 6,45 Tỷ (TT sớm 5,80 Tỷ)',
      priceSub: 'Chính sách CĐT: CK lên tới 10% • HTLS 0% trong 18 tháng',
      area: '120,5 – 418,2 m²',
      areaSub: '26 căn giới hạn tại Tầng 1 – 2',
      beds: '2 Tầng',
      bedsSub: 'Kinh doanh đa ngành nghề',
      baths: '2 WC',
      bathsSub: 'Hoàn thiện mặt ngoài cao cấp',
      dir: 'Mặt tiền Đại lộ Mê Linh',
      dirSub: 'Đón trọn dòng khách toàn quần thể dự án',
      sectionTitle: 'Thông Tin Chi Tiết 26 Căn Shophouse Khối Đế Tầng 1–2 & Sảnh Đón 5 Sao',
      leadOption: 'Shophouse Khối Đế Tầng 1-2 (120,5 - 418,2m²) - Giá TT sớm từ 5,80 tỷ',
      images: [
        imgItem('images/architecture/shophouse_podium_26can.webp', 'Phối cảnh 26 căn Shophouse thương mại khối đế Tầng 1–2 mặt tiền Đại lộ Mê Linh', 'exterior'),
        imgItem('images/tien_ich/pho_cafe_am_thuc_01.webp', 'Phối cảnh Phố Cafe - Ẩm thực - Shophouse khối đế sầm uất', 'exterior'),
        imgItem('images/noi_that/layouts/sanh_02.webp', 'Sảnh Chính 5 Sao: Quầy lễ tân đá cẩm thạch & biểu tượng EcoLife Signature tỏa sáng', 'living'),
        imgItem('images/noi_that/layouts/sanh_01.webp', 'Sảnh Chính 5 Sao: Khu vực sofa chờ sang trọng với đèn chùm pha lê nghệ thuật', 'living'),
        imgItem('images/noi_that/layouts/sanh_05.webp', 'Sảnh Chính Tầng 1 (1F): Khu vực hòm thư cư dân tiêu chuẩn khách sạn quốc tế', 'living'),
        imgItem('images/noi_that/layouts/sanh_06.webp', 'Sảnh Tiếp Khách VIP: Lounge cafe & không gian tiếp đón đối tác dành riêng cho cư dân', 'living'),
        imgItem('images/noi_that/layouts/sanh_11.webp', 'Sảnh Thang Máy Tầng 1: Hệ thống thang máy tốc độ cao ốp đá Marble sang trọng', 'living'),
        imgItem('images/noi_that/layouts/sanh_15.webp', 'Hành Lang Căn Hộ Điển Hình: Rộng rãi, thông gió tự nhiên từ Vườn Atrio & Cổng Ostia', 'living')
      ]
    },
    'penthouse': {
      code: 'Penthouse Sân Vườn (06 Căn • Tầng 16–17)',
      codeShort: 'PH',
      breadcrumb: 'Penthouse Biệt Thự Chân Mây Sân Vườn Riêng (Tầng 16–17)',
      title: 'Penthouse Biệt Thự Chân Mây (157,5 – 630,4 m²) Sân Vườn Riêng Ôm Trọn Vịnh Biển Đà Nẵng – Tầng 16–17',
      price: '06 Suất Độc Bản',
      priceSub: 'Bàn giao thô để chủ nhân tự do thiết kế theo phong cách & cá tính riêng',
      area: '157,5 – 630,4 m²',
      areaSub: 'Tầng 16 – 17 • Sở hữu sân vườn riêng',
      beds: 'Biệt thự chân mây',
      bedsSub: 'Tự do kiến tạo công năng',
      baths: 'Bàn giao thô',
      bathsSub: 'Khẳng định dấu ấn độc bản',
      dir: 'Panorama Vịnh Biển',
      dirSub: 'Ôm trọn vịnh Đà Nẵng & Đèo Hải Vân',
      sectionTitle: 'Thông Tin Chi Tiết 06 Căn Penthouse Biệt Thự Chân Mây (Tầng 16–17)',
      leadOption: 'Penthouse Sân Vườn Riêng Tầng 16-17 (157,5 - 630,4m²) - 06 Căn Độc Bản',
      images: [
        imgItem('images/architecture/penthouse_san_vuon_rieng.webp', 'Bộ sưu tập 06 căn Penthouse Tầng 16–17 (157,5 – 630,4m²): Sở hữu sân vườn riêng cùng tầm nhìn ôm trọn vịnh biển Đà Nẵng', 'balcony'),
        imgItem('images/architecture/master_3_toa_giat_cap.webp', 'Kiến trúc giật cấp từ tầng 17 thoải dần xuống tầng 6 tạo 04 tầng vườn chân mây và 06 căn Penthouse độc bản', 'exterior'),
        imgItem('images/masterplan_rooftop.webp', 'Mặt bằng tổng thể tầng mái & Sân vườn Penthouse trên cao', 'floorplan'),
        imgItem('images/brand/rooftop_bbq.webp', 'Không gian Thân Tâm Trí tầng mái: Khu vực BBQ & thưởng trà ngắm hoàng hôn vịnh biển', 'living'),
        imgItem('images/brand/mindfulness_wellness.webp', 'Không gian Thân Tâm Trí: Vườn thiền Yoga, góc đọc sách & đường dạo bộ trị liệu giác quan', 'living')
      ]
    }
  };
  layoutDatasets['skygarden-b6'] = layoutDatasets['3pn-b6'];

  // Determine initial layout from URL query (?layout=...)
  const urlParams = new URLSearchParams(window.location.search);
  let currentLayoutKey = urlParams.get('layout') || '2pn-a1';
  if (!layoutDatasets[currentLayoutKey]) {
    currentLayoutKey = '2pn-a1';
  }

  let currentImages = [...layoutDatasets[currentLayoutKey].images];
  let filteredImages = [...currentImages];
  let currentIndex = 0;

  // DOM Elements
  const featuredImg = document.getElementById('gallery-featured-img');
  const counterPill = document.getElementById('gallery-counter-num');
  const captionText = document.getElementById('gallery-caption-text');
  const thumbsTrack = document.getElementById('gallery-thumbs-track');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const layoutBtns = document.querySelectorAll('.unit-layout-pill');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const fullscreenBtn = document.getElementById('gallery-fullscreen-btn');
  const featuredWrap = document.getElementById('gallery-featured-wrap');

  // Lightbox DOM Elements
  const lightboxModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-main-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // Update Filter Button Counts dynamically based on current layout dataset
  const updateFilterCounts = () => {
    filterBtns.forEach(btn => {
      const cat = btn.getAttribute('data-filter');
      if (cat === 'all') {
        btn.textContent = `Tất cả ảnh (${currentImages.length})`;
      } else {
        const count = currentImages.filter(img => img.category === cat).length;
        const baseLabels = {
          living: 'Phòng khách & Bếp',
          bedroom: 'Phòng ngủ',
          bathroom: 'Phòng tắm & WC',
          balcony: 'Ban công & Tầm nhìn',
          floorplan: 'Mặt bằng 3D',
          exterior: 'Tiện ích thực tế'
        };
        if (count > 0) {
          btn.style.display = 'inline-flex';
          btn.textContent = `${baseLabels[cat] || cat} (${count})`;
        } else {
          btn.style.display = 'none';
        }
      }
    });
  };

  // Render Thumbnails
  const renderThumbnails = () => {
    if (!thumbsTrack) return;
    thumbsTrack.innerHTML = '';
    filteredImages.forEach((img, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === currentIndex ? 'active' : ''}`;
      thumb.setAttribute('data-index', idx);
      thumb.setAttribute('title', img.title);
      thumb.innerHTML = `<img src="${img.src}" alt="${img.title}" loading="lazy">`;
      thumb.addEventListener('click', () => {
        showImage(idx, true);
      });
      thumbsTrack.appendChild(thumb);
    });
  };

  // Show Image Function (isUserAction prevents window scroll jump on initial load!)
  const showImage = (index, isUserAction = false) => {
    if (!filteredImages.length) return;
    if (index < 0) index = filteredImages.length - 1;
    if (index >= filteredImages.length) index = 0;
    currentIndex = index;

    const item = filteredImages[currentIndex];

    if (featuredImg) {
      featuredImg.style.opacity = '0.35';
      setTimeout(() => {
        featuredImg.src = item.src;
        featuredImg.alt = item.title;
        featuredImg.style.opacity = '1';
      }, 120);
    }

    if (counterPill) {
      counterPill.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
    }

    if (captionText) {
      captionText.textContent = item.title;
    }

    // Update active thumb & scroll ONLY horizontally inside thumbsTrack (never scroll window!)
    const allThumbs = thumbsTrack?.querySelectorAll('.thumb-item');
    allThumbs?.forEach((th, idx) => {
      if (idx === currentIndex) {
        th.classList.add('active');
        if (isUserAction && thumbsTrack) {
          const targetLeft = th.offsetLeft - (thumbsTrack.clientWidth / 2) + (th.clientWidth / 2);
          thumbsTrack.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
        }
      } else {
        th.classList.remove('active');
      }
    });

    // Update Lightbox if open
    if (lightboxModal && lightboxModal.classList.contains('is-active')) {
      if (lightboxImg) lightboxImg.src = item.src;
      if (lightboxCaption) lightboxCaption.textContent = item.title;
      if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
    }
  };

  // Apply Selected Apartment Layout to Page Header, Metrics & Gallery
  const applyLayout = (layoutKey, isUserClick = false) => {
    const data = layoutDatasets[layoutKey] || layoutDatasets['2pn-a1'];
    currentLayoutKey = layoutKey;
    currentImages = [...data.images];
    filteredImages = [...currentImages];
    currentIndex = 0;

    // Update active layout pill
    layoutBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-layout') === layoutKey);
    });

    // Reset category filter to 'all'
    filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
    updateFilterCounts();

    // Update Page DOM Texts if present
    const mainTitleEl = document.querySelector('.property-main-title');
    if (mainTitleEl) mainTitleEl.textContent = data.title;

    const breadCurrentEl = document.querySelector('.property-breadcrumbs .current');
    if (breadCurrentEl) breadCurrentEl.textContent = data.breadcrumb;

    const metricItems = document.querySelectorAll('.property-key-metrics .metric-item');
    if (metricItems.length >= 5) {
      const setMetric = (el, val, sub) => {
        const vEl = el.querySelector('.metric-item-val');
        const sEl = el.querySelector('.metric-item-sub');
        if (vEl) vEl.textContent = val;
        if (sEl) sEl.textContent = sub;
      };
      setMetric(metricItems[0], data.price, data.priceSub);
      setMetric(metricItems[1], data.area, data.areaSub);
      setMetric(metricItems[2], data.beds, data.bedsSub);
      setMetric(metricItems[3], data.baths, data.bathsSub);
      setMetric(metricItems[4], data.dir, data.dirSub);
    }

    const codeStrong = document.querySelector('.post-time-meta strong');
    if (codeStrong) codeStrong.textContent = data.code;

    const sectionTitleSpan = document.querySelector('.property-details-card .section-block-title span');
    if (sectionTitleSpan) sectionTitleSpan.textContent = data.sectionTitle;

    const lbTitle = document.querySelector('.lightbox-title');
    if (lbTitle) lbTitle.innerHTML = `<i class="fa-regular fa-image"></i> ${data.breadcrumb} – EcoLife Signature Đà Nẵng`;

    // Update URL query string cleanly without reloading
    if (isUserClick && window.history && window.history.replaceState) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('layout', layoutKey);
      window.history.replaceState({}, '', newUrl.toString());
    }

    renderThumbnails();
    showImage(0, false);
  };

  // Bind Layout Switcher Buttons
  layoutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-layout');
      if (key) applyLayout(key, true);
    });
  });

  // Bind Category Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      if (cat === 'all') {
        filteredImages = [...currentImages];
      } else {
        filteredImages = currentImages.filter(img => img.category === cat);
      }

      currentIndex = 0;
      renderThumbnails();
      showImage(0, true);
    });
  });

  // Gallery Navigation Arrows
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1, true); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1, true); });

  // Lightbox Triggers
  const openLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    showImage(currentIndex, false);
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(); });
  if (featuredWrap) featuredWrap.addEventListener('click', openLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1, true));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showImage(currentIndex + 1, true));

  // Single Unified Touch Swipe Support for Main Gallery Carousel
  if (featuredWrap) {
    let touchStartX = 0;
    let touchStartY = 0;

    featuredWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    featuredWrap.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        showImage(diffX < 0 ? currentIndex + 1 : currentIndex - 1, true);
      }
    }, { passive: true });
  }

  // Touch Swipe for Lightbox Modal on Mobile
  if (lightboxModal) {
    let lbStartX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      lbStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - lbStartX;
      if (Math.abs(diffX) > 40) {
        showImage(diffX < 0 ? currentIndex + 1 : currentIndex - 1, true);
      }
    }, { passive: true });
  }

  // Lightbox Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1, true);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1, true);
  });

  // Initialize Gallery with active layout (without scrolling window!)
  applyLayout(currentLayoutKey, false);

  // ==========================================================================
  // LEAD CAPTURE FORM CONTROLLER
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
      const interest = document.getElementById('lead-interest-plan')?.value || 'Căn 2PN Mẫu A1 (66m²) - Giá từ 2,73 tỷ';
      const notes = document.getElementById('lead-notes')?.value.trim() || '';

      const cleanedPhone = phoneInput.replace(/[\s.-]/g, '');
      const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])[0-9]{8}$/;

      if (!phoneRegex.test(cleanedPhone)) {
        alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, ví dụ: 0912345678).');
        document.getElementById('lead-phone-number')?.focus();
        return;
      }

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
        source: (function() {
          var currentRef = window.ECOLIFE_REF || localStorage.getItem('ecolife_ref') || sessionStorage.getItem('ecolife_ref') || '';
          var base = 'Trang Chi Tiết Căn Hộ (' + currentLayoutKey.toUpperCase() + ')';
          return currentRef ? ('ref=' + currentRef + ' - ' + base) : base;
        })(),
        ref: (window.ECOLIFE_REF || localStorage.getItem('ecolife_ref') || sessionStorage.getItem('ecolife_ref') || ''),
        notes: notes,
        timestamp: new Date().toLocaleString('vi-VN')
      };

      try {
        const stored = JSON.parse(localStorage.getItem('ecolife_leads') || '[]');
        stored.push(leadData);
        localStorage.setItem('ecolife_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      const endpoints = [
        window.ecolifeData?.restUrl || '/wp-json/ecolife/v1/lead',
        '/wp-admin/admin-ajax.php'
      ];

      try {
        let sent = false;
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

        if (!sent && window.ecolifeData?.ajaxUrl) {
          const params = new URLSearchParams();
          params.append('action', 'ecolife_submit_lead');
          params.append('fullName', leadData.fullName);
          params.append('phoneNumber', leadData.phoneNumber);
          params.append('email', leadData.email);
          params.append('interestType', leadData.interestType);
          params.append('consultTime', leadData.consultTime);
          params.append('source', leadData.source);
          if (leadData.ref) params.append('ref', leadData.ref);
          params.append('notes', leadData.notes);
          await fetch(window.ecolifeData.ajaxUrl, { method: 'POST', body: params });
        }
      } catch (networkErr) {
        console.warn('Submission network notice:', networkErr);
      }

      await new Promise(r => setTimeout(r, 600));

      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Đăng Ký Nhận Báo Giá Gốc</span>';
      }

      leadForm.reset();

      if (successCustomerName) {
        successCustomerName.textContent = leadData.fullName;
      }
      if (successModal) {
        successModal.classList.add('is-active');
      }
    });
  }

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
});
