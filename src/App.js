import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigation from './navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';


function App() {
  const [text, setText] = useState("");


  const getData = async () => {
    console.log("Text", await AsyncStorage.getItem('text'));

  }

  const handlePress = async () => {
    if (isConnected) {
      //api call
    } else {
      try {
        await AsyncStorage.setItem('text', JSON.stringify(text));
        console.log("Text saved successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getData()
  }, []);

  return (
    <NavigationContainer>
    <StackNavigation/>
      {/* <Text>Is online</Text>
      <Text style={{ color: isConnected ? "green" : "red" }}>
        is connected ({type}): {isConnected}
      </Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        value={text}
        onChangeText={setText}
      />
      <Button onPress={handlePress} title='submit' />
      <Text>{text}</Text> */}
    </NavigationContainer>
  );
}

export default App;
