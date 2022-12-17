import React,{useReducer,useContext} from 'react'
import DriverContext from './driverContext'
import driverReducer from './driverReducer'
import {ADD_DRIVER,UPDATE_DRIVER,ALL_DRIVER,DELETE_DRIVER,ERROR_DRIVER,GET_DRIVER,CURRENT_DRIVER,CLEAR_CURRENT_DRIVER,DRIVERS_KEY} from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'



export const useDriver = () => {
    const {state,dispatch} = useContext(DriverContext)
    return [state,dispatch]
}

export const getDrivers = async(dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        console.log("user id is : ",userid)
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/drivers/user/${userid}`)
        if(res.status!=200){
            return false;
        }
        const data = await res.json()

        if(data){
            dispatch({
                type: ALL_DRIVER,
                payload:data
            })
        }
        
        return {status:"success"}
        
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const getDriver = async(id,dispatch) => {
    try {
        
       const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/drivers/${id}`)
       if(res.status!=200){
            throw await res.json()
       }
       const data = await res.json()
       
        dispatch({
            type:GET_DRIVER,
            payload:data
        })
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const addDriver = async (driver,dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/drivers/add`,{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                ...driver,
                userid
            })
        })
        if(res.status!=201){
            throw await res.json()
        }
        const data = await res.json()

        dispatch({
            type:ADD_DRIVER,
            payload:data
        })
        return {status:"success",msg:"Added Successfully"}
    } catch (error) {
       return {status:"fail",msg:error.msg}
    }
} 

export const updateDriver = async (id,driver,dispatch)=>{
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/drivers/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                ...driver,
                userid
            })
        })
        if(res.status!=201){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type:UPDATE_DRIVER,
            payload:data
        })
        return {status:"success",msg:"Updated Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const deleteDriver = async (id,dispatch) => {
    try {
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/drivers/${id}`,{
            method:"DELETE",
        })
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type:DELETE_DRIVER,
            payload:data._id
        })
        return {status:"success",msg:"Deleted Successfully"}
    } catch (error) {
       return {status:"fail",msg:error?.msg}
    }
}

export const setCurrentDriver = (driver,dispatch) => {
    
        dispatch({
            type: CURRENT_DRIVER,
            payload:driver
        })
    
}

export const clearCurrentDriver = (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_DRIVER
    })
}



const DriverState = ({children}) => {
    const initialState = {
        drivers: [],
        current:null,
        filtered:null,
        error:null
    }

    const [state,dispatch] = useReducer(driverReducer,initialState)

    return (
        <DriverContext.Provider value={{state,dispatch}}>
            {children}
        </DriverContext.Provider>
    )
}

export default DriverState