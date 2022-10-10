import React,{useState} from 'react'
import {View,SafeAreaView,ScrollView,Text,TouchableOpacity,Button,Modal} from 'react-native'
import tw from 'twrnc'
import {TextInput} from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import DatePicker from 'react-native-date-picker'
import DatePick from './datepick'
import StartTime from './startTime'
import EndTime from './endTime'
import { MyButton } from '../Tractors/AddEditTractor'

const driverlist = [
    {
        label:"Driver A",
        value: "Driver A"
    },
    {
        label:"Driver B",
        value: "Driver B"
    },
    {
        label:"Driver C",
        value: "Driver C"
    },
]

const tractorlist = [
    {
        label:"Tractor A",
        value: "Tractor A"
    },
    {
        label:"Tractor B",
        value: "Tractor B"
    },
    {
        label:"Tractor C",
        value: "Tractor C"
    },
]

const plowlist = [
    {
        label:"PLOW A",
        value: "PLOW A"
    },
    {
        label:"PLOW B",
        value: "PLOW B"
    },
    {
        label:"PLOW C",
        value: "PLOW C"
    },
]

const AddEditRecord = () => {
    const [driverdrop,setDriverdrop] = useState(false)
    const [tractordrop,setTractordrop] = useState(false)
    const [plowdrop,setPlowdrop] = useState(false)

    const [driver,setDriver] = useState('')
    const [tractor,setTractor] = useState('')
    const [plow,setPlow] = useState('')

    const [date,setDate] = useState(new Date())
    const [starttime,setStarttime] = useState(new Date())
    const [endtime,setEndtime] = useState(new Date())


    const [modalvisible,setModalVisible] = useState(false)
    const [startmodalVisible,setStartModalVisible] = useState(false)
    const [endmodalVisible,setEndModalVisible] = useState(false)
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `mt-2 w-full px-4 min-h-screen flex flex-col space-y-2`}>
                <TextInput  
                    label={'Place*'}
                    mode={'outlined'}
                    placeholder={'Place'}
                    keyboardType={'default'}
                />
                <DropDown 
                    label='Driver'
                    list={driverlist}
                    mode={'outlined'}
                    visible={driverdrop}
                    showDropDown={() => setDriverdrop(true)}
                    onDismiss={() => setDriverdrop(false)}
                    value={driver}
                    setValue={setDriver}
                    dropDownStyle={tw `mt-2`}
                />
                <DropDown 
                    label='Tractor'
                    list={tractorlist}
                    mode={'outlined'}
                    visible={tractordrop}
                    showDropDown={() => setTractordrop(true)}
                    onDismiss={() => setTractordrop(false)}
                    value={tractor}
                    setValue={setTractor}
                    dropDownStyle={tw `mt-2`}
                />
                <DropDown 
                    label='Plow'
                    list={plowlist}
                    mode={'outlined'}
                    visible={plowdrop}
                    showDropDown={() => setPlowdrop(true)}
                    onDismiss={() => setPlowdrop(false)}
                    value={plow}
                    setValue={setPlow}
                    dropDownStyle={{marginVertical:10}}
                />
                
            
              
              <TextInput 
                mode='outlined'
                label={'Date'}
                value={date.toLocaleDateString()}
                placeholder={'Date'}
                onFocus={() => setModalVisible(true)}
            />
            <TextInput 
                mode='outlined'
                label={'StartTime'}
                value={starttime.toLocaleTimeString()}
                placeholder={'Start Time'}
                onFocus={() => setStartModalVisible(true)}
            />
            <TextInput 
                mode='outlined'
                label={'EndTime'}
                value={endtime.toLocaleTimeString()}
                placeholder={'End Time'}
                onFocus={() => setEndModalVisible(true)}
            />
            <TextInput 
                mode='outlined'
                label={'Break Time in min'}
                placeholder={'Break Time in min'}
                keyboardType={'number-pad'}
            />
            <MyButton cb={() => console.log('clicked')} value="ADD"/>
            
                <DatePick modalVisible={modalvisible} date={date} setDate={setDate} setModalVisible={setModalVisible}/>
                <StartTime setStartModalVisible={setStartModalVisible} startmodalVisible={startmodalVisible} starttime={starttime} setStarttime={setStarttime}/>
                <EndTime endmodalVisible={endmodalVisible} setEndModalVisible={setEndModalVisible} endtime={endtime} setEndtime={setEndtime}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditRecord