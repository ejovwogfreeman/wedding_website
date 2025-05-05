const container = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");
const reserveContainer = document.querySelector(".reserve-container");

let isDown = false;
let startX;
let scrollLeft;
let slideWidth;
let originalSlides = [];

// 1. Clone slides for infinite scrolling in both directions
function cloneSlides() {
  originalSlides = [...track.children];
  const beforeClones = originalSlides
    .slice(-2)
    .map((slide) => slide.cloneNode(true)); // Cloning last 2 slides for the start
  const afterClones = originalSlides
    .slice(0, 2)
    .map((slide) => slide.cloneNode(true)); // Cloning first 2 slides for the end

  beforeClones.forEach((clone) => track.insertBefore(clone, track.firstChild)); // Add cloned slides to the start
  afterClones.forEach((clone) => track.appendChild(clone)); // Add cloned slides to the end
}

// 2. Drag / Touch events for swipe
function enableDragging() {
  container.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseup", () => (isDown = false));
  container.addEventListener("mouseleave", () => (isDown = false));

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
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
}

// 3. Infinite scroll logic (both directions)
function handleInfiniteScroll() {
  const totalSlides = track.children.length;
  const fullSlideWidth = slideWidth * originalSlides.length;
  const scrollPos = container.scrollLeft;

  // If scrolled too far left (less than one slide width), jump to the last original slide
  if (scrollPos <= slideWidth) {
    container.scrollLeft = scrollPos + fullSlideWidth; // Scroll to the rightmost position (last original slides)
  }

  // If scrolled too far right, jump to the real start (first original slides)
  const maxScroll = slideWidth * (totalSlides - 2); // Avoiding the last clone
  if (scrollPos >= maxScroll) {
    container.scrollLeft = scrollPos - fullSlideWidth; // Scroll to the first clone
  }

  updateActiveSlide();
}

// 4. Update active slide & background image
function updateActiveSlide() {
  const center = container.scrollLeft + container.clientWidth / 2;
  let closest = null;
  let minDist = Infinity;

  // Loop through all slides (including clones)
  [...track.children].forEach((slide) => {
    // Skip clones, as we only want to consider original slides for the active class
    if (originalSlides.includes(slide)) {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = slide;
      }
    }
  });

  // Remove the active class from all slides
  [...track.children].forEach((slide) => slide.classList.remove("active"));

  if (closest) {
    // Mark the closest original slide as active
    closest.classList.add("active");

    // Update background image if the active slide contains an image
    const img = closest.querySelector("img");
    if (img) {
      reserveContainer.style.backgroundImage = `url('${img.src}')`;
    }
  }
}

// 5. Initialize carousel with cloned slides
function initCarousel() {
  cloneSlides();
  enableDragging();

  setTimeout(() => {
    slideWidth = track.children[0].offsetWidth;
    container.scrollLeft = slideWidth * 2; // Skip 2 clones (initial reset)
    updateActiveSlide();
  }, 5000);

  // Add scroll listener to handle infinite scroll
  container.addEventListener("scroll", () => {
    window.requestAnimationFrame(handleInfiniteScroll);
  });
}

initCarousel();
