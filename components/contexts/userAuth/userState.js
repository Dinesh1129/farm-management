import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useReducer } from "react"
import UserContext from "./userContext"
import UserReducer from "./userReducer"

export const useloginAuth = () => {
    const {state,dispatch} = useContext(UserContext)
    return {state,dispatch}
}

export const login = async(email,password) => {
    try {
        const res = await fetch('https://tractrack.netlify.app/.netlify/functions/api/user/login',{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    if(res.status!=200){
        throw new Error(await res.json().msg)
    }
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json();
    console.log(data)

    await AsyncStorage.setItem("userid",data._id)
    
    return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const register = async(email,password,phone,name) => {
    try {
        const res = await fetch('https://tractrack.netlify.app/.netlify/functions/api/user/register',{
        method:'POST',
        headers:{
            Accept: 'application/json',
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
        throw new Error(await res.json())
    }
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json();
    return true
    } catch (error) {
        console.log(error)
        return false
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