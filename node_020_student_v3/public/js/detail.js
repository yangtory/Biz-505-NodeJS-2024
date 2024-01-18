document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("button.btn_list");
  const btn_update = document.querySelector("button.btn_update");
  const btn_delete = document.querySelector("button.btn_delete");

  btn_list?.addEventListener("click", () => {
    document.location.href = "/student"; //학생정보 화면
  });

  btn_delete.addEventListener("click", (e) => {
    // alert 창으로 문구를 보여주고 확인을 누르면 true 가 된다
    if (confirm("삭제된 데이터는 복구 할수 없습니다\n정말 삭제할까요?")) {
      const target = e.target; // 본인임
      /**
       * html tag 에 data-변수명="값" 형식으로 지정한 속성은
       * html 에서 JS 로 변수를 전달하는 방법중의 하나이다
       * 이 값을 JS 에서 추출할때는 저장변수 = tag.dataset.변수
       * target.dataset.num : 현재 클릭된 tag 에 data-num 로 설정된 값을 가져와라
       */
      const st_num = target.dataset.num;
      //   alert(st_num);
      // 현재 화면을 뒤로가기 하지 말고 덮어써라, 전에 보던 화면을 사라지게 한다.
      document.location.replace(`/student/${st_num}/delete`); // 서버한테 요청하는중
    }
  });

  btn_update.addEventListener("click", (e) => {
    const st_num = e.target.dataset.num;
    if (st_num) {
      //st_num 가 있으면
      document.location.replace(`/student/${st_num}/update`);
    } else {
      alert("학번 정보가 잘못되었습니다");
    }
  });
});
