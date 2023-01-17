import {ADD_DRIVER,UPDATE_DRIVER,ALL_DRIVER,DELETE_DRIVER,ERROR_DRIVER,GET_DRIVER,CURRENT_DRIVER,CLEAR_CURRENT_DRIVER,DRIVERS_KEY} from '../types'

const driverReducer = (state,action) => {
    switch(action.type){
        case ALL_DRIVER:
            return {
                ...state,
                drivers:[...action.payload]
            };
        case ADD_DRIVER:
            return {
                ...state,
                drivers:[...state.drivers,action.payload]
            };
        case GET_DRIVER:
            return {
                ...state,
                current:action.payload  
            };
        case UPDATE_DRIVER:
            return{
                ...state,
                drivers:state.drivers.map(driver => driver._id===action.payload._id ? action.payload : driver)
            };
        case DELETE_DRIVER:
            return{
                ...state,
                drivers:state.drivers.filter(driver => driver._id !== action.payload)
            };
        case CURRENT_DRIVER:
            return {
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT_DRIVER:
            return {
                ...state,
                current:null
            };
        default:
            throw new Error('unspported type')
    }
}

export default driverReducer