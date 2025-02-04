import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login/Login';
import BottomNavigator from '../../components/BottomNavigator';
import Veicules from '../Veicules/Veicules';
import NewVeicule from '../Veicules/NewVeicule';
import Calendar from '../Calendar/Calendar';
import NewSchedule from '../Schedules/NewSchedule';
import ModalSheetButton from '../../components/ModalSheetButton';
import UserValidate from '../User/UserValidate';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
      <UserValidate />
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Group>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='BottomNavigator' component={BottomNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='MySchedules' component={BottomNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='Veicules' component={Veicules} options={{ title: 'Reservas', headerBackTitle: 'Voltar' }} />
          <Stack.Screen name='Calendar' component={Calendar} options={{ headerTitle: '', headerBackTitle: 'Voltar' }} />
          <Stack.Screen name='NewSchedule' component={NewSchedule} options={{ title: 'Nova reserva', headerBackTitle: 'Voltar' }} />
          <Stack.Screen name='NewVeicule' component={NewVeicule} options={{ title: 'Novo Veiculo', headerBackTitle: 'Voltar' }} />
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='ModalSheetButton' component={ModalSheetButton} options={{ title: 'Maps 🗺️' }} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
