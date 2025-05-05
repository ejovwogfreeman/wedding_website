// // const container = document.querySelector(".slider-container");
// // const track = document.querySelector(".slider-track");
// // const reserveContainer = document.querySelector(".reserve-container");

// // let isDown = false;
// // let startX;
// // let scrollLeft;
// // let slideWidth;
// // let originalSlides = [];

// // // 1. Clone slides for infinite scrolling in both directions
// // function cloneSlides() {
// //   originalSlides = [...track.children];
// //   const beforeClones = originalSlides
// //     .slice(-2)
// //     .map((slide) => slide.cloneNode(true));
// //   const afterClones = originalSlides
// //     .slice(0, 2)
// //     .map((slide) => slide.cloneNode(true));

// //   beforeClones.forEach((clone) => track.insertBefore(clone, track.firstChild));
// //   afterClones.forEach((clone) => track.appendChild(clone));
// // }

// // // 2. Drag / Touch events for swipe
// // function enableDragging() {
// //   container.addEventListener("mousedown", (e) => {
// //     isDown = true;
// //     startX = e.pageX;
// //     scrollLeft = container.scrollLeft;
// //   });

// //   container.addEventListener("mouseup", () => (isDown = false));
// //   container.addEventListener("mouseleave", () => (isDown = false));

// //   container.addEventListener("mousemove", (e) => {
// //     if (!isDown) return;
// //     e.preventDefault();
// //     const x = e.pageX;
// //     const walk = (x - startX) * 1.5;
// //     container.scrollLeft = scrollLeft - walk;
// //   });

// //   container.addEventListener(
// //     "touchstart",
// //     (e) => {
// //       startX = e.touches[0].pageX;
// //       scrollLeft = container.scrollLeft;
// //     },
// //     { passive: true }
// //   );

// //   container.addEventListener(
// //     "touchmove",
// //     (e) => {
// //       const x = e.touches[0].pageX;
// //       const walk = (x - startX) * 1.5;
// //       container.scrollLeft = scrollLeft - walk;
// //     },
// //     { passive: true }
// //   );
// // }

// // // 3. Infinite scroll logic (both directions)
// // function handleInfiniteScroll() {
// //   const totalSlides = track.children.length;
// //   const fullSlideWidth = slideWidth * originalSlides.length;
// //   const scrollPos = container.scrollLeft;

// //   // If scrolled too far left, jump to the real end
// //   if (scrollPos <= slideWidth) {
// //     container.scrollLeft = scrollPos + fullSlideWidth;
// //   }

// //   // If scrolled too far right, jump to the real start
// //   const maxScroll = slideWidth * (totalSlides - 2);
// //   if (scrollPos >= maxScroll) {
// //     container.scrollLeft = scrollPos - fullSlideWidth;
// //   }

// //   updateActiveSlide();
// // }

// // // 4. Update active slide & background image
// // function updateActiveSlide() {
// //   const center = container.scrollLeft + container.clientWidth / 2;
// //   let closest = null;
// //   let minDist = Infinity;

// //   [...track.children].forEach((slide) => {
// //     const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
// //     const dist = Math.abs(center - slideCenter);
// //     if (dist < minDist) {
// //       minDist = dist;
// //       closest = slide;
// //     }
// //   });

// //   [...track.children].forEach((slide) => slide.classList.remove("active"));
// //   if (closest) {
// //     closest.classList.add("active");
// //     const img = closest.querySelector("img");
// //     if (img) {
// //       reserveContainer.style.backgroundImage = `url('${img.src}')`;
// //     }
// //   }
// // }

// // // 5. Initialize carousel with cloned slides
// // function initCarousel() {
// //   cloneSlides();
// //   enableDragging();

// //   setTimeout(() => {
// //     slideWidth = track.children[0].offsetWidth;
// //     container.scrollLeft = slideWidth * 2; // Skip 2 clones (initial reset)
// //     updateActiveSlide();
// //   }, 5000);

// //   // Add scroll listener to handle infinite scroll
// //   container.addEventListener("scroll", () => {
// //     window.requestAnimationFrame(handleInfiniteScroll);
// //   });
// // }

// // initCarousel();

// const container = document.querySelector(".slider-container");
// const track = document.querySelector(".slider-track");
// const reserveContainer = document.querySelector(".reserve-container");

// let isDown = false;
// let startX;
// let scrollLeft;
// let slideWidth;

// // Clone slides for infinite scrolling (left and right)
// const slides = [...track.children];
// const clonesBefore = slides.slice(-2).map((slide) => slide.cloneNode(true));
// const clonesAfter = slides.slice(0, 2).map((slide) => slide.cloneNode(true));

// // Insert clones at the beginning and end of the track for infinite scroll
// clonesBefore.forEach((clone) => track.insertBefore(clone, track.firstChild));
// clonesAfter.forEach((clone) => track.appendChild(clone));

// const updatedSlides = [...track.children];

