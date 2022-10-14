import React,{useEffect, useState,useMemo} from 'react'
import {View,SafeAreaView,ScrollView,Text,TouchableOpacity,Button,Modal,ToastAndroid} from 'react-native'
import tw from 'twrnc'
import {TextInput} from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import DatePicker from 'react-native-date-picker'
import DatePick from './datepick'
import StartTime from './startTime'
import EndTime from './endTime'
import { MyButton } from '../Tractors/AddEditTractor'
import uuid from 'react-native-uuid'
import {useNavigation} from '@react-navigation/native'
import {useDriver} from '../../components/contexts/driver/driverState'
import { useTractor } from '../../components/contexts/Tractors/tractorState'
import { usePlow } from '../../components/contexts/plows/plowState'
import { addRecord, clearCurrentRecord, deleteRecord, updateRecord, useRecord } from '../../components/contexts/Records/recordState'

// const driverlist = [
//     {
//         label:"Driver A",
//         value: "Driver A"
//     },
//     {
//         label:"Driver B",
//         value: "Driver B"
//     },
//     {
//         label:"Driver C",
//         value: "Driver C"
//     },
// ]

// const tractorlist = [
//     {
//         label:"Tractor A",
//         value: "Tractor A"
//     },
//     {
//         label:"Tractor B",
//         value: "Tractor B"
//     },
//     {
//         label:"Tractor C",
//         value: "Tractor C"
//     },
// ]

// const plowlist = [
//     {
//         label:"PLOW A",
//         value: "PLOW A"
//     },
//     {
//         label:"PLOW B",
//         value: "PLOW B"
//     },
//     {
//         label:"PLOW C",
//         value: "PLOW C"
//     },
// ]

