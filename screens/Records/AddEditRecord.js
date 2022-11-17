import React,{useEffect, useMemo, useState} from 'react'
import {View,SafeAreaView,ScrollView,ToastAndroid} from 'react-native'
import tw from 'twrnc'
import {TextInput} from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import DatePick from './datepick'
import { MyButton } from '../Tractors/AddEditTractor'
import uuid from 'react-native-uuid'
import {useNavigation} from '@react-navigation/native'
import {useDriver} from '../../components/contexts/driver/driverState'
import { useTractor } from '../../components/contexts/Tractors/tractorState'
import { usePlow } from '../../components/contexts/plows/plowState'
import { addRecord, clearCurrentRecord, deleteRecord, updateRecord, useRecord } from '../../components/contexts/Records/recordState'




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
    const [farmer,setFarmer] = useState('')
    const [place,setPlace] = useState('')
    

    const [date,setDate] = useState(null)
    const [totalhr,setTotalhr] = useState(0)
    const [totalmins,setTotalmins] = useState(0)
    const [hourRate,setHourrate] = useState(0)
    

    const [id,setId] = useState(uuid.v4())

    // new Date().toDateString()
    const [modalvisible,setModalVisible] = useState(false)

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
            setPlow(current.plow)
            setDate(new Date(current.date))
            setTotalhr(current.totalHr)
            setTotalmins(current.totalmins)
            setHourrate(current.hourRate)
            setFarmer(current.farmer)
        }
    },[])

    const workTime = (hrs,mins) => {
        if(hrs==0){
         return `${mins} mins`
        }
        if(mins==0){
         return `${hrs} hr`
        }
        return `${hrs} hr : ${mins} mins`
       }

    const onSubmit = () => {
        if(farmer.trim() === "" || driver.trim()==="" || tractor.trim()==="" || date===null || (totalhr==0 && totalmins==0) || hourRate.trim()===""){
            ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
            return
        }
        
        const data = {
            id,
            place,
            drivername:driver,
            tractor,
            plow,
            date:date,
            totaltime:workTime(totalhr,totalmins).toString(),
            totalHr:totalhr.toString(),
            totalmins:totalmins.toString(),
            hourRate,
            totalamount,
            farmer
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

   const totalamount = useMemo(() => {
    return (totalhr*hourRate)+((totalmins/60)*hourRate)
   },[totalhr,totalmins,hourRate])

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `mt-2 w-full px-4 min-h-screen flex flex-col space-y-2`}>
            <TextInput  
                    label={'Farmer*'}
                    mode={'outlined'}
                    placeholder={'Farmer'}
                    keyboardType={'default'}
                    value={farmer}
                    onChangeText={setFarmer}
                />
                <TextInput  
                    label={'Place'}
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
                    label={'Total hr*'}
                    placeholder={'Total hr*'}
                    keyboardType={'number-pad'}
                    value={totalhr ? totalhr.toString() : ''}
                    onChangeText={setTotalhr}
                />

                <TextInput 
                    mode='outlined'
                    label={'Total mins*'}
                    placeholder={'Total mins*'}
                    keyboardType={'number-pad'}
                    value={totalmins ? totalmins.toString() : ''}
                    onChangeText={setTotalmins}
                />
            <TextInput 
                mode='outlined'
                label={'Hourly Rate*'}
                placeholder={'Hourly Rate'}
                keyboardType={'number-pad'}
                value={hourRate ? hourRate.toString() : ''}
                onChangeText={setHourrate}
            />

            <TextInput 
                mode='outlined'
                placeholder={'Total Amount'}
                keyboardType={'number-pad'}
                value={`Rs.${totalamount.toString()}`}
                disabled={true}
            />
        
            <MyButton cb={onSubmit} value={type=="edit" ? "UPDATE": "ADD"}/>
            {type=="edit" && <MyButton cb={OnDelete} value="DELETE"/>}
            
                <DatePick modalVisible={modalvisible} setDate={setDate} setModalVisible={setModalVisible}/>
        
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditRecord