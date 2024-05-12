import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const AIinformation = ({ route }) => {
    const [data, setData] = useState('');
    const [market, setMarket] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5001/question?query=" + route.params.title)
            .then(res => {
                setData(res.data.replace(/^\*+/gm, ''));
                setTimeout(() => setIsLoading(false), 5000);
            })
            .catch(e => console.log(e));
        axios.get("http://localhost:5001/market?query=" + route.params.title)
            .then(res => setMarket(res.data.replace(/^\*+/gm, '')))
            .catch(e => console.log(e));
    }, []);

    // Function to add line numbers to text
    const addLineNumbers = (text) => {
        return text.split('\n').map((line, index) => (
            <Text key={index} style={styles.numberedText}>{index + 1}. {line}</Text>
        ));
    };

    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            {isLoading ? (
                <View style={[styles.activityIndicator, { justifyContent: 'center' }]}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.header}>Existing Similar Products in Market</Text>
                    <View style={styles.dataContainer}>
                        {addLineNumbers(data)}
                    </View>
                    <Text style={styles.header}>Marketing Analysis</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.text}>{market}</Text>
                    </View>
                </ScrollView>
            )}
        </LinearGradient>
    );
}

export default AIinformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingLeft: 20,
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
    },
    numberedText: {
        fontSize: 18,
        marginBottom: 5,
        color: '#000000',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000000',
    },
    dataContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 10,
    },
});
