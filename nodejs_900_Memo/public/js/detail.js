document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.btn");

  btn_box.addEventListener("click", (e) => {
    const target = e.target;
    const m_seq = target.dataset.num;
    alert(target.tagName);
    if (target.className === "update") {
      document.location.href = `/${m_seq}/update`;
    }
  });
});
