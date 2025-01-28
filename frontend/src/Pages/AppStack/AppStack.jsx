// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity, View, Button, Text } from 'react-native';
// import IconWithLabel from '../../components/IconWithLabel';
// import Login from '../Login/Login';
// import BottomNavigator from '../../components/BottomNavigator';
// import Veicules from '../Veicules/Veicules';
// import NewVeicule from '../Veicules/NewVeicule';
// import Calendar from '../Calendar/Calendar';
// import NewSchedule from '../Schedules/NewSchedule';
// import styleJS from '../../components/style';

// // Cria o stack navigator (navegação em pilha)
// const Stack = createNativeStackNavigator();

// // Define o componente principal de navegação do aplicativo
// const AppStack = () => {
//   return (
//     // Define o Stack Navigator com a tela inicial sendo 'Login'
//     <Stack.Navigator initialRouteName='Login'>
//       {/* Tela de Login*/}
//       <Stack.Screen
//         name='Login'
//         component={Login}
//         options={{ headerShown: false }} // Configura para não mostrar o cabeçalho
//       />

//       {/* Tela de Navegação Inferior */}
//       <Stack.Screen
//         name='BottomNavigator'
//         component={BottomNavigator}
//         options={{ headerShown: false }} // O cabeçalho é ocultado
//       />

//       {/* Tela de MySchedules (usando o BottomNavigator)*/}
//       <Stack.Screen
//         name='MySchedules'
//         component={BottomNavigator}
//         options={{ headerShown: false }} // O cabeçalho é ocultado
//       />

//       {/* Tela de Veículos*/}
//       <Stack.Screen
//         name='Veicules'
//         component={Veicules}
//         options={({ navigation }) => ({
//           title: 'Reservas', // Título da tela
//           headerBackTitle: 'Voltar',
//         })}
//       />

//       {/* Tela de Calendário */}
//       <Stack.Screen
//         name='Calendar'
//         component={Calendar}
//         options={({ navigation }) => ({
//           headerTitle: '', // Não exibe título no cabeçalho
//           headerBackTitle: 'Voltar',
//         })}
//       />

//       {/* Tela de Novo Agendamento */}
//       <Stack.Screen
//         name='NewSchedule'
//         component={NewSchedule}
//         options={({ navigation }) => ({
//           title: 'Nova reserva', // Título da tela
//           headerBackTitle: 'Voltar',
//         })}
//       />

//       {/* Tela de Novo Veículo */}
//       <Stack.Screen
//         name='NewVeicule'
//         component={NewVeicule}
//         options={({ navigation }) => ({
//           title: 'Novo Veiculo', // Título da tela
//           headerBackTitle: 'Voltar',
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppStack;


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login/Login';
import BottomNavigator from '../../components/BottomNavigator';
import Veicules from '../Veicules/Veicules';
import NewVeicule from '../Veicules/NewVeicule';
import Calendar from '../Calendar/Calendar';
import NewSchedule from '../Schedules/NewSchedule';
// import MapModal from '../Maps/Map';
import ModalSheetButton from '../../components/ModalSheetButton';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MySchedules" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Veicules" component={Veicules} options={{ title: 'Reservas', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="Calendar" component={Calendar} options={{ headerTitle: '', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="NewSchedule" component={NewSchedule} options={{ title: 'Nova reserva', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="NewVeicule" component={NewVeicule} options={{ title: 'Novo Veiculo', headerBackTitle: 'Voltar' }} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ModalSheetButton" component={ModalSheetButton} options={{ title: 'Maps'}} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStack;
