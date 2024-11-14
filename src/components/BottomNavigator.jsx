/** @format */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home/Home';
import User from '../Pages/User/User';
import Veicules from '../Pages/Veicules/Veicules';
import NotifyScreen from '../Pages/Notify/NotifyScreen';
import MySchedules from '../Pages/Schedules/MySchedules';
import { schedulesData } from '../data/data';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
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
			})}>
			<Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
			<Tab.Screen
				name='Reservas'
				component={MySchedules}
				options={{ headerShown: false }}
				initialParams={{ data: schedulesData }}
			/>
			<Tab.Screen
				name='Notificações'
				component={NotifyScreen}
				options={{ tabBarBadge: 5, headerShown: false }}
			/>
			<Tab.Screen name='Veículos' component={Veicules} options={{ headerShown: false }} />
			<Tab.Screen name='Usuários' component={User} options={{ headerShown: false }} />
		</Tab.Navigator>
	);
};

export default BottomNavigator;
