let section = undefined;

export function initialize(domElement){
   section = domElement;
}

export async function getView(){
   return section;
}

const nav = {
   initialize,
   getView
}

export default nav;