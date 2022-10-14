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
        // const keys = await AsyncStorage.getAllKeys()
        // const json = await AsyncStorage.multiGet([...keys])
        // const data = json.map(arr => JSON.parse(arr[1]))
        // console.log(data,'data in get drivers--------------')
        const json = await AsyncStorage.getItem(DRIVERS_KEY)
        if(json){
            const data = JSON.parse(json)
            dispatch({
                type: ALL_DRIVER,
                payload:data
            })
        }
        
        
        // await AsyncStorage.clear()
    } catch (error) {
        console.log(error,'error in gets drivers')
    }
}

export const getDriver = async(key,dispatch) => {
    try {
       const json= await AsyncStorage.getItem(key)
       const data = JSON.parse(json)
        dispatch({
            type:GET_DRIVER,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in get driver----------')
    }
}

export const addDriver = async (key,driver,dispatch) => {
    try {
        const json = JSON.stringify(driver)
        await AsyncStorage.setItem(key,json)
        const data = {
            id:driver.id,
            name:driver.name
        }
        
        dispatch({
            type:ADD_DRIVER,
            payload:data
        })
    } catch (error) {
        console.log(error,'error in add driver----------')
    }
} 

export const updateDriver = async (key,driver,dispatch)=>{
    try {
        const json = JSON.stringify(driver)
        await AsyncStorage.setItem(key,json)
        dispatch({
            type:UPDATE_DRIVER,
            payload:driver
        })
    } catch (error) {
        console.log(error,'error in update driver----------')
    }
}

export const deleteDriver = async (key,dispatch) => {
    try {
        await AsyncStorage.removeItem(key)
        dispatch({
            type:DELETE_DRIVER,
            payload:key
        })
    } catch (error) {
        console.log(error,'error in delete driver----------')
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