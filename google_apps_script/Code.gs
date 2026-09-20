/**
 * GOOGLE APPS SCRIPT FOR ECOLIFE SIGNATURE
 * Spreadsheet ID: 1r_Mh2zjcLZio3m-ozGoDRfDu0uJPHKrp9lPAF1YUds0
 * Link Sheet: https://docs.google.com/spreadsheets/d/1r_Mh2zjcLZio3m-ozGoDRfDu0uJPHKrp9lPAF1YUds0/edit?gid=0#gid=0
 * 
 * HƯỚNG DẪN TRIỂN KHAI NHANH (1 PHÚT):
 * 1. Mở file Google Sheets trên trình duyệt.
 * 2. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xóa code cũ, dán toàn bộ đoạn code này vào.
 * 4. Nhấn nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 5. Chọn loại: "Ứng dụng web" (Web App).
 * 6. Cấu hình:
 *    - Mô tả: EcoLife Signature Landing Page API
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone).
 * 7. Nhấn "Triển khai" (Deploy) -> Cấp quyền (Authorize access) -> Sao chép URL ứng dụng web (Web App URL).
 * 8. Dán URL này vào biến GOOGLE_SHEET_SCRIPT_URL trong file script.js của landing page.
 */

const SHEET_ID = '1r_Mh2zjcLZio3m-ozGoDRfDu0uJPHKrp9lPAF1YUds0';
const SHEET_NAME = 'Trang tính1'; // Hoặc tên tab đầu tiên ('Sheet1')

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0]; // Lấy sheet đầu tiên nếu tên khác
    }

    // Khởi tạo tiêu đề cột nếu sheet đang trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời Gian Đăng Ký',
        'Họ Và Tên',
        'Số Điện Thoại',
        'Email',
        'Nhu Cầu Quan Tâm',
        'Khung Giờ Tư Vấn',
        'Nguồn Đăng Ký (Popup/Form)',
        'Trạng Thái'
      ]);
      
      // Định dạng header đẹp mắt
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground('#0d3829');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
    }

    // Parse dữ liệu gửi lên
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter;
    }

    const timestamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const fullName = data.fullName || '';
    const phoneNumber = data.phoneNumber || '';
    const email = data.email || 'Chưa cung cấp';
    const interestType = data.interestType || '';
    const consultTime = data.consultTime || 'Sớm nhất có thể';
    const source = data.source || 'Website EcoLife Signature';
    const status = 'Mới tiếp nhận';

    // Thêm dòng mới vào Google Sheets
    sheet.appendRow([
      timestamp,
      fullName,
      phoneNumber,
      email,
      interestType,
      consultTime,
      source,
      status
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Dữ liệu đã được lưu thành công vào Google Sheets!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', project: 'EcoLife Signature Lead API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
