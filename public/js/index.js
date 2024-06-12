document.addEventListener("scroll", (e) => {
  const header = document.getElementById("header");
  if (window.scrollY == 0 && header.classList == "white-background") {
    header.classList.remove("white-background");
  }

  if (window.scrollY > 300 && header.classList == "") {
    header.classList.add("white-background");
  }
});

let elementLayer = document.getElementById("gallery");

elementLayer.addEventListener("mousemove", (event) => {
  let x = event.clientX;

  let xDecimal = x / elementLayer.offsetWidth;

  let maxX = elementLayer.offsetWidth - window.innerWidth;
  const panX = maxX * xDecimal * -1;

  elementLayer.animate(
    {
      transform: `translate(${panX}px)`,
    },
    {
      duration: 4000,
      fill: "forwards",
      easing: "ease",
    }
  );
});
