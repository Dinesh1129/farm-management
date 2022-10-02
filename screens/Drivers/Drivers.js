import React,{useEffect,useState} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { RenderView } from '../Tractors/Tractors'
import { getDrivers, useDriver } from '../../components/contexts/driver/driverState'


// const drivers = ['DriverA','DriverB','DriverC']
const drivers = [{name:"Sample 1",email:"1234@gmail",phone:"123456789",license:"ABC123"},{name:"Sample 2",email:"568@gmail",phone:"4414154415",license:"ABC456"}]

const Drivers = () => {
  const [state,dispatch] = useDriver()

  useEffect(() => {
    
    getDrivers(dispatch)
  },[])
  
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
    <View style={tw `h-full w-full p-2`}>
        {/* <FlatList 
            data={tractors}
            keyExtractor={e =>e}
            renderItem={RenderView}
        /> */}
        {/* {drivers.map(val => <RenderView key={val.name} item={val} location={'drivers-add-edit'}/>)} */}
        {state.drivers?.map(val => <RenderView key={val} item={val} location={'drivers-add-edit'}/>)}
    </View>
    </SafeAreaView>
  )
}

export default Drivers