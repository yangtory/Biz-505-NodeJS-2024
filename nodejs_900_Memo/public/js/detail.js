document.addEventListener('DOMContentLoaded', () => {
    const btn_box = document.querySelector('div.btn');

    btn_box.addEventListener('click', (e) => {
        const target = e.target;
        const m_seq = target.dataset.num;
        if (target.className === 'update') {
            document.location.href = `/${m_seq}/update`;
        }
        if (target.className === 'delete') {
            if (confirm('정말 삭제할까요?')) {
                document.location.href = `/${m_seq}/delete`;
            }
        }
    });
});
