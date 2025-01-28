import React from 'react';
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { DataProvider } from './src/data/DataContext';
import AppStack from './src/Pages/AppStack/AppStack';

const App = () => {
  return (
      <PaperProvider>
        <DataProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </DataProvider>
      </PaperProvider>
  );
};

export default App;

