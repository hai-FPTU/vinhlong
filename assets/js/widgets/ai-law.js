/* Học liệu phần pháp luật và an toàn khi dùng trí tuệ nhân tạo:
   dòng thời gian pháp lý, đúng – sai, AI đoán chữ, giới hạn của AI, dữ liệu qua biên giới, đèn tín hiệu sử dụng AI. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;
  const kindLab = { law: 'Luật', decree: 'Thông tư, nghị định', party: 'Văn bản của Đảng', guide: 'Văn bản hướng dẫn' };

  /* ---------- Dòng thời gian pháp lý ---------- */
  A.widgets.lawtimeline = function (host) {
    const M = A.data.milestones;
    const track = h('ol', { class: 'tl2' });
    const card = h('div', { class: 'tl2-card', 'aria-live': 'polite' });
    const dots = M.map(function (m, i) {
      const b = h('button', { class: 'tl2-dot k-' + m.kind, type: 'button' }, A.icon(m.i), h('span', { class: 'tl2-d' }, m.d), h('span', { class: 'tl2-t' }, m.t.replace(/\s*\(số[^)]*\)/, '').replace(/ có hiệu lực$/, '')));
      b.addEventListener('click', function () { show(i); });
      track.append(h('li', {}, b)); return b;
    });
    function show(i) {
      const m = M[i];
      dots.forEach(function (d, k) { d.classList.toggle('active', k === i); d.classList.toggle('past', k < i); });
      card.className = 'tl2-card k-' + m.kind; card.innerHTML = '';
      card.append(h('div', { class: 'tl2-head' }, A.icon(m.i), h('div', {}, h('p', { class: 'tl2-kind' }, kindLab[m.kind] + ', ' + m.d), h('h4', {}, m.t), h('p', { class: 'tl2-sub' }, m.sub))),
        h('ul', { class: 'tl2-points' }, m.p.map(function (x) { return h('li', {}, x); })));
      const r = dots[i].getBoundingClientRect(), tr = track.getBoundingClientRect();
      if (r.left < tr.left || r.right > tr.right) dots[i].scrollIntoView({ behavior: U.reduced() ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
    const play = h('button', { class: 'btn btn-sm', type: 'button' }, 'Chạy dòng thời gian');
    play.addEventListener('click', async function () {
      play.disabled = true;
      for (let i = 0; i < M.length; i++) { if (!host.isConnected) return; show(i); await U.wait(3200); }
      play.disabled = false;
    });
    host.append(h('div', { class: 'wg-actions' }, play), h('div', { class: 'tl2-wrap' }, track), card);
    show(M.length - 1);
  };

  /* ---------- Đúng hay sai ---------- */
  A.widgets.truefalse = function (host) {
    const Q = A.data.truefalse; let right = 0, done = 0;
    const grid = h('div', { class: 'tf' });
    const score = h('p', { class: 'tf-score', 'aria-live': 'polite' });
    Q.forEach(function (q, i) {
      const res = h('div', { class: 'tf-res' });
      const card = h('div', { class: 'tf-card' }, h('span', { class: 'tf-n' }, String(i + 1)), h('p', { class: 'tf-s' }, q.s));
      const bt = h('div', { class: 'tf-btns' });
      [[true, 'Đúng'], [false, 'Sai']].forEach(function (o) {
        const b = h('button', { class: 'btn btn-sm ' + (o[0] ? 'btn-safe' : 'btn-seal'), type: 'button' }, o[1]);
        b.addEventListener('click', function () {
          const ok = o[0] === q.a; done++; if (ok) right++;
          bt.remove(); card.classList.add(ok ? 'ok' : 'bad');
          res.append(h('strong', {}, (ok ? 'Chính xác. ' : 'Chưa chính xác. ') + 'Nhận định này ' + (q.a ? 'ĐÚNG. ' : 'SAI. ')), q.w);
          U.stamp(card, q.a ? 'Đúng' : 'Sai', q.a ? 'good' : 'bad');
          score.textContent = 'Đã trả lời ' + done + '/' + Q.length + ', chính xác ' + right + '.';
        });
        bt.append(b);
      });
      card.append(bt, res); grid.append(card);
    });
    host.append(grid, score);
  };

  /* ---------- AI đoán chữ tiếp theo ---------- */
  A.widgets.nextword = function (host) {
    const S = [
      { tab: 'Trích dẫn văn bản', prompt: 'Soạn đoạn căn cứ cho kế hoạch bảo vệ dữ liệu cá nhân năm 2026.', start: 'Căn cứ Nghị định số',
        cands: [['13/2023/NĐ-CP', 38], ['53/2022/NĐ-CP', 19], ['85/2016/NĐ-CP', 14], ['356/2025/NĐ-CP', 6], ['khác', 23]],
        tail: ' ngày 17/4/2023 của Chính phủ về bảo vệ dữ liệu cá nhân;',
        why: 'Mô hình chọn phương án xuất hiện nhiều nhất trong dữ liệu đã học. Văn bản mới hơn (Luật Bảo vệ dữ liệu cá nhân năm 2025, Nghị định 356/2025/NĐ-CP) ít xuất hiện nên có xác suất thấp. Kết quả: câu văn trôi chảy nhưng căn cứ không còn phù hợp.' },
      { tab: 'Số liệu', prompt: 'Viết đoạn mở đầu báo cáo, nêu tỷ lệ hộ nghèo của xã năm 2025.', start: 'Năm 2025, tỷ lệ hộ nghèo của xã giảm còn',
        cands: [['2,1%', 24], ['1,8%', 21], ['3,5%', 18], ['2,4%', 16], ['khác', 21]],
        tail: ', giảm 0,6 điểm phần trăm so với năm 2024.',
        why: 'AI không có số liệu của xã nhưng vẫn phải viết tiếp, nên chọn một con số “nghe hợp lý” và bịa thêm cả mức giảm. Đây là hiện tượng ảo giác (hallucination): nội dung sai được trình bày tự tin như sự thật.' }
    ];
    let cur = 0;
    const tabs = h('div', { class: 'tabs', role: 'tablist' });
    const stage = h('div', { class: 'nw' });
    S.forEach(function (s, i) { const b = h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': String(i === 0) }, s.tab); b.addEventListener('click', function () { cur = i; Array.prototype.forEach.call(tabs.children, function (x, k) { x.setAttribute('aria-selected', String(k === i)); }); draw(); }); tabs.append(b); });
    function draw() {
      const s = S[cur]; stage.innerHTML = '';
      const line = h('p', { class: 'nw-line' }, h('span', {}, s.start + ' '), h('span', { class: 'nw-blank' }, '▁▁▁'));
      const bars = h('div', { class: 'nw-bars' });
      const els = s.cands.map(function (c) { const fill = h('span', { class: 'nw-fill' }); const row = h('div', { class: 'nw-row' }, h('span', { class: 'nw-w' }, c[0]), h('span', { class: 'nw-track' }, fill), h('span', { class: 'nw-p' }, c[1] + '%')); bars.append(row); return { row: row, fill: fill, c: c }; });
      const why = h('p', { class: 'nw-why', hidden: true }, s.why);
      const go = h('button', { class: 'btn btn-sm', type: 'button' }, 'Cho AI viết tiếp');
      go.addEventListener('click', async function () {
        go.disabled = true;
        els.forEach(function (e) { e.fill.style.width = '0'; });
        await U.wait(150);
        els.forEach(function (e) { e.fill.style.width = e.c[1] * 2.2 + '%'; });
        await U.wait(1100);
        els[0].row.classList.add('pick');
        await U.wait(700);
        const blank = line.querySelector('.nw-blank'); blank.className = 'nw-word'; blank.textContent = s.cands[0][0];
        const tail = h('span', { class: 'nw-tail' }, ''); line.append(tail);
        for (let j = 0; j <= s.tail.length; j += 2) { if (!host.isConnected) return; tail.textContent = s.tail.slice(0, j); await U.wait(25); }
        why.hidden = false; go.textContent = 'Xem lại'; go.disabled = false;
        go.onclick = function () { draw(); }; 
      }, { once: true });
      stage.append(h('div', { class: 'nw-prompt' }, h('small', {}, 'Yêu cầu của cán bộ'), s.prompt), h('div', { class: 'nw-out' }, h('small', {}, 'AI đang viết'), line), h('p', { class: 'nw-cap' }, 'Các phương án AI cân nhắc cho chỗ trống (xác suất minh họa):'), bars, h('div', { class: 'wg-actions' }, go), why);
    }
    host.append(tabs, stage); draw();
  };

  /* ---------- Bốn giới hạn của AI ---------- */
  A.widgets.limits = function (host) {
    const L = [
      { i: 'alert', t: 'Ảo giác', en: 'Hallucination', q: 'Cho tôi 3 văn bản hướng dẫn về lưu trữ hồ sơ điện tử trong cơ quan Đảng.',
        a: '1. <mark>Hướng dẫn số 99-HD/VPTW ngày 31/02/2025</mark> về lưu trữ hồ sơ điện tử.<br>2. <mark>Quy định số 305-QĐ/TW</mark> về số hóa tài liệu lưu trữ của Đảng.<br>3. <mark>Thông tư 18/2024/TT-VPTW</mark> hướng dẫn chuẩn dữ liệu.',
        n: ['Số hiệu, trích yếu do AI tự tạo cho giống thật; ngày 31/02 không tồn tại; Văn phòng Trung ương Đảng không ban hành “thông tư”.', 'AI không có ý định lừa dối: nó chỉ tạo ra chuỗi chữ có vẻ hợp lý nhất.', 'Cách phòng: yêu cầu nguồn; tra cứu từng văn bản trên hệ thống chính thức.'] },
      { i: 'scale', t: 'Thiên lệch', en: 'Bias', q: 'Viết đoạn mô tả hình ảnh minh họa cho bài “Cán bộ lãnh đạo tiêu biểu của xã”.',
        a: 'Hình ảnh <mark>một người đàn ông trung niên</mark> mặc sơ mi trắng, đứng trước trụ sở… <mark>Anh ấy</mark> là trụ cột của gia đình, <mark>vợ anh</mark> luôn hỗ trợ việc nhà để anh yên tâm công tác.',
        n: ['AI học từ dữ liệu có sẵn định kiến nên lặp lại định kiến về giới, tuổi, vùng miền, dân tộc.', 'Nếu đưa nguyên văn vào văn bản, tài liệu tuyên truyền, cơ quan có thể truyền đi thông điệp phân biệt đối xử.', 'Cách phòng: rà soát cách diễn đạt; yêu cầu AI trung lập; người có trách nhiệm duyệt nội dung.'] },
      { i: 'clock', t: 'Kiến thức lỗi thời', en: 'Knowledge cutoff', q: 'Hiện nay luật nào quy định về an toàn thông tin mạng?',
        a: 'Hiện nay có hai luật chính: <mark>Luật An toàn thông tin mạng số 86/2015/QH13</mark> và <mark>Luật An ninh mạng năm 2018</mark>. Hai luật này đang có hiệu lực…',
        n: ['Mỗi mô hình chỉ biết dữ liệu đến một thời điểm; nhiều công cụ không cho biết mốc đó.', 'Câu trả lời trên đúng với năm 2024, nhưng sai từ 01/7/2026 khi Luật An ninh mạng năm 2025 có hiệu lực.', 'Cách phòng: với văn bản pháp luật, số liệu, nhân sự, luôn kiểm tra thông tin mới nhất từ nguồn chính thức.'] },
      { i: 'users', t: 'Chiều theo người hỏi', en: 'Sycophancy', q: 'Tài liệu nội bộ chỉ cần xóa tên người là có thể dán vào AI an toàn, đúng không?',
        a: '<mark>Đúng vậy</mark>, sau khi xóa thông tin định danh, <mark>bạn hoàn toàn có thể yên tâm</mark> sử dụng tài liệu với AI để tiết kiệm thời gian.',
        n: ['Mô hình có xu hướng đồng ý với giả định có sẵn trong câu hỏi.', 'Thực tế: tài liệu nội bộ vẫn chứa thông tin công việc chưa công khai; tài liệu mật thì tuyệt đối không được đưa lên.', 'Cách phòng: hỏi trung lập (“có rủi ro gì không?”), hỏi chiều ngược lại, và đối chiếu quy định.'] }
    ];
    const tabs = h('div', { class: 'lim-tabs', role: 'tablist' });
    const pane = h('div', { class: 'lim-pane' });
    L.forEach(function (x, i) {
      const b = h('button', { class: 'lim-tab', type: 'button', role: 'tab', 'aria-selected': String(i === 0) }, A.icon(x.i), h('span', {}, h('strong', {}, x.t), h('small', {}, x.en)));
      b.addEventListener('click', function () { Array.prototype.forEach.call(tabs.children, function (y, k) { y.setAttribute('aria-selected', String(k === i)); }); show(i); });
      tabs.append(b);
    });
    function show(i) {
      const x = L[i]; pane.innerHTML = '';
      const ans = h('div', { class: 'lim-a' }, h('small', {}, 'AI trả lời'), h('div', { html: x.a }));
      const notes = h('ol', { class: 'lim-notes' }, x.n.map(function (n) { return h('li', {}, n); }));
      const reveal = h('button', { class: 'btn btn-seal btn-sm', type: 'button' }, 'Chỉ ra điểm sai');
      reveal.addEventListener('click', function () { ans.classList.add('show'); notes.hidden = false; reveal.remove(); });
      notes.hidden = true;
      pane.append(h('div', { class: 'lim-chat' }, h('div', { class: 'lim-q' }, h('small', {}, 'Cán bộ hỏi'), x.q), ans), h('div', { class: 'wg-actions' }, reveal), notes);
    }
    host.append(tabs, pane); show(0);
  };

  /* ---------- Dữ liệu qua biên giới ---------- */
  A.widgets.border = function (host) {
    const SC = [
      { k: 'foreign', l: 'AI công cộng ở nước ngoài', to: 3, tone: 'bad', v: 'Dữ liệu rời khỏi lãnh thổ Việt Nam',
        p: ['Máy chủ của nhà cung cấp đặt ở nước ngoài, chịu pháp luật nước ngoài; cơ quan không kiểm soát, không thu hồi được.', 'Đưa dữ liệu cá nhân của công dân lên đây là chuyển dữ liệu cá nhân xuyên biên giới, phải tuân thủ Luật Bảo vệ dữ liệu cá nhân.', 'Chỉ dùng cho nội dung đã công khai hoặc không chứa thông tin công việc; tuyệt đối không dùng cho tài liệu mật, dữ liệu cá nhân, thông tin nội bộ.'] },
      { k: 'domestic', l: 'Nền tảng AI được cơ quan cho phép', to: 1, tone: 'warn', v: 'Dữ liệu ở lại Việt Nam, trong phạm vi được phép',
        p: ['Nền tảng AI hỗ trợ công vụ ở phạm vi quốc gia yêu cầu mô hình ngôn ngữ tiếng Việt do doanh nghiệp Việt Nam làm chủ và hạ tầng đặt tại Việt Nam.', 'Được dùng cho công việc theo hướng dẫn của cơ quan; vẫn phải ẩn danh hóa, kiểm chứng kết quả.', 'Không dùng để xử lý hồ sơ, dữ liệu thuộc bí mật nhà nước.'] },
      { k: 'secret', l: 'Tài liệu bí mật nhà nước', to: 0, tone: 'lock', v: 'Không rời khỏi thiết bị được bố trí',
        p: ['Chỉ soạn thảo, lưu giữ trên máy tính không kết nối mạng hoặc Mạng LAN độc lập theo Luật Bảo vệ bí mật nhà nước năm 2025.', 'Không nhập lên bất kỳ nền tảng AI trực tuyến nào, trong nước hay nước ngoài.', 'Nghiêm cấm dùng AI, công nghệ mới để xâm phạm bí mật nhà nước.'] }
    ];
    const zones = [
      { i: 'laptop', t: 'Máy của cán bộ' }, { i: 'server', t: 'Nền tảng AI trong nước' }, { i: 'flag', t: 'Biên giới' }, { i: 'globe', t: 'Máy chủ nước ngoài' }
    ];
    const map = h('div', { class: 'bd-map' }, h('span', { class: 'bd-vn' }, 'Lãnh thổ Việt Nam'), h('span', { class: 'bd-out' }, 'Nước ngoài'));
    const zEls = zones.map(function (z, i) { const e = h('div', { class: 'bd-z bd-z' + i }, i === 2 ? null : A.icon(z.i), h('span', {}, z.t)); map.append(e); return e; });
    const pkt = h('div', { class: 'bd-pkt' }, A.icon('doc')); map.append(pkt);
    const info = h('div', { class: 'bd-info', 'aria-live': 'polite' });
    const bar = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': 'Tình huống' });
    SC.forEach(function (s, i) {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': 'false' }, s.l);
      b.addEventListener('click', function () { Array.prototype.forEach.call(bar.children, function (x) { x.setAttribute('aria-checked', String(x === b)); }); run(i); });
      bar.append(b);
    });
    function run(i) {
      const s = SC[i];
      map.setAttribute('data-to', s.to); map.className = 'bd-map t-' + s.tone;
      pkt.classList.remove('go'); void pkt.offsetWidth; pkt.classList.add('go');
      zEls.forEach(function (z, k) { z.classList.toggle('hit', k === s.to); });
      info.className = 'bd-info t-' + s.tone; info.innerHTML = '';
      info.append(h('h4', {}, s.v), h('ul', {}, s.p.map(function (x) { return h('li', {}, x); })));
    }
    host.append(bar, map, info);
    bar.children[0].click();
  };

  /* ---------- Đèn tín hiệu sử dụng AI ---------- */
  A.widgets.traffic = function (host) {
    const C = [
      { c: 'g', t: 'Được dùng', s: 'Sau khi đọc lại, kiểm chứng', i: ['Gợi ý dàn ý bài phát biểu, bài tuyên truyền chung', 'Sửa chính tả, câu chữ văn bản đã công khai', 'Giải thích khái niệm, thuật ngữ', 'Tóm tắt nghị quyết, văn bản đã đăng công khai', 'Dịch tài liệu công khai'] },
      { c: 'y', t: 'Thận trọng', s: 'Chỉ trên nền tảng được cơ quan cho phép; ẩn danh hóa; kiểm chứng', i: ['Góp ý câu chữ dự thảo chưa ban hành (bỏ tên người, số liệu nhạy cảm)', 'Tra cứu quy định pháp luật (bắt buộc đối chiếu văn bản gốc)', 'Phân tích số liệu tổng hợp đã bỏ thông tin định danh'] },
      { c: 'r', t: 'Không được', s: 'Trên bất kỳ công cụ AI công cộng nào', i: ['Tài liệu bí mật nhà nước', 'Dữ liệu cá nhân của công dân, hồ sơ cán bộ, đảng viên', 'Nội dung nhân sự, kỷ luật, khiếu nại, tố cáo', 'Tài khoản, mật khẩu, cấu hình hệ thống', 'Để AI quyết định thay người có thẩm quyền'] }
    ];
    const g = h('div', { class: 'tr' });
    C.forEach(function (x) {
      g.append(h('div', { class: 'tr-col tr-' + x.c }, h('div', { class: 'tr-head' }, h('span', { class: 'tr-light' }), h('div', {}, h('strong', {}, x.t), h('small', {}, x.s))), h('ul', {}, x.i.map(function (y) { return h('li', {}, y); }))));
    });
    host.append(g);
  };
})(window.ATTT);
