
/** @format */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleJS from './style';

const Header = () => {
  // Obter a data de hoje
  const today = new Date();

  // Obter o número do dia, o nome do dia da semana, mês e ano
  const dayNumber = today.getDate();
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthsOfYear = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const dayName = daysOfWeek[today.getDay()]; // Nome do dia da semana
  const monthName = monthsOfYear[today.getMonth()]; // Nome do mês
  const year = today.getFullYear(); // Ano atual

  return (
    <View style={styles.header}>
      {/* Seção com data de hoje */}
      <View style={styles.today}>
        <Text variant="" style={styles.todayNumber}>{dayNumber}</Text>
        <View>
          <Text variant="bodyLarge" style={styles.font}>{dayName}</Text>
          <Text variant="bodyLarge" style={styles.font}>{`${monthName} ${year}`}</Text>
        </View>
      </View>

      {/* Seção de login de usuário */}
      <View style={styles.userLogin}>
        <Avatar.Icon 
          size={50} 
          icon={({ size, color }) => (
            <Ionicons name="person" size={30} color={'#ccc'} />
          )} 
          style={styles.circle} 
        />
        <Text variant="bodyLarge" style={styles.font}>Olá, Kenidy</Text>
      </View>
    </View>
  );
};

export default Header; // Certifique-se de exportar o componente corretamente como default

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: styleJS.borderColor,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  today: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  todayNumber: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 42,
    alignItems:"center",
    justifyContent:'center',
    alignContent:'center',
  },
  font: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  circle: {
    backgroundColor: '#F0F0F0FF',
  },
  userLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
});
