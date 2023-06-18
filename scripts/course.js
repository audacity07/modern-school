import { dataArr } from "../data/data.js";

// Select the parent element
const parentElement = document.getElementById("course-wrapper");
const filterByCourse = document.querySelector("#filter-by-course");
const sortByPrice = document.querySelector("#sort-by-price");
let cartItemArr = JSON.parse(localStorage.getItem("cartItem")) || [];
let searchEle = document.querySelector("#search-box > input");
let titleTag = document.querySelector("#title");
let inCart = JSON.parse(localStorage.getItem("inCart")) || {};

searchEle.addEventListener("input", function () {
  let filtered = dataArr.filter(function (element) {
    if (
      element.title.toLowerCase().includes(searchEle.value.toLowerCase()) ===
      true
    ) {
      return element;
    } else if (searchEle.value === "") {
      displayData(dataArr);
    }
  });

  if (filtered.length === 0) {
    titleTag.innerText = "No Courses Found !";
  } else if (searchEle.value === "") {
    titleTag.innerHTML = `Courses to get you <span>started</span>`;
  }

  displayData(filtered);
});

// filter courses
filterByCourse.addEventListener("change", function () {
  if (filterByCourse.value === "") {
    displayData(dataArr);
  } else {
    let filteredData = dataArr.filter(function (ele) {
      return ele.category === filterByCourse.value;
    });
    displayData(filteredData);
  }
});

// sort by price
sortByPrice.addEventListener("change", function () {
  if (sortByPrice.value === "") {
    displayData(dataArr);
  } else if (sortByPrice.value === "lth") {
    let sortedData = [...dataArr].sort(function (a, b) {
      return a.price[1] - b.price[1];
    });
    displayData(sortedData);
  } else if (sortByPrice.value === "htl") {
    let sortedData = [...dataArr].sort(function (a, b) {
      return b.price[1] - a.price[1];
    });
    displayData(sortedData);
  }
});

// display the data
function displayData(data) {
  parentElement.innerHTML = "";
  const courseGridDiv = document.createElement("div");

  data.forEach(function (ele, ind) {
    // Create the HTML structure elements dynamically
    const cardDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const imgElement = document.createElement("img");
    const courseTitleElement = document.createElement("h2");
    const createdByElement = document.createElement("p");
    const priceElement = document.createElement("p");
    const addButton = document.createElement("button");

    // Set the content for the dynamic elements
    imgElement.src = ele.image;
    courseTitleElement.textContent = ele.title;
    createdByElement.textContent = ele.created_by;
    priceElement.textContent = ele.price[0];
    if (ele.id in inCart) {
      addButton.textContent = "Added to Cart";
      addButton.setAttribute("class", "added-button");
    } else {
      addButton.textContent = "Add to Cart";
    }

    addButton.addEventListener("click", function () {
      addItem(ele, ind);
    });

    // Set the necessary classes and IDs for the elements
    courseGridDiv.id = "course-grid";
    cardDiv.className = "card";

    // Create a p element for the course rating
    const ratingElement = document.createElement("p");
    ratingElement.setAttribute("class", "rating");
    ratingElement.setAttribute("id", "rate");
    ratingElement.textContent = ele.ratings;

    // Create the star icons based on the rating
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("i");
      if (i < Math.floor(ele.ratings)) {
        star.setAttribute("class", "fa-solid fa-star");
        star.style.color = "#ffd500";
      } else if (i < ele.ratings) {
        star.setAttribute("class", "fa-solid fa-star-half-stroke");
        star.style.color = "#ffd500";
      }
      ratingElement.appendChild(star);
    }

    imgDiv.appendChild(imgElement);
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(courseTitleElement);
    cardDiv.appendChild(createdByElement);
    cardDiv.appendChild(ratingElement);
    cardDiv.appendChild(priceElement);
    cardDiv.appendChild(addButton);
    courseGridDiv.appendChild(cardDiv);
    parentElement.appendChild(courseGridDiv);
  });
}

displayData(dataArr);

function addItem(ele, ind) {
  // to handle add to cart button
  inCart[ele.id] = true;
  localStorage.setItem("inCart", JSON.stringify(inCart));

  // cartItems array
  for (let val of cartItemArr) {
    if (val.id === ele.id) {
      alert("Item already added !");
      return;
    }
  }
  ele.count = 1;
  cartItemArr.push(ele);
  localStorage.setItem("cartItem", JSON.stringify(cartItemArr));
  displayData(dataArr);
}

// to handle mobile navigation
const hamburger = document.querySelector(".hamburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobileNav = document.querySelector(".mobileNav");

hamburger.addEventListener("click", function () {
  bar1.classList.toggle("animateBar1");
  bar2.classList.toggle("animateBar2");
  bar3.classList.toggle("animateBar3");
  mobileNav.classList.toggle("openDrawer");
});

window.addEventListener("resize", function () {
  let inputElement = document.getElementById("myInput");
  if (window.innerWidth <= 499) {
    inputElement.setAttribute("placeholder", "Search");
  } else {
    inputElement.setAttribute("placeholder", "Search for courses");
  }
});
