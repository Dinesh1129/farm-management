import React,{useEffect, useMemo, useRef, useState} from 'react'
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity,Pressable,Dimensions} from 'react-native'
import tw from 'twrnc'
import MI from 'react-native-vector-icons/dist/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import {Searchbar} from 'react-native-paper'
import { getRecords, useRecord } from '../../components/contexts/Records/recordState'
import { RecordRender } from '../Records/RecordMenu'


const SearchRecordMenu = () => {
    const searchvalue = useRef("")
    const [state,dispatch] = useRecord("")
    const height = Dimensions.get('window').height
    const [upto,setupto] = useState(4)
    const [search,setSearches] = useState([])

    useMemo(() => {
      getRecords(dispatch)
    },[state])

    const change = useMemo(() => {
      const filtered = state.records.slice(0,upto+1)
      return filtered
    },[upto,searchvalue.current])

    const searches = useMemo(() => {
      const search = state.records.filter(record => record.farmname.toLowerCase().includes(searchvalue.current.toLowerCase()))
      setSearches(search)
      // return search
    },[searchvalue.current])

  return (
    <SafeAreaView style={tw `h-screen w-screen flex flex-col`}>
        <ScrollView style={tw `min-h-screen w-full relative`}>
            <View style={tw `h-full w-full p-2`}>
                  <Searchbar 
                    placeholder='Seach Records'
                    keyboardType='default'
                    mode='outlined'
                    label={'Search records'}
                    value={searchvalue.current}
                    onChangeText={text => searchvalue.current=text}
                    returnKeyType={'search'}
                    // onSubmitEditing={() => searches()}
                    // returnKeyLabel={'search'}
                    style={tw `my-2`}
                  />
                  {/* {state.records?.map(record => <RecordRender  record={record}/>)} */}
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