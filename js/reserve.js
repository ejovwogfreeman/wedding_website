const inputContainers = document.querySelectorAll(".input-container");

inputContainers.forEach((container) => {
  const input = container.querySelector("input");
  const label = container.querySelector("label");

  container.addEventListener("click", () => {
    input.focus();
  });

  input.addEventListener("focus", () => {
    container.classList.add("focused");
    label.style.background = "white";
    label.style.marginTop = "-7px";
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      container.classList.remove("focused");
      label.style.marginTop = "";
    }
  });
});
