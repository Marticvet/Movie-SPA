
let section = undefined;

function initialize(domElement){
   section = domElement;
}

function getView(){
   return section;
}

const logoutPage = {
   initialize,
   getView
}

export default logoutPage;