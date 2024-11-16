import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Login from '../Login/Login'; 
import BottomNavigator from '../../components/BottomNavigator';
import Veicules from '../Veicules/Veicules';
import NewVeicule from '../Veicules/NewVeicule';
import Calendar from '../Calendar/Calendar';
import NewSchedule from '../Schedules/NewSchedule';
import styleJS from '../../components/style'; 

// Cria o stack navigator (navegação em pilha)
const Stack = createNativeStackNavigator();

// Define o componente principal de navegação do aplicativo
const AppStack = () => {
  return (
    // Define o Stack Navigator com a tela inicial sendo 'Login'
    <Stack.Navigator initialRouteName='Login'>
      {/* Tela de Login*/}
      <Stack.Screen 
        name='Login' 
        component={Login} 
        options={{ headerShown: false }} // Configura para não mostrar o cabeçalho
      />

      {/* Tela de Navegação Inferior */}
      <Stack.Screen 
        name='BottomNavigator' 
        component={BottomNavigator} 
        options={{ headerShown: false }} // O cabeçalho é ocultado
      />

      {/* Tela de MySchedules (usando o BottomNavigator)*/}
      <Stack.Screen 
        name='MySchedules' 
        component={BottomNavigator} 
        options={{ headerShown: false }} // O cabeçalho é ocultado
      />

      {/* Tela de Veículos*/}
      <Stack.Screen 
        name='Veicules' 
        component={Veicules} 
        options={({ navigation }) => ({
          title: 'Reservas', // Título da tela
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' /> // Botão de voltar
        })}
      />

      {/* Tela de Calendário */}
      <Stack.Screen 
        name='Calendar' 
        component={Calendar} 
        options={({ navigation }) => ({
          headerTitle: '', // Não exibe título no cabeçalho
          headerRight: () => (
            // Adiciona ícone de busca à direita do cabeçalho
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity onPress={() => alert('Adicionado!')}>
                <Ionicons name='search' size={26} color={styleJS.titleColor} /> {/* Ícone de pesquisa */}
              </TouchableOpacity>
            </View>
          ),
          // Botão de voltar à tela anterior
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' /> 
        })}
      />

      {/* Tela de Novo Agendamento */}
      <Stack.Screen 
        name='NewSchedule' 
        component={NewSchedule} 
        options={({ navigation }) => ({
          title: 'Nova reserva', // Título da tela
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' /> // Botão de voltar
        })}
      />

      {/* Tela de Novo Veículo */}
      <Stack.Screen 
        name='NewVeicule' 
        component={NewVeicule} 
        options={({ navigation }) => ({
          title: 'Novo Veiculo', // Título da tela
          headerLeft: () => <Button onPress={() => navigation.goBack()} title='Voltar' /> // Botão de voltar
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;


