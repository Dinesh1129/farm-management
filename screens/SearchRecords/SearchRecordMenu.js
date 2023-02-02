import React,{useEffect, useMemo, useState} from 'react'
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity,ToastAndroid,ActivityIndicator,PermissionsAndroid} from 'react-native'
import tw from 'twrnc'
import {Searchbar} from 'react-native-paper'
import { filterRecord, getRecords, useRecord,getRecord, clearFilteredRecord, searchRecord, clearSearchRecord } from '../../components/contexts/Records/recordState'
import {useNavigation} from '@react-navigation/native'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import FA from 'react-native-vector-icons/dist/FontAwesome'
import { useFarm } from '../../components/contexts/Farms/farmState'
import { useDriver } from '../../components/contexts/driver/driverState'
import { useTractor } from '../../components/contexts/Tractors/tractorState'
import { usePlow } from '../../components/contexts/plows/plowState'
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Share from 'react-native-share'
import FileNameModal from './FilenameModal'


const RecordRender = ({record,setIdToNames}) => {
  const navigation = useNavigation()
  const [state,dispatch] = useRecord()
  const [farmstate,farmispatch] = useFarm()
  const [driverstate,driverDispatch] = useDriver()
  const [tractorstate,tractorDispatch] = useTractor()
  const [plowstate,plowDispatch] = usePlow()
  const [values,setValues] = useState({})
  const [loading,setLoading] = useState(false)
 
  const addType = async () => {
    setLoading(true)
    await getRecord(record._id,dispatch)
    setLoading(false)
    navigation.navigate('record-edit',{type:"edit"})
  }
  useEffect(() => {
    if(!values.driverName || !values.farmerName || !values.tractorName || !values.plowName || !values.farmPlace){
      return
    }else{
      setIdToNames(values)
    }
  },[JSON.stringify(values),JSON.stringify(record)])
  const workTime = useMemo((hrs=record.totalhr,mins=record.totalmin) => {
    if(hrs==0){
     return `${mins} mins`
    }
    if(mins==0){
     return `${hrs} hr`
    }
    return `${hrs} hr : ${mins} mins`
   },[JSON.stringify(record)])

   const getDriver = useMemo((driverid=record.driver) => {
    const driver = driverstate.drivers.find((driver) => driver._id==driverid)

    if(driver==undefined){
      return "Value Not Found"
    }
    setValues(val => ({...val,recordid:record._id,driverid,driverName:driver.name}))
    return driver.name
   },[JSON.stringify(record)])

   const getFarmer = useMemo((farmerid=record.farmer) => {
    const farmer = farmstate.farms.find((farm) => farm._id==farmerid)
    
    if(farmer==undefined){
      return "Value Not Found"
    }
    setValues(val => ({...val,farmerid,farmerName:farmer.farmername,farmPlace:farmer.place}))
  
    return farmer.farmername
   },[JSON.stringify(record)])

   const getTractor = useMemo((tractorid=record.tractor) => {
    const tractor = tractorstate.tractors.find((trac) => trac._id==tractorid)
    if(tractor==undefined){
      return "Value Not Found"
    }
    setValues(val => ({...val,tractorid,tractorName:tractor.name}))
    return tractor.name
   },[JSON.stringify(record)])

   const getPlow = useMemo((plowid=record.plow) => {
    const plow = plowstate.plows.find((plow) => plow._id==plowid)
    if(plow==undefined){
      return "Value Not Found"
    }
    setValues(val => ({...val,plowid,plowName:plow.name}))
    return plow.name
   },[JSON.stringify(record)])


  
  return (
    <TouchableOpacity style={tw `mt-1 w-full h-max py-2 px-1 flex flex-row justify-between border`} onPress={() => addType()}>
      {loading && <ActivityIndicator style={tw `justify-self-center w-full place-self-center h-[180px]`} animating={loading} size="large" />}
      {!loading && <View style={tw `flex flex-col h-full w-11/12`}>
          <Text style={tw `font-semibold text-md`}>{record.date? `${new Date(record.date).toDateString()}` : ''}</Text>
          <Text style={tw `font-semibold text-md`}>Hours Worked : {workTime}</Text>
          <Text style={tw `font-semibold text-md`}>Description : {record.description ? record.description : ''}</Text>
          {/* <Text style={tw `font-semibold text-md`}>Place : {record.place? record.place : ''}</Text> */}
           <Text style={tw `font-semibold text-md`}>Farmer : {getFarmer}</Text>
          <Text style={tw `font-semibold text-md`}>Driver : {getDriver}</Text>
          <Text style={tw `font-semibold text-md`}>Tractor : {getTractor}</Text>
          <Text style={tw `font-semibold text-md`}>Plow : {getPlow}</Text>
          <Text style={tw `font-semibold text-md`}>Total Amount : {record.totalamount? record.totalamount : ''}</Text>
          <Text style={tw `font-semibold text-md`}>Total Amount Collected : {record.amountCollected!=null? record.amountCollected : ''}</Text>
          <Text style={tw `font-semibold text-md`}>Balance Amount : {record.amountBalance!=null? record.amountBalance : ''}</Text>
      </View>}
    {!loading && <MI name={'edit'} size={25} color={'black'}/>}
</TouchableOpacity>
  )
}


