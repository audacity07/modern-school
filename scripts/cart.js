// Get data from the local storage
let cart = JSON.parse(localStorage.getItem("cartItem")) || [];
let inCart = JSON.parse(localStorage.getItem("inCart")) || {};

// Create a new div element for the cart item
const cartItemContainer = document.querySelector("#cart-item-container");
let title = document.querySelector("#title");

function displayData(data) {
  if (cart.length > 0) {
    title.innerHTML = `Shopping <span>Cart</span>`;
  } else {
    title.innerHTML = `Your Cart is <span>empty</span>`;
  }

  cartItemContainer.innerHTML = null;

  displayTotal();

  data.forEach(function (ele, ind) {
    // Create a new div element for the card
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    // Create a div element for the image container
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "img-div");

    // Create an img element for the course image
    const image = document.createElement("img");
    image.setAttribute("src", ele.image);

    // Append the image to the image container
    imgDiv.appendChild(image);

    // Create a div element for the course information
    const info = document.createElement("div");
    info.setAttribute("class", "info");

    // Create an h3 element for the course name
    const courseName = document.createElement("h3");
    courseName.textContent = ele.title;

    // Create a p element for the course creator
    const creator = document.createElement("p");
    creator.textContent = ele.created_by;

    // Create a p element for the course rating
    const rate = document.createElement("p");
    rate.setAttribute("class", "rate");
    rate.textContent = ele.ratings;

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
      rate.appendChild(star);
    }

    // Create a div element for the remove button
    const btn = document.createElement("div");
    btn.setAttribute("class", "btn");

    // Create a button element for the remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeItem(ele, ind);
    });

    // Create a p element for the course price
    const price = document.createElement("p");
    price.setAttribute("class", "price");
    price.textContent = `${ele.price[0]} 💰`;

    // Append the elements to build the hierarchy
    info.appendChild(courseName);
    info.appendChild(creator);
    info.appendChild(rate);
    btn.appendChild(removeButton);
    card.appendChild(imgDiv);
    card.appendChild(info);
    card.appendChild(btn);
    card.appendChild(price);
    cartItemContainer.appendChild(card);
  });
}
displayData(cart);

function removeItem(ele, ind) {
  cart.splice(ind, 1);
  localStorage.setItem("cartItem", JSON.stringify(cart));
  delete inCart[ele.id];
  localStorage.setItem("inCart", JSON.stringify(inCart));
  displayData(cart);
}

function displayTotal() {
  if (cart.length > 0) {
    // Create a new div element for the card
    const card = document.createElement("div");
    card.setAttribute("class", "totalCard");

    // summary
    let h3Tag = document.createElement("h3");
    h3Tag.setAttribute("class", "summary");
    h3Tag.innerText = `Total courses in your cart: ${cart.length}`;

    // Create a div element for the total button
    const btn = document.createElement("div");
    btn.setAttribute("class", "totalBtn");

    // Create a button element for the total button
    const totalBtn = document.createElement("button");
    totalBtn.textContent = "Total Amount";

    // Create a p element for the course price
    const price = document.createElement("p");
    price.setAttribute("class", "price");
    let total = 0;
    for (let val of cart) {
      total += val.price[1];
    }
    let firstPart = Math.floor(total / 1000);
    let lastPart = total % 1000;
    price.textContent = `₹ ${firstPart},${lastPart} 💰`;

    btn.appendChild(totalBtn);
    card.appendChild(h3Tag);
    card.appendChild(btn);
    card.appendChild(price);
    cartItemContainer.appendChild(card);
  }
}
