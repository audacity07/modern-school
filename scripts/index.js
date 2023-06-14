// school features carousel
let carousel = document.querySelector("#carousel");
let firstImg = document.querySelectorAll(".card > img")[0];

let leftArrow = document.querySelector("#leftArrow");
let rightArrow = document.querySelector("#rightArrow");

let firstImgWidth = firstImg.clientWidth + 3;
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
// end of school features carousel
