import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,ScrollView} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { getDriver, setCurrentDriver, useDriver } from '../../components/contexts/driver/driverState'
import { getTractor, useTractor } from '../../components/contexts/Tractors/tractorState'
import { getPlow, usePlow } from '../../components/contexts/plows/plowState'


// const tractors = ['TractorA','TractorB','TractorC']



export const RenderView = ({item,location}) => {
    const navigation = useNavigation()
    const [driverstate,driverdispatch] = useDriver()
    const [tractorstate,tractordispatch] = useTractor()
    const [plowstate,plowdispatch] = usePlow()
    const MovetoNext = async() => {
       if(location=="drivers-edit"){
        await getDriver(item.id,driverdispatch)
       }else if(location=="tractors-edit"){
        await getTractor(item.id,tractordispatch)
       }else if(location=="plows-edit"){
        await getPlow(item.id,plowdispatch)
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
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `h-full w-full p-2`}>
                {/* <FlatList 
                    data={tractors}
                    keyExtractor={e =>e}
                    renderItem={RenderView}
                /> */}
                {state.tractors?.map(val => <RenderView key={val} item={val} location={'tractors-edit'}/>)}
            </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Tractors