import AsyncStorage from "@react-native-async-storage/async-storage"
import React,{useContext,useReducer} from "react"
import { ADD_FARM,GET_FARM,ALL_FARM,CURRENT_FARM,UPDATE_FARM,DELETE_FARM,SERVER, CLEAR_CURRENT_FARM } from "../types"
import FarmContext from "./farmContext"
import FarmReducer from "./farmReducer"


export const useFarm = () => {
    const {state,dispatch} = useContext(FarmContext)
    return [state,dispatch]
}

export const getFarms = async(dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`${SERVER}/farms/user/${userid}`)
        if(res.status!=200){
            return false
        }
        const data = await res.json()
            
        dispatch({
            type: ALL_FARM,
            payload:data
        })
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const getFarm = async(id,dispatch) => {
    try {
        const res = await fetch(`${SERVER}/farms/${id}`)
        if(res.status!=200){
            return false
        }
        const data = await res.json()
        
        dispatch({
            type:GET_FARM,
            payload:data
        })
        return {status:"success"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const addFarm = async(farm,dispatch) => {
    try {
        const userid = await AsyncStorage.getItem("userid")
        const res = await fetch(`${SERVER}/farms/add`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
               ...farm,
                userid
            })
        })
        if(res.status!=201){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type: ADD_FARM,
            payload:data
        })
        return {status:"success",msg:"Added Successfully"}
    } catch (error) {
        return {status:"success",msg:error.msg}
    }
}

export const updateFarm = async (id,farm,dispatch) => {
    try {
       const userid = await AsyncStorage.getItem("userid")
       const res = await fetch(`${SERVER}/farms/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            ...farm,
            userid
        })
       })
       if(res.status!=201){
            throw await res.json()
       }
       const data = await res.json()
        dispatch({
            type:UPDATE_FARM,
            payload:data
        })
        return {status:"success",msg:"Updated Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const deleteFarm = async (id,dispatch) => {
    try {
        const res = await fetch(`${SERVER}/farms/${id}`,{
            method: "DELETE"
        })
        if(res.status!=200){
            throw await res.json()
        }
        const data = await res.json()
        dispatch({
            type:DELETE_FARM,
            payload:data._id
        })
        return {status:"success",msg:"Deleted Successfully"}
    } catch (error) {
        return {status:"fail",msg:error.msg}
    }
}

export const setCurrentFarm = (plow,dispatch) => {
    dispatch({
        type:CURRENT_FARM,
        payload:plow
    })
}

export const clear_current_Farm = (dispatch) => {
    dispatch({
        type:CLEAR_CURRENT_FARM
    })
}

const FarmState = ({children}) => {
    const initialState = {
        farms:[],
        current:null,
        errors:null,
        filtered:null
    }
    const [state,dispatch] = useReducer(FarmReducer,initialState)

    return (
        <FarmContext.Provider value={{ state,dispatch }}>
            {children}
        </FarmContext.Provider>
    )
}

export default FarmState