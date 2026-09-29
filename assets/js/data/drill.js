/* Kịch bản diễn tập xử lý sự cố. score: 2 = đúng, 1 = chưa đầy đủ, 0 = sai. */
(function (A) {
  A.data.drills = [
    { id: 'ransom', name: 'Mã độc tống tiền tại bộ phận văn thư', steps: [
      { t: '09:12. Màn hình máy tính văn thư hiện thông báo: “Dữ liệu của bạn đã bị mã hóa. Liên hệ địa chỉ dưới đây để chuộc lại.” Các tệp trong thư mục dùng chung có đuôi lạ.', o: [
        { t: 'Tắt nguồn máy ngay lập tức', s: 0, f: 'Tắt nguồn có thể làm mất dấu vết phục vụ xác minh và khôi phục. Bước đúng là ngắt kết nối mạng, để nguyên máy.' },
        { t: 'Rút dây mạng, tắt Wi-Fi, để nguyên hiện trạng máy', s: 2, f: 'Đúng. Cô lập máy để ngăn mã độc lây sang máy khác và thư mục dùng chung.' },
        { t: 'Chép gấp các tệp còn mở được sang USB', s: 0, f: 'Có thể chép luôn mã độc sang USB và lây lan sang máy khác.' },
        { t: 'Liên hệ địa chỉ trên màn hình để hỏi giá', s: 0, f: 'Không liên hệ, thương lượng với kẻ tấn công.' } ] },
      { t: 'Máy đã được ngắt mạng. Việc tiếp theo?', o: [
        { t: 'Dùng điện thoại chụp màn hình thông báo, ghi thời điểm và thư, tệp đã mở gần nhất', s: 2, f: 'Đúng. Thông tin này giúp bộ phận chuyên môn xác định nguồn gốc và phạm vi.' },
        { t: 'Cài lại Windows để làm việc tiếp', s: 0, f: 'Xóa mất dấu vết; dữ liệu cũng không được khôi phục.' },
        { t: 'Tìm công cụ giải mã miễn phí trên mạng', s: 0, f: 'Nhiều “công cụ giải mã” trên mạng chính là mã độc.' } ] },
      { t: 'Báo cáo cho ai, bằng cách nào?', o: [
        { t: 'Gọi điện ngay cho lãnh đạo trực tiếp và đầu mối an toàn thông tin', s: 2, f: 'Đúng. Báo cáo bằng kênh không liên quan đến máy bị sự cố.' },
        { t: 'Đăng vào nhóm Zalo cơ quan hỏi ai biết cách xử lý', s: 0, f: 'Lan truyền thông tin sự cố, gây hoang mang, có thể lộ ra ngoài.' },
        { t: 'Chờ đến cuối buổi xem máy có tự hết không', s: 0, f: 'Trì hoãn làm thiệt hại lan rộng.' } ] },
      { t: 'Một đồng nghiệp đề nghị: “Đăng nhập hệ thống văn bản trên máy anh mà làm tiếp, đổi mật khẩu sau.”', o: [
        { t: 'Đồng ý để kịp công việc', s: 1, f: 'Có thể tiếp tục công việc, nhưng mật khẩu có thể đã bị đánh cắp từ máy nhiễm. Cần đổi mật khẩu trước, từ thiết bị an toàn, theo hướng dẫn của bộ phận kỹ thuật.' },
        { t: 'Đổi mật khẩu từ thiết bị an toàn theo hướng dẫn, sau đó mới làm việc trên thiết bị được bố trí', s: 2, f: 'Đúng. Giả định mật khẩu trên máy nhiễm đã bị lộ.' } ] }
    ]},
    { id: 'account', name: 'Tài khoản Zalo bị chiếm', steps: [
      { t: 'Đồng nghiệp gọi điện báo: tài khoản Zalo của đồng chí đang nhắn tin mượn tiền nhiều người trong danh bạ.', o: [
        { t: 'Mở Zalo trên điện thoại chính chủ, đổi mật khẩu, đăng xuất khỏi các thiết bị khác', s: 2, f: 'Đúng. Giành lại quyền kiểm soát tài khoản là việc đầu tiên.' },
        { t: 'Bỏ qua vì mọi người sẽ tự biết là lừa đảo', s: 0, f: 'Nhiều người vẫn có thể chuyển tiền vì tin tưởng.' } ] },
      { t: 'Cần thông báo cho người trong danh bạ thế nào?', o: [
        { t: 'Thông báo qua kênh khác: gọi điện, nhắn qua tài khoản khác, nhờ đồng nghiệp báo trong nhóm cơ quan', s: 2, f: 'Đúng. Kẻ gian có thể xóa cảnh báo gửi từ chính tài khoản bị chiếm.' },
        { t: 'Chỉ đăng một dòng trạng thái trên chính tài khoản đó', s: 1, f: 'Có ích nhưng chưa đủ; kẻ gian có thể xóa, và nhiều người không xem trạng thái.' } ] },
      { t: 'Tài khoản này là thành viên của ba nhóm công việc có trao đổi tài liệu.', o: [
        { t: 'Báo quản trị các nhóm tạm xóa tài khoản khỏi nhóm và báo đầu mối an toàn thông tin', s: 2, f: 'Đúng. Ngăn kẻ gian đọc hoặc phát tán tài liệu trong nhóm.' },
        { t: 'Không cần làm gì vì nhóm chỉ có người trong cơ quan', s: 0, f: 'Kẻ gian đang nắm tài khoản của một thành viên trong nhóm.' } ] },
      { t: 'Đã lấy lại tài khoản. Việc cuối cùng?', o: [
        { t: 'Bật mã khóa, kiểm tra thiết bị đăng nhập, dùng mật khẩu riêng không trùng tài khoản khác', s: 2, f: 'Đúng. Ngăn sự việc lặp lại.' },
        { t: 'Giữ nguyên cài đặt cũ', s: 0, f: 'Nguyên nhân chưa được khắc phục.' } ] }
    ]},
    { id: 'leak', name: 'Gửi nhầm dữ liệu cá nhân', steps: [
      { t: 'Đồng chí phát hiện đã gửi nhầm tệp danh sách 300 hộ kèm số định danh cá nhân vào nhóm Zalo khu dân cư có hơn 500 thành viên, cách đây 5 phút.', o: [
        { t: 'Thu hồi tin nhắn ngay, ghi lại thời điểm và số người đã xem (nếu có)', s: 2, f: 'Đúng. Ngừng phát tán và ghi nhận phạm vi.' },
        { t: 'Im lặng để không ai chú ý', s: 0, f: 'Che giấu sự cố là vi phạm và làm mất cơ hội hạn chế thiệt hại.' },
        { t: 'Nhắn vào nhóm: “ai tải về thì xóa đi”', s: 1, f: 'Cần thiết nhưng chưa đủ: trước hết phải thu hồi tin nhắn và báo cáo.' } ] },
      { t: 'Tin nhắn đã được thu hồi. Tiếp theo?', o: [
        { t: 'Báo cáo lãnh đạo và đầu mối an toàn thông tin: dữ liệu gì, bao nhiêu người, thời gian hiển thị', s: 2, f: 'Đúng. Cơ quan cần thông tin này để thực hiện nghĩa vụ theo quy định về bảo vệ dữ liệu cá nhân.' },
        { t: 'Không cần báo vì đã thu hồi', s: 0, f: 'Có người đã có thể tải tệp trước khi thu hồi.' } ] },
      { t: 'Một người dân nhắn hỏi: “Dữ liệu của nhà tôi có bị lộ không?”', o: [
        { t: 'Trả lời theo nội dung thống nhất của cơ quan, ghi nhận thông tin liên hệ', s: 2, f: 'Đúng. Không tự đưa thông tin theo ý cá nhân.' },
        { t: 'Khẳng định không có gì xảy ra', s: 0, f: 'Thông tin sai sự thật làm mất niềm tin khi sự việc được xác minh.' } ] },
      { t: 'Phòng ngừa lần sau?', o: [
        { t: 'Gửi dữ liệu cá nhân qua kênh công vụ, chỉ các trường cần thiết; không lưu tệp dữ liệu lẫn với tệp thông thường', s: 2, f: 'Đúng. Loại bỏ nguyên nhân gốc.' },
        { t: 'Kiểm tra kỹ hơn trước khi bấm gửi trên Zalo', s: 1, f: 'Có ích nhưng không giải quyết được nguyên nhân: dữ liệu này không nên đi qua Zalo.' } ] }
    ]}
  ];
})(window.ATTT);
