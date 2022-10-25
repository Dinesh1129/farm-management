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
            async function quickcall(){
                const data = [...state?.plows,action.payload]
                await AsyncStorage.setItem(PLOW_KEY,JSON.stringify(data))
            }
            quickcall()
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
            async function updatecall(){
                const data = state.plows.map(plow => plow.id === action.payload.id ? {...plow,name:action.payload.name} : plow)
               
                if(data.length>0){
                    await AsyncStorage.setItem(PLOW_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(PLOW_KEY)
                }
                
            }
          updatecall()
            return {
                ...state,
                plows:state.plows.map(plow => plow.id===action.payload.id ? action.payload : plow)
            };
        case DELETE_PLOW:
            async function deletecall(){
                const data = state.plows.filter(plow => plow.id !== action.payload)
                if(data.length>0){
                    await AsyncStorage.setItem(PLOW_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(PLOW_KEY)
                }
                
            }
           deletecall()
            return{
                ...state,
                plows:state.plows.filter(plow => plow.id !== action.payload)
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