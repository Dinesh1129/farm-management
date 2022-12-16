import React,{useContext, useReducer} from 'react'
import recordReducer from './recordReducer'
import RecordContext from './recordContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_RECORD, ALL_RECORD, CLEAR_CURRENT_RECORD, CURRENT_RECORD, DELETE_RECORD, GET_RECORD, RECORD_KEY, UPDATE_RECORD } from '../types'

export const useRecord = () => {
    const {state,dispatch} = useContext(RecordContext)
    return [state,dispatch]
}

export const getRecords = async(dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/user/${userid}`)
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type: ALL_RECORD,
            payload:data
        })
            
    } catch (error) {
        console.log(error,'error in gets records')
    }
}

export const getRecord = async(id,dispatch) => {
    try {
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/${id}`)
       if(res.status!=200){
        throw await res.json()
       }
       const data = await res.json()
        dispatch({
            type:GET_RECORD,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in get record----------')
    }
}

export const addRecord = async (record,dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/add`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                ...record,
                userid
            })
        })
        
       if(res.status!=201){
        throw await res.json()
       }
        const data = await res.json()
        dispatch({
            type:ADD_RECORD,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in add record----------')
    }
}

export const updateRecord = async (id,record,dispatch)=>{
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/${id}`,{
            method: "PUT",
            headers:{
                'Content-Type': "application/json"
            },
            body:JSON.stringify({
                ...record,
                userid
            })
        })
        if(res.status!=201){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type:UPDATE_RECORD,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in update record----------')
    }
}

export const deleteRecord = async (id,dispatch) => {
    try {
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/${id}`,{
            method: "DELETE"
        })
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type:DELETE_RECORD,
            payload: data._id
        })
    } catch (error) {
        console.log(error,'error in delete record----------')
    }
}

export const setCurrentRecord = (record,dispatch) => {
    
    dispatch({
        type: CURRENT_RECORD,
        payload:record
    })

}

export const clearCurrentRecord = (dispatch) => {
dispatch({
    type: CLEAR_CURRENT_RECORD
})
}

const RecordState = ({children}) => {
  const initialState = {
    records:[],
    current:null,
    filtered:null,
    error:null
  }
  const [state,dispatch] = useReducer(recordReducer,initialState)

  return (
    <RecordContext.Provider value={{ state,dispatch }}>
        {children}
    </RecordContext.Provider>
  )
}

export default RecordState