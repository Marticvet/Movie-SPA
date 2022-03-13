import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";

let section = undefined;

export function initialize(domElement){
   section = domElement;
   const form = section.querySelector('#add-movie-form');
   form.addEventListener('submit', addMovie);
}

async function addMovie(event){
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
     `http://localhost:3030/data/movies/`,
     "Post",
     movie,
     true,
     false
   );

   form.reset();
   viewFinder.navigateTo("home");
}

export async function getView(){
   return section;
}


const addMoviePage = {
   initialize,
   getView
}

export default addMoviePage;