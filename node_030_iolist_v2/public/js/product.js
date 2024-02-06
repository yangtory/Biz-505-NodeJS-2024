document.addEventListener("DOMContentLoaded", () => {
  /**
   * table.products 선택자는 상품 리스트 화면에서는 유효한 선택자이다.
   * 하지만 detail, insert 등의 화면에서는 해당 선택자는 없는 상태이다.
   * detail, insert 화면 등 에서는 pro_table 객체가 null 인 상태가 된다는 것이다.
   * pro_table 객체가 null 인 상태일때 .add() 등의 method 를 실행하면
   * null pointer exception 이 발생하고 HTML JS 에서는 이후의 JS 코드가 모두
   * 무력화 된다.(실행이 안된다)
   *
   * 그래서 pro_table 객체가 null 일때는 다른 동작을 건너뛰도록 해주어야 한다.
   * 이때 사용하는 기호가 "객체?" 이다. 이러한 코드를 null safe 코드라고 한다.
   */
  const pro_table = document.querySelector("table.products");

  pro_table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;
      document.location.replace(`/products/${p_code}/detail`);
    }
  });
});

// 여러개있어도 됨
document.addEventListener("DOMContentLoaded", () => {
  const btn_insert = document.querySelector("#btn_insert");
  btn_insert?.addEventListener("click", () => {
    //null point exception handler
    document.location.replace("/products/insert");
  });
});

const imagePreView = (event) => {
  const img_add = document.querySelector("img.img_add");
  // input(type=file) 은 여러개의 파일을 선택(담기)할수 있다.
  // 현재는 한개의 파일만 선택하므로
  // 0번째 파일만 추출하여 사용한다.
  const file = event.target.files[0];

  // 파일을 읽어들이는 친구
  const fileReader = new FileReader();
  // 파일을 읽었으면 할일 미리 지정하기(event handler)
  fileReader.onload = (e) => {
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };
  // storage 에서 파일을 읽어라 라는 지시
  // 지시를 받고 비동기적으로 파일을 읽기 시작
  // 파일이 모두 읽혀지면 onload 이벤트를 발생시킨다
  fileReader.readAsDataURL(file); // 파일을읽어서 url로 변경해조, 이게완료돼야 onload 가 실행된다
};
document.addEventListener("DOMContentLoaded", () => {
  const img_add = document.querySelector("img.img_add");
  const input_img = document.querySelector("#p_image");
  const div_img = document.querySelector("div.img_box");
  const input_focus = document.querySelector("#img_focus");

  img_add?.addEventListener("click", () => {
    input_img.click();
  });
  // 파일을 여러개 받을수 있음
  input_img?.addEventListener("change", imagePreView);

  // div 박스클릭하면 감춘 input에 포커스주기
  div_img.addEventListener("click", () => {
    input_focus.focus();
  });

  // 화면 캡쳐 업로드하기
  div_img.addEventListener("paste", async (e) => {
    const items = e.clipboardData.items; // 클립보드에 있는 애들을 담고
    const item = items[0]; // 첫번째 친구 가져옴
    const img_add = document.querySelector("img.img_add");
    const input_image = document.querySelector("#p_image");

    if (item.type.indexOf("image") === 0) {
      // 그게 이미지인지 물어보고
      const blob = item.getAsFile(); // 파일로 변환한다
      if (!blob) return false;

      const fileReader = new FileReader(); // 파일리더에 읽어서
      fileReader.onload = (event) => {
        const fileURL = event.target.result;
        img_add.src = fileURL; // 올리기, 근데 여기까지 하면 저장은안됨
      };
      fileReader.readAsDataURL(blob);
      // 복사 붙이기 한 파일을 input(type-file) tag 에 포함하기
      const dataTransfer = new DataTransfer(); // 데이터 변환
      dataTransfer.items.add(blob);
      input_image.files = dataTransfer.files; //input tag에 붙히기
    }
  });
});
