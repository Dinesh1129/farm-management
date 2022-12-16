import AsyncStorage from "@react-native-async-storage/async-storage"
import { ADD_RECORD, ALL_RECORD, CLEAR_CURRENT_RECORD, CURRENT_RECORD, DELETE_RECORD, GET_RECORD, RECORD_KEY, UPDATE_RECORD } from "../types"

export default (state,action) => {
    switch(action.type){
        case ALL_RECORD:
            return {
                ...state,
                records:[...action.payload]
            };
        case ADD_RECORD:
            return {
                ...state,
                records:[...state.records,action.payload]
            };
        case GET_RECORD:
            return {
                ...state,
                current:action.payload  
            };
        case UPDATE_RECORD:
            return{
                ...state,
                records:state.records.map(record => record._id===action.payload._id ? action.payload : record)
            };
        case DELETE_RECORD:
            return{
                ...state,
                records:state.records.filter(record => record._id !== action.payload)
            };
        case CURRENT_RECORD:
            return {
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT_RECORD:
            return {
                ...state,
                current:null
            };
        default:
            throw new Error('unspported type')
    }
}