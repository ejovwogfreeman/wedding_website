setTimeout(() => {
  const splashContainer = document.querySelector(".splash-container");
  const mainContainer = document.querySelector(".main-container");

  splashContainer.classList.add("slide-up");

  setTimeout(() => {
    mainContainer.classList.add("slide-in");
    splashContainer.style.display = "none";
  }, 1000);
}, 8000);

const track = document.getElementById("sliderTrack");
let slides = Array.from(track.children);
const containerWidth = 350;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

// Insert clones
track.insertBefore(lastClone, slides[0]);
track.appendChild(firstClone);

// Refresh slides array
slides = Array.from(track.children);

let current = 3; // Adjust for the clone
let autoSlideInterval;

function updateSlider(transition = true) {
  const slideWidth = slides[0].offsetWidth + 26;
  console.log(slideWidth);
  const offset = slideWidth * current - containerWidth / 2 + slideWidth / 2;
  console.log(offset);

  if (!transition) {
    track.style.transition = "none";
  } else {
    track.style.transition = "transform 0.5s ease";
  }

  track.style.transform = `translateX(${-offset}px)`;

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === current);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToSlide(current + 1);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function goToSlide(index) {
  current = index;
  updateSlider();

  // Handle wrapping
  if (current === slides.length - 1) {
    setTimeout(() => {
      current = 1;
      updateSlider(false);
    }, 510);
  }

  if (current === 0) {
    setTimeout(() => {
      current = slides.length - 2;
      updateSlider(false);
    }, 510);
  }
}

let startX = 0;
let isDragging = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoSlide();
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const moveX = e.touches[0].clientX;
  const diff = startX - moveX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide(current + 1);
    else goToSlide(current - 1);
    isDragging = false;
    setTimeout(startAutoSlide, 1500);
  }
});

window.addEventListener("resize", () => updateSlider(false));

// Initial setup
updateSlider(false);
startAutoSlide();

const track2 = document.getElementById("sliderTrack2");
let slides2 = Array.from(track2.children);
const containerWidth2 = 350;

// Clone first and last slides
const firstClone2 = slides2[0].cloneNode(true);
const lastClone2 = slides2[slides2.length - 1].cloneNode(true);
firstClone2.classList.add("clone");
lastClone2.classList.add("clone");

// Insert clones
track2.insertBefore(lastClone2, slides2[0]);
track2.appendChild(firstClone2);

// Refresh slides array
slides2 = Array.from(track2.children);
let current2 = 3;

// Adjust for the clone
let autoSlideInterval2;

function updateSlider2(transition = true) {
  const slideWidth2 = slides2[0].offsetWidth + 26;
  console.log(slideWidth2);
  const offset2 =
    slideWidth2 * current2 - containerWidth2 / 2 + slideWidth2 / 2;
  console.log(offset2);

  if (!transition) {
    track2.style.transition = "none";
  } else {
    track2.style.transition = "transform 0.5s ease";
  }
  track2.style.transform = `translateX(${-offset2}px)`;
  slides2.forEach((slide, index) => {
    slide.classList.toggle("active", index === current2);
  });
}

function startAutoSlide2() {
  autoSlideInterval2 = setInterval(() => {
    goToSlide2(current2 + 1);
  }, 5000);
}

function stopAutoSlide2() {
  clearInterval(autoSlideInterval2);
}

function goToSlide2(index) {
  current2 = index;
  updateSlider2();

  // Handle wrapping
  if (current2 === slides2.length - 1) {
    setTimeout(() => {
      current2 = 1;
      updateSlider2(false);
    }, 510);
  }
  if (current2 === 0) {
    setTimeout(() => {
      current2 = slides2.length - 2;
      updateSlider2(false);
    }, 510);
  }
}

let startX2 = 0;
let isDragging2 = false;

track2.addEventListener("touchstart", (e) => {
  startX2 = e.touches[0].clientX;
  isDragging2 = true;
  stopAutoSlide2();
});

track2.addEventListener("touchmove", (e) => {
  if (!isDragging2) return;
  const moveX2 = e.touches[0].clientX;
  const diff2 = startX2 - moveX2;

  if (Math.abs(diff2) > 50) {
    if (diff2 > 0) goToSlide2(current2 + 1);
    else goToSlide2(current2 - 1);
    isDragging2 = false;
    setTimeout(startAutoSlide2, 1500);
  }
});

window.addEventListener("resize", () => updateSlider2(false));

// Initial setup
updateSlider2(false);
startAutoSlide2();

// Select all copy icons
document.querySelectorAll(".copy-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    // Get the sibling <p> tag text inside the same section
    const text = icon.parentElement.querySelector("p").textContent;

    // Copy the text to clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`Copied: "${text}"`);
      })
      .catch((err) => {
        console.error("Copy failed", err);
      });
  });
});

document.querySelectorAll(".copy").forEach((icon) => {
  icon.addEventListener("click", () => {
    // Navigate up to the parent '.contact-number' and find the <span>
    const contactBox = icon.closest(".contact-number");
    const spanText = contactBox.querySelector(".left span").textContent.trim();

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
