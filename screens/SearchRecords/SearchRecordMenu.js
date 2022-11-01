import React,{useMemo, useState} from 'react'
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import {Searchbar} from 'react-native-paper'
import { getRecords, useRecord } from '../../components/contexts/Records/recordState'
import { RecordRender } from '../Records/RecordMenu'


const SearchRecordMenu = () => {
    const [searchvalue,setsearchvalue] = useState('')
    const [state,dispatch] = useRecord("")
    const [upto,setupto] = useState(4)
    const [search,setSearches] = useState([])

    useMemo(() => {
      getRecords(dispatch)
    },[JSON.stringify(state.records)])

    const change = useMemo(() => {
      const filtered = state.records.slice(0,upto+1)
      return filtered
    },[upto,searchvalue])
    
    const searches =() => {
    
      const search = state.records?.filter(record => record.farmname.toLowerCase().includes(searchvalue.toLowerCase()))
      setSearches(search)
      
    }
    
    

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full relative`}>
            <View style={tw `h-full w-full p-2`}>
                  <Searchbar 
                    placeholder='Seach Records'
                    keyboardType='default'
                    mode='outlined'
                    label={'Search records'}
                    value={searchvalue}
                    onChangeText={setsearchvalue}
                    returnKeyType={'search'}
                    onSubmitEditing={() => searches()}
                    style={tw `my-2`}
                  />
                 
                  {search.length>0 && <TouchableOpacity style={tw`h-max w-max p-2 bg-[#5203fc] text-sm font-normal text-capitalize`} onPress={() => {setSearches([]);setsearchvalue('')}}><Text style={tw`text-[#f7f7f7] text-center`}>Clear Filter</Text></TouchableOpacity>}
                  {search.length==0 &&  change?.map(record => <RecordRender  record={record}/>)}
                  {search.length>0 && search?.map(record => <RecordRender  record={record}/>)}
                  <TouchableOpacity style={[tw `my-1`]} onPress={() => setupto(prev => prev+5)}>
                    <Text style={tw `font-normal text-sm text-[#3b82f6] text-center`}>Show More</Text>
                  </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SearchRecordMenu