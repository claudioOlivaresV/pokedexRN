import React from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}
