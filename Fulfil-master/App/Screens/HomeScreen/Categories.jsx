import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import Path from '../../Utils/Api'; // Assuming Path is correctly imported
import BookingJob2 from '../BookingScreen/BookingJob2'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
  
    useEffect(() => {
        getAllcategory(); // Changed to fetch icons from the server
    }, []);

    const getAllcategory = async () => {
        try {
            const query = `
                query {
                    getIconMainScreen(showIn : "MainScreen" ) {
                        showIn
                        name
                        data
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
            const icons = json.data.getIconMainScreen;

            if (Array.isArray(icons)) {
                const updatedCategories = icons.map(icon => ({
                    title: icon.name,
                    onPress: () => handleCategoryPress(icon.name),
                    imageBase64: `data:image/jpeg;base64,${icon.data}`,
                }));
                setCategories(updatedCategories);
            } else {
                console.error('Icons data is not an array:', icons);
            }
        } catch (error) {
            console.error('Error fetching icons:', error);
        }
    };

    const handleCategoryPress = async (categoryName) => {
        console.log('Category pressed:', categoryName);
        console.log(categoryName);
        
        const query = `
            mutation {
                chooseWork(input: {name : "${categoryName}"}) {
                    token
                }
            
            }
        `;
        
        const variables = {};
        
        try {
            const res = await fetch(Path, {
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
            
            if (!json.errors) {
                console.log('Success:', json.data.chooseWork);
                const token = json.data.chooseWork.token;
                
                const decoded = jwtDecode(token);
                console.log(decoded);

                await AsyncStorage.setItem('job', token);
                navigation.navigate('BookingJob2');
            } else {
                console.error('Mutation error:', json.errors);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ marginTop: 10 }}>
            <Heading text={'Categories'} isViewAll={true} />
            <FlatList
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.container}
                        onPress={item.onPress}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={{ uri: item.imageBase64 }}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <Text style={{ fontFamily: 'outfit-medium', marginTop: 5 }}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title.toString()} // Changed to use title as the key
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  iconContainer:{
    backgroundColor:Colors.LIGHT_GRAY,
    padding:17,
    borderRadius:99,
    marginHorizontal: 15
  }
});
