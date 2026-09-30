/* Cấu hình khóa tập huấn – chỉnh sửa tệp này để dùng lại cho địa phương, lớp học khác. */
window.ATTT = window.ATTT || {};
ATTT.config = {
  course: 'Tập huấn nhận thức an toàn thông tin cho cán bộ, công chức khối Đảng',
  shortCourse: 'Tập huấn nhận thức an toàn thông tin',
  version: 'Phiên bản 3, cập nhật 30/9/2026',
  organizer: 'Văn phòng Tỉnh ủy Vĩnh Long',
  date: 'Thứ Năm, ngày 01/10/2026',
  startTime: '08:00',
  venue: 'Hội trường Tỉnh ủy, kết nối trực tuyến đến điểm cầu các Đảng ủy xã, phường và Đảng ủy các cơ quan Đảng tỉnh',
  basis: [
    'Kế hoạch số 04-KH/BCĐ ngày 26/02/2026 của Ban Chỉ đạo 57 về triển khai Đề án Chuyển đổi số trong các cơ quan đảng tỉnh Vĩnh Long năm 2026',
    'Kế hoạch số 21-KH/VPTU ngày 31/3/2026 của Văn phòng Tỉnh ủy về thực hiện chuyển đổi số năm 2026'
  ],
  // Lịch trong ngày. "route" trỏ tới trang tương ứng trong giáo trình.
  schedule: [
    { session: 'sang', time: '08:00 – 08:15', title: 'Khai mạc và khảo sát đầu vào', route: 'khao-sat' },
    { session: 'sang', time: '08:15 – 08:50', title: 'Phần mở đầu', route: 'cap-nhat-phap-luat' },
    { session: 'sang', time: '08:50 – 09:25', title: 'Chủ đề 1', route: 'chu-de/1' },
    { session: 'sang', time: '09:25 – 10:00', title: 'Chủ đề 2', route: 'chu-de/2' },
    { session: 'sang', time: '10:00 – 10:10', title: 'Giải lao', route: null },
    { session: 'sang', time: '10:10 – 10:50', title: 'Chủ đề 3', route: 'chu-de/3' },
    { session: 'sang', time: '10:50 – 11:30', title: 'Chủ đề 4', route: 'chu-de/4' },
    { session: 'chieu', time: '13:30 – 14:25', title: 'Chủ đề 5', route: 'chu-de/5' },
    { session: 'chieu', time: '14:25 – 15:00', title: 'Chủ đề 6', route: 'chu-de/6' },
    { session: 'chieu', time: '15:00 – 15:10', title: 'Giải lao', route: null },
    { session: 'chieu', time: '15:10 – 16:05', title: 'Chủ đề 7', route: 'chu-de/7' },
    { session: 'chieu', time: '16:05 – 16:40', title: 'Chủ đề 8', route: 'chu-de/8' },
    { session: 'chieu', time: '16:40 – 17:10', title: 'Kiểm tra thực hành và tổng kết', route: 'kiem-tra' }
  ],
  // ĐẦU MỐI TIẾP NHẬN SỰ CỐ – cần cập nhật số điện thoại, thư điện tử thực tế trước buổi tập huấn.
  contacts: [
    { role: 'Đầu mối an toàn thông tin của cơ quan, đơn vị', value: 'Họ tên, số điện thoại: ……………………', note: 'Báo cáo đầu tiên, ngay khi phát hiện dấu hiệu bất thường.' },
    { role: 'Phòng CĐS-CY, Văn phòng Tỉnh ủy', value: 'Số điện thoại trực: ……………………', note: 'Đầu mối chuyên môn đối với hệ thống thông tin của các cơ quan Đảng.' },
    { role: 'Công an tỉnh – lực lượng an ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao', value: 'Số điện thoại trực: ……………………', note: 'Khi có dấu hiệu tội phạm, lừa đảo chiếm đoạt tài sản, xâm phạm bí mật nhà nước.' },
    { role: 'Cổng cảnh báo an toàn thông tin quốc gia', value: 'canhbao.khonggianmang.gov.vn', note: 'Tra cứu, phản ánh trang web, tài khoản lừa đảo.' }
  ],
  commitmentHeader: ['CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 'Độc lập – Tự do – Hạnh phúc']
};
