/* Trang chủ và trang căn cứ pháp lý. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, C = A.config;
  A.pages.home = function () {
    const page = h('article', { class: 'page home' });
    /* Hero: một thư giả mạo được soi từng dấu hiệu rồi đóng dấu */
    const demo = h('div', { class: 'hero-mail', 'aria-hidden': 'true' },
      h('div', { class: 'hm-bar' }, h('span'), h('span'), h('span')),
      h('div', { class: 'hm-row' }, h('b', {}, 'Từ: '), 'Văn phòng Tỉnh ủy ', h('span', { class: 'hm-f', 'data-i': 1 }, '<thongbao@vinhlong-gov.info>')),
      h('div', { class: 'hm-row hm-subj' }, h('span', { class: 'hm-f', 'data-i': 2 }, '[KHẨN]'), ' Cập nhật hồ sơ đảng viên trước 17 giờ'),
      h('div', { class: 'hm-body' }, 'Đề nghị đồng chí ', h('span', { class: 'hm-f', 'data-i': 3 }, 'đăng nhập tại đây'), ' bằng tài khoản công vụ và tải biểu mẫu đính kèm.'),
      h('div', { class: 'hm-att' }, h('span', { class: 'hm-f', 'data-i': 4 }, 'HoSo_DangVien.rar')),
      h('ol', { class: 'hm-notes' }, h('li', { 'data-i': 1 }, 'Tên miền không thuộc .gov.vn'), h('li', { 'data-i': 2 }, 'Tạo áp lực thời gian'), h('li', { 'data-i': 3 }, 'Yêu cầu đăng nhập qua đường liên kết'), h('li', { 'data-i': 4 }, 'Tệp nén đính kèm')));
    const heroTxt = h('div', { class: 'hero-txt' },
      h('p', { class: 'hero-org' }, C.organizer),
      h('h1', {}, 'Tập huấn nhận thức an toàn thông tin', h('span', { class: 'hero-h1-2' }, 'cho cán bộ, công chức khối Đảng')),
      h('p', { class: 'hero-sub' }, 'Giáo trình tương tác dành cho cán bộ, công chức khối Đảng và các bộ phận chuyên môn của Ủy ban nhân dân: từ nhận thức đến thực hành nhận diện lừa đảo, bảo vệ dữ liệu và xử lý sự cố.'),
      h('dl', { class: 'hero-facts' }, h('div', {}, h('dt', {}, 'Thời gian'), h('dd', {}, C.date + ', từ ' + C.startTime)), h('div', {}, h('dt', {}, 'Hình thức'), h('dd', {}, 'Trực tiếp kết hợp trực tuyến; thực hành trên thiết bị của học viên')), h('div', {}, h('dt', {}, 'Cấu trúc'), h('dd', {}, 'Một ngày: phần cập nhật pháp luật và tám chủ đề'))),
      h('div', { class: 'hero-cta' }, h('a', { class: 'btn', href: '#/khao-sat' }, 'Làm khảo sát đầu vào'), h('a', { class: 'btn btn-ghost', href: '#/cap-nhat-phap-luat' }, 'Bắt đầu học')));
    page.append(h('section', { class: 'hero' }, heroTxt, demo));

    /* Chuyên đề trọng tâm: an toàn khi dùng AI */
    page.append(h('a', { class: 'ai-banner', href: '#/chu-de/7' },
      h('div', { class: 'ai-banner-ico' }, A.icon('ai')),
      h('div', {}, h('p', { class: 'ai-banner-k' }, 'Chuyên đề trọng tâm'), h('h2', {}, 'An toàn khi sử dụng trí tuệ nhân tạo (ChatGPT, Gemini, Copilot…) trong công vụ'),
        h('p', {}, 'Vì sao AI bịa thông tin (ảo giác) và mang định kiến (thiên lệch); vì sao không được đưa dữ liệu quan trọng, dữ liệu mật lên AI, nhất là AI đặt ngoài lãnh thổ Việt Nam.')),
      h('span', { class: 'ai-banner-go' }, 'Vào chuyên đề')));

    /* Mã QR để học viên mở giáo trình trên điện thoại (hiện trên máy tính, máy chiếu) */
    if (window.qrcode && /^https?:$/.test(location.protocol)) {
      const url = location.origin + location.pathname;
      const qr = window.qrcode(0, 'M'); qr.addData(url); qr.make();
      page.append(h('section', { class: 'qr-box' },
        h('div', { class: 'qr-img', html: qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true }) }),
        h('div', {}, h('h2', {}, 'Mở giáo trình trên điện thoại'), h('p', {}, 'Mở ứng dụng Camera hoặc Zalo, quét mã để vào giáo trình. Không cần cài đặt, không cần đăng nhập.'), h('p', { class: 'qr-url' }, url),
          h('p', { class: 'muted small' }, 'Trên điện thoại, có thể chọn “Thêm vào màn hình chính” để mở nhanh như một ứng dụng; giáo trình vẫn xem được khi mạng chập chờn.'))));
    }
    (async function () {
      await U.wait(900);
      for (let i = 1; i <= 4; i++) { if (!demo.isConnected) return; demo.querySelectorAll('[data-i="' + i + '"]').forEach(function (x) { x.classList.add('on'); }); await U.wait(750); }
      U.stamp(demo, 'Giả mạo', 'bad');
    })();

    /* Lịch trong ngày */
    const tl = h('ol', { class: 'timeline' });
    C.schedule.forEach(function (it) {
      let title = it.title;
      const m = /^chu-de\/(\d)$/.exec(it.route || '');
      if (m) title = 'Chủ đề ' + m[1] + '. ' + A.data.topics[+m[1] - 1].title;
      if (it.route === 'cap-nhat-phap-luat') title = 'Phần mở đầu. ' + A.data.lawIntro.title;
      const inner = [h('span', { class: 'tl-time' }, it.time), h('span', { class: 'tl-title' }, title)];
      tl.append(h('li', { class: 'tl-' + it.session + (it.route ? '' : ' tl-break') }, it.route ? h('a', { href: '#/' + it.route }, inner) : h('div', {}, inner)));
    });
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Chương trình trong ngày'), h('div', { class: 'tl-wrap' }, h('div', {}, h('h3', { class: 'tl-h' }, 'Buổi sáng'), h('p', { class: 'muted' }, 'Nhận thức nền tảng; bảo vệ tài khoản, thiết bị.')), h('div', {}, h('h3', { class: 'tl-h' }, 'Buổi chiều'), h('p', { class: 'muted' }, 'Xử lý tình huống, nghiệp vụ văn bản, ứng phó sự cố.'))), tl));

    /* Mục tiêu */
    const og = h('div', { class: 'obj-grid' }); let n = 0;
    A.data.objectives.forEach(function (g) {
      const ol = h('ol', { start: n + 1 }); g.items.forEach(function (x) { n++; ol.append(h('li', {}, x)); });
      og.append(h('div', { class: 'obj' }, h('h3', {}, g.group), ol));
    });
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Yêu cầu cần đạt sau tập huấn'), og));

    /* Căn cứ */
    const ul = h('ul', { class: 'basis' }); C.basis.forEach(function (b) { ul.append(h('li', {}, b)); });
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Căn cứ tổ chức'), ul, h('p', {}, h('a', { href: '#/phap-ly' }, 'Xem căn cứ pháp lý của nội dung tập huấn'))));

    page.append(h('section', { class: 'blk how' }, h('h2', {}, 'Cách sử dụng giáo trình'),
      h('dl', { class: 'points' },
        h('div', { class: 'pt' }, h('dt', {}, 'Học viên'), h('dd', {}, 'Mở giáo trình trên điện thoại hoặc máy tính, làm bài tập tương tác cùng giảng viên. Kết quả chỉ lưu trên trình duyệt của mình.')),
        h('div', { class: 'pt' }, h('dt', {}, 'Giảng viên'), h('dd', {}, 'Bật “Chế độ trình chiếu” ở góc trên để phóng to chữ; dùng phím mũi tên trái, phải để chuyển trang.')),
        h('div', { class: 'pt' }, h('dt', {}, 'Sau tập huấn'), h('dd', {}, 'Dùng danh mục tự kiểm tra hằng tháng và xem lại các chủ đề bất cứ lúc nào.')))));
    return page;
  };

  A.pages.legal = function () {
    const page = h('article', { class: 'page' });
    page.append(h('header', { class: 'topic-head' }, h('h1', {}, 'Căn cứ pháp lý'), h('p', { class: 'lead' }, 'Các luật, nghị định, nghị quyết đang có hiệu lực, liên quan trực tiếp đến công việc hằng ngày của cán bộ, công chức. Rà soát đến tháng 9 năm 2026.')));
    const groups = [['party', 'Văn bản của Đảng', 'flag'], ['law', 'Luật', 'scale'], ['decree', 'Nghị định, thông tư', 'doc'], ['guide', 'Văn bản hướng dẫn', 'note']];
    groups.forEach(function (g) {
      const items = A.data.laws.filter(function (l) { return l.kind === g[0]; });
      const grid = h('div', { class: 'laws' });
      items.forEach(function (l) {
        grid.append(h('article', { class: 'law law-' + l.kind },
          h('div', { class: 'law-top' }, A.icon(g[2]), h('span', { class: 'law-code' }, l.code)),
          h('h3', {}, l.name), h('p', { class: 'law-st' }, l.effect), h('p', {}, l.scope),
          h('p', { class: 'law-tp' }, 'Liên quan: ', l.topics.map(function (t, i) { return [i ? ', ' : '', t === 0 ? h('a', { href: '#/cap-nhat-phap-luat' }, 'Phần mở đầu') : h('a', { href: '#/chu-de/' + t }, 'Chủ đề ' + t)]; }))));
      });
      page.append(h('section', { class: 'blk' }, h('h2', {}, g[1] + ' (' + items.length + ')'), grid));
    });
    page.append(h('p', { class: 'muted small' }, 'Trước khi trích dẫn trong văn bản của cơ quan, đề nghị tra cứu điều, khoản cụ thể trên Cơ sở dữ liệu quốc gia về văn bản pháp luật.'));
    return page;
  };
})(window.ATTT);
