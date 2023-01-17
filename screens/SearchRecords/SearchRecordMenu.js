import React,{useEffect, useMemo, useState} from 'react'
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native'
import tw from 'twrnc'
import {Searchbar} from 'react-native-paper'
import { filterRecord, getRecords, useRecord,getRecord, clearFilteredRecord } from '../../components/contexts/Records/recordState'
import {useNavigation} from '@react-navigation/native'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import FA from 'react-native-vector-icons/dist/FontAwesome'

const RecordRender = ({record}) => {
  const navigation = useNavigation()
  const [state,dispatch] = useRecord()
  const addType = async () => {
    await getRecord(record._id,dispatch)
    navigation.navigate('record-add',{type:"edit"})
  }
  const workTime = useMemo((hrs=record.totalhr,mins=record.totalmin) => {
    if(hrs==0){
     return `${mins} mins`
    }
    if(mins==0){
     return `${hrs} hr`
    }
    return `${hrs} hr : ${mins} mins`
   },[JSON.stringify(record)])
  
  return (
    <TouchableOpacity style={tw `mt-1 w-full h-max py-2 px-1 flex flex-row justify-between border`} onPress={() => addType()}>
      <View style={tw `flex flex-col h-full w-11/12`}>
          <Text style={tw `font-semibold text-md`}>{record.date? `${new Date(record.date).toDateString()}` : ''}</Text>
          <Text style={tw `font-semibold text-md`}>{workTime}</Text>
          <Text style={tw `font-semibold text-md`}>{record.place? record.place : ''}</Text>
          <Text style={tw `font-semibold text-md`}>{record.farmer? record.farmer : ''}</Text>
          <Text style={tw `font-semibold text-md`}>{record.driver? record.driver : ''}</Text>
      </View>
    <MI name={'edit'} size={25} color={'black'}/>
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


    const ShowMore = async() => {
      let Start=start+5;
      setStart(start+5)
      if(route.params?.search)
      {
        let res
        setloading(true)
        res = await filterRecord(route.params.driver,route.params.fromdate,route.params.todate,Start,dispatch)
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
      }else{
       let res= await getRecords(dispatch,start+5)
        if(res.status=="empty")
        {
            setStart(1)
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
      navigation.navigate('search-record')
    }

    const SearchOnRecord = () => {
      if(searchvalue.trim()=="")
      {
        ToastAndroid.show("Please Enter search value",ToastAndroid.SHORT)
        return
      }
      let result = state.records.filter(record => record.place.toLowerCase().includes(searchvalue.toLowerCase()) || record.farmer.toLowerCase().includes(searchvalue.toLowerCase()))
      setSearches(result)
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
      if(route.params?.search){
        navigation.navigate('filter-record',{isfiltered:true,driver:route.params.driver,fromdate:route.params.fromdate,todate:route.params.todate})
        return
      }
      navigation.navigate('filter-record')
    }

    const onClearSearch = () => {
        setsearchvalue("")
        setSearches([])
    }

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full relative`}>
            <View style={tw `h-full w-full p-2`}>
              <View style={tw `w-full flex flex-row items-center justify-between`}>
                <Searchbar 
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
                    />
                  <TouchableOpacity style={tw`ml-1 w-3/12 py-3.5 rounded-md bg-[#3b82f6]`} onPress={() => filterScreen()}>
                    <Text style={tw `text-center text-white text-lg font-bold`}>Filter</Text>
                  </TouchableOpacity>
              </View>
              {state.filtered.length>0 && <TouchableOpacity style={tw`h-max w-max p-2 bg-[#5203fc] text-sm font-normal text-capitalize`} onPress={() => { onClearFilter() }}><Text style={tw`text-[#f7f7f7] text-center`}>Clear Filter</Text></TouchableOpacity>}
              {state.filtered.length > 0 && <View style={tw `my-2 p-1 border-1 flex flex-col items-center`}>
                <View style={tw`flex flex-row items-center`}>
                    <Text>Total Hours driver drived: </Text>
                    <Text style={tw `text-lg font-bold`}>{worktime}</Text>
                </View>
                <View style={tw`flex flex-row items-center`}>
                    <Text>Total amount of money earned: </Text>
                    <Text style={tw `text-lg font-bold`}><FA name='rupee' size={20}/> {amount}</Text>
                </View>
              </View>}
                  {searches.length==0 && state.filtered.length==0 && state.records.map(record => {
                    return (
                      <RecordRender  record={record}/>
                    )
                  })}
                  {searches.length==0 && state.filtered.length > 0 && state.filtered.map(record => {
                    return (
                      <RecordRender  record={record}/>
                    )
                  })}
                  {searches.length > 0 && searches.map(record => {
                    return (
                      <RecordRender  record={record}/>
                    )
                  })}
                   {show && <TouchableOpacity style={[tw `my-1`]} onPress={() =>ShowMore()}>
                    <Text style={tw `font-normal text-sm text-[#3b82f6] text-center`}>Show More</Text>
                  </TouchableOpacity>}
                  <ActivityIndicator animating={loading} size="large" />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SearchRecordMenu