import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserJobInForamtion from '../Screens/JobInFormation/UserJobInforamtion'
import BookingJob2 from '../Screens/BookingScreen/BookingJob2'
const Stack = createStackNavigator();

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
       }}>
            <Stack.Screen name =  'BookingJob2' component={BookingJob2} />   
          
            <Stack.Screen name='UserJobInformation' component={UserJobInForamtion} />   

           
       </Stack.Navigator>
  )
}