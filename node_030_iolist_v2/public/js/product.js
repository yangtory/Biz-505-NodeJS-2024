document.addEventListener("DOMContentLoaded", () => {
  const pro_table = document.querySelector("table.products");
  const btn_search = document.querySelector("button.search");
  const btn_update = document.querySelector("button.update");
  const btn_insert = document.querySelector("button.insert");
  const btn_list = document.querySelector("button.list");

  pro_table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;
      document.location.replace(`/products/${p_code}/detail`);
    }
  });

  btn_update.addEventListener("click", () => {
    document.location.replace("/products/insert");
  });

  btn_insert.addEventListener("click", () => {
    document.location.replace("/products/insert");
  });

  btn_list.addEventListener("click", () => {
    document.location.replace("products/");
  });
});
