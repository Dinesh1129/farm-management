import React,{useEffect} from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { RenderView } from '../Tractors/Tractors'
import { usePlow } from '../../components/contexts/plows/plowState'

const plows = ['PlowA','PlowB','PlowC']

const Plows = () => {
  const [state,dispatch] = usePlow()
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
    <View style={tw `h-full w-full p-2`}>
        {/* <FlatList 
            data={tractors}
            keyExtractor={e =>e}
            renderItem={RenderView}
        /> */}
        {/* {plows.map(val => <RenderView key={val} item={val} location={'plows-edit'}/>)} */}
        {state.plows?.map(val => <RenderView key={val} item={val} location={'plows-edit'}/>)}
    </View>
    </SafeAreaView>
  )
}

export default Plows