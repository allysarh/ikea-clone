import { GET_TRANSACTIONS } from "./type";

export const getTransactionAction = (data) =>{
    return {
        type: GET_TRANSACTIONS,
        payload: data
    }
}