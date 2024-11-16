/** @format */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home/Home';
import User from '../Pages/User/User';
import Veicules from '../Pages/Veicules/Veicules';
import NotifyScreen from '../Pages/Notify/NotifyScreen';
import MySchedules from '../Pages/Schedules/MySchedules';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

/**
 * Componente `BottomNavigator`
 *
 * O `BottomNavigator` é um componente de navegação que usa uma barra de navegação inferior para permitir a navegação
 * entre diferentes telas ou páginas no aplicativo. Ele usa o `Tab.Navigator` do `@react-navigation/bottom-tabs` para gerenciar
 * os diferentes caminhos, e cada aba é representada por um ícone correspondente e um rótulo.
 *
 * **Funcionalidade**
 * O componente `BottomNavigator` oferece cinco abas, cada uma com um ícone e uma tela associada:
 *  - **Home**: Página inicial do aplicativo.
 *  - **Reservas**: Página com os agendamentos ou reservas.
 *  - **Notificações**: Tela de notificações, com um badge (indicador de notificações) exibido.
 *  - **Veículos**: Tela para gerenciar ou visualizar veículos.
 *  - **Usuários**: Tela que exibe informações sobre os usuários.
 *
 * **Personalização do Componente**
 * - As cores dos ícones são alteradas com base no estado ativo ou inativo da aba.
 * - A opção de `tabBarBadge` é usada para exibir um número indicando o número de notificações pendentes na aba de "Notificações".
 *
 * **Dependências**
 * - `@react-navigation/bottom-tabs`: Para criar a navegação de abas.
 * - `react-native-vector-icons/Ionicons`: Para exibir os ícones das abas.
 *
 * @returns {React.Element} Componente `BottomNavigator` renderizando a navegação com abas.
 */
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Definindo o ícone dependendo da aba ativa
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Ícone de casa para "Home"
          } else if (route.name === 'Usuários') {
            iconName = focused ? 'person' : 'person-outline'; // Ícone de usuário para "Usuários"
          } else if (route.name === 'Notificações') {
            iconName = focused ? 'notifications' : 'notifications-outline'; // Ícone de notificação para "Notificações"
          } else if (route.name === 'Reservas') {
            iconName = focused ? 'calendar' : 'calendar-outline'; // Ícone de calendário para "Reservas"
          } else if (route.name === 'Veículos') {
            iconName = focused ? 'car' : 'car-outline'; // Ícone de carro para "Veículos"
          }

          // Retorna o ícone com a cor e o tamanho adequados
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000', // Cor do ícone quando a aba está ativa
        tabBarInactiveTintColor: 'gray', // Cor do ícone quando a aba está inativa
      })}
    >
      {/* Tela Home */}
      <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />

      {/* Tela Reservas */}
      <Tab.Screen
        name='Reservas'
        component={MySchedules}
        options={{ headerShown: false }}
      />

      {/* Tela Notificações com badge */}
      <Tab.Screen
        name='Notificações'
        component={NotifyScreen}
        options={{ tabBarBadge: 5, headerShown: false }}
      />

      {/* Tela Veículos */}
      <Tab.Screen name='Veículos' component={Veicules} options={{ headerShown: false }} />

      {/* Tela Usuários */}
      <Tab.Screen name='Usuários' component={User} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
