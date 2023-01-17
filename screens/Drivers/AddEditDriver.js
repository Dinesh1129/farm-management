import React,{useState,useEffect} from 'react'
import {View,SafeAreaView,ScrollView,ToastAndroid,ActivityIndicator,Alert} from 'react-native'
import tw from 'twrnc'
import { addDriver, clearCurrentDriver, deleteDriver, updateDriver, useDriver } from '../../components/contexts/driver/driverState'
import { MyButton } from '../Tractors/AddEditTractor'
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid'
import {TextInput} from 'react-native-paper'


const AddEditDriver = ({route}) => {
    const navigation = useNavigation()
    const [driverstate,dispatch] = useDriver()
   
    const [id,setId] = useState("")
    const [Name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setphone] = useState("")
    const [license,setlicense] = useState("")
    const [loading,setloading] = useState(false)
   var type = route.params?.type

   useEffect(() => {
    const current = driverstate.current
    if(type=="edit"){
                setId(current._id)
                setName(current.name)
                setEmail(current.email)
                setphone(current.phone.toString())
                setlicense(current.license)
           }
           else{
            setId(uuid.v4())
           }
   },[])
   const OnSubmit = async () => {
    if(Name.trim() === "" || license.trim()=== ""){
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
    console.log(driver)
    setloading(true)
    let res
    if(type=="edit"){
        res = await updateDriver(driver.id,driver,dispatch)
    }else{
       res =await addDriver(driver,dispatch)
    }
    if(res.status=="success"){
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        clearCurrentDriver(dispatch)
        setloading(false)
        navigation.goBack()
    }else{
        setloading(false)
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
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
                    res = await deleteDriver(id,dispatch)
                    setloading(false)
                    if(res.status=="success"){
                        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                        clearCurrentDriver(dispatch)
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
                        label={'Name*'}
                        mode={'outlined'}
                        value={Name}
                        style={tw `mt-2`}
                        onChangeText={setName}
                    />
                    <TextInput 
                        keyboardType='email-address'
                        placeholder='Email'
                        label={'Email'}
                        mode={'outlined'}
                        value={email}
                        style={tw `mt-2`}
                        onChangeText={setEmail}
                    />
                    <TextInput 
                        keyboardType='number-pad'
                        placeholder='Phone Number'
                        label={'Phone Number'}
                        mode={'outlined'}
                        value={phone}
                        style={tw `mt-2`}
                        onChangeText={setphone}
                    />
                    <TextInput 
                        keyboardType='default'
                        placeholder='License Number*'
                        label={'License Number*'}
                        mode={'outlined'}
                        value={license}
                        style={tw `mt-2`}
                        onChangeText={setlicense}
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

export default AddEditDriver