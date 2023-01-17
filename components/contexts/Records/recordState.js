import React,{useContext, useReducer} from 'react'
import recordReducer from './recordReducer'
import RecordContext from './recordContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_RECORD, ALL_RECORD, APPEND_ALL_RECORD, APPEND_FILTER_RECORD, CLEAR_CURRENT_RECORD, CLEAR_FILTERED_RECORD, CURRENT_RECORD, DELETE_RECORD, FILTER_RECORD, GET_RECORD, RECORD_KEY, UPDATE_RECORD } from '../types'

export const useRecord = () => {
    const {state,dispatch} = useContext(RecordContext)
    return [state,dispatch]
}

export const getRecords = async(dispatch,start=0) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/user/${userid}?start=${start}`)
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        console.log('record data is',data)
        if(data.length==0){
            return {status:"empty",msg:"No data"}
        }
        if(start>1)
        {
            dispatch({
                type:APPEND_ALL_RECORD,
                payload: data
            })
        }else{
            dispatch({
                type: ALL_RECORD,
                payload:data
            })
        }
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error?.msg}
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
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error?.msg}
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
        return {status:"success",msg:"Added Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
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
        return {status:"success",msg:"Updated Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
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
        return {status:"success",msg:"Deleted Successfully"}
    } catch (error) {
        return {status:"fail",msg:error?.msg}
    }
}

export const filterRecord = async (driver,fromdate,todate,start,dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/records/user/${userid}/filter?start=${start}`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                userid,
                driver,
                fromdate,
                todate
            })
        })
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        if(data.length==0){
            return {status:"empty",msg:"No data"}
        }
        if(start==0)
        {
            dispatch({
                type: FILTER_RECORD,
                payload:data
            })
        }
        else{
            dispatch({
                type: APPEND_FILTER_RECORD,
                payload:data
            })
        }
        return {status:"success",msg:"Filtered Successfully"}
    } catch (error) {
        return {status:"fail",msg:error?.msg}
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

export const clearFilteredRecord = (dispatch) => {
    dispatch({
        type: CLEAR_FILTERED_RECORD
    })
}

const RecordState = ({children}) => {
  const initialState = {
    records:[],
    current:null,
    filtered:[],
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