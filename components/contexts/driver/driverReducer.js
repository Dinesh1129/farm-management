import {ADD_DRIVER,UPDATE_DRIVER,ALL_DRIVER,DELETE_DRIVER,ERROR_DRIVER,GET_DRIVER,CURRENT_DRIVER,CLEAR_CURRENT_DRIVER,DRIVERS_KEY} from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';

const driverReducer = (state,action) => {
    switch(action.type){
        case ALL_DRIVER:
            return {
                ...state,
                drivers:[...action.payload]
            };
        case ADD_DRIVER:
            async function quickcall(){
                const data = [...state?.drivers,action.payload]
                await AsyncStorage.setItem(DRIVERS_KEY,JSON.stringify(data))
            }
            quickcall()
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
                drivers:state.drivers.map(driver => driver.id===action.payload.id ? action.payload : driver)
            };
        case DELETE_DRIVER:
            async function deletecall(){
                const data = state.drivers.filter(driver => driver.id !== action.payload)
                if(data.length>0){
                    await AsyncStorage.setItem(DRIVERS_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(DRIVERS_KEY)
                }
                
            }
           deletecall()
            return{
                ...state,
                drivers:state.drivers.filter(driver => driver.id !== action.payload)
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