document.addEventListener("DOMContentLoaded", () => {
  const btn_update = document.querySelector("button.update");
  const btn_delete = document.querySelector("button.delete");
  const p_code = document.querySelector("#p_code");

  btn_update.addEventListener("click", () => {
    const target = p_code.value;
    document.location.replace(`/products/${target}/update`);
  });

  btn_delete.addEventListener("click", () => {
    const target = p_code.value;
    alert("정말 삭제할까요?");
    document.location.replace(`/products/${target}/delete`);
  });
});
