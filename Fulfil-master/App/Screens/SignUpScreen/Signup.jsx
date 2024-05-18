import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, PanResponder, Animated } from 'react-native';
import { ScrollView, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

  
  const AccountRegister = ({navigation}) => {
    const [stateVariables, setStateVariables] = useState({
      username: '',
      password: '',
      name: '',
      nhaplaimatkhau: '',
      email: '',
      address: '',
      gender: '',
      age: '',
      phone: '',
    });
  
    const dangKy = async () => {
      // Kiểm tra xem mật khẩu có khớp không
      if (stateVariables.password !== stateVariables.nhaplaimatkhau) {
        alert('Mật khẩu không khớp');
        return;
      }
  
      const query = `
        mutation {
          registerAccount(input: {
            name: "${stateVariables.name}",
            password : "${stateVariables.password}",
            username :"${stateVariables.username}",
            email: "${stateVariables.email}",
            address: "${stateVariables.address}",
            gender: "${stateVariables.gender}",
            age: ${stateVariables.age},
            phone: "${stateVariables.phone}"
          }) {
            name
            password
            username
            email
            address
            gender
            age
            phone
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
        console.log(json.data.registerAccount);
        Alert.alert(
          'Success',
          'Login successful!',
          [
            { text: 'OK', onPress: () => navigation.push('SignIn')}
          ],
          { cancelable: false }
        );
        
      } catch (error) {
        console.log(error);
      }
      
  
  
    };

  const [component, toggleComponent] = useState('firstComponent')

  const changeComponent = (componentName) => {
    toggleComponent(componentName)
  }

  // const navigation = useNavigation();
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
        navigation.navigate('SignIn');
        console.log('To Signin');
      }
      // Khôi phục vị trí ban đầu của pan
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    }
  });


  return (
    <ScrollView style={styles.Scroll} {...panResponder.panHandlers}>
      <View style={styles.container}>
        <Image source={require('../../../assets/images/Logo.png')} style={styles.avatar} resizeMode='contain' />
        <Text style={styles.loginText}>Sign Up</Text>

        <View style={styles.inputContainer}>

          {component === 'firstComponent' ? (
            <View>
            <Text style={styles.Conttext8}
              >Name</Text>
              <TouchableOpacity style={styles.inputButton}>
                <TextInput style={styles.inputText} 
                value={stateVariables.name}
                onChangeText={(text) => setStateVariables({ ...stateVariables, name: text })}
                placeholder="What is your password" secureTextEntry={true} />
              </TouchableOpacity>


            <Text style={styles.Conttext1} >ID Name</Text>
            <TouchableOpacity style={styles.inputButton}>
              <TextInput style={styles.inputText} 
              value={stateVariables.username}
              onChangeText={(text) => setStateVariables({ ...stateVariables, username: text })}
              placeholder="What is your ID name" />
            </TouchableOpacity>


            <Text style={styles.Conttext2}>Password</Text>
            <TouchableOpacity style={styles.inputButton}>
              <TextInput style={styles.inputText}
              value={stateVariables.password}
              onChangeText={(text) => setStateVariables({ ...stateVariables, password: text })}
              secureTextEntry={true} 
              placeholder="What is your password"/>
            </TouchableOpacity>


            <Text style={styles.Conttext3}>Repeat Password</Text>
            <TouchableOpacity style={styles.inputButton}>
              <TextInput style={styles.inputText}
              value={stateVariables.nhaplaimatkhau}
              onChangeText={(text) => setStateVariables({ ...stateVariables, nhaplaimatkhau: text })}
              secureTextEntry={true} 
              placeholder="Reenter your password"/>
            </TouchableOpacity>


            <TouchableOpacity style={styles.loginButton} onPress={() => changeComponent('secondComponent')}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
            
          ) : component === 'secondComponent' ? (

            <View>
            <Text style={styles.Conttext4}>Email</Text>
            <TouchableOpacity style={styles.inputButton}>
              <TextInput style={styles.inputText}
              value={stateVariables.email}
              onChangeText={(text) => setStateVariables({ ...stateVariables, email: text })} 
              placeholder="What is your ID name" />
            </TouchableOpacity>


            <Text style={styles.Conttext5}>Address</Text>
            <TouchableOpacity style={styles.inputButton}>
              <TextInput style={styles.inputText}
              value={stateVariables.address}
              onChangeText={(text) => setStateVariables({ ...stateVariables, address: text })} 
              placeholder="What is your password" secureTextEntry={true} />
            </TouchableOpacity>


            <Text style={styles.Conttext6}>Gender</Text>
            <TouchableOpacity style={styles.inputButton}>
              <TextInput style={styles.inputText}
              value={stateVariables.gender}
              onChangeText={(text) => setStateVariables({ ...stateVariables, gender: text })}
              placeholder="Reenter your password" secureTextEntry={true} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.loginButton} onPress={() => changeComponent('thirdComponent')}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          ) : (
            <View>
              <Text style={styles.Conttext7}>Age</Text>
              <TouchableOpacity style={styles.inputButton}>
                <TextInput style={styles.inputText}
                value={stateVariables.age}
                onChangeText={(text) => setStateVariables({ ...stateVariables, age: text })} 
                placeholder="What is your ID name" />
              </TouchableOpacity>


              <Text style={styles.Conttext8}>Phone Number</Text>
              <TouchableOpacity style={styles.inputButton}>
                <TextInput style={styles.inputText}
                value={stateVariables.phone}
                onChangeText={(text) => setStateVariables({ ...stateVariables, phone: text })} 
                placeholder="What is your password" secureTextEntry={true} />
              </TouchableOpacity>

              
              <TouchableOpacity style={styles.loginButton} onPress={dangKy}>
                <Text style={styles.loginButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Or sign up with</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Head to Gmail')}>
              <Image source={require('../../../assets/images/gmail.png')} style={styles.logo} resizeMode='contain' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Head to Facebook')}>
              <Image source={require('../../../assets/images/facebook.png')} style={styles.logo} resizeMode='contain' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Head to Instagram')}>
              <Image source={require('../../../assets/images/instagram.png')} style={styles.logo} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>Already have an account ?<Text style={{ color: '#fff' }} > Swipe down</Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

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
    marginTop: '-40%',
    marginBottom: '5%'
  },
  loginText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: -30,
    marginLeft: '23%',
    textShadowColor: '#A563D9',
    textShadowOffset: { width: 10, height: 15 },
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
    borderColor: 'grey',
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
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
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
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  Conttext3: {
    width: '39%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 20,
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  Conttext4: {
    width: '12%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 25,
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  Conttext5: {
    width: '19%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 25,
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  Conttext6: {
    width: '17%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 25,
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  Conttext7: {
    width: '9%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 25,
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  Conttext8: {
    width: '33%',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: 25,
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  footer: {
    position: 'relative',
    height: '5%',
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
    alignItems: 'center',
    paddingHorizontal: 20,
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

export default AccountRegister;