document.addEventListener("DOMContentLoaded", () => {
  B_INDEX = {
    B_ISBN: 0,
    B_TITLE: 1,
    B_AUTHOR: 2,
    B_PUBLISHER: 3,
    B_PRICE: 4,
    B_DISCOUT: 5,
  };

  const b_isbn = document.querySelector("#b_isbn");
  const b_title = document.querySelector("#b_title");
  const b_author = document.querySelector("#b_author");
  const b_publisher = document.querySelector("#b_publisher");
  const b_price = document.querySelector("#b_price");
  const b_discout = document.querySelector("#b_discout");
  const form = document.querySelector("form.book.input");
  const btn_submit = document.querySelector("form.book button.add");

  const error_divs = document.querySelectorAll("div.book.error");

  btn_submit?.addEventListener("click", () => {
    error_divs.forEach((item) => (item.innerHTML = ""));
    if (!b_isbn.value) {
      error_divs[B_INDEX.B_ISBN].innerHTML = "* ISBN 을 입력하세요";
      b_isbn.select();
      return false;
    }
    if (!b_title.value) {
      error_divs[B_INDEX.B_TITLE].innerHTML = "* 도서명을 입력하세요";
      b_title.select();
      return false;
    }
    if (!b_author.value) {
      error_divs[B_INDEX.B_AUTHOR].innerHTML = "* 저자를 입력하세요";
      b_author.select();
      return false;
    }
    if (!b_publisher.value) {
      error_divs[B_INDEX.B_PUBLISHER].innerHTML = "* 출판사를 입력하세요";
      b_publisher.select();
      return false;
    }
    if (!b_price.value) {
      error_divs[B_INDEX.B_PRICE].innerHTML = "* 가격을 입력하세요";
      b_publisher.select();
      return false;
    }
    form.submit();
  });
});
