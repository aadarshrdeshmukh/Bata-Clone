const slidesContainer = document.querySelector(".image-slider .slides-container");
const loadingFill = document.querySelector(".loading-fill");
const totalSlides = slidesContainer.children.length;
let currentIndex = 0;
const intervalTime = 6000;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;

  loadingFill.style.transition = "none";
  loadingFill.style.width = "0%";
  void loadingFill.offsetWidth;
  loadingFill.style.transition = `width ${intervalTime}ms linear`;
  loadingFill.style.width = "100%";
}

loadingFill.style.width = "0%";
setTimeout(() => {
  loadingFill.style.transition = `width ${intervalTime}ms linear`;
  loadingFill.style.width = "100%";
}, 100);

setInterval(showNextSlide, intervalTime);

const promoSlides = document.querySelectorAll(".cc-slide");
let promoIndex = 0;

function rotatePromoSlides() {
  promoSlides.forEach(slide => slide.classList.remove("activePromo"));
  promoIndex = (promoIndex + 1) % promoSlides.length;
  promoSlides[promoIndex].classList.add("activePromo");
}

setInterval(rotatePromoSlides, 4000);


  const header = document.getElementById("mainHeader");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

