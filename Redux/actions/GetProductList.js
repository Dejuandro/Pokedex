
import { GetPokemonList, GetPokemonDetail } from "../../api_config"
export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST"
export const GET_ORDER_LIST = "GET_ORDER_LIST"
export const RESET_ORDER_LIST = "RESET_ORDER_LIST"
export const SCROLL_LOADING_STATUS = "SCROLL_LOADING_STATUS"


export const GetProductList = (limit,CurrentLimit, CurrentData) => {
    return async (dispatch) => {
        
        if (CurrentLimit == 0) {
            console.log(limit, CurrentLimit)
            const GetPokemon = await GetPokemonList(limit, CurrentLimit)
            let PokemonList = GetPokemon.results
            for (let i = 0; i < PokemonList.length; i++) {
                // console.log(PokemonList[i].name)
                const EachPokemonDetail = await GetPokemonDetail(PokemonList[i].name)
                PokemonList[i].types = EachPokemonDetail.types
                PokemonList[i].image = EachPokemonDetail.sprites.versions["generation-iii"]["emerald"].front_default
            }
            await    dispatch({
                type: GET_PRODUCT_LIST,
                payload: {
                    loading: false,
                    data: PokemonList,
                    scrollloading:false,
                    errorMessage: false
                }
            })
        } else {
            console.log(limit, CurrentLimit)
            await dispatch({
                type: SCROLL_LOADING_STATUS,
                payload: {
                    loading: true,
                }
            })
            const GetPokemon = await GetPokemonList(limit, CurrentLimit)
            let PokemonList = GetPokemon.results
            for (let i = 0; i < PokemonList.length; i++) {
                // console.log(PokemonList[i].name)
                const EachPokemonDetail = await GetPokemonDetail(PokemonList[i].name)
                PokemonList[i].types = EachPokemonDetail.types
                PokemonList[i].image = EachPokemonDetail.sprites.versions["generation-iii"]["emerald"].front_default
            }
            const newPokemonList = [...CurrentData, ...PokemonList]
            await dispatch({
                type: GET_PRODUCT_LIST,
                payload: {
                    loading: false,
                    data: newPokemonList,
                    errorMessage: false,
                    scrollloading:false
                }
            })
        }
            //loading
   
    }
}

export const AddOrder = (data) => {
    return (dispatch) => {
        // data[0] == Data Product && data[1] == Data New Order
        dispatch({
            type: GET_ORDER_LIST,
            payload: {
                loading: false,
                data: data,
                errorMessage: false
            }
        }) 
    }
}