// // Set the initial slide width and correct the scroll position
// setTimeout(() => {
//   slideWidth = track.children[0].offsetWidth;
//   container.scrollLeft = slideWidth * 2; // Skip the initial clones (2 before)
//   updateActiveSlide(); // Update active slide
// }, 1000);

// // Mouse down event for drag/swipe
// container.addEventListener("mousedown", (e) => {
//   isDown = true;
//   startX = e.pageX - container.offsetLeft;
//   scrollLeft = container.scrollLeft;
// });

// // Mouse leave and mouse up events to stop drag/swipe
// container.addEventListener("mouseleave", () => (isDown = false));
// container.addEventListener("mouseup", () => (isDown = false));

// // Mouse move event for dragging/swiping
// container.addEventListener("mousemove", (e) => {
//   if (!isDown) return;
//   e.preventDefault();
//   const x = e.pageX - container.offsetLeft;
//   const walk = (x - startX) * 1.5; // scroll fast
//   container.scrollLeft = scrollLeft - walk;
// });

// // Touch events for swipe support
// container.addEventListener(
//   "touchstart",
//   (e) => {
//     startX = e.touches[0].pageX;
//     scrollLeft = container.scrollLeft;
//   },
//   { passive: true }
// );

// container.addEventListener(
//   "touchmove",
//   (e) => {
//     const x = e.touches[0].pageX;
//     const walk = (x - startX) * 1.5;
//     container.scrollLeft = scrollLeft - walk;
//   },
//   { passive: true }
// );

// // Infinite scroll adjustments to prevent the scroll from breaking
// container.addEventListener("scroll", () => {
//   const maxScrollLeft = track.scrollWidth - container.clientWidth;

//   // Prevent reset when reaching the end
//   if (container.scrollLeft < 5) {
//     container.scrollLeft = maxScrollLeft / 2;
//   } else if (
//     container.scrollLeft + container.clientWidth >=
//     maxScrollLeft - 5
//   ) {
//     container.scrollLeft = maxScrollLeft / 2 - container.clientWidth;
//   }

//   requestAnimationFrame(updateActiveSlide); // Keep updating the active slide
// });

// // Update active slide and background
// function updateActiveSlide() {
//   const center = container.scrollLeft + container.clientWidth / 2;
//   let closest = null;
//   let minDist = Infinity;

//   updatedSlides.forEach((slide) => {
//     const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
//     const dist = Math.abs(center - slideCenter);
//     if (dist < minDist) {
//       minDist = dist;
//       closest = slide;
//     }
//   });

//   updatedSlides.forEach((slide) => slide.classList.remove("active"));
//   if (closest) {
//     closest.classList.add("active");

//     const img = closest.querySelector("img");
//     if (img) {
//       reserveContainer.style.backgroundImage = `url('${img.src}')`;
//     }
//   }
// }

const container = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");
const reserveContainer = document.querySelector(".reserve-container");

let isDown = false;
let startX;
let scrollLeft;
let slideWidth;

// Clone slides for infinite scrolling (left and right)
const slides = [...track.children];
const clonesBefore = slides.slice(-2).map((slide) => slide.cloneNode(true));
const clonesAfter = slides.slice(0, 2).map((slide) => slide.cloneNode(true));

// Insert clones at the beginning and end of the track for infinite scroll
clonesBefore.forEach((clone) => track.insertBefore(clone, track.firstChild));
clonesAfter.forEach((clone) => track.appendChild(clone));

const updatedSlides = [...track.children];

// Set the initial slide width and correct the scroll position
setTimeout(() => {
  slideWidth = track.children[0].offsetWidth;
  container.scrollLeft = slideWidth * 2; // Skip the initial clones (2 before)
  updateActiveSlide(); // Update active slide
}, 1000);

// Mouse down event for drag/swipe
container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

// Mouse leave and mouse up events to stop drag/swipe
container.addEventListener("mouseleave", () => (isDown = false));
container.addEventListener("mouseup", () => (isDown = false));

// Mouse move event for dragging/swiping
container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll fast
  container.scrollLeft = scrollLeft - walk;
});

// Touch events for swipe support
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

// Infinite scroll adjustments to prevent the scroll from breaking
container.addEventListener("scroll", () => {
  const maxScrollLeft = track.scrollWidth - container.clientWidth;

  // If the scroll is near the end, jump to the beginning
  if (container.scrollLeft <= 0) {
    container.scrollLeft = maxScrollLeft / 2; // Scroll back to the center
  } else if (container.scrollLeft >= maxScrollLeft) {
    container.scrollLeft = maxScrollLeft / 2 - container.clientWidth; // Scroll back to the center
  }

  requestAnimationFrame(updateActiveSlide); // Keep updating the active slide
});

// Update active slide and background
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
  if (closest) {
    closest.classList.add("active");

    const img = closest.querySelector("img");
    if (img) {
      reserveContainer.style.backgroundImage = `url('${img.src}')`;
    }
  }
}
