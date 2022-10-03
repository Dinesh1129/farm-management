import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,TextInput,Button,ScrollView,ToastAndroid} from 'react-native'
import tw from 'twrnc'
import { addDriver, clearCurrentDriver, deleteDriver, updateDriver, useDriver } from '../../components/contexts/driver/driverState'
import { MyButton } from '../Tractors/AddEditTractor'
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid'


const AddEditDriver = ({route}) => {
    const navigation = useNavigation()
    const [driverstate,dispatch] = useDriver()
   
    const [id,setId] = useState("")
    const [Name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setphone] = useState("")
    const [license,setlicense] = useState("")
   var type = route.params?.type

   useEffect(() => {
    const current = driverstate.current
    if(type=="edit"){
                setId(current.id)
                setName(current.name)
                setEmail(current.email)
                setphone(current.phone)
                setlicense(current.license)
           }
           else{
            setId(uuid.v4())
           }
   },[])
   const OnSubmit = () => {
    if(Name.trim() === "" || phone.trim()=== "" || license.trim()=== ""){
        ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
        return
    }
    const driver = {
        id,
        name:Name,
        email,
        phone,
        license
    }
    if(type=="edit"){
        updateDriver(driver.id,driver,dispatch)
    }else{
        addDriver(driver.id,driver,dispatch)
    }
    clearCurrentDriver(dispatch)
    navigation.goBack()
   }

   const OnDelete = () => {
        deleteDriver(id,dispatch)
        clearCurrentDriver(dispatch)
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
                        keyboardType='email-address'
                        placeholder='Email'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput 
                        keyboardType='number-pad'
                        placeholder='Phone Number*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={phone}
                        onChangeText={setphone}
                    />
                    <TextInput 
                        keyboardType='default'
                        placeholder='License Number*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-4 pl-2 h-[50px] w-full border border-black outline-none rounded-lg`}
                        value={license}
                        onChangeText={setlicense}
                    />
                    {/* <MyButton cb={() => type? UpdateItem(item.name,item): AddItem(item.name)}/> */}
                    <MyButton cb={OnSubmit} value={type=="edit"? "Update" : "Add"}/>
                    {type=="edit" && <MyButton cb={OnDelete} value="Delete"/>}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditDriver