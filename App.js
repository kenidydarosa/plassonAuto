import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Button } from 'react-native';
import BottomNavigator from './src/components/BottomNavigator';
import Veicules from './src/Pages/Veicules/Veicules';
import Calendar from './src/Pages/Calendar/Calendar';
import NewSchedule from './src/Pages/Schedules/NewSchedule';
import NewVeicule from './src/Pages/Veicules/NewVeicule';
import styleJS from './src/components/style';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { DataProvider } from './src/data/DataContext'; // Importando o DataProvider

// Criando o Stack Navigator
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MySchedules'
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Veicules'
        component={Veicules}
        // options={{ title: 'Reservas' }}
        options={({ navigation }) => ({
          title: 'Reservas',
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' />,
        })}
      />
      <Stack.Screen
        name='Calendar'
        component={Calendar}
        options={({ navigation }) => ({
          headerTitle: '',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity onPress={() => alert('Adicionado!')}>
                <Ionicons name='search' size={26} color={styleJS.titleColor} />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' />,
        })}
      />
      <Stack.Screen
        name='NewSchedule'
        component={NewSchedule}
        options={({ navigation }) => ({
          title: 'Nova reserva',
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' />,
        })}
      />
      <Stack.Screen
        name='NewVeicule'
        component={NewVeicule}
        // options={{ title: 'Reservas' }}
        options={({ navigation }) => ({
          title: 'Novo Veiculo',
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' />,
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
