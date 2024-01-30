const joing_btn_click_event = async () => {
  const join_form = document.querySelector("form.join");
  const userid = join_form.querySelector("#userid");
  const password = join_form.querySelector("#password");
  const re_password = join_form.querySelector("#re_password");
  const realname = join_form.querySelector("#realname");
  const tel = join_form.querySelector("#tel");

  if (userid.value === "") {
    alert("사용자 ID 를 입력해야 합니다");
    userid.select();
    return false;
  } else {
    // 사용자아이디가 입력됐으면
    const response = await fetch(`/users/${userid.value}/check`);
    const json = await response.json();
    // res 데이터를 가져오고 json으로 보낸다
    // json 메세지를 검사한다
    if (json.MESSAGE === "FOUND") {
      alert("이미 등록된 사용자 ID 입니다");
      userid.select();
      return false;
    } else {
      alert("사용 가능한 사용자 ID 입니다");
      password.select();
    }
  }
  if (password.value === "") {
    alert("비밀번호를 입력해야 합니다");
    password.select();
    return false;
  }
  if (re_password.value === "") {
    alert("비밀번호 확인을 입력해야 합니다");
    re_password.select();
    return false;
  }
  if (password.value !== re_password.value) {
    alert("비밀번호와 비밀번호 확인 값이 다릅니다");
    password.select();
    return false;
  }
  join_form.submit();
};

document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#join_btn");
  join_btn.addEventListener("click", joing_btn_click_event);
});
