//fetch function
async function getAllMovies() {
  try {
    const response = await fetch(`http://localhost:3000/movies/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getAllWatchlist() {
  try {
    const response = await fetch(`http://localhost:3000/watchlist`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getCurrentWatch() {
  try {
    const response = await fetch(`http://localhost:3000/currentWatch`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getMovieById(id) {
  try {
    const response = await fetch(`http://localhost:3000/movies/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getPreviousWatch() {
  try {
    const response = await fetch(`http://localhost:3000/isPrevious`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getSuggestedWatch() {
  try {
    const response = await fetch(`http://localhost:3000/isSuggested`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//curent watch
async function renderCurrentWatch() {
  let movies = await getCurrentWatch();
  let componentList = movies.map((movie) => movieCardComponent(movie));
  let cardListWrapper = document.getElementById("current-watch-list");
  cardListWrapper.innerHTML = componentList.join("");
}

//suggested watch
async function renderSuggestedWatch() {
  let movies = await getSuggestedWatch();
  let componentList = movies.map((movie) =>
    movieWithRatingCardComponent(movie)
  );
  let cardListWrapper = document.getElementById("suggested-watch-list");
  cardListWrapper.innerHTML = componentList.join("");
}

//previous watch
async function renderPreviousWatch() {
  let movies = await getPreviousWatch();
  let componentList = movies.map((movie) => movieCardComponent(movie));
  let cardListWrapper = document.getElementById("previous-watch-list");
  cardListWrapper.innerHTML = componentList.join("");
}

// movie id with description
async function renderMovieDetail() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  console.log("movieid", movieId);

  let movie = await getMovieById(movieId);
  let movieComponent = movieDetailComponent(movie);
  let movieWrapper = document.getElementById("movie-detail-id");
  movieWrapper.innerHTML = movieComponent;
}

// Watchlist
async function renderMoviesList() {
  let movies = await getAllWatchlist();
  let componentList = movies.map((movie) =>
    movieWithRatingCardComponent(movie)
  );
  let cardListWrapper = document.getElementById("movie-list");
  cardListWrapper.innerHTML = componentList.join("");
}

//library load
addEventListener("DOMContentLoaded", function () {
  renderCurrentWatch();
  renderSuggestedWatch();
  renderPreviousWatch();
  renderMovieDetail();
  renderMoviesList();
});

//load component
function movieCardComponent(movie) {
  return `
  <a class="card-${movie.id}" href="moviepage.html?id=${movie.id}">
  <img class="w-44 h-64 rounded-2xl" src="${movie.image}" alt="Cover movie ${movie.title}">
</a>
`;
}

function movieWithRatingCardComponent(movie) {
  return `
  <div class="relative">
  <a class="card-${movie.id}" href="moviepage.html?id=${movie.id}">
    <img class="w-44 h-64 rounded-2xl" src="${movie.image}" alt="Cover movie ${movie.title}">
  </a>
  <div class="absolute py-2 px-2 top-0 left-0 text-white font-semibold">
    <p>⭐${movie.rating}
  </div>
  </div>
`;
}

function movieDetailComponent(movie) {
  return `
  <div >
  <div><h2 class="mb-8 text-4xl leading-normal font-bold">${
    movie.title
  }</h2></div>
  <div class="flex flex-wrap">
    <div>
      <img class="w-48 h-72 rounded-2xl pb-4" src="${
        movie.image
      }" alt="Cover movie ${movie.title}" />
    </div>
    <div>
      <div class="mx-4 mb-2 py-2 text-base font-medium border rounded-xl border-slate-700 max-[390px]:mx-0"">${movie.genre.join(
        " "
      )}</div>
      <div class="w-96 mx-4 mb-6 text-base font-medium max-[390px]:w-80 max-[390px]:mx-0"><p>${
        movie.synopsis
      }</p></div>
      <div class="mx-4 mb-4 text-base font-normal">IMDB Rating ⭐${
        movie.rating
      }/10</div>
    </div>
  </div>
</div>

<div>
  <div id="add-watchlist-button" class="mb-8 text-right max-[390px]:hidden"></div>
  <div max-[390px]: flex justify-between>
    <iframe
      class="h-72 rounded-2xl mb-4 max-[390px]:w-80"
      width="450"
      src="${movie.trailer}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</div>
`;
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  searchInput.classList.toggle("max-[390px]:hidden");
  searchInput.focus();
});
