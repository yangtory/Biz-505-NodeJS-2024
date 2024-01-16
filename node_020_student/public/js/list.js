document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");
  table.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "TD") {
      const parentsTR = target.closest("TR"); //타겟에 가장 가까이 잇는 부모tr 찾아
      const tds = parentsTR.querySelectorAll("TD"); // 부모 tr에 있는 모든 td 찾아
      const st_num = tds[0].innerText; // 그 모든 td 중 0번째에 있는 거 : st_num
      // href = "/student/" + st_num + "/detail" 아래 코드와 같다
      document.location.href = `/student/${st_num}/detail`; // 문자열에 변수끼워넣기
    }
  });
});
