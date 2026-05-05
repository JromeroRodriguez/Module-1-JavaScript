//variables globales
const url_api = "https://rickandmortyapi.com/api/character";
const response = requestData(url_api); 

//hace la peticion a la API
async function requestData(url_api) {
    const response = await fetch(url_api);
    let data = await response.json();
    console.log(data.results);
    let info = data.info;

    //obtiene la informacion de la API
    const button = document.getElementById("loadMore");
    button.setAttribute("data-next", (info.next==null)?'':info.next);
    button.setAttribute("data-prev", (info.prev==null)?'':info.prev);
    
    //obtiene la cantidad de personajes
    let resultCount = data.results.length;

    //obtiene la lista de personajes
    let lista = document.getElementById("character");

    //lista los personajes 
    for (let index = 0; index < resultCount; index++) {
        let character = data.results[index];
        let name = character.name;
        let gender = character.gender;
        let image = character.image;

        //obtiene la lista de personajes
        lista.innerHTML += `<li>
        <h2>${name}</h2>
        <p>${gender}<p>
        <img src="${image}" alt="${name}">
        </li>`;
        console.log(name);
    }
}
//carga mas personajes 
function loadMore(){
    const button = document.getElementById("loadMore");
    const next = button.getAttribute("data-next");
    if(next =="" || next== null){
        console.log("no hay url");
    }else{
        requestData(next);      
    }   
}
    