const container = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");

let isDown = false;
let startX;
let scrollLeft;

// Clone first & last slides
const slides = [...track.children];
const clonesBefore = slides.slice(-2).map((slide) => slide.cloneNode(true));
const clonesAfter = slides.slice(0, 2).map((slide) => slide.cloneNode(true));

clonesBefore.forEach((clone) => track.insertBefore(clone, track.firstChild));
clonesAfter.forEach((clone) => track.appendChild(clone));

const updatedSlides = [...track.children];

// Drag/swipe logic
container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});
container.addEventListener("mouseleave", () => (isDown = false));
container.addEventListener("mouseup", () => (isDown = false));
container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll-fast
  container.scrollLeft = scrollLeft - walk;
});

container.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = container.scrollLeft;
  },
  { passive: true }
);

container.addEventListener(
  "touchmove",
  (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  },
  { passive: true }
);

// Auto loop
container.addEventListener("scroll", () => {
  const maxScrollLeft = track.scrollWidth - container.clientWidth;
  if (container.scrollLeft < 5) {
    container.scrollLeft = maxScrollLeft / 2;
  } else if (
    container.scrollLeft + container.clientWidth >=
    maxScrollLeft - 5
  ) {
    container.scrollLeft = maxScrollLeft / 2 - container.clientWidth;
  }

  requestAnimationFrame(updateActiveSlide);
});

// Set center active
function updateActiveSlide() {
  const center = container.scrollLeft + container.clientWidth / 2;
  let closest = null;
  let minDist = Infinity;

  updatedSlides.forEach((slide) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const dist = Math.abs(center - slideCenter);
    if (dist < minDist) {
      minDist = dist;
      closest = slide;
    }
  });

  updatedSlides.forEach((slide) => slide.classList.remove("active"));
  if (closest) closest.classList.add("active");
}

// Initial scroll to center
setTimeout(() => {
  container.scrollLeft = track.scrollWidth / 2 - container.clientWidth / 2;
  updateActiveSlide();
}, 50);
