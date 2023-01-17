import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,Button,ToastAndroid,ScrollView,ActivityIndicator,Alert} from 'react-native'
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'
import { addTractor, clearCurrentTractor, deleteTractor, updateTractor, useTractor } from '../../components/contexts/Tractors/tractorState'
import uuid from 'react-native-uuid'
import {TextInput} from 'react-native-paper'

export const MyButton = ({value="Add/Edit",cb={}}) => {
    return (
        <TouchableOpacity style={tw `mt-4 mb-3 py-1 px-2 w-full bg-[#3b82f6] rounded-lg`} onPress={() => cb()}>
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
    const [loading,setloading] = useState(false)
   var type = route.params?.type

   useEffect(() => {
    const current = tractorState.current
    if(type=="edit"){
                setId(current._id)
                setName(current.name)
                setSize(current.size)
                setModel(current.model)
                setCompany(current.company)
                setRegistrationNumber(current.registrationnumber)
                setColor(current.color)
           }
           else{
            setId(uuid.v4())
           }
   },[])
   const OnSubmit = async() => {
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
        registrationnumber:registrationNumber
    }
    setloading(true)
    let res
    if(type=="edit"){
      res =await  updateTractor(tractor.id,tractor,dispatch)
    }else{
       res = await addTractor(tractor,dispatch)
    }
    if(res.status=="success"){
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        setloading(false)
        clearCurrentTractor(dispatch)
        navigation.goBack()
    }else{
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        setloading(false)
    }
    
   }

   const deleteConfirmation = async () => {
    let res
    Alert.alert(
        "Delete Confirmation",
        `Are You sure,${Name} will permanently deleted ?`,
        [
            {
                text:"Cancel",
                style:"cancel",
                onPress:() => {}
            },
            {
                text:"Delete",
                style:"destructive",
                onPress:async() =>{
                    setloading(true)
                    res = await deleteTractor(id,dispatch)
                    setloading(false)
                    if(res.status=="success"){
                        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                        clearCurrentTractor(dispatch)
                        navigation.goBack()
                    }
                    else{
                        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                    }
                }
            }
        ]
    )
    
}

   const OnDelete = async() => {
        await deleteConfirmation()
   }
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `h-full w-full flex flex-col items-center p-2`}>
                <View style={tw `form h-max w-11/12 p-2 flex space-y-2`}>
                    <TextInput 
                        keyboardType='default'
                        placeholder='Name*'
                        mode='outlined'
                        label={'Name*'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={Name}
                        onChangeText={setName}
                    />
                    <TextInput 
                        keyboardType='numeric'
                        mode='outlined'
                        placeholder='Size'
                        label={'Size'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={Size}
                        onChangeText={setSize}
                    />
                    <TextInput 
                        keyboardType='default'
                        mode='outlined'
                        placeholder='Model'
                        label={'Model'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={model}
                        onChangeText={setModel}
                    />
                    <TextInput 
                        keyboardType='default'
                        mode='outlined'
                        placeholder='Color'
                        label={'Color'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={color}
                        onChangeText={setColor}
                    />
                    <TextInput 
                        keyboardType='default'
                        mode='outlined'
                        placeholder='Company*'
                        label={'Company*'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={company}
                        onChangeText={setCompany}
                    />
                    <TextInput 
                        keyboardType='default'
                        mode='outlined'
                        placeholder='Register Number*'
                        label={'Register Number*'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                    />
                    <MyButton cb={OnSubmit} value={type=="edit"? "Update" : "Add"}/>
                    {type=="edit" && <MyButton cb={OnDelete} value="Delete"/>}
                    <ActivityIndicator animating={loading} size="large" />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditTractor