/* Dựng trang chủ đề từ dữ liệu. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;
  function block(b) {
    if (b.type === 'part') return h('h2', { class: 'part-h' }, b.t);
    const sec = h('section', { class: 'blk blk-' + b.type });
    if (b.title) sec.append(h('h2', {}, b.title));
    switch (b.type) {
      case 'prose': b.body.forEach(function (p) { sec.append(h('p', { html: p })); }); break;
      case 'points': {
        if (b.items.some(function (it) { return it.i; })) {
          const g = h('div', { class: 'icards' + (b.items.length === 4 ? ' four' : '') });
          b.items.forEach(function (it) { g.append(h('div', { class: 'icard' }, A.icon(it.i || 'file'), h('h3', {}, it.t), h('p', { html: it.d }))); });
          sec.append(g); break;
        }
        const dl = h('dl', { class: 'points' });
        b.items.forEach(function (it) { dl.append(h('div', { class: 'pt' }, h('dt', {}, it.t), h('dd', { html: it.d }))); });
        sec.append(dl); break;
      }
      case 'table': {
        const t = h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, b.head.map(function (x) { return h('th', {}, x); }))));
        const tb = h('tbody'); b.rows.forEach(function (r) { tb.append(h('tr', {}, r.map(function (c) { return h('td', { html: c }); }))); });
        t.append(tb); sec.append(h('div', { class: 'table-wrap' }, t));
        if (b.note) sec.append(h('p', { class: 'tbl-note' }, b.note)); break;
      }
      case 'note': sec.className += ' note note-' + b.kind; sec.append(h('p', { html: b.body })); break;
      case 'rules': {
        sec.className += ' rules rules-' + b.variant;
        const ul = h('ul'); b.items.forEach(function (x) { ul.append(h('li', {}, x)); }); sec.append(ul); break;
      }
      case 'widget': {
        sec.className += ' wg' + (['cia', 'human', 'aiuses', 'cutoff', 'hiddendata', 'biaslab', 'lawtimeline', 'nextword', 'limits', 'border', 'traffic', 'levels', 'scams', 'aiflow', 'otp', 'channels', 'wifi', 'mfa', 'backup', 'chain', 'flow', 'tabs', 'contacts', 'flip'].indexOf(b.name) >= 0 ? ' wg-illus' : '');
        if (b.intro) sec.append(h('p', { class: 'wg-intro' }, b.intro));
        const host = h('div', { class: 'wg-host wg-' + b.name });
        sec.append(host);
        const fn = A.widgets[b.name];
        if (fn) { try { fn(host, b.opts || {}); } catch (e) { console.error(e); host.append(h('p', { class: 'bad' }, 'Không tải được học liệu này.')); } }
        break;
      }
    }
    return sec;
  }
  A.renderTopic = function (t) {
    const page = h('article', { class: 'page topic' });
    const goals = [];
    let idx = 0; const flat = [];
    A.data.objectives.forEach(function (g) { g.items.forEach(function (it) { idx++; flat.push({ n: idx, g: g.group, t: it }); }); });
    t.goals.forEach(function (n) { const o = flat[n - 1]; goals.push(h('li', {}, h('span', { class: 'goal-n' }, o.g + ' ' + n), o.t)); });
    page.append(h('header', { class: 'topic-head' },
      h('p', { class: 'topic-meta' }, h('span', { class: 'sess sess-' + (t.session === 'Buổi sáng' ? 'am' : 'pm') }, t.session), h('span', {}, t.time), h('span', {}, t.format)),
      h('p', { class: 'topic-idx' }, t.n ? 'Chủ đề ' + t.n + ' trên 8' : t.label),
      h('h1', {}, t.title),
      h('p', { class: 'lead' }, t.lead),
      h('details', { class: 'goals' }, h('summary', {}, 'Mục tiêu cần đạt của chủ đề'), h('ul', {}, goals))));
    if (t.hook) page.append(h('aside', { class: 'hook' }, h('h2', {}, t.hook.title), h('p', {}, t.hook.text), t.hook.note ? h('p', { class: 'hook-note' }, t.hook.note) : null));
    t.blocks.forEach(function (b) { page.append(block(b)); });
    const tk = h('section', { class: 'takeaways' }, h('h2', {}, 'Ghi nhớ'));
    const ol = h('ol'); t.takeaways.forEach(function (x) { ol.append(h('li', {}, x)); }); tk.append(ol);
    if (t.reflect) tk.append(h('p', { class: 'reflect' }, h('strong', {}, 'Câu hỏi tự vấn: '), t.reflect));
    page.append(tk);
    const prev = t.n > 1 ? '#/chu-de/' + (t.n - 1) : t.n === 1 ? '#/cap-nhat-phap-luat' : '#/khao-sat';
    const prevL = t.n > 1 ? 'Chủ đề ' + (t.n - 1) : t.n === 1 ? 'Phần mở đầu: Cập nhật pháp luật' : 'Khảo sát đầu vào';
    const next = t.n < 8 ? '#/chu-de/' + (t.n + 1) : '#/kiem-tra';
    page.append(h('nav', { class: 'pager', 'aria-label': 'Chuyển chủ đề' },
      h('a', { class: 'pg pg-prev', href: prev }, h('small', {}, 'Trước'), prevL),
      h('a', { class: 'pg pg-next', href: next }, h('small', {}, 'Tiếp theo'), t.n < 8 ? 'Chủ đề ' + (t.n + 1) + ': ' + A.data.topics[t.n].title : 'Bài kiểm tra cuối khóa')));
    return page;
  };
})(window.ATTT);
