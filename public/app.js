async function getAnime() {
  const animeName = document.getElementById("animeSearch").value.trim();

  if (!animeName) return;

  const apiURL = `/api/search?q=${animeName}`;

  const data = await fetch(apiURL).then((res) => res.json());

  console.log("Anime response:", data);

  displayAnime(data);
}

async function getRandomAnime() {
    try {
      const res = await fetch('/api/random');
      const data = await res.json();
  
      console.log("Random anime:", data);
  
      displayAnime([data]);
    } catch (err) {
      console.error("failed:", err);
    }
  }

function displayAnime(animeList) {
  const animeBox = document.getElementById("animePoster");

  animeBox.innerHTML = "";
  animeBox.style.display = "block";

  animeList.forEach((anime) => {
    const container = document.createElement("div");
    container.setAttribute("class", "animeCard");

    const title = document.createElement("h2");
    const description = document.createElement("p");
    const rating = document.createElement("h5");
    const genres = document.createElement("h5");
    const image = document.createElement("img");
    const button = document.createElement("button");

    title.textContent = anime.title;
    description.textContent = anime.synopsis;
    rating.textContent = "Rating: " + anime.score;

    genres.textContent =
      "Genres: " + (anime.genres?.map((g) => g.name).join(", ") || "N/A");

    image.src = anime.images.jpg.image_url;
    image.width = 200;

    button.textContent = "⭐ Save to Favorites";

    button.onclick = () => {
      saveFavorite(
        anime.mal_id,
        anime.title,
        anime.images.jpg.image_url,
        anime.score,
        anime.genres.map((g) => g.name).join(", ")
      );
    };

    container.append(image, title, rating, genres, description, button);

    animeBox.appendChild(container);
  });
}

async function saveFavorite(id, title, image, rating, genres) {
  await fetch("/anime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      animeId: id,
      animeTitle: title,
      animeImage: image,
      animeGenre: genres,
      animeRating: rating,
    }),
  });

  alert("Saved to favorites!");
}

async function animePictures() {
  const animeAPI = `https://api.jikan.moe/v4/anime?limit=10`;

  const response = await fetch(animeAPI);
  const data = await response.json();

  const slides = document.getElementById("slides");
  slides.innerHTML = "";

  data.data.forEach((anime) => {
    const singleSlide = document.createElement("div");
    singleSlide.className = "swiper-slide";

    singleSlide.innerHTML = `
        <img src="${anime.images.jpg.image_url}"/>
        <p>${anime.title}</p>
      `;

    slides.appendChild(singleSlide);
  });

  swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
}

window.onload = function () {
  animePictures();
};
