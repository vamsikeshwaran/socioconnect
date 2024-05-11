import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import { TextInput } from 'react-native-gesture-handler'
import { Link, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'




const SignIn = () => {
    const navigation = useNavigation()
    const [isNone, setisNone] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [home, sethome] = useState(false)

    function handlesumbit() {
        const userdata = {
            email: email,
            password: password
        }
        axios.post("http://localhost:5001/login", userdata)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "ok") {
                    sethome(true)
                } else {
                    sethome(false);
                    Alert.alert("Invalid Login")
                }
            })
            .catch(e => console.log(e));
    }
    function handlename(enteredtext) {
        setemail(enteredtext)
    }
    function handlepassword(enteredtext) {
        setpassword(enteredtext)
    }
    function displaychange() {
        setisNone(true)
    }
    function endisplaychange() {
        setisNone(false)
    }
    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <Text style={{ textAlign: 'center', color: "white", fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Log In</Text>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={displaychange} style={styles.buttonSize}>Investor</PrimaryButton>
                <PrimaryButton onPress={endisplaychange} style={styles.buttonSize}>Entrepreneur</PrimaryButton>
            </View>
            {isNone ? (
                <View>
                    <View>
                        <Text style={{ textAlign: 'center', color: "white", fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Investor</Text>
                        <Text style={styles.innertext}>Log In</Text>
                        <TextInput placeholder="Investor Email Id" style={styles.input} onChangeText={handlename}></TextInput>
                        <Text style={styles.innertext}>Password</Text>
                        <TextInput placeholder="Investor Password" style={styles.input} onChangeText={handlepassword}></TextInput>
                    </View>
                    <PrimaryButton onPress={handlesumbit} style={styles.signinsize}>Log In</PrimaryButton>
                    {home ? (
                        navigation.navigate('HomeScreen')
                    ) : (
                        console.log("Error")
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                        <Text>Don't have an Account?</Text>
                        <Link to="/SignUp" style={{ color: 'yellow', marginLeft: 5 }}>Sign Up</Link>
                    </View>
                </View>

            ) : (
                <View>
                    <View>
                        <Text style={{ textAlign: 'center', color: "white", fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Entrepreneur</Text>
                        <Text style={styles.innertext}>Log In</Text>
                        <TextInput placeholder="Entrepreneur Email Id" style={styles.input} onChangeText={handlename}></TextInput>
                        <Text style={styles.innertext}>Password</Text>
                        <TextInput placeholder="Entrepreneur Password" style={styles.input} onChangeText={handlepassword}></TextInput>
                    </View>
                    <PrimaryButton onPress={handlesumbit} style={styles.signinsize}>Sign In</PrimaryButton>
                    {home ? (
                        navigation.navigate('SocialImpactScreen')
                    ) : (
                        console.log("Error")
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                        <Text>Don't have an Account?</Text>
                        <Link to="/SignUp" style={{ color: 'yellow', marginLeft: 5 }}>Sign Up</Link>
                    </View>
                </View>

            )}

        </LinearGradient>
    )
}

export default SignIn

const styles = StyleSheet.create({
    textstyle: {
        textAlign: "center",

    },
    container: {
        flex: 1,
        backgroundColor: '#0c4cb4',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    innertext: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    },
    buttonSize: {
        width: 170
    },
    signinsize: {
        width: "75%",
        marginLeft: 50,
        marginTop: 20
    }
})