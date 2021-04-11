import { combineReducers } from 'redux'
import { authReducer } from './AuthReducer'
import { ProductReducers } from './ProductReducers'
import { TransactionsReducer } from './TransactionsReducer'

export const Reducers = combineReducers({
    authReducer, ProductReducers, TransactionsReducer
})