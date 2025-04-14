setTimeout(() => {
  const splashContainer = document.querySelector(".splash-container");
  const mainContainer = document.querySelector(".main-container");

  splashContainer.classList.add("slide-up");

  setTimeout(() => {
    mainContainer.classList.add("slide-in");
    splashContainer.style.display = "none";
  }, 1000);
}, 8000);
