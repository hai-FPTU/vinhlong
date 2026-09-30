/* Học liệu minh họa trực quan: tủ hồ sơ bốn cấp độ, thẻ kịch bản lừa đảo, hành trình dữ liệu AI, tình huống OTP, bản đồ kênh gửi nhận. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- Tủ hồ sơ bốn cấp độ ---------- */
  A.widgets.levels = function (host) {
    const L = [
      { n: 'Công khai', st: 'CÔNG KHAI', ex: ['Lịch tiếp công dân', 'Thủ tục hành chính niêm yết', 'Tin bài trên cổng thông tin'], who: 'Mọi người', ch: 'Cổng thông tin, bảng niêm yết, mạng xã hội chính thức', rule: 'Được chia sẻ rộng rãi; không cắt ghép, sửa đổi nội dung.' },
      { n: 'Nội bộ', st: 'NỘI BỘ', ex: ['Dự thảo chưa ban hành', 'Danh bạ nội bộ', 'Biên bản họp thường kỳ'], who: 'Cán bộ trong cơ quan', ch: 'Hệ thống quản lý văn bản, thư điện tử công vụ', rule: 'Không đăng lên mạng xã hội, không gửi người ngoài cơ quan.' },
      { n: 'Hạn chế', st: 'HẠN CHẾ', ex: ['Dữ liệu cá nhân của công dân', 'Hồ sơ cán bộ, đảng viên', 'Thông tin người tố cáo', 'Mật khẩu hệ thống'], who: 'Chỉ người được giao nhiệm vụ', ch: 'Hệ thống có phân quyền; chỉ gửi phần cần thiết', rule: 'Không chụp màn hình, không gửi qua Zalo, không đưa vào AI công cộng.' },
      { n: 'Bí mật nhà nước', st: 'MẬT', ex: ['Tài liệu độ Mật, Tối mật, Tuyệt mật'], who: 'Người được cấp có thẩm quyền cho phép', ch: 'Bản giấy giao nhận có sổ; thiết bị, Mạng LAN độc lập được bố trí', rule: 'Tuyệt đối không soạn thảo, lưu giữ, gửi qua thiết bị, mạng kết nối Internet.' }
    ];
    const cab = h('div', { class: 'cab' });
    const detail = h('div', { class: 'cab-detail', 'aria-live': 'polite' });
    const drawers = L.map(function (l, i) {
      const d = h('button', { class: 'drawer lv' + i, type: 'button', 'aria-pressed': 'false' },
        h('span', { class: 'drawer-handle' }), h('span', { class: 'drawer-n' }, 'Cấp ' + (i + 1)), h('span', { class: 'drawer-t' }, l.n),
        h('span', { class: 'drawer-lock' }, A.icon(i === 0 ? 'globe' : i === 1 ? 'building' : i === 2 ? 'lock' : 'shield')));
      d.addEventListener('click', function () { open(i); });
      cab.append(d); return d;
    });
    function open(i) {
      drawers.forEach(function (d, k) { d.classList.toggle('open', k === i); d.setAttribute('aria-pressed', String(k === i)); });
      const l = L[i];
      detail.className = 'cab-detail lv' + i;
      detail.innerHTML = '';
      const paper = h('div', { class: 'cab-paper' }, h('span', { class: 'cab-stamp' }, l.st), h('ul', {}, l.ex.map(function (x) { return h('li', {}, x); })));
      detail.append(paper, h('dl', { class: 'cab-dl' },
        h('div', {}, h('dt', {}, A.icon('users'), 'Ai được tiếp cận'), h('dd', {}, l.who)),
        h('div', {}, h('dt', {}, A.icon('share'), 'Gửi nhận qua'), h('dd', {}, l.ch)),
        h('div', {}, h('dt', {}, A.icon('alert'), 'Lưu ý'), h('dd', {}, l.rule))));
    }
    const scale = h('div', { class: 'cab-scale', 'aria-hidden': 'true' }, h('span', {}, 'Mức độ nhạy cảm tăng dần'));
    host.append(h('div', { class: 'cab-wrap' }, h('div', { class: 'cab-col' }, cab, scale), detail));
    open(0);
  };

  /* ---------- Sáu kịch bản lừa đảo ---------- */
  A.widgets.scams = function (host) {
    const S = [
      { t: 'Giả danh lãnh đạo', ch: 'zalo', from: 'Bí thư Nguyễn Văn B.', tag: 'Tài khoản mới', msg: 'Anh đang họp, em chuyển gấp giúp anh 30 triệu, chiều anh gửi lại. Đừng gọi nhé.', sign: ['Tài khoản mới, không có bạn chung', 'Chuyển tiền gấp, ngăn gọi điện'], act: 'Gọi số điện thoại của lãnh đạo đã lưu từ trước.' },
      { t: 'Giả danh công an', ch: 'call', from: 'Số lạ: 0869 xxx 214', tag: 'Cuộc gọi', msg: '“Số căn cước của ông liên quan vụ án rửa tiền. Cài ứng dụng để xác minh, không được báo cho ai.”', sign: ['Công an không làm việc qua điện thoại', 'Yêu cầu giữ bí mật, cài ứng dụng'], act: 'Tắt máy; nếu cần, đến trực tiếp trụ sở công an.' },
      { t: 'Công văn giả mạo', ch: 'email', from: 'vanphong@vinhlong-gov.info', tag: 'Thư điện tử', msg: '[KHẨN] Cập nhật hồ sơ đảng viên trước 17 giờ. Tệp đính kèm: HoSo.rar', sign: ['Tên miền không phải .gov.vn', 'Tệp nén, áp lực thời gian'], act: 'Không mở tệp; xác minh với cơ quan gửi.' },
      { t: 'Khóa định danh điện tử', ch: 'sms', from: '+84 876 552 019', tag: 'Tin nhắn', msg: 'Tai khoan dinh danh se bi khoa sau 24h. Cap nhat: vneid-gov.cc', sign: ['Số cá nhân, không phải thương hiệu', 'Tên miền giả mạo'], act: 'Chỉ thao tác trong ứng dụng chính thức.' },
      { t: 'Ứng dụng giả mạo', ch: 'zalo', from: 'Nhóm “Tài liệu hội nghị”', tag: 'Tệp .apk', msg: 'Ban Tổ chức gửi tài liệu, các đồng chí tải về: TaiLieu.pdf.apk', sign: ['Đuôi thật là .apk', 'Yêu cầu cài từ nguồn không xác định'], act: 'Không cài; báo quản trị nhóm xóa tin.' },
      { t: 'Mã QR dán đè', ch: 'qr', from: 'Quầy thu phí', tag: 'Mã QR', msg: 'Mã QR mới được dán chồng lên mã cũ, dẫn tới tài khoản cá nhân lạ.', sign: ['Tem dán chồng, mép không khớp', 'Tên người nhận không phải cơ quan'], act: 'Kiểm tra tên đơn vị nhận trước khi xác nhận chuyển.' }
    ];
    const grid = h('div', { class: 'scams' });
    S.forEach(function (x) {
      const scr = h('div', { class: 'sc-screen sc-' + x.ch });
      if (x.ch === 'qr') {
        scr.append(h('div', { class: 'sc-qr' }, A.icon('qr', 'qr-old'), A.icon('qr', 'qr-new')), h('p', { class: 'sc-msg' }, x.msg));
      } else if (x.ch === 'call') {
        scr.append(h('div', { class: 'sc-call' }, A.icon('call'), h('strong', {}, x.from), h('span', {}, 'Cuộc gọi đến…')), h('p', { class: 'sc-msg sc-quote' }, x.msg));
      } else {
        scr.append(h('div', { class: 'sc-head' }, A.icon(x.ch === 'email' ? 'mail' : x.ch === 'sms' ? 'chat' : 'users'), h('strong', {}, x.from), h('span', { class: 'sc-tag' }, x.tag)), h('p', { class: 'sc-msg sc-bubble' }, x.msg));
      }
      const back = h('div', { class: 'sc-back' }, h('p', { class: 'sc-h' }, 'Dấu hiệu'), h('ul', {}, x.sign.map(function (s1) { return h('li', {}, s1); })), h('p', { class: 'sc-h ok' }, 'Cách xử lý'), h('p', {}, x.act));
      const card = h('button', { class: 'sc-card', type: 'button', 'aria-expanded': 'false' }, h('span', { class: 'sc-title' }, x.t), scr, back);
      card.addEventListener('click', function () { const on = card.classList.toggle('open'); card.setAttribute('aria-expanded', String(on)); });
      grid.append(card);
    });
    host.append(grid);
  };

  /* ---------- Hành trình dữ liệu vào công cụ AI công cộng ---------- */
  A.widgets.aiflow = function (host) {
    const stops = [
      { i: 'laptop', t: 'Máy tính của cán bộ', d: 'Dán dự thảo, danh sách, hồ sơ vào ô trò chuyện.' },
      { i: 'globe', t: 'Truyền qua Internet', d: 'Nội dung rời khỏi mạng của cơ quan.' },
      { i: 'server', t: 'Máy chủ của nhà cung cấp', d: 'Thường đặt ở nước ngoài, ngoài sự quản lý của cơ quan.' }
    ];
    const outs = [
      { i: 'database', t: 'Được lưu lại', d: 'Lịch sử trò chuyện có thể được lưu trong thời gian dài.' },
      { i: 'ai', t: 'Có thể dùng để huấn luyện', d: 'Tùy điều khoản dịch vụ và cài đặt tài khoản.' },
      { i: 'eye', t: 'Có thể được người xem xét', d: 'Nhân viên nhà cung cấp có thể xem nội dung khi kiểm duyệt.' }
    ];
    const row = h('ol', { class: 'aif-row' });
    const nodes = stops.map(function (s1) { const n = h('li', { class: 'aif-node' }, A.icon(s1.i), h('strong', {}, s1.t), h('span', {}, s1.d)); row.append(n); return n; });
    const fan = h('div', { class: 'aif-outs' });
    const outN = outs.map(function (o) { const n = h('div', { class: 'aif-out' }, A.icon(o.i), h('strong', {}, o.t), h('span', {}, o.d)); fan.append(n); return n; });
    const wall = h('div', { class: 'aif-wall' }, A.icon('x'), h('span', {}, 'Cơ quan không kiểm soát được và không thu hồi được nội dung đã gửi.'));
    const doc = h('div', { class: 'aif-doc' }, A.icon('doc'), 'Dự thảo nhân sự');
    const btn = h('button', { class: 'btn btn-seal btn-sm', type: 'button' }, 'Gửi');
    btn.addEventListener('click', async function () {
      btn.disabled = true; host.classList.remove('done');
      nodes.concat(outN).forEach(function (n) { n.classList.remove('on'); }); wall.classList.remove('on');
      doc.classList.add('fly');
      for (let i = 0; i < nodes.length; i++) { if (!host.isConnected) return; nodes[i].classList.add('on'); await U.wait(750); }
      for (let i = 0; i < outN.length; i++) { outN[i].classList.add('on'); await U.wait(450); }
      wall.classList.add('on'); doc.classList.remove('fly'); host.classList.add('done'); btn.disabled = false; btn.textContent = 'Xem lại';
    });
    host.append(h('div', { class: 'wg-actions' }, btn, doc), row, fan, wall);
  };

  /* ---------- Tình huống OTP ---------- */
  A.widgets.otp = function (host) {
    const steps = [
      { who: 'call', t: 'Người gọi tự xưng nhân viên ngân hàng: “Tài khoản của anh đang bị trừ tiền bất thường, em hỗ trợ khóa ngay.”' },
      { who: 'sms', t: 'Ma OTP cua Quy khach la 482913 de XAC NHAN CHUYEN 49.500.000d. KHONG chia se ma nay.' },
      { who: 'call', t: '“Anh đọc giúp em 6 số vừa nhận để em khóa tài khoản.”' },
      { who: 'me', t: '“4 – 8 – 2 – 9 – 1 – 3.”' },
      { who: 'bank', t: 'Tài khoản −49.500.000 đ. Số dư: 312.000 đ.' }
    ];
    const phone = h('div', { class: 'otp-phone' }, h('div', { class: 'otp-notch' }));
    const feed = h('div', { class: 'otp-feed' }); phone.append(feed);
    const lesson = h('div', { class: 'otp-lesson' },
      h('p', { class: 'otp-big' }, 'Mã OTP = chữ ký của đồng chí cho một giao dịch cụ thể.'),
      h('ul', {}, h('li', {}, 'Tin nhắn ghi rõ “xác nhận chuyển 49.500.000 đ”, không phải “khóa tài khoản”.'), h('li', {}, 'Ngân hàng, công an, cán bộ kỹ thuật không bao giờ hỏi mã OTP.'), h('li', {}, 'Đọc mã cho người khác nghĩa là tự tay ký lệnh chuyển tiền.')));
    lesson.hidden = true;
    const btn = h('button', { class: 'btn btn-sm', type: 'button' }, 'Xem tình huống');
    btn.addEventListener('click', async function () {
      btn.disabled = true; feed.innerHTML = ''; lesson.hidden = true;
      host.querySelectorAll('.stamp').forEach(function (x) { x.remove(); });
      for (let i = 0; i < steps.length; i++) {
        if (!host.isConnected) return;
        const s1 = steps[i];
        const lab = { call: 'Người gọi', sms: 'Tin nhắn ngân hàng', me: 'Cán bộ', bank: 'Biến động số dư' }[s1.who];
        feed.append(h('div', { class: 'otp-b otp-' + s1.who }, h('small', {}, lab), s1.t));
        feed.scrollTop = feed.scrollHeight;
        await U.wait(1300);
      }
      lesson.hidden = false; U.stamp(phone, 'Mất tiền', 'bad'); btn.disabled = false; btn.textContent = 'Xem lại';
    });
    host.append(h('div', { class: 'wg-actions' }, btn), h('div', { class: 'otp' }, phone, lesson));
  };

  /* ---------- Bản đồ kênh gửi nhận ---------- */
  A.widgets.channels = function (host) {
    const CH = [
      { k: 'qlvb', i: 'server', t: 'Hệ thống quản lý văn bản và điều hành' },
      { k: 'mail', i: 'mail', t: 'Thư điện tử công vụ' },
      { k: 'group', i: 'chat', t: 'Nhóm Zalo công việc' },
      { k: 'personal', i: 'cloud', t: 'Gmail, Drive, Zalo cá nhân' },
      { k: 'paper', i: 'cabinet', t: 'Bản giấy qua văn thư, có sổ giao nhận' }
    ];
    const DOC = [
      { i: 'doc', t: 'Văn bản chính thức đã ký số', ok: ['qlvb'], note: 'Đi qua hệ thống để có giá trị pháp lý, được lưu vết.' },
      { i: 'shield', t: 'Tài liệu có độ Mật', ok: ['paper'], note: 'Không đi qua bất kỳ kênh nào kết nối Internet.' },
      { i: 'idcard', t: 'Danh sách có dữ liệu cá nhân', ok: ['qlvb', 'mail'], note: 'Chỉ gửi người được giao, chỉ các trường cần thiết.' },
      { i: 'clock', t: 'Thông báo đổi giờ họp', ok: ['group', 'mail', 'qlvb'], note: 'Thông tin thông báo thông thường có thể dùng nhóm đã kiểm soát thành viên.' }
    ];
    const left = h('div', { class: 'chm-docs' });
    const right = h('div', { class: 'chm-chs' });
    const note = h('p', { class: 'chm-note', 'aria-live': 'polite' });
    const chEls = {};
    CH.forEach(function (c) { chEls[c.k] = h('div', { class: 'chm-ch' }, A.icon(c.i), h('span', {}, c.t), h('b', { class: 'chm-mark' })); right.append(chEls[c.k]); });
    const docEls = DOC.map(function (d, i) {
      const b = h('button', { class: 'chm-doc', type: 'button' }, A.icon(d.i), h('span', {}, d.t));
      b.addEventListener('click', function () { pick(i); });
      left.append(b); return b;
    });
    function pick(i) {
      docEls.forEach(function (b, k) { b.classList.toggle('active', k === i); });
      CH.forEach(function (c) {
        const ok = DOC[i].ok.indexOf(c.k) >= 0;
        const el = chEls[c.k]; el.classList.remove('ok', 'no'); void el.offsetWidth; el.classList.add(ok ? 'ok' : 'no');
        el.querySelector('.chm-mark').textContent = ok ? 'Được phép' : 'Không';
      });
      note.textContent = DOC[i].note;
    }
    host.append(h('div', { class: 'chm' }, left, h('div', { class: 'chm-arrow', 'aria-hidden': 'true' }), right), note);
    pick(0);
  };
})(window.ATTT);
