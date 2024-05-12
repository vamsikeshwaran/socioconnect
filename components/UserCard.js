import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const UserCard = ({ title, retail, equity, demo, abstract, info }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.rootContainer}>
            <Pressable
                style={styles.contentContainer}
                onPress={() => navigation.navigate('ProductScreen', { title, retail, equity, demo, abstract, info })}
            >
                <LinearGradient colors={["#6495ED", "#4169E1"]} style={styles.investorInfo}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Retail Price</Text>
                        <Text style={styles.value}>{retail}</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Claim</Text>
                        <Text style={styles.value}>{equity}</Text>
                    </View>
                    <View style={styles.line} />

                </LinearGradient>

                <View style={styles.pageDivision} />

            </Pressable>
        </View >
    );
}

export default UserCard;

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 40,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    investorInfo: {
        borderRadius: 20,
        padding: 10,
        width: 260,
    },
    title: {
        marginBottom: 6,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    infoContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#FFA500',
    },
    value: {
        marginTop: 4,
        color: 'white',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'white',
        opacity: 0.25,
        marginVertical: 5,
    },
    pageDivision: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginTop: 12,
        width: 280,
        marginLeft: -15,
    },
    heading: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
    },
});
