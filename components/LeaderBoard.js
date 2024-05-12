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
    const [sus, setsus] = useState('');

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
        const generateCardsAndFetchSus = async () => {

            const sortedProductInfo = [...productInfo].sort((a, b) => b.sus - a.sus);

            const generatedCards = await Promise.all(sortedProductInfo.slice(0, count).map(async (item, index) => {
                try {
                    const res = await axios.get("http://localhost:5001/sustainableindex?query=" + item.Title);
                    const sus = res.data;
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
                            <Leader title={item.Title} sustainabilityIndex={sus} />
                        </Pressable>
                    );
                } catch (error) {
                    console.log("Error:", error);
                    return null;
                }
            }));
            setCards(generatedCards);
        };

        generateCardsAndFetchSus();
    }, [count, productInfo, navigation]);

    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <ScrollView>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>LEADERBOARD</Text>

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
});
