import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import BlackjackScreen from "./screens/BlackjackScreen";




const Stack = createNativeStackNavigator();





export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
      <Stack.Screen name="BlackjackScreen" component={BlackjackScreen} options={{ title: 'Blackjack Game' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


