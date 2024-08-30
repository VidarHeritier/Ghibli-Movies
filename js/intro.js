export function initializeIntro() {
  const wallpapers = [
    "https://vidarheritier.github.io/Ghibli-Movies/Wallpapers/42613.jpg",
    "https://vidarheritier.github.io/Ghibli-Movies/Wallpapers/42614.jpg",
    "https://vidarheritier.github.io/Ghibli-Movies/Wallpapers/42615.jpg",
    "https://vidarheritier.github.io/Ghibli-Movies/Wallpapers/42616.jpg",
    "https://vidarheritier.github.io/Ghibli-Movies/Wallpapers/42617.jpg",
  ];

  document.body.style.backgroundColor = "black";

  const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];
  const backgroundImage = new Image();
  backgroundImage.src = randomImage;
  backgroundImage.className = "background-image";
  document.body.appendChild(backgroundImage);

  backgroundImage.onload = () => {
    setTimeout(() => {
      backgroundImage.style.opacity = "1";
      displayWelcomeText();
    }, 300);
  };
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || window.scrollY;
    backgroundImage.style.transform = `translateY(${scrollPosition * 1}px)`;
  });
}

function displayWelcomeText() {
  const welcomeText = "Welcome to the Ghibli movie database";
  const welcomeContainer = document.createElement("div");

  welcomeContainer.id = "welcome-container";
  document.body.appendChild(welcomeContainer);

  welcomeText.split("").forEach((char, index) => {
    const p = document.createElement("p");

    if (char === " ") {
      p.innerHTML = "&nbsp;";
    } else {
      p.textContent = char;
    }

    p.className = "welcome";
    welcomeContainer.appendChild(p);

    setTimeout(() => {
      p.style.opacity = "1";
      p.style.animation = "welcomeResize .5s ease-in";
    }, index * 50);
  });

  setTimeout(() => {
    welcomeContainer.style.opacity = "0";
    welcomeContainer.addEventListener("transitionend", () => {
      welcomeContainer.remove();
      fadeOutWallpaper();
    });
  }, welcomeText.length * 50 + 400);
}

function fadeOutWallpaper() {
  const backgroundImage = document.querySelector(".background-image");
  const ghibliContainer = document.getElementById("ghib-cont");
  const titleTextHide = document.querySelector("h1");

  backgroundImage.style.transition = "filter 2s";
  backgroundImage.style.filter = "brightness(30%)";

  ghibliContainer.style.transition = "transform 1.8s ease, opacity 1.8s ease";
  ghibliContainer.style.transform = "scale(0.2)";
  ghibliContainer.style.opacity = "0";

  setTimeout(() => {
    ghibliContainer.style.transform = "scale(1)";
    ghibliContainer.style.opacity = "1";
  }, 50);

  titleTextHide.style.visibility = "visible";
}
