import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import PrimaryButton from '../ui/PrimaryButton'
import { Link, useNavigation } from '@react-navigation/native'
import axios from 'axios'


const SignUp = () => {
    const navigation = useNavigation();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    function handlesumbit() {
        const userData = {
            name: name,
            email,
            password
        }
        axios.post("http://localhost:5001/register", userData)
            .then(res => {
                console.log(res.data)
                if (res.data.status === "ok") {
                    Alert.alert("Registration Successfull")
                }
            }
            ).catch(e =>
                console.log(e)
            )

    }

    function handlename(enteredtext) {
        setname(enteredtext)
    }
    function handleemail(enteredtext) {
        setemail(enteredtext)
    }
    function handlepassword(enteredtext) {
        setpassword(enteredtext)
    }
    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>
            <Text style={{ textAlign: 'center', color: "white", fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Sign up</Text>
            <Text style={{ textAlign: 'center', color: "#ffff00", fontSize: 15 }}>Create your account</Text>
            <View style={{ marginTop: 30 }}>
                <Text style={styles.innertext}>Username</Text>
                <TextInput placeholder="Username" style={styles.input} onChangeText={handlename}></TextInput>
                <Text style={styles.innertext}>Email Id</Text>
                <TextInput placeholder="Email Id" style={styles.input} onChangeText={handleemail}></TextInput>
                <Text style={styles.innertext}>Password</Text>
                <TextInput placeholder="Password" style={styles.input} onChangeText={handlepassword}></TextInput>
                <PrimaryButton onPress={handlesumbit} style={styles.signinsize}>Sign up</PrimaryButton>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text>Already have an Account?</Text>
                    <Link to="/SignIn" style={{ color: 'yellow', marginLeft: 5 }}>Sign In</Link>
                </View>
            </View>
        </LinearGradient>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c4cb4',
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
    signinsize: {
        width: "75%",
        marginLeft: 50,
        marginTop: 20
    }
})