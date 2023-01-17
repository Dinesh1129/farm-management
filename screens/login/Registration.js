import React, { useState } from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,TextInput, ToastAndroid,ActivityIndicator} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'
import {useNavigation} from '@react-navigation/native'
import { register } from '../../components/contexts/userAuth/userState'

const Registration = () => {
    const navigation = useNavigation()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [name,setName] = useState('')
    const [confpass,setConfpass] = useState('')
    const [loading,setloading] = useState(false)
    const onRegister = async() => {
        if(email.trim()==='' || password.trim()==='' || phone.trim()==='' || name.trim()==='')
        {
            ToastAndroid.show('Please fill required fields',ToastAndroid.SHORT)
            return
        }
        if(password.trim()!==confpass.trim())
        {
            ToastAndroid.show('Please check password',ToastAndroid.SHORT)
            return
        }
        setloading(true)
        const res = await register(email,password,phone,name)
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
            <Text style={tw `font-bold text-lg text-black`}>Register</Text>
            <View style={tw `form h-max w-11/12 p-2 flex space-y-2`}>
            <TextInput 
                    keyboardType='default'
                    placeholder='Username'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    value={name}
                    onChangeText={setName}
                />

                <TextInput 
                    keyboardType='default'
                    placeholder='Email'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    keyboardType='name-phone-pad'
                    placeholder='Phone'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    value={phone}
                    onChangeText={setPhone}
                />
                
                <TextInput
                    secureTextEntry={true} 
                    keyboardType='default'
                    placeholder='Password'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholder='Confirm Password'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                    value={confpass}
                    onChangeText={setConfpass}
                />
                <MyButton value='Sign Up' cb={() => onRegister()}/>
                <ActivityIndicator animating={false} size="large" />
            </View>
            <TouchableOpacity style={tw `mt-2`} onPress={() => navigation.navigate('login')}>
                <Text style={tw `text-[#2563eb] font-semibold text-lg`}>Already have an Account?</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Registration