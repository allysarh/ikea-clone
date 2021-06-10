import axios from "axios"
import { URL_API } from "../Helper"
import { LOGIN_FAILED, LOGIN_SUCCESS, UPDATE_CART } from "./type"

// menyimpan data untuk login

// versi redux thunk
// export const authLogin = (email, password) => {
//     return (dispatch) => {
//         axios.get(URL_API + `/users?email=${email}&password=${password}`)
//             .then((res) => {
//                 console.log("authLogin", res.data)
//                 localStorage.setItem("tkn_id", res.data[0].id)
//                 dispatch({
//                     type: LOGIN_SUCCESS,
//                     payload: res.data[0]
//                 })
//             })
//             .catch((err) =>{
//                 console.log("error login", err)
//                 alert("email belum terdaftar")
//             })
//     }

// }

//localhost BE
export const authLogin = (email, password) =>{
    return (dispatch) => {
        axios.post(URL_API + `/users/login`, {
            email, password
        })
            .then((res) => {
                console.log("resdata", res.data)
                if(res.data[0].status === 'Verified'){
                    localStorage.setItem("tkn_id", res.data[0].id) 
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data[0]
                    })
                } else if(res.data[0].status === 'Unverified'){
                    dispatch({
                        type: LOGIN_FAILED,
                        payload: res.data[0]
                    })
                } 

            })
            .catch((err) =>{
                console.log("error login", err)
                dispatch({
                    type: LOGIN_FAILED,
                    payload: []
                })
            })
    }
}

// auth login get data cart terpisah
// export const authLogin = (email, password) =>{
//     return async (dispatch) =>{

//     }
// }

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
    console.log("keep login", data)
    return {
        // ngambil data dari tipe data yang authLogin
        type: LOGIN_SUCCESS,
        payload: data
        // get cart
        
    }
}

// cara 2
// export const keepLogin = (data) =>{
//     return async (dispatch) =>{
//         try {
//             let cart = await dispatch(getCart(data.id))
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: {...data, cart}
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// UPDATE CART DI SHOPPINGCART
export const updateCart = (data) =>{
    console.log("action", data)
    return {
        type: UPDATE_CART,
        payload: data
    }
}

export const getCart = (id) =>{
    return async (dispatch) =>{
        try {
            let res = await axios.get(URL_API + `/transactions/get-cart/${id}`)
            console.log("res", res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCartQty = ({id, qty, idcart}) =>{
    console.log("req body patch", {id, qty, idcart})
    return async (dispatch) => {
        try {
            let updateQty = await axios.patch(URL_API + `/transactions/update-qty`, {
                id, qty, idcart
            })
            
            dispatch({
                type: UPDATE_CART,
                payload: updateQty.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCart = (id, idcart) =>{
    return async (dispatch) => {
        try {
            await axios.delete(URL_API + `/transactions/delete-cart/${idcart}`)
            let cart = await dispatch(getCart(id))
            dispatch({
                type: UPDATE_CART,
                payload: cart
            })

        } catch (error) {
            console.log(error)
        }
    }
}