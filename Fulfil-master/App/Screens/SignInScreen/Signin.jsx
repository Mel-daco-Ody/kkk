import React, {useRef, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, PanResponder, Animated } from 'react-native';
import { ScrollView, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode, { jwtDecode } from 'jwt-decode';


import "core-js/stable/atob"

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  
  useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        console.log("SCO")
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

      const [stateVariables, setStateVariables] = useState({
        username: '',
        password: '',
      });
    
      const handleRegister = async () => {
        const query = `
          mutation {
            login(input: {
              username :"${stateVariables.username}",
              password :"${stateVariables.password}"
            }) {
              token
             
           
             
              
            }
          }
        `;
    
        const variables = {};
    
        try {
          const res = await fetch('http://172.20.10.3:3003/graphql', {
            method: 'POST',
            headers: {  
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query,
              variables,
            }),
          });
          
    
          const json = await res.json();
          console.log(json.data.login);
    
          
          
          if (!json.errors) {
            // Phản hồi thành công
            console.log('Success:', json.data.login);
            const token = json.data.login.token;
    
            
            const decoded = jwtDecode(token);
            console.log(decoded);
  
    
            // Lưu trữ token vào AsyncStorage
            await AsyncStorage.setItem('token', token);
            

            Alert.alert(
              'Success',
              'Login successful!',
              [
                { text: 'OK', onPress: () => {navigation.replace('TabNav')}}
              ],
              { cancelable: false }
            );
           
          }
          
          
        } catch (error) {
          console.log(error);
        }
        
      };
    const handleSignUp = () => {
        navigation.navigate ('AccountRegister')
    }
    

    const navigation = useNavigation();
        const pan = useRef(new Animated.ValueXY()).current;
    
        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event(
            [
              null,
              { dy: pan.y }
            ],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 140) {
              navigation.navigate('SignUp');
              console.log('To Signup');
            }
            // Khôi phục vị trí ban đầu của pan
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
          }
        });

  return (
    <ScrollView style={styles.Scroll} {...panResponder.panHandlers}>
    <View style={styles.container}>

    <Image source={require('../../../assets/images/Logo.png')} style={styles.avatar} resizeMode ='contain' />
    <Text style={styles.loginText}>Sign In</Text>
    <View style={styles.inputContainer}>


    <Text style={styles.Conttext1}>ID Name</Text>
    <TouchableOpacity style={styles.inputButton}>
        <TextInput style={styles.inputText}
        onChangeText={text => setStateVariables({...stateVariables, username: text})}
        value={stateVariables.username} 
        placeholder="What is your ID name" />
    </TouchableOpacity>


    <Text style={styles.Conttext2}>Password</Text>
    <TouchableOpacity style={styles.inputButton}>
        <TextInput style={styles.inputText}
        onChangeText={text => setStateVariables({...stateVariables, password: text})}
        value={stateVariables.password}
        secureTextEntry = {true} 
        placeholder="What is your password"/>
    </TouchableOpacity>


    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPass')}>
    <Text style={styles.forgotPass}>Forgot your password ?</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.footer}>
        <Text style={styles.footerText}>Or sign in with</Text>
        <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={require('../../../assets/images/gmail.png')} style={styles.logo} resizeMode ='contain'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>console.log('Head to Facebook')}>
            <Image source={require('../../../assets/images/facebook.png')} style={styles.logo} resizeMode ='contain'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>console.log('Head to Instagram')}>
            <Image source={require('../../../assets/images/instagram.png')} style={styles.logo} resizeMode ='contain'/>
        </TouchableOpacity>
    </View>
    <Text style={styles.footerText}>Don't have an account ?<Text style={{color:'#fff'}} > Swipe down</Text></Text>
    </View>
    </View>
    </ScrollView>
  );
  }

const styles = StyleSheet.create({
  Scroll: {
    position: 'relative',
    backgroundColor: '#A563D9'
  },
  container: {
    flex: 1,
    backgroundColor: '#A563D9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 900
  },
  avatar: {
    height: '11%',
    marginTop: '-25%',
    marginBottom: '7%'
  },
  loginText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: -30,
    marginLeft: '23%',
    textShadowColor: '#A563D9', 
    textShadowOffset: { width: 10, height: 15 }, // Độ dịch chuyển của shadow theo trục x và y
    textShadowRadius: 10,
    padding: 18,
    zIndex: 1
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    paddingTop: 15,
  },
  forgotPass: {
    width: '52%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: -10,
    marginLeft:'50%'
  },
  inputButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  inputText: {
    color: '#9435DF'
  },
  loginButton: {
    backgroundColor: '#9435DF',
    padding: 8,
    borderRadius: 5,
    marginTop: 20,
    height: 43,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor:'grey',
    borderWidth: 2,
  },
  Conttext1: {
    width: '19%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 25,
    marginBottom: -15,
    marginLeft: 10,
    zIndex:1,
    textShadowColor: '#fff', // Màu của shadow (đen với độ mờ là 0.5)
    textShadowOffset: { width: 1, height: 2 }, // Độ dịch chuyển của shadow theo trục x và y
    textShadowRadius: 5,
  },
  Conttext2: {
    width: '22%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 20,
    marginBottom: -15,
    marginLeft: 10,
    zIndex:1,
    textShadowColor: '#fff', // Màu của shadow (đen với độ mờ là 0.5)
    textShadowOffset: { width: 1, height: 2 }, // Độ dịch chuyển của shadow theo trục x và y
    textShadowRadius: 5,
  },
  footer: {
    position: 'relative',
    height:'5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '-30%',
    marginTop: '20%'
  },
  footerText: {
    fontSize: 15,
    margin: 0,
    color: '#fff',
    alignItems: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Các component sẽ được căn giữa theo chiều dọc
    paddingHorizontal: 20, // Khoảng cách giữa các component
  },
  button: {
    height: '60%',
    width: '11%',
    backgroundColor: '#A563D9',
    margin: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  logo: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default SignIn;