import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,Button,ScrollView,ToastAndroid,ActivityIndicator,Alert} from 'react-native'
import tw from 'twrnc'
import { MyButton } from '../Tractors/AddEditTractor'
import {TextInput} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { addFarm,clear_current_Farm,deleteFarm,updateFarm,useFarm } from '../../components/contexts/Farms/farmState'

const AddEditFarm = ({route}) => {
    const navigation = useNavigation()
    const [Name,setName] = useState("")
    const [place,setPlace] = useState("")
    const [id,setId] = useState("")
    const [farmState,dispatch] = useFarm()
    const [loading,setloading] = useState(false)
    var type = route.params?.type
    useEffect(() => {
        const current = farmState.current
        if(type=="edit"){
                    setId(current._id)
                    setName(current.farmername)
                    setPlace(current.place)
               }
               else{
                setId(uuid.v4())
               }
       },[])
       const OnSubmit = async () => {
        if(Name.trim() === "" || place.trim()=== ""){
            ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
            return
        }
        const farm = {
            id,
            farmername:Name,
            place
        }
        setloading(true)
        let res
        if(type=="edit"){
           res= await updateFarm(farm.id,farm,dispatch)
        }else{
          res=await addFarm(farm,dispatch)
        }
        if(res.status=="success"){
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
            setloading(false)
            clear_current_Farm(dispatch)
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
                        res = await deleteFarm(id,dispatch)
                        setloading(false)
                        if(res.status=="success"){
                            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                            clear_current_Farm(dispatch)
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
                        label={'Famer Name*'}
                        placeholder='Farmer Name*'
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={Name}
                        onChangeText={setName}
                    />
                    
                    <TextInput 
                        keyboardType='default'
                        mode='outlined'
                        placeholder='Place*'
                        label={'Place*'}
                        placeholderTextColor={'#9ca3af'}
                        style={tw `mt-2`}
                        value={place}
                        onChangeText={setPlace}
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

export default AddEditFarm