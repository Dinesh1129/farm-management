import { ADD_TRACTOR, ALL_TRACTOR, CLEAR_CURRENT_TRACTOR, CURRENT_TRACTOR, DELETE_TRACTOR, GET_TRACTOR, TRACTOR_KEY, UPDATE_TRACTOR } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TractorReducer = (state,action) => {
    switch(action.type){
        case ALL_TRACTOR:
            return {
                ...state,
                tractors:[...action.payload]
            };
        case ADD_TRACTOR:
            return {
                ...state,
                tractors:[...state.tractors,action.payload]
            };
        case GET_TRACTOR:
            return {
                ...state,
                current:action.payload  
            };
        case UPDATE_TRACTOR:
            return{
                ...state,
                tractors:state.tractors.map(tractor => tractor._id===action.payload._id ? action.payload : tractor)
            };
        case DELETE_TRACTOR:
            return{
                ...state,
                tractors:state.tractors.filter(tractor => tractor._id !== action.payload)
            };
        case CURRENT_TRACTOR:
            return {
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT_TRACTOR:
            return {
                ...state,
                current:null
            };
        default:
            throw new Error('unspported type')
    }
}

export default TractorReducer