const AddEditRecord = ({route}) => {
    const [driverstate,driverDispatch] = useDriver()
    const [tractorstate,tractorDispatch] = useTractor()
    const [plowstate,plowDispatch] = usePlow()
    const [recordstate,recordDispatch] = useRecord()

    const navigation = useNavigation()
    
    const [driverlist,setDriverlist] = useState([])
    const [tractorlist,setTractorlist] = useState([])
    const [plowlist,setPlowlist] = useState([])

    const type = route.params?.type

    const [driverdrop,setDriverdrop] = useState(false)
    const [tractordrop,setTractordrop] = useState(false)
    const [plowdrop,setPlowdrop] = useState(false)

    const [driver,setDriver] = useState('')
    const [tractor,setTractor] = useState('')
    const [plow,setPlow] = useState('')
    const [place,setPlace] = useState('')
    const [breakTime,setBreakTime] = useState('')

    const [date,setDate] = useState(new Date())
    const [starttime,setStarttime] = useState(new Date())
    const [endtime,setEndtime] = useState(new Date())
    const [Smins,setSMins]= useState(0)
    const [Emins,setEMins]= useState(0)

    const [id,setId] = useState(uuid.v4())


    const [modalvisible,setModalVisible] = useState(false)
    const [startmodalVisible,setStartModalVisible] = useState(false)
    const [endmodalVisible,setEndModalVisible] = useState(false)

    useEffect(() => {
        const drivers = driverstate.drivers.map(val => ({value:val.name,label:val.name}))
        const tractors = tractorstate.tractors.map(val => ({value:val.name,label:val.name}))
        const plows = plowstate.plows.map(val => ({value:val.name,label:val.name}))
        console.log(driverstate)
        setDriverlist(() => drivers)

        setTractorlist(() => tractors)

        setPlowlist(() => plows)

        if(type=='edit'){
            const current = recordstate.current
            console.log(current)
            setId(current.id)
            setPlace(current.place)
            setDriver(current.drivername)
            setTractor(current.tractor)
            setBreakTime(current.breakTime)
            setPlow(current.plow)
            setDate(new Date(current.date))
            setStarttime(new Date(current.starttime))
            setEndtime(new Date(current.endtime))
        }
    },[])
    
    




    console.log(driverlist)

    

    const onSubmit = () => {
        if(place.trim() === ""){
            ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
            return
        }
        if(starttime>=endtime){
            ToastAndroid.show("Please fill starttime and endtime correctly",ToastAndroid.SHORT)
            return
        }
        const wmilliseconds = Math.abs(endtime-starttime)
        const data = {
            id,
            place,
            drivername:driver,
            tractor,
            plow,
            date:date.toString(),
            starttime:starttime.toString(),
            endtime:endtime.toString(),
            breakTime,
            workmins:(wmilliseconds / (1000 * 60))-breakTime
        }
        if(type=="edit"){
            console.log('starttime ',starttime)
            console.log('endtime',endtime)
            console.log('data mins',data.workmins)
            console.log('willi second',wmilliseconds)
            updateRecord(data.id,data,recordDispatch)
        }else{
            addRecord(data.id,data,recordDispatch)
        }
        clearCurrentRecord(recordDispatch)
        navigation.goBack()
    }

    const OnDelete = () => {
        deleteRecord(id,recordDispatch)
        clearCurrentRecord(recordDispatch)
        navigation.goBack()
   }

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `mt-2 w-full px-4 min-h-screen flex flex-col space-y-2`}>
                <TextInput  
                    label={'Place*'}
                    mode={'outlined'}
                    placeholder={'Place'}
                    keyboardType={'default'}
                    value={place}
                    onChangeText={setPlace}
                />
               {driverlist.length > 0 &&  <DropDown 
                    label='Driver'
                    list={driverlist}
                    mode={'outlined'}
                    visible={driverdrop}
                    showDropDown={() => setDriverdrop(true)}
                    onDismiss={() => setDriverdrop(false)}
                    value={driver}
                    setValue={setDriver}
                    dropDownStyle={tw `mt-2`}
                />}
                {tractorlist.length > 0 && <DropDown 
                    label='Tractor'
                    list={tractorlist}
                    mode={'outlined'}
                    visible={tractordrop}
                    showDropDown={() => setTractordrop(true)}
                    onDismiss={() => setTractordrop(false)}
                    value={tractor}
                    setValue={setTractor}
                    dropDownStyle={tw `mt-2`}
                />}
                {plowlist.length > 0 && <DropDown 
                    label='Plow'
                    list={plowlist}
                    mode={'outlined'}
                    visible={plowdrop}
                    showDropDown={() => setPlowdrop(true)}
                    onDismiss={() => setPlowdrop(false)}
                    value={plow}
                    setValue={setPlow}
                    dropDownStyle={{marginVertical:10}}
                />}
                
            
              <TouchableOpacity style={tw `mt-2 h-max w-full px-2 py-3.5 bg-white border rounded-lg`} onPress={() => setModalVisible(true)}>
                <Text style={tw `text-black`}>{date && date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              
            <TouchableOpacity style={tw `mt-2 h-max w-full px-2 py-3.5 bg-white border rounded-lg`} onPress={() => setStartModalVisible(true)}>
                <Text  style={tw `text-black`}>{starttime &&  starttime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw `mt-2 h-max w-full px-2 py-3.5 bg-white border rounded-lg`} onPress={() => setEndModalVisible(true)}>
                <Text  style={tw `text-black`}>{endtime && endtime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            <TextInput 
                mode='outlined'
                label={'Break Time in min'}
                placeholder={'Break Time in min'}
                keyboardType={'number-pad'}
                value={breakTime}
                onChangeText={setBreakTime}
            />
            <MyButton cb={onSubmit} value={type=="edit" ? "UPDATE": "ADD"}/>
            {type=="edit" && <MyButton cb={OnDelete} value="DELETE"/>}
            
                <DatePick modalVisible={modalvisible} date={date} setDate={setDate} setModalVisible={setModalVisible}/>
                <StartTime setStartModalVisible={setStartModalVisible} startmodalVisible={startmodalVisible} setSMins={setSMins} starttime={starttime} setStarttime={setStarttime}/>
                <EndTime endmodalVisible={endmodalVisible} setEndModalVisible={setEndModalVisible} setEMins={setEMins} endtime={endtime} setEndtime={setEndtime}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditRecord