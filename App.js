import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Tabs from './navigation/Tabs';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {isLoading ? (
        <LinearGradient colors={["#0c4cb4", "#c86ce4"]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: 400, width: 400 }} source={require('./assets/SOcioConnect.gif')} />
        </LinearGradient>
      ) : (
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Tabs />

          </View>
        </NavigationContainer>
      )}
    </View>
  );
}

export default App;
