import { View, Text, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av'
import PrimaryButton from '../ui/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';




const ProductScreen = ({ route }) => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#000116' }}>
            <View style={{ marginTop: 20, backgroundColor: "grey", height: 50, width: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 300, borderRadius: 10 }}>
                <FontAwesome5 name="robot" size={30} color="white" onPress={() => { navigation.navigate('AIinformation', { title: route.params.title }) }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>{route.params.title}</Text>

                <ImageBackground
                    source={{ uri: 'https://w0.peakpx.com/wallpaper/1004/117/HD-wallpaper-technology-texture-blue-technology-background-creative-blue-background-technology-background-blue-neon-background-blue-neon-abstraction.jpg' }}
                    resizeMode="contain"
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}

                />
                <LinearGradient colors={['white', 'white']} style={styles.linearGradient}>
                    <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.rootcontainer}>
                                <Image source={{ uri: String(route.params.demo) }} style={styles.image} />
                            </View>
                            <Text style={styles.text}>ABSTRACT</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                                <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                                <Text style={{ marginTop: 4, color: 'grey' }}>{route.params.abstract}</Text>
                            </View>
                            <Text style={styles.text}>USP</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                                <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                                <Text style={{ marginTop: 4, color: 'grey' }}>{route.params.equity}</Text>
                            </View>
                            <Text style={styles.text}>EXISTING SYSTEM</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                                <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                                <Text style={{ marginTop: 4, color: 'grey' }}>{route.params.abstract}</Text>
                            </View>
                            <Text style={styles.text}>CURRENT MARKET VALUE</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                                <Text style={{ marginRight: 8, fontSize: 20 }}>•</Text>
                                <Text style={{ marginTop: 4, color: 'grey' }}>{route.params.retail}</Text>
                            </View>

                        </ScrollView>
                        <PrimaryButton style={{ marginBottom: 20 }} onPress={() => navigation.navigate('Connect', { title: "product" })}>CONNECT</PrimaryButton>

                    </View>
                </LinearGradient>
            </View>
        </View>
    );
}

export default ProductScreen;

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#000116',
        marginTop: 130,
        textDecorationLine: 'underline',
        paddingVertical: 10
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        resizeMode: 'cover',
        overflow: 'hidden',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '80%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
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
});
