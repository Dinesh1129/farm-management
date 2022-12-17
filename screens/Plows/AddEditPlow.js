import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,Button,ScrollView,ToastAndroid,ActivityIndicator,Alert} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'
import {TextInput} from 'react-native-paper'
import { addPlow, clear_current_Plow, deletePlow, updatePlow, usePlow } from '../../components/contexts/plows/plowState'
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid'

const AddEditPlow = ({route}) => {
    const navigation = useNavigation()
    const [plowState,dispatch] = usePlow()
    const [id,setId] = useState("")
    const [Name,setName] = useState("")
    const [Type,setType] = useState("")
    const [loading,setloading] = useState(false)
    
   var type = route.params?.type

   useEffect(() => {
    const current = plowState.current
    if(type=="edit"){
                setId(current._id)
                setName(current.name)
                setType(current.type)
           }
           else{
            setId(uuid.v4())
           }
   },[])
   const OnSubmit = async () => {
    if(Name.trim() === "" || Type.trim()=== ""){
        ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
        return
    }
    const plow = {
        id,
        name:Name,
        type:Type
    }
    setloading(true)
    let res
    if(type=="edit"){
       res= await updatePlow(plow.id,plow,dispatch)
    }else{
      res=await addPlow(plow,dispatch)
    }
    if(res.status=="success"){
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        setloading(false)
        clear_current_Plow(dispatch)
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
                    res = await deletePlow(id,dispatch)
                    setloading(false)
                    if(res.status=="success"){
                        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                        clear_current_Plow(dispatch)
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
                        mode='outlined'
                        label={'Name*'}
                        placeholder='Name*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={Name}
                        onChangeText={setName}
                    />
                    
                    <TextInput 
                        keyboardType='default'
                        mode='outlined'
                        placeholder='Type*'
                        label={'Type*'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={Type}
                        onChangeText={setType}
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

export default AddEditPlow