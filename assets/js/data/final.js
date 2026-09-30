/* Bài kiểm tra thực hành cuối khóa: 10 phần, tổng 100 điểm. Nội dung, tên, địa chỉ là giả định.
   Trong các phần "spot": <span class="sp" data-ok="1" data-why="..."> là dấu hiệu cần tìm; data-ok="0" là phần bình thường. */
(function (A) {
  const onestop = '' +
    '<rect width="800" height="480" fill="#E9EDF3"/><rect y="400" width="800" height="80" fill="#D5DBE4"/>' +
    '<rect x="280" y="18" width="240" height="42" rx="6" fill="#1E3A6B"/><text x="400" y="45" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">BỘ PHẬN MỘT CỬA</text>' +
    /* tủ hồ sơ mở, chìa khóa cắm */
    '<rect x="22" y="120" width="104" height="280" fill="#9AA6B8" stroke="#6F7B90" stroke-width="2"/><rect x="30" y="130" width="88" height="262" fill="#5B6675"/>' +
    '<g fill="#F1D9A8" stroke="#B08A4A"><rect x="36" y="150" width="16" height="50"/><rect x="54" y="146" width="16" height="54"/><rect x="72" y="152" width="16" height="48"/><rect x="36" y="230" width="16" height="50"/><rect x="54" y="226" width="16" height="54"/><rect x="90" y="228" width="16" height="52"/></g>' +
    '<path d="M126 120 L168 132 L168 388 L126 400 Z" fill="#B8C2D0" stroke="#6F7B90" stroke-width="2"/><circle cx="160" cy="258" r="4" fill="#15233B"/><path d="M160 258 h18 m-6 0 v6 m-5 -6 v5" stroke="#D4A017" stroke-width="3" fill="none"/>' +
    /* quầy */
    '<rect x="186" y="290" width="614" height="14" fill="#8B6A4E"/><rect x="186" y="304" width="614" height="96" fill="#C9B79C"/>' +
    /* màn hình hướng ra ngoài */
    '<rect x="200" y="146" width="160" height="136" rx="6" fill="#223049"/><rect x="208" y="154" width="144" height="112" fill="#F4F7FB"/><rect x="208" y="154" width="144" height="16" fill="#1E3A6B"/><text x="214" y="166" font-size="9" fill="#fff">Hồ sơ công dân</text>' +
    '<text x="214" y="186" font-size="10" font-weight="700" fill="#15233B">Nguyễn Thị Hạnh</text><text x="214" y="202" font-size="9" fill="#15233B">Số định danh: 086190…</text><text x="214" y="216" font-size="9" fill="#15233B">Điện thoại: 0918 …</text><text x="214" y="230" font-size="9" fill="#15233B">Địa chỉ: ấp Phú Hòa</text><rect x="214" y="240" width="60" height="16" rx="2" fill="#0C6B57"/><text x="220" y="251" font-size="8" fill="#fff">Đang xử lý</text>' +
    '<rect x="272" y="282" width="16" height="8" fill="#223049"/>' +
    /* thiết bị ký số + mã PIN */
    '<rect x="366" y="248" width="40" height="42" rx="3" fill="#3A4A66"/><rect x="404" y="262" width="26" height="10" rx="2" fill="#E07A1F"/><g transform="rotate(-6 440 246)"><rect x="416" y="228" width="50" height="26" fill="#FFE56B" stroke="#E0C443"/><text x="421" y="245" font-size="10" font-weight="700" fill="#15233B">PIN 1234</text></g>' +
    /* điện thoại chụp căn cước */
    '<rect x="470" y="280" width="64" height="10" rx="2" fill="#7FB3E6" stroke="#3A6EA5"/><g transform="rotate(-12 500 230)"><rect x="484" y="196" width="34" height="60" rx="5" fill="#223049"/><circle cx="501" cy="206" r="4" fill="#9AA6B8"/></g><path d="M478 262 l-10 -6 M526 254 l10 -8 M500 266 v8" stroke="#D4A017" stroke-width="2"/>' +
    /* mã QR bị dán đè */
    '<rect x="556" y="226" width="54" height="64" rx="3" fill="#fff" stroke="#9AA6B8"/><g fill="#15233B"><rect x="562" y="232" width="12" height="12"/><rect x="592" y="232" width="12" height="12"/><rect x="562" y="262" width="12" height="12"/><rect x="580" y="250" width="6" height="6"/></g><g transform="rotate(8 590 262)"><rect x="574" y="244" width="36" height="36" fill="#fff" stroke="#B4152B" stroke-dasharray="3 2"/><g fill="#333"><rect x="578" y="248" width="9" height="9"/><rect x="597" y="248" width="9" height="9"/><rect x="578" y="267" width="9" height="9"/><rect x="592" y="262" width="5" height="5"/></g></g><text x="560" y="222" font-size="9" fill="#15233B">Quét mã nộp phí</text>' +
    /* chồng hồ sơ của người khác */
    '<g><rect x="628" y="274" width="84" height="16" fill="#F1D9A8" stroke="#B08A4A"/><rect x="632" y="262" width="80" height="14" fill="#EFD095" stroke="#B08A4A"/><rect x="626" y="250" width="84" height="14" fill="#F1D9A8" stroke="#B08A4A"/><text x="632" y="261" font-size="8.5" fill="#15233B">Hồ sơ: Trần Văn B</text></g>' +
    /* công dân */
    '<circle cx="758" cy="176" r="24" fill="#C78E6B"/><path d="M718 290 C718 222 798 222 798 290 Z" fill="#4E7AC7"/>' +
    /* sọt rác có bản photo căn cước */
    '<path d="M196 412 h64 l-8 60 h-48 z" fill="#8C97A8"/><rect x="204" y="396" width="26" height="20" fill="#fff" stroke="#9AA6B8" transform="rotate(-14 217 406)"/><rect x="208" y="400" width="12" height="8" fill="#7FB3E6" transform="rotate(-14 217 406)"/><rect x="228" y="392" width="26" height="22" fill="#fff" stroke="#9AA6B8" transform="rotate(10 241 403)"/><rect x="232" y="396" width="12" height="8" fill="#7FB3E6" transform="rotate(10 241 403)"/>';

  A.data.finalTasks = [
    { id: 'p1', type: 'scene', skill: 'Rủi ro tại nơi làm việc', icon: 'building', pts: 12,
      title: 'Bộ phận một cửa có 7 điểm mất an toàn',
      ask: 'Bấm vào tất cả những vị trí đồng chí cho là vi phạm an toàn thông tin. Khi xong, bấm “Chấm phần này”.',
      art: onestop, spots: [
        { x: 280, y: 212, r: 62, t: 'Màn hình hiển thị dữ liệu công dân quay ra phía người khác', d: 'Người đứng ở quầy đọc được họ tên, số định danh, điện thoại của công dân khác.' },
        { x: 500, y: 250, r: 36, t: 'Điện thoại cá nhân chụp căn cước công dân', d: 'Ảnh giấy tờ nằm trên điện thoại, tự đồng bộ lên đám mây cá nhân.' },
        { x: 668, y: 268, r: 42, t: 'Hồ sơ của người khác để trong tầm với của công dân', d: 'Hồ sơ chưa xử lý phải cất khỏi quầy tiếp dân.' },
        { x: 228, y: 420, r: 44, t: 'Bản photo căn cước hỏng bỏ vào sọt rác', d: 'Phải hủy bằng máy hủy tài liệu hoặc theo quy trình của cơ quan.' },
        { x: 420, y: 256, r: 36, t: 'Thiết bị ký số cắm sẵn, dán kèm mã PIN', d: 'Ai cũng có thể ký văn bản thay người được cấp.' },
        { x: 584, y: 256, r: 34, t: 'Mã QR nộp phí bị dán đè', d: 'Tiền của người dân chuyển vào tài khoản của kẻ gian.' },
        { x: 146, y: 250, r: 56, t: 'Tủ hồ sơ mở, chìa khóa cắm sẵn', d: 'Tủ hồ sơ phải khóa khi không sử dụng; chìa khóa do người được giao giữ.' }
      ] },
    { id: 'p2', type: 'spot', skill: 'Nhận diện lừa đảo', icon: 'mail', pts: 10, per: 2,
      title: 'Thư điện tử có 5 dấu hiệu nguy hiểm',
      ask: 'Bấm vào những chi tiết là dấu hiệu giả mạo. Bấm nhầm chi tiết bình thường sẽ bị trừ điểm.',
      html: '<div class="fm fm-mail"><div class="fm-head"><div class="fm-subj"><span class="sp" data-ok="1" data-why="Tạo áp lực thời gian: “khẩn”, “trong ngày”.">[KHẨN] Rà soát lý lịch đảng viên trong ngày hôm nay</span></div>' +
        '<div class="fm-meta">Từ: <span class="sp" data-ok="0">Ban Tổ chức Tỉnh ủy</span> &lt;<span class="sp" data-ok="1" data-why="Cơ quan Đảng không dùng hộp thư Gmail cá nhân.">bantochuc.vinhlong@gmail.com</span>&gt;</div>' +
        '<div class="fm-meta">Lúc <span class="sp" data-ok="0">08:12, 01/10/2026</span></div></div>' +
        '<div class="fm-body"><p><span class="sp" data-ok="0">Kính gửi các đồng chí,</span></p><p>Để hoàn thiện hồ sơ, đề nghị đồng chí truy cập <span class="sp fm-link" data-ok="1" data-real="http://ly-lich-dv.top/login" data-why="Chữ hiển thị là .gov.vn nhưng địa chỉ thật là ly-lich-dv.top.">https://dangvien.vinhlong.gov.vn</span> và <span class="sp" data-ok="1" data-why="Không cơ quan nào yêu cầu nhập mật khẩu qua đường liên kết trong thư.">đăng nhập bằng mật khẩu thư điện tử công vụ để xác thực</span>.</p>' +
        '<p><span class="sp" data-ok="0">Trân trọng,</span><br><span class="sp" data-ok="0">Văn phòng Ban Tổ chức</span></p></div>' +
        '<div class="fm-att">Tệp đính kèm: <span class="sp" data-ok="1" data-why="Tệp .docm chứa macro, có thể tự chạy mã độc.">LyLich_DangVien.docm</span></div></div>' },
    { id: 'p3', type: 'spot', skill: 'Nhận diện lừa đảo', icon: 'chat', pts: 10, per: 2.5,
      title: 'Tin nhắn Zalo “từ lãnh đạo” có 4 dấu hiệu lừa đảo',
      ask: 'Bấm vào 4 chi tiết cho thấy đây là tài khoản giả mạo. Bấm nhầm bị trừ điểm.',
      html: '<div class="fm fm-phone"><div class="fm-top"><span class="sp" data-ok="0">Nguyễn Văn Bình</span> <span class="sp" data-ok="1" data-why="Tài khoản mới, không có bạn chung, không có lịch sử trò chuyện.">Người lạ – chưa là bạn bè</span></div>' +
        '<div class="fm-sys"><span class="sp" data-ok="1" data-why="Cuộc gọi video vài giây, hình mờ, tự ngắt: dấu hiệu dùng video giả mạo khuôn mặt.">Cuộc gọi video 4 giây – hình mờ, tự ngắt</span></div>' +
        '<div class="fm-in"><span class="sp" data-ok="0">Chào em.</span> Mạng yếu quá, anh không nghe rõ.</div>' +
        '<div class="fm-in"><span class="sp" data-ok="1" data-why="Yêu cầu chuyển tiền gấp vào tài khoản người khác.">Em chuyển gấp giúp anh 50 triệu vào tài khoản Lê Thị C</span>, chiều anh gửi lại.</div>' +
        '<div class="fm-in"><span class="sp" data-ok="1" data-why="Ngăn cản việc xác minh qua kênh thứ hai.">Anh đang họp, đừng gọi, cứ nhắn thôi.</span></div>' +
        '<div class="fm-time"><span class="sp" data-ok="0">10:42</span></div></div>' },
    { id: 'p4', type: 'domain', skill: 'Nhận diện lừa đảo', icon: 'link', pts: 8, per: 2,
      title: 'Tìm tên miền thật của 4 đường liên kết',
      ask: 'Với mỗi địa chỉ, bấm vào phần là tên miền thật (nơi trình duyệt thực sự truy cập).',
      urls: [
        { seg: ['https://', 'vinhlong.', 'gov.', 'vn.', 'cap-nhat-hoso.com', '/dang-nhap'], a: 4, v: 'Giả mạo: “vinhlong.gov.vn” chỉ là tên miền con của cap-nhat-hoso.com.' },
        { seg: ['http://', 'dichvucong.gov.vn@', '45.76.1.20', '/thanhtoan'], a: 2, v: 'Giả mạo: phần trước dấu @ bị bỏ qua; trình duyệt truy cập địa chỉ IP lạ.' },
        { seg: ['https://', 'mail.', 'vinhlong.gov.vn', '/owa'], a: 2, v: 'Hợp lệ: tên miền thật là vinhlong.gov.vn.' },
        { seg: ['https://', 'zalo.', 'me.', 'xacminh-taikhoan.top', '/login'], a: 3, v: 'Giả mạo: tên miền thật là xacminh-taikhoan.top.' }
      ] },
    { id: 'p5', type: 'tiles', skill: 'Nhận diện lừa đảo', icon: 'box', pts: 8, per: 1,
      title: 'Chọn tất cả tệp đính kèm nguy hiểm',
      ask: 'Bấm để đánh dấu những tệp không được mở. Tệp không đánh dấu được coi là có thể mở sau khi xác minh người gửi.',
      items: [
        { t: 'BienBan_HopChiBo.pdf', bad: false, why: 'Tài liệu PDF thông thường.' },
        { t: 'CongVan_2026.pdf.exe', bad: true, why: 'Đuôi thật .exe – chương trình chạy.' },
        { t: 'Anh_HoiNghi.jpg', bad: false, why: 'Tệp ảnh thông thường.' },
        { t: 'TaiLieu.rar (có mật khẩu)', bad: true, why: 'Tệp nén có mật khẩu né phần mềm quét.' },
        { t: 'SoTayDangVien.apk', bad: true, why: 'Bộ cài ứng dụng ngoài kho chính thức.' },
        { t: 'BaoCao_Quy3.docm', bad: true, why: 'Tài liệu chứa macro.' },
        { t: 'KeHoach_Thang10.xlsx', bad: false, why: 'Bảng tính thông thường.' },
        { t: 'HuongDan.pdf.lnk', bad: true, why: 'Tệp lối tắt có thể chạy lệnh ẩn.' }
      ] },
    { id: 'p6', type: 'assign', skill: 'Phân loại, bảo vệ dữ liệu', icon: 'folder', pts: 10, per: 10 / 6,
      title: 'Đóng dấu cấp độ cho 6 tài liệu',
      ask: 'Chọn con dấu phù hợp cho từng tài liệu.',
      bins: ['Công khai', 'Nội bộ', 'Hạn chế', 'Bí mật nhà nước'],
      items: [
        { t: 'Lịch tiếp công dân đã niêm yết', a: 0 },
        { t: 'Dự thảo báo cáo chưa ban hành', a: 1 },
        { t: 'Danh sách người có công kèm số định danh', a: 2 },
        { t: 'Mật khẩu hệ thống quản lý văn bản', a: 2 },
        { t: 'Tài liệu đã đóng dấu “Tối mật”', a: 3 },
        { t: 'Thông báo tuyển dụng đã đăng cổng thông tin', a: 0 }
      ] },
    { id: 'p7', type: 'order', skill: 'Tài khoản, mật khẩu, OTP', icon: 'key', pts: 6, per: 1.5,
      title: 'Xếp mật khẩu từ yếu nhất đến mạnh nhất',
      ask: 'Bấm lần lượt các mật khẩu theo thứ tự từ yếu nhất đến mạnh nhất.',
      mono: true,
      items: ['12345678', 'Vinhlong@2026', 'Kx7#pQ2m', 'song-hau-mua-nuoc-noi-47#'],
      notes: ['Nằm trong danh sách mật khẩu phổ biến: dò ra tức thì.', 'Đủ chữ hoa, số, ký hiệu nhưng chứa tên địa phương và năm: dò ra trong vài giây.', 'Ngẫu nhiên nhưng chỉ 8 ký tự.', 'Cụm mật khẩu dài: hàng nghìn năm để dò.'] },
    { id: 'p8', type: 'spot', skill: 'Phân loại, bảo vệ dữ liệu', icon: 'ai', pts: 10, per: 2,
      title: 'Yêu cầu gửi cho AI có 5 thông tin không được đưa vào',
      ask: 'Bấm vào những thông tin phải xóa hoặc thay bằng ký hiệu trước khi gửi cho công cụ trí tuệ nhân tạo công cộng.',
      html: '<div class="fm fm-ai"><div class="fm-ai-h">Nhập yêu cầu cho công cụ trí tuệ nhân tạo</div><p><span class="sp" data-ok="0">Soạn giúp tôi thông báo</span> gửi <span class="sp" data-ok="0">các hộ dân ấp Phú Hòa</span>: <span class="sp" data-ok="1" data-why="Họ tên công dân.">bà Lê Thị Mai</span>, số định danh <span class="sp" data-ok="1" data-why="Số định danh cá nhân.">086192004321</span>, điện thoại <span class="sp" data-ok="1" data-why="Số điện thoại cá nhân.">0939 111 222</span> được bổ sung vào danh sách hỗ trợ; <span class="sp" data-ok="1" data-why="Họ tên người liên quan.">ông Phan Văn Tư</span> <span class="sp" data-ok="1" data-why="Thông tin kỷ luật là thông tin nhạy cảm, không được đưa ra ngoài.">đang bị xem xét kỷ luật</span>. <span class="sp" data-ok="0">Văn phong trang trọng</span>, <span class="sp" data-ok="0">khoảng 150 chữ</span>.</p><div class="fm-ai-send">Gửi</div></div>' },
    { id: 'p9', type: 'order', skill: 'Xử lý sự cố', icon: 'alert', pts: 8, per: 1.6,
      title: 'Máy tính hiện thông báo đòi tiền chuộc: sắp xếp 5 việc cần làm',
      ask: 'Bấm lần lượt các việc theo đúng trình tự xử lý ban đầu.',
      items: ['Ngừng mọi thao tác trên máy', 'Rút dây mạng, tắt Wi-Fi; không tắt nguồn', 'Chụp lại màn hình, ghi thời điểm và tệp đã mở', 'Gọi điện báo lãnh đạo và đầu mối an toàn thông tin', 'Làm theo hướng dẫn của bộ phận chuyên môn'],
      icons: ['stop', 'plug', 'camera', 'call', 'team'],
      notes: ['Dừng', 'Cô lập', 'Ghi nhận', 'Báo cáo', 'Phối hợp'] },
    { id: 'p10', type: 'dialog', skill: 'Tài khoản, mật khẩu, OTP', icon: 'call', pts: 10,
      title: 'Cuộc gọi xin mã OTP: chọn câu trả lời',
      ask: 'Chọn câu trả lời của đồng chí ở mỗi lượt.',
      caller: 'Tự xưng: Cán bộ kỹ thuật, Phòng CĐS',
      turns: [
        { say: 'Chào anh, hệ thống thư công vụ đang nâng cấp. Em vừa gửi mã xác nhận về điện thoại anh, anh đọc giúp em 6 số để giữ tài khoản nhé.', pts: 3,
          o: [ { t: 'Mã là 4-8-2… để tôi đọc tiếp.', ok: false }, { t: 'Tôi không cung cấp mã OTP cho ai. Tôi sẽ gọi lại Phòng qua số trong danh bạ cơ quan.', ok: true }, { t: 'Để tôi chụp màn hình tin nhắn gửi qua Zalo cho em.', ok: false } ] },
        { say: 'Anh không đọc thì tài khoản bị khóa ngay, lãnh đạo đang cần văn bản gấp đó anh.', pts: 3,
          o: [ { t: 'Thôi được, tôi đọc cho nhanh.', ok: false }, { t: 'Nếu bị khóa, tôi sẽ liên hệ trực tiếp để mở lại. Tôi kết thúc cuộc gọi.', ok: true } ] },
        { say: '(Cuộc gọi đã kết thúc.) Việc tiếp theo của đồng chí là gì?', pts: 4,
          o: [ { t: 'Không làm gì thêm vì chưa mất gì.', ok: false }, { t: 'Báo đầu mối an toàn thông tin; kiểm tra thiết bị đăng nhập; đổi mật khẩu vì mật khẩu có thể đã lộ.', ok: true }, { t: 'Đăng lên mạng xã hội cảnh báo kèm số điện thoại người gọi.', ok: false } ] }
      ] }
    ,{ id: 'p11', type: 'spot', skill: 'Sử dụng AI an toàn', icon: 'ai', pts: 8, per: 2,
      title: 'Câu trả lời của AI có 4 điểm sai',
      ask: 'Cán bộ hỏi AI về việc sử dụng AI trong cơ quan. Bấm vào 4 câu sai (ảo giác, kiến thức lỗi thời, thiên lệch, nội dung trái quy định). Bấm nhầm bị trừ điểm.',
      html: '<div class="fm fm-ai"><div class="fm-ai-h">Câu trả lời của công cụ trí tuệ nhân tạo (mô phỏng)</div><p>' +
        '<span class="sp" data-ok="0">Ứng dụng trí tuệ nhân tạo giúp nâng cao hiệu quả công việc của cán bộ.</span> ' +
        '<span class="sp" data-ok="1" data-why="Ảo giác: ngày 31/02 không tồn tại, số hiệu do AI tự tạo.">Theo Hướng dẫn số 99-HD/VPTW ngày 31/02/2025, cán bộ được dùng AI công cộng để tóm tắt tài liệu nội bộ.</span> ' +
        '<span class="sp" data-ok="1" data-why="Kiến thức lỗi thời: Luật An toàn thông tin mạng 2015 đã được thay thế bởi Luật An ninh mạng năm 2025 từ 01/7/2026.">Văn bản chính điều chỉnh vấn đề này hiện nay là Luật An toàn thông tin mạng năm 2015.</span> ' +
        '<span class="sp" data-ok="1" data-why="Trái quy định: tài liệu mật không được nhập lên nền tảng AI công cộng, kể cả khi đã xóa tên người.">Với tài liệu mật, chỉ cần xóa tên người là có thể đưa vào AI để xử lý nhanh hơn.</span> ' +
        '<span class="sp" data-ok="1" data-why="Thiên lệch: định kiến về giới và tuổi.">Nên giao việc ứng dụng AI cho cán bộ nam trẻ vì tiếp thu công nghệ nhanh hơn.</span> ' +
        '<span class="sp" data-ok="0">Người sử dụng cần kiểm chứng kết quả trước khi đưa vào văn bản.</span></p></div>' }
  ];
})(window.ATTT);
