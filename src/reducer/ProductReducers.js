import { GET_PRODUCT, UPDATE_PRODUCTS } from "../action/type"

const INITIAL_STATE = {
    products_list: []
}

export const ProductReducers = (state = INITIAL_STATE, action) => {
    // console.log("reducer", action.payload)
    switch(action.type){
        case GET_PRODUCT:
            console.log("product reducer", action.payload)
            // tanpa split operator: {products_list: state,}
            return {...state, products_list: action.payload }
        case UPDATE_PRODUCTS:
            return {...state, products_list: action.payload}
        default:
            return state
    }
}