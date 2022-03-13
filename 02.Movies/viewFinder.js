import auth from "./helpers/auth.js";
import addMoviePage from "./pages/addMovie.js";
import editMoviePage from "./pages/editMovie.js";
import homePage from "./pages/home.js";
import loginPage from "./pages/login.js";
import movieDetailsPage from "./pages/movieDetails.js";
import registerPage from "./pages/register.js";

let movieId = null;

function getMovieId(id) {
  movieId = id;
  return id;
}

const views = {
  "add-movie": async () => addMoviePage.getView(),
  home: async () => homePage.getView(),
  login: async () => await loginPage.getView(),
  register: async () => await registerPage.getView(),
  "edit-movie": async (id) => await editMoviePage.getView(id),
  "movie-details": async (id) => movieDetailsPage.getView(id),
  logout: async () => auth.logout(),
  like: async (id) => await movieDetailsPage.like(id),
};

function initiliaze(allElements) {
  allElements.forEach((anchor) =>
    anchor.addEventListener("click", changeViewHandler)
  );
}

export function changeViewHandler(event) {
  const element = event.target.matches(".link")
    ? event.target
    : event.target.closest(".link");
  const route = element.dataset.route;
  const id = element.dataset.id;
  getMovieId(id);
  navigateTo(route, id);
}

export async function navigateTo(route, id) {
  if (views.hasOwnProperty(route)) {
    const view = await views[route](id);
    const appElement = document.getElementById("main");
    appElement.querySelectorAll(".view").forEach((el) => el.remove());
    appElement.appendChild(view);
  }
}

const viewFinder = {
  initiliaze,
  changeViewHandler,
  navigateTo,
  movieId,
};

export default viewFinder;
