import React, { useEffect } from 'react'
import {View,Text,TouchableOpacity,SafeAreaView} from 'react-native'
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'
import { getDrivers, useDriver } from '../../components/contexts/driver/driverState'
import { getTractors, useTractor } from '../../components/contexts/Tractors/tractorState'
import { getPlows, usePlow } from '../../components/contexts/plows/plowState'

const Menu = () => {
    const navigation = useNavigation()
    const [driverstate,driverDispatch] = useDriver()
    const [tractorstate,tractorDispatch] = useTractor()
    const [plowstate,plowDispatch] = usePlow()

    useEffect(() => {
        getDrivers(driverDispatch)
        getTractors(tractorDispatch)
        getPlows(plowDispatch)
    },[])
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
    <View style={tw `h-full w-full flex flex-col`}>
        <View style={tw `m-2 p-2 flex flex-col`}>
            <Text style={tw `text-center font-bold text-lg text-black`}>Menu</Text>
            <View style={tw `mt-2 flex flex-row flex-wrap justify-around`}>
                <TouchableOpacity style={tw `mt-2 h-[150px] w-[150px] bg-[#fcba03] justify-center items-center flex flex-row`} onPress={() => navigation.navigate('records-menu')}>
                    <Text style={tw `text-center text-black`}>Records</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw `mt-2 h-[150px] w-[150px] bg-[#fcba03] justify-center items-center flex flex-row`} onPress={() => navigation.navigate('drivers')}>
                    <Text style={tw `text-center text-black`}>Drivers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw `mt-2 h-[150px] w-[150px] bg-[#fcba03] justify-center items-center flex flex-row`} onPress={() => navigation.navigate('tractors')}>
                    <Text style={tw `text-center text-black`}>Tractors</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw `mt-2 h-[150px] w-[150px] bg-[#fcba03] justify-center items-center flex flex-row`} onPress={() => navigation.navigate('plows')}>
                    <Text style={tw `text-center text-black`}>Plows</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw `mt-2 h-[150px] w-[150px] bg-[#fcba03] justify-center items-center flex flex-col`}>
                    <Text style={tw `text-center text-black`}>Search</Text>
                    <Text style={tw `text-center text-black`}>Records</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </SafeAreaView>
  )
}

export default Menu