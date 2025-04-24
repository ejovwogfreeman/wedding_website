setTimeout(() => {
  const splashContainer = document.querySelector(".splash-container");
  const mainContainer = document.querySelector(".main-container");

  splashContainer.classList.add("slide-up");

  setTimeout(() => {
    mainContainer.classList.add("slide-in");
    splashContainer.style.display = "none";
  }, 1000);
}, 1000);

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
  const slideWidth = slides[0].offsetWidth + 25;
  const offset = slideWidth * current - containerWidth / 2 + slideWidth / 2;

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
