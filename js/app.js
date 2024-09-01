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

      const directorContainer = document.createElement("div");
      directorContainer.className = "info-container";
      const directorLabel = document.createElement("span");
      directorLabel.textContent = "Director:";
      directorLabel.className = "label";
      const directorValue = document.createElement("span");
      directorValue.textContent = movie.director;
      directorValue.className = "value";
      directorContainer.appendChild(directorLabel);
      directorContainer.appendChild(directorValue);

      const releaseDateContainer = document.createElement("div");
      releaseDateContainer.className = "info-container";
      const releaseDateLabel = document.createElement("span");
      releaseDateLabel.textContent = "Release Date:";
      releaseDateLabel.className = "label";
      const releaseDateValue = document.createElement("span");
      releaseDateValue.textContent = movie.release_date;
      releaseDateValue.className = "value";
      releaseDateContainer.appendChild(releaseDateLabel);
      releaseDateContainer.appendChild(releaseDateValue);

      const runtimeContainer = document.createElement("div");
      runtimeContainer.className = "info-container";
      const runtimeLabel = document.createElement("span");
      runtimeLabel.textContent = "Runtime:";
      runtimeLabel.className = "label";
      const runtimeValue = document.createElement("span");
      runtimeValue.textContent = `${movie.running_time} minutes`;
      runtimeValue.className = "value";
      runtimeContainer.appendChild(runtimeLabel);
      runtimeContainer.appendChild(runtimeValue);

      const description = document.createElement("p");
      description.classList = "description";
      description.textContent = movie.description;

      cardBack.appendChild(title);
      cardBack.appendChild(directorContainer);
      cardBack.appendChild(releaseDateContainer);
      cardBack.appendChild(runtimeContainer);
      cardBack.appendChild(description);

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);

      card.addEventListener("click", (event) => {
        event.stopPropagation();
        handleCardClick(card);
        currentlyFlippedCard.style.zIndex = "999";
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
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollX || document.documentElement.scrollTop;

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
