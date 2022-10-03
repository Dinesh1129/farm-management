import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { getDriver, setCurrentDriver, useDriver } from '../../components/contexts/driver/driverState'


const tractors = ['TractorA','TractorB','TractorC']

export const RenderView = ({item,location}) => {
    const navigation = useNavigation()
    const [driverstate,dispatch] = useDriver()
    const MovetoNext = async() => {
       await getDriver(item.id,dispatch)
        navigation.navigate(location,{type:"edit"})
    }
    
    return (
        <TouchableOpacity style={tw `mt-1 w-full h-max py-2 px-1 flex flex-row justify-between`} onPress={() => MovetoNext()}>
            <Text style={tw `font-semibold text-md`}>{item.name?item.name : item}</Text>
            <MI name={'edit'} size={25} color={'black'}/>
        </TouchableOpacity>
    )
}

const Tractors = () => {
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
    <View style={tw `h-full w-full p-2`}>
        {/* <FlatList 
            data={tractors}
            keyExtractor={e =>e}
            renderItem={RenderView}
        /> */}
        {tractors.map(val => <RenderView key={val} item={val} location={'tractors-edit'}/>)}
    </View>
    </SafeAreaView>
  )
}

export default Tractors