import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import path from '../../Utils/Api'; // Assuming Path is correctly imported

interface StateVariables {
  JobDecription: string;
  price: string;
  selectedJob: string;
  jobType: string;
  showJobs: boolean;
}

interface Work {
  name: string;
}

const JobRegistration = ({navigation}) => {
  const [stateVariables, setStateVariables] = useState<StateVariables>({
    JobDecription: '',
    price: '',
    selectedJob: '',
    jobType: '',
    showJobs: false,
  });
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    getAllWorks();
  }, []);

  const getAllWorks = async () => {
    try {
      const query = `
        query {
          getAllWorks {
            name
          }
        }
      `;
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const fetchedWorks = json.data.getAllWorks;
      setWorks(fetchedWorks);
    } catch (error) {
      console.error('Error fetching works:', error);
    }
  };


  const handleLogin = async () => {
    interface JwtPayload {
      accountId: string;
    }

    const status = 'available';
    const customerId  = 'null'


    const token = await AsyncStorage.getItem('token');
    const decoded: JwtPayload = jwtDecode(token);
    console.log(decoded);
    const accountId = decoded.accountId;
    const query = `
    mutation {
        jobRegistion(input: {
            jobDecription: "${stateVariables.JobDecription}",
            price : "${stateVariables.price}",
            JobName :"${stateVariables.selectedJob}",
            JobType: "${stateVariables.jobType}",
            userId : "${accountId}",
            status : "${status}"
            customerId : "${customerId}"
      }) {
        jobDecription
        price
        JobName
        JobType
        userId
        status
        customerId
        
      }
    }
  `;

    const variables = {};

    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      Alert.alert(
        'Success',
        'Registry successful!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );

      const json = await res.json();
      console.log(json.data.jobRegistion);
      navigation.navigate('WorkBoard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

    <Image source={require('../../../assets/images/Logo.png')} style={styles.avatar} resizeMode ='contain' />
    <Text style={styles.loginText}>AsIgn</Text>
    <View style={styles.inputContainer}>


    <Text style={styles.Conttext1}>Job Description</Text>
    <TouchableOpacity style={styles.inputButton}>
        <TextInput style={styles.inputText}
        placeholder="Job Decription"
        value={stateVariables.JobDecription}
        onChangeText={text => setStateVariables({ ...stateVariables, JobDecription: text })}/>
    </TouchableOpacity>

    <View style={styles.horizontalAlign}>
    <View>
    <Text style={styles.Conttext2}>Price</Text>
    <TouchableOpacity style={styles.inputButtonHorizontal}>
        <TextInput style={styles.inputText}
        placeholder="Price"
        value={stateVariables.price}
        onChangeText={text => setStateVariables({ ...stateVariables, price: text })}/>
    </TouchableOpacity>
    </View>
    
    <View>
    <Text style={styles.Conttext3}>Job Type</Text>
    <TouchableOpacity style={styles.inputButtonHorizontal}>
        <TextInput style={styles.inputText}
        placeholder="Job Type"
        value={stateVariables.jobType}
        onChangeText={text => setStateVariables({ ...stateVariables, jobType: text })}
      />
    </TouchableOpacity>
    </View>
    </View>
    <TouchableOpacity style={styles.jobButton} onPress={() => setStateVariables({ ...stateVariables, showJobs: !stateVariables.showJobs })}>
        <Text style={styles.jobButtonText}>Select Job</Text>
      </TouchableOpacity>

      {stateVariables.showJobs && (
        <View style={styles.jobsContainer}>
          {works.map((work, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.jobOption, stateVariables.selectedJob === work.name && styles.selectedJobOption]}
              onPress={() => setStateVariables({ ...stateVariables, selectedJob: work.name })}
            >
              <Text style={styles.jobText}>{work.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Registry</Text>
    </TouchableOpacity>
    
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Scroll: {
    position: 'relative',
    backgroundColor: '#A563D9',
    marginTop:10
  },
  container: {
    flex: 1,
    backgroundColor: '#A563D9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 1000
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
    fontsize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#9435DF',
    marginTop: -10,
    marginLeft:'50%'
  },
  inputText: {
    color: '#9435DF',
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
  inputButtonHorizontal: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor:'grey',
    borderWidth: 2,
    paddingRight: '30%',
    width: 154
  },
  
  Conttext1: {
    width: '35%',
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
    width: 40,
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
  Conttext3: {
    width: 68,
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
  horizontalAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  jobButton: {
    backgroundColor: '#9435DF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 0,
    marginTop:15
  },
  jobButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  jobsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  jobOption: {
    backgroundColor: '#A563D9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  selectedJobOption: {
    backgroundColor: '#808080',
  },
  jobText: {
    fontSize: 16,
    color: '#FFFFFF',
  },

});

export default JobRegistration;