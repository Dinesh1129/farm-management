import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,TextInput,Button,ToastAndroid,ScrollView} from 'react-native'
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'
import { addTractor, clearCurrentTractor, deleteTractor, updateTractor, useTractor } from '../../components/contexts/Tractors/tractorState'
import uuid from 'react-native-uuid'

export const MyButton = ({value="Add/Edit",cb={}}) => {
    return (
        <TouchableOpacity style={tw `mt-4 py-1 px-2 w-full bg-[#3b82f6] rounded-lg`} onPress={() => cb()}>
            <Text style={tw `text-center text-lg font-semibold text-white`}>{value}</Text>
        </TouchableOpacity>
    )
}

const AddEditTractor = ({route}) => {
    const navigation = useNavigation()
    const [tractorState,dispatch] = useTractor()
   
    const [id,setId] = useState("")
    const [Name,setName] = useState("")
    const [Size,setSize] = useState("")
    const [model,setModel] = useState("")
    const [company,setCompany] = useState("")
    const [registrationNumber,setRegistrationNumber] = useState("")
    const [color,setColor] = useState("")
   var type = route.params?.type

   useEffect(() => {
    const current = tractorState.current
    if(type=="edit"){
                setId(current.id)
                setName(current.name)
                setSize(current.size)
                setModel(current.model)
                setCompany(current.company)
                setRegistrationNumber(current.registration)
                setColor(current.color)
           }
           else{
            setId(uuid.v4())
           }
   },[])
   const OnSubmit = () => {
    if(Name.trim() === "" || company.trim()=== "" || registrationNumber.trim()=== ""){
        ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
        return
    }
    const tractor = {
        id,
        name:Name,
        color,
        company,
        model,
        size:Size,
        registration:registrationNumber
    }
    if(type=="edit"){
        updateTractor(tractor.id,tractor,dispatch)
    }else{
        addTractor(tractor.id,tractor,dispatch)
    }
    clearCurrentTractor(dispatch)
    navigation.goBack()
   }

   const OnDelete = () => {
        deleteTractor(id,dispatch)
        clearCurrentTractor(dispatch)
        navigation.goBack()
   }
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `h-full w-full flex flex-col items-center p-2`}>
                <View style={tw `form h-max w-11/12 p-2 flex space-y-2`}>
                    <TextInput 
                        keyboardType='default'
                        placeholder='Name*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={Name}
                        onChangeText={setName}
                    />
                    <TextInput 
                        keyboardType='numeric'
                        placeholder='Size'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={Size}
                        onChangeText={setSize}
                    />
                    <TextInput 
                        keyboardType='default'
                        placeholder='Model'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={model}
                        onChangeText={setModel}
                    />
                    <TextInput 
                        keyboardType='default'
                        placeholder='Color'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={color}
                        onChangeText={setColor}
                    />
                    <TextInput 
                        keyboardType='default'
                        placeholder='Company*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={company}
                        onChangeText={setCompany}
                    />
                    <TextInput 
                        keyboardType='default'
                        placeholder='Register Number*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                    />
                    <MyButton cb={OnSubmit} value={type=="edit"? "Update" : "Add"}/>
                    {type=="edit" && <MyButton cb={OnDelete} value="Delete"/>}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditTractor