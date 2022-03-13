import addMoviePage from "./pages/addMovie.js";
import editMoviePage from "./pages/editMovie.js";
import homePage from "./pages/home.js";
import loginPage from "./pages/login.js";
import logoutPage from "./pages/logout.js";
import movieDetailsPage from "./pages/movieDetails.js";
import registerPage from "./pages/register.js";
import viewFinder from "./viewFinder.js";


(async function(){
   loginPage.initialize(document.getElementById('form-login'));
   registerPage.initialize(document.getElementById('form-sign-up'));
   homePage.initialize(document.getElementById('home-page'));
   addMoviePage.initialize(document.getElementById('add-movie'));
   movieDetailsPage.initialize(document.getElementById('movie-details'));
   editMoviePage.initialize(document.getElementById('edit-movie'));
   logoutPage.initialize(document.getElementById('logout-user'));
   viewFinder.initiliaze(document.querySelectorAll('.link'));

   viewFinder.navigateTo('home');
})()