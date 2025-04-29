document.addEventListener("DOMContentLoaded", function () {
  const avatarPreview = document.getElementById("avatarPreview");
  const previewBtn = document.getElementById("previewBtn");

  // Load image from localStorage
  const storedImage = localStorage.getItem("attendanceImage");
  if (storedImage) {
    avatarPreview.src = storedImage;
    previewBtn.classList.remove("disabled");
    previewBtn.classList.add("enabled");
  }

  // Download functionality
  previewBtn.addEventListener("click", function () {
    if (previewBtn.classList.contains("disabled")) return;

    const cardElement = document.querySelector(".card-wrapper");

    html2canvas(cardElement).then(function (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "attendance_card.png";
      link.click();
    });
  });
});
