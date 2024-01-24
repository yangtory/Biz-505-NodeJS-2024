document.addEventListener("DOMContentLoade", () => {
  const btn_list = document.querySelector("bitton.list");
  const btn_update = document.querySelector("bitton.update");
  const btn_delete = document.querySelector("bitton.delete");

  btn_list.addEventListener("click", () => {
    document.location.href = "/books";
  });
  btn_update.addEventListener("click", (e) => {
    document.location.replace(`/books/${e.target.dataset.isbn}/update`);
  });
  btn_delete.addEventListener("click", (e) => {
    if (confirm("도서 정보를 정말 삭제 할까요?")) {
      document.location.replace(`/books/${e.target.dataset.isbn}/delete`);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.detail.btn");

  btn_box.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
      const className = button.className;
      // 1. button 에 부착된 data-isbn 으로 부터 isbn 값을 가져오기
      // const isbn = button.dataset.isbn;

      // 2. button 들을 감싸고 있는 DIV tag 에 부착된 data-isbn 으로부터
      // isbn 값을 가져오기, 버튼이 여러개일경우 실수하지않기위해 부모태그에 data-isbn 변수설정
      const parDIV = button.closest("DIV");
      const isbn = parDIV.dataset.isbn;

      let url = "/books";
      if (className === "update") {
        // url = url + `/${isbn}/update`
        // url = `/books/${isbn}/update`
        url += `/${isbn}/update`;
      } else if (className === "delete") {
        // ! 삭제안할거야
        if (!confirm("도서 정보를 정말 삭제 할까요?")) {
          return false;
        }
        url += `/${isbn}/delete`;
      }
      document.location.replace(url);
    }
  });
});
