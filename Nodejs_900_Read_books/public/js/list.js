document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.list");

  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const paTR = target.closest("TR");
      const tds = paTR.querySelectorAll("TD");
      const b_isbn = tds[1].innerText;
      document.location.href = `/booklist/${b_isbn}/detail`;
    }
  });
});
