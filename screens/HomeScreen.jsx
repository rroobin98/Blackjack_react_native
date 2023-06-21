import { Button, StyleSheet, Text, View } from 'react-native';



export default function HomeScreen({ navigation }){
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
         title="Start Game"
          onPress={ () => {
          navigation.navigate("BlackjackScreen");
        }} 
        /> 
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00FF00',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });