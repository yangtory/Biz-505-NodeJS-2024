document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('div.list');
    const home = document.querySelector('h1');

    list.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'UL') {
            const m_seq = target.dataset.num;
            document.location.href = `/${m_seq}/detail`;
        }
    });

    home.addEventListener('click', () => {
        document.location.href = '/';
    });
});
