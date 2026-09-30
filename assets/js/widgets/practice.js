/* Học liệu tương tác buổi chiều: chuỗi tấn công, hộp thư mô phỏng, kiểm tra đường liên kết, trí tuệ nhân tạo, kiểm chứng, sao lưu, diễn tập. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  /* ---------- Chuỗi tấn công phi kỹ thuật ---------- */
  A.widgets.chain = function (host) {
    const st = [
      { t: 'Thu thập thông tin', story: 'Kẻ gian lấy họ tên, chức vụ, ảnh của lãnh đạo từ cổng thông tin, mạng xã hội; lấy số điện thoại cán bộ từ danh bạ đăng công khai.', cut: 'Hạn chế công khai chức vụ, số điện thoại, lịch công tác, ảnh văn bản trên mạng xã hội cá nhân.' },
      { t: 'Ngụy trang', story: 'Tạo tài khoản Zalo mới dùng tên, ảnh đại diện của lãnh đạo; gửi lời mời kết bạn tới cán bộ trong cơ quan.', cut: 'Kiểm tra tài khoản: mới tạo, không có bạn chung, không có lịch sử trò chuyện là dấu hiệu giả mạo.' },
      { t: 'Tạo áp lực', story: '“Anh đang họp với đoàn công tác, việc gấp, đừng gọi.” Khai thác tinh thần chấp hành và sự vội vàng.', cut: 'Nhận diện: sự khẩn cấp kèm ngăn cản xác minh là dấu hiệu điển hình của lừa đảo.' },
      { t: 'Yêu cầu hành động', story: 'Đề nghị chuyển 30 triệu đồng vào tài khoản của “đối tác”, hoặc gửi danh sách, tài liệu nội bộ.', cut: 'Áp dụng quy tắc kênh thứ hai: gọi số điện thoại đã lưu từ trước hoặc gặp trực tiếp.' },
      { t: 'Chiếm đoạt', story: 'Tiền được rút ngay qua nhiều tài khoản trung gian; tài liệu bị dùng cho lần lừa đảo tiếp theo.', cut: 'Nếu đã chuyển tiền: báo ngay ngân hàng để phong tỏa, báo đầu mối an toàn thông tin và cơ quan công an.' }
    ];
    const row = h('ol', { class: 'chain' });
    const pane = h('div', { class: 'chain-pane', 'aria-live': 'polite' });
    const nodes = st.map(function (x, i) {
      const b = h('button', { class: 'chain-node', type: 'button' }, h('span', { class: 'chain-n' }, String(i + 1)), h('span', {}, x.t));
      b.addEventListener('click', function () { show(i, false); });
      row.append(h('li', {}, b)); return b;
    });
    function show(i, cut) {
      nodes.forEach(function (n, k) { n.classList.toggle('active', k === i); n.classList.toggle('past', k < i); n.classList.remove('cut'); });
      if (cut) { nodes[i].classList.add('cut'); for (let k = i + 1; k < nodes.length; k++) nodes[k].classList.add('cut'); }
      pane.innerHTML = '';
      const cutBtn = h('button', { class: 'btn btn-safe btn-sm', type: 'button', onclick: function () { show(i, true); } }, 'Chặn tại bước này');
      pane.append(h('h4', {}, 'Bước ' + (i + 1) + '. ' + st[i].t), h('p', {}, st[i].story));
      if (cut) pane.append(h('p', { class: 'chain-cut' }, h('strong', {}, 'Cán bộ cắt đứt chuỗi tấn công: '), st[i].cut));
      else pane.append(cutBtn);
    }
    const play = h('button', { class: 'btn btn-sm', type: 'button' }, 'Xem diễn biến');
    play.addEventListener('click', async function () {
      play.disabled = true;
      for (let i = 0; i < st.length; i++) { if (!host.isConnected) return; show(i, false); await U.wait(2400); }
      U.stamp(host, 'Mất tiền', 'bad'); play.disabled = false;
    });
    host.append(h('div', { class: 'wg-actions' }, play), row, pane);
    show(0, false);
  };

  /* ---------- Hộp thư mô phỏng: 10 mẫu thật – giả ---------- */
  A.widgets.inbox = function (host) {
    const data = A.data.phishing;
    const ans = {};
    const chName = { email: 'Thư điện tử', sms: 'Tin nhắn SMS', zalo: 'Zalo', call: 'Cuộc gọi' };
    const list = h('ol', { class: 'ib-list', 'aria-label': 'Danh sách tin' });
    const view = h('div', { class: 'ib-view' });
    const status = h('div', { class: 'ib-status', 'aria-live': 'polite' });
    const score = h('div', { class: 'ib-score' });
    let cur = 0;
    const items = data.map(function (m, i) {
      const plainFrom = m.fromName.replace(/<[^>]+>/g, '');
      const plainSub = (m.subject || m.body).replace(/<[^>]+>/g, '').slice(0, 60);
      const b = h('button', { class: 'ib-item', type: 'button' }, h('span', { class: 'ib-ch ch-' + m.channel }, chName[m.channel]), h('span', { class: 'ib-from' }, plainFrom), h('span', { class: 'ib-sub' }, plainSub), h('span', { class: 'ib-res' }));
      b.addEventListener('click', function () { open(i); });
      list.append(h('li', {}, b)); return b;
    });
    function open(i) {
      cur = i; const m = data[i];
      items.forEach(function (b, k) { b.classList.toggle('active', k === i); });
      view.innerHTML = '';
      const msg = h('div', { class: 'msg msg-' + m.channel + (ans[i] != null ? ' revealed' : '') });
      if (m.channel === 'email') {
        msg.append(h('div', { class: 'msg-head' },
          h('div', { class: 'msg-subj', html: m.subject }),
          h('div', { class: 'msg-meta', html: '<strong>' + m.fromName + '</strong> &lt;' + m.fromAddr + '&gt;' }),
          h('div', { class: 'msg-meta' }, 'Đến: ' + m.to + '   Lúc ' + m.time)));
        msg.append(h('div', { class: 'msg-body', html: m.body }));
        if (m.attach) msg.append(h('div', { class: 'msg-att', html: 'Tệp đính kèm: ' + m.attach }));
      } else if (m.channel === 'call') {
        msg.append(h('div', { class: 'msg-head' }, h('div', { class: 'msg-meta', html: '<strong>Cuộc gọi đến</strong> – ' + m.fromName }), h('div', { class: 'msg-meta' }, 'Lúc ' + m.time)), h('div', { class: 'msg-body call-body', html: m.body }));
      } else {
        msg.append(h('div', { class: 'msg-head' }, h('div', { class: 'msg-meta', html: '<strong>' + m.fromName + '</strong>' }), h('div', { class: 'msg-meta' }, chName[m.channel] + ', lúc ' + m.time)), h('div', { class: 'bubble', html: m.body }));
      }
      if (m.context) msg.append(h('p', { class: 'msg-context' }, 'Bối cảnh: ' + m.context));
      /* đường liên kết mô phỏng */
      Array.prototype.forEach.call(msg.querySelectorAll('a[data-href]'), function (a) {
        a.setAttribute('href', '#'); a.setAttribute('role', 'button');
        a.addEventListener('click', function (e) { e.preventDefault(); status.className = 'ib-status warn'; status.textContent = 'Đường liên kết mô phỏng, không mở. Địa chỉ thật: ' + a.dataset.href; });
        function hov() { status.className = 'ib-status'; status.textContent = 'Địa chỉ thật của đường liên kết: ' + a.dataset.href; }
        a.addEventListener('mouseenter', hov); a.addEventListener('focus', hov);
      });
      const stage = h('div', { class: 'msg-stage' }, msg);
      view.append(h('p', { class: 'ib-count' }, 'Mẫu ' + (i + 1) + '/' + data.length), stage);
      if (ans[i] == null) {
        const acts = h('div', { class: 'ib-acts' },
          h('button', { class: 'btn btn-safe', type: 'button', onclick: function () { answer(i, false); } }, 'Hợp lệ'),
          h('button', { class: 'btn btn-seal', type: 'button', onclick: function () { answer(i, true); } }, 'Giả mạo'));
        view.append(acts);
      } else showFlags(i, stage);
      status.className = 'ib-status'; status.textContent = 'Di chuột hoặc chạm vào đường liên kết để xem địa chỉ thật.';
    }
    function showFlags(i, stage) {
      const m = data[i], ok = ans[i] === m.fake;
      U.stamp(stage, m.fake ? 'Giả mạo' : 'Hợp lệ', m.fake ? 'bad' : 'good');
      const ol = h('ol', { class: 'ib-flags' }); m.flags.forEach(function (f) { ol.append(h('li', {}, f)); });
      const next = i < data.length - 1 ? h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { open(i + 1); } }, 'Mẫu tiếp theo') : null;
      view.append(h('div', { class: 'ib-fb ' + (ok ? 'ok' : 'bad') }, h('p', {}, h('strong', {}, ok ? 'Đánh giá chính xác.' : 'Chưa chính xác.'), ' Tin này ' + (m.fake ? 'là giả mạo.' : 'là hợp lệ.') + (m.fake ? ' Các dấu hiệu nhận diện:' : ' Căn cứ đánh giá:')), ol, next));
    }
    function answer(i, fake) {
      ans[i] = fake;
      const ok = fake === data[i].fake;
      items[i].classList.add(ok ? 'right' : 'wrong');
      items[i].querySelector('.ib-res').textContent = ok ? 'Đúng' : 'Sai';
      open(i); upd();
    }
    function upd() {
      const done = Object.keys(ans).length;
      const right = Object.keys(ans).filter(function (k) { return ans[k] === data[k].fake; }).length;
      score.textContent = 'Đã làm ' + done + '/' + data.length + '. Đúng ' + right + '.';
      if (done === data.length) {
        const best = U.store.get('inbox', 0); if (right > best) U.store.set('inbox', right);
        score.textContent += right >= 9 ? ' Kỹ năng nhận diện rất tốt.' : right >= 7 ? ' Khá tốt; xem lại các mẫu làm sai.' : ' Cần luyện thêm; xem kỹ dấu hiệu ở từng mẫu.';
      }
    }
    host.append(h('div', { class: 'ib' }, h('div', { class: 'ib-left' }, list, score), h('div', { class: 'ib-right' }, view, status)));
    open(0); upd();
  };

  /* ---------- Giải phẫu đường liên kết ---------- */
  const SLD = ['gov.vn', 'com.vn', 'org.vn', 'edu.vn', 'net.vn', 'ac.vn', 'info.vn', 'co.uk', 'com.au'];
  const TRUSTED = ['vinhlong.gov.vn', 'dichvucong.gov.vn', 'vneid.gov.vn', 'chinhphu.vn', 'khonggianmang.gov.vn', 'dangcongsan.vn', 'mps.gov.vn', 'google.com', 'zalo.me'];
  const SHORT = ['bit.ly', 'tinyurl.com', 'goo.gl', 'rb.gy', 'cutt.ly', 't.ly', 'is.gd', 'shorturl.at'];
  const ODD_TLD = ['xyz', 'top', 'cc', 'info', 'click', 'live', 'site', 'online', 'icu', 'buzz', 'shop', 'vip', 'club', 'pw', 'tk'];
  function lev(a, b) { const m = []; for (let i = 0; i <= a.length; i++) { m[i] = [i]; } for (let j = 1; j <= b.length; j++) m[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return m[a.length][b.length]; }
  function parseUrl(raw) {
    let str = raw.trim(); if (!/^[a-z]+:\/\//i.test(str)) str = 'http://' + str;
    let u; try { u = new URL(str); } catch (e) { return null; }
    const host = u.hostname.toLowerCase();
    const isIP = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
    const parts = host.split('.');
    let reg = host;
    if (!isIP && parts.length >= 2) { const last2 = parts.slice(-2).join('.'); reg = (SLD.indexOf(last2) >= 0 && parts.length >= 3) ? parts.slice(-3).join('.') : last2; }
    const sub = host.length > reg.length ? host.slice(0, host.length - reg.length - 1) : '';
    const flags = [];
    if (u.protocol === 'http:') flags.push('Không mã hóa (http): thông tin nhập vào có thể bị nghe lén.');
    if (u.username) flags.push('Có phần “' + decodeURIComponent(u.username) + '@” trước tên miền: trình duyệt bỏ qua phần này, địa chỉ thật là “' + host + '”.');
    if (isIP) flags.push('Dùng địa chỉ IP thay cho tên miền.');
    if (host.indexOf('xn--') >= 0) flags.push('Tên miền quốc tế hóa (xn--): có thể dùng ký tự trông giống chữ Latinh để giả mạo.');
    if (SHORT.indexOf(reg) >= 0) flags.push('Đường liên kết rút gọn: không biết được đích đến thật.');
    const tld = parts[parts.length - 1];
    if (ODD_TLD.indexOf(tld) >= 0) flags.push('Đuôi tên miền “.' + tld + '” thường bị dùng cho trang lừa đảo.');
    if (/gov|chinhphu|vneid|dichvucong|congan|tinhuy/.test(host) && !/\.gov\.vn$|^chinhphu\.vn$|\.chinhphu\.vn$/.test(host)) flags.push('Có chữ gợi liên tưởng cơ quan nhà nước nhưng tên miền thật không thuộc .gov.vn.');
    TRUSTED.forEach(function (t) { if (reg !== t) { const d = lev(reg, t); if (d > 0 && d <= 2) flags.push('Tên miền “' + reg + '” gần giống “' + t + '” (khác ' + d + ' ký tự).'); } });
    if ((reg.match(/-/g) || []).length >= 2) flags.push('Tên miền có nhiều dấu gạch nối.');
    const trusted = TRUSTED.indexOf(reg) >= 0 || /\.gov\.vn$/.test(reg);
    return { u: u, host: host, reg: reg, sub: sub, flags: flags, trusted: trusted && flags.length === 0 };
  }
  A.widgets.url = function (host) {
    const drills = [
      { u: 'https://dichvucong.gov.vn/p/home/dvc-trang-chu.html', fake: false },
      { u: 'https://vinhlong.gov.vn.xacthuc-hoso.com/login', fake: true },
      { u: 'http://dichvuc0ng-gov.vn/dang-nhap', fake: true },
      { u: 'https://vneid.gov.vn', fake: false },
      { u: 'http://vinhlong.gov.vn@103.77.12.9/tailieu', fake: true },
      { u: 'https://bit.ly/3Hs9kQ2', fake: true },
      { u: 'https://canhbao.khonggianmang.gov.vn', fake: false },
      { u: 'https://zalo-vn.top/xac-minh', fake: true }
    ];
    let k = 0, right = 0;
    const card = h('div', { class: 'url-drill' });
    function anatomy(p) {
      const u = p.u; const wrap = h('div', { class: 'url-anat' });
      function seg(t, cls, lab) { return h('span', { class: 'ua ' + cls }, h('span', { class: 'ua-t' }, t), h('span', { class: 'ua-l' }, lab)); }
      wrap.append(seg(u.protocol + '//', u.protocol === 'https:' ? 'ua-ok' : 'ua-bad', u.protocol === 'https:' ? 'có mã hóa' : 'không mã hóa'));
      if (u.username) wrap.append(seg(decodeURIComponent(u.username) + '@', 'ua-bad', 'phần bị bỏ qua'));
      if (p.sub) wrap.append(seg(p.sub + '.', 'ua-sub', 'tên miền con'));
      wrap.append(seg(p.reg, p.trusted ? 'ua-reg ok' : 'ua-reg', 'tên miền thật'));
      const rest = u.pathname + u.search; if (rest && rest !== '/') wrap.append(seg(rest, 'ua-path', 'đường dẫn'));
      return wrap;
    }
    function draw() {
      card.innerHTML = '';
      if (k >= drills.length) { card.append(h('p', { class: 'choices-end' }, 'Kết quả luyện tập: ' + right + '/' + drills.length + '.'), h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { k = 0; right = 0; draw(); } }, 'Làm lại')); return; }
      const d = drills[k];
      const fb = h('div', { class: 'url-fb' });
      const acts = h('div', { class: 'ib-acts' });
      function go(fake) {
        acts.remove(); const ok = fake === d.fake; if (ok) right++;
        const p = parseUrl(d.u);
        fb.append(h('p', { class: ok ? 'ok' : 'bad' }, h('strong', {}, ok ? 'Chính xác. ' : 'Chưa chính xác. '), d.fake ? 'Đây là địa chỉ đáng ngờ.' : 'Đây là địa chỉ chính thức.'), anatomy(p));
        const ul = h('ul', { class: 'url-flags' }); (p.flags.length ? p.flags : ['Tên miền thật thuộc cơ quan nhà nước; vẫn nên tự gõ địa chỉ hoặc dùng dấu trang đã lưu.']).forEach(function (f) { ul.append(h('li', {}, f)); });
        fb.append(ul, h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { k++; draw(); } }, k === drills.length - 1 ? 'Xem kết quả' : 'Địa chỉ tiếp theo'));
      }
      acts.append(h('button', { class: 'btn btn-safe', type: 'button', onclick: function () { go(false); } }, 'Tin cậy'), h('button', { class: 'btn btn-seal', type: 'button', onclick: function () { go(true); } }, 'Đáng ngờ'));
      card.append(h('p', { class: 'choices-count' }, 'Địa chỉ ' + (k + 1) + '/' + drills.length), h('p', { class: 'url-big' }, d.u), acts, fb);
    }
    draw();
    const inp = h('input', { type: 'text', class: 'url-input', placeholder: 'Dán một đường liên kết, ví dụ https://vinhlong.gov.vn', 'aria-label': 'Đường liên kết cần phân tích', spellcheck: 'false' });
    const out = h('div', { class: 'url-out', 'aria-live': 'polite' });
    function analyze() {
      out.innerHTML = ''; if (!inp.value.trim()) return;
      const p = parseUrl(inp.value);
      if (!p) { out.append(h('p', { class: 'bad' }, 'Không đọc được địa chỉ này. Kiểm tra lại ký tự.')); return; }
      out.append(anatomy(p));
      const ul = h('ul', { class: 'url-flags' });
      if (p.flags.length) p.flags.forEach(function (f) { ul.append(h('li', {}, f)); });
      else ul.append(h('li', { class: 'ok' }, p.trusted ? 'Tên miền thuộc danh sách cơ quan nhà nước, dịch vụ quen thuộc.' : 'Chưa phát hiện dấu hiệu bất thường theo quy tắc đơn giản. Điều này không bảo đảm địa chỉ an toàn: hãy xác minh người gửi.'));
      out.append(ul);
    }
    inp.addEventListener('input', analyze);
    host.append(h('h4', { class: 'sub-h' }, 'Luyện tập: tin cậy hay đáng ngờ?'), card, h('h4', { class: 'sub-h' }, 'Công cụ phân tích đường liên kết'), inp, out, h('p', { class: 'muted small' }, 'Công cụ chỉ phân tích cấu trúc địa chỉ, không truy cập trang web. Kết quả mang tính hỗ trợ nhận diện.'));
  };

  /* ---------- Kiểm tra nội dung trước khi gửi trí tuệ nhân tạo ---------- */
  A.widgets.aiguard = function (host) {
    const L = '\\p{L}';
    const rules = [
      { k: 'secret', lv: 3, lab: 'Độ mật', re: new RegExp('(?<![' + L + '])(TUYỆT MẬT|TỐI MẬT|MẬT|[Tt]uyệt mật|[Tt]ối mật|tài liệu mật|văn bản mật|độ mật)(?![' + L + '])', 'gu'), ph: null },
      { k: 'id', lv: 3, lab: 'Số định danh cá nhân', re: /(?<!\d)\d{12}(?!\d)/g, ph: '[SỐ ĐỊNH DANH]' },
      { k: 'bank', lv: 3, lab: 'Số tài khoản', re: /(?<!\d)(?:STK|số tài khoản)[:\s]*\d[\d\s.]{7,18}\d/giu, ph: '[SỐ TÀI KHOẢN]' },
      { k: 'phone', lv: 2, lab: 'Số điện thoại', re: /(?<!\d)(?:\+84|0)(?:[\s.]?\d){9}(?!\d)/g, ph: '[SỐ ĐIỆN THOẠI]' },
      { k: 'mail', lv: 2, lab: 'Thư điện tử', re: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, ph: '[THƯ ĐIỆN TỬ]' },
      { k: 'name', lv: 2, lab: 'Họ tên', re: new RegExp('(?<![' + L + '])(?:ông|bà|anh|chị|đồng chí|Ông|Bà|Anh|Chị|Đồng chí)\\s+\\p{Lu}\\p{Ll}+(?:\\s+\\p{Lu}\\p{Ll}+){0,3}', 'gu'), ph: '[HỌ TÊN]' },
      { k: 'hr', lv: 2, lab: 'Nhân sự, kỷ luật, tố cáo', re: /(phương án nhân sự|dự kiến nhân sự|quy hoạch cán bộ|kỷ luật|kiểm điểm|tố cáo|khiếu nại|bổ nhiệm)/giu, ph: null },
      { k: 'draft', lv: 1, lab: 'Nội bộ, chưa ban hành', re: /(dự thảo|nội bộ|chưa ban hành|không phổ biến)/giu, ph: null }
    ];
    const presets = [
      { n: 'Tóm tắt văn bản công khai', t: 'Tóm tắt giúp tôi các nội dung chính của nghị quyết đã đăng trên cổng thông tin điện tử của tỉnh về phát triển kinh tế số, khoảng 200 chữ.' },
      { n: 'Danh sách hỗ trợ', t: 'Lọc trùng danh sách sau: bà Nguyễn Thị Lan, số định danh 086190012345, điện thoại 0918 123 456; ông Trần Văn Hùng, số định danh 086185098765, điện thoại 0907 654 321.' },
      { n: 'Dự thảo nhân sự', t: 'Viết lại cho gọn dự thảo phương án nhân sự nội bộ: đồng chí Lê Minh Tuấn dự kiến bổ nhiệm, đồng chí Phạm Văn Nam đang xem xét kỷ luật.' },
      { n: 'Tài liệu mật', t: 'Tài liệu MẬT: Kế hoạch triển khai... Hãy chuyển thành bản trình chiếu.' }
    ];
    const ta = h('textarea', { class: 'ai-ta', rows: 5, placeholder: 'Nhập nội dung định gửi cho công cụ trí tuệ nhân tạo...', 'aria-label': 'Nội dung định gửi' });
    const view = h('div', { class: 'ai-view', 'aria-hidden': 'true' });
    const verdict = h('div', { class: 'ai-verdict', 'aria-live': 'polite' });
    const found = h('ul', { class: 'ai-found' });
    let last = [];
    function scan(text) {
      const hits = [];
      rules.forEach(function (r) { r.re.lastIndex = 0; let m; while ((m = r.re.exec(text))) { hits.push({ s: m.index, e: m.index + m[0].length, r: r, t: m[0] }); if (m[0].length === 0) r.re.lastIndex++; } });
      hits.sort(function (a, b) { return a.s - b.s || b.r.lv - a.r.lv; });
      const out = []; let end = -1; hits.forEach(function (x) { if (x.s >= end) { out.push(x); end = x.e; } });
      return out;
    }
    function run() {
      const text = ta.value; last = scan(text);
      let html = '', p = 0;
      last.forEach(function (x) { html += U.esc(text.slice(p, x.s)) + '<mark class="lv' + x.r.lv + '" title="' + x.r.lab + '">' + U.esc(x.t) + '</mark>'; p = x.e; });
      html += U.esc(text.slice(p));
      view.innerHTML = html || '<span class="muted">Nội dung đánh dấu sẽ hiện ở đây.</span>';
      found.innerHTML = '';
      const groups = {}; last.forEach(function (x) { groups[x.r.lab] = groups[x.r.lab] || { n: 0, lv: x.r.lv }; groups[x.r.lab].n++; });
      Object.keys(groups).forEach(function (g) { found.append(h('li', { class: 'lv' + groups[g].lv }, g + ': ' + groups[g].n)); });
      const max = last.reduce(function (m, x) { return Math.max(m, x.r.lv); }, 0);
      const secret = last.some(function (x) { return x.r.k === 'secret'; });
      verdict.className = 'ai-verdict ' + (!text.trim() ? '' : max >= 3 ? 'bad' : max === 2 ? 'warn' : 'ok');
      verdict.textContent = !text.trim() ? '' : secret ? 'Không được gửi. Nội dung có dấu hiệu bí mật nhà nước: tuyệt đối không đưa lên bất kỳ nền tảng trực tuyến nào, kể cả sau khi ẩn danh hóa.'
        : max >= 3 ? 'Không được gửi nguyên văn. Có dữ liệu định danh cá nhân hoặc tài chính. Chỉ cân nhắc sau khi ẩn danh hóa và được cơ quan cho phép.'
        : max === 2 ? 'Cần ẩn danh hóa trước khi gửi. Nếu là thông tin nhân sự, kỷ luật, tố cáo: không gửi.'
        : max === 1 ? 'Lưu ý: nội dung nội bộ, chưa ban hành. Chỉ gửi phần cần góp ý câu chữ, không gửi nguyên văn.'
        : 'Chưa phát hiện thông tin nhạy cảm theo các quy tắc đơn giản. Vẫn cần tự rà soát và kiểm chứng kết quả trả về.';
      anon.disabled = !last.some(function (x) { return x.r.ph; }) || secret;
    }
    const anon = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      let text = ta.value; const hits = scan(text).filter(function (x) { return x.r.ph; }).sort(function (a, b) { return b.s - a.s; });
      hits.forEach(function (x) { text = text.slice(0, x.s) + x.r.ph + text.slice(x.e); });
      ta.value = text; run(); U.toast('Đã thay thông tin định danh bằng ký hiệu chung.', 'ok');
    } }, 'Ẩn danh hóa');
    ta.addEventListener('input', run);
    const pre = h('div', { class: 'pw-ex' }, h('span', {}, 'Mẫu:'), presets.map(function (p) { return h('button', { class: 'chip chip-sm', type: 'button', onclick: function () { ta.value = p.t; run(); } }, p.n); }));
    host.append(pre, h('div', { class: 'ai' }, h('div', {}, ta, h('div', { class: 'wg-actions' }, anon)), h('div', {}, h('p', { class: 'ai-cap' }, 'Nội dung đã đánh dấu'), view, found)), verdict);
    run();
  };

  /* ---------- Kiểm chứng câu trả lời của trí tuệ nhân tạo ---------- */
  A.widgets.verify = function (host) {
    const q = 'Văn bản điện tử có chữ ký số có giá trị pháp lý như văn bản giấy không? Căn cứ ở đâu?';
    const claims = [
      { t: 'Có. Văn bản điện tử được ký số đúng quy định có giá trị pháp lý như bản gốc văn bản giấy.', r: 'ok', v: 'Đúng về nguyên tắc: phù hợp Nghị định số 30/2020/NĐ-CP về công tác văn thư và Luật Giao dịch điện tử năm 2023. Khi đưa vào văn bản cần trích dẫn điều, khoản cụ thể sau khi đối chiếu văn bản gốc.' },
      { t: 'Căn cứ Điều 15 Thông tư liên tịch số 07/2025/TTLT-BNV-BTTTT về văn bản điện tử.', r: 'bad', v: 'Không tìm thấy văn bản này trên cơ sở dữ liệu văn bản pháp luật chính thức. Công cụ trí tuệ nhân tạo có thể tạo ra số hiệu văn bản trông hợp lý nhưng không tồn tại. (Trích dẫn giả định dùng cho bài tập.)' },
      { t: 'Theo thống kê, 97% cơ quan trên cả nước đã sử dụng chữ ký số cho toàn bộ văn bản.', r: 'warn', v: 'Không có nguồn. Số liệu không được đưa vào báo cáo khi chưa xác định được cơ quan công bố, thời điểm và phạm vi.' },
      { t: 'Khi bận, cán bộ có thể nhờ văn thư dùng thiết bị ký số của mình để ký thay.', r: 'bad', v: 'Sai. Chữ ký số gắn với cá nhân được cấp; giao thiết bị, mã PIN cho người khác là vi phạm quy định quản lý, sử dụng chữ ký số.' }
    ];
    const box = h('div', { class: 'ver' });
    const chat = h('div', { class: 'ver-chat' }, h('div', { class: 'ver-q' }, h('span', { class: 'ver-who' }, 'Cán bộ hỏi'), q));
    const a = h('div', { class: 'ver-a' }, h('span', { class: 'ver-who' }, 'Công cụ trí tuệ nhân tạo (mô phỏng)'));
    const res = h('div', { class: 'ver-res', 'aria-live': 'polite' }, h('p', { class: 'muted' }, 'Bấm vào từng ý trong câu trả lời để kiểm chứng.'));
    chat.append(a); box.append(chat, res);
    const btn = h('button', { class: 'btn btn-sm', type: 'button' }, 'Gửi câu hỏi');
    let done = 0;
    btn.addEventListener('click', async function () {
      btn.disabled = true;
      for (let i = 0; i < claims.length; i++) {
        const c = claims[i];
        const sp = h('button', { class: 'claim', type: 'button' }, '');
        a.append(sp, ' ');
        for (let j = 0; j <= c.t.length; j += 3) { if (!host.isConnected) return; sp.textContent = c.t.slice(0, j); await U.wait(12); }
        sp.textContent = c.t;
        sp.addEventListener('click', function () {
          if (!sp.classList.contains('checked')) { sp.classList.add('checked', c.r); done++; }
          res.innerHTML = '';
          res.append(h('p', { class: 'ver-tag ' + c.r }, c.r === 'ok' ? 'Đúng về nguyên tắc' : c.r === 'bad' ? 'Sai hoặc không tồn tại' : 'Không có nguồn'), h('p', {}, c.v));
          if (done === claims.length) res.append(h('p', { class: 'ver-sum' }, 'Chỉ 1/4 ý dùng được, và vẫn phải đối chiếu văn bản gốc. Người sử dụng chịu trách nhiệm về nội dung đưa vào văn bản của cơ quan.'));
        });
      }
    });
    host.append(h('div', { class: 'wg-actions' }, btn), box);
  };

  /* ---------- Sao lưu 3 – 2 – 1 ---------- */
  A.widgets.backup = function (host) {
    const tog = h('input', { type: 'checkbox', id: 'bk-off' }); tog.checked = true;
    const boxes = [
      { t: 'Bản chính', d: 'Máy tính làm việc', net: true },
      { t: 'Bản sao 1', d: 'Ổ lưu trữ của cơ quan (phương tiện thứ hai)', net: 'toggle' },
      { t: 'Bản sao 2', d: 'Bản tách rời, cất ở nơi khác theo quy định', net: false }
    ];
    const row = h('div', { class: 'bk' });
    const els = boxes.map(function (b) {
      const e = h('div', { class: 'bk-box' }, h('div', { class: 'bk-ico', 'aria-hidden': 'true' }), h('strong', {}, b.t), h('span', {}, b.d), h('span', { class: 'bk-state' }, 'An toàn'));
      row.append(e); return e;
    });
    const note = h('p', { class: 'bk-note', 'aria-live': 'polite' });
    function reset() { els.forEach(function (e) { e.classList.remove('hit', 'safe'); e.querySelector('.bk-state').textContent = 'An toàn'; }); note.textContent = ''; els[1].querySelector('span').textContent = tog.checked ? 'Ổ lưu trữ, ngắt kết nối sau mỗi lần sao lưu' : 'Ổ cứng ngoài luôn cắm vào máy'; host.querySelectorAll('.stamp').forEach(function (x) { x.remove(); }); }
    tog.addEventListener('change', reset);
    const run = h('button', { class: 'btn btn-seal btn-sm', type: 'button', onclick: async function () {
      reset(); run.disabled = true;
      const hit = [0]; if (!tog.checked) hit.push(1);
      for (let i = 0; i < 3; i++) {
        await U.wait(600);
        if (hit.indexOf(i) >= 0) { els[i].classList.add('hit'); els[i].querySelector('.bk-state').textContent = 'Bị mã hóa'; }
        else { els[i].classList.add('safe'); els[i].querySelector('.bk-state').textContent = 'Còn nguyên'; }
      }
      note.textContent = hit.length === 1 ? 'Mã độc chỉ mã hóa được dữ liệu đang kết nối với máy. Cơ quan khôi phục từ bản sao, không phải trả tiền chuộc.' : 'Ổ sao lưu luôn cắm vào máy nên bị mã hóa cùng lúc. Chỉ còn bản tách rời để khôi phục. Nếu không có bản tách rời, dữ liệu mất hoàn toàn.';
      U.stamp(host, 'Khôi phục được', 'good'); run.disabled = false;
    } }, 'Mô phỏng mã độc mã hóa dữ liệu');
    host.append(h('div', { class: 'wg-actions' }, run, h('label', { class: 'switch', for: 'bk-off' }, tog, h('span', {}, 'Ngắt ổ sao lưu sau mỗi lần sao lưu'))), row, note);
    reset();
  };

  /* ---------- Diễn tập xử lý sự cố ---------- */
  A.widgets.drill = function (host) {
    const D = A.data.drills; const LIMIT = 45;
    const box = h('div', { class: 'drill' });
    let timer = null;
    function menu() {
      clearInterval(timer); box.innerHTML = '';
      const g = h('div', { class: 'drill-menu' });
      D.forEach(function (d, i) { g.append(h('button', { class: 'drill-pick', type: 'button', onclick: function () { play(i); } }, h('strong', {}, 'Kịch bản ' + (i + 1)), h('span', {}, d.name))); });
      box.append(g);
    }
    function play(di) {
      const d = D[di]; let step = 0, score = 0;
      function show() {
        clearInterval(timer); box.innerHTML = '';
        if (step >= d.steps.length) {
          const max = d.steps.length * 2, pct = score / max;
          const end = h('div', { class: 'drill-end' }, h('h4', {}, d.name), h('p', { class: 'big-num' }, h('span', { class: 'n' }, String(score)), h('span', { class: 'u' }, '/' + max + ' điểm')),
            h('p', {}, pct === 1 ? 'Nhóm xử lý đúng toàn bộ tình huống.' : pct >= .7 ? 'Nhóm xử lý khá tốt; xem lại các bước chưa đạt.' : 'Cần ôn lại trình tự năm bước và các hành vi không được làm.'),
            h('div', { class: 'wg-actions' }, h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { play(di); } }, 'Làm lại kịch bản'), h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: menu }, 'Chọn kịch bản khác')));
          box.append(end); U.stamp(end, pct === 1 ? 'Đạt' : 'Xem lại', pct === 1 ? 'good' : 'warn'); return;
        }
        const s1 = d.steps[step]; let left = LIMIT; let answered = false;
        const clock = h('div', { class: 'drill-clock' }, h('div', { class: 'drill-clock-bar' }), h('span', {}, left + ' giây'));
        const fb = h('div', { class: 'choices-fb', 'aria-live': 'polite' });
        const opts = h('div', { class: 'choices-opts' });
        const next = h('button', { class: 'btn btn-sm', type: 'button', hidden: true, onclick: function () { step++; show(); } }, 'Tiếp tục');
        s1.o.forEach(function (o) {
          const b = h('button', { class: 'opt', type: 'button' }, o.t);
          b.addEventListener('click', function () {
            if (answered) return; answered = true; clearInterval(timer); score += o.s;
            Array.prototype.forEach.call(opts.children, function (x, j) { x.disabled = true; if (s1.o[j].s === 2) x.classList.add('right'); });
            if (o.s < 2) b.classList.add(o.s === 1 ? 'partial' : 'wrong');
            fb.className = 'choices-fb ' + (o.s === 2 ? 'ok' : o.s === 1 ? 'warn' : 'bad'); fb.textContent = o.f;
            next.hidden = false; next.focus();
          });
          opts.append(b);
        });
        box.append(h('p', { class: 'choices-count' }, d.name + '. Bước ' + (step + 1) + '/' + d.steps.length), clock, h('p', { class: 'choices-q' }, s1.t), opts, fb, next);
        timer = setInterval(function () {
          if (!host.isConnected) { clearInterval(timer); return; }
          left--; clock.querySelector('span').textContent = left + ' giây'; clock.firstChild.style.width = (left / LIMIT * 100) + '%';
          if (left <= 10) clock.classList.add('low');
          if (left <= 0) { clearInterval(timer); answered = true; Array.prototype.forEach.call(opts.children, function (x, j) { x.disabled = true; if (s1.o[j].s === 2) x.classList.add('right'); }); fb.className = 'choices-fb bad'; fb.textContent = 'Hết thời gian. Trong thực tế, chậm trễ làm thiệt hại lan rộng. Phương án đúng đã được đánh dấu.'; next.hidden = false; }
        }, 1000);
      }
      show();
    }
    host.append(box); menu();
  };
})(window.ATTT);
