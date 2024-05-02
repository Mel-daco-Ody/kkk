import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Path from '../../Utils/Api'; // Assuming Path is correctly imported
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const [userId, setUserId] = useState('');
    const [userName, setName] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [jobs, setJobs] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        showInformation();
    }, []);

    const showInformation = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decoded = jwtDecode(token);
            const accountId = decoded.accountId;

            const query = `
                query {
                    getUserNamebyID(id: "${accountId}") {
                        name
                        id
                    }
                }
            `;

            const response = await fetch(Path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const json = await response.json();
            const userName = json.data.getUserNamebyID.name;
            const userId = json.data.getUserNamebyID.id;
            setName(userName);
            setUserId(userId);
        } catch (error) {
            console.error('Error fetching name:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const query = `
                query getJobbyJobType($searchValue: String!) {
                    getJobbyJobType(JobType: $searchValue, status: "available") {
                        token
                        userId
                        status
                        price
                        jobDecription
                        _id
                        customerId
                        JobType
                        JobName
                    }
                }
            `;

            const response = await fetch(Path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    query,
                    variables: { searchValue }
                }),
            });

            const json = await response.json();
            setJobs(json.data.getJobbyJobType);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            // Add error handling or feedback for the user
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleJobPress(item)}>
            <View style={styles.item}>
                <Text style={styles.itemText}>Job Type: {item.JobType}</Text>
                <Text style={styles.itemText}>Job Description: {item.jobDecription}</Text>
                <Text style={styles.itemText}>Price: {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleJobPress = async (job) => {
        try {
            const query = `
                mutation  {
                    jobBookingGet(input: {
                        _id: "${job._id}"
                    }) {
                        token
                    }
                }
            `;

            const response = await fetch(Path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const json = await response.json();
            console.log(json.data.jobBookingGet);
            if (!json.errors) {
                console.log('Success:', json.data.jobBookingGet);
                const token = json.data.jobBookingGet.token;
                navigation.navigate('UserJobInformation');
                await AsyncStorage.setItem('userJob', token);
            }
        } catch (error) {
            console.error('Error handling job press:', error);
            // Add error handling or feedback for the user
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={require('../../../assets/images/Logo.png')} style={styles.userImage} />
                    <View>
                        <Text style={{ color: Colors.WHITE, fontFamily: 'outfit' }}>Welcome,</Text>
                        <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-medium' }}>{userName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.searchBarContainer}>
                <TextInput 
                    placeholder='Search'
                    style={styles.textInput}
                    onChangeText={setSearchValue}
                    value={searchValue}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <FontAwesome name="search" style={styles.searchbtn} size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={jobs}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        fontFamily: 'outfit',
        color: Colors.PRIMARY // Changed color for better visibility
    },
    searchBarContainer: {
        marginTop: 15,
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    searchbtn: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    item: {
        backgroundColor: '#FFFFFF',
        height:80,
        padding: 20,
        marginRight: 55,
        marginVertical: 8,
        borderRadius: 25
    },
    itemText: {
        color: Colors.PRIMARY,
        fontSize: 13,
    },
});

export default Header;