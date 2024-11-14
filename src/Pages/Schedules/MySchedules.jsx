/** @format */

import { StyleSheet, Text, ActivityIndicator, ScrollView, View } from 'react-native';
import Card from '../../components/CardPost.jsx';
import FloatingButton from '../../components/FloatingButton';
import fontConfig from '../../config/fontConfig';
import Header from '../../components/Header';
import styleJS from '../../components/style';
import SearchableCardList from '../../components/Search.jsx';
import { useDataContext } from '../../data/DataContext.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { getImageUrl } from '../../config/ImageUrl.js';

export const MySchedules = () => {
  const navigation = useNavigation();
  const { schedules, veicules } = useDataContext();
  const fontsLoaded = fontConfig();

  let updateSchedule = schedules;
  // Atualiza os schedules quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      if (schedules) {
        updateSchedule = schedules;
      }
    }, [schedules])
  );

  // Confere se as fontes foram carregadas
  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        size='large'
        color='#D13C3CFF'
        style={{ alignItems: 'center', flex: 1 }}
      />
    );
  }

  // Define a propriedade padrão para `Text`
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

  // Função de navegação
  const navigateToVeicules = () => {
    navigation.navigate('Veicules', { type: 'newSchedule' });
  };

  // Renderiza cada card usando a função `renderCard`
  const renderCard = (item) => {
    let statusColor;
    let statusFont;

    // Verifica o status do item e define as cores correspondentes
    switch (item.status) {
      case 'Ativa':
        statusColor = styleJS.statusGreen;
        statusFont = styleJS.statusFontGreen;
        break;
      case 'Cancelada':
        statusColor = styleJS.statusRed;
        statusFont = styleJS.statusFontRed;
        break;
      case 'Realizada':
        statusColor = styleJS.statusYellow;
        statusFont = styleJS.statusFontYellow;
        break;
      default:
        statusColor = '#ccc';
        statusFont = '#000';
    }

    const car = veicules.find((car) => car.id === item.idCar);

    // Renderiza o Card
    return (
      <Card
        key={item.id}
        id={item.id}
		imgUrl={getImageUrl(car.imgKey)}
        title={item.title}
        subtitle={item.description}
        text1={item.locale}
        text2={`${new Date(item.date_time_start).toLocaleDateString()}`}
        text3={`${new Date(item.date_time_start).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })} - ${new Date(item.date_time_end).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}h`}
        text4={item.user}
        status={item.status}
        statusColor={statusColor}
        statusFont={statusFont}
        icon1={'map-marker'}
        icon2={'calendar-month'}
        icon3={'clock'}
        icon4={'account'}
        href='NewSchedule'
        sendParams={true}
        idCar={item.idCar}
        create={false}
      />
    );
  };

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView contentContainerStyle={styleJS.container}>
        <Header />
        <Text style={[styleJS.title, { marginTop: 0 }]}>Minhas reservas</Text>

        {/* Componente SearchableCardList */}
        <SearchableCardList
          data={updateSchedule} // Passa os dados das reservas filtrados
          renderCard={renderCard} // Função que renderiza cada card
          searchKeys={['user', 'title', 'description', 'locale', 'date_time_start']} // Chaves para a pesquisa
          filters={[
            { label: 'Todas', value: 'todos' },
            { label: 'Ativas', value: 'ativa' },
            { label: 'Canceladas', value: 'cancelada' },
            { label: 'Realizadas', value: 'realizada' },
          ]}
          initialFilter={'todos'}
        />
      </ScrollView>
      <FloatingButton onPress={navigateToVeicules} />
    </View>
  );
};

export default MySchedules;
