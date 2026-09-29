/* Nội dung tám chủ đề. Mỗi chủ đề gồm: tình huống mở đầu, các khối nội dung (lý thuyết, học liệu tương tác), ghi nhớ.
   Các loại khối: prose, points, table, note, rules, widget, reflect. */
(function (A) {
  A.data.topics = [
  /* ---------------- CHỦ ĐỀ 1 ---------------- */
  {
    n: 1, session: 'Buổi sáng', time: '08:20 – 09:00',
    title: 'An toàn thông tin trong hoạt động của cơ quan Đảng và chính quyền',
    format: 'Thuyết trình có minh họa; phân tích vụ việc',
    goals: [1, 10],
    lead: 'Hiểu an toàn thông tin là gì, vì sao mỗi cán bộ, công chức là một lớp bảo vệ của cơ quan, và điều gì xảy ra khi lớp bảo vệ đó không được duy trì.',
    hook: { title: 'Tình huống mở đầu', text: 'Tám giờ sáng thứ Hai, máy tính của bộ phận văn thư một Đảng ủy xã hiện thông báo: toàn bộ tệp đã bị mã hóa. Hồ sơ chuẩn bị đại hội chi bộ, danh sách đảng viên, văn bản chờ ký số đều không mở được. Cùng lúc, công dân đang chờ giải quyết thủ tục tại bộ phận một cửa. Cơ quan mất gì, và điều gì đã xảy ra trước đó?', note: 'Tình huống mô phỏng, tổng hợp từ các dạng sự cố thường gặp.' },
    blocks: [
      { type: 'prose', title: 'An toàn thông tin là gì', body: [
        'An toàn thông tin là việc bảo vệ thông tin và hệ thống thông tin tránh bị truy nhập, sử dụng, tiết lộ, gián đoạn, sửa đổi hoặc phá hoại trái phép. Mục đích cuối cùng là bảo đảm ba thuộc tính cốt lõi của thông tin: tính bí mật, tính toàn vẹn và tính sẵn sàng.',
        'Trong cơ quan Đảng và chính quyền, thông tin cần bảo vệ không chỉ nằm trên máy chủ. Thông tin nằm trên máy tính cá nhân, điện thoại, hộp thư, nhóm trao đổi, tài liệu in và cả trong trí nhớ của cán bộ. Vì vậy, an toàn thông tin trước hết là thói quen làm việc của từng người.'
      ]},
      { type: 'widget', name: 'cia', title: 'Ba thuộc tính cốt lõi', intro: 'Chọn từng thuộc tính để xem ví dụ khi bị xâm phạm và hệ quả tương ứng. Sau đó chạy mô phỏng sự cố mã độc tống tiền để thấy một sự cố có thể xâm phạm cả ba thuộc tính cùng lúc.' },
      { type: 'points', title: 'Bốn nhóm hệ quả khi xảy ra sự cố', items: [
        { t: 'Pháp lý', i: 'scale', d: 'Cá nhân, tập thể có thể bị xem xét trách nhiệm, xử lý kỷ luật, xử phạt hành chính hoặc truy cứu trách nhiệm hình sự khi làm lộ bí mật nhà nước, lộ dữ liệu cá nhân của công dân.' },
        { t: 'Chính trị', i: 'flag', d: 'Thông tin nội bộ, nhân sự, tài liệu chưa công bố bị khai thác, xuyên tạc; ảnh hưởng đến sự lãnh đạo, chỉ đạo và niềm tin của nhân dân.' },
        { t: 'Uy tín', i: 'star', d: 'Tài khoản, trang thông tin của cơ quan bị chiếm để phát tán nội dung sai lệch; văn bản giả mạo lan truyền trên mạng xã hội.' },
        { t: 'Gián đoạn phục vụ', i: 'clock', d: 'Hệ thống ngừng hoạt động, hồ sơ không truy xuất được; thủ tục hành chính của người dân bị chậm trễ.' }
      ]},
      { type: 'widget', name: 'human', title: 'Vai trò của yếu tố con người', intro: 'Phần lớn sự cố không bắt đầu từ một lỗi kỹ thuật phức tạp, mà từ một thao tác của con người: bấm vào đường liên kết, cung cấp mã OTP, dùng lại mật khẩu, gửi nhầm tệp.' },
      { type: 'widget', name: 'reveal', title: 'Phân tích vụ việc', intro: 'Thảo luận theo bàn trong 5 phút cho mỗi tình huống, sau đó mở gợi ý đáp án để đối chiếu.', opts: { cases: [
        { title: 'Tình huống 1. Máy tính văn thư bị mã hóa dữ liệu', text: 'Ba ngày trước sự cố, cán bộ văn thư nhận thư điện tử tiêu đề “Công văn khẩn về việc rà soát đảng viên”, tệp đính kèm dạng nén. Cán bộ mở tệp nhưng không thấy nội dung, nghĩ là lỗi nên bỏ qua. Máy tính dùng chung ổ lưu trữ với ba máy khác; bản sao lưu duy nhất nằm trên ổ cứng gắn cố định vào máy.', qs: [
          { q: 'Thuộc tính nào bị xâm phạm?', a: 'Tính sẵn sàng bị xâm phạm trực tiếp. Nếu kẻ tấn công đã sao chép dữ liệu trước khi mã hóa, tính bí mật cũng bị xâm phạm.' },
          { q: 'Nguyên nhân gốc là gì?', a: 'Mở tệp đính kèm không rõ nguồn gốc và không báo cáo khi thấy hiện tượng lạ; sao lưu không tách rời khỏi máy nên bị mã hóa cùng lúc.' },
          { q: 'Biện pháp phòng ngừa?', a: 'Xác minh thư qua kênh thứ hai trước khi mở tệp; báo cáo ngay khi mở nhầm; sao lưu theo nguyên tắc có ít nhất một bản tách rời, ngoại tuyến.' }
        ]},
        { title: 'Tình huống 2. Văn bản giả mạo lan truyền', text: 'Một hình ảnh “thông báo” mang tên cơ quan, có con dấu và chữ ký, được chia sẻ trên nhiều nhóm mạng xã hội. Nội dung sai sự thật. Hình ảnh được cắt ghép từ một văn bản thật mà trước đó một cán bộ đã chụp gửi vào nhóm Zalo có người ngoài cơ quan.', qs: [
          { q: 'Thuộc tính nào bị xâm phạm?', a: 'Tính toàn vẹn (nội dung bị sửa đổi) và tính bí mật (văn bản nội bộ bị đưa ra ngoài).' },
          { q: 'Hệ quả chủ yếu?', a: 'Hệ quả chính trị và uy tín: gây hoang mang dư luận, ảnh hưởng niềm tin đối với cơ quan.' },
          { q: 'Biện pháp phòng ngừa?', a: 'Không chụp văn bản gửi qua kênh không được phép; gửi nhận văn bản qua hệ thống quản lý văn bản và điều hành; kiểm soát thành viên nhóm trao đổi.' }
        ]},
        { title: 'Tình huống 3. Tài khoản bị chiếm và nhắn tin mượn tiền', text: 'Một cán bộ dùng cùng một mật khẩu cho tài khoản thư điện tử công vụ, Zalo và một trang mua sắm. Trang mua sắm bị lộ dữ liệu. Vài ngày sau, tài khoản Zalo của cán bộ nhắn tin mượn tiền nhiều đồng nghiệp.', qs: [
          { q: 'Thuộc tính nào bị xâm phạm?', a: 'Tính bí mật của thông tin xác thực, sau đó là tính toàn vẹn của danh tính: người khác đang giả danh cán bộ.' },
          { q: 'Nguyên nhân gốc là gì?', a: 'Dùng lại một mật khẩu cho nhiều tài khoản; không bật xác thực hai lớp.' },
          { q: 'Biện pháp phòng ngừa?', a: 'Mỗi tài khoản một mật khẩu riêng; bật xác thực hai lớp; kiểm tra định kỳ các thiết bị đang đăng nhập.' }
        ]}
      ]}}
    ],
    takeaways: [
      'An toàn thông tin là bảo đảm tính bí mật, tính toàn vẹn, tính sẵn sàng của thông tin.',
      'Một sự cố có thể gây hệ quả pháp lý, chính trị, uy tín và làm gián đoạn phục vụ người dân.',
      'Phần lớn sự cố bắt đầu từ một thao tác của con người. Mỗi cán bộ là một lớp bảo vệ của cơ quan.'
    ],
    reflect: 'Nếu máy tính của đồng chí ngừng hoạt động ngay bây giờ, công việc nào của cơ quan bị dừng lại, và dữ liệu nào không thể khôi phục?'
  },
  /* ---------------- CHỦ ĐỀ 2 ---------------- */
  {
    n: 2, session: 'Buổi sáng', time: '09:00 – 09:40',
    title: 'Nhận diện và phân loại thông tin, dữ liệu cần bảo vệ',
    format: 'Thảo luận nhóm; lập bảng phân loại của đơn vị',
    goals: [2, 3],
    lead: 'Không thể bảo vệ tốt những gì chưa biết mình đang có. Chủ đề này giúp lập danh mục tài sản thông tin, phân loại theo bốn cấp độ và xác định dữ liệu công vụ đang thực sự nằm ở đâu.',
    hook: { title: 'Tình huống mở đầu', text: 'Một chuyên viên cần gửi gấp danh sách hộ được hỗ trợ, kèm số định danh cá nhân, cho cán bộ các ấp. Cách nhanh nhất là chụp màn hình và gửi vào nhóm Zalo chung. Cách làm đó sai ở điểm nào, và cách làm đúng là gì?' },
    blocks: [
      { type: 'points', title: 'Danh mục tài sản thông tin tại cơ quan, đơn vị', items: [
        { t: 'Văn bản, hồ sơ công vụ', i: 'file', d: 'Văn bản đi, đến; nghị quyết, biên bản họp; hồ sơ công tác xây dựng Đảng; hồ sơ đảng viên; tài liệu hội nghị.' },
        { t: 'Dữ liệu về người dân', i: 'idcard', d: 'Hồ sơ thủ tục hành chính; danh sách đối tượng chính sách, hộ nghèo; dữ liệu dân cư khai thác phục vụ công việc.' },
        { t: 'Tài khoản và phương tiện xác thực', i: 'key', d: 'Tài khoản hệ thống quản lý văn bản và điều hành, thư điện tử công vụ, hệ thống giải quyết thủ tục hành chính; thiết bị, mã PIN chữ ký số.' },
        { t: 'Thiết bị và vật mang tin', i: 'laptop', d: 'Máy tính, điện thoại dùng cho công việc, USB, ổ cứng ngoài, máy in, máy photocopy có bộ nhớ.' }
      ]},
      { type: 'widget', name: 'levels', title: 'Bốn cấp độ thông tin và cách ứng xử', intro: 'Mỗi cấp độ là một ngăn tủ hồ sơ. Bấm vào từng ngăn để xem ví dụ, ai được tiếp cận, gửi nhận bằng kênh nào.' },
      { type: 'note', kind: 'warn', title: 'Khi chưa rõ cấp độ', body: 'Bốn cấp độ trên là cách phân nhóm phục vụ ứng xử hằng ngày. Việc xác định bí mật nhà nước và độ mật do người có thẩm quyền quyết định theo Luật Bảo vệ bí mật nhà nước năm 2025; cán bộ không tự hạ độ mật. Khi chưa rõ, xử lý theo cấp độ cao hơn và hỏi ý kiến lãnh đạo.' },
      { type: 'widget', name: 'sort', title: 'Bài tập: phân loại thông tin', intro: 'Chọn một mục (hoặc kéo thả), sau đó chọn cấp độ phù hợp. Nếu chưa đúng, đọc gợi ý và thử lại.', opts: {
        bins: [
          { name: 'Công khai', tone: 'l0' }, { name: 'Nội bộ', tone: 'l1' }, { name: 'Hạn chế', tone: 'l2' }, { name: 'Bí mật nhà nước', tone: 'l3' }
        ],
        items: [
          { t: 'Lịch tiếp công dân đã niêm yết', bin: 0, why: 'Thông tin đã được công bố để người dân biết.' },
          { t: 'Thủ tục hành chính đăng trên cổng dịch vụ công', bin: 0, why: 'Đã công khai theo quy định.' },
          { t: 'Dự thảo nghị quyết chưa thông qua', bin: 1, why: 'Chưa ban hành, chỉ lưu hành nội bộ phục vụ góp ý.', hint: 'Nội dung này đã chính thức ban hành chưa?' },
          { t: 'Danh bạ điện thoại nội bộ cơ quan', bin: 1, why: 'Dùng trong cơ quan; nếu lộ ra ngoài dễ bị lợi dụng để lừa đảo, giả danh.' },
          { t: 'Biên bản sinh hoạt chi bộ thường kỳ', bin: 1, why: 'Tài liệu nội bộ của tổ chức đảng, không phổ biến ra ngoài.' },
          { t: 'Danh sách hộ nghèo kèm số định danh cá nhân', bin: 2, why: 'Chứa dữ liệu cá nhân của công dân; chỉ người được giao nhiệm vụ được tiếp cận.', hint: 'Danh sách có chứa số định danh cá nhân của công dân.' },
          { t: 'Hồ sơ thủ tục hành chính của công dân', bin: 2, why: 'Dữ liệu cá nhân, chỉ xử lý đúng mục đích giải quyết thủ tục.' },
          { t: 'Hồ sơ đảng viên', bin: 2, why: 'Chứa thông tin cá nhân, lý lịch; chỉ người được phân công quản lý tiếp cận.' },
          { t: 'Đơn tố cáo và thông tin người tố cáo', bin: 2, why: 'Thông tin người tố cáo phải được giữ bí mật theo quy định của pháp luật về tố cáo.' },
          { t: 'Mật khẩu tài khoản hệ thống quản lý văn bản', bin: 2, why: 'Thông tin xác thực; lộ ra là mất quyền kiểm soát tài khoản.' },
          { t: 'Tài liệu đã đóng dấu độ mật “Mật”', bin: 3, why: 'Đã được xác định độ mật, phải thực hiện theo Luật Bảo vệ bí mật nhà nước.', hint: 'Tài liệu đã có dấu chỉ độ mật.' },
          { t: 'Văn bản nhân sự đã được xác định độ “Tối mật”', bin: 3, why: 'Đã được người có thẩm quyền xác định độ mật.' }
        ] } },
      { type: 'note', kind: 'law', title: 'Quy định bắt buộc đối với tài liệu bí mật nhà nước', body: 'Luật Bảo vệ bí mật nhà nước năm 2025 (Luật số 117/2025/QH15, hiệu lực từ 01/3/2026) và Nghị định số 63/2026/NĐ-CP quy định các hành vi bị nghiêm cấm, trong đó có: làm lộ, chiếm đoạt, mua bán bí mật nhà nước; sao, chụp, lưu giữ, vận chuyển, giao nhận, tiêu hủy trái quy định; soạn thảo, lưu giữ, gửi, nhận bí mật nhà nước trên máy tính, thiết bị, mạng kết nối Internet. Luật năm 2025 cho phép soạn thảo, lưu giữ, gửi, nhận bí mật nhà nước trên <strong>Mạng LAN độc lập</strong> hoặc hệ thống được bảo vệ bằng mật mã theo quy định của pháp luật về cơ yếu; cán bộ chỉ sử dụng hệ thống, thiết bị do cơ quan bố trí cho mục đích này.' },
      { type: 'rules', variant: 'dont', title: 'Những việc tuyệt đối không làm với tài liệu mật', items: [
        'Soạn thảo, lưu giữ trên máy tính, thiết bị kết nối Internet hoặc mạng không được bố trí cho bí mật nhà nước.',
        'Chụp ảnh bằng điện thoại, dù chỉ để “xem lại cho tiện”.',
        'Gửi qua thư điện tử, Zalo, tin nhắn hoặc bất kỳ ứng dụng trực tuyến nào.',
        'Mang ra khỏi nơi lưu giữ khi chưa được người có thẩm quyền cho phép.',
        'Tự hủy tài liệu, bản nháp khi chưa đúng quy trình tiêu hủy.'
      ]},
      { type: 'widget', name: 'datamap', title: 'Dữ liệu công vụ của đồng chí đang nằm ở đâu?', intro: 'Chọn tất cả những nơi đồng chí đã từng lưu hoặc gửi dữ liệu công vụ trong tháng qua. Mức rủi ro sẽ được tính ngay.' },
      { type: 'widget', name: 'worksheet', title: 'Hoạt động nhóm: lập bảng phân loại của đơn vị', intro: 'Mỗi nhóm liệt kê ít nhất 8 loại thông tin, dữ liệu tại đơn vị mình, xác định cấp độ, nơi lưu và người được tiếp cận. Có thể tải bảng về dưới dạng tệp CSV để mở bằng Excel.' }
    ],
    takeaways: [
      'Lập danh mục trước, bảo vệ sau: văn bản, dữ liệu người dân, tài khoản, thiết bị.',
      'Bốn cấp độ: Công khai, Nội bộ, Hạn chế, Bí mật nhà nước. Chưa rõ thì xử lý theo cấp độ cao hơn.',
      'Tài liệu mật không bao giờ đi qua thiết bị, đường truyền kết nối Internet.',
      'Dữ liệu công vụ nằm càng nhiều nơi thì rủi ro càng lớn.'
    ],
    reflect: 'Trong điện thoại cá nhân của đồng chí hiện có bao nhiêu hình ảnh chụp văn bản, hồ sơ công việc?'
  },
  /* ---------------- CHỦ ĐỀ 3 ---------------- */
  {
    n: 3, session: 'Buổi sáng', time: '09:55 – 10:40',
    title: 'Rủi ro thường gặp khi sử dụng thiết bị, hộp thư điện tử, phần mềm công vụ và mạng xã hội',
    format: 'Thuyết trình; bài tập nhận diện lỗi qua hình ảnh',
    goals: [5, 10],
    lead: 'Nhận diện những thói quen phổ biến tạo ra lỗ hổng trên máy tính công vụ, điện thoại, hộp thư, phần mềm và khi truy cập Internet, mạng không dây công cộng.',
    hook: { title: 'Tình huống mở đầu', text: 'Hình minh họa dưới đây là bàn làm việc của một cán bộ vừa rời chỗ đi họp. Có ít nhất tám điểm mất an toàn. Đồng chí tìm được bao nhiêu điểm?' },
    blocks: [
      { type: 'widget', name: 'desk', title: 'Bài tập: tìm lỗi trên bàn làm việc', intro: 'Bấm vào những vị trí đồng chí cho là mất an toàn. Mỗi điểm tìm được sẽ hiện giải thích và cách khắc phục.' },
      { type: 'points', title: 'Rủi ro trên máy tính công vụ và thiết bị di động', items: [
        { t: 'Không khóa màn hình', i: 'lock', d: 'Người khác có thể đọc, sao chép, gửi đi dữ liệu chỉ trong vài giây. Khóa bằng tổ hợp phím Windows + L mỗi khi rời chỗ.' },
        { t: 'Phần mềm bẻ khóa, không rõ nguồn gốc', i: 'bug', d: 'Bộ cài phần mềm bẻ khóa bản quyền là con đường phổ biến để cài mã độc đánh cắp mật khẩu, điều khiển máy từ xa.' },
        { t: 'Không cập nhật hệ điều hành', i: 'refresh', d: 'Lỗ hổng đã công bố bị khai thác hàng loạt trên các máy chưa cập nhật bản vá.' },
        { t: 'USB, thiết bị lưu trữ không rõ nguồn gốc', i: 'usb', d: 'Lây mã độc giữa máy ở nhà và máy cơ quan; dễ thất lạc kèm dữ liệu.' },
        { t: 'Điện thoại vừa dùng cá nhân vừa dùng công việc', i: 'phone', d: 'Ảnh chụp văn bản tự đồng bộ lên dịch vụ lưu trữ đám mây cá nhân; ứng dụng lạ được cấp quyền đọc tin nhắn, danh bạ.' }
      ]},
      { type: 'points', title: 'Rủi ro khi sử dụng hộp thư điện tử và phần mềm công vụ', items: [
        { t: 'Dùng chung tài khoản', i: 'users', d: 'Không xác định được ai đã thao tác; một người để lộ mật khẩu thì cả nhóm bị ảnh hưởng.' },
        { t: 'Lưu mật khẩu trên trình duyệt ở máy dùng chung', i: 'key', d: 'Người dùng tiếp theo đăng nhập được mà không cần biết mật khẩu.' },
        { t: 'Dùng thư điện tử cá nhân cho công việc', i: 'mail', d: 'Dữ liệu công vụ nằm ngoài sự quản lý của cơ quan, không kiểm soát được khi cán bộ chuyển công tác.' },
        { t: 'Chuyển tiếp tự động thư công vụ sang hộp thư cá nhân', i: 'share', d: 'Toàn bộ thư công vụ bị sao chép ra ngoài mà người dùng không để ý.' }
      ]},
      { type: 'points', title: 'Rủi ro khi sử dụng mạng xã hội, Internet và mạng không dây công cộng', items: [
        { t: 'Công khai quá nhiều thông tin', i: 'eye', d: 'Chức vụ, lịch công tác, ảnh văn bản, ảnh phòng làm việc là nguyên liệu để kẻ gian dựng kịch bản giả danh.' },
        { t: 'Mạng Wi-Fi công cộng, Wi-Fi giả mạo', i: 'wifi', d: 'Kẻ gian cùng mạng có thể quan sát lưu lượng không mã hóa, hoặc dựng điểm phát Wi-Fi trùng tên để đánh cắp thông tin đăng nhập.' },
        { t: 'Tin giả, nội dung xuyên tạc', i: 'alert', d: 'Chia sẻ lại nội dung chưa kiểm chứng, dù với ý tốt, có thể vi phạm quy định và bị lợi dụng.' }
      ]},
      { type: 'widget', name: 'wifi', title: 'Mô phỏng: điều gì xảy ra trên mạng Wi-Fi công cộng', intro: 'Chọn từng kiểu kết nối để quan sát dữ liệu đi qua mạng và những gì kẻ nghe lén cùng mạng thu được.' },
      { type: 'rules', variant: 'do', title: 'Thói quen cần duy trì', items: [
        'Khóa màn hình mỗi khi rời chỗ (Windows + L).',
        'Chỉ cài phần mềm do bộ phận kỹ thuật cung cấp hoặc từ nguồn chính thức.',
        'Cập nhật hệ điều hành, trình duyệt, phần mềm phòng chống mã độc.',
        'Không dùng USB lạ; quét USB trước khi mở.',
        'Không truy cập tài khoản công vụ qua Wi-Fi công cộng; dùng mạng di động khi cần thiết.',
        'Cân nhắc trước khi đăng: không đăng hình ảnh văn bản, lịch công tác, nơi làm việc.'
      ]}
    ],
    takeaways: [
      'Rủi ro thường đến từ những việc quen tay: không khóa màn hình, dán mật khẩu, cắm USB lạ, cài phần mềm bẻ khóa.',
      'Hộp thư và tài khoản công vụ chỉ dùng cho công việc, không dùng chung, không lưu mật khẩu trên máy dùng chung.',
      'Wi-Fi công cộng không phải nơi để đăng nhập tài khoản công vụ.'
    ],
    reflect: 'Trong tám điểm của bài tập, điểm nào đang xảy ra tại chính bàn làm việc của đồng chí?'
  },
  /* ---------------- CHỦ ĐỀ 4 ---------------- */
  {
    n: 4, session: 'Buổi sáng', time: '10:40 – 11:30',
    title: 'Bảo vệ tài khoản, mật khẩu, mã OTP, chữ ký số và thiết bị làm việc',
    format: 'Thực hành trực tiếp trên thiết bị của học viên',
    goals: [4, 12],
    lead: 'Tài khoản là “chìa khóa” vào dữ liệu công vụ. Chủ đề này hướng dẫn đặt mật khẩu mạnh, bật xác thực hai lớp, giữ bí mật mã OTP, sử dụng chữ ký số đúng quy định và tự kiểm tra thiết bị.',
    hook: { title: 'Câu hỏi mở đầu', text: 'Mật khẩu “Vinhlong@2026” có đủ chữ hoa, chữ thường, chữ số và ký hiệu. Vì sao đó vẫn là một mật khẩu yếu? Hãy nhập thử vào công cụ bên dưới.' },
    blocks: [
      { type: 'widget', name: 'password', title: 'Phòng thử mật khẩu', intro: 'Nhập một mật khẩu thử nghiệm (không nhập mật khẩu thật). Công cụ ước tính thời gian để máy tính dò ra mật khẩu. Mọi xử lý diễn ra trên máy của đồng chí, không gửi đi đâu.' },
      { type: 'points', title: 'Quy tắc đặt và lưu giữ mật khẩu', items: [
        { t: 'Dài trước, phức tạp sau', i: 'key', d: 'Tối thiểu 12 ký tự; ưu tiên cụm mật khẩu gồm nhiều từ không liên quan, có thêm chữ số, ký hiệu.' },
        { t: 'Không chứa thông tin dễ đoán', i: 'idcard', d: 'Không dùng họ tên, ngày sinh, số điện thoại, tên cơ quan, tên địa phương, năm hiện tại.' },
        { t: 'Mỗi tài khoản một mật khẩu', i: 'lock', d: 'Không dùng lại mật khẩu công vụ cho tài khoản cá nhân, trang mua sắm, mạng xã hội.' },
        { t: 'Lưu giữ an toàn', i: 'shield', d: 'Không dán giấy lên màn hình, không lưu trong tệp Word, Excel hay ghi chú điện thoại. Dùng trình quản lý mật khẩu theo hướng dẫn của cơ quan.' },
        { t: 'Thay đổi khi có dấu hiệu lộ', i: 'refresh', d: 'Đổi ngay khi nghi ngờ đã nhập vào trang giả mạo hoặc được thông báo lộ lọt.' }
      ]},
      { type: 'widget', name: 'mfa', title: 'Xác thực hai lớp hoạt động như thế nào', intro: 'Chạy mô phỏng để so sánh tài khoản chỉ có mật khẩu và tài khoản có xác thực hai lớp khi kẻ gian đã biết mật khẩu. Sau đó bật tình huống “đọc mã OTP cho người gọi điện”.' },
      { type: 'widget', name: 'otp', title: 'Mã OTP trong một cuộc gọi lừa đảo', intro: 'Bấm “Xem tình huống” để thấy mã OTP bị lấy mất như thế nào chỉ trong vài giây.' },
      { type: 'rules', variant: 'must', title: 'Quy tắc bắt buộc đối với mã OTP', items: [
        'Không cung cấp mã OTP cho bất kỳ ai, dưới bất kỳ hình thức nào: gọi điện, tin nhắn, thư điện tử, kể cả người tự xưng là cán bộ ngân hàng, công an, cán bộ kỹ thuật của cơ quan.',
        'Chỉ nhập mã OTP vào đúng ứng dụng, trang web do chính mình chủ động mở.',
        'Nhận được mã OTP khi không thực hiện giao dịch hoặc đăng nhập nào: có người đang dùng mật khẩu của đồng chí. Đổi mật khẩu ngay và báo cáo.',
        'Đọc kỹ nội dung tin nhắn OTP: giao dịch gì, số tiền bao nhiêu, cho ai.'
      ]},
      { type: 'points', title: 'Quản lý và sử dụng chữ ký số đúng quy định', items: [
        { t: 'Chữ ký số gắn với cá nhân', i: 'pen', d: 'Theo Luật Giao dịch điện tử năm 2023 và Nghị định số 68/2024/NĐ-CP, chữ ký số chuyên dùng công vụ gắn với cá nhân được cấp. Không giao thiết bị, mã PIN cho văn thư hay đồng nghiệp ký thay.' },
        { t: 'Bảo quản thiết bị', i: 'usb', d: 'Rút thiết bị ký số khỏi máy tính khi không sử dụng; cất giữ nơi an toàn; không để kèm mã PIN.' },
        { t: 'Ký số từ xa trên điện thoại', i: 'phone', d: 'Mã xác nhận ký số là thông tin bí mật như mã OTP. Kiểm tra đúng văn bản trước khi xác nhận ký.' },
        { t: 'Khi mất hoặc nghi lộ', i: 'alert', d: 'Báo ngay cho cơ quan quản lý để thu hồi, tạm dừng chứng thư số.' }
      ]},
      { type: 'widget', name: 'tabs', title: 'Thực hành: bật xác thực hai lớp trên thiết bị', intro: 'Học viên thực hiện ngay trên điện thoại của mình. Tên mục trong ứng dụng có thể thay đổi theo phiên bản; trợ giảng hỗ trợ tại chỗ.', opts: { tabs: [
        { name: 'Tài khoản Google (Gmail)', steps: ['Mở ứng dụng Gmail hoặc trang myaccount.google.com, chọn ảnh đại diện, chọn “Quản lý Tài khoản Google”.', 'Chọn mục “Bảo mật”.', 'Chọn “Xác minh 2 bước” và làm theo hướng dẫn.', 'Ưu tiên phương thức lời nhắc trên điện thoại hoặc ứng dụng xác thực; lưu mã dự phòng ở nơi an toàn.', 'Trong mục “Thiết bị của bạn”, đăng xuất những thiết bị không nhận ra.'] },
        { name: 'Zalo', steps: ['Mở Zalo, chọn “Cá nhân”, chọn biểu tượng cài đặt.', 'Chọn “Tài khoản và bảo mật”.', 'Bật “Mã khóa Zalo” để khóa ứng dụng trên điện thoại.', 'Kiểm tra danh sách thiết bị đăng nhập; đăng xuất thiết bị lạ.', 'Không chụp, không gửi mã kích hoạt, mã QR đăng nhập cho người khác.'] },
        { name: 'Facebook', steps: ['Mở “Cài đặt và quyền riêng tư”, chọn “Trung tâm tài khoản”.', 'Chọn “Mật khẩu và bảo mật”, sau đó “Xác thực 2 yếu tố”.', 'Chọn tài khoản và phương thức xác thực (ứng dụng xác thực hoặc tin nhắn).', 'Bật cảnh báo đăng nhập; kiểm tra mục “Nơi bạn đã đăng nhập”.'] },
        { name: 'Tài khoản công vụ', steps: ['Thực hiện theo hướng dẫn của đơn vị quản lý hệ thống (hệ thống quản lý văn bản và điều hành, thư điện tử công vụ).', 'Đổi mật khẩu được cấp ban đầu ngay lần đăng nhập đầu tiên.', 'Đăng ký số điện thoại chính chủ để nhận mã xác thực.', 'Không đăng nhập tài khoản công vụ trên máy tính dùng chung, máy ở quán Internet.'] }
      ]}},
      { type: 'widget', name: 'devicecheck', title: 'Tự kiểm tra thiết bị làm việc', intro: 'Đánh dấu những việc đồng chí đã làm. Kết quả được lưu trên trình duyệt để tự kiểm tra lại vào lần sau.' }
    ],
    takeaways: [
      'Mật khẩu dài, không chứa thông tin dễ đoán, mỗi tài khoản một mật khẩu.',
      'Xác thực hai lớp chặn phần lớn trường hợp kẻ gian đã biết mật khẩu, với điều kiện không ai đọc mã OTP cho người khác.',
      'Chữ ký số là chữ ký của chính đồng chí: không giao cho người khác, rút thiết bị khi không dùng.'
    ],
    reflect: 'Hôm nay đồng chí đã bật xác thực hai lớp cho những tài khoản nào? Tài khoản nào còn lại?'
  },
  /* ---------------- CHỦ ĐỀ 5 ---------------- */
  {
    n: 5, session: 'Buổi chiều', time: '13:30 – 14:30',
    title: 'Phòng tránh lừa đảo trực tuyến, thư điện tử giả mạo, đường liên kết và phần mềm độc hại',
    format: 'Bài kiểm tra nhận diện mười mẫu thật – giả',
    goals: [5, 11],
    lead: 'Lừa đảo nhắm vào cán bộ, công chức không cần kỹ thuật cao. Kẻ gian khai thác sự tin tưởng, sự vội vàng và tinh thần chấp hành. Chủ đề này trang bị kỹ năng kiểm tra và một quy tắc đơn giản: xác minh qua kênh thứ hai.',
    hook: { title: 'Tình huống mở đầu', text: 'Đang họp, đồng chí nhận tin nhắn Zalo từ tài khoản mang tên, ảnh đại diện của Bí thư Đảng ủy: “Anh đang họp với đoàn công tác, cần chuyển gấp 30 triệu cho đối tác, em chuyển giúp anh, chiều anh gửi lại. Đang họp nên đừng gọi.” Đồng chí sẽ làm gì?', note: 'Tên, số liệu trong các bài tập là giả định, dùng cho mục đích huấn luyện.' },
    blocks: [
      { type: 'widget', name: 'chain', title: 'Cấu trúc chung của một cuộc tấn công phi kỹ thuật', intro: 'Bấm “Xem diễn biến” để theo dõi từng bước của kịch bản giả danh lãnh đạo. Ở mỗi bước, chọn “Chặn tại bước này” để xem việc cán bộ có thể làm để cắt đứt chuỗi tấn công.' },
      { type: 'widget', name: 'scams', title: 'Sáu kịch bản lừa đảo đang phổ biến đối với cán bộ, công chức', intro: 'Mỗi thẻ là một màn hình mô phỏng. Bấm vào thẻ để xem dấu hiệu nhận diện và cách xử lý.' },
      { type: 'widget', name: 'inbox', title: 'Bài kiểm tra: nhận diện mười mẫu thật – giả', intro: 'Đọc từng tin, di chuột hoặc chạm vào đường liên kết để xem địa chỉ thật, sau đó đánh giá “Hợp lệ” hay “Giả mạo”. Các dấu hiệu nhận diện sẽ được đánh dấu sau khi trả lời.' },
      { type: 'widget', name: 'url', title: 'Kỹ năng kiểm tra đường liên kết', intro: 'Phần quan trọng nhất của một địa chỉ web là tên miền nằm ngay trước dấu “/” đầu tiên, đọc từ phải sang trái. Làm bài luyện tập, sau đó dán bất kỳ đường liên kết nào vào ô phân tích.' },
      { type: 'widget', name: 'sort', title: 'Kiểm tra tệp đính kèm', intro: 'Phân loại các tệp sau. Lưu ý phần đuôi tệp thật sự nằm ở cuối tên tệp.', opts: {
        bins: [ { name: 'Có thể mở sau khi xác minh người gửi', tone: 'l0' }, { name: 'Không mở, báo cáo ngay', tone: 'l3' } ],
        items: [
          { t: 'BaoCao_Quy3.pdf', bin: 0, why: 'Định dạng văn bản phổ biến. Vẫn cần xác minh người gửi trước khi mở.' },
          { t: 'KeHoach2026.docx', bin: 0, why: 'Định dạng văn bản thông thường, không chứa macro.' },
          { t: 'CongVan_Khan.pdf.exe', bin: 1, why: 'Đuôi thật là .exe – tệp chạy chương trình, được ngụy trang bằng “.pdf”.', hint: 'Đọc phần đuôi cuối cùng của tên tệp.' },
          { t: 'HoSo_DangVien.rar (có mật khẩu giải nén)', bin: 1, why: 'Tệp nén có mật khẩu thường được dùng để vượt qua phần mềm quét mã độc.' },
          { t: 'QuyetDinh.docm', bin: 1, why: 'Tài liệu có macro, có thể tự chạy mã lệnh khi bật “Enable Content”.' },
          { t: 'HuongDan.lnk', bin: 1, why: 'Tệp lối tắt có thể chạy lệnh ẩn.' },
          { t: 'SoTay_CanBo.apk', bin: 1, why: 'Bộ cài ứng dụng Android ngoài kho chính thức.' },
          { t: 'TaiLieuHoiNghi.iso', bin: 1, why: 'Tệp ảnh đĩa, thường chứa tệp chạy ẩn bên trong.' }
        ] } },
      { type: 'widget', name: 'flow', title: 'Quy tắc xác minh qua kênh liên lạc thứ hai', intro: 'Áp dụng cho mọi yêu cầu liên quan đến tiền, tài khoản, mã OTP, tài liệu hoặc cài đặt phần mềm.', opts: { steps: [
        { t: 'Dừng lại', i: 'stop', d: 'Không làm theo ngay, dù yêu cầu có vẻ khẩn cấp hoặc đến từ cấp trên. Sự khẩn cấp là dấu hiệu cần kiểm tra kỹ hơn.' },
        { t: 'Không dùng kênh đã nhận yêu cầu', i: 'x', d: 'Không trả lời vào chính tin nhắn đó, không gọi số điện thoại do tin nhắn cung cấp.' },
        { t: 'Liên hệ qua kênh đã biết trước', i: 'call', d: 'Gọi số điện thoại đã lưu từ trước, danh bạ nội bộ, hoặc gặp trực tiếp người được cho là đã gửi yêu cầu.' },
        { t: 'Chỉ thực hiện khi được xác nhận', i: 'check', d: 'Không xác minh được thì không thực hiện, và báo cáo cho đầu mối an toàn thông tin.' }
      ]}},
      { type: 'rules', variant: 'must', title: 'Năm dấu hiệu cần dừng lại ngay', items: [
        'Yêu cầu khẩn cấp, tạo áp lực thời gian, đề nghị không gọi lại hoặc giữ bí mật.',
        'Yêu cầu chuyển tiền, cung cấp mã OTP, mật khẩu, thông tin tài khoản.',
        'Người gửi, tên miền, số điện thoại lạ hoặc gần giống địa chỉ quen thuộc.',
        'Đường liên kết rút gọn, tên miền lạ; tệp đính kèm dạng nén, tệp chạy.',
        'Yêu cầu cài ứng dụng ngoài kho chính thức hoặc cấp quyền truy cập từ xa.'
      ]}
    ],
    takeaways: [
      'Kẻ gian lợi dụng sự tin tưởng, sự vội vàng và tinh thần chấp hành.',
      'Kiểm tra người gửi, tên miền thật, đuôi tệp thật trước khi thao tác.',
      'Mọi yêu cầu về tiền, OTP, tài khoản, tài liệu: xác minh qua kênh thứ hai.'
    ],
    reflect: 'Trong tháng qua, đồng chí đã nhận được tin nhắn, cuộc gọi nào có dấu hiệu giống các mẫu vừa luyện tập?'
  },
  /* ---------------- CHỦ ĐỀ 6 ---------------- */
  {
    n: 6, session: 'Buổi chiều', time: '14:30 – 15:10',
    title: 'Xử lý, chia sẻ, lưu trữ, gửi nhận văn bản điện tử và bảo vệ dữ liệu cá nhân',
    format: 'Thuyết trình; phân tích tình huống theo nhóm',
    goals: [3, 6, 7],
    lead: 'Văn bản điện tử có giá trị pháp lý và phải được xử lý đúng kênh. Dữ liệu cá nhân của công dân mà cán bộ tiếp nhận hằng ngày được pháp luật bảo vệ; cán bộ là người trực tiếp thực hiện nghĩa vụ đó.',
    hook: { title: 'Tình huống mở đầu', text: 'Ảnh chụp căn cước của hàng trăm công dân đang nằm trong thư mục ảnh trên điện thoại cá nhân của cán bộ tiếp nhận hồ sơ, và đã tự động đồng bộ lên dịch vụ lưu trữ đám mây cá nhân. Không ai cố ý làm lộ dữ liệu. Nhưng dữ liệu đã ra khỏi sự kiểm soát của cơ quan.' },
    blocks: [
      { type: 'points', title: 'Nguyên tắc sử dụng đúng kênh', items: [
        { t: 'Văn bản điện tử có giá trị pháp lý', i: 'doc', d: 'Theo Luật Giao dịch điện tử năm 2023 và Nghị định số 30/2020/NĐ-CP, văn bản điện tử được ký số đúng quy định có giá trị pháp lý như bản gốc văn bản giấy. Vì vậy phải được gửi, nhận, lưu trữ đúng hệ thống.' },
        { t: 'Hệ thống quản lý văn bản và điều hành', i: 'server', d: 'Kênh chính thức để gửi, nhận văn bản giữa các cơ quan: có phân quyền, có nhật ký, có lưu trữ.' },
        { t: 'Thư điện tử công vụ', i: 'mail', d: 'Dùng cho trao đổi công việc; không dùng thư điện tử cá nhân để gửi nhận văn bản, hồ sơ.' },
        { t: 'Nhóm trao đổi trên ứng dụng nhắn tin', i: 'chat', d: 'Chỉ dùng để thông báo, nhắc việc. Không gửi văn bản nội bộ, hồ sơ có dữ liệu cá nhân, tuyệt đối không gửi tài liệu mật.' }
      ]},
      { type: 'widget', name: 'channels', title: 'Bản đồ kênh gửi nhận', intro: 'Chọn một loại tài liệu bên trái để xem kênh được phép và kênh bị cấm.' },
      { type: 'widget', name: 'choices', title: 'Bài tập: chọn đúng kênh', intro: 'Với mỗi tình huống, chọn kênh gửi nhận phù hợp nhất.', opts: { items: [
        { q: 'Gửi báo cáo tổng kết quý (đã ký số) lên Đảng ủy cấp trên.', opts: ['Nhóm Zalo của Đảng ủy', 'Hệ thống quản lý văn bản và điều hành', 'Thư điện tử cá nhân'], a: 1, why: 'Văn bản chính thức gửi qua hệ thống quản lý văn bản và điều hành để có giá trị pháp lý và được lưu vết.' },
        { q: 'Chuyển tài liệu đã đóng dấu độ “Mật” cho một ban của Tỉnh ủy.', opts: ['Scan rồi gửi qua hệ thống quản lý văn bản', 'Chụp ảnh gửi qua Zalo cho nhanh', 'Chuyển bản giấy theo quy trình giao nhận tài liệu mật, có sổ theo dõi'], a: 2, why: 'Tài liệu mật không được truyền qua mạng khi không có biện pháp bảo vệ bằng mật mã theo quy định; giao nhận bản giấy theo đúng quy trình bảo vệ bí mật nhà nước.' },
        { q: 'Gửi danh sách hộ được hỗ trợ kèm số định danh cá nhân cho cán bộ phụ trách ấp.', opts: ['Gửi qua kênh công vụ, chỉ những trường thông tin cần thiết cho việc chi trả', 'Chụp màn hình gửi vào nhóm Zalo ấp', 'Đăng lên trang mạng xã hội của xã để người dân tự tra'], a: 0, why: 'Dữ liệu cá nhân chỉ gửi cho người được giao nhiệm vụ, qua kênh công vụ, và chỉ gồm phần thông tin cần thiết (nguyên tắc tối thiểu).' },
        { q: 'Thông báo đổi giờ họp chi bộ chiều nay.', opts: ['Nhóm trao đổi công việc của chi bộ', 'Không được dùng ứng dụng nhắn tin cho việc này', 'Gửi văn bản ký số qua hệ thống'], a: 0, why: 'Thông tin thông báo, nhắc việc thông thường có thể dùng nhóm trao đổi công việc đã được kiểm soát thành viên.' },
        { q: 'Công dân muốn nộp bổ sung ảnh giấy tờ cho hồ sơ đang giải quyết.', opts: ['Nhận qua Zalo cá nhân của cán bộ', 'Hướng dẫn nộp qua hệ thống dịch vụ công hoặc trực tiếp tại bộ phận một cửa', 'Nhận qua Gmail cá nhân rồi in ra'], a: 1, why: 'Hồ sơ thủ tục hành chính phải đi qua hệ thống giải quyết thủ tục; không để dữ liệu công dân nằm trên tài khoản cá nhân của cán bộ.' }
      ]}},
      { type: 'widget', name: 'backup', title: 'Sao lưu: nguyên tắc 3 – 2 – 1', intro: 'Ba bản dữ liệu, trên hai loại phương tiện khác nhau, trong đó một bản tách rời, cất ở nơi khác. Chạy mô phỏng mã độc để thấy vì sao bản tách rời là quan trọng nhất.' },
      { type: 'points', title: 'Lưu trữ và chia sẻ tệp tin an toàn', items: [
        { t: 'Lưu đúng nơi quy định', i: 'folder', d: 'Lưu trên hệ thống, thư mục do cơ quan bố trí; không lưu dữ liệu công vụ trên dịch vụ lưu trữ đám mây cá nhân.' },
        { t: 'Chia sẻ có kiểm soát', i: 'share', d: 'Chia sẻ cho đúng người, đúng quyền (xem hay sửa), có thời hạn. Không bật chế độ “bất kỳ ai có đường liên kết”.' },
        { t: 'Thu hồi khi hết nhu cầu', i: 'x', d: 'Gỡ quyền truy cập khi kết thúc công việc hoặc khi cán bộ chuyển công tác.' },
        { t: 'Xóa đúng cách', i: 'trash', d: 'Xóa bản sao tạm, ảnh chụp giấy tờ sau khi xử lý xong; bàn giao máy tính phải xóa dữ liệu theo hướng dẫn kỹ thuật.' }
      ]},
      { type: 'points', title: 'Nghĩa vụ bảo vệ thông tin cá nhân của công dân, tổ chức', items: [
        { t: 'Đúng mục đích', i: 'check', d: 'Chỉ sử dụng dữ liệu cá nhân cho việc giải quyết thủ tục, nhiệm vụ đã được giao.' },
        { t: 'Tối thiểu', i: 'file', d: 'Chỉ thu thập, sao chụp, gửi đi những thông tin thật sự cần thiết.' },
        { t: 'Bảo mật', i: 'lock', d: 'Không để hồ sơ trên bàn khi tiếp dân; không để màn hình hiển thị dữ liệu người khác trước mặt công dân.' },
        { t: 'Lưu giữ có thời hạn', i: 'clock', d: 'Không giữ bản sao dữ liệu lâu hơn thời gian cần thiết.' },
        { t: 'Tôn trọng quyền của chủ thể dữ liệu', i: 'users', d: 'Người dân có quyền được biết dữ liệu của mình được xử lý thế nào, được yêu cầu chỉnh sửa theo quy định.' }
      ]},
      { type: 'widget', name: 'flip', title: 'Các hành vi phổ biến nhưng vi phạm quy định', intro: 'Lật từng thẻ để xem vì sao hành vi đó vi phạm và cách làm đúng.', opts: { cards: [
        { f: 'Chụp màn hình hồ sơ gửi Zalo cho đồng nghiệp “xem giúp”', b: 'Đưa dữ liệu cá nhân ra khỏi hệ thống, lưu lại trên nhiều thiết bị. Cách đúng: chia sẻ quyền xem trong hệ thống hoặc trao đổi trực tiếp.' },
        { f: 'Đăng danh sách nhận hỗ trợ kèm số căn cước lên nhóm khu dân cư', b: 'Công khai dữ liệu cá nhân vượt quá mục đích. Cách đúng: niêm yết theo quy định, chỉ các trường cần thiết, che bớt số định danh.' },
        { f: 'Nhận hồ sơ công dân qua Gmail, Zalo cá nhân', b: 'Dữ liệu nằm ngoài sự quản lý của cơ quan. Cách đúng: tiếp nhận qua hệ thống dịch vụ công hoặc bộ phận một cửa.' },
        { f: 'Photo dư giấy tờ, bỏ bản hỏng vào sọt rác', b: 'Người khác có thể nhặt lại. Cách đúng: hủy bằng máy hủy tài liệu hoặc theo quy trình của cơ quan.' },
        { f: 'Bàn giao máy tính cho người mới nhưng không xóa dữ liệu cũ', b: 'Người nhận máy truy cập được hồ sơ, tài khoản đã lưu. Cách đúng: sao lưu, xóa dữ liệu, đăng xuất tài khoản theo hướng dẫn kỹ thuật.' },
        { f: 'Dùng USB cá nhân chép dữ liệu về nhà làm tiếp', b: 'Dễ thất lạc, lây mã độc, dữ liệu ra ngoài cơ quan. Cách đúng: làm việc trên hệ thống được cấp quyền, thiết bị được cơ quan cho phép.' }
      ]}},
      { type: 'widget', name: 'reveal', title: 'Phân tích tình huống theo nhóm', intro: 'Mỗi nhóm nhận một tình huống, thảo luận 7 phút, trình bày 2 phút.', opts: { cases: [
        { title: 'Nhóm 1. Gửi nhầm tệp', text: 'Cán bộ định gửi báo cáo tiến độ vào nhóm Zalo cơ quan, nhưng chọn nhầm tệp danh sách người có công kèm địa chỉ, số điện thoại.', qs: [{ q: 'Cần làm gì trong 10 phút đầu?', a: 'Thu hồi tin nhắn ngay; ghi nhận thời điểm, số thành viên có thể đã xem; báo cáo lãnh đạo và đầu mối an toàn thông tin; đề nghị thành viên xóa tệp nếu đã tải.' }, { q: 'Phòng ngừa lần sau?', a: 'Không lưu tệp chứa dữ liệu cá nhân cùng thư mục với tệp thông thường; không gửi tệp dữ liệu qua ứng dụng nhắn tin.' }] },
        { title: 'Nhóm 2. Người dân xin bản chụp hồ sơ của hàng xóm', text: 'Một người dân đề nghị cán bộ cung cấp bản chụp hồ sơ đất đai của hộ liền kề “để đối chiếu ranh giới”.', qs: [{ q: 'Cán bộ xử lý thế nào?', a: 'Không cung cấp dữ liệu của người khác. Hướng dẫn người dân thực hiện thủ tục cung cấp thông tin theo quy định hoặc đề nghị các bên cùng làm việc với cơ quan.' }] },
        { title: 'Nhóm 3. Chuyển công tác', text: 'Cán bộ chuyển sang đơn vị khác nhưng vẫn là thành viên nhóm Zalo công việc cũ, vẫn giữ tài khoản hệ thống và thư mục chia sẻ.', qs: [{ q: 'Ai chịu trách nhiệm, cần làm gì?', a: 'Cán bộ chuyển đi có trách nhiệm bàn giao dữ liệu và thông báo; người quản lý nhóm, quản trị hệ thống có trách nhiệm thu hồi quyền truy cập, xóa khỏi nhóm.' }] }
      ]}}
    ],
    takeaways: [
      'Văn bản chính thức đi qua hệ thống quản lý văn bản và điều hành; tài liệu mật đi theo quy trình bảo vệ bí mật nhà nước.',
      'Sao lưu theo nguyên tắc 3 – 2 – 1, luôn có một bản tách rời.',
      'Dữ liệu cá nhân của công dân: đúng mục đích, tối thiểu, bảo mật, lưu giữ có thời hạn.'
    ],
    reflect: 'Nếu người dân hỏi: “Dữ liệu của tôi nộp ở đây được bảo vệ ra sao?”, đồng chí sẽ trả lời thế nào?'
  },
  /* ---------------- CHỦ ĐỀ 7 ---------------- */
  {
    n: 7, session: 'Buổi chiều', time: '15:25 – 16:05',
    title: 'Sử dụng công cụ trí tuệ nhân tạo, nền tảng trực tuyến và nhóm trao đổi công việc an toàn',
    format: 'Thuyết trình có minh họa trực tiếp',
    goals: [8, 10],
    lead: 'Công cụ trí tuệ nhân tạo giúp soạn thảo, tóm tắt, tra cứu nhanh hơn. Nhưng nội dung đưa vào công cụ công cộng có thể được lưu trữ ngoài sự kiểm soát của cơ quan, và kết quả trả về có thể sai. Chủ đề này xác định ranh giới sử dụng an toàn.',
    hook: { title: 'Tình huống mở đầu', text: 'Để kịp giờ, một cán bộ dán nguyên dự thảo báo cáo nhân sự vào một ứng dụng trò chuyện trí tuệ nhân tạo miễn phí và yêu cầu “viết lại cho gọn”. Kết quả rất tốt. Điều gì đã xảy ra với bản dự thảo?' },
    blocks: [
      { type: 'prose', title: 'Nội dung đưa vào công cụ trí tuệ nhân tạo công cộng đi đâu', body: [
        'Khi nhập nội dung vào công cụ trí tuệ nhân tạo công cộng, nội dung được gửi tới máy chủ của nhà cung cấp, thường đặt ở nước ngoài. Tùy điều khoản dịch vụ và cài đặt tài khoản, nội dung có thể được lưu lại, được nhân viên nhà cung cấp xem xét, hoặc được dùng để cải tiến mô hình. Cơ quan không kiểm soát được và không thu hồi được nội dung đó.',
        'Nguyên tắc chung: chỉ đưa vào công cụ trí tuệ nhân tạo công cộng những nội dung mà đồng chí sẵn sàng đăng công khai.'
      ]},
      { type: 'widget', name: 'aiflow', title: 'Hành trình của một đoạn văn bản dán vào công cụ trí tuệ nhân tạo', intro: 'Bấm “Gửi” để theo dõi nội dung đi đâu sau khi rời khỏi máy tính.' },
      { type: 'widget', name: 'sort', title: 'Được hay không được đưa vào công cụ trí tuệ nhân tạo công cộng', intro: 'Phân loại các nội dung sau.', opts: {
        bins: [ { name: 'Có thể sử dụng', tone: 'l0' }, { name: 'Không được đưa vào', tone: 'l3' } ],
        items: [
          { t: 'Nghị quyết đã đăng trên cổng thông tin điện tử của tỉnh, nhờ tóm tắt', bin: 0, why: 'Nội dung đã công khai.' },
          { t: 'Yêu cầu gợi ý bố cục một bài phát biểu khai mạc hội nghị', bin: 0, why: 'Không chứa thông tin nội bộ, dữ liệu cá nhân.' },
          { t: 'Câu hỏi về cách dùng hàm trong Excel', bin: 0, why: 'Kiến thức chung.' },
          { t: 'Tài liệu có dấu độ mật', bin: 1, why: 'Bí mật nhà nước tuyệt đối không đưa lên bất kỳ nền tảng trực tuyến nào.' },
          { t: 'Dự thảo phương án nhân sự', bin: 1, why: 'Thông tin nội bộ, nhạy cảm, chưa công bố.' },
          { t: 'Danh sách công dân kèm số định danh cá nhân, nhờ lọc trùng', bin: 1, why: 'Dữ liệu cá nhân của công dân; đưa lên nền tảng nước ngoài có thể vi phạm quy định về bảo vệ dữ liệu cá nhân.' },
          { t: 'Nội dung đơn thư khiếu nại, tố cáo', bin: 1, why: 'Chứa thông tin người khiếu nại, tố cáo phải được bảo mật.' },
          { t: 'Ảnh chụp màn hình phần mềm công vụ có tên tài khoản', bin: 1, why: 'Lộ thông tin hệ thống, tài khoản nội bộ.' }
        ] } },
      { type: 'widget', name: 'aiguard', title: 'Minh họa: kiểm tra nội dung trước khi gửi cho trí tuệ nhân tạo', intro: 'Gõ hoặc chọn một mẫu yêu cầu. Công cụ đánh dấu các thông tin nhạy cảm và đề xuất cách ẩn danh hóa. Công cụ chỉ chạy trên trình duyệt, không gửi nội dung đi đâu, và chỉ có tính minh họa.' },
      { type: 'points', title: 'Biện pháp giảm rủi ro khi sử dụng công cụ trí tuệ nhân tạo', items: [
        { t: 'Ưu tiên công cụ được cơ quan cho phép', i: 'building', d: 'Sử dụng nền tảng do cơ quan triển khai hoặc hướng dẫn, nếu có.' },
        { t: 'Ẩn danh hóa trước khi nhập', i: 'mask', d: 'Thay tên người, số định danh, số điện thoại, địa chỉ bằng ký hiệu chung như [HỌ TÊN], [SỐ ĐỊNH DANH].' },
        { t: 'Chỉ đưa phần cần thiết', i: 'file', d: 'Nhờ góp ý cấu trúc, câu chữ thay vì dán nguyên văn bản.' },
        { t: 'Kiểm tra cài đặt tài khoản', i: 'shield', d: 'Tắt tùy chọn cho phép dùng nội dung để huấn luyện mô hình nếu nền tảng có cung cấp; không đăng nhập bằng tài khoản công vụ vào dịch vụ không được phép.' }
      ]},
      { type: 'widget', name: 'verify', title: 'Trách nhiệm kiểm chứng kết quả đầu ra', intro: 'Công cụ trí tuệ nhân tạo có thể trả lời trôi chảy nhưng sai, thậm chí tạo ra số hiệu văn bản không tồn tại. Bấm vào từng ý trong câu trả lời mô phỏng để kiểm chứng.' },
      { type: 'points', title: 'Quy tắc quản lý nhóm trao đổi công việc', items: [
        { t: 'Có người quản lý nhóm', i: 'users', d: 'Mỗi nhóm có trưởng nhóm, phó nhóm chịu trách nhiệm duyệt thành viên.' },
        { t: 'Bật duyệt thành viên', i: 'check', d: 'Không để thành viên tự thêm người khác; tắt tham gia bằng đường liên kết.' },
        { t: 'Rà soát định kỳ', i: 'refresh', d: 'Hằng tháng rà soát danh sách; xóa người đã chuyển công tác, nghỉ hưu, tài khoản lạ.' },
        { t: 'Không gửi văn bản nội bộ, dữ liệu cá nhân', i: 'x', d: 'Nhóm dùng để thông báo, nhắc việc; tài liệu gửi qua hệ thống công vụ.' }
      ]},
      { type: 'rules', variant: 'do', title: 'An toàn khi họp trực tuyến', items: [
        'Không đăng đường liên kết phòng họp lên nơi công khai; đặt mật khẩu và bật phòng chờ.',
        'Người chủ trì kiểm tra danh sách người tham dự, đổi tên hiển thị theo quy ước (đơn vị – họ tên).',
        'Đóng các cửa sổ, tệp không liên quan trước khi chia sẻ màn hình; tắt thông báo tin nhắn.',
        'Không ghi âm, ghi hình, chụp màn hình cuộc họp khi chưa được phép.',
        'Họp có nội dung bí mật nhà nước chỉ dùng hệ thống hội nghị truyền hình được bảo vệ theo quy định.'
      ]}
    ],
    takeaways: [
      'Chỉ đưa vào công cụ trí tuệ nhân tạo công cộng những gì sẵn sàng công khai.',
      'Ẩn danh hóa trước khi nhập; không bao giờ nhập tài liệu mật, dữ liệu cá nhân công dân, thông tin nhân sự.',
      'Người dùng chịu trách nhiệm về kết quả: luôn đối chiếu văn bản gốc.',
      'Nhóm trao đổi và phòng họp trực tuyến phải có người quản lý và được rà soát định kỳ.'
    ],
    reflect: 'Đơn vị của đồng chí có bao nhiêu nhóm trao đổi công việc? Lần cuối rà soát thành viên là khi nào?'
  },
  /* ---------------- CHỦ ĐỀ 8 ---------------- */
  {
    n: 8, session: 'Buổi chiều', time: '16:05 – 16:45',
    title: 'Xử lý ban đầu khi xảy ra sự cố an toàn thông tin',
    format: 'Diễn tập xử lý tình huống theo nhóm',
    goals: [9, 11],
    lead: 'Mười lăm phút đầu tiên quyết định mức độ thiệt hại. Cán bộ không cần tự khắc phục sự cố, nhưng cần làm đúng năm bước ban đầu và báo cáo ngay.',
    hook: { title: 'Câu hỏi mở đầu', text: 'Màn hình máy tính bất ngờ hiện thông báo đòi tiền chuộc. Việc đầu tiên đồng chí làm là gì: tắt nguồn, rút dây mạng, hay gọi điện cho đồng nghiệp?' },
    blocks: [
      { type: 'widget', name: 'flow', title: 'Trình tự năm bước xử lý ban đầu', intro: 'Bấm “Trình bày từng bước” để đi qua từng bước; bấm vào một bước để xem chi tiết.', opts: { steps: [
        { t: 'Dừng', i: 'stop', d: 'Ngừng mọi thao tác trên thiết bị, tài khoản có dấu hiệu bất thường. Không bấm thêm, không nhập thêm thông tin.' },
        { t: 'Cô lập', i: 'plug', d: 'Rút dây mạng, tắt Wi-Fi, tắt Bluetooth. Không tắt nguồn máy, trừ khi được bộ phận kỹ thuật hướng dẫn. Tài khoản bị chiếm: đăng xuất khỏi các thiết bị khác, đổi mật khẩu từ một thiết bị an toàn.' },
        { t: 'Ghi nhận', i: 'camera', d: 'Chụp màn hình hoặc dùng điện thoại chụp lại hiện tượng; ghi thời điểm phát hiện, thao tác gần nhất (mở tệp nào, bấm vào đâu), dữ liệu có thể bị ảnh hưởng.' },
        { t: 'Báo cáo', i: 'call', d: 'Báo ngay cho lãnh đạo trực tiếp và đầu mối an toàn thông tin của cơ quan bằng điện thoại hoặc trực tiếp, không dùng thiết bị đang bị sự cố.' },
        { t: 'Phối hợp', i: 'team', d: 'Làm theo hướng dẫn của bộ phận chuyên môn; cung cấp đầy đủ thông tin; giữ nguyên hiện trạng thiết bị để phục vụ xác minh.' }
      ]}},
      { type: 'rules', variant: 'dont', title: 'Các hành vi không được thực hiện khi xảy ra sự cố', items: [
        'Tắt nguồn, cài lại hệ điều hành, xóa tệp khi chưa có hướng dẫn: làm mất dấu vết phục vụ xác minh.',
        'Tự tải công cụ “giải mã”, “diệt virus” trên mạng về chạy thử.',
        'Liên hệ, thương lượng, trả tiền chuộc cho kẻ tấn công.',
        'Chép dữ liệu từ máy nghi nhiễm sang USB, máy khác.',
        'Đăng thông tin sự cố lên mạng xã hội, nhóm trao đổi đông người.',
        'Che giấu, trì hoãn báo cáo vì ngại bị kỷ luật.'
      ]},
      { type: 'widget', name: 'tabs', title: 'Ba tình huống có quy trình xử lý riêng', intro: 'Ngoài năm bước chung, mỗi loại sự cố có những việc cần làm riêng.', opts: { tabs: [
        { name: 'Mất tài khoản', steps: ['Dùng thiết bị an toàn đăng nhập, đổi mật khẩu; chọn đăng xuất khỏi tất cả thiết bị khác.', 'Bật hoặc kiểm tra lại xác thực hai lớp; kiểm tra số điện thoại, thư điện tử khôi phục có bị thay đổi.', 'Thông báo cho người thân, đồng nghiệp qua kênh khác để không ai chuyển tiền, gửi tài liệu cho tài khoản bị chiếm.', 'Báo quản trị các nhóm công việc tạm xóa tài khoản khỏi nhóm.', 'Nếu không lấy lại được, sử dụng chức năng khôi phục chính thức của nhà cung cấp và báo cáo đầu mối an toàn thông tin.'] },
        { name: 'Lộ lọt dữ liệu', steps: ['Ngừng việc phát tán: thu hồi tin nhắn, gỡ bài đăng, thu hồi quyền chia sẻ.', 'Xác định phạm vi: dữ liệu gì, của bao nhiêu người, ai có thể đã tiếp cận, từ thời điểm nào.', 'Báo cáo ngay lãnh đạo và đầu mối an toàn thông tin; cơ quan thực hiện nghĩa vụ thông báo theo quy định về bảo vệ dữ liệu cá nhân, bảo vệ bí mật nhà nước.', 'Không tự trả lời người dân, báo chí theo ý cá nhân; thống nhất nội dung trả lời của cơ quan.', 'Nếu liên quan tài liệu mật: báo cáo theo quy định bảo vệ bí mật nhà nước, không tự xử lý.'] },
        { name: 'Nhiễm mã độc', steps: ['Rút dây mạng, tắt Wi-Fi; không tắt nguồn.', 'Không cắm USB, ổ cứng sao lưu vào máy.', 'Ghi lại thông báo trên màn hình, tên tệp đã mở, thời điểm.', 'Báo cáo đầu mối an toàn thông tin; cảnh báo đồng nghiệp đã nhận cùng thư, cùng tệp.', 'Chỉ sử dụng lại máy khi bộ phận kỹ thuật xác nhận đã xử lý xong.'] }
      ]}},
      { type: 'widget', name: 'drill', title: 'Diễn tập xử lý tình huống', intro: 'Chia nhóm, chọn một kịch bản. Mỗi quyết định có giới hạn thời gian 45 giây để tạo áp lực gần với thực tế. Nhóm thảo luận và chọn phương án.' },
      { type: 'points', title: 'Chế độ báo cáo', items: [
        { t: 'Báo cáo ngay', i: 'call', d: 'Khi phát hiện hoặc nghi ngờ sự cố; không chờ xác nhận chắc chắn. Báo cáo nhầm tốt hơn báo cáo muộn.' },
        { t: 'Nội dung báo cáo ban đầu', i: 'note', d: 'Ai phát hiện, thời điểm; thiết bị, tài khoản liên quan; hiện tượng; thao tác đã thực hiện; dữ liệu có thể bị ảnh hưởng.' },
        { t: 'Trình tự', i: 'building', d: 'Lãnh đạo trực tiếp và đầu mối an toàn thông tin của cơ quan; đầu mối báo cáo lên đơn vị chuyên trách theo quy định của Tỉnh ủy.' },
        { t: 'Không đổ lỗi, không che giấu', i: 'shield', d: 'Cán bộ chủ động báo cáo sớm giúp cơ quan giảm thiệt hại. Việc che giấu mới là vi phạm nghiêm trọng.' }
      ]},
      { type: 'widget', name: 'contacts', title: 'Đầu mối tiếp nhận của địa phương', intro: 'Lưu các số điện thoại dưới đây vào danh bạ ngay trong buổi học.' }
    ],
    takeaways: [
      'Năm bước: Dừng, Cô lập, Ghi nhận, Báo cáo, Phối hợp.',
      'Không tắt nguồn, không cài lại máy, không trả tiền chuộc, không che giấu.',
      'Báo cáo sớm là trách nhiệm, không phải lỗi.'
    ],
    reflect: 'Số điện thoại của đầu mối an toàn thông tin cơ quan đồng chí đã có trong danh bạ chưa?'
  }
  ];
})(window.ATTT);
