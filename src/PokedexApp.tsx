import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackNavigaror} from './presentation/navigator/StackNavigaror';
import {PaperProvider} from 'react-native-paper';

export const PokedexApp = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigaror />
      </NavigationContainer>
    </PaperProvider>
  );
};
