document.addEventListener("DOMContentLoaded", () => {
  const main_nav = document.querySelector("nav.main");

  main_nav.addEventListener("click", (e) => {
    const target = e.target;
    const tagName = target.tagName;

    // li tag 가 클릭 되었을때만 반응하도록 설정
    if (tagName === "LI") {
      /*
      tag 가 포함하는 content 를 getter 하는 속성에 다음 2가지가 있었다
      target.innerText, target.innerHTML
      target.innerText 는 순수 text 문자열만 getter 하는 속성
      target.innerHTML 은 CSS 등이 적용된 HTML 문자열을 getter 하는 속성
      
      여기에 innerText 와 거의 유사하지만, 최신 JS 에서 적용된 
      textContent 속성이 있다 
       */
      const menu_text = target.textContent;
      let url = "/";
      //if (menu_text === "Home") {
      //document.location.href = "/";
      if (menu_text === "도서정보") {
        url = "/books";
        //document.location.href = "/books";
      } else if (menu_text === "로그인") {
        url = "/user/login";
        //document.location.href = "/user/login";
      } else if (menu_text === "회원가입") {
        url = "/user/join";
        //document.location.href = "/user.join";
      }
      document.location.href = url;
    }
  });
});
