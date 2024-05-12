import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'


const Card = ({ key, title, retail, equity, demo, abstract, info, InvestedAmount }) => {
    const navigation = useNavigation()
    const [logstate, setlogostate] = useState(false)
    const [bookmarkstate, setbookmarkstate] = useState(false)
    const [sus, setsus] = useState('')
    function changebookmarkstate() {
        setbookmarkstate(true)
    }
    function prebookmarkstate() {
        setbookmarkstate(false)
    }

    function changelogostate() {
        setlogostate(true)
    }
    function prelogostate() {
        setlogostate(false)
    }
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
        <View style={styles.rootcontainer} value={key}>
            <View style={styles.container}>
                <Text style={styles.text}>V</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.infoContainer}>
                        <Text>Vamsikeshwaran</Text>
                        <Text>{title}</Text>
                    </View>
                    <View>
                        {bookmarkstate ? (
                            <FontAwesome name="bookmark" size={22} color="blue" onPress={prebookmarkstate} />
                        ) : (
                            <FontAwesome5 name="bookmark" size={22} color="black" onPress={changebookmarkstate} />
                        )}
                    </View>
                </View>

                <Pressable onPress={() => navigation.navigate('ProductScreen', {
                    title: title,
                    retail: retail,
                    equity: equity,
                    demo: demo,
                    abstract: abstract,
                    info: info
                })}>
                    <Image
                        source={{ uri: String(demo) }}
                        style={styles.image}
                    />
                </Pressable>

                <View style={styles.line} />
                <View style={styles.lines} />
                <View>
                    <LinearGradient colors={["#b2beb5", "#a9a9a9"]} style={styles.investorinfo}>
                        <Text style={{ fontWeight: 'bold' }}>Retail Price</Text>
                        <View style={styles.darkline} />
                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={{ marginTop: 4 }}>{retail}</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>Claim</Text>
                        <View style={styles.darkline} />
                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={{ marginTop: 4, marginBottom: 10 }}>{equity}</Text>
                        </View>
                        <View style={styles.darkline} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 2, marginBottom: 5 }}>
                            <Text>Sustainability Index: </Text>
                            <Text>{sus}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 2, marginBottom: 5 }}>
                            <Text>Invested Amount: </Text>
                            <Text>{InvestedAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo name="eye" size={16} color="black" />
                            <Text style={{ marginLeft: 10 }}>24</Text>

                            {logstate ? (
                                <View>
                                    <AntDesign name="heart" size={16} color="red" style={styles.logostyle} onPress={prelogostate} />
                                </View>
                            ) : (
                                <View>
                                    <AntDesign name="hearto" size={16} color="black" style={styles.logostyle} onPress={changelogostate} />
                                </View>
                            )}


                        </View>

                    </LinearGradient>
                    <View style={styles.pagedivision} />
                </View>


            </View>

        </View>

    )
}

export default Card

const styles = StyleSheet.create({
    rootcontainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
    },
    container: {
        backgroundColor: 'orange',
        height: 40,
        width: 40,
        padding: 8,
        marginLeft: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
    },
    contentContainer: {
        marginLeft: 10,
    },
    infoContainer: {
        marginBottom: 10,
    },
    image: {
        width: 260,
        height: 170,
        borderRadius: 15,

    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        opacity: 0.25,
        marginTop: 5
    },
    lines: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginTop: 2,
        opacity: 0.25,
        marginBottom: 5
    },
    investorinfo: {
        backgroundColor: '#FFE5B4',
        height: 180,
        borderRadius: 20,
        justifyContent: 'center',
        padding: 10,
        width: 260,
    },
    overlapcontainer: {
        position: 'relative'
    },
    bullet: {
        marginRight: 8,
        fontSize: 20,
    },
    darkline: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
    },
    logostyle: {
        marginLeft: 170
    },
    pagedivision: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginTop: 12,
        width: 280,
        marginLeft: -15
    }

})
