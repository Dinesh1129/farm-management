import React,{useEffect} from 'react'
import {View,SafeAreaView,ScrollView} from 'react-native'
import tw from 'twrnc'
import { RenderView } from '../Tractors/Tractors'
import { getPlows, usePlow } from '../../components/contexts/plows/plowState'



const Plows = () => {
  const [state,dispatch] = usePlow()
  useEffect(() => {
    getPlows(dispatch)
  },[]) 
 
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
      <ScrollView style={tw `min-h-screen w-full`}>
        <View style={tw `h-full w-full p-2`}>
          {state.plows?.map(val => <RenderView key={val} item={val} location={'plows-edit'}/>)}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Plows