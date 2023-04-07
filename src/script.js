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
        <a class="h-64 w-44 rounded-3xl relative overflow-hidden" href="moviepage.html?id=${
          movie.id
        }">
        <img class="w-full object-cover h-64 rounded-3xl" src="${
          movie.image
        }" alt="Cover movie ${movie.title}">
        <p class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full">
          ${movie.rating * 10}%
        </p>
      </a>
      `;
}

function movieWithRatingCardComponent(movie) {
  return `
        <a class="h-64 w-44 rounded-3xl relative overflow-hidden" href="moviepage.html?id=${
          movie.id
        }">
        <img class="w-full object-cover h-64 rounded-3xl" src="${
          movie.image
        }" alt="Cover movie ${movie.title}">
        <p class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full">
          ${movie.rating * 10}%
        </p>
      </a>
      `;
}

function movieDetailComponent(movie) {
  return `
    <div>
      <div><h2>${movie.title}</h2></div>
        <div>
          <div><img src="${movie.image}" alt="Cover movie ${movie.title}"></div>
          <div>
            <div>${movie.genre.join(",")}</div>
            <div><p>${movie.synopsis}</p></div>
            <div>IMDB Rating ${movie.rating}/10</div>
          </div>
        </div>
      </div>
      <div><button>Add to Watchlist</button>
      <div><iframe
      width="450"
      height="263"
      src="${movie.trailer}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe></div>
    `;
}

const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

searchIcon.addEventListener("click", function () {
  if (searchInput.style.display === "block") {
    searchInput.style.display = "none";
  } else {
    searchInput.style.display = "block";
  }
});
