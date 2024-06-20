const imageBox = document.querySelector("#img-zoomer-box");
const original = document.querySelector("#productImg");
const magnified = document.querySelector("#img-2");

function handleMouseMoves(e) {
  const style = magnified.style;
  const x = e.pageX - this.offsetLeft;
  const y = e.pageY - this.offsetTop;
  const imgWidth = original.offsetWidth;
  const imgHeight = original.offsetHeight;
  let xperc = (x / imgWidth) * 100;
  let yperc = (y / imgHeight) * 100;

  //lets user scroll past right edge of image
  if (x >= 0.01 * imgWidth) {
    xperc *= 1.15;
  }

  //lets user scroll past bottom edge of image
  if (y >= 0.01 * imgHeight) {
    yperc *= 1.15;
  }

  style.backgroundPositionX = `${xperc - 9}%`;
  style.backgroundPositionY = `${yperc - 9}%`;
  style.left = `${x - 180}px`;
  style.top = `${y - 180}px`;
}

imageBox.addEventListener("mousemove", handleMouseMoves);

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
