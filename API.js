
const url_api = "https://rickandmortyapi.com/api/character";

/** 
* requestData 
* send request to Endpoint
* @param {string} url_api
*
*
*/


async function requestData(url_api) {
    const response = await fetch(url_api); //espera la respuesta de la API
    let data = await response.json(); //espera la respuesta de la API en formato json
    getElementButton(document, 'set', data.info); //obtiene la informacion de la API boton
    renderHtml(data); 
    
}

/**
 * loadMore 
 * Call @function getElementButton
 */
function loadMore(){ //obtiene el boton de cargar mas
    getElementButton(document, 'get');
}


/**
 * getElementButton
 * 
 * @param {object} elementButton 
 * @param {object} button 
 * @param {string} operation
 */
function getElementButton(elementButton, operation = 'get', info = null, direction = 'next'){
    const buttonId = direction == "next" ? "btnNext" : "btnPrev";
    const button = elementButton.getElementById(buttonId);  
    
    if(operation == 'get'){
          const next = button.getAttribute("data-next"); //obtiene la informacion de la API boton
        if(next =="" || next== null){ //obtiene la informacion de la API boton
            console.log("no hay url"); //muestra que no hay url
        } else {
            requestData(next); //llama a la funcion requestData con la informacion de la API boton
        } 
    }else{
        button.setAttribute("data-next", (info.next==null)?'':info.next); //obtiene la informacion de la API boton
        button.setAttribute("data-prev", (info.prev==null)?'':info.prev); //obtiene la informacion de la API boton
    }
}
/**
 * renderHtml
 * @param {object} data 
 * @param {object} element
 */
function renderHtml(data){
let element = document.getElementById("character");
    let resultCount = data.results.length;
    
    for(let index = 0; index < resultCount; index++){
        
        let character = data.results[index];
        
        element.innerHTML += `
        <li>
            <h2>${character.name}</h2>
            <p>${character.gender}</p>
            <img src="${character.image}" alt="${character.name}">
        </li>`;
    }

}
const response = requestData(url_api); 