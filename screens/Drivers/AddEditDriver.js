import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,TextInput,Button} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'

const AddEditDriver = () => {
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <View style={tw `h-full w-full flex flex-col items-center p-2`}>
            <Text style={tw `font-bold text-lg`}>ADD / EDIT Tractors</Text>
            <View style={tw `form h-max w-11/12 p-2 flex space-y-2`}>
                <TextInput 
                    keyboardType='default'
                    placeholder='Name'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='email-address'
                    placeholder='Email'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='number-pad'
                    placeholder='Phone Number'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='default'
                    placeholder='License Number'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <MyButton />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AddEditDriver