

export const url = "https://pokeapi.co/api/v2/";


export const GetPokemonList = (Limit, CurrentLimit) => new Promise(async (resolve, reject) => {
    try {
        const getAPI = await fetch(`${url}pokemon?limit=${Limit}&offset=${CurrentLimit}`, {
            method: 'GET',
            headers: {
            },
            // body: JSON.stringify(Parameter)
        })
        
        const ResJson = getAPI.json()
        resolve(ResJson)

    } catch (error) {
        console.error(error);
        reject(error)
    }
})


export const GetPokemonDetail = (param) => new Promise(async (resolve, reject) => {
    try {
        const getAPI = await fetch(`${url}pokemon/${param}/`, {
            method: 'GET',
            headers: {
            },
            // body: JSON.stringify(Parameter)
        })
        
        const ResJson = getAPI.json()
        resolve(ResJson)

    } catch (error) {
        console.error(error);
        reject(error)
    }
})