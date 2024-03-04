document.addEventListener("DOMContentLoaded", () => {
  const book = document.querySelector("table.book");

  book.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const TR = target.closest("TR");
      const isbn = TR.dataset.isbn;
      //   alert(isbn);
      document.location.href = `/naver/detail/${isbn}`;
    }
  });
});
