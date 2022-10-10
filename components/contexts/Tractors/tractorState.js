import React,{useReducer,useContext} from 'react'
import { ADD_TRACTOR, ALL_TRACTOR, CLEAR_CURRENT_TRACTOR, CURRENT_TRACTOR, DELETE_TRACTOR, GET_TRACTOR, TRACTOR_KEY, UPDATE_TRACTOR } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TractorReducer from './tractorReducer'
import TractorContext from './TractorContext'


export const useTractor = () => {
    const {state,dispatch} = useContext(TractorContext)
    return [state,dispatch]
}

export const getTractors = async(dispatch) => {
    try {
        // const keys = await AsyncStorage.getAllKeys()
        // const json = await AsyncStorage.multiGet([...keys])
        // const data = json.map(arr => JSON.parse(arr[1]))
        // console.log(data,'data in get drivers--------------')
        const json = await AsyncStorage.getItem(TRACTOR_KEY)
        if(json){
            const data = JSON.parse(json)
            dispatch({
                type: ALL_TRACTOR,
                payload:data
            })
        }
        
        
        // await AsyncStorage.clear()
    } catch (error) {
        console.log(error,'error in gets tractors')
    }
}

export const getTractor = async(key,dispatch) => {
    try {
       const json= await AsyncStorage.getItem(key)
       const data = JSON.parse(json)
        dispatch({
            type:GET_TRACTOR,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in get tractor----------')
    }
}

export const addTractor = async (key,tractor,dispatch) => {
    try {
        const json = JSON.stringify(tractor)
        await AsyncStorage.setItem(key,json)
        const data = {
            id:tractor.id,
            name:tractor.name
        }
        
        dispatch({
            type:ADD_TRACTOR,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in add tractor----------')
    }
} 

export const updateTractor = async (key,tractor,dispatch)=>{
    try {
        const json = JSON.stringify(tractor)
        await AsyncStorage.setItem(key,json)
        dispatch({
            type:UPDATE_TRACTOR,
            payload:tractor
        })

    } catch (error) {
        console.log(error,'error in update tractor----------')
    }
}

export const deleteTractor = async (key,dispatch) => {
    try {
        await AsyncStorage.removeItem(key)
        dispatch({
            type:DELETE_TRACTOR,
            payload:key
        })
    } catch (error) {
        
    }
}

export const setCurrentTractor = (tractor,dispatch) => {
    
        dispatch({
            type: CURRENT_TRACTOR,
            payload:tractor
        })
    
}

export const clearCurrentTractor = (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_TRACTOR
    })
}



const TractorState = ({children}) => {
    const initialState = {
        tractors: [],
        current:null,
        filterred:null,
        error:null
    }

    const [state,dispatch] = useReducer(TractorReducer,initialState)

    return (
        <TractorContext.Provider value={{state,dispatch}}>
            {children}
        </TractorContext.Provider>
    )
}

export default TractorState