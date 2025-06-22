// Get references to the slides container and loading fill elements
const slidesContainer = document.querySelector(".image-slider .slides-container");
const loadingFill = document.querySelector(".loading-fill");
// Get the total number of slides
const totalSlides = slidesContainer.children.length;
// Initialize the current slide index
let currentIndex = 0;
// Set the interval time for slide transition
const intervalTime = 6000;

// Function to show the next slide
function showNextSlide() {
  // Update the current slide index
  currentIndex = (currentIndex + 1) % totalSlides;
  // Move the slides container to show the next slide
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;

  // Reset and animate the loading fill
  loadingFill.style.transition = "none";
  loadingFill.style.width = "0%";
  void loadingFill.offsetWidth;
  loadingFill.style.transition = `width ${intervalTime}ms linear`;
  loadingFill.style.width = "100%";
}

// Initialize the loading fill width
loadingFill.style.width = "0%";
// Start the loading fill animation after a short delay
setTimeout(() => {
  loadingFill.style.transition = `width ${intervalTime}ms linear`;
  loadingFill.style.width = "100%";
}, 100);

// Set an interval to automatically show the next slide
setInterval(showNextSlide, intervalTime);

// Get references to the promotional slides
const promoSlides = document.querySelectorAll(".cc-slide");
// Initialize the current promotional slide index
let promoIndex = 0;

// Function to rotate promotional slides
function rotatePromoSlides() {
  // Remove the active class from all slides
  promoSlides.forEach(slide => slide.classList.remove("activePromo"));
  // Update the current promotional slide index
  promoIndex = (promoIndex + 1) % promoSlides.length;
  // Add the active class to the current slide
  promoSlides[promoIndex].classList.add("activePromo");
}

// Set an interval to automatically rotate promotional slides
setInterval(rotatePromoSlides, 4000);


  // Get reference to the main header element
  const header = document.getElementById("mainHeader");

  // Add event listener to change header style on scroll
  window.addEventListener("scroll", () => {
    // Add or remove the 'scrolled' class based on scroll position
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

