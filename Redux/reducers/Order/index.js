import { GET_ORDER_LIST, GET_PRODUCT_LIST, RESET_ORDER_LIST, SCROLL_LOADING_STATUS } from "../../actions/GetProductList";
const initialState = {
    getProductResult: false,
    getProductLoading: true,
    getProductError: false,
    scrollLoading: false
}
const OrderList = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return {
                ...state,
                getProductResult: action.payload.data,
                getProductLoading: action.payload.loading,
                getProductError: action.payload.errorMessage,
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