import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import Menu from './screens/Home/Menu'
import {NavigationContainer,useNavigation} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Tractors from './screens/Tractors/Tractors'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import AddEditTractor from './screens/Tractors/AddEditTractor'
import Drivers from './screens/Drivers/Drivers'
import AddEditDriver from './screens/Drivers/AddEditDriver'
import Plows from './screens/Plows/Plows'
import AddEditPlow from './screens/Plows/AddEditPlow'
import Login from './screens/login/Login'
import Registration from './screens/login/Registration'
import DriverState from './components/contexts/driver/driverState'

const Stack = createNativeStackNavigator()


const Header = ({name,location}) =>{
  const navigation =useNavigation()
  return (
    <View style={tw `px-2 py-4 h-max w-full bg-[#facc15] flex flex-row justify-center relative`}>
      <TouchableOpacity style={tw `absolute left-3 top-4 justify-self-end`} onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={25} color={'white'}/>
      </TouchableOpacity>
      <Text style={tw `capitalize text-white font-bold text-lg justify-self-center`}>{name}</Text>
      <TouchableOpacity style={tw `absolute right-3 top-4 justify-self-end`} onPress={() => navigation.navigate(location)}>
          <Ionicons name={'add'} size={25} color={'white'}/>
      </TouchableOpacity> 
    </View>
  )
}
const HeaderSimple = ({name}) =>{
  const navigation =useNavigation()
  return (
    <View style={tw `px-2 py-4 h-max w-full bg-[#facc15] flex flex-row justify-center relative`}>
      <TouchableOpacity style={tw `absolute left-3 top-4 justify-self-end`} onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={25} color={'white'}/>
      </TouchableOpacity>
      <Text style={tw `capitalize text-white font-bold text-lg justify-self-center`}>{name}</Text>
    </View>
  )
}

const App = () => {
  return (
    <DriverState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name='login' component={Login}/>
          <Stack.Screen name='register' component={Registration}/>
          <Stack.Screen name='menu' component={Menu}/>
          <Stack.Screen name='tractors' component={Tractors} options={{
            header:({route}) => <Header name={route.name} location={'tractors-add-edit'}/>,
            headerShown:true
          }}/>
          <Stack.Screen name='tractors-add-edit' component={AddEditTractor} options={{
            header:({route}) => <HeaderSimple name={route.name}/>,
            headerShown:true
          }}/>
          <Stack.Screen name='drivers' component={Drivers} options={{
            header:({route}) => <Header name={route.name} location={'drivers-add-edit'}/>,
            headerShown:true
          }}/>
          <Stack.Screen name='drivers-add-edit' component={AddEditDriver} options={{
            header:({route}) => <HeaderSimple name={route.name}/>,
            headerShown:true
          }}/>
          <Stack.Screen name='plows' component={Plows} options={{
            header:({route}) => <Header name={route.name} location={'plows-add-edit'}/>,
            headerShown:true
          }}/>
          <Stack.Screen name='plows-add-edit' component={AddEditPlow} options={{
            header:({route}) => <HeaderSimple name={route.name}/>,
            headerShown:true
          }}/>
          {/* Checking fork to start development */}
        </Stack.Navigator>
      </NavigationContainer>
    </DriverState>
  )
}

export default App