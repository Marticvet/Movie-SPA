import auth from "../helpers/auth.js";
import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";

let section = undefined;

function initialize(domElement) {
  section = domElement;
  const form = section.querySelector("#login-form");
  form.addEventListener("submit", loginUser);
}

async function loginUser(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  const user = {
    email,
    password,
  };

  if (auth.isLoggedIn()) {
    document.getElementById("user-email").textContent = `Welcome, ${email}`;
  }
  
  const result = await jsonRequest(
    "http://localhost:3030/users/login",
    "Post",
    user,
    false,
    false
  );

  auth.setAuthToken(result.accessToken);
  auth.setUserId(result._id);

  form.reset();
  viewFinder.navigateTo("home");
}

export function getView() {
  return section;
}

const loginPage = {
  initialize,
  getView,
};

export default loginPage;
