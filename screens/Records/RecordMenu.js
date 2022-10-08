import React from 'react'
import {View,ScrollView,SafeAreaView,Text} from 'react-native'
import tw from 'twrnc'

const RecordMenu = () => {
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <Text style={tw `font-bold text-md text-black text-center`}>record menu</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RecordMenu