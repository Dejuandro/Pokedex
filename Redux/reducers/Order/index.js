import {GET_POKEMON_LIST, SCROLL_LOADING_STATUS } from "../../actions/GetPokemon";
const initialState = {
    getPokemonResult: false,
    getPokemonLoading: true,
    getPokemonError: false,
    scrollLoading: false
}
const OrderList = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMON_LIST:
            return {
                ...state,
                getPokemonResult: action.payload.data,
                getPokemonLoading: action.payload.loading,
                getPokemonError: action.payload.errorMessage,
                scrollLoading:action.payload.scrollloading
            }
        case SCROLL_LOADING_STATUS:
            return {
                ...state,
                scrollLoading: action.payload.loading
            }
        default:
            return state;
    }
}

export default OrderList