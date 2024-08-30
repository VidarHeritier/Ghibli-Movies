import { ghibliAPI } from "./module.js";
import { initializeIntro } from "./intro.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cont = document.getElementById("ghib-cont");
  cont.style.opacity = "0";
  let currentlyFlippedCard = null;

  initializeIntro();

  try {
    const response = await fetch(ghibliAPI);
    await checkAPI(response);
    const data = await response.json();
    cardCreators(data);
  } catch (error) {
    console.error("Error fetching or processing Ghibli movies:", error);
  }

  function checkAPI(api) {
    if (api.status === 200) {
      console.log("API is working fine");
    } else {
      console.error(`Error: ${api.statusText}`);
      throw new Error(api.statusText);
    }
  }

  function cardCreators(data) {
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "card";

      const cardInner = document.createElement("div");
      cardInner.className = "card-inner";

      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      const img = document.createElement("img");
      img.src = movie.image;
      img.alt = movie.title;
      cardFront.appendChild(img);

      const cardBack = document.createElement("div");
      cardBack.className = "card-back";
      const title = document.createElement("h2");
      title.textContent = movie.title;
      const director = document.createElement("p");
      director.textContent = `Director: ${movie.director}`;
      const runtime = document.createElement("p");
      runtime.textContent = `Runtime: ${movie.running_time} minutes`;
      const description = document.createElement("p");
      description.classList = "description";
      description.textContent = movie.description;

      cardBack.appendChild(title);
      cardBack.appendChild(director);
      cardBack.appendChild(runtime);
      cardBack.appendChild(description);

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);

      card.addEventListener("click", (event) => {
        event.stopPropagation();
        handleCardClick(card);
        centerCardInView(card);
      });

      cont.appendChild(card);
    });
  }

  function handleCardClick(card) {
    if (currentlyFlippedCard && currentlyFlippedCard !== card) {
      currentlyFlippedCard.classList.remove("flipped");
    }

    card.classList.toggle("flipped");
    currentlyFlippedCard = card.classList.contains("flipped") ? card : null;
  }

  document.addEventListener("click", () => {
    if (currentlyFlippedCard) {
      currentlyFlippedCard.classList.remove("flipped");
      currentlyFlippedCard = null;
    }
  });

  function centerCardInView(card) {
    const rect = card.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const scrollToX = scrollLeft + cardCenterX - viewportCenterX;
    const scrollToY = scrollTop + cardCenterY - viewportCenterY;

    window.scroll({
      top: scrollToY,
      left: scrollToX,
      behavior: "smooth",
    });
  }
});
