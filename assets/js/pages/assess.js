/* Khảo sát đầu vào (trắc nghiệm) và danh mục tự kiểm tra hằng tháng. Bài kiểm tra cuối khóa ở pages/final.js. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  function quizPage(mode) {
    const pre = mode === 'pre';
    const bank = A.data.quiz.map(function (q, i) { return Object.assign({ id: i }, q); }).filter(function (q) { return pre ? q.pre : true; });
    const qs = pre ? bank : U.shuffle(bank);
    const page = h('article', { class: 'page quiz-page' });
    page.append(h('header', { class: 'topic-head' },
      h('p', { class: 'topic-meta' }, h('span', { class: 'sess ' + (pre ? 'sess-am' : 'sess-pm') }, pre ? 'Khai mạc' : 'Tổng kết'), h('span', {}, pre ? '08:00 – 08:20' : '16:45 – 17:15')),
      h('h1', {}, pre ? 'Khảo sát đầu vào' : 'Bài kiểm tra cuối khóa'),
      h('p', { class: 'lead' }, pre ? 'Mười lăm câu trắc nghiệm để xác lập mốc so sánh. Chưa hiển thị đáp án; kết quả được so sánh với bài kiểm tra cuối ngày.' : 'Hai mươi câu trắc nghiệm. Sau khi nộp bài, xem đáp án, giải thích và mức tiến bộ so với khảo sát đầu vào.')));
    const box = h('section', { class: 'quiz' });
    page.append(box);
    const ans = {};
    let i = 0;
    const name = h('input', { type: 'text', class: 'q-name', placeholder: 'Họ tên, đơn vị (không bắt buộc)', value: U.store.get('learner', ''), 'aria-label': 'Họ tên, đơn vị' });
    name.addEventListener('input', function () { U.store.set('learner', name.value); });
    function start() {
      box.innerHTML = '';
      const prev = U.store.get(mode, null);
      box.append(h('div', { class: 'q-start' }, name,
        prev ? h('p', { class: 'muted' }, 'Đồng chí đã làm bài này lúc ' + prev.date + ', đạt ' + prev.score + '/' + prev.total + '. Làm lại sẽ ghi đè kết quả cũ.') : null,
        h('button', { class: 'btn', type: 'button', onclick: function () { i = 0; Object.keys(ans).forEach(function (k) { delete ans[k]; }); show(); } }, 'Bắt đầu làm bài'),
        prev ? h('button', { class: 'btn btn-ghost', type: 'button', onclick: function () { result(prev.answers, prev); } }, 'Xem lại kết quả') : null));
    }
    function show() {
      box.innerHTML = '';
      const q = qs[i];
      const prog = h('div', { class: 'q-prog' }, h('div', { style: { width: (i / qs.length * 100) + '%' } }));
      const opts = h('div', { class: 'choices-opts', role: 'radiogroup', 'aria-label': 'Phương án trả lời' });
      q.o.forEach(function (t, k) {
        const b = h('button', { class: 'opt' + (ans[q.id] === k ? ' picked' : ''), type: 'button', role: 'radio', 'aria-checked': String(ans[q.id] === k) }, h('span', { class: 'opt-k' }, 'ABCD'[k]), t);
        b.addEventListener('click', function () { ans[q.id] = k; if (i < qs.length - 1) { i++; show(); } else show(); });
        opts.append(b);
      });
      const done = Object.keys(ans).length;
      const nav = h('div', { class: 'q-nav' },
        h('button', { class: 'btn btn-ghost btn-sm', type: 'button', disabled: i === 0, onclick: function () { i--; show(); } }, 'Câu trước'),
        h('span', { class: 'muted' }, 'Đã trả lời ' + done + '/' + qs.length),
        i < qs.length - 1 ? h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { i++; show(); } }, 'Câu sau') :
          h('button', { class: 'btn btn-sm', type: 'button', disabled: done < qs.length, onclick: submit }, 'Nộp bài'));
      box.append(prog, h('p', { class: 'choices-count' }, 'Câu ' + (i + 1) + '/' + qs.length), h('h2', { class: 'q-q' }, q.q), opts, nav);
    }
    function submit() {
      const score = qs.filter(function (q) { return ans[q.id] === q.a; }).length;
      const rec = { score: score, total: qs.length, date: new Date().toLocaleString('vi-VN'), answers: Object.assign({}, ans), name: name.value };
      U.store.set(mode, rec); A.app.refreshNav();
      result(rec.answers, rec);
    }
    function result(a, rec) {
      box.innerHTML = '';
      const pct = Math.round(rec.score / rec.total * 100);
      const head = h('div', { class: 'q-result' }, h('p', { class: 'big-num' }, h('span', { class: 'n' }, String(rec.score)), h('span', { class: 'u' }, '/' + rec.total)), h('p', {}, pre ? 'Kết quả khảo sát đầu vào đã được ghi nhận. Đáp án sẽ được giảng viên phân tích trong các chủ đề.' : (pct >= 80 ? 'Đạt yêu cầu.' : 'Chưa đạt 80%. Xem lại phần giải thích và các chủ đề liên quan.')));
      box.append(head);
      if (!pre) U.stamp(head, pct >= 80 ? 'Đạt' : 'Ôn tập', pct >= 80 ? 'good' : 'warn');
      /* so sánh trước – sau trên 15 câu chung */
      const p1 = U.store.get('pre', null), p2 = U.store.get('post', null);
      if (p1 && p2) {
        const common = A.data.quiz.map(function (q, i2) { return i2; }).filter(function (i2) { return A.data.quiz[i2].pre; });
        const s1 = common.filter(function (k) { return p1.answers[k] === A.data.quiz[k].a; }).length;
        const s2 = common.filter(function (k) { return p2.answers[k] === A.data.quiz[k].a; }).length;
        const cmp = h('div', { class: 'cmp' }, h('h3', {}, 'Tiến bộ trên 15 câu chung'));
        [['Đầu vào', s1, 'pre'], ['Cuối khóa', s2, 'post']].forEach(function (r) {
          const bar = h('div', { class: 'cmp-bar ' + r[2] }, h('span', {}, r[1] + '/15'));
          cmp.append(h('div', { class: 'cmp-row' }, h('span', { class: 'cmp-l' }, r[0]), h('div', { class: 'cmp-track' }, bar)));
          requestAnimationFrame(function () { setTimeout(function () { bar.style.width = (r[1] / 15 * 100) + '%'; }, 60); });
        });
        cmp.append(h('p', { class: 'muted' }, s2 > s1 ? 'Tăng ' + (s2 - s1) + ' câu so với đầu ngày.' : s2 === s1 ? 'Kết quả không đổi so với đầu ngày.' : 'Kết quả thấp hơn đầu ngày; đề nghị ôn tập lại.'));
        box.append(cmp);
      }
      if (!pre) {
        const rv = h('ol', { class: 'review' });
        qs.forEach(function (q) {
          const ok = a[q.id] === q.a;
          rv.append(h('li', { class: ok ? 'ok' : 'bad' }, h('p', { class: 'rv-q' }, q.q), h('p', {}, 'Đáp án đúng: ', h('strong', {}, q.o[q.a]), ok ? '' : '. Đồng chí chọn: ' + (q.o[a[q.id]] || 'chưa trả lời')), h('p', { class: 'muted' }, q.why + ' ', h('a', { href: '#/chu-de/' + q.topic }, 'Xem chủ đề ' + q.topic))));
        });
        box.append(h('h3', {}, 'Đáp án và giải thích'), rv);
      }
      const csv = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () {
        const rows = [['Họ tên, đơn vị', 'Bài', 'Điểm', 'Tổng', 'Thời điểm']];
        [['pre', 'Khảo sát đầu vào'], ['post', 'Kiểm tra cuối khóa']].forEach(function (m) { const r = U.store.get(m[0], null); if (r) rows.push([r.name || '', m[1], r.score, r.total, r.date]); });
        U.download('ket-qua-tap-huan-attt.csv', rows.map(function (r) { return r.map(U.csvCell).join(','); }).join('\n'));
      } }, 'Tải kết quả (CSV)');
      box.append(h('div', { class: 'wg-actions' }, csv, h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: start }, 'Làm lại'), h('a', { class: 'btn btn-sm', href: pre ? '#/chu-de/1' : '#/tu-kiem-tra' }, pre ? 'Vào chủ đề 1' : 'Danh mục tự kiểm tra')));
    }
    start();
    return page;
  }
  A.pages.pre = function () { return quizPage('pre'); };

  /* ---------- Danh mục tự kiểm tra hằng tháng ---------- */
  A.pages.checklist = function () {
    const groups = [
      { g: 'Tài khoản', it: ['Tài khoản công vụ, Zalo, thư điện tử đều đã bật xác thực hai lớp', 'Không có tài khoản nào dùng chung một mật khẩu', 'Đã xem danh sách thiết bị đăng nhập và đăng xuất thiết bị lạ'] },
      { g: 'Thiết bị', it: ['Hệ điều hành, trình duyệt, ứng dụng đã cập nhật', 'Không có phần mềm bẻ khóa, ứng dụng lạ', 'Máy tính, điện thoại tự khóa màn hình'] },
      { g: 'Dữ liệu', it: ['Đã xóa ảnh chụp văn bản, giấy tờ công dân trên điện thoại', 'Dữ liệu công việc được sao lưu theo quy định, có bản tách rời', 'Không còn dữ liệu công vụ trên Gmail, Drive, USB cá nhân'] },
      { g: 'Nhóm và chia sẻ', it: ['Đã rà soát thành viên các nhóm trao đổi công việc do mình quản lý', 'Đã thu hồi các đường liên kết chia sẻ tệp không còn cần thiết', 'Số điện thoại đầu mối an toàn thông tin có trong danh bạ'] }
    ];
    const page = h('article', { class: 'page' });
    page.append(h('header', { class: 'topic-head' }, h('h1', {}, 'Danh mục tự kiểm tra hằng tháng'), h('p', { class: 'lead' }, 'Mười hai việc, khoảng 15 phút mỗi tháng. Kết quả lưu trên trình duyệt; bấm “Bắt đầu tháng mới” để kiểm tra lại từ đầu.')));
    const st = U.store.get('monthly', { at: '', done: [] });
    const count = h('p', { class: 'ck-count', 'aria-live': 'polite' });
    const grid = h('div', { class: 'ck-grid' }); let n = 0;
    groups.forEach(function (g) {
      const ul = h('ul', { class: 'checklist' });
      g.it.forEach(function (t) {
        const i = n++; const id = 'mk' + i;
        const cb = h('input', { type: 'checkbox', id: id }); cb.checked = st.done.indexOf(i) >= 0;
        cb.addEventListener('change', function () { const k = st.done.indexOf(i); if (cb.checked && k < 0) st.done.push(i); if (!cb.checked && k >= 0) st.done.splice(k, 1); st.at = new Date().toLocaleDateString('vi-VN'); U.store.set('monthly', st); upd(); });
        ul.append(h('li', {}, cb, h('label', { for: id }, t)));
      });
      grid.append(h('section', { class: 'ck' }, h('h2', {}, g.g), ul));
    });
    function upd() { count.textContent = 'Đã hoàn thành ' + st.done.length + '/' + n + ' việc' + (st.at ? ' (cập nhật ngày ' + st.at + ')' : '') + '.'; }
    page.append(count, grid, h('div', { class: 'wg-actions no-print' },
      h('button', { class: 'btn btn-ghost', type: 'button', onclick: function () { st.done = []; st.at = ''; U.store.set('monthly', st); A.app.go(); } }, 'Bắt đầu tháng mới'),
      h('button', { class: 'btn', type: 'button', onclick: function () { window.print(); } }, 'In danh mục')));
    upd();
    return page;
  };
})(window.ATTT);
