import { View, Text, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import UserCard from './UserCard';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg'
import {

    BarChart,

} from "react-native-chart-kit";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ProfileDashboard = () => {
    const navigation = useNavigation();
    const [count, setCount] = useState('');
    const [cards, setCards] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [userinfo, setuserinfo] = useState([])
    const [username, setusername] = useState([])
    const [amount, setamount] = useState([])
    const labelWidth = Math.max(...username.map(label => label.length)) * 10;
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
        axios.get("http://localhost:5001/userinfo")
            .then(res => {
                setuserinfo(res.data);
            })
            .catch(e => {
                console.log("Error:", e);
            });

    }, []);

    useEffect(() => {
        const generatedCards = [];
        const usernames = [];
        const InvestedAmount = []
        for (let i = 0; i < count && i < productInfo.length; i++) {
            const name = productInfo[i]?.Title.split(' ')[0];
            const amount = productInfo[i]?.InvestedAmount;
            usernames.push(name);
            InvestedAmount.push(amount)
            generatedCards.push(
                <Pressable key={i} onPress={() => navigation.navigate('SocialImpactScreen')}>
                    <UserCard title={productInfo[i].Title} retail={productInfo[i].Retail} equity={productInfo[i].Equity} demo={productInfo[i].Demo} abstract={productInfo[i].Abstract} info={productInfo[i].Introduction} />
                </Pressable>
            );
        }
        setusername(usernames);
        setamount(InvestedAmount);
        setCards(generatedCards);

    }, [count, productInfo, navigation]);
    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <Text style={styles.heading}>Your Projects</Text>
            <ScrollView>
                <View>
                    {cards}
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.heading}>Project Investment</Text>
                    <BarChart
                        data={{
                            labels: username,
                            datasets: [{
                                data: amount
                            }]
                        }}
                        width={350}
                        height={220}
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "",
                            backgroundGradientFrom: "",
                            backgroundGradientTo: "",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                                borderTopRightRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            },
                            barPercentage: 0.5,
                            fontSize: 10,
                            fontWeight: 'bold'
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
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
        marginTop: 10,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
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
