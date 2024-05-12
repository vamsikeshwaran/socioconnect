import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../ui/Card';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import LeaderBoard from './LeaderBoard';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [count, setCount] = useState('');
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [newcard, setnewcard] = useState([])
    const [productInfo, setProductInfo] = useState([]);

    const handleSearch = (enteredText) => {
        setSearch(enteredText);
    };
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
                <Pressable key={i} onPress={() => navigation.navigate('Details', { id: i })}>
                    <Card title={productInfo[i].Title} retail={productInfo[i].Retail} equity={productInfo[i].Equity} demo={productInfo[i].Demo} abstract={productInfo[i].Abstract} info={productInfo[i].Information} InvestedAmount={productInfo[i].InvestedAmount} />
                </Pressable>
            );
        }
        setCards(generatedCards);
    }, [count, productInfo]);


    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <View style={styles.textbox}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable style={styles.containers} onPress={() => navigation.navigate('ProfileDashboard')}>
                        <Text style={styles.text}>V</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'column', marginRight: 165 }}>
                        <Text style={styles.textstyle}>Welcome Back</Text>
                        <Text style={styles.textstyle}>SOCIOCONNECT</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Search Startups" style={styles.input} onChangeText={(text) => handleSearch(text)} />
                    <FontAwesome name="search" size={20} color="black" style={styles.icon} />
                </View>
            </View>
            <ScrollView style={styles.subcontainer}>
                <View>
                    {cards}
                </View>
            </ScrollView>
            <Pressable style={styles.addButton} onPress={() => navigation.navigate('LeaderBoard')}>
                <MaterialIcons name="leaderboard" size={24} color="black" />
            </Pressable>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingLeft: 20
    },
    subcontainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: '83%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        opacity: 0.80
    },
    textbox: {
        marginBottom: 30,
    },
    textstyle: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 30,
        width: 330
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 18,
        transform: [{ translateY: -10 }],
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 30,
    },
    containers: {
        backgroundColor: 'orange',
        height: 40,
        width: 40,
        padding: 8,
        marginLeft: -1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
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
