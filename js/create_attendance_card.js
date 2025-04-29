document.addEventListener("DOMContentLoaded", function () {
  const imageSelector = document.getElementById("imageSelector");
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");
  const previewBtn = document.getElementById("previewBtn");
  const changePhoto = document.getElementById("changePhoto");

  imageSelector.addEventListener("click", function () {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;

        // Set the preview image
        avatarPreview.src = imageDataUrl;

        // Save image to localStorage
        localStorage.setItem("attendanceImage", imageDataUrl);

        // Enable the Preview button
        previewBtn.classList.remove("disabled");
        previewBtn.classList.add("enabled");
        changePhoto.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // On page load, check if image is already saved
  const savedImage = localStorage.getItem("attendanceImage");
  if (savedImage) {
    avatarPreview.src = savedImage;
    previewBtn.classList.remove("disabled");
    previewBtn.classList.add("enabled");
    changePhoto.style.display = "block";
  }
});
