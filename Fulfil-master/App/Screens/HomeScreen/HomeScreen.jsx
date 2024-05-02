import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import BusinessList from './BusinessList'
import { ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header/>
    <ScrollView>
      {/* Header  */}
      <View style={{padding:20}}>
        {/* Slider  */}
        <Slider/>
        {/* Categories  */}
        <Categories/>
        {/* Business List  */}
        <BusinessList/>
      </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.97,
    backgroundColor: '#fff',
  },
});