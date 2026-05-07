const url_api = "https://rickandmortyapi.com/api/character";

let isLoading = false;
let characters = [];

/** 
* requestData 
* send request to Endpoint
* @param {string} url_api
*/
async function requestData(url) {
    if (isLoading) return;
    isLoading = true;
    document.getElementById("loading").style.display = "flex";

    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await axios.get(url);
    let data = response.data;
    getElementButton(document, 'set', data.info);
    characters = data.results;
    renderHtml(characters); 

    document.getElementById("loading").style.display = "none";
    isLoading = false;
   
}

/**
 * loadMore 
 * Call @function getElementButton
 */
function loadMore(direction){
    getElementButton(document, 'get', null, direction);
}

/**
 * getElementButton
 * @param {object} elementButton 
 * @param {string} operation
 * @param {object} info
 * @param {string} direction
 */
function getElementButton(elementButton, operation = 'get', info = null, direction = 'next'){
    const buttonId = direction == "next" ? "btnNext" : "btnPrev";
    const button = elementButton.getElementById(buttonId);  
    
    if(operation == 'get'){
        const url = button.getAttribute(direction == "next" ? "data-next" : "data-prev");
        if(url == "" || url == null){
            console.log("no hay url");
        } else {
            requestData(url);
        } 
    } else {
        const btnNext = elementButton.getElementById("btnNext");
        const btnPrev = elementButton.getElementById("btnPrev");
        
        btnNext.setAttribute("data-next", (info.next==null)?'':info.next);
        btnPrev.setAttribute("data-prev", (info.prev==null)?'':info.prev);
        
        btnNext.disabled = (info.next == null);
        btnPrev.disabled = (info.prev == null);

        const pageParam = new URL(info.next ?? info.prev).searchParams.get('page');
        const currentPage = Number(pageParam);
        const totalPages = info.pages;
        const page = info.next ? currentPage - 1 : totalPages;
        document.getElementById('pageIndicator').textContent = `Page ${page} of ${totalPages}`;
    }
}

/**
 * renderHtml
 * @param {Array} data
 */
function renderHtml(data){
    let element = document.getElementById("character");
    element.innerHTML = '';
    let resultCount = data.length;
    
    for(let index = 0; index < resultCount; index++){
        let character = data[index];
        
        element.innerHTML += `
        <li>
            <h2>${character.name}</h2>
            <p>${character.gender}</p>
            <img src="${character.image}" alt="${character.name}">
        </li>`;
    }
}

function filterByGender(){
    const gender = document.getElementById("filterGender").value;
    
    if(gender == ""){
        renderHtml(characters);
    } else {
        const filtered = characters.filter(c => c.gender === gender);
        renderHtml(filtered);
    }
}

const response = requestData(url_api); 