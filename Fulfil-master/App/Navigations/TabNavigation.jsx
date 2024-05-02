import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import JobBooked from '../Screens/WorkBoard/JobBooked'
import WorkerNavigation from '../Navigations/WorkerNavigation';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {
  return (
    <Tab.Navigator screenOptions={{
        lazy: false,
        headerShown:false,
        tabBarActiveTintColor: '#A563D9',
        tabBarInactiveTintColor: '#c0c0c0',
        tabBarStyle: { backgroundColor: '#FFFFFF' }
    }}>
       <Tab.Screen name='home' component={HomeScreen}
       options={{
        lazy:'false',
        tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginTop:-7}}>
                Home</Text>
        ),
        tabBarIcon:({color,size})=>(
            <FontAwesome name="home" size={size} color={color} />
        )
       }}
       /> 
       <Tab.Screen name='Work' component={WorkerNavigation} 
       options={{
        lazy:false,
        tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginTop:-7}}>
                WorkBoard</Text>
        ),
        tabBarIcon:({color,size})=>(
            <FontAwesome name="clipboard" size={size} color={color} />
        )
       }}/> 
    </Tab.Navigator>
  )
}

export default TabNavigation;