import React,{useEffect} from 'react'
import {View,SafeAreaView,ScrollView} from 'react-native'
import tw from 'twrnc'
import { RenderView } from '../Tractors/Tractors'
import { getDrivers, useDriver } from '../../components/contexts/driver/driverState'


const Drivers = () => {
  const [state,dispatch] = useDriver()

  useEffect(() => {
    
    getDrivers(dispatch)
  },[JSON.stringify(state.drivers)])
  
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
      <ScrollView style={tw `min-h-screen w-full`}>
        <View style={tw `h-full w-full p-2`}>
            {state.drivers?.map(val => <RenderView key={val} item={val} location={'drivers-edit'}/>)}
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Drivers