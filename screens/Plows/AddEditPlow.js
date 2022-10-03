import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,TextInput,Button} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'

const AddEditPlow = () => {
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <View style={tw `h-full w-full flex flex-col items-center p-2`}>
            <View style={tw `form h-max w-11/12 p-2 flex space-y-2`}>
                <TextInput 
                    keyboardType='default'
                    placeholder='Name'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                
                <TextInput 
                    keyboardType='default'
                    placeholder='Type'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <MyButton />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AddEditPlow