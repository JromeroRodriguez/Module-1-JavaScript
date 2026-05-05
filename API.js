//variable global url API para obtener los personajes
const url_api = "https://rickandmortyapi.com/api/character";
const response = requestData(url_api); 

//hace la peticion a la API 
async function requestData(url_api) {
    const response = await fetch(url_api); //espera la respuesta de la API
    let data = await response.json(); //espera la respuesta de la API en formato json
    console.log(data.results); //muestra los resultados de la API
    let info = data.info; //obtiene la informacion de la API

    //obtiene la informacion de la API boton
    const button = document.getElementById("loadMore");
    button.setAttribute("data-next", (info.next==null)?'':info.next); //obtiene la informacion de la API boton
    button.setAttribute("data-prev", (info.prev==null)?'':info.prev); //obtiene la informacion de la API boton
    
    //obtiene la cantidad de personajes
    let resultCount = data.results.length; //obtiene la cantidad de personajes

    //obtiene la lista 
    let lista = document.getElementById("character"); //obtiene la lista de personajes

    //lista los personajes 
    for (let index = 0; index < resultCount; index++) { //lista los personajes
        let character = data.results[index]; //obtiene la lista de personajes
        let name = character.name; //obtiene el nombre del personaje
        let gender = character.gender; //obtiene el genero del personaje
        let image = character.image; //obtiene la imagen del personaje

        //obtiene la lista de personajes
        lista.innerHTML += `<li>
        <h2>${name}</h2>
        <p>${gender}<p>
        <img src="${image}" alt="${name}">
        </li>`;
        console.log(name); //muestra el nombre del personaje
    }
}
//carga mas personajes 
function loadMore(){
    const button = document.getElementById("loadMore"); //obtiene el boton de cargar mas
    const next = button.getAttribute("data-next"); //obtiene la informacion de la API boton
    if(next =="" || next== null){ //obtiene la informacion de la API boton
        console.log("no hay url"); //muestra que no hay url
    } else {
        requestData(next); //llama a la funcion requestData con la informacion de la API boton
    }   
}
    