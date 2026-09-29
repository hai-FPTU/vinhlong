# Tập huấn nhận thức an toàn thông tin cho cán bộ, công chức khối Đảng

Giáo trình web tương tác phục vụ **Hội nghị tập huấn nhận thức an toàn thông tin cho cán bộ, công chức khối Đảng** (Văn phòng Tỉnh ủy Vĩnh Long, ngày 01/10/2026). Một ngày, hai buổi, tám chủ đề; đi từ lý thuyết đến thực hành nhận diện lừa đảo, xử lý sự cố.

Giáo trình là trang web tĩnh (HTML, CSS, JavaScript thuần), **không cần máy chủ, không cần cài đặt, không gửi dữ liệu học viên đi đâu**. Chạy được trên GitHub Pages hoặc mở trực tiếp tệp `index.html` khi không có Internet.

## Nội dung

| Trang | Học liệu tương tác |
|---|---|
| Giới thiệu | Thư giả mạo được soi từng dấu hiệu rồi đóng dấu; lịch trong ngày; 12 yêu cầu cần đạt |
| Khảo sát đầu vào | 15 câu trắc nghiệm xác lập mốc so sánh |
| Chủ đề 1. An toàn thông tin trong cơ quan Đảng và chính quyền | Tam giác Bí mật – Toàn vẹn – Sẵn sàng; mô phỏng mã độc tống tiền; biểu đồ yếu tố con người; phân tích 3 vụ việc |
| Chủ đề 2. Phân loại thông tin, dữ liệu | Tủ hồ sơ 4 cấp độ; kéo thả phân loại; bản đồ “dữ liệu công vụ đang ở đâu”; bảng phân loại của đơn vị (xuất CSV) |
| Chủ đề 3. Rủi ro thường gặp | Tìm 8 lỗi trên hình bàn làm việc; mô phỏng nghe lén trên Wi-Fi công cộng |
| Chủ đề 4. Tài khoản, OTP, chữ ký số, thiết bị | Phòng thử mật khẩu; mô phỏng cuộc gọi lừa lấy OTP; mô phỏng xác thực hai lớp; hướng dẫn bật 2FA; tự kiểm tra thiết bị |
| Chủ đề 5. Phòng tránh lừa đảo | Chuỗi tấn công phi kỹ thuật; 6 thẻ màn hình kịch bản lừa đảo; hộp thư 10 mẫu thật – giả; giải phẫu đường liên kết; kiểm tra tệp đính kèm; quy tắc kênh thứ hai |
| Chủ đề 6. Văn bản điện tử, dữ liệu cá nhân | Bản đồ kênh gửi nhận; chọn đúng kênh; mô phỏng sao lưu 3 – 2 – 1; thẻ lật hành vi vi phạm; tình huống nhóm |
| Chủ đề 7. Trí tuệ nhân tạo, nền tảng trực tuyến | Hành trình dữ liệu vào AI công cộng; phân loại được/không được đưa vào AI; công cụ đánh dấu, ẩn danh hóa nội dung; kiểm chứng câu trả lời AI |
| Chủ đề 8. Xử lý ban đầu khi có sự cố | Năm bước Dừng – Cô lập – Ghi nhận – Báo cáo – Phối hợp; diễn tập 3 kịch bản có đếm giờ; danh bạ đầu mối |
| Kiểm tra thực hành cuối khóa | 10 phần, 100 điểm: tìm lỗi trên hình bộ phận một cửa, tìm dấu hiệu trong thư điện tử và tin nhắn, bấm chọn tên miền thật, chọn tệp nguy hiểm, đóng dấu cấp độ tài liệu, xếp thứ tự mật khẩu, lọc thông tin trước khi gửi AI, sắp xếp các bước xử lý sự cố, hội thoại cuộc gọi xin OTP. Kết quả theo nhóm kỹ năng, so sánh với đầu vào, xuất CSV |
| Tự kiểm tra hằng tháng | 12 việc, lưu trên trình duyệt, in được |
| Căn cứ pháp lý | 14 luật, nghị định, nghị quyết đang có hiệu lực (rà soát đến 9/2026) |

## Cấu trúc thư mục

```
index.html                  Trang duy nhất (ứng dụng một trang, điều hướng bằng #/)
assets/
  css/                      base (màu, chữ), layout, content, widgets, print
  img/                      favicon.svg
  js/
    config.js               ← CHỈNH Ở ĐÂY: đơn vị, ngày, lịch, ĐẦU MỐI BÁO CÁO SỰ CỐ
    core/                   util (tiện ích), icons (biểu tượng), render (dựng chủ đề), app (điều hướng)
    data/                   topics (nội dung 8 chủ đề), phishing (10 mẫu), quiz (20 câu),
                            drill (kịch bản diễn tập), final (bài kiểm tra thực hành), course (mục tiêu, văn bản pháp luật)
    widgets/                common, foundation (buổi sáng), practice (buổi chiều), visuals (minh họa)
    pages/                  home (trang chủ, pháp lý), assess (khảo sát, tự kiểm tra), final (kiểm tra thực hành)
docs/huong-dan-giang-vien.md  Kịch bản giảng dạy theo từng khung giờ
```

## Đưa lên GitHub Pages

1. Tạo kho lưu trữ mới trên GitHub, tải toàn bộ thư mục này lên (giữ nguyên tệp `.nojekyll`).
2. Vào **Settings → Pages**, mục *Source* chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, bấm **Save**.
3. Sau 1–2 phút, giáo trình có tại `https://<tên-tài-khoản>.github.io/<tên-kho>/`.
4. Tạo mã QR của đường dẫn này để học viên quét trong hội trường và tại các điểm cầu.

Chạy thử trên máy: mở `index.html` bằng trình duyệt, hoặc chạy `python3 -m http.server` trong thư mục rồi mở `http://localhost:8000`.

## Việc cần làm trước buổi tập huấn

- [ ] Cập nhật **số điện thoại, đầu mối tiếp nhận sự cố** trong `assets/js/config.js` (mục `contacts`).
- [ ] Rà soát lần cuối số hiệu, hiệu lực văn bản trong `assets/js/data/course.js`.
- [ ] Kiểm tra giờ trong `schedule` khớp chương trình chính thức.
- [ ] Mở thử trên điện thoại Android, iPhone và máy chiếu của hội trường.

## Quyền riêng tư

Mọi kết quả (khảo sát, kiểm tra, danh mục) chỉ lưu trong trình duyệt của người dùng (`localStorage`). Các công cụ phòng thử mật khẩu, phân tích đường liên kết, kiểm tra nội dung AI xử lý hoàn toàn tại chỗ. Tên, địa chỉ, số liệu trong bài tập là giả định.

Không đưa giấy mời, tài liệu có ghi chú “thuộc sở hữu của các cơ quan Đảng” vào kho lưu trữ công khai.
