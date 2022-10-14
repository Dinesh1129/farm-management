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
            async function quickcall(){
                const data = [...state?.records,action.payload]
                await AsyncStorage.setItem(RECORD_KEY,JSON.stringify(data))
            }
            quickcall()
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
            async function updatecall(){
                const data = state.records.map(record => record.id === action.payload.id ? {...record,drivername:action.payload.drivername,farmname:action.payload.place,date:action.payload.date,workMins: action.payload.workmins} : record)
                console.log('changing data, ',data)
                if(data.length>0){
                    await AsyncStorage.setItem(RECORD_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(RECORD_KEY)
                }
                
            }
            updatecall()
            return{
                ...state,
                records:state.records.map(record => record.id===action.payload.id ? action.payload : record)
            };
        case DELETE_RECORD:
            async function deletecall(){
                const data = state.records.filter(record => record.id !== action.payload)
                if(data.length>0){
                    await AsyncStorage.setItem(RECORD_KEY,JSON.stringify(data))
                }else{
                    await AsyncStorage.removeItem(RECORD_KEY)
                }
                
            }
            deletecall()
            return{
                ...state,
                records:state.records.filter(record => record.id !== action.payload)
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