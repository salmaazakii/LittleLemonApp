import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={'Onboarding'} component={Onboarding}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;