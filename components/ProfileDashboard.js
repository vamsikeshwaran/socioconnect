import { View, Text, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import UserCard from './UserCard';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg'

const ProfileDashboard = () => {
    const navigation = useNavigation();
    const [count, setCount] = useState('');
    const [cards, setCards] = useState([]);
    const [productInfo, setProductInfo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/count")
            .then(res => {
                setCount(res.data.count);
            })
            .catch(e => {
                console.log("Error:", e);
            });

        axios.get("http://localhost:5001/productinfo")
            .then(res => {
                setProductInfo(res.data);
            })
            .catch(e => {
                console.log("Error:", e);
            });
    }, []);

    useEffect(() => {
        const generatedCards = [];
        for (let i = 0; i < count && i < productInfo.length; i++) {
            generatedCards.push(
                <Pressable key={i} onPress={() => navigation.navigate('SocialImpactScreen')}>
                    <UserCard title={productInfo[i].Title} retail={productInfo[i].Retail} equity={productInfo[i].Equity} demo={productInfo[i].Demo} abstract={productInfo[i].Abstract} info={productInfo[i].Introduction} />
                </Pressable>
            );
        }
        setCards(generatedCards);
    }, [count, productInfo, navigation]);

    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <Text style={styles.heading}>Your Projects</Text>
            <ScrollView>
                <View>
                    {cards}
                </View>
            </ScrollView>
            <Pressable style={styles.addButton} onPress={() => navigation.navigate('SocialImpactScreen')}>
                <AntDesign name="plus" size={24} color="black" />
            </Pressable>
        </LinearGradient>
    );
}

export default ProfileDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 20
    },
    heading: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'grey',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
    },
});
