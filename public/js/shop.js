const rowOne = document.getElementsByClassName("row--one")[0];
const rowTwo = document.getElementsByClassName("row--two")[0];

const arrowBackward = document.getElementsByClassName(
  "arrow__backward__one"
)[0];
const arrowForward = document.getElementsByClassName("arrow__forward__one")[0];
const controlArrows = document.getElementsByClassName("arrow");

function show() {
  if (arrowBackward.classList.contains("show-arrows")) return;
  arrowBackward.classList.add("show-arrows");
  arrowForward.classList.add("show-arrows");
}

for (let i = 0; i < controlArrows.length; i++) {
  controlArrows[i].addEventListener("mouseenter", (e) => {
    show();
  });
  controlArrows[i].addEventListener("click", () => console.log("click"));
}

rowOne.addEventListener("mouseenter", show);
rowTwo.addEventListener("mouseenter", () => {
  const arrowForward = document.getElementsByClassName(
    "arrow__forward__two"
  )[0];
  const arrowBackward = document.getElementsByClassName(
    "arrow__backward__two"
  )[0];
  if (arrowBackward.classList.contains("show-arrows")) return;
  arrowBackward.classList.add("show-arrows");
  arrowForward.classList.add("show-arrows");
});

rowOne.addEventListener("mouseleave", () => {
  if (!arrowBackward.classList.contains("show-arrows")) return;
  arrowBackward.classList.remove("show-arrows");
  arrowForward.classList.remove("show-arrows");
});
