/** @format */

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDataContext } from '../../data/DataContext.js';
import { useCallback } from 'react';
import { Text, ScrollView, View } from 'react-native';
import Card from '../../components/CardPost.jsx';
import FloatingButton from '../../components/FloatingButton.jsx';
import fontConfig from '../../config/fontConfig.js';
import Header from '../../components/Header.jsx';
import styleJS from '../../components/style.js';
import SearchableCardList from '../../components/Search.jsx';
import { getImageUrl } from '../../config/api.js';
import Loading from '../../components/Loading.jsx';

export const MySchedules = () => {
  const navigation = useNavigation();
  const { schedulesDB, veiculesDB, usersDB } = useDataContext();
  const fontsLoaded = fontConfig();

  let updateSchedule = schedulesDB;
  // Atualiza os schedules quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      if (schedulesDB) {
        updateSchedule = schedulesDB;
      }
    }, [schedulesDB, veiculesDB, usersDB])
  );

  // Confere se as fontes foram carregadas
  if (!fontsLoaded) {
    return <Loading />;
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

    const car = veiculesDB.find((car) => car.id === item.veicule_id);
    const user = usersDB.find((user) => user.id === item.user_id);

    // Renderiza o Card
    return (
      <Card
        key={item.id}
        id={item.id}
        imgUrl={getImageUrl(car.imgKey)}
        title={item.title}
        subtitle={item.summary}
        text1={item.locale}
        text2={`${new Date(item.start).toLocaleDateString()}`}
        text3={`${new Date(item.start).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })} - ${new Date(item.end).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}h`}
        text4={user.name}
        status={item.status}
        statusColor={statusColor}
        statusFont={statusFont}
        icon1={'map-marker'}
        icon2={'calendar-month'}
        icon3={'clock'}
        icon4={'account'}
        href='NewSchedule'
        sendParams={true}
        idCar={item.veicule_id}
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
          searchKeys={['user', 'title', 'summary', 'locale', 'start']} // Chaves para a pesquisa
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
