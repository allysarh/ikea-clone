import { LOGIN_FAILED, LOGIN_SUCCESS, UPDATE_CART } from "../action/type"

const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    cart: [],
    status: ""
}

export const authReducer = (state = INITIAL_STATE, action) => {
    // console.log("authReducer", action.payload)
    switch (action.type) {
        case LOGIN_SUCCESS:
            // delete  data password
            delete action.payload.password
            console.log("auth reducer -->", action.payload)
            return { ...state, ...action.payload }
        case UPDATE_CART:
            console.log("reducer", action.payload)
            return { ...state, cart: action.payload }
        case LOGIN_FAILED:
            console.log("reducer", action.payload)
            return { ...state, status: action.payload}
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}