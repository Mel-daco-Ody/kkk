import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation();
    const handleSignInPress = () => {
        // Thực hiện các hành động khi nút được nhấn
        navigation.replace('SignIn');
    };
  return (
    <View style={{alignItems:'center'}}>
        <Image source={require('../../../assets/images/login.png')} 
            style={styles.loginImage}
        />
        <View style={styles.subContainer}>
            <Text style={{fontSize:27,color: '#fff',
                textAlign:'center'}}>
                Let's Find 
                <Text style={{fontWeight:'bold'}}> Professional Cleaning and repair 
                </Text> Service
            </Text>
            <Text style={{fontSize:17,color: '#fff',
            textAlign:'center',marginTop:20}}>Best App to find services near you which deliver you a professional service</Text>
        
            <TouchableOpacity style={styles.button} 
            onPress={handleSignInPress}>
                <Text style={{textAlign:'center',
                fontSize:17,
                color: '#9f5bff'}}>Let's Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage:{
        width:230,
        height:450,
        marginTop:70,
        borderWidth:4,
        borderColor: '#000',
        borderRadius:15
    },
    subContainer:{
        width:'100%',
        backgroundColor: '#9f5bff',
        height:'70%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20
        
    },
    button:{
        padding:15,
        backgroundColor: '#fff',
        borderRadius:99,
        marginTop:40
    }
})