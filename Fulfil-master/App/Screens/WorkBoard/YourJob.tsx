import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { jwtDecode } from 'jwt-decode'; // Fixed import name
import path from '../../Utils/Api'; // Assuming Path is correctly imported

// Define JwtPayload interface before usage
interface JwtPayload {
  name: string;
  accountId: string;
}

const JobInfoBox = ({ navigation }) => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    handlePress();
  }, []);

  const handlePress = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('Token is empty or null');
        return;
      }

      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.accountId;

      const query = `
        query getYourJob($name: String!) {
          getYourJob(userId: $name) {
            userId
            token
            price
            jobDecription
            _id
            JobType
            JobName
          }
        }
      `;

      const variables = { name: userId };

      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await response.json();
      const { getYourJob: jobData } = json.data; // Updated response key
      console.log(jobData);
      setJobList(jobData);
    } catch (error) {
      console.error('Error fetching job info:', error);
    }
  };


  const handleJobPress = async (job) => {
    console.log('Pressed job:', job._id);
    try {
      const query = `
        mutation {
          jobBookingGet(input: {
            _id: "${job._id}"
          }) {
            token
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
      console.log(json.data.jobBookingGet);
      if (!json.errors) {
        // Phản hồi thành công
        console.log('Success:', json.data.jobBookingGet);
        const token = json.data.jobBookingGet.token;

        const decoded = jwtDecode(token);
        console.log(decoded);

        navigation.navigate('deleteJob')

        // Lưu trữ token vào AsyncStorage
        await AsyncStorage.setItem('userJob', token);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job List</Text>

      {jobList.map((job, index) => (
        <TouchableOpacity
          key={index}
          style={styles.jobContainer}
          onPress={() => handleJobPress(job)}
        >
          <Text style={styles.jobName}>{job.JobName}</Text>
          <Text style={styles.jobType}>{job.JobType}</Text>
          <Text style={styles.jobDescription}>{job.jobDecription}</Text>
          <Text style={styles.jobPrice}>Price: {job.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  jobContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  jobName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobType: {
    fontSize: 16,
    marginBottom: 8,
  },
  jobDescription: {
    marginBottom: 8,
  },
  jobPrice: {
    fontWeight: 'bold',
  },
});

export default JobInfoBox;