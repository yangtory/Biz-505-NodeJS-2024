document.addEventListener("DOMContentLoaded", () => {
  const div_img = document.querySelector("div.image");
  const input_file = document.querySelector("input.file");

  div_img.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "IMG") {
      input_file.click();
    }
  });

  const imgPreView = (e) => {
    const img = document.querySelector("img.add");
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileURL = e.target.result;
      img.src = fileURL;
    };
    fileReader.readAsDataURL(file);
  };

  input_file?.addEventListener("change", imgPreView);
});
