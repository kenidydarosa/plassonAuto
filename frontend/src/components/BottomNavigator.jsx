
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home/Home';
import User from '../Pages/User/User';
import Veicules from '../Pages/Veicules/Veicules';
import Notify from '../Pages/Notify/Notify';
import MySchedules from '../Pages/Schedules/MySchedules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDataContext } from '../data/DataContext';

/** @format */
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

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { userDB } = useDataContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Usuários') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Notificações') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Reservas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Veículos') {
            iconName = focused ? 'car' : 'car-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Tab.Screen name='Reservas' component={MySchedules} options={{ headerShown: false }} />
      <Tab.Screen name='Notificações' component={Notify} options={{ tabBarBadge: 5, headerShown: false }} />

      {/* Renderiza as abas de Veículos e Usuários apenas se userDB.name for "Admin" */}
      {userDB.name === 'Admin' && (
        <>
          <Tab.Screen name='Veículos' component={Veicules} options={{ headerShown: false }} />
          <Tab.Screen name='Usuários' component={User} options={{ headerShown: false }} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
