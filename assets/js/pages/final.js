/* Bài kiểm tra thực hành cuối khóa: 10 phần trực quan, chấm điểm từng phần, tổng hợp theo nhóm kỹ năng. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  /* Mỗi hàm dựng trả về { check(): {score, detail} } */
  const T = {};

  T.scene = function (box, t) {
    const svg = s('svg', { viewBox: '0 0 800 480', class: 'desk-svg ft-scene', role: 'group', 'aria-label': 'Hình minh họa, bấm vào các điểm nghi ngờ' });
    svg.innerHTML = t.art;
    const marks = s('g'); svg.append(marks);
    const found = []; let miss = 0; let locked = false;
    const count = h('p', { class: 'ft-count', 'aria-live': 'polite' });
    t.spots.forEach(function (sp, i) {
      const hit = s('circle', { cx: sp.x, cy: sp.y, r: sp.r, class: 'desk-hit', tabindex: 0, role: 'button', 'aria-label': 'Vị trí ' + (i + 1) });
      function f() { if (locked || found.indexOf(i) >= 0) return; found.push(i); ring(i, true); upd(); }
      hit.addEventListener('click', function (e) { e.stopPropagation(); f(); });
      hit.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } });
      svg.append(hit);
    });
    svg.addEventListener('click', function (e) {
      if (locked) return; miss++;
      const r = svg.getBoundingClientRect(); const c = s('circle', { cx: (e.clientX - r.left) / r.width * 800, cy: (e.clientY - r.top) / r.height * 480, r: 10, class: 'desk-miss' });
      marks.append(c); setTimeout(function () { c.remove(); }, 700);
    });
    function ring(i, ok) { const sp = t.spots[i]; marks.append(s('circle', { cx: sp.x, cy: sp.y, r: sp.r - 4, class: ok ? 'desk-ring' : 'desk-ring missed' })); }
    function upd() { count.textContent = 'Đã đánh dấu ' + found.length + ' vị trí.'; }
    box.append(h('p', { class: 'swipe-hint' }, 'Vuốt ngang để xem toàn bộ hình'), h('div', { class: 'desk-stage' }, svg), count); upd();
    return { check: function () {
      locked = true;
      const list = h('ol', { class: 'ft-why' });
      t.spots.forEach(function (sp, i) { const ok = found.indexOf(i) >= 0; if (!ok) ring(i, false); list.append(h('li', { class: ok ? 'ok' : 'bad' }, h('strong', {}, sp.t + (ok ? '' : ' (bỏ sót)')), ' ', sp.d)); });
      return { score: found.length * t.pts / t.spots.length, detail: list };
    } };
  };

  T.spot = function (box, t) {
    const wrap = h('div', { class: 'ft-spot', html: t.html });
    const bar = h('div', { class: 'ib-status' }, 'Bấm vào chi tiết để đánh dấu; bấm lần nữa để bỏ đánh dấu.');
    let locked = false;
    const spans = Array.prototype.slice.call(wrap.querySelectorAll('.sp'));
    spans.forEach(function (sp) {
      sp.setAttribute('tabindex', '0'); sp.setAttribute('role', 'button'); sp.setAttribute('aria-pressed', 'false');
      function tog() { if (locked) return; const on = sp.classList.toggle('picked'); sp.setAttribute('aria-pressed', String(on)); if (sp.dataset.real) show(); }
      function show() { if (sp.dataset.real) { bar.className = 'ib-status warn'; bar.textContent = 'Địa chỉ thật của đường liên kết: ' + sp.dataset.real; } }
      sp.addEventListener('click', tog);
      sp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      sp.addEventListener('mouseenter', show); sp.addEventListener('focus', show);
    });
    box.append(wrap, bar);
    return { check: function () {
      locked = true; let sc = 0; const list = h('ol', { class: 'ft-why' });
      spans.forEach(function (sp) {
        const ok = sp.dataset.ok === '1', p = sp.classList.contains('picked');
        if (ok && p) { sc += t.per; sp.classList.add('r-ok'); }
        else if (ok && !p) sp.classList.add('r-miss');
        else if (!ok && p) { sc -= t.per / 2; sp.classList.add('r-wrong'); }
        if (ok) list.append(h('li', { class: p ? 'ok' : 'bad' }, h('strong', {}, sp.textContent + (p ? '' : ' (bỏ sót)')), ' ', sp.dataset.why));
      });
      const wrong = spans.filter(function (sp) { return sp.classList.contains('r-wrong'); }).length;
      if (wrong) list.append(h('li', { class: 'bad' }, 'Đánh dấu nhầm ' + wrong + ' chi tiết bình thường (trừ điểm).'));
      return { score: Math.max(0, sc), detail: list };
    } };
  };

  T.domain = function (box, t) {
    const picks = t.urls.map(function () { return -1; }); let locked = false;
    const rows = t.urls.map(function (u, ui) {
      const line = h('div', { class: 'ft-url' });
      const segs = u.seg.map(function (x, si) {
        const b = h('button', { class: 'ft-seg', type: 'button' }, x);
        b.addEventListener('click', function () { if (locked) return; picks[ui] = si; segs.forEach(function (y, k) { y.classList.toggle('picked', k === si); }); });
        line.append(b); return b;
      });
      const v = h('p', { class: 'ft-url-v', hidden: true }, u.v);
      box.append(h('div', { class: 'ft-url-row' }, h('span', { class: 'ft-url-n' }, String(ui + 1)), h('div', {}, line, v)));
      return { segs: segs, v: v };
    });
    return { check: function () {
      locked = true; let sc = 0;
      rows.forEach(function (r, ui) { const a = t.urls[ui].a; r.segs[a].classList.add('r-ok'); if (picks[ui] === a) sc += t.per; else if (picks[ui] >= 0) r.segs[picks[ui]].classList.add('r-wrong'); r.v.hidden = false; });
      return { score: sc, detail: h('p', { class: 'muted' }, 'Tên miền thật nằm ngay trước dấu “/” đầu tiên, đọc từ phải sang trái; phần trước dấu “@” bị trình duyệt bỏ qua.') };
    } };
  };

  T.tiles = function (box, t) {
    const grid = h('div', { class: 'ft-tiles' }); let locked = false;
    const els = t.items.map(function (it) {
      const ext = (it.t.match(/\.([a-z0-9]+)(?:\s|$|\()/i) || [])[1] || '';
      const b = h('button', { class: 'ft-tile', type: 'button', 'aria-pressed': 'false' }, h('span', { class: 'ft-file' }, h('span', { class: 'ft-ext' }, ext.toUpperCase())), h('span', { class: 'ft-name' }, it.t), h('span', { class: 'ft-flag' }, 'Không mở'));
      b.addEventListener('click', function () { if (locked) return; const on = b.classList.toggle('picked'); b.setAttribute('aria-pressed', String(on)); });
      grid.append(b); return b;
    });
    box.append(grid);
    return { check: function () {
      locked = true; let sc = 0;
      els.forEach(function (b, i) { const it = t.items[i], p = b.classList.contains('picked'); if (p === it.bad) { sc += t.per; b.classList.add('r-ok'); } else b.classList.add('r-wrong'); b.append(h('span', { class: 'ft-tip' }, it.why)); });
      return { score: sc, detail: null };
    } };
  };

  T.assign = function (box, t) {
    const ans = t.items.map(function () { return -1; }); let locked = false;
    const grid = h('div', { class: 'ft-docs' });
    const cards = t.items.map(function (it, i) {
      const st = h('span', { class: 'ft-dstamp' });
      const btns = h('div', { class: 'ft-dbtns' });
      t.bins.forEach(function (bn, k) {
        const b = h('button', { class: 'ft-db lv' + k, type: 'button' }, bn);
        b.addEventListener('click', function () { if (locked) return; ans[i] = k; st.className = 'ft-dstamp lv' + k + ' on'; st.textContent = bn; Array.prototype.forEach.call(btns.children, function (x, j) { x.classList.toggle('picked', j === k); }); });
        btns.append(b);
      });
      const c = h('div', { class: 'ft-doc' }, h('div', { class: 'ft-paper' }, A.icon('doc'), h('span', {}, it.t), st), btns);
      grid.append(c); return c;
    });
    box.append(grid);
    return { check: function () {
      locked = true; let sc = 0;
      cards.forEach(function (c, i) { const ok = ans[i] === t.items[i].a; if (ok) sc += t.per; c.classList.add(ok ? 'r-ok' : 'r-wrong'); if (!ok) c.append(h('p', { class: 'ft-fix' }, 'Đúng là: ' + t.bins[t.items[i].a])); });
      return { score: sc, detail: null };
    } };
  };

  T.order = function (box, t) {
    const pool = h('div', { class: 'ft-pool' });
    const slots = h('ol', { class: 'ft-slots' });
    const seq = []; let locked = false;
    const idx = U.shuffle(t.items.map(function (x, i) { return i; }));
    const chips = {};
    idx.forEach(function (i) {
      const b = h('button', { class: 'ft-chip' + (t.mono ? ' mono' : ''), type: 'button' }, t.icons ? A.icon(t.icons[i]) : null, t.items[i]);
      b.addEventListener('click', function () { if (locked || seq.indexOf(i) >= 0) return; seq.push(i); draw(); });
      chips[i] = b; pool.append(b);
    });
    function draw() {
      slots.innerHTML = '';
      for (let k = 0; k < t.items.length; k++) {
        const i = seq[k];
        const li = h('li', { class: 'ft-slot' + (i == null ? ' empty' : '') }, h('span', { class: 'ft-slot-n' }, String(k + 1)));
        if (i != null) {
          li.append(h('span', { class: t.mono ? 'mono' : '' }, t.items[i]));
          if (!locked) li.append(h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Bỏ ra', onclick: function () { seq.splice(k, 1); draw(); } }, '×'));
        } else li.append(h('span', { class: 'muted' }, k === 0 ? (t.id === 'p7' ? 'Yếu nhất' : 'Việc đầu tiên') : k === t.items.length - 1 ? (t.id === 'p7' ? 'Mạnh nhất' : 'Việc cuối cùng') : ''));
        slots.append(li);
      }
      Object.keys(chips).forEach(function (i) { chips[i].disabled = seq.indexOf(+i) >= 0; });
    }
    box.append(pool, slots); draw();
    return { check: function () {
      locked = true; let sc = 0;
      draw();
      Array.prototype.forEach.call(slots.children, function (li, k) { const ok = seq[k] === k; if (ok) sc += t.per; li.classList.add(ok ? 'r-ok' : 'r-wrong'); });
      const list = h('ol', { class: 'ft-why' }); t.items.forEach(function (x, i) { list.append(h('li', {}, h('strong', { class: t.mono ? 'mono' : '' }, x), ' ', t.notes[i])); });
      return { score: sc, detail: h('div', {}, h('p', { class: 'muted' }, 'Thứ tự đúng:'), list) };
    } };
  };

  T.dialog = function (box, t) {
    const phone = h('div', { class: 'ft-call' }, h('div', { class: 'ft-call-h' }, A.icon('call'), h('span', {}, t.caller)));
    const feed = h('div', { class: 'ft-feed' }); phone.append(feed);
    const opts = h('div', { class: 'ft-opts' });
    const picks = []; let k = 0;
    function next() {
      opts.innerHTML = '';
      if (k >= t.turns.length) { opts.append(h('p', { class: 'muted' }, 'Đã trả lời xong. Bấm “Chấm phần này”.')); return; }
      const tn = t.turns[k];
      feed.append(h('div', { class: 'otp-b otp-call' }, h('small', {}, 'Người gọi'), tn.say));
      tn.o.forEach(function (o, j) {
        const b = h('button', { class: 'opt', type: 'button' }, o.t);
        b.addEventListener('click', function () { picks.push(j); feed.append(h('div', { class: 'otp-b otp-me' }, h('small', {}, 'Đồng chí'), o.t)); k++; next(); });
        opts.append(b);
      });
      feed.scrollTop = feed.scrollHeight;
    }
    box.append(h('div', { class: 'ft-dialog' }, phone, opts)); next();
    return { check: function () {
      let sc = 0; const list = h('ol', { class: 'ft-why' });
      t.turns.forEach(function (tn, i) {
        const j = picks[i]; const ok = j != null && tn.o[j].ok; if (ok) sc += tn.pts;
        const right = tn.o.filter(function (o) { return o.ok; })[0].t;
        list.append(h('li', { class: ok ? 'ok' : 'bad' }, ok ? 'Đúng: ' : 'Chưa đúng. Câu trả lời phù hợp: ', h('strong', {}, right)));
      });
      opts.innerHTML = '';
      return { score: sc, detail: list };
    } };
  };

  A.pages.post = function () {
    const tasks = A.data.finalTasks;
    const total = tasks.reduce(function (a, t) { return a + t.pts; }, 0);
    const page = h('article', { class: 'page final-page' });
    page.append(h('header', { class: 'topic-head' },
      h('p', { class: 'topic-meta' }, h('span', { class: 'sess sess-pm' }, 'Tổng kết'), h('span', {}, '16:45 – 17:15'), h('span', {}, 'Bài kiểm tra thực hành')),
      h('h1', {}, 'Bài kiểm tra cuối khóa'),
      h('p', { class: 'lead' }, tasks.length + ' phần thực hành trên hình ảnh, thư điện tử, tin nhắn, đường liên kết, câu trả lời của AI và tình huống. Tổng ' + total + ' điểm; đạt yêu cầu từ 80 điểm.')));
    const rail = h('ol', { class: 'ft-rail', 'aria-label': 'Các phần của bài kiểm tra' });
    const stage = h('section', { class: 'ft-stage' });
    page.append(rail, stage);
    let res = {}; let cur = 0;
    const railEls = tasks.map(function (t, i) {
      const li = h('li', { class: 'ft-r' }, A.icon(t.icon), h('span', {}, String(i + 1)));
      rail.append(li); return li;
    });
    function markRail() { railEls.forEach(function (li, i) { li.classList.toggle('cur', i === cur); li.classList.toggle('done', res[tasks[i].id] != null); }); }
    function intro() {
      stage.innerHTML = ''; res = {}; cur = -1; markRail();
      const prev = U.store.get('post', null);
      const name = h('input', { type: 'text', class: 'q-name', placeholder: 'Họ tên, đơn vị (không bắt buộc)', value: U.store.get('learner', ''), 'aria-label': 'Họ tên, đơn vị' });
      name.addEventListener('input', function () { U.store.set('learner', name.value); });
      const g = h('div', { class: 'ft-intro-grid' });
      tasks.forEach(function (t, i) { g.append(h('div', { class: 'ft-intro-i' }, A.icon(t.icon), h('span', {}, h('strong', {}, 'Phần ' + (i + 1) + '. '), t.title), h('b', {}, t.pts + ' đ'))); });
      stage.append(h('div', { class: 'q-start' }, name, g,
        prev ? h('p', { class: 'muted' }, 'Lần làm trước (' + prev.date + '): ' + prev.score + '/' + prev.total + ' điểm. Làm lại sẽ ghi đè kết quả.') : null,
        h('div', { class: 'wg-actions' }, h('button', { class: 'btn', type: 'button', onclick: function () { show(0); } }, 'Bắt đầu làm bài'), prev ? h('button', { class: 'btn btn-ghost', type: 'button', onclick: function () { summary(prev); } }, 'Xem lại kết quả') : null)));
    }
    function show(i) {
      cur = i; markRail(); stage.innerHTML = '';
      const t = tasks[i];
      const body = h('div', { class: 'ft-body ftb-' + t.type });
      const api = T[t.type](body, t);
      const fb = h('div', { class: 'ft-fb', 'aria-live': 'polite' });
      const nextBtn = h('button', { class: 'btn', type: 'button', hidden: true, onclick: function () { if (i < tasks.length - 1) show(i + 1); else finish(); } }, i < tasks.length - 1 ? 'Phần tiếp theo' : 'Xem kết quả');
      const chk = h('button', { class: 'btn btn-seal', type: 'button' }, 'Chấm phần này');
      chk.addEventListener('click', function () {
        chk.remove();
        const r = api.check(); const sc = Math.round(r.score * 10) / 10;
        res[t.id] = sc; markRail();
        const pct = sc / t.pts;
        fb.className = 'ft-fb ' + (pct >= .8 ? 'ok' : pct >= .5 ? 'warn' : 'bad');
        fb.append(h('p', { class: 'ft-score' }, h('strong', {}, sc + '/' + t.pts + ' điểm'))); if (r.detail) fb.append(r.detail);
        nextBtn.hidden = false; nextBtn.scrollIntoView({ behavior: U.reduced() ? 'auto' : 'smooth', block: 'nearest' });
      });
      stage.append(h('div', { class: 'ft-head' }, h('p', { class: 'choices-count' }, 'Phần ' + (i + 1) + '/' + tasks.length + ': ' + t.skill), h('span', { class: 'ft-pts' }, t.pts + ' điểm')),
        h('h2', {}, t.title), h('p', { class: 'wg-intro' }, t.ask), body, fb, h('div', { class: 'wg-actions' }, chk, nextBtn));
      window.scrollTo({ top: stage.offsetTop - 80, behavior: U.reduced() ? 'auto' : 'smooth' });
    }
    function finish() {
      const score = Math.round(tasks.reduce(function (a, t) { return a + (res[t.id] || 0); }, 0) * 10) / 10;
      const rec = { score: score, total: total, date: new Date().toLocaleString('vi-VN'), parts: res, name: U.store.get('learner', '') };
      U.store.set('post', rec); A.app.refreshNav(); summary(rec);
    }
    function summary(rec) {
      cur = -1; res = rec.parts || {}; markRail(); stage.innerHTML = '';
      const pct = Math.round(rec.score / rec.total * 100);
      const head = h('div', { class: 'q-result' }, h('p', { class: 'big-num' }, h('span', { class: 'n' }, String(rec.score)), h('span', { class: 'u' }, '/' + rec.total + ' điểm')),
        h('p', {}, pct >= 80 ? 'Đạt yêu cầu. Đồng chí đã vận dụng tốt các kỹ năng của khóa tập huấn.' : 'Chưa đạt 80 điểm. Xem lại các nhóm kỹ năng có điểm thấp bên dưới.'));
      stage.append(head); U.stamp(head, pct >= 80 ? 'Đạt' : 'Ôn tập', pct >= 80 ? 'good' : 'warn');
      /* theo nhóm kỹ năng */
      const skills = {};
      tasks.forEach(function (t) { skills[t.skill] = skills[t.skill] || { got: 0, max: 0 }; skills[t.skill].got += (rec.parts[t.id] || 0); skills[t.skill].max += t.pts; });
      const chart = h('div', { class: 'cmp' }, h('h3', {}, 'Kết quả theo nhóm kỹ năng'));
      Object.keys(skills).forEach(function (k) {
        const v = skills[k], p = Math.round(v.got / v.max * 100);
        const bar = h('div', { class: 'cmp-bar ' + (p >= 80 ? 'post' : p >= 50 ? 'mid' : 'low') }, h('span', {}, p + '%'));
        chart.append(h('div', { class: 'cmp-row wide' }, h('span', { class: 'cmp-l' }, k), h('div', { class: 'cmp-track' }, bar)));
        setTimeout(function () { bar.style.width = Math.max(p, 4) + '%'; }, 80);
      });
      stage.append(chart);
      const pre = U.store.get('pre', null);
      if (pre) {
        const p1 = Math.round(pre.score / pre.total * 100);
        const cmp = h('div', { class: 'cmp' }, h('h3', {}, 'So với khảo sát đầu vào'));
        [['Đầu vào', p1, 'pre'], ['Cuối khóa', pct, 'post']].forEach(function (r) {
          const bar = h('div', { class: 'cmp-bar ' + r[2] }, h('span', {}, r[1] + '%'));
          cmp.append(h('div', { class: 'cmp-row' }, h('span', { class: 'cmp-l' }, r[0]), h('div', { class: 'cmp-track' }, bar)));
          setTimeout(function () { bar.style.width = Math.max(r[1], 4) + '%'; }, 80);
        });
        stage.append(cmp);
      }
      const csv = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () {
        const rows = [['Họ tên, đơn vị', 'Bài', 'Điểm', 'Tổng', 'Thời điểm']];
        const p0 = U.store.get('pre', null); if (p0) rows.push([p0.name || '', 'Khảo sát đầu vào', p0.score, p0.total, p0.date]);
        rows.push([rec.name || '', 'Kiểm tra thực hành cuối khóa', rec.score, rec.total, rec.date]);
        tasks.forEach(function (t, i) { rows.push([rec.name || '', 'Phần ' + (i + 1) + ': ' + t.title, rec.parts[t.id] || 0, t.pts, '']); });
        U.download('ket-qua-tap-huan-attt.csv', rows.map(function (r) { return r.map(U.csvCell).join(','); }).join('\n'));
      } }, 'Tải kết quả (CSV)');
      stage.append(h('div', { class: 'wg-actions' }, csv, h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: intro }, 'Làm lại'), h('a', { class: 'btn btn-sm', href: '#/tu-kiem-tra' }, 'Danh mục tự kiểm tra hằng tháng')));
    }
    intro();
    return page;
  };
})(window.ATTT);
