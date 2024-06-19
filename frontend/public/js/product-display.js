const productImg = document.getElementById("productImg");

function test(event, url) {
  console.log("hereee");
  var element = document.getElementById("product__img__container");
  element.style.display = "inline-block";
  element.style.backgroundImage = `url(${url})`;
  var posX = event.offsetX
    ? event.offsetX
    : event.pageX - productImg.offsetLeft;
  var posY = event.offsetY ? event.offsetY : event.pageY - productImg.offsetTop;
  element.style.backgroundPosition = -posX * 4 + "px " + -posY * 4 + "px";
}

const productsCarrousel = document.getElementsByClassName(
  "products__carrousel"
);

//displays arrows on hover over product carrousel
function showArrows(arrowForward, arrowBackward) {
  if (arrowBackward.classList.contains("show-arrows")) return;
  arrowBackward.classList.add("show-arrows");
  arrowForward.classList.add("show-arrows");
}

//hiddes arrows on mouseleave
function hideArrows(arrowForward, arrowBackward) {
  if (!arrowBackward.classList.contains("show-arrows")) return;
  arrowBackward.classList.remove("show-arrows");
  arrowForward.classList.remove("show-arrows");
}

//moves the scroll bar to the right
function moveForward(element) {
  element.scrollBy({ left: 350, behavior: "smooth" });
}

//moves the scroll bar to the left
function moveBackwards(element) {
  element.scrollBy({ left: -350, behavior: "smooth" });
}

//loops over products carrousels, selects their respective arrows, binds
//the current element (productsCarrousel[i]) to showArrows and hideArrows, binds arrows
//to moveForward and moveBackwards
for (let i = 0; i < productsCarrousel.length; i++) {
  const arrowForward = document.getElementById("arrow__forward__" + i);
  const arrowBackward = document.getElementById("arrow__backward__" + i);

  arrowBackward.addEventListener("mouseenter", () =>
    showArrows(arrowForward, arrowBackward)
  );

  arrowBackward.addEventListener("click", () =>
    moveBackwards(productsCarrousel[i])
  );

  arrowForward.addEventListener("mouseenter", () =>
    showArrows(arrowForward, arrowBackward)
  );

  arrowForward.addEventListener("click", () =>
    moveForward(productsCarrousel[i])
  );

  productsCarrousel[i].addEventListener("mouseenter", () =>
    showArrows(arrowForward, arrowBackward)
  );

  productsCarrousel[i].addEventListener("mouseleave", () =>
    hideArrows(arrowForward, arrowBackward)
  );
}

const productCards = document.getElementsByClassName("product__card");
for (let i = 0; i < productCards.length; i++) {
  productCards[i].addEventListener("click", () => {
    window.location.href = "/pages/product";
  });
}
