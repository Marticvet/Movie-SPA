import auth from "../helpers/auth.js";
import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";
import editMoviePage from "./editMovie.js";
import homePage from "./home.js";

let section = undefined;

export function initialize(domElement) {
  section = domElement;
}

export async function getView(id) {
  const movieDetail = await jsonRequest(
    `http://localhost:3030/data/movies/${id}`
  );

  const movieContainer = section.querySelector("#movie-details-container");
  [...movieContainer.children].forEach((m) => m.remove());

  const userId = auth.getUserId();

  const userLikesArr = await jsonRequest(
    `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`
  );
  const movieLikes = await jsonRequest(
    `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count `
  );
  const movieDetails = createMovieDetails(movieDetail, movieLikes);

  movieContainer.appendChild(movieDetails);

  return section;
}

let movieId = null;

function createMovieDetails(movie, movieLikes) {
  editMoviePage.takeMovieId(movie._id);
  movieId = movie._id;

  const div = document.createElement("div");
  div.className = "row bg-light text-dark";
  div.dataset.id = movie._id;

  const h1 = document.createElement("h1");
  h1.textContent = `Movie title: ${movie.title}`;

  const imgDiv = document.createElement("div");
  imgDiv.className = "col-md-8";

  const img = document.createElement("img");
  img.className = "img-thumbnail";
  img.src = movie.img;
  img.alt = "Movie";

  const movieDiv = document.createElement("div");
  movieDiv.className = "col-md-4 text-center";

  const h3 = document.createElement("h3");
  h3.className = "my-3";
  h3.textContent = "Movie Description";

  const p = document.createElement("p");
  p.textContent = movie.description;

  movieDiv.appendChild(h3);
  movieDiv.appendChild(p);

  const isOwner = auth.getUserId() === movie._ownerId;

  if (isOwner) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.href = "#";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = movie._id;

    deleteButton.addEventListener("click", deleteMovie);

    const editButton = document.createElement("button");
    editButton.className = "btn btn-warning link";
    editButton.dataset.route = "edit-movie";
    editButton.href = "#";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", viewFinder.changeViewHandler);

    movieDiv.appendChild(deleteButton);
    movieDiv.appendChild(editButton);
  } else {
    const likeButton = document.createElement("button");
    likeButton.className = "btn btn-primary";
    likeButton.href = "#";
    likeButton.textContent = "Like";
    likeButton.addEventListener("click", like);

    movieDiv.appendChild(likeButton);
  }

  const span = document.createElement("span");
  span.className = "enrolled-span";
  span.textContent = `Like: ${movieLikes}`;

  imgDiv.appendChild(img);

  movieDiv.appendChild(span);

  div.appendChild(h1);
  div.appendChild(imgDiv);
  div.appendChild(movieDiv);

  return div;
}

async function deleteMovie(event) {
  const button = event.target;
  const movieId = button.closest(".row").dataset.id;

  const deleteMovie = await jsonRequest(
    `http://localhost:3030/data/movies/${movieId}`,
    "Delete",
    undefined,
    true
  );
  viewFinder.navigateTo("home");
}

async function like(event) {
  event.target.parentNode.removeChild(event.target);

  let body = { movieId: movieId };
  let result = await jsonRequest(
    `http://localhost:3030/data/likes`,
    "Post",
    body,
    true
  );

  return homePage.getView();
}

const movieDetailsPage = {
  initialize,
  getView,
  like,
};

export default movieDetailsPage;
