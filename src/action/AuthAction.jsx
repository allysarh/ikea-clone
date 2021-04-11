import axios from "axios"
import { URL_API } from "../Helper"
import { LOGIN_SUCCESS, UPDATE_CART } from "./type"

// menyimpan data untuk login

// versi redux thunk
export const authLogin = (email, password) => {
    return (dispatch) => {
        axios.get(URL_API + `/users?email=${email}&password=${password}`)
            .then((res) => {
                console.log("authLogin", res.data)
                localStorage.setItem("tkn_id", res.data[0].id)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data[0]
                })
            })
    }

}

// versi biasa

// export const authLogin = (data) =>{
//     return {
//         type: LOGIN_SUCCESS,
//         payload: data
//     }
// }
// menghapus data untuk logout
export const authLogout = () => {
    localStorage.removeItem("tkn_id")
    return {
        type: 'LOGOUT',
    }
}


// menyimpoan data untuk keep login
export const keepLogin = (data) => {
    return {
        // ngambil data dari tipe data yang authLogin
        type: LOGIN_SUCCESS,
        payload: data
    }
}

// UPDATE CART DI SHOPPINGCART
export const updateCart = (data) =>{
    console.log("action", data)
    return {
        type: UPDATE_CART,
        payload: data
    }
}