import AsyncStorage from "@react-native-async-storage/async-storage"
import { ADD_RECORD, ALL_RECORD, CLEAR_CURRENT_RECORD, CURRENT_RECORD, DELETE_RECORD, FILTER_RECORD, GET_RECORD, RECORD_KEY, UPDATE_RECORD,APPEND_FILTER_RECORD, APPEND_ALL_RECORD, CLEAR_FILTERED_RECORD } from "../types"

export default (state,action) => {
    switch(action.type){
        case ALL_RECORD:
            return {
                ...state,
                records:[...action.payload]
            };
        case APPEND_ALL_RECORD:
            return{
                ...state,
                records:[...state.records,...action.payload]
            }
        case FILTER_RECORD:
            return {
                ...state,
                filtered:action.payload
            };
        case APPEND_FILTER_RECORD:
            return {
                ...state,
                filtered:[...state.records,...action.payload]
            };
        case ADD_RECORD:
            return {
                ...state,
                records:[action.payload,...state.records]
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
        case CLEAR_FILTERED_RECORD:
            return {
                ...state,
                filtered:[]
            }
        default:
            throw new Error('unspported type')
    }
}