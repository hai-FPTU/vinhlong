/* Điều hướng, thanh bên, chế độ trình chiếu, tiến độ học. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;
  const main = document.getElementById('main');
  const side = document.getElementById('sidebar');
  const order = ['', 'khao-sat', 'cap-nhat-phap-luat', 'chu-de/1', 'chu-de/2', 'chu-de/3', 'chu-de/4', 'chu-de/5', 'chu-de/6', 'chu-de/7', 'chu-de/8', 'kiem-tra', 'tu-kiem-tra', 'phap-ly'];
  function route() { return (location.hash || '#/').replace(/^#\/?/, ''); }

  function nav() {
    const cur = route();
    const visited = U.store.get('visited', []);
    side.innerHTML = '';
    function link(r, num, title, sub, done) {
      return h('a', { class: 'nav-link' + (done ? ' done' : ''), href: '#/' + r, 'aria-current': cur === r ? 'page' : null },
        h('span', { class: 'nav-num' + (num ? '' : ' nav-dot') }, num || ''), h('span', { class: 'nav-t' }, title, sub ? h('small', {}, sub) : null));
    }
    side.append(h('div', { class: 'nav-group' }, link('', '', 'Giới thiệu chương trình'), link('khao-sat', '', 'Khảo sát đầu vào', '08:00', !!U.store.get('pre', null))));
    [['Buổi sáng', [1, 2, 3, 4]], ['Buổi chiều', [5, 6, 7, 8]]].forEach(function (g, gi) {
      const box = h('div', { class: 'nav-group' }, h('h2', {}, g[0]));
      if (gi === 0) box.append(link('cap-nhat-phap-luat', '§', A.data.lawIntro.title, A.data.lawIntro.time, visited.indexOf(0) >= 0));
      g[1].forEach(function (n) { const t = A.data.topics[n - 1]; const l = link('chu-de/' + n, String(n), t.title, t.time, visited.indexOf(n) >= 0); if (n === 7) { l.classList.add('nav-focus'); l.querySelector('.nav-t').append(h('span', { class: 'nav-badge' }, 'Chuyên đề trọng tâm')); } box.append(l); });
      side.append(box);
    });
    side.append(h('div', { class: 'nav-group' }, h('h2', {}, 'Tổng kết'),
      link('kiem-tra', '', 'Bài kiểm tra cuối khóa', '16:45', !!U.store.get('post', null)), link('tu-kiem-tra', '', 'Tự kiểm tra hằng tháng'), link('phap-ly', '', 'Căn cứ pháp lý')));
    side.append(h('p', { class: 'nav-ver' }, A.config.version || ''));
    const pill = document.getElementById('progress');
    if (pill) pill.textContent = 'Đã học ' + visited.filter(function (n) { return n > 0; }).length + '/8 chủ đề';
  }

  function go() {
    const r = route();
    let page;
    const m = /^chu-de\/(\d)$/.exec(r);
    if (m && A.data.topics[+m[1] - 1]) {
      const n = +m[1]; page = A.renderTopic(A.data.topics[n - 1]);
      const v = U.store.get('visited', []); if (v.indexOf(n) < 0) { v.push(n); U.store.set('visited', v); }
      document.title = 'Chủ đề ' + n + ' – ' + A.config.shortCourse;
    } else if (r === 'cap-nhat-phap-luat') {
      page = A.renderTopic(A.data.lawIntro);
      const v = U.store.get('visited', []); if (v.indexOf(0) < 0) { v.push(0); U.store.set('visited', v); }
      document.title = 'Cập nhật pháp luật – ' + A.config.shortCourse;
    } else if (r === 'khao-sat') { page = A.pages.pre(); document.title = 'Khảo sát đầu vào – ' + A.config.shortCourse; }
    else if (r === 'kiem-tra') { page = A.pages.post(); document.title = 'Kiểm tra cuối khóa – ' + A.config.shortCourse; }
    else if (r === 'tu-kiem-tra') { page = A.pages.checklist(); document.title = 'Tự kiểm tra – ' + A.config.shortCourse; }
    else if (r === 'phap-ly') { page = A.pages.legal(); document.title = 'Căn cứ pháp lý – ' + A.config.shortCourse; }
    else { page = A.pages.home(); document.title = A.config.shortCourse + ' – Giáo trình tương tác'; }
    main.innerHTML = ''; main.append(page);
    document.body.classList.remove('nav-open'); menuBtn.setAttribute('aria-expanded', 'false');
    bottomNav();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    nav();
  }

  const menuBtn = document.getElementById('menu-btn');
  function setNav(open) { document.body.classList.toggle('nav-open', open); menuBtn.setAttribute('aria-expanded', String(open)); if (open) { const a = side.querySelector('[aria-current="page"]') || side.querySelector('a'); if (a) a.focus({ preventScroll: true }); } }
  menuBtn.addEventListener('click', function () { setNav(!document.body.classList.contains('nav-open')); });
  document.getElementById('backdrop').addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setNav(false); menuBtn.focus(); } });

  /* Thanh chuyển trang dưới cùng trên điện thoại */
  const bnav = document.getElementById('bottom-nav');
  function label(r) {
    if (r === '') return 'Giới thiệu';
    if (r === 'khao-sat') return 'Khảo sát';
    if (r === 'cap-nhat-phap-luat') return 'Pháp luật';
    if (r === 'kiem-tra') return 'Kiểm tra';
    if (r === 'tu-kiem-tra') return 'Tự kiểm tra';
    if (r === 'phap-ly') return 'Pháp lý';
    const m = /^chu-de\/(\d)$/.exec(r); return m ? 'Chủ đề ' + m[1] : '';
  }
  function bottomNav() {
    const r = route(), i = order.indexOf(r);
    bnav.innerHTML = '';
    const prev = i > 0 ? order[i - 1] : null, next = i >= 0 && i < order.length - 1 ? order[i + 1] : null;
    bnav.append(
      prev != null ? h('a', { class: 'bn-btn bn-prev', href: '#/' + prev }, h('small', {}, 'Trước'), label(prev)) : h('span', { class: 'bn-btn bn-empty' }),
      h('button', { class: 'bn-btn bn-menu', type: 'button', onclick: function () { setNav(!document.body.classList.contains('nav-open')); } }, h('small', {}, 'Mục lục'), label(r) || 'Trang'),
      next != null ? h('a', { class: 'bn-btn bn-next', href: '#/' + next }, h('small', {}, 'Tiếp'), label(next)) : h('span', { class: 'bn-btn bn-empty' }));
  }
  const pj = document.getElementById('projector-btn');
  function setPj(on) { document.body.classList.toggle('projector', on); pj.setAttribute('aria-pressed', String(on)); U.store.set('projector', on); }
  pj.addEventListener('click', function () { setPj(!document.body.classList.contains('projector')); });
  setPj(!!U.store.get('projector', false));

  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea, select, [contenteditable]') || e.altKey || e.ctrlKey || e.metaKey) return;
    const i = order.indexOf(route());
    if (e.key === 'ArrowRight' && i >= 0 && i < order.length - 1) location.hash = '#/' + order[i + 1];
    if (e.key === 'ArrowLeft' && i > 0) location.hash = '#/' + order[i - 1];
  });
  window.addEventListener('hashchange', go);
  A.app = { go: go, refreshNav: nav };
  go();

  /* Lưu đệm để dùng khi mạng yếu (chỉ khi chạy qua http/https) */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); });
  }
})(window.ATTT);
