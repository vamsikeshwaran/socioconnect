import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connect = ({ route }) => {
    const [userInputText, setUserInputText] = useState('');
    const [otherUserInputText, setOtherUserInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async (senderId, text) => {
        if (text.trim() !== '') {
            const newMessage = { id: messages.length, text, senderId };
            setMessages([...messages, newMessage]);
            try {
                const messagesString = await AsyncStorage.getItem('messages');
                let storedMessages = [];
                if (messagesString !== null) {
                    storedMessages = JSON.parse(messagesString);
                }
                storedMessages.push(newMessage);
                await AsyncStorage.setItem('messages', JSON.stringify(storedMessages));
            } catch (error) {
                console.error('Error saving message:', error);
            }
            if (senderId === 1) {
                setUserInputText('');
            } else {
                setOtherUserInputText('');
            }
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const messagesString = await AsyncStorage.getItem('messages');
                if (messagesString !== null) {
                    const storedMessages = JSON.parse(messagesString);
                    setMessages(storedMessages);
                }
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };
        loadMessages();
    }, []);

    return (
        <LinearGradient colors={['#0c4cb4', '#c86ce4']} style={styles.container}>
            <Text style={styles.header}>CONNECT</Text>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={item.senderId === 1 ? styles.userMessageContainer : styles.otherMessageContainer}>
                        <Text style={item.senderId === 1 ? styles.userMessage : styles.otherMessage}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            {route.params.title === "Client" ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={otherUserInputText}
                        onChangeText={setOtherUserInputText}
                        placeholder="Type other user's message..."
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(2, otherUserInputText)}>
                        <MaterialIcons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={userInputText}
                        onChangeText={setUserInputText}
                        placeholder="Type your message..."
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(1, userInputText)}>
                        <MaterialIcons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        color: 'white',
    },
    sendButton: {
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: '#0c4cb4',
        padding: 10,
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#0c4cb4',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 10,
    },
    otherMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#c86ce4',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 10,
    },
    userMessage: {
        color: 'white',
        fontSize: 16,
    },
    otherMessage: {
        color: 'white',
        fontSize: 16,
    },
});

export default Connect;
