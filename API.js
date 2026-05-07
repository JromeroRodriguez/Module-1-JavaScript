const url_api = "https://rickandmortyapi.com/api/character"; // URL base de la API de Rick and Morty

let isLoading = false; // Bandera para evitar múltiples peticiones simultáneas
let characters = []; // Array global para almacenar los personajes de la página actual

/** 
* requestData 
* Envía la petición al endpoint de la API
* @param {string} url
*/
async function requestData(url) {
    if (isLoading) return; // Si ya está cargando, salir de la función
    isLoading = true; // Activar estado de carga
    document.getElementById("loading").style.display = "flex"; // Mostrar el spinner de carga

    await new Promise(resolve => setTimeout(resolve, 500)); // Simular un pequeño retraso para la UX
    const response = await axios.get(url); // Realizar la petición HTTP con Axios
    let data = response.data; // Obtener los datos de la respuesta
    getElementButton(document, 'set', data.info); // Actualizar los botones de navegación con la info de paginación
    characters = data.results; // Guardar los personajes obtenidos
    renderHtml(characters); // Dibujar los personajes en el HTML

    document.getElementById("loading").style.display = "none"; // Ocultar el spinner de carga
    isLoading = false; // Desactivar estado de carga
}

/**
 * loadMore 
 * Llama a getElementButton para navegar entre páginas
 */
function loadMore(direction){
    getElementButton(document, 'get', null, direction); // Obtener la URL de la dirección solicitada
}

/**
 * getElementButton
 * Maneja la lógica de los botones de paginación (obtener URLs o configurar botones)
 * @param {object} elementButton 
 * @param {string} operation
 * @param {object} info
 * @param {string} direction
 */
function getElementButton(elementButton, operation = 'get', info = null, direction = 'next'){
    const buttonId = direction == "next" ? "btnNext" : "btnPrev"; // Identificar qué botón se está usando
    const button = elementButton.getElementById(buttonId); // Obtener la referencia al botón en el DOM
    
    if(operation == 'get'){
        // Operación para obtener la URL guardada en el atributo data y cargar más datos
        const url = button.getAttribute(direction == "next" ? "data-next" : "data-prev");
        if(url == "" || url == null){
            console.log("no hay url"); // No hay más páginas en esa dirección
        } else {
            requestData(url); // Cargar la nueva página
        } 
    } else {
        // Operación para configurar los atributos y estado de los botones tras una petición
        const btnNext = elementButton.getElementById("btnNext");
        const btnPrev = elementButton.getElementById("btnPrev");
        
        // Guardar las URLs de la siguiente y anterior página en atributos data
        btnNext.setAttribute("data-next", (info.next==null)?'':info.next);
        btnPrev.setAttribute("data-prev", (info.prev==null)?'':info.prev);
        
        // Deshabilitar botones si no hay más páginas disponibles
        btnNext.disabled = (info.next == null);
        btnPrev.disabled = (info.prev == null);

        // Calcular y mostrar el indicador de página actual
        const pageParam = new URL(info.next ?? info.prev).searchParams.get('page');
        const currentPage = Number(pageParam);
        const totalPages = info.pages;
        const page = info.next ? currentPage - 1 : totalPages;
        document.getElementById('pageIndicator').textContent = `Page ${page} of ${totalPages}`;
    }
}

/**
 * renderHtml
 * Renderiza la lista de personajes en el contenedor correspondiente
 * @param {Array} data
 */
function renderHtml(data){
    let element = document.getElementById("character"); // Contenedor de la lista
    element.innerHTML = ''; // Limpiar el contenido previo
    let resultCount = data.length; // Cantidad de personajes a mostrar
    
    for(let index = 0; index < resultCount; index++){
        let character = data[index]; // Personaje actual
        
        // Insertar el HTML de la tarjeta del personaje
        element.innerHTML += `
        <li>
            <h2>${character.name}</h2>
            <p>${character.gender}</p>
            <img src="${character.image}" alt="${character.name}">
        </li>`;
    }
}

/**
 * filterByGender
 * Filtra los personajes cargados en memoria por el género seleccionado
 */
function filterByGender(){
    const gender = document.getElementById("filterGender").value; // Obtener valor del select
    
    if(gender == ""){
        renderHtml(characters); // Si no hay filtro, mostrar todos
    } else {
        // Filtrar el array global de personajes
        const filtered = characters.filter(c => c.gender === gender);
        renderHtml(filtered); // Renderizar solo los que coinciden
    }
}

// Carga inicial al abrir la página
const response = requestData(url_api); 