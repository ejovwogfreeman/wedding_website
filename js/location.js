document.querySelectorAll(".copy").forEach((icon) => {
  icon.addEventListener("click", () => {
    // Navigate up to the parent '.contact-number' and find the <span>
    const contactBox = icon.closest(".contact-number");
    const spanText = contactBox
      .querySelector(".left .number")
      .textContent.trim();

    // Copy the text to clipboard
    navigator.clipboard
      .writeText(spanText)
      .then(() => {
        alert(`Copied: ${spanText}`);
      })
      .catch((err) => {
        console.error("Copy failed", err);
      });
  });
});
