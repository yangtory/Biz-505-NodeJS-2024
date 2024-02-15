document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("div.list");

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "UL") {
      const m_seq = target.dataset.num;
      document.location.href = `/${m_seq}/detail`;
    }
  });
});
