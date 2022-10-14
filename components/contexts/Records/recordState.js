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
        const json = await AsyncStorage.getItem(RECORD_KEY)
        if(json){
            const data = JSON.parse(json)
            dispatch({
                type: ALL_RECORD,
                payload:data
            })
        }
        
        
        // await AsyncStorage.clear()
    } catch (error) {
        console.log(error,'error in gets records')
    }
}

export const getRecord = async(key,dispatch) => {
    try {
       const json= await AsyncStorage.getItem(key)
       const data = JSON.parse(json)
        dispatch({
            type:GET_RECORD,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in get record----------')
    }
}

export const addRecord = async (key,record,dispatch) => {
    try {
        const json = JSON.stringify(record)
        await AsyncStorage.setItem(key,json)
        const data = {
            id:record.id,
            drivername:record.drivername,
            farmname:record.place,
            date:record.date,
            workMins: record.workmins
        }
        
        dispatch({
            type:ADD_RECORD,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in add record----------')
    }
}

export const updateRecord = async (key,record,dispatch)=>{
    try {
        console.log('in record update method====================================================')
        const json = JSON.stringify(record)
        await AsyncStorage.setItem(key,json)
        dispatch({
            type:UPDATE_RECORD,
            payload:record
        })
    } catch (error) {
        console.log(error,'error in update record----------')
    }
}

export const deleteRecord = async (key,dispatch) => {
    try {
        await AsyncStorage.removeItem(key)
        dispatch({
            type:DELETE_RECORD,
            payload:key
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