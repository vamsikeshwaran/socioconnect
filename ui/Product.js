import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { Video } from 'expo-av'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

const Product = () => {
    const [title, settitle] = useState('')

    const navigation = useNavigation();
    useEffect(() => {
        axios.get("http://localhost:5001/productinfo")
            .then(res => {
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    });
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.rootcontainer}>
                    <Image source={{ uri: 'https://media.wired.com/photos/624764ed48046e8802c9c5b8/master/w_2240,c_limit/Learn-ASL-Online-Gear-495674588.jpg' }} style={styles.image} />
                </View>
                <Text style={styles.text}>ABSTRACT</Text>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                    <Text style={{ marginTop: 4, color: 'grey' }}>Profit margin of 50Rs for 2 years</Text>
                </View>
                <Text style={styles.text}>USP</Text>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                    <Text style={{ marginTop: 4, color: 'grey' }}>Profit margin of 50Rs for 2 years</Text>
                </View>
                <Text style={styles.text}>EXISTING SYSTEM</Text>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                    <Text style={{ marginTop: 4, color: 'grey' }}>Profit margin of 50Rs for 2 years</Text>
                </View>
                <Text style={styles.text}>CURRENT MARKET VALUE</Text>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                    <Text style={{ marginTop: 4, color: 'grey' }}>Profit margin of 50Rs for 2 years</Text>
                </View>
                <Text style={styles.text}>DEMO VIDEO</Text>
                <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }} style={{ width: 350, height: 200, borderRadius: 35, marginTop: 10, marginLeft: 12 }} useNativeControls shouldPlay />


            </ScrollView>
            <PrimaryButton style={{ marginBottom: 20 }} onPress={() => navigation.navigate('Connect')}>CONNECT</PrimaryButton>

        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rootcontainer: {
        alignItems: 'center',
        marginTop: 25
    },
    image: {
        width: 330,
        height: 200,
        borderRadius: 20,
    },
    text: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
})