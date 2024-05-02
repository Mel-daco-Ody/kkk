import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Header from '../HomeScreen/Header'
import Categories from '../HomeScreen/Categories'
import { ScrollView } from 'react-native'
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import BookedList from '../WorkBoardScreen/BookedList'



const WorkBoard = ({navigation}) => {
  return (
    <View>
      {/* Header  */}
      <Header/>

      <View style={{padding:20, marginTop:20}}>
        <View style={styles.row}>
        <View style={styles.bookedScreen}>
          <View style={styles.column}>
            <Text style={styles.title}>Booked List</Text>
          </View>
          <ScrollView contentContainerStyle={{ height: 2000 }}>
          <BookedList navigation={navigation}/>
          </ScrollView>
        </View>
        <View style={styles.container}>
        <View>
            <TouchableOpacity style={styles.button1} 
            onPress={() => navigation.navigate('YourJobBooked')}>
            <Text style={styles.buttonText}>YourJobBooked</Text>
            <Image style={styles.icons1} resizedMode='contain' source={require('../../../assets/images/list.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} 
            onPress={() => navigation.navigate('JobBooked')}>
            <Text style={styles.buttonText}>Booked</Text>
            <Image style={styles.icons2} resizedMode='contain' source={require('../../../assets/images/open-book.png')} />
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={styles.button3} 
            onPress={() => navigation.navigate('JobRegistion')}>
            <Text style={styles.buttonText}>Job Registation</Text>
            <Image style={styles.icons3} resizedMode='contain' source={require('../../../assets/images/registration.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button4} 
            onPress={() => navigation.navigate('YourJob')}>
            <Text style={styles.buttonText}>Your Job</Text>
            <Image style={styles.icons4} resizedMode='contain' source={require('../../../assets/images/job-offer.png')} />
            </TouchableOpacity>
        </View>
        </View>
        </View> 
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.4,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginRight: -20,
      marginVertical: '20%'
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: -5,
      paddingTop: 75,
      paddingBottom: 0,
      paddingLeft: 0,
      color: '#9D63D9',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 20,
      marginLeft: '-7%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bookedScreen: {
      flex: 1.2,
      marginTop: '-20%',
      width: '90%',
    },
    button1: {
      width: 100,
      height: 80 ,
      backgroundColor: '#A563D9',
      justifyContent: 'center',
      alignItems: 'to',
      marginHorizontal: '1%',
      marginVertical: '0%',
      //borderRadius: 30,
      //borderTopLeftRadius: 150
      borderBottomLeftRadius: 150,
        borderTopLeftRadius: 150
    },
    button2: {
        width: 100,
        height: 80 ,
        backgroundColor: '#A563D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
        marginVertical: '5%',
        //borderRadius: 30,
        //borderTopRightRadius: 150
        borderBottomLeftRadius: 150,
        borderTopLeftRadius: 150
      },
      button3: {
        width: 100,
        height: 80 ,
        backgroundColor: '#A563D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
        marginVertical: '5%',
        //borderRadius: 30,
        borderBottomLeftRadius: 150,
        borderTopLeftRadius: 150
      },
      button4: {
        width: 100,
        height: 80 ,
        backgroundColor: '#A563D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
        marginVertical: '5%',
        //borderRadius: 30,
        //borderBottomRightRadius: 150
        borderBottomLeftRadius: 150,
        borderTopLeftRadius: 150
      },
    buttonText: {
      color: 'transparent',
      fontSize: 16,
    },
    icons1: {
      position: 'absolute',
      width: '40%',
      height: '40%',
      left: '30%',
      tintColor: '#d2bafb',
    },
    icons2: {
      position: 'absolute',
      width: '40%',
      height: '40%',
      tintColor: '#d2bafb',
    },
    icons3: {
      position: 'absolute',
      width: '40%',
      height: '40%',
      tintColor: '#d2bafb',
    },
    icons4: {
      position: 'absolute',
      width: '50%',
      height: '50%',
      tintColor: '#d2bafb',
    },
  });

  export default WorkBoard;