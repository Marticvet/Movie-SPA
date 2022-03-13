import auth from "../helpers/auth.js";
import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";

let section = undefined;

export function initialize(domElement) {
  section = domElement;
}

async function getView() {
  const movies = await jsonRequest("http://localhost:3030/data/movies");
  const movieContainer = section.querySelector("#movie-container");

  movieContainer
    .querySelectorAll(".movie")
    .forEach((element) => element.remove());

  movies.forEach((el) => {
    movieContainer.appendChild(createMovieElements(el));
  });

  movieContainer.querySelectorAll(".link").forEach((el) => {
    if (auth.isLoggedIn(movies)) {
      el.addEventListener("click", viewFinder.changeViewHandler);
    }
  });

  return section;
}


function createMovieElements(movie) {
  const div = document.createElement("div");
  div.className = "card Mb-4 movie";

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = movie.img;
  img.alt = "Card image cap";
  img.width = "400";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";
  const h4 = document.createElement("h4");
  h4.className = "card-title";
  h4.textContent = movie.title;

  cardBodyDiv.appendChild(h4);

  const footerDiv = document.createElement("div");
  footerDiv.className = "card-footer";

  const a = document.createElement("a");
  a.className = "link";
  a.dataset.route = "movie-details";
  a.dataset.id = movie._id;
  a.href = "#/details/6lOxMFSMkML09wux6sAF";

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "btn btn-info";
  detailsButton.textContent = "Details";

  a.appendChild(detailsButton);
  footerDiv.appendChild(a);

  div.appendChild(img);
  div.appendChild(cardBodyDiv);
  div.appendChild(footerDiv);

  return div;
}

const homePage = {
  initialize,
  getView,
};

export default homePage;
