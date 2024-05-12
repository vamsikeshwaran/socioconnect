import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

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
            <LinearGradient colors={["#6495ED", "#4169E1"]} style={[styles.cardContainer, { width: 300, padding: 20, borderRadius: 20 }]}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Sustainability Index:</Text>
                    <Text style={styles.value}>{sus}</Text>
                </View>
            </LinearGradient>
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
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 5,
    },
    value: {
        color: 'white',
        fontSize: 18,
    },
});

export default Leader;