import React, { useRef, useState } from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,TextInput,ToastAndroid,ActivityIndicator} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'
import {useNavigation} from '@react-navigation/native'
import { login } from '../../components/contexts/userAuth/userState'

const Login = () => {
    const navigation = useNavigation()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setloading] = useState(false)
  
    const onLogin = async() => {
        if(email.trim()==="" || password.trim()==="")
        {
            ToastAndroid.show("Please enter Required fields",ToastAndroid.SHORT)
            return;
        }
        setloading(true)
      const res = await login(email,password)
      
      if(res.status=="success")
      {
        setloading(false)
        navigation.navigate('menu')
      }else{
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
      }
    }
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <View style={tw `h-full w-full p-5 flex flex-col items-center justify-center`}>
            <Text style={tw `font-bold text-lg text-black`}>Login</Text>
            <View style={tw `form h-max w-11/12 p-2 flex space-y-2`}>
                <TextInput 
                    keyboardType='default'
                    placeholder='Email'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    onChangeText={setEmail}
                    value={email}
                />
               
                <TextInput 
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholder='Password'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    onChangeText={setPassword}
                    value={password}
                />
                <MyButton value='Login' cb={() => onLogin()}/>
                <ActivityIndicator animating={false} size="large" />
            </View>
            <TouchableOpacity style={tw `mt-2`} onPress={() => navigation.navigate('register')}>
                <Text style={tw `text-[#2563eb] font-semibold text-lg`}>Don't have an Account?</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Login