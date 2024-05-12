import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import HomeScreen from '../components/HomeScreen';
import ProductScreen from '../components/ProductScreen';
import SocialImpactScreen from '../components/SocialImpactScreen';
import connect from '../components/connect';
import AIinformation from '../components/AIinformation';
import ProfileDashboard from '../components/ProfileDashboard';
import UserCard from '../components/UserCard';
import LeaderBoard from '../components/LeaderBoard';


const Stack = createStackNavigator();



const Tabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="SocialImpactScreen" component={SocialImpactScreen} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="Connect" component={connect} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="AIinformation" component={AIinformation} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="UserCard" component={UserCard} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoard} options={{ title: "", headerShown: false }} />
        </Stack.Navigator>
    );
}

export default Tabs;
