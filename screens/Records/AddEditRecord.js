import React,{useEffect, useState} from 'react'
import {View,SafeAreaView,ScrollView,ToastAndroid} from 'react-native'
import tw from 'twrnc'
import {TextInput} from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
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
import moment from 'moment'



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
    const [breakTime,setBreakTime] = useState('0')

    const [date,setDate] = useState(null)
    const [starttime,setStarttime] = useState(null)
    const [endtime,setEndtime] = useState(null)
    

    const [id,setId] = useState(uuid.v4())

    // new Date().toDateString()
    const [modalvisible,setModalVisible] = useState(false)
    const [startmodalVisible,setStartModalVisible] = useState(false)
    const [endmodalVisible,setEndModalVisible] = useState(false)

    useEffect(() => {
        const drivers = driverstate.drivers.map(val => ({value:val.name,label:val.name}))
        const tractors = tractorstate.tractors.map(val => ({value:val.name,label:val.name}))
        const plows = plowstate.plows.map(val => ({value:val.name,label:val.name}))
        
        setDriverlist(() => drivers)

        setTractorlist(() => tractors)

        setPlowlist(() => plows)

        if(type=='edit'){
            const current = recordstate.current
            
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
    
    




    

    const workTime = (hrs,mins) => {
        if(hrs=="00"){
         return `${mins} mins`
        }
        if(mins=="00"){
         return `${hrs} hr`
        }
        return `${hrs} hr : ${mins} mins`
       }

    

    const onSubmit = () => {
        if(place.trim() === "" || driver.trim()==="" || tractor.trim()==="" || date===null || starttime===null || endtime===null){
            ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
            return
        }
        if(starttime>=endtime){
            ToastAndroid.show("Please fill starttime and endtime correctly",ToastAndroid.SHORT)
            return
        }
       
        var hrs = moment.utc(moment(endtime,'HH:mm:ss').diff(moment(starttime,'HH:mm:ss'))).subtract(breakTime,'minutes').format("HH");
        var min = moment.utc(moment(endtime,'HH:mm:ss').diff(moment(starttime,'HH:mm:ss'))).subtract(breakTime,'minutes').format("mm");
        
        var worktime = workTime(hrs,min)
        
        const data = {
            id,
            place,
            drivername:driver,
            tractor,
            plow,
            date:date,
            starttime:starttime.toString(),
            endtime:endtime.toString(),
            breakTime,
            worktime:worktime
        }
       
       
        if(type=="edit"){
            
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
                    label='Driver*'
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
                    label='Tractor*'
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
                    label='Plow*'
                    list={plowlist}
                    mode={'outlined'}
                    visible={plowdrop}
                    showDropDown={() => setPlowdrop(true)}
                    onDismiss={() => setPlowdrop(false)}
                    value={plow}
                    setValue={setPlow}
                    dropDownStyle={{marginVertical:10}}
                />}
                
                    <TextInput 
                    mode='outlined'
                    label={'Date*'}
                    placeholder={'Date*'}
                    keyboardType={'number-pad'}
                    value={date ? date.toLocaleDateString() : ''}
                    onFocus={()=>setModalVisible(true)}
                    showSoftInputOnFocus={false}
                />
                
                
            <TextInput 
                mode='outlined'
                label={'StartTime*'}
                placeholder={'StartTime'}
                keyboardType={'number-pad'}
                value={starttime ? starttime.toLocaleTimeString() : ''}
                onFocus={() => setStartModalVisible(true)}
                showSoftInputOnFocus={false}
            />
            <TextInput 
                mode='outlined'
                label={'EndTime*'}
                placeholder={'EndTime*'}
                keyboardType={'number-pad'}
                value={endtime ? endtime.toLocaleTimeString(): ''}
                onFocus={() => setEndModalVisible(true)}
                showSoftInputOnFocus={false}
            />
             
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
            
                <DatePick modalVisible={modalvisible} setDate={setDate} setModalVisible={setModalVisible}/>
                <StartTime setStartModalVisible={setStartModalVisible} startmodalVisible={startmodalVisible} setStarttime={setStarttime}/>
                <EndTime endmodalVisible={endmodalVisible} setEndModalVisible={setEndModalVisible} setEndtime={setEndtime}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditRecord