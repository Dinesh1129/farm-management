import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useReducer } from "react"
import UserContext from "./userContext"
import UserReducer from "./userReducer"
import {SERVER} from '../types'

export const useloginAuth = () => {
    const {state,dispatch} = useContext(UserContext)
    return {state,dispatch}
}

export const login = async(email,password) => {
    try {
        const res = await fetch(`${SERVER}/user/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    if(res.status!=200){
        throw await res.json()
    }
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json()
    await AsyncStorage.setItem("userid",data._id)
    
    return {status:"success",msg:"Login Success"}
    } catch (error) {
        return {status:"fail",msg:error?.msg}
        return false
    }
}

export const register = async(email,password,phone,name) => {
    try {
        const res = await fetch(`${SERVER}/user/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
            password,
            phone,
            name
        })
    })
    if(res.status!=201)
    {
        throw await res.json()
    }
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json();
    await AsyncStorage.setItem("userid",data._id)
    return {status:"success",msg:"regsitration success"}
    } catch (error) {
        
        return {status:"fail",msg:error?.msg}
    }
}

const UserState = ({children}) => {
    const inititalState = {
        user:null,
        error:null
    }
    const {state,dispatch} = useReducer(UserReducer,inititalState)
    return (
        <UserContext.Provider value={{state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState