/* Học liệu tương tác dùng chung: phân loại, lật thẻ, tình huống, quy trình, trắc nghiệm tình huống, thẻ hướng dẫn, danh bạ, bảng phân loại, biểu đồ yếu tố con người. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  /* ---------- Phân loại vào nhóm ---------- */
  A.widgets.sort = function (host, o) {
    const byId = {}; o.items.forEach(function (it, i) { byId[i] = Object.assign({ id: i }, it); });
    let selected = null, placed = 0, errors = 0;
    const status = h('p', { class: 'sort-status', 'aria-live': 'polite' }, 'Chọn một mục để bắt đầu.');
    const pool = h('div', { class: 'sort-pool', role: 'group', 'aria-label': 'Các mục cần phân loại' });
    const binsWrap = h('div', { class: 'sort-bins', style: { '--cols': o.bins.length } });
    const score = h('div', { class: 'sort-score' });
    const chips = {};
    const bins = o.bins.map(function (b, bi) {
      const drop = h('div', { class: 'sort-drop' });
      const bin = h('div', { class: 'sort-bin tone-' + (b.tone || 'l1'), tabindex: 0, role: 'button', 'aria-label': 'Đặt vào nhóm ' + b.name },
        h('div', { class: 'sort-bin-head' }, b.name), drop);
      bin.addEventListener('click', function (e) { if (e.target.closest('.chip')) return; place(bi); });
      bin.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(bi); } });
      bin.addEventListener('dragover', function (e) { e.preventDefault(); bin.classList.add('over'); });
      bin.addEventListener('dragleave', function () { bin.classList.remove('over'); });
      bin.addEventListener('drop', function (e) { e.preventDefault(); bin.classList.remove('over'); const id = e.dataTransfer.getData('text/plain'); if (id !== '') { select(+id); place(bi); } });
      binsWrap.append(bin);
      return { bin: bin, drop: drop };
    });
    U.shuffle(Object.keys(byId)).forEach(function (k) {
      const it = byId[k];
      const c = h('button', { class: 'chip', type: 'button', draggable: 'true' }, it.t);
      c.addEventListener('click', function () {
        if (c.classList.contains('placed')) { status.className = 'sort-status ok'; status.textContent = it.t + ': ' + it.why; return; }
        select(it.id);
      });
      c.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', String(it.id)); select(it.id); });
      chips[it.id] = c; pool.append(c);
    });
    function select(id) {
      if (chips[id].classList.contains('placed')) return;
      Object.keys(chips).forEach(function (k) { chips[k].classList.remove('sel'); chips[k].setAttribute('aria-pressed', 'false'); });
      selected = id; chips[id].classList.add('sel'); chips[id].setAttribute('aria-pressed', 'true');
      status.className = 'sort-status'; status.textContent = 'Đã chọn “' + byId[id].t + '”. Chọn nhóm phù hợp.';
    }
    function place(bi) {
      if (selected == null) { status.className = 'sort-status'; status.textContent = 'Hãy chọn một mục trước, sau đó chọn nhóm.'; return; }
      const it = byId[selected], c = chips[selected];
      if (it.bin === bi) {
        c.classList.remove('sel'); c.classList.add('placed'); c.draggable = false; c.setAttribute('aria-pressed', 'false');
        bins[bi].drop.append(c); placed++;
        status.className = 'sort-status ok'; status.textContent = 'Chính xác. ' + it.why;
      } else {
        errors++;
        c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
        status.className = 'sort-status bad'; status.textContent = 'Chưa đúng. ' + (it.hint || 'Hãy đọc lại nội dung và thử nhóm khác.');
      }
      if (it.bin === bi) selected = null;
      update();
    }
    function update() {
      score.textContent = 'Đã phân loại ' + placed + '/' + o.items.length + (errors ? '. Số lần chọn chưa đúng: ' + errors : '');
      if (placed === o.items.length) {
        U.stamp(host, errors === 0 ? 'Chính xác' : 'Hoàn thành', errors === 0 ? 'good' : 'warn');
        status.className = 'sort-status ok'; status.textContent = 'Hoàn thành bài tập. Bấm vào từng mục để xem lại giải thích.';
      }
    }
    const reset = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { host.innerHTML = ''; A.widgets.sort(host, o); } }, 'Làm lại');
    host.append(pool, binsWrap, h('div', { class: 'wg-foot' }, score, reset), status);
    update();
  };

  /* ---------- Lật thẻ ---------- */
  A.widgets.flip = function (host, o) {
    const grid = h('div', { class: 'flip-grid' });
    o.cards.forEach(function (c) {
      const card = h('button', { class: 'flip-card', type: 'button', 'aria-pressed': 'false' },
        h('span', { class: 'flip-inner' },
          h('span', { class: 'flip-face flip-front' }, h('span', { class: 'flip-tag' }, 'Hành vi'), h('span', { class: 'flip-text' }, c.f)),
          h('span', { class: 'flip-face flip-back' }, h('span', { class: 'flip-tag' }, 'Vì sao sai và cách đúng'), h('span', { class: 'flip-text' }, c.b))));
      card.addEventListener('click', function () { const on = card.classList.toggle('flipped'); card.setAttribute('aria-pressed', String(on)); });
      grid.append(card);
    });
    host.append(grid);
  };

  /* ---------- Tình huống có gợi ý đáp án ---------- */
  A.widgets.reveal = function (host, o) {
    o.cases.forEach(function (c) {
      const qs = h('div', { class: 'reveal-qs' });
      c.qs.forEach(function (q) {
        const ans = h('div', { class: 'reveal-a', hidden: true }, q.a);
        const btn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', 'aria-expanded': 'false' }, 'Xem gợi ý');
        btn.addEventListener('click', function () { const open = ans.hidden; ans.hidden = !open; btn.setAttribute('aria-expanded', String(open)); btn.textContent = open ? 'Ẩn gợi ý' : 'Xem gợi ý'; });
        qs.append(h('div', { class: 'reveal-q' }, h('div', { class: 'reveal-qline' }, h('strong', {}, q.q), btn), ans));
      });
      host.append(h('article', { class: 'case' }, h('h4', {}, c.title), h('p', {}, c.text), qs));
    });
  };

  /* ---------- Quy trình từng bước ---------- */
  A.widgets.flow = function (host, o) {
    const list = h('ol', { class: 'flow' });
    const detail = h('div', { class: 'flow-detail', 'aria-live': 'polite' });
    const nodes = o.steps.map(function (st, i) {
      const b = h('button', { class: 'flow-node', type: 'button' }, h('span', { class: 'flow-top' }, h('span', { class: 'flow-num' }, String(i + 1)), st.i ? A.icon(st.i, 'flow-ico') : null), h('span', { class: 'flow-t' }, st.t));
      b.addEventListener('click', function () { show(i); });
      list.append(h('li', {}, b));
      return b;
    });
    function show(i) {
      nodes.forEach(function (n, k) { n.classList.toggle('active', k === i); n.classList.toggle('past', k < i); });
      detail.innerHTML = '';
      detail.append(h('h4', {}, 'Bước ' + (i + 1) + '. ' + o.steps[i].t), h('p', {}, o.steps[i].d));
    }
    let playing = false;
    const play = h('button', { class: 'btn btn-sm', type: 'button' }, 'Trình bày từng bước');
    play.addEventListener('click', async function () {
      if (playing) return; playing = true; play.disabled = true;
      for (let i = 0; i < o.steps.length; i++) { if (!host.isConnected) return; show(i); await U.wait(2600); }
      playing = false; play.disabled = false;
    });
    host.append(h('div', { class: 'wg-actions' }, play), list, detail);
    show(0);
  };

  /* ---------- Trắc nghiệm tình huống từng câu ---------- */
  A.widgets.choices = function (host, o) {
    let i = 0, right = 0;
    const box = h('div', { class: 'choices' });
    host.append(box);
    function render() {
      box.innerHTML = '';
      if (i >= o.items.length) {
        box.append(h('p', { class: 'choices-end' }, 'Kết quả: ' + right + '/' + o.items.length + ' tình huống chọn đúng.'),
          h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { i = 0; right = 0; host.querySelectorAll('.stamp').forEach(function (x) { x.remove(); }); render(); } }, 'Làm lại'));
        U.stamp(host, right === o.items.length ? 'Chính xác' : 'Hoàn thành', right === o.items.length ? 'good' : 'warn');
        return;
      }
      const it = o.items[i];
      const fb = h('div', { class: 'choices-fb', 'aria-live': 'polite' });
      const opts = h('div', { class: 'choices-opts' });
      const next = h('button', { class: 'btn btn-sm', type: 'button', hidden: true, onclick: function () { i++; render(); } }, i === o.items.length - 1 ? 'Xem kết quả' : 'Tình huống tiếp theo');
      it.opts.forEach(function (t, k) {
        const b = h('button', { class: 'opt', type: 'button' }, t);
        b.addEventListener('click', function () {
          Array.prototype.forEach.call(opts.children, function (x, j) { x.disabled = true; if (j === it.a) x.classList.add('right'); });
          if (k === it.a) { right++; fb.className = 'choices-fb ok'; fb.textContent = 'Đúng. ' + it.why; }
          else { b.classList.add('wrong'); fb.className = 'choices-fb bad'; fb.textContent = 'Chưa đúng. ' + it.why; }
          next.hidden = false; next.focus();
        });
        opts.append(b);
      });
      box.append(h('p', { class: 'choices-count' }, 'Tình huống ' + (i + 1) + '/' + o.items.length), it.qh ? h('div', { class: 'choices-q', html: it.qh }) : h('p', { class: 'choices-q' }, it.q), opts, fb, next);
    }
    render();
  };

  /* ---------- Thẻ hướng dẫn nhiều tab ---------- */
  A.widgets.tabs = function (host, o) {
    const bar = h('div', { class: 'tabs', role: 'tablist' });
    const panel = h('div', { class: 'tab-panel', role: 'tabpanel' });
    const btns = o.tabs.map(function (t, i) {
      const b = h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': 'false' }, t.name);
      b.addEventListener('click', function () { open(i); });
      bar.append(b); return b;
    });
    function open(i) {
      btns.forEach(function (b, k) { b.setAttribute('aria-selected', String(k === i)); });
      panel.innerHTML = '';
      const ol = h('ol', { class: 'steps' });
      o.tabs[i].steps.forEach(function (st) { ol.append(h('li', {}, st)); });
      panel.append(ol);
    }
    host.append(bar, panel); open(0);
  };

  /* ---------- Danh bạ đầu mối ---------- */
  A.widgets.contacts = function (host) {
    const grid = h('div', { class: 'contacts' });
    (A.config.contacts || []).forEach(function (c) {
      grid.append(h('div', { class: 'contact' }, h('h4', {}, c.role), h('p', { class: 'contact-v' }, c.value), c.note ? h('p', { class: 'contact-n' }, c.note) : null));
    });
    host.append(grid);
  };

  /* ---------- Bảng phân loại của đơn vị ---------- */
  A.widgets.worksheet = function (host) {
    const levels = ['Công khai', 'Nội bộ', 'Hạn chế', 'Bí mật nhà nước'];
    let rows = U.store.get('worksheet', null) || [
      { a: 'Hồ sơ thủ tục hành chính', l: 2, w: 'Hệ thống giải quyết thủ tục', p: 'Bộ phận một cửa' },
      { a: '', l: 1, w: '', p: '' }, { a: '', l: 1, w: '', p: '' }
    ];
    const tbody = h('tbody');
    const table = h('div', { class: 'table-wrap' }, h('table', { class: 'ws' }, h('thead', {}, h('tr', {}, h('th', {}, 'Thông tin, dữ liệu'), h('th', {}, 'Cấp độ'), h('th', {}, 'Nơi lưu trữ'), h('th', {}, 'Người được tiếp cận'), h('th', {}, h('span', { class: 'visually-hidden' }, 'Xóa')))), tbody));
    function save() { U.store.set('worksheet', rows); }
    function render() {
      tbody.innerHTML = '';
      rows.forEach(function (r, i) {
        const sel = h('select', { 'aria-label': 'Cấp độ' }); levels.forEach(function (l, k) { const op = h('option', { value: k }, l); if (k === +r.l) op.selected = true; sel.append(op); });
        sel.addEventListener('change', function () { r.l = +sel.value; save(); });
        function inp(key, label) { const x = h('input', { type: 'text', value: r[key] || '', 'aria-label': label }); x.addEventListener('input', function () { r[key] = x.value; save(); }); return x; }
        tbody.append(h('tr', {}, h('td', {}, inp('a', 'Thông tin, dữ liệu')), h('td', {}, sel), h('td', {}, inp('w', 'Nơi lưu trữ')), h('td', {}, inp('p', 'Người được tiếp cận')),
          h('td', {}, h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Xóa dòng', onclick: function () { rows.splice(i, 1); save(); render(); } }, '×'))));
      });
    }
    const add = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { rows.push({ a: '', l: 1, w: '', p: '' }); save(); render(); } }, 'Thêm dòng');
    const dl = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      const lines = [['Thông tin, dữ liệu', 'Cấp độ', 'Nơi lưu trữ', 'Người được tiếp cận']].concat(rows.filter(function (r) { return r.a; }).map(function (r) { return [r.a, levels[r.l], r.w, r.p]; }));
      U.download('bang-phan-loai-thong-tin.csv', lines.map(function (l) { return l.map(U.csvCell).join(','); }).join('\n'));
    } }, 'Tải bảng (CSV)');
    host.append(table, h('div', { class: 'wg-actions' }, add, dl));
    render();
  };

  /* ---------- Biểu đồ yếu tố con người ---------- */
  A.widgets.human = function (host) {
    const N = 100, K = 68;
    const svg = s('svg', { viewBox: '0 0 400 160', class: 'dots', role: 'img', 'aria-label': 'Minh họa 68 trên 100 vụ vi phạm dữ liệu có yếu tố con người' });
    const dots = [];
    for (let i = 0; i < N; i++) {
      const c = s('circle', { cx: 10 + (i % 25) * 15.8, cy: 12 + Math.floor(i / 25) * 22, r: 6, class: 'dot' });
      dots.push(c); svg.append(c);
    }
    const num = h('div', { class: 'big-num' }, h('span', { class: 'n' }, '0'), h('span', { class: 'u' }, '/100'));
    host.append(h('div', { class: 'human' }, svg, h('div', { class: 'human-txt' }, num,
      h('p', {}, 'vụ vi phạm dữ liệu được phân tích có liên quan đến yếu tố con người không chủ đích: bị lừa đảo, nhầm lẫn, sử dụng thông tin đăng nhập bị đánh cắp.'),
      h('p', { class: 'source' }, 'Nguồn: Verizon, Báo cáo điều tra vi phạm dữ liệu (DBIR) năm 2024. Số liệu mang tính tham khảo quốc tế.'))));
    U.onVisible(host, function () {
      const n = num.querySelector('.n');
      dots.forEach(function (d, i) { if (i < K) setTimeout(function () { d.classList.add('on'); n.textContent = String(i + 1); }, U.reduced() ? 0 : i * 22); });
    });
  };
})(window.ATTT);
