import React,{useEffect, useMemo, useState} from 'react'
import {View,SafeAreaView,ScrollView,ToastAndroid,ActivityIndicator,Alert} from 'react-native'
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
import {useFarm} from '../../components/contexts/Farms/farmState'



let hrsList = [{label:'1',value:1},{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},{label:'5',value:5},{label:'6',value:6},{label:'7',value:7},
{label:'8',value:8},{label:'9',value:9},{label:'10',value:10},{label:'11',value:11},{label:'12',value:12},{label:'13',value:13},{label:'14',value:14},
{label:'15',value:15}]
let minList = [{label:'5',value:5},{label:'10',value:10},{label:'15',value:15},{label:'20',value:20},{label:'25',value:25},{label:'30',value:30},{label:'35',value:35},
{label:'40',value:40},{label:'45',value:45},{label:'50',value:50},{label:'55',value:55}]


const AddEditRecord = ({route}) => {
    const [driverstate,driverDispatch] = useDriver()
    const [tractorstate,tractorDispatch] = useTractor()
    const [plowstate,plowDispatch] = usePlow()
    const [recordstate,recordDispatch] = useRecord()
    const [farmstate,farmDispatch] = useFarm()

    const navigation = useNavigation()
    
    const [driverlist,setDriverlist] = useState([])
    const [tractorlist,setTractorlist] = useState([])
    const [plowlist,setPlowlist] = useState([])
    const [farmlist,setFarmlist] = useState([])

    const type = route.params?.type

    const [driverdrop,setDriverdrop] = useState(false)
    const [tractordrop,setTractordrop] = useState(false)
    const [plowdrop,setPlowdrop] = useState(false)
    const [farmdrop,setFarmdrop] = useState(false)
    const [hrdrop,setHrdrop] = useState(false)
    const [mindrop,setMindrop] = useState(false)

    const [driver,setDriver] = useState('')
    const [tractor,setTractor] = useState('')
    const [plow,setPlow] = useState('')
    const [farmer,setFarmer] = useState('')
    const [place,setPlace] = useState('')
    const [farmername,setFarmername] = useState('')
    

    const [date,setDate] = useState(null)
    const [totalhr,setTotalhr] = useState(0)
    const [totalmins,setTotalmins] = useState(0)
    const [hourRate,setHourrate] = useState(0)
    const [amountCollected,setAmountCollected] = useState(0)
    

    const [id,setId] = useState(uuid.v4())

    // new Date().toDateString()
    const [modalvisible,setModalVisible] = useState(false)
    const [loading,setloading] = useState(false)

    useEffect(() => {
        const drivers = driverstate.drivers.map(val => ({value:val.name,label:val.name}))
        const tractors = tractorstate.tractors.map(val => ({value:val.name,label:val.name}))
        const plows = plowstate.plows.map(val => ({value:val.name,label:val.name}))
        const farms = farmstate.farms.map(farm => ({value:farm.farmername,label:farm.farmername}))
        
        setDriverlist(() => drivers)

        setTractorlist(() => tractors)

        setPlowlist(() => plows)

        setFarmlist(() => farms)

        if(type=='edit'){
            const current = recordstate.current
            
            setId(current._id)
            setPlace(current.place)
            setDriver(current.driver)
            setTractor(current.tractor)
            setPlow(current.plow)
            setDate(new Date(current.date))
            setTotalhr(parseInt(current.totalhr))
            setTotalmins(parseInt(current.totalmin))
            setHourrate(current.hourlyrate)
            setFarmer(current.farmer)
            setFarmername(current.farmer)
            setAmountCollected(current.amountCollected)
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

    const onSubmit = async() => {
        if(amountBalance=="Invalid" || farmername.trim() === "" || driver.trim()==="" || tractor.trim()==="" || date===null || (totalhr==0 && totalmins==0) || hourRate==0){
            ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
            return
        }
        
        const data = {
            id,
            place,
            driver:driver,
            tractor,
            plow,
            date:date,
            totalhr:totalhr,
            totalmin:totalmins,
            hourlyrate:hourRate,
            totalamount,
            amountCollected,
            amountBalance,
            farmer:farmername
        }
        setloading(true)
       let res
    //    console.log(data)
        if(type=="edit"){
            
           res = await updateRecord(data.id,data,recordDispatch)
        }else{
           res = await addRecord(data,recordDispatch)
        }
        if(res.status=="success"){
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
            setloading(false)
            clearCurrentRecord(recordDispatch)
            navigation.goBack()
        }else{
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
            setloading(false)
        }
        
    }

    const deleteConfirmation = async () => {
        let res
        Alert.alert(
            "Delete Confirmation",
            "Are You sure,this record will permanently deleted ?",
            [
                {
                    text:"Cancel",
                    style:"cancel",
                    onPress:() => {}
                },
                {
                    text:"Delete",
                    style:"destructive",
                    onPress:async() =>{
                        setloading(true)
                        res = await deleteRecord(id,recordDispatch)
                        setloading(false)
                        if(res.status=="success"){
                            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                            clearCurrentRecord(recordDispatch)
                            navigation.goBack()
                        }
                        else{
                            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                        }
                    }
                }
            ]
        )
        
    }

    const OnDelete = async() => {
        await deleteConfirmation()    
   }

   const totalamount = useMemo(() => {
    return ((totalhr*hourRate)+((totalmins/60)*hourRate)).toFixed(0)
   },[totalhr,totalmins,hourRate])

   const amountBalance = useMemo(() => {
    if(parseInt(amountCollected)>parseFloat(totalamount)){
        ToastAndroid.show("Balance Should be a Whole Number",ToastAndroid.SHORT)
        return "Invalid"
    }
    // return 500
    return (parseInt(totalamount)-amountCollected).toFixed(0)
   },[totalamount,amountCollected])

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
            <View style={tw `mt-2 w-full px-4 min-h-screen flex flex-col space-y-2`}>
            {/* <TextInput  
                    label={'Farmer*'}
                    mode={'outlined'}
                    placeholder={'Farmer'}
                    keyboardType={'default'}
                    value={farmer}
                    onChangeText={setFarmer}
                /> */}
                <TextInput  
                    label={'Place'}
                    mode={'outlined'}
                    placeholder={'Place'}
                    keyboardType={'default'}
                    value={place}
                    onChangeText={setPlace}
                />
                {farmlist.length > 0 &&  <DropDown 
                    label='Farmer*'
                    list={farmlist}
                    mode={'outlined'}
                    visible={farmdrop}
                    showDropDown={() => setFarmdrop(true)}
                    onDismiss={() => setFarmdrop(false)}
                    value={farmername}
                    setValue={setFarmername}
                    dropDownStyle={tw `mt-2`}
                />}
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
                
                <DropDown 
                    label='Total Hr*'
                    list={hrsList}
                    mode={'outlined'}
                    visible={hrdrop}
                    showDropDown={() => setHrdrop(true)}
                    onDismiss={() => setHrdrop(false)}
                    value={totalhr}
                    setValue={setTotalhr}
                    dropDownStyle={{marginVertical:10}}
                />

                <DropDown 
                    label='Total mins*'
                    list={minList}
                    mode={'outlined'}
                    visible={mindrop}
                    showDropDown={() => setMindrop(true)}
                    onDismiss={() => setMindrop(false)}
                    value={totalmins}
                    setValue={setTotalmins}
                    dropDownStyle={{marginVertical:10}}
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
                label={'Total Amount'}
                placeholder={'Total Amount'}
                keyboardType={'number-pad'}
                value={`Rs.${totalamount.toString()}`}
                disabled={true}
            />
            <TextInput 
                mode='outlined'
                label={'Amount Collected'}
                placeholder={'Hourly Rate'}
                keyboardType={'number-pad'}
                value={amountCollected ? amountCollected.toString() : ''}
                onChangeText={setAmountCollected}
            />
            <TextInput 
                mode='outlined'
                label={'Amount Balance'}
                placeholder={'Hourly Rate'}
                keyboardType={'number-pad'}
                value={`Rs.${amountBalance.toString()}`}
                disabled={true}
            />
        
            <MyButton cb={onSubmit} value={type=="edit" ? "UPDATE": "ADD"}/>
            {type=="edit" && <MyButton cb={OnDelete} value="DELETE"/>}
            
                <DatePick modalVisible={modalvisible} setDate={setDate} setModalVisible={setModalVisible}/>
                <ActivityIndicator animating={loading} size="large" />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddEditRecord