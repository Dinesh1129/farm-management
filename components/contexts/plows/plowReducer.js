import { ADD_PLOW, ALL_PLOW, CLEAR_CURRENT_PLOW, CURRENT_PLOW, DELETE_PLOW, GET_PLOW, PLOW_KEY, UPDATE_PLOW } from "../types"
import AsyncStorage from "@react-native-async-storage/async-storage"
const PlowReducer =  (state,action) => {
    switch(action.type){
        case ALL_PLOW:
            return {
                ...state,
                plows:[...action.payload]
            };
        case ADD_PLOW:
            return {
                ...state,
                plows:[...state.plows,action.payload]
            };
        case GET_PLOW:
            return {
                ...state,
                current:action.payload
            };
        case UPDATE_PLOW:
            return {
                ...state,
                plows:state.plows.map(plow => plow._id===action.payload._id ? action.payload : plow)
            };
        case DELETE_PLOW:
            return{
                ...state,
                plows:state.plows.filter(plow => plow._id !== action.payload)
            };
        case CURRENT_PLOW:
            return {
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT_PLOW:
            return {
                ...state,
                current:null
            };
        default:
            throw new Error('unspported type')
    }
}

export default PlowReducer