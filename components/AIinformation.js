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
                setTimeout(() => setIsLoading(false), 5000); // Hide activity indicator after 10 seconds
            })
            .catch(e => console.log(e));
        axios.get("http://localhost:5001/market?query=" + route.params.title)
            .then(res => setMarket(res.data))
            .catch(e => console.log(e));
    }, []);

    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            {isLoading ? (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <ScrollView style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 30 }}>Existing similar products in market</Text>
                    <Text>{data}</Text>
                    <Text style={{ fontSize: 30 }}>Marketing Analysis</Text>
                    <Text>{market}</Text>
                </ScrollView>
            )}
        </LinearGradient>
    );
}

export default AIinformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingLeft: 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 150
    }
});
