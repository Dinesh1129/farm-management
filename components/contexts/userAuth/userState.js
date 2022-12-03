import { useContext, useReducer } from "react"
import UserContext from "./userContext"
import UserReducer from "./userReducer"

export const useloginAuth = () => {
    const {state,dispatch} = useContext(UserContext)
    return {state,dispatch}
}

export const login = async(email,password) => {
    console.log(email,password)
    try {
        const res = await fetch('http://192.168.0.106:5000/user/login',{
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
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json();
    console.log(data)
    return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const register = async(email,password,phone,name) => {
    console.log(email,password)
    try {
        const res = await fetch('http://192.168.0.106:5000/user/register',{
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
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json();
    console.log(data)
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