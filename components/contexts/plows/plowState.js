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
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/plows/user/${userid}`)
        if(res.status!=200){
            return false
        }
        const data = await res.json()
            
        dispatch({
            type: ALL_PLOW,
            payload:data
        })
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const getPlow = async(id,dispatch) => {
    try {
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/plows/${id}`)
        if(res.status!=200){
            return false
        }
        const data = await res.json()
        
        dispatch({
            type:GET_PLOW,
            payload:data
        })
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const addPlow = async(plow,dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/plows/add`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                ...plow,
                userid
            })
        })
        
        if(res.status!=201){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type: ADD_PLOW,
            payload:data
        })
        return {status:"success",msg:"Added Successfully"}
    } catch (error) {
        return {status:"success",msg:error.msg}
    }
}

export const updatePlow = async (id,plow,dispatch) => {
    try {
       const userid = await AsyncStorage.getItem("userid")
       const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/plows/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            ...plow,
            userid
        })
       })
       if(res.status!=201){
            throw await res.json()
       }
       const data = await res.json()
        dispatch({
            type:UPDATE_PLOW,
            payload:data
        })
        return {status:"success",msg:"Updated Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const deletePlow = async (id,dispatch) => {
    try {
        const res = await fetch(`https://tractrack.netlify.app/.netlify/functions/api/plows/${id}`,{
            method: "DELETE"
        })
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type:DELETE_PLOW,
            payload:data._id
        })
        return {status:"success",msg:"Deleted Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
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