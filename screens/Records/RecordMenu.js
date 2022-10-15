import React,{useEffect,useMemo} from 'react'
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import { getRecord, getRecords, useRecord } from '../../components/contexts/Records/recordState'

const data = [{id:1,date:'10/3/2022',workHrs:"5",farmname:"Dinesh farm",drivername:"Ganesh kumar"},{id:2,date:'12/3/2022',workHrs:"7",farmname:"Arun farm",drivername:"Gokul kumar"}]

const RecordRender = ({record}) => {
  const navigation = useNavigation()
  const [state,dispatch] = useRecord()
  const addType = async () => {
    await getRecord(record.id,dispatch)
    navigation.navigate('record-add',{type:"edit"})
  }
  // console.log('record workmins',record.workMins)
  const minstoHrs = (mins) => {
    console.log(mins ,'workmins===============')
    const hrs = mins/60;
    const min = mins%60;
    return (min > 0 ? `${hrs.toPrecision(1)} hr: ${min.toPrecision(1)} mins` : `${hrs} hr`)
  }
  return (
    <TouchableOpacity style={tw `mt-1 w-full h-max py-2 px-1 flex flex-row justify-between border`} onPress={() => addType()}>
      <View style={tw `flex flex-col h-full w-11/12`}>
          <Text style={tw `font-semibold text-md`}>{record.date? `${new Date(record.date).toDateString()} ${new Date(record.date).toLocaleTimeString()}` : ''}</Text>
          <Text style={tw `font-semibold text-md`}>{record.workMins < 60? `${record.workMins} mins` : minstoHrs(record.workMins)}</Text>
          <Text style={tw `font-semibold text-md`}>{record.farmname? record.farmname : ''}</Text>
          <Text style={tw `font-semibold text-md`}>{record.drivername? record.drivername : ''}</Text>
      </View>
    <MI name={'edit'} size={25} color={'black'}/>
</TouchableOpacity>
  )
}

const RecordMenu = () => {
  const [state,dispatch] = useRecord()

 

  useEffect(() => {
    
    getRecords(dispatch)
  },[state.records])
  console.log(state)
  console.log(new Date())
  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full`}>
        <View style={tw `h-full w-full p-2`}>
                {/* <FlatList 
                    data={tractors}
                    keyExtractor={e =>e}
                    renderItem={RenderView}
                /> */}
                {state.records.map(val => <RecordRender key={val.id} record={val}/>)}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RecordMenu