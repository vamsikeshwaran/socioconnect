import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import Leader from './Leader'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'


const LeaderBoard = () => {
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
        const sortedProductInfo = [...productInfo].sort((a, b) => b.sus - a.sus); // Sort productInfo based on sus in descending order

        const generatedCards = sortedProductInfo.slice(0, count).map((item, index) => (
            <Pressable>
                <Leader title={item.Title} />
            </Pressable>
        ));
        setCards(generatedCards);
    }, [count, productInfo, navigation]);

    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <ScrollView>
                <Text>LeaderBoard</Text>
                <View>
                    {cards}
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default LeaderBoard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingLeft: 20
    },
})