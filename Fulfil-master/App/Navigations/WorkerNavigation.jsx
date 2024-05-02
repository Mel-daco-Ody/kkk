import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WorkBoard from '../Screens/WorkBoardScreen/WorkBoard'
import GetAllJob from '../Screens/WorkBoard/GetAllJob'
import JobBooked from '../Screens/WorkBoard/JobBooked'
import JobRegistion from '../Screens/WorkBoard/JobRegistion'
import YourJob from '../Screens/WorkBoard/YourJob'
import deleteJob from '../Screens/JobInFormation/deleteJob'
import YourJobBooked from '../Screens/WorkBoard/YourJobBooked'
import JobInfoBox from '..//Screens/WorkBoard/GetAllJob'

const Stack = createStackNavigator();

export default function WorkerNavigation() {
  return (
    <Stack.Navigator initialRouteName='WorkBoard' screenOptions={{
        headerShown:false
       }}>
            <Stack.Screen name ='WorkBoard' component={WorkBoard} />   
            
            <Stack.Screen name='YourJobBooked' component={YourJobBooked} />
          
            <Stack.Screen name='JobBooked' component={JobBooked} />

            <Stack.Screen name='JobRegistion' component={JobRegistion} />

            <Stack.Screen name='YourJob' component={YourJob} />   

            <Stack.Screen name='DeleteJob' component={deleteJob} />

            <Stack.Screen name='GetAllJob' component={JobInfoBox}/>

           
    </Stack.Navigator>
  )
}