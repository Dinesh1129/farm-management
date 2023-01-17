import React,{useEffect} from 'react'
import {View,SafeAreaView,ScrollView} from 'react-native'
import { RenderView } from '../Tractors/Tractors'
import tw from 'twrnc'
import { getFarms,useFarm } from '../../components/contexts/Farms/farmState'

const Farms = () => {
  const [state,dispatch] = useFarm()
  useEffect(() => {
    getFarms(dispatch)
  },[JSON.stringify(state.farms)]) 
 
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
      <ScrollView style={tw `min-h-screen w-full`}>
        <View style={tw `h-full w-full p-2`}>
          {state.farms?.map(val => <RenderView key={val} item={val} location={'farms-edit'}/>)}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Farms