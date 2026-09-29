/* Điều hướng, thanh bên, chế độ trình chiếu, tiến độ học. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;
  const main = document.getElementById('main');
  const side = document.getElementById('sidebar');
  const order = ['', 'khao-sat', 'chu-de/1', 'chu-de/2', 'chu-de/3', 'chu-de/4', 'chu-de/5', 'chu-de/6', 'chu-de/7', 'chu-de/8', 'kiem-tra', 'tu-kiem-tra', 'phap-ly'];
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
    [['Buổi sáng', [1, 2, 3, 4]], ['Buổi chiều', [5, 6, 7, 8]]].forEach(function (g) {
      const box = h('div', { class: 'nav-group' }, h('h2', {}, g[0]));
      g[1].forEach(function (n) { const t = A.data.topics[n - 1]; box.append(link('chu-de/' + n, String(n), t.title, t.time, visited.indexOf(n) >= 0)); });
      side.append(box);
    });
    side.append(h('div', { class: 'nav-group' }, h('h2', {}, 'Tổng kết'),
      link('kiem-tra', '', 'Bài kiểm tra cuối khóa', '16:45', !!U.store.get('post', null)), link('tu-kiem-tra', '', 'Tự kiểm tra hằng tháng'), link('phap-ly', '', 'Căn cứ pháp lý')));
    const pill = document.getElementById('progress');
    if (pill) pill.textContent = 'Đã học ' + visited.length + '/8 chủ đề';
  }

  function go() {
    const r = route();
    let page;
    const m = /^chu-de\/(\d)$/.exec(r);
    if (m && A.data.topics[+m[1] - 1]) {
      const n = +m[1]; page = A.renderTopic(A.data.topics[n - 1]);
      const v = U.store.get('visited', []); if (v.indexOf(n) < 0) { v.push(n); U.store.set('visited', v); }
      document.title = 'Chủ đề ' + n + ' – ' + A.config.shortCourse;
    } else if (r === 'khao-sat') { page = A.pages.pre(); document.title = 'Khảo sát đầu vào – ' + A.config.shortCourse; }
    else if (r === 'kiem-tra') { page = A.pages.post(); document.title = 'Kiểm tra cuối khóa – ' + A.config.shortCourse; }
    else if (r === 'tu-kiem-tra') { page = A.pages.checklist(); document.title = 'Tự kiểm tra – ' + A.config.shortCourse; }
    else if (r === 'phap-ly') { page = A.pages.legal(); document.title = 'Căn cứ pháp lý – ' + A.config.shortCourse; }
    else { page = A.pages.home(); document.title = A.config.shortCourse + ' – Giáo trình tương tác'; }
    main.innerHTML = ''; main.append(page);
    document.body.classList.remove('nav-open');
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    nav();
  }

  document.getElementById('menu-btn').addEventListener('click', function () {
    const open = document.body.classList.toggle('nav-open');
    this.setAttribute('aria-expanded', String(open));
  });
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
})(window.ATTT);
