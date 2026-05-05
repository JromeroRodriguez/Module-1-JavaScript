const url_api = "https://rickandmortyapi.com/api/character";

const response = requestData(url_api); 

async function requestData(url_api) {
    const response = await fetch(url_api);
    data = await response.json();
    console.log(data.results)

    for(let index = 0; index < data.results.length; index++ )
    {
        let name = data.results[index].name
        console.log(name)
    }
}
