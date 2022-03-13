import loginPage from "../pages/login.js";
import { jsonRequest } from "./httpService.js";

export function setAuthToken(token) {
  localStorage.setItem("token", token);
}
export function getAuthToken() {
  return localStorage.getItem("token");
}

export function setUserId(userId) {
  localStorage.setItem("userId", userId);
}

export function getUserId() {
  return localStorage.getItem("userId");
}
export function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

export async function logout() {
  let result = await jsonRequest(
    "http://localhost:3030/users/logout",
    "Get",
    undefined,
    true,
    true
  );
  localStorage.clear();
  return loginPage.getView();
}

const auth = {
  setAuthToken,
  getAuthToken,
  isLoggedIn,
  logout,
  setUserId,
  getUserId,
};

export default auth;
