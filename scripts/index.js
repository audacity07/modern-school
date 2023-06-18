// school features carousel
let carousel = document.querySelector("#carousel");
let firstImg = document.querySelectorAll(".card > img")[0];

let leftArrow = document.querySelector("#leftArrow");
let rightArrow = document.querySelector("#rightArrow");

if (window.innerWidth >= 1328) {
  let firstImgWidth = firstImg.clientWidth + 30;
  leftArrow.addEventListener("click", function () {
    carousel.scrollTo({
      left: carousel.scrollLeft - firstImgWidth,
      behavior: "smooth",
    });
  });
  rightArrow.addEventListener("click", function () {
    carousel.scrollTo({
      left: carousel.scrollLeft + firstImgWidth,
      behavior: "smooth",
    });
  });
} else if (window.innerWidth <= 968) {
  let firstImgWidth = firstImg.clientWidth + 24;
  leftArrow.addEventListener("click", function () {
    carousel.scrollTo({
      left: carousel.scrollLeft - firstImgWidth,
      behavior: "smooth",
    });
  });
  rightArrow.addEventListener("click", function () {
    carousel.scrollTo({
      left: carousel.scrollLeft + firstImgWidth,
      behavior: "smooth",
    });
  });
}
