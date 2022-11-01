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
            async function quickcall(){
                const data = [...state?.tractors,action.payload]
                await AsyncStorage.setItem(TRACTOR_KEY,JSON.stringify(data))
            }
            quickcall()
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
            async function updatecall(){
                const data = state.tractors.map(tractor => tractor.id === action.payload.id ? {...tractor,name:action.payload.name} : tractor)
                if(data.length>0){
                    await AsyncStorage.setItem(TRACTOR_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(TRACTOR_KEY)
                }
                
            }
          updatecall()
            return{
                ...state,
                tractors:state.tractors.map(tractor => tractor.id===action.payload.id ? action.payload : tractor)
            };
        case DELETE_TRACTOR:
            async function deletecall(){
                const data = state.tractors.filter(tractor => tractor.id !== action.payload)
                if(data.length>0){
                    await AsyncStorage.setItem(TRACTOR_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(TRACTOR_KEY)
                }
                
            }
           deletecall()
            return{
                ...state,
                tractors:state.tractors.filter(tractor => tractor.id !== action.payload)
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