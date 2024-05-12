import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from "./config"
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from '../ui/PrimaryButton';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'



const SocialImpactScreen = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [document, setdocument] = useState(null);
    const [title, settitle] = useState('')
    const [abstract, setabstract] = useState('')
    const [info, setinfo] = useState('')
    const [demo, setdemo] = useState('')
    const [retail, setretail] = useState('')
    const [equity, setequity] = useState('')
    const [Invested, setInvested] = useState()

    function handlesumbit() {
        const userData = {
            Title: title,
            Abstract: abstract,
            Information: info,
            Demo: demo,
            Retail: retail,
            Equity: equity,
            InvestedAmount: Invested
        }
        axios.post("http://localhost:5001/product", userData)
            .then(res => {
                console.log(res.data)
                if (res.data.status === "ok") {
                    Alert.alert("Product Creation Successfull")
                }
            }
            ).catch(e =>
                console.log(e)
            )

    }

    function handletitle(enteredtext) {
        settitle(enteredtext)
    }
    function handleabstract(enteredtext) {
        setabstract(enteredtext)
    }
    function handleinfo(enteredtext) {
        setinfo(enteredtext)
    }
    function handleretail(enteredtext) {
        setretail(enteredtext)
    }
    function handleequity(enteredtext) {
        setequity(enteredtext)
    }
    function handleInvested(enteredtext) {
        setInvested(enteredtext)
    }

    const selectDoc = async () => {
        try {
            const documents = await DocumentPicker.getDocumentAsync({
                multiple: true,
                type: ['application/pdf', 'image/*'],
            });
            setdocument(documents.assets[0].uri)
        } catch (err) {
            console.log(err)
        }
    }

    const uploadMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }

        setUploading(true);

        try {
            if (!result.cancelled) {
                const { uri } = result.assets[0];
                if (!uri) {
                    throw new Error('Image URI is not available.');
                }

                const fileInfo = await FileSystem.getInfoAsync(uri);
                if (!fileInfo.exists) {
                    throw new Error('File does not exist.');
                }

                const response = await fetch(uri);
                const blob = await response.blob();

                const filename = `${Date.now()}`;

                const ref = firebase.storage().ref().child(filename);
                await ref.put(blob);

                setUploading(false);
                Alert.alert('Photo Uploaded!!');
                setImage(null);
                const downloadURL = await ref.getDownloadURL();
                setdemo(downloadURL);
            }
        } catch (error) {
            console.error('Error while uploading:', error.message);
            setUploading(false);
        }
    };

    const uploadDocument = async () => {
        if (!document) {
            Alert.alert('Please document first');
            return;
        }

        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(document);
            const response = await fetch(uri);
            const blob = await response.blob();

            const timestamp = Date.now();
            const filename = `${timestamp}_${document.name}`;

            const ref = firebase.storage().ref().child('sample.pdf');
            await ref.put(blob);

            Alert.alert('PDF Uploaded Successfully');
            axios.get("http://localhost:5001/pdf").then(res => {
                console.log(res.data);
                settitle(res.data.Title)
                setabstract(res.data.Abstract)
                setinfo(res.data.Introduction)
            }
            ).catch(e =>
                console.log(e))
        } catch (error) {
            console.error('Error uploading PDF:', error);
            Alert.alert('Failed to upload PDF');
        }


    };

    return (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={styles.container}>

            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.button} onPress={selectDoc}>
                    <Text style={styles.buttonText}>Pick a Document</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={uploadDocument}>
                    <Text style={styles.buttonText}>Submit Document</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.line} />
                <Text style={{ fontWeight: 'bold', marginLeft: 18, marginBottom: 12 }}>OR</Text>
                <View style={styles.line} />
            </View>
            <Text style={{ textAlign: 'center', color: "white", fontSize: 30, fontWeight: 'bold', marginBottom: 20, textDecorationLine: 'underline', }}>CLIENT FORM</Text>
            <ScrollView>


                <Text style={styles.innertext}>Product Title</Text>
                <TextInput placeholder="Title" style={styles.input} onChangeText={handletitle}>
                    <Text>{title}</Text>
                </TextInput>
                <Text style={styles.innertext}>Abstract</Text>
                <TextInput placeholder="Abstract" style={{ height: 150, margin: 12, borderWidth: 1, padding: 10, borderRadius: 20, backgroundColor: 'white' }} multiline={true} onChangeText={handleabstract}>
                    <Text>{abstract}</Text>
                </TextInput>
                <Text style={styles.innertext}>Information</Text>
                <TextInput placeholder="Information" style={{ height: 150, margin: 12, borderWidth: 1, padding: 10, borderRadius: 20, backgroundColor: 'white' }} multiline={true} onChangeText={handleinfo}>
                    <Text>{info}</Text>
                </TextInput>
                <Text style={styles.innertext}>Retail Price</Text>
                <TextInput placeholder="Retail Price" style={styles.input} onChangeText={handleretail}>
                    <Text>{retail}</Text>
                </TextInput>
                <Text style={styles.innertext}>Equity</Text>
                <TextInput placeholder="Retail Price" style={styles.input} onChangeText={handleequity}>
                    <Text>{equity}</Text>
                </TextInput>
                <Text style={styles.innertext}>Invested Amount</Text>
                <TextInput placeholder="Retail Price" style={styles.input} onChangeText={handleInvested}>
                    <Text>{Invested}</Text>
                </TextInput>
                <View style={{ alignItems: 'center', marginTo: 10 }}>
                    <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={uploadMedia}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                    {uploading === true && <ActivityIndicator size="large" color="grey" />}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <PrimaryButton style={{ marginBottom: 20, backgroundColor: '#28a745', height: 40, width: 300 }} onPress={handlesumbit}>SUBMIT</PrimaryButton>
                </View>

            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ height: 50, width: 50, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Entypo name="chat" size={30} color="black" onPress={() => navigation.navigate('Connect', { title: "Client" })} />
                </View>
                <View style={{ height: 50, width: 50, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Entypo name="user" size={30} color="black" onPress={() => navigation.navigate('ProfileDashboard')} />
                </View>
            </View>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    button: {
        borderRadius: 25,
        width: 200,
        height: 50,
        backgroundColor: '#c86ce4',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: '#007bff',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    line: {
        width: 140,
        height: 2,
        backgroundColor: 'black',
        marginTop: 5,
        marginLeft: 20
    },
    innertext: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#f5f3f2'
    },
});

export default SocialImpactScreen;
