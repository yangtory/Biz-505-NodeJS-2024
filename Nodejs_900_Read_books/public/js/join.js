document.addEventListener("DOMContentLoaded", () => {
  const JOIN_INDEX = {
    ID: 0,
    PW: 1,
    PW_CHECK: 2,
    EMAIL: 3,
    NAME: 4,
  };
  const id = document.querySelector("#id");
  const password = document.querySelector("#password");
  const password_check = document.querySelector("#password_check");
  const email = document.querySelector("#email");
  const name = document.querySelector("#name");
  const form = document.querySelector("form.join.input");
  const btn_join = document.querySelector("form.join button");

  const error_divs = document.querySelectorAll("div.error");
  btn_join?.addEventListener("click", () => {
    error_divs.forEach((item) => (item.innerHTML = ""));

    if (!id.value) {
      error_divs[JOIN_INDEX.ID].innerHTML = "* 사용할 아이디를 입력 해주세요";
      id.select();
      return false;
    }
    if (!password.value) {
      error_divs[JOIN_INDEX.PW].innerHTML = "* 사용할 비밀번호를 입력 해주세요";
      password.select();
      return false;
    }
    if (password.value !== password_check.value) {
      error_divs[JOIN_INDEX.PW_CHECK].innerHTML = "* 비밀번호가 일치하지 않습니다";
      password_check.select();
      return false;
    }
    if (!email.value) {
      error_divs[JOIN_INDEX.EMAIL].innerHTML = "* Email 입력은 필수입니다";
      email.select();
      return false;
    }
    if (!name.value) {
      error_divs[JOIN_INDEX.NAME].innerHTML = "* 이름 입력은 필수입니다";
      name.select();
      return false;
    }
    form.submit();
  });
});
