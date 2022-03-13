import auth from "../helpers/auth.js";
import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";

let section = undefined;

function initialize(domElement) {
  section = domElement;
  const form = section.querySelector("#register-form");
  form.addEventListener("submit", registerUser);
}

export function getView() {
  return section;
}

export async function registerUser(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const repeatPassword = formData.get("repeatPassword").trim();

  if (
    email.length === 0 ||
    password.length < 6 ||
    password !== repeatPassword
  ) {
    alert("Email adress or passwords are't correct");
  }

  const user = {
    email,
    password,
  };

  const result = await jsonRequest(
    "http://localhost:3030/users/register",
    "Post",
    user,
  );

  auth.setAuthToken(result.accessToken);
  auth.setUserId(result._id);

  form.reset();
  viewFinder.navigateTo('home');
}

const registerPage = {
  initialize,
  getView,
};

export default registerPage;
