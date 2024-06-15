//selects all products carrousels
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
  console.log("on est la");
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
