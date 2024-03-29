import React,{useState,useEffect} from 'react'
import {View,Text,SafeAreaView,ScrollView,ToastAndroid,ActivityIndicator} from 'react-native'
import tw from 'twrnc'
import {TextInput} from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import {useDriver} from '../../components/contexts/driver/driverState'
import { useTractor } from '../../components/contexts/Tractors/tractorState'
import { usePlow } from '../../components/contexts/plows/plowState'
import DatePick from '../Records/datepick'
import { MyButton } from '../Tractors/AddEditTractor'
import {filterRecord,useRecord} from '../../components/contexts/Records/recordState'
import {useNavigation} from '@react-navigation/native'


const FilterRecord = ({route}) => {
    const navigation = useNavigation()
    const [driverstate,driverDispatch] = useDriver()
    const [tractorstate,tractorDispatch] = useTractor()
    const [plowstate,plowDispatch] = usePlow()
    const [recordstate,recordDispatch] = useRecord()
    
    const [driverlist,setDriverlist] = useState([])
    const [tractorlist,setTractorlist] = useState([])
    const [plowlist,setPlowlist] = useState([])

    const [driverdrop,setDriverdrop] = useState(false)
    const [tractordrop,setTractordrop] = useState(false)
    const [plowdrop,setPlowdrop] = useState(false)

    const [driver,setDriver] = useState('')
    const [tractors,setTractors] = useState('')
    const [plows,setPlows] = useState('')

    const [loading,setloading] = useState(false)

    const [frommodalvisible,fromsetModalVisible] = useState(false)
    const [tomodalvisible,tosetModalVisible] = useState(false)


    const [fromdate,fromsetDate] = useState(null)
    const [todate,tosetDate] = useState(null)

    useEffect(() => {
        const drivers = driverstate.drivers.map(val => ({value:val.name,label:val.name}))
        const tractors = tractorstate.tractors.map(val => ({value:val.name,label:val.name}))
        const plows = plowstate.plows.map(val => ({value:val.name,label:val.name}))
        
        setDriverlist(() => drivers)

        setTractorlist(() => tractors)

        setPlowlist(() => plows)

        if(route.params?.isfiltered){
            setDriver(route.params.driver)
            fromsetDate(route.params.fromdate)
            tosetDate(route.params.todate)
        }

    },[])

    const onSubmit = async() => {
        if(driver.trim()==""){
            ToastAndroid.show("Please fill required fields",ToastAndroid.SHORT)
            return
        }
        let tractor = tractors.split(",").slice(1)
        let plow = plows.split(",").slice(1)
        setloading(true)
        let res
        // console.log(driver,tractor,plow);
        res=await filterRecord(driver,fromdate,todate,0,recordDispatch)
        if(res.status=="success")
        {
            setloading(false)
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
            navigation.navigate('search-record',{search:true,driver,fromdate,todate,showmore:true})
        }else{
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        }
    }

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full relative`} contentContainerStyle={tw`p-2 flex flex-col`}>
            <Text style={tw `text-lg font-semibold`}>Filter By</Text>

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
                <Text style={tw `text-lg font-semibold`}>Date Range</Text>
                <TextInput 
                    mode='outlined'
                    label={'From Date'}
                    placeholder={'Date*'}
                    keyboardType={'number-pad'}
                    value={fromdate ? fromdate.toLocaleDateString() : ''}
                    onFocus={()=>fromsetModalVisible(true)}
                    showSoftInputOnFocus={false}
                />
                <TextInput 
                    mode='outlined'
                    label={'To Date'}
                    placeholder={'Date*'}
                    keyboardType={'number-pad'}
                    value={todate ? todate.toLocaleDateString() : ''}
                    onFocus={()=>tosetModalVisible(true)}
                    showSoftInputOnFocus={false}
                />

                <MyButton cb={onSubmit} value={"Apply"}/>

            <DatePick modalVisible={frommodalvisible} setDate={fromsetDate} setModalVisible={fromsetModalVisible}/>
            <DatePick modalVisible={tomodalvisible} setDate={tosetDate} setModalVisible={tosetModalVisible}/>
            <ActivityIndicator animating={loading} size="large" />
        </ScrollView>
    </SafeAreaView>
  )
}

export default FilterRecord