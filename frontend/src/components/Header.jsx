/** @format */

import React, { useEffect, useState } from 'react';
import { styleJSheet, View } from 'react-native';
import { Text, Avatar, Menu, PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleJS from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useDataContext } from '../data/DataContext.js';

/**
 * Componente `Header` exibe a barra de navegação superior com informações sobre o usuário 
 * e a data atual, incluindo uma seção de menu para logout.
 * 
 * @returns {React.Element} O componente `Header`, com a data atual e menu de usuário.
 */
const Header = () => {
  const { userDB, setUserDB } = useDataContext(); // Obtém o estado do usuário do contexto global

  const navigation = useNavigation(); // Hook de navegação
  const [visible, setVisible] = useState(false); // Controla a visibilidade do menu

  // Funções para abrir/fechar o menu
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {}, [userDB]); // Reage a mudanças no estado 'userDB'

  // Obter a data de hoje
  const today = new Date();

  // Obter as partes da data
  const dayNumber = today.getDate(); // Número do dia
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']; // Dias da semana
  const monthsOfYear = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ]; // Meses do ano

  const dayName = daysOfWeek[today.getDay()]; // Nome do dia da semana
  const monthName = monthsOfYear[today.getMonth()]; // Nome do mês
  const year = today.getFullYear(); // Ano atual

  return (
    <PaperProvider>
      <View style={styleJS.header}>
        {/* Seção com data de hoje */}
        <View style={styleJS.today}>
          <Text variant='' style={styleJS.todayNumber}>
            {dayNumber}
          </Text>
          <View>
            <Text variant='bodyLarge' style={styleJS.font}>
              {dayName}
            </Text>
            <Text variant='bodyLarge' style={styleJS.font}>
              {`${monthName} ${year}`}
            </Text>
          </View>
        </View>

        {/* Seção de login de usuário */}
        <View style={styleJS.userLogin}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Avatar.Icon
                size={50}
                icon={({ size, color }) => (
                  <Ionicons name='person' size={30} color={'#ccc'} />
                )}
                style={styleJS.circle}
                onTouchEnd={openMenu}
              />
            }
          >
            <Menu.Item
              leadingIcon='exit-to-app'
              onPress={() => navigation.navigate('Login')}
              title='Sair'
            />
          </Menu>
          <Text variant='bodyLarge' style={styleJS.font}>
            Olá, {userDB ? userDB.name.split(' ')[0] : 'Usuário'}
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
};

export default Header;
