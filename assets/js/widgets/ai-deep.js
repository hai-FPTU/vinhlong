/* Chủ đề chuyên sâu: an toàn khi sử dụng trí tuệ nhân tạo.
   Học liệu: việc cán bộ dùng AI, mốc dữ liệu, kiểm tra bản tóm tắt, phòng thí nghiệm thiên lệch,
   dữ liệu ẩn trong tệp, kiểm tra trước khi bấm Gửi. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- Cán bộ đang dùng AI vào việc gì ---------- */
  A.widgets.aiuses = function (host) {
    const T = [
      { i: 'doc', t: 'Soạn văn bản, báo cáo', r: 3, risk: 'Dán dự thảo, số liệu, tên người vào AI; AI tự thêm căn cứ, số liệu không có thật.', do: 'Chỉ nhờ góp ý bố cục, câu chữ; tự điền số liệu, căn cứ từ nguồn chính thức.' },
      { i: 'note', t: 'Tóm tắt tài liệu', r: 3, risk: 'Tải cả tệp lên (kèm bình luận ẩn, lịch sử sửa); bản tóm tắt có thể thêm ý không có trong văn bản gốc.', do: 'Chỉ tóm tắt tài liệu đã công khai; đối chiếu từng ý với bản gốc.' },
      { i: 'scale', t: 'Tra cứu pháp luật', r: 3, risk: 'AI trích dẫn văn bản đã hết hiệu lực hoặc không tồn tại.', do: 'Dùng AI để gợi hướng tìm kiếm; căn cứ lấy từ cơ sở dữ liệu văn bản chính thức.' },
      { i: 'chat', t: 'Hỏi đáp chính sách', r: 2, risk: 'Câu trả lời trôi chảy nhưng sai hoặc không phù hợp địa phương; có thể chiều theo cách hỏi.', do: 'Hỏi trung lập; kiểm tra với văn bản hướng dẫn của cấp trên.' },
      { i: 'globe', t: 'Dịch tài liệu', r: 2, risk: 'Đưa tài liệu nội bộ lên máy chủ nước ngoài để dịch.', do: 'Chỉ dịch tài liệu công khai; tài liệu nội bộ dùng công cụ được cơ quan cho phép.' },
      { i: 'database', t: 'Xử lý danh sách, số liệu', r: 3, risk: 'Tải danh sách công dân, đảng viên lên AI để lọc, thống kê: chuyển dữ liệu cá nhân ra ngoài.', do: 'Làm trên phần mềm của cơ quan; nếu cần AI, chỉ dùng số liệu tổng hợp không định danh.' },
      { i: 'camera', t: 'Tạo ảnh, video, giọng nói', r: 3, risk: 'Tạo ảnh, giọng nói giống người thật có thể vi phạm Luật An ninh mạng năm 2025.', do: 'Không tạo hình ảnh, giọng nói của người thật; ghi rõ sản phẩm do AI tạo khi dùng minh họa.' },
      { i: 'pen', t: 'Viết bài phát biểu, tuyên truyền', r: 2, risk: 'Định kiến, thuật ngữ không phù hợp lập trường, quan điểm chính thức.', do: 'Rà soát kỹ thuật ngữ chính trị, chủ quyền; người duyệt chịu trách nhiệm.' }
    ];
    const lab = ['', 'Thấp', 'Trung bình', 'Cao'];
    const g = h('div', { class: 'au' });
    const bars = [];
    T.forEach(function (x) {
      const bar = h('span', { class: 'au-fill r' + x.r });
      bars.push([bar, x.r]);
      const card = h('button', { class: 'au-card', type: 'button', 'aria-expanded': 'false' },
        h('span', { class: 'au-front' }, A.icon(x.i), h('strong', {}, x.t), h('span', { class: 'au-meter' }, h('span', { class: 'au-lab' }, 'Rủi ro: ' + lab[x.r]), h('span', { class: 'au-track' }, bar))),
        h('span', { class: 'au-back' }, h('small', { class: 'bad' }, 'Rủi ro'), h('span', {}, x.risk), h('small', { class: 'ok' }, 'Cách làm đúng'), h('span', {}, x.do)));
      card.addEventListener('click', function () { const on = card.classList.toggle('open'); card.setAttribute('aria-expanded', String(on)); });
      g.append(card);
    });
    host.append(g, h('p', { class: 'muted small' }, 'Bấm vào từng thẻ để xem rủi ro và cách làm đúng.'));
    U.onVisible(host, function () { bars.forEach(function (b, k) { setTimeout(function () { b[0].style.width = (b[1] / 3 * 100) + '%'; }, U.reduced() ? 0 : k * 120); }); });
  };

  /* ---------- Mốc dữ liệu huấn luyện ---------- */
  A.widgets.cutoff = function (host) {
    const Y0 = 2019, Y1 = 2027;
    const E = [
      { y: 2023.5, t: 'Nghị định 13/2023 về bảo vệ dữ liệu cá nhân có hiệu lực' },
      { y: 2024.5, t: 'Luật Giao dịch điện tử 2023 có hiệu lực' },
      { y: 2025.5, t: 'Luật Dữ liệu có hiệu lực' },
      { y: 2026.0, t: 'Luật Bảo vệ dữ liệu cá nhân có hiệu lực' },
      { y: 2026.17, t: 'Luật Bảo vệ bí mật nhà nước 2025, Luật Trí tuệ nhân tạo có hiệu lực' },
      { y: 2026.5, t: 'Luật An ninh mạng 2025 có hiệu lực' }
    ];
    const pct = function (y) { return (y - Y0) / (Y1 - Y0) * 100; };
    const axis = h('div', { class: 'co-axis' });
    for (let y = Y0; y <= Y1; y++) axis.append(h('span', { class: 'co-tick', style: { left: pct(y) + '%' } }, String(y)));
    const fill = h('div', { class: 'co-fill' }, h('span', {}, 'Dữ liệu AI đã học'));
    const mark = h('div', { class: 'co-mark' }, h('span', {}, 'Mốc dữ liệu'));
    const now = h('div', { class: 'co-now', style: { left: pct(2026.75) + '%' } }, h('span', {}, 'Hôm nay'));
    const legend = h('ol', { class: 'co-legend' });
    const evs = E.map(function (e, k) {
      const d = h('div', { class: 'co-ev', style: { left: pct(e.y) + '%', top: (26 + (k % 3) * 30) + 'px' } }, h('span', { class: 'co-dot' }, String(k + 1)));
      const st = h('span', { class: 'co-st' });
      const li = h('li', {}, h('span', { class: 'co-num' }, String(k + 1)), h('span', { class: 'co-lt' }, e.t), st);
      legend.append(li);
      return { d: d, e: e, li: li, st: st };
    });
    const lane = h('div', { class: 'co-lane' }, fill, mark, now, evs.map(function (x) { return x.d; }));
    const slider = h('input', { type: 'range', min: '2022', max: '2026.7', step: '0.1', value: '2024.5', class: 'co-slider', 'aria-label': 'Mốc dữ liệu của mô hình' });
    const out = h('p', { class: 'co-out', 'aria-live': 'polite' });
    function upd() {
      const c = +slider.value;
      fill.style.width = pct(c) + '%'; mark.style.left = pct(c) + '%';
      let miss = 0;
      evs.forEach(function (x) { const known = x.e.y <= c; x.d.classList.toggle('known', known); x.li.classList.toggle('known', known); x.st.textContent = known ? 'AI đã học' : 'AI không biết'; if (!known) miss++; });
      const yy = Math.floor(c), mm = Math.round((c - yy) * 12) + 1;
      out.innerHTML = '';
      out.append(h('strong', {}, 'Mô hình có dữ liệu đến khoảng tháng ' + Math.min(mm, 12) + '/' + yy + '. '), miss ? 'Nó không biết ' + miss + ' thay đổi pháp luật quan trọng sau mốc này, nhưng vẫn trả lời tự tin như thể đó là thông tin hiện hành.' : 'Mô hình biết các mốc trên, nhưng vẫn có thể nhầm lẫn khi trích dẫn chi tiết.');
    }
    slider.addEventListener('input', upd);
    const play = h('button', { class: 'btn btn-sm', type: 'button' }, 'Mô phỏng');
    play.addEventListener('click', async function () {
      play.disabled = true;
      for (let v = 2022; v <= 2026.7; v += 0.1) { if (!host.isConnected) return; slider.value = v.toFixed(1); upd(); await U.wait(45); }
      slider.value = '2024.5'; upd(); play.disabled = false;
    });
    host.append(h('div', { class: 'co' }, lane, axis), legend, h('div', { class: 'co-ctl' }, h('label', {}, 'Kéo để đổi mốc dữ liệu của mô hình'), slider, play), out);
    upd();
  };

  /* ---------- Kiểm tra bản tóm tắt của AI ---------- */
  A.widgets.summarycheck = function (host) {
    const src = ['Ngày 15/9/2026, Đảng ủy xã họp rà soát tiến độ chuyển đổi số.', 'Hội nghị thống nhất hoàn thành số hóa hồ sơ đảng viên trước ngày 31/12/2026.', 'Giao Văn phòng Đảng ủy chủ trì, phối hợp Bộ phận một cửa thực hiện.', 'Kinh phí thực hiện từ nguồn chi thường xuyên năm 2026.'];
    const S = [
      { t: 'Đảng ủy xã họp ngày 15/9/2026 về chuyển đổi số.', ok: true, src: 0 },
      { t: 'Hạn hoàn thành số hóa hồ sơ đảng viên là 30/11/2026.', ok: false, why: 'Sai: văn bản gốc ghi 31/12/2026.' },
      { t: 'Văn phòng Đảng ủy chủ trì thực hiện.', ok: true, src: 2 },
      { t: 'Tổng kinh phí được phê duyệt là 250 triệu đồng.', ok: false, why: 'Bịa: văn bản gốc không nêu số tiền.' },
      { t: 'Đồng chí Phó Bí thư trực tiếp chỉ đạo, báo cáo hằng tuần.', ok: false, why: 'Bịa: văn bản gốc không giao người chỉ đạo, không có chế độ báo cáo hằng tuần.' },
      { t: 'Kinh phí lấy từ nguồn chi thường xuyên.', ok: true, src: 3 }
    ];
    const left = h('div', { class: 'sc2-src' }, h('small', {}, 'Văn bản gốc (thông báo kết luận, giả định)'), src.map(function (x, i) { return h('p', { 'data-i': i }, x); }));
    const right = h('div', { class: 'sc2-sum' }, h('small', {}, 'Bản tóm tắt do AI viết'));
    let locked = false;
    const els = S.map(function (x) {
      const b = h('button', { class: 'sc2-s', type: 'button', 'aria-pressed': 'false' }, x.t);
      b.addEventListener('click', function () { if (locked) return; const on = b.classList.toggle('picked'); b.setAttribute('aria-pressed', String(on)); });
      b.addEventListener('mouseenter', function () { if (x.src != null && locked) left.querySelector('[data-i="' + x.src + '"]').classList.add('hl'); });
      b.addEventListener('mouseleave', function () { Array.prototype.forEach.call(left.querySelectorAll('.hl'), function (p) { p.classList.remove('hl'); }); });
      right.append(b); return b;
    });
    const fb = h('div', { class: 'sc2-fb', 'aria-live': 'polite' });
    const chk = h('button', { class: 'btn btn-seal btn-sm', type: 'button' }, 'Kiểm tra');
    chk.addEventListener('click', function () {
      locked = true; chk.remove(); let right2 = 0;
      const ul = h('ul', {});
      els.forEach(function (b, i) {
        const x = S[i], p = b.classList.contains('picked');
        if (!x.ok) { b.classList.add(p ? 'r-ok' : 'r-miss'); ul.append(h('li', {}, h('strong', {}, '“' + x.t + '” '), x.why + (p ? '' : ' (bỏ sót)'))); if (p) right2++; }
        else if (p) b.classList.add('r-wrong'); else { b.classList.add('r-fine'); right2++; }
      });
      fb.className = 'sc2-fb ' + (right2 === S.length ? 'ok' : 'warn');
      fb.append(h('p', {}, h('strong', {}, 'Đúng ' + right2 + '/' + S.length + ' câu. '), 'Bản tóm tắt có 3 câu không có trong văn bản gốc, nhưng được viết cùng giọng văn chắc chắn như các câu đúng. Di chuột vào câu đúng để thấy câu tương ứng trong văn bản gốc.'), ul);
    });
    host.append(h('div', { class: 'sc2' }, left, h('div', { class: 'sc2-arrow', 'aria-hidden': 'true' }, A.icon('ai')), right), h('div', { class: 'wg-actions' }, chk), fb);
  };

  /* ---------- Phòng thí nghiệm thiên lệch ---------- */
  A.widgets.biaslab = function (host) {
    const tabs = [
      { name: 'Định kiến giới', prompts: [
        { lab: 'Cán bộ nam', p: 'Viết nhận xét cuối năm cho đồng chí Nguyễn Văn An: hoàn thành xuất sắc nhiệm vụ, chủ trì 3 đề án chuyển đổi số.', o: 'Đồng chí Nguyễn Văn An là cán bộ <mark>quyết đoán</mark>, <mark>có tầm nhìn chiến lược</mark> và <mark>tố chất lãnh đạo</mark>. Đồng chí đã chủ trì thành công 3 đề án chuyển đổi số, <mark>đủ năng lực đảm nhận vị trí cao hơn</mark>.' },
        { lab: 'Cán bộ nữ', p: 'Viết nhận xét cuối năm cho đồng chí Nguyễn Thị An: hoàn thành xuất sắc nhiệm vụ, chủ trì 3 đề án chuyển đổi số.', o: 'Đồng chí Nguyễn Thị An là cán bộ <mark>chu đáo, cẩn thận</mark>, <mark>hòa nhã với đồng nghiệp</mark>. Đồng chí đã tham gia tích cực 3 đề án chuyển đổi số và <mark>khéo léo cân bằng giữa công việc và gia đình</mark>.' }
      ], lesson: 'Cùng một thành tích, AI dùng từ ngữ khác nhau theo giới tính: nam được mô tả là “lãnh đạo”, nữ được mô tả là “chu đáo”, “cân bằng gia đình”; thậm chí “chủ trì” bị đổi thành “tham gia”. Dùng nguyên văn trong hồ sơ nhận xét, đánh giá cán bộ là thiếu khách quan.' },
      { name: 'Quan điểm, thuật ngữ', prompts: [
        { lab: 'Hỏi AI nước ngoài', p: 'Giới thiệu ngắn về các quần đảo ở biển Đông.', o: 'Các quần đảo chính ở <mark>South China Sea</mark> gồm <mark>Paracel Islands (Xisha)</mark> và <mark>Spratly Islands (Nansha)</mark>, là <mark>khu vực tranh chấp giữa nhiều bên</mark>…' },
        { lab: 'Cách diễn đạt đúng', p: 'Nội dung phải dùng trong tài liệu của cơ quan.', o: 'Biển Đông có hai quần đảo <strong>Hoàng Sa</strong> và <strong>Trường Sa</strong> thuộc chủ quyền của Việt Nam. Diễn đạt theo thuật ngữ, lập trường chính thức của Đảng, Nhà nước.' }
      ], lesson: 'Công cụ AI nước ngoài học chủ yếu từ dữ liệu nước ngoài nên có thể dùng tên gọi, cách diễn đạt không phù hợp lập trường của Việt Nam về chủ quyền, lịch sử, chính trị. Không sử dụng nguyên văn trong văn bản, bài tuyên truyền; người duyệt phải rà soát kỹ thuật ngữ.' }
    ];
    const bar = h('div', { class: 'tabs', role: 'tablist' });
    const pane = h('div', {});
    tabs.forEach(function (t, i) { const b = h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': String(i === 0) }, t.name); b.addEventListener('click', function () { Array.prototype.forEach.call(bar.children, function (x, k) { x.setAttribute('aria-selected', String(k === i)); }); show(i); }); bar.append(b); });
    function show(i) {
      const t = tabs[i]; pane.innerHTML = '';
      const cols = h('div', { class: 'bl' });
      const outs = t.prompts.map(function (p) {
        const o = h('div', { class: 'bl-out' }, h('small', {}, 'AI trả lời (mô phỏng)'), h('div', { html: '' }));
        cols.append(h('div', { class: 'bl-col' }, h('p', { class: 'bl-lab' }, p.lab), h('div', { class: 'bl-p' }, h('small', {}, 'Yêu cầu'), p.p), o));
        return { o: o, html: p.o };
      });
      const lesson = h('p', { class: 'bl-lesson', hidden: true }, t.lesson);
      const go = h('button', { class: 'btn btn-sm', type: 'button' }, 'Gửi hai yêu cầu');
      go.addEventListener('click', async function () {
        go.disabled = true;
        for (let k = 0; k < outs.length; k++) {
          const tgt = outs[k].o.lastChild; const plain = outs[k].html.replace(/<[^>]+>/g, '');
          for (let j = 0; j <= plain.length; j += 4) { if (!host.isConnected) return; tgt.textContent = plain.slice(0, j); await U.wait(14); }
          tgt.innerHTML = outs[k].html;
        }
        await U.wait(300);
        cols.classList.add('show'); lesson.hidden = false; go.remove();
      });
      pane.append(cols, h('div', { class: 'wg-actions' }, go), lesson);
    }
    host.append(bar, pane, h('p', { class: 'muted small' }, 'Câu trả lời là mô phỏng dựa trên các dạng thiên lệch đã được ghi nhận ở công cụ AI phổ biến.'));
    show(0);
  };

  /* ---------- Dữ liệu ẩn trong tệp ---------- */
  A.widgets.hiddendata = function (host) {
    const L = [
      { i: 'doc', t: 'Nội dung hiển thị', d: 'Dự thảo báo cáo công tác cán bộ quý III.' },
      { i: 'chat', t: 'Bình luận ẩn ở lề', d: '“Đồng chí B đang bị xem xét kỷ luật, chưa công bố.”' },
      { i: 'refresh', t: 'Lịch sử chỉnh sửa (Track Changes)', d: 'Đoạn đã xóa vẫn còn: danh sách 5 cán bộ dự kiến điều động.' },
      { i: 'users', t: 'Thuộc tính tệp', d: 'Tác giả, cơ quan, thời gian tạo, đường dẫn thư mục máy chủ nội bộ.' },
      { i: 'camera', t: 'Ảnh chèn trong tệp', d: 'Ảnh chụp bằng điện thoại còn tọa độ GPS nơi chụp và chữ trong ảnh AI đọc được.' }
    ];
    const doc = h('div', { class: 'hd-doc' }, A.icon('doc'), h('span', {}, 'DuThao_BaoCao_CanBo.docx'));
    const stack = h('div', { class: 'hd-stack' });
    const els = L.map(function (l, k) { const e = h('div', { class: 'hd-layer l' + k }, A.icon(l.i), h('div', {}, h('strong', {}, l.t), h('span', {}, l.d))); stack.append(e); return e; });
    const lesson = h('p', { class: 'hd-lesson', hidden: true }, 'Khi tải tệp lên công cụ AI, toàn bộ các lớp dữ liệu trên đều được gửi đi và AI đọc được, kể cả phần người dùng không nhìn thấy trên màn hình. Xóa tên người trong phần nội dung là chưa đủ.');
    const btn = h('button', { class: 'btn btn-seal btn-sm', type: 'button' }, 'Tải tệp lên AI');
    btn.addEventListener('click', async function () {
      btn.disabled = true; lesson.hidden = true; els.forEach(function (e) { e.classList.remove('out'); });
      doc.classList.add('up');
      for (let k = 0; k < els.length; k++) { await U.wait(550); if (!host.isConnected) return; els[k].classList.add('out'); }
      lesson.hidden = false; btn.disabled = false; btn.textContent = 'Xem lại'; doc.classList.remove('up');
    });
    host.append(h('div', { class: 'wg-actions' }, btn), h('div', { class: 'hd' }, doc, stack), lesson);
  };

  /* ---------- Kiểm tra trước khi bấm Gửi ---------- */
  A.widgets.sendcheck = function (host) {
    const Q = ['Nội dung không thuộc bí mật nhà nước, không có dấu độ mật', 'Không có họ tên, số định danh, số điện thoại, địa chỉ của công dân, cán bộ', 'Không có nội dung nhân sự, kỷ luật, khiếu nại, tố cáo, thông tin nội bộ chưa công bố', 'Đang dùng nền tảng được cơ quan cho phép (hoặc nội dung đã công khai)', 'Sẽ kiểm chứng kết quả với văn bản gốc, số liệu chính thức', 'Tôi là người chịu trách nhiệm cuối cùng về nội dung sử dụng'];
    const list = h('ul', { class: 'checklist sc3-list' });
    const cbs = Q.map(function (q, i) { const id = 'sc3-' + i; const cb = h('input', { type: 'checkbox', id: id }); cb.addEventListener('change', upd); list.append(h('li', {}, cb, h('label', { for: id }, q))); return cb; });
    const send = h('button', { class: 'sc3-send', type: 'button', disabled: true }, A.icon('share'), h('span', {}, 'Gửi'));
    const box = h('div', { class: 'sc3-box' }, h('div', { class: 'sc3-input' }, 'Nhập yêu cầu cho công cụ AI…'), send);
    const msg = h('p', { class: 'sc3-msg', 'aria-live': 'polite' });
    function upd() {
      const n = cbs.filter(function (c) { return c.checked; }).length;
      const ok = n === cbs.length;
      send.disabled = !ok; box.classList.toggle('ready', ok);
      box.style.setProperty('--p', (n / cbs.length * 100) + '%');
      msg.textContent = ok ? 'Đủ 6 điều kiện: có thể gửi. Sau khi nhận kết quả, nhớ kiểm chứng.' : 'Còn ' + (cbs.length - n) + ' điều kiện chưa bảo đảm. Chưa được bấm Gửi.';
      msg.className = 'sc3-msg ' + (ok ? 'ok' : '');
    }
    send.addEventListener('click', function () { U.toast('Đã gửi. Hãy kiểm chứng kết quả trước khi sử dụng.', 'ok'); });
    host.append(h('div', { class: 'sc3' }, list, h('div', {}, box, msg)));
    upd();
  };
})(window.ATTT);
