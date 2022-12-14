import React,{useLayoutEffect, useMemo} from 'react'
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { getRecord, getRecords, useRecord } from '../../components/contexts/Records/recordState'

const data = [{id:1,date:'10/3/2022',workHrs:"5",farmname:"Dinesh farm",drivername:"Ganesh kumar"},{id:2,date:'12/3/2022',workHrs:"7",farmname:"Arun farm",drivername:"Gokul kumar"}]

export const RecordRender = ({record}) => {
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

const RecordMenu = () => {
  const [state,dispatch] = useRecord()

 

  useLayoutEffect(() => {
    getRecords(dispatch)
  },[JSON.stringify(state.records)])
  
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
        <View style={tw `h-full w-full p-2`}>
                
                {state.records.map(val => <RecordRender key={val.id} record={val}/>)}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RecordMenu