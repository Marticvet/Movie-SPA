import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";
import movieDetailsPage from "./movieDetails.js";

let section = undefined;
let movieID = undefined;

function initialize(domElement) {
  section = domElement;
  const form = section.querySelector("#edit-form");
  form.addEventListener("submit", editMovie);
}

async function editMovie(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("imageUrl");

  console.log(title);

  const movie = {
    title,
    description,
    img,
  };

  const result = await jsonRequest(
    `http://localhost:3030/data/movies/${movieID}`,
    "Put",
    movie,
    true
  );

  form.reset();
  viewFinder.navigateTo("home");
}

function takeMovieId(id) {
  movieID = id;
}

takeMovieId();

export async function getView(id) {
  return section;
}

const editMoviePage = {
  initialize,
  getView,
  takeMovieId,
};

export default editMoviePage;
