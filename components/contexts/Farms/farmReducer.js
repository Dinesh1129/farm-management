import { ADD_FARM,GET_FARM,ALL_FARM,CURRENT_FARM,UPDATE_FARM,DELETE_FARM,SERVER, CLEAR_CURRENT_FARM } from "../types"
const FarmReducer = (state,action) => {
    switch(action.type){
        case ALL_FARM:
            return {
                ...state,
                farms:[...action.payload]
            };
        case ADD_FARM:
            return {
                ...state,
                farms:[...state.farms,action.payload]
            };
        case GET_FARM:
            return {
                ...state,
                current:action.payload
            };
        case UPDATE_FARM:
            return {
                ...state,
                farms:state.farms.map(farm => farm._id===action.payload._id ? action.payload : farm)
            };
        case DELETE_FARM:
            return {
                ...state,
                farms:state.farms.filter(farm => farm._id !== action.payload)
            };
        case CURRENT_FARM:
            return {
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT_FARM:
            return {
                ...state,
                current:null
            };
        default:
            throw new Error('unspported type')
    }
}

export default FarmReducer