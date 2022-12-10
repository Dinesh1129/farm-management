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
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/tractors/user/${userid}`)
        if(res.status!=200){
            return false
        }
        const data = await res.json()
        dispatch({
            type: ALL_TRACTOR,
            payload:data
        })
  
    } catch (error) {
        console.log(error,'error in gets tractors')
    }
}

export const getTractor = async(id,dispatch) => {
    try {
       const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/tractors/${id}`)
       if(res.status!=200){
            false
       }
       const data = await res.json()
        dispatch({
            type:GET_TRACTOR,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in get tractor----------')
    }
}

export const addTractor = async (tractor,dispatch) => {
    console.log(tractor)
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/tractors/add`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                ...tractor,
                userid
            })
        })
        
        if(res.status!=201){
            console.log(await res.json())
        }
        const data = await res.json()
        
        dispatch({
            type:ADD_TRACTOR,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in add tractor----------')
    }
} 

export const updateTractor = async (id,tractor,dispatch)=>{
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/tractors/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                ...tractor,
                userid
            })
        })
        if(res.status!=201){
            return false
        }
        const data = await res.json()
        dispatch({
            type:UPDATE_TRACTOR,
            payload:data
        })

    } catch (error) {
        console.log(error,'error in update tractor----------')
    }
}

export const deleteTractor = async (id,dispatch) => {
    try {
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/tractors/${id}`,{
            method:"DELETE"
        })
        if(res.status!=200){
            return false
        }
        const data = await res.json()
        dispatch({
            type:DELETE_TRACTOR,
            payload:data._id
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