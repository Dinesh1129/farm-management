import AsyncStorage from "@react-native-async-storage/async-storage"
import React,{useContext,useReducer} from "react"
import { ADD_PLOW, ALL_PLOW, CLEAR_CURRENT_PLOW, CURRENT_PLOW, DELETE_PLOW, GET_PLOW, PLOW_KEY, UPDATE_PLOW } from "../types"
import PlowContext from "./plowContext"
import PlowReducer from "./plowReducer"


export const usePlow = () => {
    const {state,dispatch} = useContext(PlowContext)
    return [state,dispatch]
}

export const getPlows = async(dispatch) => {
    try {
        const json = await AsyncStorage.getItem(PLOW_KEY)
        
        if(json){
            const data = JSON.parse(json)
            dispatch({
                type: ALL_PLOW,
                payload:data
            })
        }
    } catch (error) {
        console.log('error in getplows ---------',error)
    }
}

export const getPlow = async(key,dispatch) => {
    try {
        const json = await AsyncStorage.getItem(key)
        const data = JSON.parse(json)
        
        dispatch({
            type:GET_PLOW,
            payload:data
        })
    } catch (error) {
        console.log('error in get plow ----------------',error)
    }
}

export const addPlow = async(key,plow,dispatch) => {
    try {
        const json = JSON.stringify(plow)
        await AsyncStorage.setItem(key,json)
       
        const data = {
            id:plow.id,
            name:plow.name
        }
        dispatch({
            type: ADD_PLOW,
            payload:data
        })
    } catch (error) {
        console.log('error in add plow ----------',error)
    }
}

export const updatePlow = async (key,plow,dispatch) => {
    try {
        const json = JSON.stringify(plow)
        await AsyncStorage.setItem(key,json)
        dispatch({
            type:UPDATE_PLOW,
            payload:plow
        })
    } catch (error) {
        console.log('error in update plow -----------------',error)
    }
}

export const deletePlow = async (key,dispatch) => {
    try {
        await AsyncStorage.removeItem(key)
        dispatch({
            type:DELETE_PLOW,
            payload:key
        })
    } catch (error) {
        console.log('error in delete plow ---------------',error)
    }
}

export const setCurrentPlow = (plow,dispatch) => {
    dispatch({
        type:CURRENT_PLOW,
        payload:plow
    })
}

export const clear_current_Plow = (dispatch) => {
    dispatch({
        type:CLEAR_CURRENT_PLOW
    })
}

const PlowState = ({children}) => {
    const initialState = {
        plows:[],
        current:null,
        errors:null,
        filtered:null
    }
    const [state,dispatch] = useReducer(PlowReducer,initialState)

    return (
        <PlowContext.Provider value={{ state,dispatch }}>
            {children}
        </PlowContext.Provider>
    )
}

export default PlowState