const SearchRecordMenu = ({route}) => {
    const [searchvalue,setsearchvalue] = useState('')
    const [state,dispatch] = useRecord()
    const navigation = useNavigation()
    const [start,setStart] = useState(0)
    const [loading,setloading] = useState(false)
    const [clearfilter,setclearFilter] = useState(false)
    const [show,setShow] = useState(true)
    const [searches,setSearches] = useState([])
    const [searchStart,setSearchStart] = useState(0)
    const [id_to_names,setIdToNames] = useState([])
    const [filename,setFilename] = useState('')
    const [modalVisible,setModalVisible] = useState(false)

   useEffect(() => {
    if(route.params?.search){
      setclearFilter(true)
    }
    setStart(0)
    setShow(true)
   },[JSON.stringify(route.params)])

   useEffect(() => {
    getRecords(dispatch);
    clearFilteredRecord(dispatch)
   },[])

   

   
    const worktime = useMemo(() => {
      let hr = state.filtered.reduce((prev,record) => prev+=record.totalhr,0)
      let min = state.filtered.reduce((prev,record) => prev+=record.totalmin,0)
     
      if(hr==0){
        return `${min} mins`
       }
       if(min==0){
        return `${hr} hr`
       }
       hr+=min/60;
       min%=60;
       hr=parseInt(hr)
       return `${hr} hr : ${min} mins`
       
    },[JSON.stringify(state.filtered)])

    const amount = useMemo(() => {
      const totalamount = state.filtered.reduce((prev,record) => prev+=record.totalamount,0)
  
      return totalamount
    },[JSON.stringify(state.filtered)])

    const amountCollected = useMemo(() => {
      const amountcollected = state.filtered.reduce((prev,record) => prev+=record.amountCollected,0)
      return amountcollected
    },[JSON.stringify(state.filtered)])

    const amountBalance = useMemo(() => {
      const amountbalance = state.filtered.reduce((prev,record) => prev+=record.amountBalance,0)
      return amountbalance
    },[JSON.stringify(state.filtered)])

    const ShowMore = async() => {
      let Start=start+5;
      setStart(start+5)
      if(route.params?.search)
      {
        let res
        setloading(true)
        res = await filterRecord(route.params.farm,route.params.driver,route.params.fromdate,route.params.todate,Start,dispatch)
        if(res.status=="empty")
        {
            setloading(false)
            setStart(0)
            setShow(false)
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
            // navigation.navigate('search-record',{search:true,driver,plow,tractor})
        }else{
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        }
        setloading(false)
      }else if(state.searched.length>0){
        let result
        setloading(true)
        result=await searchRecord(searchvalue,searchStart,dispatch)
        if(result.status=="success"){
          setloading(false)
          setSearchStart(searchStart+1)
        }else{
          setloading(false)
          setSearchStart(0)
          setShow(false)
        }
      }else{
       let res= await getRecords(dispatch,start+5)
        if(res.status=="empty")
        {
            setStart(0)
            setShow(false)
            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        }else if(res.status=="fail"){
          ToastAndroid.show("error",ToastAndroid.SHORT)
        }
      }
    }

    const onClearFilter = () => {
      clearFilteredRecord(dispatch)
      getRecords(dispatch);
      setclearFilter(false);
      setShow(true)
      setIdToNames([])
      navigation.navigate('search-record')
    }

    const SearchOnRecord = async() => {
      if(searchvalue.trim()=="")
      {
        ToastAndroid.show("Please Enter search value",ToastAndroid.SHORT)
        return
      }
      let result
      setloading(true)
      result =await searchRecord(searchvalue,searchStart,dispatch)
      setloading(false)
      if(result.status=="success"){
        // setSearchStart(searchStart+1)
      }else{
        // setSearchStart(0) 
      }
      // let result = state.records.filter(record => record.place.toLowerCase().includes(searchvalue.toLowerCase()) || record.farmer.toLowerCase().includes(searchvalue.toLowerCase()))
      // setSearches(result)
      // if(result.length>5){
      //   setShow(true)
      // }
    }

    const onSearch = () => {
      if(state.filtered.length==0){
        SearchOnRecord()
        return
      }
      if(searchvalue.trim()=="")
      {
        ToastAndroid.show("Please Enter search value",ToastAndroid.SHORT)
        return
      }
      let result=state.filtered?.filter(record => record.place.toLowerCase().includes(searchvalue.toLowerCase()) || record.farmer.toLowerCase().includes(searchvalue.toLowerCase()))
      setSearches(result)
      if(result.length>5){
        setShow(true)
      }

    }

    const filterScreen = () => {
      setIdToNames([])
      if(route.params?.search){
        navigation.navigate('filter-record',{isfiltered:true,driver:route.params.driver,fromdate:route.params.fromdate,todate:route.params.todate,farm:route.params.farm})
        return
      }
      navigation.navigate('filter-record')
    }

    const onClearSearch = () => {
        setsearchvalue("")
        setSearches([])
        clearSearchRecord(dispatch)
        setShow(true)
    }

    const exportDataToExcel = () => {
      const shareOptions = {
        url:`file://${RNFS.ExternalStorageDirectoryPath}/Download/${filename}.xlsx`
      }
      
      if(id_to_names.length<state.filtered.length){
        ToastAndroid.show("Data Loading Click Again",ToastAndroid.SHORT)
        return
      }
      
      // Created Sample data
      let sample_data_to_export = state.filtered.map(rec => {
        let temp = {...rec}
        id_to_names.forEach(v => {
          if(v.recordid==temp._id){
            // temp = {...temp,...v}
            temp={date:rec.date,description:rec?.description ? rec.description : '',place:v.farmPlace,farmer:v.farmerName,driver:v.driverName,tractor:v.tractorName,plow:v.plowName,totalHour:rec.totalhr,totalMinutes:rec.totalmin,hourlyRate:rec.hourlyrate,TotalAmount:rec.totalamount,AmountCollected:rec.amountCollected,AmountBalance:rec.amountBalance}
          }
        })
        return temp
      })
      sample_data_to_export=[...sample_data_to_export,{AmountCollected:amountCollected,AmountBalance:amountBalance,TotalAmount:amount}]
  
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
      XLSX.utils.book_append_sheet(wb,ws,"Records")
      const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
      // console.log(RNFS.ExternalDirectoryPath);//app folder in .android folder
      // console.log(RNFS.ExternalStorageDirectoryPath+'/Downloads') // phone download folder
  
      // Write generated excel to Storage
      RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + `/Download/${filename}.xlsx`, wbout, 'ascii').then((r)=>{
       Share.open(shareOptions).then(res => {
        // console.log(res);
        
       }).catch(error => {
        // console.log('error ',error);
        
       })
      }).catch((e)=>{
        // console.log('Error', e);
      });
      setFilename('')
    }

  const ExportButton = () => {
   
      const CheckPermission = async() => {
        try{
          // Check for Permission (check if permission is already given or not)
          let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    
          if(!isPermitedExternalStorage){
    
            // Ask for permission
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Storage permission needed",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
                message:"Write permission needed for excel generation"
              }
            );
    
            
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Permission Granted (calling our exportDataToExcel function)
              exportDataToExcel();
              // console.log("Permission granted");
            } else {
              // Permission denied
              // console.log("Permission denied");
            }
          }else{
             // Already have Permission (calling our exportDataToExcel function)
             setModalVisible(true)
            //  exportDataToExcel();
          }
        }catch(e){
          // console.log('Error while checking permission');
          // console.log(e);
          return
        }
      }
      return (
        <TouchableOpacity style={tw`h-max w-max my-2 p-2 bg-[#5203fc] text-sm font-normal text-capitalize`} onPress={() => { CheckPermission()  }}><Text style={tw`text-[#f7f7f7] text-center`}>Save And Export</Text></TouchableOpacity>
      )
    }

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full relative`}>
            <View style={tw `h-full w-full p-2`}>
              <View style={tw `w-full flex flex-col items-center justify-between`}>
                {/* <Searchbar 
                      placeholder='Search Records'
                      keyboardType='default'
                      mode='outlined'
                      label={'Search records'}
                      value={searchvalue}
                      onChangeText={setsearchvalue}
                      returnKeyType={'search'}
                      onSubmitEditing={() => {onSearch()}}
                      clearIcon={() => <TouchableOpacity onPress={() => onClearSearch()}><MI name={'close'} size={25} color={'black'}/></TouchableOpacity>}
                      style={tw `my-2 w-9/12`}
                    /> */}
                  <TouchableOpacity style={tw`my-1 w-full py-3.5 rounded-md bg-[#3b82f6]`} onPress={() => filterScreen()}>
                    <Text style={tw `text-center text-white text-lg font-bold`}>Filter</Text>
                  </TouchableOpacity>
                  {state.filtered.length > 0 && <ExportButton />}
              </View>
              {state.filtered.length>0 && <TouchableOpacity style={tw`h-max w-max p-2 bg-[#5203fc] text-sm font-normal text-capitalize`} onPress={() => { onClearFilter() }}><Text style={tw`text-[#f7f7f7] text-center`}>Clear Filter</Text></TouchableOpacity>}
              {state.filtered.length > 0 && <View style={tw `my-2 p-1 border-1 flex flex-col items-center`}>
                <View style={tw`flex flex-row items-center`}>
                    <Text>Total hours driven: </Text>
                    <Text style={tw `text-lg font-bold`}>{worktime}</Text>
                </View>
                <View style={tw`flex flex-row items-center`}>
                    <Text>Total amount earned: </Text>
                    <Text style={tw `text-lg font-bold`}><FA name='rupee' size={20}/> {amount}</Text>
                </View>
                <View style={tw`flex flex-row items-center`}>
                    <Text>Total amount collected: </Text>
                    <Text style={tw `text-lg font-bold`}><FA name='rupee' size={20}/> {amountCollected}</Text>
                </View>
                <View style={tw`flex flex-row items-center`}>
                    <Text>Balance amount: </Text>
                    <Text style={tw `text-lg font-bold`}><FA name='rupee' size={20}/> {amountBalance}</Text>
                </View>
              </View>}
                  {state.searched.length==0 && state.filtered.length==0 && state.records.map(record => {
                    return (
                      <RecordRender  record={record} setIdToNames={(v) => setIdToNames(val => [...val,v])} />
                    )
                  })}
                  {state.searched.length==0 && state.filtered.length > 0 && state.filtered.map(record => {
                    return (
                      <RecordRender  record={record} setIdToNames={(v) => setIdToNames(val => [...val,v])} />
                    )
                  })}
                  {state.searched.length > 0 && state.searched.map(record => {
                    return (
                      <RecordRender  record={record} setIdToNames={(v) => setIdToNames(val => [...val,v])} />
                    )
                  })}
                   {show && <TouchableOpacity style={[tw `my-1`]} onPress={() =>ShowMore()}>
                    <Text style={tw `font-normal text-sm text-[#3b82f6] text-center`}>Show More</Text>
                  </TouchableOpacity>}
                  <FileNameModal setModalVisible={setModalVisible} modalVisible={modalVisible} fileName={filename} setFilename={setFilename} onSave={() => {setModalVisible(!modalVisible), exportDataToExcel()}}/>
                  <ActivityIndicator animating={loading} size="large" />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SearchRecordMenu