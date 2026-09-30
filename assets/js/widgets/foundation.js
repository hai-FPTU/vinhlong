/* Học liệu tương tác buổi sáng: tam giác CIA, bản đồ dữ liệu, bàn làm việc, Wi-Fi công cộng, mật khẩu, xác thực hai lớp, tự kiểm tra thiết bị. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  /* ---------- Tam giác bí mật – toàn vẹn – sẵn sàng ---------- */
  A.widgets.cia = function (host) {
    const P = [
      { name: 'Tính bí mật', x: 230, y: 56, lx: 230, ly: 18,
        def: 'Thông tin chỉ được tiếp cận bởi người có thẩm quyền, trong đúng phạm vi được giao.',
        ex: 'Danh sách đảng viên kèm số định danh cá nhân bị chuyển tiếp vào một nhóm Zalo có người ngoài cơ quan.',
        fx: ['Xem xét trách nhiệm cá nhân làm lộ thông tin; xử phạt theo quy định bảo vệ dữ liệu cá nhân.', 'Thông tin nội bộ bị khai thác, xuyên tạc.', 'Người dân mất niềm tin khi dữ liệu của họ bị lộ.', 'Phải tạm dừng, rà soát quy trình xử lý dữ liệu.'] },
      { name: 'Tính toàn vẹn', x: 64, y: 322, lx: 64, ly: 372,
        def: 'Thông tin chính xác, đầy đủ, không bị sửa đổi trái phép khi lưu trữ, xử lý, truyền đưa.',
        ex: 'Số liệu báo cáo gửi cấp trên bị sửa trên máy nhiễm mã độc; văn bản giả mạo chữ ký, con dấu của cơ quan lan truyền trên mạng.',
        fx: ['Văn bản sai lệch có thể dẫn tới quyết định sai, phát sinh trách nhiệm.', 'Thông tin sai được lợi dụng để kích động, gây hoang mang.', 'Cơ quan phải đính chính, uy tín bị ảnh hưởng.', 'Phải đối chiếu lại toàn bộ dữ liệu, chậm tiến độ.'] },
      { name: 'Tính sẵn sàng', x: 396, y: 322, lx: 396, ly: 372,
        def: 'Thông tin, hệ thống sử dụng được ngay khi người có thẩm quyền cần.',
        ex: 'Máy tính văn thư bị mã hóa dữ liệu; hệ thống quản lý văn bản ngừng hoạt động đúng ngày phải ban hành văn bản.',
        fx: ['Chậm thời hạn giải quyết thủ tục theo quy định.', 'Chỉ đạo, điều hành bị gián đoạn.', 'Người dân phải chờ đợi, phản ánh.', 'Công việc đình trệ đến khi khôi phục xong.'] }
    ];
    const fxNames = ['Pháp lý', 'Chính trị', 'Uy tín', 'Gián đoạn phục vụ'];
    const svg = s('svg', { viewBox: '0 0 460 390', class: 'cia-svg', role: 'group', 'aria-label': 'Tam giác ba thuộc tính an toàn thông tin' });
    const E = [[0, 1], [1, 2], [2, 0]].map(function (p) { const l = s('line', { x1: P[p[0]].x, y1: P[p[0]].y, x2: P[p[1]].x, y2: P[p[1]].y, class: 'cia-edge' }); l._p = p; svg.append(l); return l; });
    const core = s('circle', { cx: 230, cy: 232, r: 58, class: 'cia-core' });
    svg.append(core, s('text', { x: 230, y: 227, class: 'cia-core-t', text: 'Thông tin' }), s('text', { x: 230, y: 247, class: 'cia-core-t', text: 'công vụ' }));
    const V = P.map(function (p, i) {
      const g = s('g', { class: 'cia-v', tabindex: 0, role: 'button', 'aria-label': p.name });
      g.append(s('circle', { cx: p.x, cy: p.y, r: 34, class: 'cia-dot' }), s('text', { x: p.x, y: p.y + 6, class: 'cia-letter', text: ['B', 'T', 'S'][i] }), s('text', { x: p.lx, y: p.ly, class: 'cia-label', text: p.name }));
      g.addEventListener('click', function () { pick([i]); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick([i]); } });
      svg.append(g); return g;
    });
    const panel = h('div', { class: 'cia-panel', 'aria-live': 'polite' });
    function pick(ids, ransom) {
      V.forEach(function (g, i) { g.classList.toggle('on', ids.indexOf(i) >= 0); });
      E.forEach(function (l) { l.classList.toggle('broken', ids.indexOf(l._p[0]) >= 0 || ids.indexOf(l._p[1]) >= 0); });
      core.classList.toggle('hit', ids.length > 0);
      panel.innerHTML = '';
      if (ransom) {
        panel.append(h('h4', {}, 'Mã độc tống tiền: cả ba thuộc tính cùng bị xâm phạm'),
          h('p', {}, 'Nhiều nhóm tấn công hiện nay sao chép dữ liệu ra ngoài trước khi mã hóa (xâm phạm tính bí mật), có thể sửa, xóa dữ liệu (xâm phạm tính toàn vẹn), sau đó mã hóa để cơ quan không làm việc được (xâm phạm tính sẵn sàng), rồi đe dọa công bố dữ liệu nếu không trả tiền.'),
          h('p', { class: 'muted' }, 'Vì vậy, có bản sao lưu vẫn chưa đủ: phải ngăn chặn từ đầu, trước khi mã độc vào được máy.'));
        return;
      }
      const p = P[ids[0]];
      const fx = h('div', { class: 'fx-grid' });
      p.fx.forEach(function (t, k) { fx.append(h('div', { class: 'fx' }, h('strong', {}, fxNames[k]), h('span', {}, t))); });
      panel.append(h('h4', {}, p.name), h('p', {}, p.def), h('p', { class: 'cia-ex' }, h('strong', {}, 'Khi bị xâm phạm: '), p.ex), fx);
    }
    const btn = h('button', { class: 'btn btn-seal btn-sm', type: 'button', onclick: async function () {
      for (let i = 0; i < 3; i++) { const ids = [0, 1, 2].slice(0, i + 1); V.forEach(function (g, k) { g.classList.toggle('on', ids.indexOf(k) >= 0); }); E.forEach(function (l) { l.classList.toggle('broken', ids.indexOf(l._p[0]) >= 0 && ids.indexOf(l._p[1]) >= 0); }); core.classList.add('hit'); await U.wait(500); }
      pick([0, 1, 2], true); U.stamp(host, 'Sự cố', 'bad');
    } }, 'Mô phỏng sự cố mã độc tống tiền');
    host.append(h('div', { class: 'cia' }, svg, panel), h('div', { class: 'wg-actions' }, btn));
    pick([0]);
  };

  /* ---------- Bản đồ dữ liệu công vụ ---------- */
  A.widgets.datamap = function (host) {
    const N = [
      { t: 'Hệ thống quản lý văn bản', r: 0, n: 'Kênh chính thức, có phân quyền, nhật ký và sao lưu tập trung.' },
      { t: 'Máy tính cơ quan', r: 1, n: 'Cần khóa màn hình, cập nhật, sao lưu theo quy định.' },
      { t: 'Thư điện tử công vụ', r: 1, n: 'Được cơ quan quản lý; cần mật khẩu mạnh và xác thực hai lớp.' },
      { t: 'Máy in, photocopy dùng chung', r: 2, n: 'Tài liệu bỏ quên trên khay; bộ nhớ máy lưu bản chụp.' },
      { t: 'Nhóm Zalo công việc', r: 2, n: 'Tệp lưu trên máy chủ của nhà cung cấp và trên điện thoại của mọi thành viên.' },
      { t: 'Điện thoại cá nhân', r: 2, n: 'Ảnh chụp văn bản tự đồng bộ lên đám mây cá nhân; dễ thất lạc.' },
      { t: 'USB cá nhân', r: 3, n: 'Dễ thất lạc; lây mã độc giữa máy nhà và máy cơ quan.' },
      { t: 'Gmail, Google Drive cá nhân', r: 3, n: 'Nằm ngoài sự quản lý của cơ quan; không thu hồi được khi chuyển công tác.' },
      { t: 'Máy tính ở nhà', r: 3, n: 'Dùng chung với người thân, ít được bảo vệ, thường có phần mềm không rõ nguồn gốc.' }
    ];
    const W = 640, H = 400, cx = 320, cy = 200;
    const svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'dm-svg', role: 'group', 'aria-label': 'Các nơi lưu dữ liệu công vụ' });
    const lines = s('g'); svg.append(lines);
    svg.append(s('circle', { cx: cx, cy: cy, r: 52, class: 'dm-core' }), s('text', { x: cx, y: cy - 4, class: 'dm-core-t', text: 'Dữ liệu' }), s('text', { x: cx, y: cy + 16, class: 'dm-core-t', text: 'công vụ' }));
    const sel = U.store.get('datamap', []);
    const els = N.map(function (n, i) {
      const ang = -Math.PI / 2 + i * 2 * Math.PI / N.length;
      const x = cx + Math.cos(ang) * 250, y = cy + Math.sin(ang) * 158;
      const ln = s('line', { x1: cx, y1: cy, x2: x, y2: y, class: 'dm-line r' + n.r }); lines.append(ln);
      const g = s('g', { class: 'dm-node r' + n.r, tabindex: 0, role: 'checkbox', 'aria-checked': 'false', 'aria-label': n.t });
      const words = n.t.split(' '); const mid = Math.ceil(words.length / 2);
      g.append(s('rect', { x: x - 72, y: y - 23, width: 144, height: 46, rx: 8 }),
        s('text', { x: x, y: y - 3, text: words.slice(0, mid).join(' ') }), s('text', { x: x, y: y + 14, text: words.slice(mid).join(' ') }));
      function toggle() { const k = sel.indexOf(i); if (k >= 0) sel.splice(k, 1); else sel.push(i); U.store.set('datamap', sel); update(); }
      g.addEventListener('click', toggle);
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      svg.append(g); return { g: g, ln: ln };
    });
    const chipList = h('div', { class: 'dm-list', role: 'group', 'aria-label': 'Các nơi lưu dữ liệu công vụ' });
    const chips = N.map(function (n, i) {
      const c = h('button', { class: 'dm-chip r' + n.r, type: 'button', 'aria-pressed': 'false' }, n.t);
      c.addEventListener('click', function () { const k = sel.indexOf(i); if (k >= 0) sel.splice(k, 1); else sel.push(i); U.store.set('datamap', sel); update(); });
      chipList.append(c); return c;
    });
    const meter = h('div', { class: 'meter' }, h('div', { class: 'meter-bar' }));
    const label = h('p', { class: 'meter-label' });
    const advice = h('ul', { class: 'dm-advice' });
    function update() {
      let sum = 0;
      els.forEach(function (e, i) { const on = sel.indexOf(i) >= 0; e.g.classList.toggle('on', on); e.ln.classList.toggle('on', on); e.g.setAttribute('aria-checked', String(on)); chips[i].classList.toggle('on', on); chips[i].setAttribute('aria-pressed', String(on)); if (on) sum += N[i].r; });
      const pct = Math.min(100, Math.round(sum / 14 * 100));
      meter.firstChild.style.width = pct + '%';
      meter.className = 'meter ' + (pct < 25 ? 'lo' : pct < 55 ? 'mid' : 'hi');
      label.textContent = sel.length === 0 ? 'Chưa chọn nơi nào.' : 'Mức độ phân tán và rủi ro: ' + (pct < 25 ? 'thấp' : pct < 55 ? 'trung bình' : 'cao') + ' (' + pct + '/100).';
      advice.innerHTML = '';
      sel.filter(function (i) { return N[i].r >= 2; }).forEach(function (i) { advice.append(h('li', {}, h('strong', {}, N[i].t + ': '), N[i].n)); });
    }
    host.append(h('div', { class: 'dm' }, svg), chipList, meter, label, advice);
    update();
  };

  /* ---------- Bàn làm việc: tìm điểm mất an toàn ---------- */
  A.widgets.desk = function (host) {
    const spots = [
      { x: 468, y: 150, r: 34, t: 'Mật khẩu dán trên màn hình', d: 'Bất kỳ ai đi ngang qua cũng đọc được. Ghi nhớ bằng cụm mật khẩu hoặc dùng trình quản lý mật khẩu theo hướng dẫn của cơ quan.' },
      { x: 280, y: 212, r: 40, t: 'Rời chỗ không khóa màn hình', d: 'Tệp hồ sơ đảng viên đang mở trong khi ghế trống. Nhấn Windows + L mỗi khi rời chỗ; đặt khóa tự động sau 5 phút.' },
      { x: 396, y: 234, r: 34, t: 'Cửa sổ quảng cáo công cụ bẻ khóa bản quyền', d: 'Phần mềm bẻ khóa là con đường phổ biến để cài mã độc đánh cắp mật khẩu. Chỉ cài phần mềm do bộ phận kỹ thuật cung cấp.' },
      { x: 578, y: 256, r: 28, t: 'USB không rõ nguồn gốc cắm vào máy', d: 'USB nhặt được hoặc của người lạ có thể chứa mã độc tự chạy. Không cắm; nộp cho bộ phận kỹ thuật.' },
      { x: 98, y: 262, r: 32, t: 'Chụp văn bản gửi nhóm Zalo', d: 'Hình ảnh văn bản lưu trên điện thoại, máy chủ nhà cung cấp và máy mọi thành viên. Gửi nhận văn bản qua hệ thống công vụ.' },
      { x: 172, y: 285, r: 30, t: 'Tài liệu mật để trên bàn', d: 'Tài liệu bí mật nhà nước phải cất giữ trong tủ có khóa khi không làm việc; không để người không có trách nhiệm tiếp cận.' },
      { x: 350, y: 70, r: 50, t: 'Mật khẩu Wi-Fi yếu dán công khai', d: 'Mạng khách dùng mật khẩu dễ đoán, dán công khai và dùng chung với mạng nội bộ. Mạng khách phải tách riêng khỏi mạng làm việc.' },
      { x: 690, y: 234, r: 42, t: 'Tài liệu bỏ quên ở máy in', d: 'Danh sách có dữ liệu cá nhân nằm trên khay máy in dùng chung. Lấy tài liệu ngay khi in; dùng chức năng in bảo mật nếu có.' }
    ];
    const art = '' +
      '<rect width="800" height="480" fill="var(--scene-wall)"/><rect y="330" width="800" height="150" fill="var(--scene-floor)"/>' +
      '<rect x="40" y="40" width="170" height="130" rx="6" fill="#CFE3F5" stroke="#9FB3C8" stroke-width="4"/><line x1="125" y1="40" x2="125" y2="170" stroke="#9FB3C8" stroke-width="4"/><line x1="40" y1="105" x2="210" y2="105" stroke="#9FB3C8" stroke-width="4"/>' +
      '<g><rect x="255" y="40" width="190" height="60" rx="6" fill="#fff" stroke="#9AA6B8" stroke-width="2"/><text x="268" y="64" font-size="15" font-weight="700" fill="#15233B">Wi-Fi khách</text><text x="268" y="86" font-size="14" fill="#15233B">Mật khẩu: 12345678</text></g>' +
      '<rect x="600" y="230" width="170" height="100" fill="#A7B1C0"/><g transform="translate(610,150)"><rect width="150" height="80" rx="8" fill="#B8C2D0" stroke="#8C97A8" stroke-width="2"/><rect x="20" y="-12" width="110" height="14" fill="#fff" stroke="#9AA6B8"/><rect x="18" y="66" width="114" height="34" fill="#fff" stroke="#9AA6B8"/><text x="26" y="82" font-size="10" fill="#15233B">Danh sách hộ nghèo</text><text x="26" y="94" font-size="9" fill="#5B6675">Họ tên – Số định danh</text><circle cx="130" cy="22" r="5" fill="#2E9E6A"/></g>' +
      '<rect x="60" y="300" width="520" height="22" fill="#8B6A4E"/><rect x="80" y="322" width="16" height="120" fill="#6E533D"/><rect x="544" y="322" width="16" height="120" fill="#6E533D"/>' +
      '<rect x="222" y="126" width="252" height="164" rx="8" fill="#223049"/><rect x="232" y="136" width="232" height="140" fill="#F4F7FB"/><rect x="232" y="136" width="232" height="18" fill="#1E3A6B"/><text x="240" y="149" font-size="10" fill="#fff">Ho_so_dang_vien.xlsx</text>' +
      '<g stroke="#C9D2DF"><line x1="240" y1="168" x2="330" y2="168"/><line x1="240" y1="182" x2="330" y2="182"/><line x1="240" y1="196" x2="330" y2="196"/><line x1="240" y1="210" x2="330" y2="210"/><line x1="240" y1="224" x2="330" y2="224"/><line x1="240" y1="238" x2="330" y2="238"/><line x1="240" y1="252" x2="330" y2="252"/></g>' +
      '<rect x="336" y="206" width="118" height="60" rx="4" fill="#fff" stroke="#B4152B" stroke-width="2"/><text x="343" y="222" font-size="10" font-weight="700" fill="#B4152B">Kích hoạt bản quyền</text><text x="343" y="236" font-size="9" fill="#15233B">Tải công cụ crack miễn phí</text><rect x="343" y="244" width="52" height="15" rx="2" fill="#B4152B"/><text x="349" y="255" font-size="9" fill="#fff">Tải ngay</text>' +
      '<rect x="338" y="290" width="22" height="10" fill="#223049"/><rect x="250" y="292" width="170" height="8" rx="2" fill="#3A4A66"/>' +
      '<g transform="rotate(8 468 150)"><rect x="436" y="120" width="68" height="58" fill="#FFE56B" stroke="#E0C443"/><text x="442" y="140" font-size="12" fill="#15233B">MK:</text><text x="442" y="158" font-size="11" font-weight="700" fill="#15233B">Vinhlong@1</text></g>' +
      '<rect x="494" y="232" width="74" height="68" rx="4" fill="#3A4A66"/><circle cx="510" cy="248" r="4" fill="#7BD88F"/><rect x="566" y="250" width="12" height="10" fill="#9AA6B8"/><rect x="576" y="247" width="30" height="16" rx="3" fill="#E07A1F"/>' +
      '<rect x="75" y="222" width="46" height="78" rx="7" fill="#223049"/><rect x="79" y="230" width="38" height="62" fill="#E6F0FF"/><rect x="82" y="234" width="30" height="8" rx="3" fill="#0068FF"/><rect x="84" y="248" width="28" height="30" fill="#fff" stroke="#9AA6B8"/><line x1="87" y1="256" x2="108" y2="256" stroke="#9AA6B8"/><line x1="87" y1="263" x2="108" y2="263" stroke="#9AA6B8"/><line x1="87" y1="270" x2="100" y2="270" stroke="#9AA6B8"/>' +
      '<rect x="136" y="266" width="76" height="34" fill="#F1D9A8" stroke="#B08A4A"/><rect x="142" y="270" width="64" height="26" fill="#fff" stroke="#C9D2DF"/><rect x="158" y="274" width="34" height="16" fill="none" stroke="#B4152B" stroke-width="2"/><text x="163" y="286" font-size="10" font-weight="800" fill="#B4152B">MẬT</text>' +
      '<g fill="#5B6675"><rect x="300" y="360" width="120" height="16" rx="6"/><rect x="354" y="376" width="12" height="60"/><rect x="316" y="436" width="88" height="8" rx="4"/><rect x="300" y="330" width="120" height="30" rx="8" opacity=".8"/></g>';
    const svg = s('svg', { viewBox: '0 0 800 480', class: 'desk-svg', role: 'group', 'aria-label': 'Hình minh họa bàn làm việc, bấm vào các điểm nghi ngờ' });
    svg.innerHTML = art;
    const marks = s('g'); svg.append(marks);
    const found = [];
    const list = h('ol', { class: 'desk-list' });
    const count = h('p', { class: 'desk-count', 'aria-live': 'polite' });
    spots.forEach(function (sp, i) {
      const hit = s('circle', { cx: sp.x, cy: sp.y, r: sp.r + 6, class: 'desk-hit', tabindex: 0, role: 'button', 'aria-label': 'Điểm kiểm tra ' + (i + 1) });
      function f() { if (found.indexOf(i) >= 0) return; found.push(i); mark(i); }
      hit.addEventListener('click', f);
      hit.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } });
      svg.append(hit);
    });
    svg.addEventListener('click', function (e) { if (e.target.classList && e.target.classList.contains('desk-hit')) return; const r = svg.getBoundingClientRect(); const ripple = s('circle', { cx: (e.clientX - r.left) / r.width * 800, cy: (e.clientY - r.top) / r.height * 480, r: 10, class: 'desk-miss' }); marks.append(ripple); setTimeout(function () { ripple.remove(); }, 700); });
    function mark(i) {
      const sp = spots[i], k = found.length;
      marks.append(s('circle', { cx: sp.x, cy: sp.y, r: sp.r, class: 'desk-ring' }), s('circle', { cx: sp.x + sp.r * .72, cy: sp.y - sp.r * .72, r: 13, class: 'desk-badge' }), s('text', { x: sp.x + sp.r * .72, y: sp.y - sp.r * .72 + 5, class: 'desk-badge-t', text: String(k) }));
      list.append(h('li', { class: 'fresh' }, h('strong', {}, sp.t), h('span', {}, sp.d)));
      update();
    }
    function update() {
      count.textContent = 'Đã tìm được ' + found.length + '/' + spots.length + ' điểm.';
      if (found.length === spots.length) U.stamp(host.querySelector('.desk-stage'), 'Đủ 8 điểm', 'good');
    }
    const hint = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { svg.classList.add('hinting'); setTimeout(function () { svg.classList.remove('hinting'); }, 2400); } }, 'Gợi ý vị trí');
    const all = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { spots.forEach(function (sp, i) { if (found.indexOf(i) < 0) { found.push(i); mark(i); } }); } }, 'Hiện tất cả');
    host.append(h('p', { class: 'swipe-hint' }, 'Vuốt ngang để xem toàn bộ hình'), h('div', { class: 'desk' }, h('div', { class: 'desk-stage' }, svg), h('div', { class: 'desk-side' }, count, list)), h('div', { class: 'wg-actions' }, hint, all));
    update();
  };

  /* ---------- Mạng Wi-Fi công cộng ---------- */
  A.widgets.wifi = function (host) {
    const svg = s('svg', { viewBox: '0 0 660 260', class: 'wifi-svg', role: 'img', 'aria-label': 'Mô phỏng dữ liệu đi qua mạng Wi-Fi công cộng' });
    const P = { lap: [70, 130], ap: [330, 130], net: [590, 130], atk: [330, 226], tower: [330, 34] };
    svg.innerHTML = '' +
      '<line class="wf-path" x1="70" y1="130" x2="330" y2="130"/><line class="wf-path" x1="330" y1="130" x2="590" y2="130"/>' +
      '<line class="wf-path wf-sniff" x1="330" y1="130" x2="330" y2="226"/>' +
      '<polyline class="wf-path wf-cell" points="70,130 330,34 590,130"/>' +
      '<g class="wf-node"><rect x="30" y="104" width="80" height="52" rx="6"/><text x="70" y="176">Máy của cán bộ</text></g>' +
      '<g class="wf-node"><circle cx="330" cy="130" r="30"/><text x="330" y="136" class="wf-in">Wi-Fi</text><text x="330" y="94">Wi-Fi quán cà phê</text></g>' +
      '<g class="wf-node"><ellipse cx="590" cy="130" rx="54" ry="32"/><text x="590" y="136" class="wf-in">Internet</text></g>' +
      '<g class="wf-node wf-atk"><rect x="276" y="206" width="108" height="40" rx="6"/><text x="330" y="231" class="wf-in">Kẻ nghe lén</text></g>' +
      '<g class="wf-node wf-cellnode"><path d="M320 46 L330 16 L340 46 Z"/><text x="372" y="30">Trạm 4G/5G</text></g>';
    const dots = s('g'); svg.append(dots);
    const cap = h('div', { class: 'wf-cap', 'aria-live': 'polite' });
    const modes = {
      http: { l: 'Trang không mã hóa (http)', cap: 'Kẻ nghe lén cùng mạng đọc được nội dung: tai_khoan=vanthu.xa&mat_khau=Vinhlong@1', bad: true },
      https: { l: 'Trang có mã hóa (https)', cap: 'Nội dung đã được mã hóa, kẻ nghe lén không đọc được. Tuy vậy vẫn thấy được tên trang đang truy cập, và kẻ gian có thể dựng điểm Wi-Fi giả trùng tên để dẫn tới trang đăng nhập giả.', bad: false, warn: true },
      cell: { l: 'Dữ liệu di động 4G/5G', cap: 'Dữ liệu đi qua mạng di động của nhà mạng, không đi qua điểm Wi-Fi dùng chung. Đây là lựa chọn an toàn hơn khi làm việc bên ngoài.', bad: false }
    };
    let mode = 'http', t0 = performance.now();
    const bar = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': 'Kiểu kết nối' });
    Object.keys(modes).forEach(function (k) {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(k === mode) }, modes[k].l);
      b.addEventListener('click', function () { mode = k; Array.prototype.forEach.call(bar.children, function (x) { x.setAttribute('aria-checked', String(x === b)); }); set(); });
      bar.append(b);
    });
    function set() {
      svg.setAttribute('data-mode', mode);
      cap.className = 'wf-cap ' + (modes[mode].bad ? 'bad' : modes[mode].warn ? 'warn' : 'ok');
      cap.textContent = modes[mode].cap;
    }
    function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
    function pos(route, t) { const seg = t * (route.length - 1); const i = Math.min(Math.floor(seg), route.length - 2); return lerp(route[i], route[i + 1], seg - i); }
    const pk = []; for (let i = 0; i < 4; i++) { const c = s('circle', { r: 7, class: 'wf-dot' }); const c2 = s('circle', { r: 6, class: 'wf-copy' }); dots.append(c, c2); pk.push([c, c2]); }
    function frame(now) {
      if (!host.isConnected) return;
      const T = (now - t0) / 2600;
      pk.forEach(function (p, i) {
        const t = (((T + i / 4) % 1) + 1) % 1;
        const route = mode === 'cell' ? [P.lap, P.tower, P.net] : [P.lap, P.ap, P.net];
        const q = pos(route, t);
        p[0].setAttribute('cx', q[0]); p[0].setAttribute('cy', q[1]);
        p[0].setAttribute('class', 'wf-dot' + (mode === 'http' ? '' : ' enc'));
        if (mode !== 'cell' && t > 0.5) { const c = lerp(P.ap, P.atk, Math.min(1, (t - 0.5) * 2.2)); p[1].setAttribute('cx', c[0]); p[1].setAttribute('cy', c[1]); p[1].style.opacity = 1; p[1].setAttribute('class', 'wf-copy' + (mode === 'http' ? '' : ' enc')); }
        else p[1].style.opacity = 0;
      });
      requestAnimationFrame(frame);
    }
    host.append(bar, h('p', { class: 'swipe-hint' }, 'Vuốt ngang để xem toàn bộ sơ đồ'), h('div', { class: 'wifi' }, svg), cap);
    set();
    if (!U.reduced()) requestAnimationFrame(frame); else { pk.forEach(function (p) { p[0].style.display = 'none'; p[1].style.display = 'none'; }); }
  };

  /* ---------- Phòng thử mật khẩu ---------- */
  A.widgets.password = function (host) {
    const common = ['123456', '12345678', '123456789', '1234567890', 'password', 'matkhau', 'admin', 'qwerty', 'abc123', '111111', '123123', 'iloveyou', 'anhyeuem', 'emyeuanh', '000000', 'p@ssw0rd', 'aa123456'];
    const words = ['vinhlong', 'vietnam', 'tinhuy', 'dangbo', 'dangvien', 'ubnd', 'matkhau', 'password', 'admin', 'vanthu', 'congvu', 'hochiminh', 'saigon', 'mekong', 'cantho', 'bentre', 'travinh', 'nguyen', 'tran', 'huynh'];
    const input = h('input', { type: 'password', class: 'pw-input', placeholder: 'Nhập mật khẩu thử nghiệm', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Mật khẩu thử nghiệm' });
    const show = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', 'aria-pressed': 'false' }, 'Hiện');
    show.addEventListener('click', function () { const v = input.type === 'password'; input.type = v ? 'text' : 'password'; show.textContent = v ? 'Ẩn' : 'Hiện'; show.setAttribute('aria-pressed', String(v)); });
    const bar = h('div', { class: 'pw-meter' }, h('div', { class: 'pw-fill' }));
    const verdict = h('p', { class: 'pw-verdict', 'aria-live': 'polite' });
    const checks = [
      ['len', 'Từ 12 ký tự trở lên'], ['low', 'Có chữ thường'], ['up', 'Có chữ hoa'], ['num', 'Có chữ số'], ['sym', 'Có ký hiệu'],
      ['word', 'Không chứa từ phổ biến, tên địa phương, họ phổ biến'], ['year', 'Không chứa năm (19xx, 20xx)'], ['seq', 'Không có chuỗi liên tiếp hoặc lặp lại']
    ];
    const ul = h('ul', { class: 'pw-checks' });
    const liMap = {}; checks.forEach(function (c) { liMap[c[0]] = h('li', {}, c[1]); ul.append(liMap[c[0]]); });
    function norm(x) { return x.toLowerCase().replace(/@/g, 'a').replace(/0/g, 'o').replace(/[1!|]/g, 'i').replace(/3/g, 'e').replace(/\$/g, 's').replace(/5/g, 's'); }
    function fmt(sec) {
      if (sec < 1) return 'dưới 1 giây';
      const u = [[31536000 * 1e6, 'triệu năm'], [31536000 * 1000, 'nghìn năm'], [31536000, 'năm'], [2592000, 'tháng'], [86400, 'ngày'], [3600, 'giờ'], [60, 'phút'], [1, 'giây']];
      for (let i = 0; i < u.length; i++) if (sec >= u[i][0]) { const v = sec / u[i][0]; return (v >= 1000 && i === 0 ? 'hơn 1000' : Math.round(v).toLocaleString('vi-VN')) + ' ' + u[i][1]; }
    }
    function analyze(p) {
      const r = { len: p.length >= 12, low: /[a-z]/.test(p), up: /[A-Z]/.test(p), num: /\d/.test(p), sym: /[^A-Za-z0-9]/.test(p) };
      const n = norm(p);
      let pool = (r.low ? 26 : 0) + (r.up ? 26 : 0) + (r.num ? 10 : 0) + (r.sym ? 33 : 0); if (!pool) pool = 1;
      let eff = p.length;
      const hitWords = words.filter(function (w) { return n.indexOf(w) >= 0; });
      if (common.indexOf(p.toLowerCase()) >= 0) eff = 0.4;
      hitWords.forEach(function (w) { eff -= (w.length - 1.5); });
      const yr = p.match(/(19|20)\d{2}/g) || []; yr.forEach(function () { eff -= 2.5; });
      const seq = p.match(/(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf)/gi) || []; seq.forEach(function () { eff -= 2.5; });
      const rep = p.match(/(.)\1{2,}/g) || []; rep.forEach(function (m) { eff -= (m.length - 1); });
      r.word = hitWords.length === 0 && common.indexOf(p.toLowerCase()) < 0; r.year = yr.length === 0; r.seq = seq.length === 0 && rep.length === 0;
      eff = Math.max(eff, 0.4);
      const log10 = eff * Math.log10(pool);
      const sec = Math.pow(10, log10) / 2 / 1e10;
      return { r: r, log10: log10, sec: sec };
    }
    function update() {
      const p = input.value;
      if (!p) { bar.firstChild.style.width = '0'; verdict.textContent = 'Kết quả sẽ hiện khi nhập.'; verdict.className = 'pw-verdict'; checks.forEach(function (c) { liMap[c[0]].className = ''; }); return; }
      const a = analyze(p);
      checks.forEach(function (c) { liMap[c[0]].className = a.r[c[0]] ? 'ok' : 'no'; });
      const pct = Math.max(4, Math.min(100, a.log10 / 20 * 100));
      bar.firstChild.style.width = pct + '%';
      const lvl = a.sec < 60 ? ['Rất yếu', 'bad'] : a.sec < 86400 ? ['Yếu', 'bad'] : a.sec < 31536000 ? ['Trung bình', 'warn'] : a.sec < 31536000 * 100 ? ['Khá', 'ok'] : ['Mạnh', 'ok'];
      bar.className = 'pw-meter ' + lvl[1];
      verdict.className = 'pw-verdict ' + lvl[1];
      verdict.textContent = lvl[0] + '. Thời gian ước tính để dò ra: ' + fmt(a.sec) + '.';
    }
    input.addEventListener('input', update);
    const examples = ['Vinhlong@2026', '12345678Aa!', 'NguyenVanA1980', 'luc-binh-troi-ven-song-7#'];
    const ex = h('div', { class: 'pw-ex' }, h('span', {}, 'Thử nhanh:'), examples.map(function (e) { return h('button', { class: 'chip chip-sm', type: 'button', onclick: function () { input.value = e; input.type = 'text'; show.textContent = 'Ẩn'; update(); } }, e); }));
    const gw = ['songhau', 'luabong', 'xoaicat', 'mangcut', 'bentau', 'nuocnoi', 'phusa', 'lucbinh', 'hoasen', 'traisau', 'cauvan', 'vuondua', 'ghechai', 'tranghoa', 'chuongtre', 'khoatuoi', 'bonggua', 'gomdo', 'cayduoc', 'donghay'];
    const gen = h('p', { class: 'pw-gen' });
    const genBtn = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      const pick = U.shuffle(gw).slice(0, 4); pick[1] = pick[1][0].toUpperCase() + pick[1].slice(1);
      const sym = '#!%&*?'[Math.floor(Math.random() * 6)];
      gen.textContent = pick.join('-') + '-' + (10 + Math.floor(Math.random() * 90)) + sym;
    } }, 'Gợi ý một cụm mật khẩu');
    host.append(h('div', { class: 'pw' },
      h('div', { class: 'pw-row' }, input, show), bar, verdict, ul, ex,
      h('div', { class: 'pw-genbox' }, genBtn, gen, h('p', { class: 'muted small' }, 'Cụm mật khẩu gồm nhiều từ không liên quan: dài, dễ nhớ, khó dò. Không sử dụng lại cụm đã hiển thị trước lớp. Ước tính giả định máy tính thử 10 tỷ mật khẩu mỗi giây.'))));
    update();
  };

  /* ---------- Xác thực hai lớp ---------- */
  A.widgets.mfa = function (host) {
    const lanes = [
      { name: 'Chỉ có mật khẩu', steps: ['Kẻ gian có mật khẩu (lộ qua trang đăng nhập giả)', 'Đăng nhập từ máy lạ', 'Hệ thống chấp nhận', 'Tài khoản bị chiếm'], end: 'bad' },
      { name: 'Mật khẩu và xác thực hai lớp', steps: ['Kẻ gian có mật khẩu (lộ qua trang đăng nhập giả)', 'Đăng nhập từ máy lạ', 'Hệ thống yêu cầu mã xác thực gửi tới điện thoại chính chủ', 'Không có mã: bị chặn, chủ tài khoản nhận cảnh báo'], end: 'good',
        alt: ['Kẻ gian có mật khẩu (lộ qua trang đăng nhập giả)', 'Đăng nhập từ máy lạ', 'Kẻ gian gọi điện tự xưng cán bộ hỗ trợ, xin mã OTP; chủ tài khoản đọc mã', 'Tài khoản bị chiếm dù đã bật xác thực hai lớp'] }
    ];
    const tog = h('input', { type: 'checkbox', id: 'mfa-otp-' + Math.random().toString(36).slice(2, 7) });
    const wrap = h('div', { class: 'mfa' });
    function build() {
      wrap.innerHTML = '';
      return lanes.map(function (ln, li) {
        const steps = (li === 1 && tog.checked) ? ln.alt : ln.steps;
        const end = (li === 1 && tog.checked) ? 'bad' : ln.end;
        const row = h('div', { class: 'mfa-lane' }, h('h4', {}, ln.name));
        const track = h('ol', { class: 'mfa-track' });
        const items = steps.map(function (t, i) { const li2 = h('li', { class: 'mfa-step' + (i === steps.length - 1 ? ' end ' + end : '') }, t); track.append(li2); return li2; });
        row.append(track); wrap.append(row);
        return items;
      });
    }
    let all = build();
    const run = h('button', { class: 'btn btn-sm', type: 'button' }, 'Chạy mô phỏng');
    run.addEventListener('click', async function () {
      run.disabled = true; all = build();
      for (let i = 0; i < 4; i++) { if (!host.isConnected) return; all.forEach(function (lane) { lane[i].classList.add('lit'); }); await U.wait(900); }
      run.disabled = false;
    });
    tog.addEventListener('change', function () { all = build(); });
    host.append(h('div', { class: 'wg-actions' }, run, h('label', { class: 'switch', for: tog.id }, tog, h('span', {}, 'Chủ tài khoản đọc mã OTP cho người gọi điện'))), wrap);
  };

  /* ---------- Tự kiểm tra thiết bị ---------- */
  A.widgets.devicecheck = function (host) {
    const items = [
      'Máy tính tự khóa màn hình sau tối đa 5 phút không sử dụng',
      'Hệ điều hành và trình duyệt được cập nhật trong tháng này',
      'Phần mềm phòng chống mã độc đang hoạt động',
      'Không có phần mềm bẻ khóa, không rõ nguồn gốc',
      'Điện thoại có khóa màn hình bằng mã hoặc sinh trắc học',
      'Chỉ cài ứng dụng từ kho chính thức (CH Play, App Store)',
      'Tắt tự động kết nối Wi-Fi lạ, tắt Bluetooth khi không dùng',
      'Tài khoản công vụ đã bật xác thực hai lớp',
      'Không lưu mật khẩu trên trình duyệt của máy dùng chung',
      'Dữ liệu quan trọng được sao lưu theo quy định của cơ quan'
    ];
    const st = U.store.get('device', []);
    const R = 52, C = 2 * Math.PI * R;
    const ring = s('svg', { viewBox: '0 0 140 140', class: 'ring', role: 'img' });
    const arc = s('circle', { cx: 70, cy: 70, r: R, class: 'ring-fg', 'stroke-dasharray': C, 'stroke-dashoffset': C, transform: 'rotate(-90 70 70)' });
    const txt = s('text', { x: 70, y: 78, class: 'ring-t' });
    ring.append(s('circle', { cx: 70, cy: 70, r: R, class: 'ring-bg' }), arc, txt);
    const msg = h('p', { class: 'ring-msg' });
    const list = h('ul', { class: 'checklist' });
    items.forEach(function (t, i) {
      const id = 'dc' + i;
      const cb = h('input', { type: 'checkbox', id: id }); cb.checked = st.indexOf(i) >= 0;
      cb.addEventListener('change', function () { const k = st.indexOf(i); if (cb.checked && k < 0) st.push(i); if (!cb.checked && k >= 0) st.splice(k, 1); U.store.set('device', st); upd(); });
      list.append(h('li', {}, cb, h('label', { for: id }, t)));
    });
    function upd() {
      const n = st.length, pct = n / items.length;
      arc.setAttribute('stroke-dashoffset', C * (1 - pct));
      arc.setAttribute('class', 'ring-fg ' + (pct < .5 ? 'bad' : pct < .9 ? 'warn' : 'ok'));
      txt.textContent = n + '/' + items.length;
      ring.setAttribute('aria-label', 'Đã đạt ' + n + ' trên ' + items.length + ' tiêu chí');
      msg.textContent = pct === 1 ? 'Thiết bị đáp ứng đủ các tiêu chí cơ bản.' : 'Còn ' + (items.length - n) + ' việc cần làm. Ưu tiên những mục chưa đánh dấu ngay trong buổi thực hành.';
    }
    host.append(h('div', { class: 'devcheck' }, h('div', { class: 'devcheck-ring' }, ring, msg), list));
    upd();
  };
})(window.ATTT);
