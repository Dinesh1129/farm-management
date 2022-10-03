import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,TextInput,Button} from 'react-native'
import tw from 'twrnc'

export const MyButton = ({value="Add/Edit",cb={}}) => {
    return (
        <TouchableOpacity style={tw `mt-4 py-1 px-2 w-full bg-[#3b82f6] rounded-lg`} onPress={() => cb()}>
            <Text style={tw `text-center text-lg font-semibold text-white`}>{value}</Text>
        </TouchableOpacity>
    )
}

const AddEditTractor = () => {
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
                    keyboardType='numeric'
                    placeholder='Size'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='default'
                    placeholder='Model'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='default'
                    placeholder='Color'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='default'
                    placeholder='Company'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <TextInput 
                    keyboardType='default'
                    placeholder='Register Number'
                    placeholderTextColor={'#9ca3af'}
                    style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                />
                <MyButton />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AddEditTractor