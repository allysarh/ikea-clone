import axios from "axios"
import { URL_API } from "../Helper"
import { GET_PRODUCT, UPDATE_PRODUCTS } from "./type"

//redux default
// export const getProductAction = (data) =>{
//     return {
//         type: "GET_PRODUCTS",
//         payload: data
//     }
// }

//redux thunk 
// gak usah pake parameter data soalnya udah dapet langsung dari get
export const getProductAction = () =>{
    return async (dispatch) =>{
        try {
            let res = await axios.get(URL_API + `/products/read`)
            console.log("res data: -->", res.data)
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })

        } catch (error) {
            console.log("error", error)
        }
        // axios.get(URL_API + `/products/read`)
        // .then((res) =>{
        //     // mengarahkan data ke reducer
        //     console.log("res data:", res.data)
        // }).catch(err =>{
        //     console.log(err)
        // })
    }
}

// update 
export const updateProducts = (data) =>{
    return {
        type: UPDATE_PRODUCTS,
        payload: data
    }
}

