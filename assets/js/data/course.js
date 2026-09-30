/* Mục tiêu, căn cứ pháp lý của chương trình. */
(function (A) {
  A.data.objectives = [
    { group: 'Kiến thức', items: [
      'Trình bày được khái niệm an toàn thông tin và ba thuộc tính cốt lõi: tính bí mật, tính toàn vẹn, tính sẵn sàng; giải thích được hệ quả khi mỗi thuộc tính bị xâm phạm.',
      'Nhận diện và phân loại được các nhóm thông tin, dữ liệu cần bảo vệ tại đơn vị theo cấp độ nhạy cảm.',
      'Nắm được các quy định pháp luật và định hướng của Đảng mới có hiệu lực về an ninh mạng, bảo vệ bí mật nhà nước, bảo vệ dữ liệu cá nhân và trí tuệ nhân tạo liên quan trực tiếp đến công việc hằng ngày.'
    ]},
    { group: 'Kỹ năng', items: [
      'Thiết lập và quản lý được mật khẩu mạnh; kích hoạt xác thực hai lớp cho tài khoản công vụ và tài khoản cá nhân sử dụng cho công việc.',
      'Nhận diện chính xác thư điện tử giả mạo, tin nhắn lừa đảo, đường liên kết và tệp tin độc hại.',
      'Thực hiện đúng quy trình soạn thảo, gửi nhận, chia sẻ, lưu trữ và sao lưu văn bản, hồ sơ điện tử.',
      'Bảo vệ được thông tin cá nhân của công dân và tổ chức trong quá trình giải quyết thủ tục hành chính.',
      'Sử dụng công cụ trí tuệ nhân tạo đúng khả năng và đúng quy định: nhận biết ảo giác, thiên lệch, kiến thức lỗi thời; không đưa dữ liệu mật, dữ liệu cá nhân lên nền tảng AI, nhất là nền tảng đặt ngoài lãnh thổ Việt Nam; sử dụng nền tảng trực tuyến, nhóm trao đổi công việc an toàn.',
      'Thực hiện đúng trình tự xử lý ban đầu khi nghi ngờ mất tài khoản, lộ lọt dữ liệu, nhiễm mã độc hoặc bị tấn công mạng.'
    ]},
    { group: 'Thái độ', items: [
      'Nhận thức rõ trách nhiệm cá nhân đối với an toàn thông tin của cơ quan, đơn vị.',
      'Chủ động báo cáo kịp thời khi phát hiện dấu hiệu bất thường, không che giấu sự cố.',
      'Duy trì thói quen tự kiểm tra định kỳ theo danh mục kiểm tra được cung cấp.'
    ]}
  ];

  /* Căn cứ pháp lý đang có hiệu lực (rà soát đến tháng 9/2026). kind: law | decree | party. */
  A.data.laws = [
    { kind: 'law', name: 'Luật An ninh mạng', code: 'Luật số 116/2025/QH15', effect: 'Hiệu lực từ 01/7/2026',
      scope: 'Khung pháp lý thống nhất về an ninh mạng và an toàn thông tin: nguyên tắc bảo vệ, các hành vi bị nghiêm cấm (trong đó có dùng trí tuệ nhân tạo giả mạo hình ảnh, giọng nói của người khác trái pháp luật), trách nhiệm của cơ quan, tổ chức, cá nhân.', topics: [0, 1, 3, 5, 8] },
    { kind: 'law', name: 'Luật Bảo vệ bí mật nhà nước', code: 'Luật số 117/2025/QH15', effect: 'Hiệu lực từ 01/3/2026',
      scope: 'Ba độ mật Tuyệt mật, Tối mật, Mật; các hành vi bị nghiêm cấm; soạn thảo, sao, chụp, lưu giữ, vận chuyển, giao nhận, tiêu hủy bí mật nhà nước; quy định mới về văn bản điện tử bí mật nhà nước và Mạng LAN độc lập.', topics: [0, 2, 6] },
    { kind: 'law', name: 'Luật Bảo vệ dữ liệu cá nhân', code: 'Luật số 91/2025/QH15', effect: 'Hiệu lực từ 01/01/2026',
      scope: 'Nguyên tắc xử lý dữ liệu cá nhân; quyền của chủ thể dữ liệu; trách nhiệm của cơ quan, tổ chức, cá nhân khi thu thập, sử dụng, chia sẻ, lưu giữ dữ liệu cá nhân.', topics: [0, 6, 7, 8] },
    { kind: 'law', name: 'Luật Trí tuệ nhân tạo', code: 'Luật số 134/2025/QH15', effect: 'Hiệu lực từ 01/3/2026',
      scope: 'Quản lý hệ thống AI theo mức độ rủi ro; AI là công cụ hỗ trợ, không thay thế thẩm quyền và trách nhiệm của con người; nghiêm cấm sử dụng dữ liệu cho AI trái quy định về dữ liệu, dữ liệu cá nhân, an ninh mạng.', topics: [0, 7] },
    { kind: 'law', name: 'Luật Dữ liệu', code: 'Luật số 60/2024/QH15', effect: 'Hiệu lực từ 01/7/2025',
      scope: 'Quản lý, phân loại dữ liệu; bảo đảm an ninh, an toàn dữ liệu trong hoạt động của cơ quan nhà nước.', topics: [2] },
    { kind: 'law', name: 'Luật Giao dịch điện tử', code: 'Luật số 20/2023/QH15', effect: 'Hiệu lực từ 01/7/2024',
      scope: 'Giá trị pháp lý của thông điệp dữ liệu; chữ ký điện tử, chữ ký số, chữ ký số chuyên dùng công vụ.', topics: [4, 6] },
    { kind: 'decree', name: 'Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật An ninh mạng', code: 'Nghị định số 333/2026/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Biện pháp bảo vệ an ninh mạng; trình tự, thủ tục và trách nhiệm của cơ quan, tổ chức, cá nhân khi triển khai Luật An ninh mạng.', topics: [1, 8] },
    { kind: 'decree', name: 'Nghị định về bảo vệ an ninh mạng đối với hệ thống thông tin', code: 'Nghị định số 331/2026/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Bảo vệ hệ thống thông tin của cơ quan, tổ chức theo mức độ rủi ro và tầm quan trọng của hệ thống.', topics: [3, 8] },
    { kind: 'decree', name: 'Nghị định xử phạt vi phạm hành chính trong lĩnh vực an ninh mạng và bảo vệ dữ liệu cá nhân', code: 'Nghị định số 330/2026/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Hành vi vi phạm, hình thức và mức xử phạt đối với vi phạm về an ninh mạng, bảo vệ dữ liệu cá nhân.', topics: [1, 6] },
    { kind: 'decree', name: 'Nghị định về phòng ngừa, xử lý thông tin xâm phạm an ninh mạng', code: 'Nghị định số 327/2026/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Phòng ngừa, xử lý thông tin sai sự thật, xuyên tạc, xâm phạm an ninh mạng trên không gian mạng.', topics: [3, 5] },
    { kind: 'decree', name: 'Nghị định quy định chi tiết Luật Bảo vệ bí mật nhà nước', code: 'Nghị định số 63/2026/NĐ-CP', effect: 'Hiệu lực từ 01/3/2026',
      scope: 'Biện pháp thi hành Luật Bảo vệ bí mật nhà nước năm 2025 (thay thế văn bản hướng dẫn trước đây).', topics: [2, 6] },
    { kind: 'decree', name: 'Nghị định quy định chi tiết Luật Bảo vệ dữ liệu cá nhân', code: 'Nghị định số 356/2025/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Danh mục dữ liệu cá nhân cơ bản, nhạy cảm; quy trình, thủ tục bảo vệ dữ liệu cá nhân; chia sẻ dữ liệu giữa các bộ phận trong cùng cơ quan.', topics: [6, 7] },
    { kind: 'decree', name: 'Nghị định quy định về chữ ký số chuyên dùng công vụ', code: 'Nghị định số 68/2024/NĐ-CP', effect: 'Hiệu lực từ 15/8/2024',
      scope: 'Cung cấp, quản lý, sử dụng chữ ký số chuyên dùng công vụ và thiết bị lưu khóa bí mật của cơ quan, cán bộ, công chức.', topics: [4] },
    { kind: 'decree', name: 'Nghị định về công tác văn thư', code: 'Nghị định số 30/2020/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Soạn thảo, ký ban hành, quản lý văn bản; văn bản điện tử ký số có giá trị pháp lý như bản gốc văn bản giấy; quản lý con dấu, thiết bị lưu khóa bí mật.', topics: [6] },
    { kind: 'decree', name: 'Thông tư ban hành Khung đạo đức trí tuệ nhân tạo quốc gia', code: 'Thông tư số 05/2026/TT-BKHCN', effect: 'Hiệu lực từ 10/3/2026',
      scope: 'Sáu lưu ý bắt buộc đối với người sử dụng AI phục vụ quản lý nhà nước, dịch vụ công: không thay thế phán đoán con người, bảo vệ thông tin mật, kiểm chứng kết quả, không phân biệt đối xử.', topics: [0, 7] },
    { kind: 'guide', name: 'Hướng dẫn ứng dụng công nghệ số, trí tuệ nhân tạo hỗ trợ rà soát văn bản quy phạm pháp luật', code: 'Công văn số 2766/BKHCN-TTCNTT', effect: 'Ngày 29/4/2026',
      scope: 'Không nhập tài liệu thuộc danh mục bí mật nhà nước lên các nền tảng AI công cộng; không dùng AI tự động đưa ra kết luận pháp lý.', topics: [0, 7] },
    { kind: 'party', name: 'Hướng dẫn khai thác, sử dụng trí tuệ nhân tạo cho cán bộ, đảng viên trong các cơ quan đảng', code: 'Công văn số 19130-CV/VPTW', effect: 'Ngày 26/11/2025',
      scope: 'Văn phòng Trung ương Đảng đề nghị các cơ quan đảng áp dụng thống nhất; tuân thủ nghiêm quy định an toàn, an ninh thông tin và bảo vệ dữ liệu, tránh lộ, lọt thông tin nội bộ.', topics: [0, 7] },
    { kind: 'party', name: 'Nghị quyết số 57-NQ/TW của Bộ Chính trị', code: 'Ngày 22/12/2024', effect: 'Định hướng chiến lược',
      scope: 'Đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia; bảo đảm an ninh mạng, an ninh dữ liệu là yêu cầu xuyên suốt.', topics: [0, 1] }
  ];
})(window.ATTT);
