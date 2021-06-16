import axios from "axios";
import { connect } from "react-redux";
import { URL_API } from "../Helper";
import { GET_TRANSACTIONS, UPDATE_TRANSACTIONS } from "./type";

export const getTransactionAction = () =>{
    // return {
    //     type: GET_TRANSACTIONS,
    //     payload: data
    // }
    let token = localStorage.getItem("tkn_id")
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return async (dispatch) =>{
        try {
            let res = await axios.get(URL_API + `/transactions/get-trans`, headers)
            console.log("action", res.data)
            dispatch({
                type: GET_TRANSACTIONS,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export const updateTransactionAction = () =>{
    
// }




