document.addEventListener("DOMContentLoaded", () => {
  const ST_INDEX = {
    ST_NUM: 0,
    ST_NAME: 1,
    ST_DEPT: 2,
  };
  // 동기식으로 쓰겟음(순서대로)
  const st_num_check = async (st_num) => {
    // server 한테 req server가 res 해줌 그리고 버튼에게 res 해줌 비동기 방식으로 요청하기
    // 서버에 GET: /student/학번/check URL 로 요청하기
    // 서버에서 response 한 정보를 response 변수에 받기(저장)
    const response = await fetch(`/student/${st_num}/check`); // 서버한테 요청하고 응답할때까지 기다림 await

    // response 정보에서 json type의 값(데이터) 만 추출하여 json 에 저장
    // {result :"", message:"" }
    // 또는 {result:"있다", STD:"학번"}
    // 또는 {result:"없다", STD:null} json 에는 이 3가지 중 하나ㄱ 있다
    const json = await response.json();
    console.log(json);
    // json 데이터 중에서 result 변수만 추출하여 return
    // ERROR, 있다, 없다 문장열 중에 한가지를 return
    return json.result; //서버가 보내준 result 있다, 없다임, 위의 변수 아님
  };

  // 셀렉트 하는 방법 3가지
  //   const st_num = document.querySelector("input[name='st_num'"); 아래 코드와 같다
  const st_num = document.querySelector("#st_num");
  const st_name = document.querySelector("#st_name");
  const st_dept = document.querySelector("#st_dept");
  const btn_submit = document.querySelector("form.student button");
  const form = document.querySelector("form.student");

  //   2. const st_num = form.querySelector("#st_num");
  //   const st_name = form.querySelector("#st_name");
  //   const st_dept = form.querySelector("#st_dept");
  //   3. const btn_submit = form.querySelector("button");
  //   const inputs = form.querySelectorAll("input");
  //   const st_num = inputs[ST_INDEX.ST_NUM];
  //   const st_name = inputs[ST_INDEX.ST_NAME];
  //   const st_dept = inputs[ST_INDEX.ST_DEPT];

  // 여러개의 tag 묶음을 배열로 만들기
  const error_divs = document.querySelectorAll("div.student.error");

  const st_num_valid = async (target) => {
    // result 에는 ERROR, 있다, 없다 중의 한가지 문자열이 저장된다
    const result = await st_num_check(target.value);
    let message = "";
    let color = "red";
    if (result === "ERROR") {
      message = "* DB 오류";
    } else if (result === "있다") {
      message = "* 이미 등록된 학번입니다";
    } else {
      message = "* 사용가능한 학번입니다";
      color = "blue";
    }

    error_divs[ST_INDEX.ST_NUM].innerHTML = message;
    error_divs[ST_INDEX.ST_NUM].style.color = color;

    // if (color === "red") {
    //   st_num.select();
    //   return false;
    // }
    // return true;
    // color 값이 "red" 이면 true, 아니면 false return 한다
    return color === "red";
  };

  /**
   * 먼저 btn_submit(button) 의 click event 를 최소한으로 테스트하고
   * 이후에 btn_submit null point exception 을 일으키는 현상을 방지하기 위해
   * btn_submit?; 형식으로 이후 코드를 사용
   */
  // ? 로 null point exception 방지
  btn_submit?.addEventListener("click", async () => {
    // 표시되었던 error 메시지를 모두 clear 하기
    error_divs.forEach((item) => (item.innerHTML = ""));

    // alert("전송");
    // input box에 입력한 값이 비어있으면
    if (!st_num.value) {
      error_divs[ST_INDEX.ST_NUM].innerHTML = "* 학번은 반드시 입력하세요";
      st_num.select();
      return false;
    } else {
      const bRedYes = st_num_valid(st_num);
      if (bRedYes) {
        st_num.select();
        return false;
      }
    }
    if (!st_name.value) {
      error_divs[ST_INDEX.ST_NAME].innerHTML = "* 학생의 이름은 반드시 입력해야 합니다";
      st_name.select();
      return false;
    }
    if (!st_dept.value) {
      error_divs[ST_INDEX.ST_DEPT].innerHTML = "* 학과는 반드시 입력하세요";
      st_dept.select();
      return false;
    }
    // 유효성 검사를 마치면 서버로 데이터 보내기
    form.submit();
  });

  // 학번을 입력받는 input box 에 event 걸기
  // input의 focus 를 잃어버린 상태에서 blur 사용
  /**
   * blur event
   * 보통은 input box 에서 사용하는 event
   * input box 에 focus() 가 있다가 다른 곳으로 focus() 이동하는 순간
   * 발생하는 event
   */
  let EVENT_ST_NUM = false;
  st_num?.addEventListener("blur", async (event) => {
    const target = event.target; // 본인임
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ST_NUM].innerText = "* 학번을 입력해 주세요";
      // alert("학번은 반드시 입력하세요");
      target.select();
      return false;
    } else {
      const bRedYes = await st_num_valid(target);
      console.log(bRedYes);
      if (bRedYes) {
        target.select();
        return false;
      }
    }
    // ST_NUM 에서 유효성 검사가 모두 끝났다 라는 flag 변수
    EVENT_ST_NUM = true;
  });
  st_name?.addEventListener("blur", (event) => {
    // ST_NUM 에서 유효성 검사가 끝나지 않았으면 (false) 더 진행하지 말라
    if (!EVENT_ST_NUM) return false;
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ST_NAME].innerText = "* 이름을 입력해 주세요";
      target.select();
      return false;
    } else {
      error_divs[ST_INDEX.ST_NAME].innerText = "";
    }
  });
  st_dept?.addEventListener("blur", (event) => {
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ST_DEPT].innerText = "* 학과를 입력해 주세요";
      target.select();
      return false;
    } else {
      error_divs[ST_INDEX.ST_DEPT].innerText = "";
    }
  });
  // 처음 들어왔을때 자동으로 학번에 focus 주기
  st_num.focus();
});
