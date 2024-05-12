import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Leader = ({ title }) => {
    const [sus, setsus] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5001/sustainableindex?query=" + title)
            .then(res => {
                setsus(res.data);
            })
            .catch(e => {
                console.log("Error:", e);
            });
    }, []);

    return (

        <View style={styles.container}>



            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.label}>Sustainability Index:</Text>
                <Text style={styles.value}>{sus}</Text>
            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContainer: {
        borderRadius: 20,
        padding: 20,
        width: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    label: {
        fontWeight: 'bold',
        color: '#FFA500',
        marginBottom: 5,
    },
    value: {
        color: 'white',
        fontSize: 18,
    },
});

export default Leader;
