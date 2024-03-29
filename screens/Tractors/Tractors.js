import React, { useEffect } from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { getDriver, useDriver } from '../../components/contexts/driver/driverState'
import { getTractor, getTractors, useTractor } from '../../components/contexts/Tractors/tractorState'
import { getPlow, usePlow } from '../../components/contexts/plows/plowState'

export const RenderView = ({item,location}) => {
    const navigation = useNavigation()
    const [driverstate,driverdispatch] = useDriver()
    const [tractorstate,tractordispatch] = useTractor()
    const [plowstate,plowdispatch] = usePlow()
    const MovetoNext = async() => {
       if(location=="drivers-edit"){
        await getDriver(item._id,driverdispatch)
       }else if(location=="tractors-edit"){
        await getTractor(item._id,tractordispatch)
       }else if(location=="plows-edit"){
        await getPlow(item._id,plowdispatch)
       }
       
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
    const [state,dispatch] = useTractor()
    useEffect(() => {
        getTractors(dispatch)
    },[JSON.stringify(state.tractors)])
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `h-full w-full p-2`}>
                {state.tractors?.map(val => <RenderView key={val} item={val} location={'tractors-edit'}/>)}
            </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Tractors