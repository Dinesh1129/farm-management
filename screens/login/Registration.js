import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,TextInput} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'
import {useNavigation} from '@react-navigation/native'

const Registration = () => {
    const navigation = useNavigation()
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
                />

                <TextInput 
                    keyboardType='default'
                    placeholder='Email'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                
                <TextInput 
                    keyboardType='visible-password'
                    placeholder='Password'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='visible-password'
                    placeholder='Confirm Password'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <MyButton value='Sign Up' cb={() => navigation.navigate('menu')}/>
            </View>
            <TouchableOpacity style={tw `mt-2`} onPress={() => navigation.navigate('login')}>
                <Text style={tw `text-[#2563eb] font-semibold text-lg`}>Already have an Account?</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Registration