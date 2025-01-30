/** @format */

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDataContext } from '../../data/DataContext.js';
import { useCallback, useState } from 'react';
import { Text, ScrollView, View, RefreshControl } from 'react-native';
import Card from '../../components/CardPost.jsx';
import FloatingButton from '../../components/FloatingButton.jsx';
import fontConfig from '../../config/fontConfig.js';
import Header from '../../components/Header.jsx';
import styleJS from '../../components/style.js';
import SearchableCardList from '../../components/Search.jsx';
import { getImageUrl } from '../../config/api.js';
import Loading from '../../components/Loading.jsx';
import { updateData } from '../../routes/updateRoutes.js';

export const MySchedules = () => {
  const navigation = useNavigation();
  const { userDB, schedulesDB, veiculesDB, usersDB } = useDataContext();
  const dataContext = useDataContext();
  const [loading, setLoading] = useState(false);
  const fontsLoaded = fontConfig();

  //Filtra apenas as reservas que o usuário é dono.
  let updateSchedule;
  if (userDB.name == 'Admin') {
    updateSchedule = schedulesDB;
  } else {
    updateSchedule = schedulesDB.filter((item) => item.user_id === userDB.id);
  }
  // Atualiza os schedules quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      if (schedulesDB) {
        updateSchedule = schedulesDB;
      }
    }, [schedulesDB, veiculesDB, usersDB])
  );

  const onRefresh = async () => {
    setLoading(true);
    await updateData(userDB.id, dataContext);
    setLoading(false);
  };

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

      <View style={styleJS.container}>
      {/* <ScrollView contentContainerStyle={styleJS.container}
        // refreshControl={<RefreshControl refreshing={loading} tintColor={styleJS.primaryColor} onRefresh={onRefresh} />}
      > */}
        <Header />
        <Text style={[styleJS.title, { marginTop: 40 }]}>Minhas reservas</Text>
        {/* Componente SearchableCardList */}
        <SearchableCardList
          onRefresh={onRefresh}
          loading={loading}
          data={updateSchedule} // Passa os dados das reservas filtrados
          renderCard={renderCard} // Função que renderiza cada card
          searchKeys={['user_id', 'title', 'summary', 'locale', 'start']} // Chaves para a pesquisa
          filters={[
            { label: 'Todas', value: 'todos' },
            { label: 'Ativas', value: 'ativa' },
            { label: 'Canceladas', value: 'cancelada' },
            { label: 'Realizadas', value: 'realizada' },
          ]}
          initialFilter={'todos'}
        />
      {/* </ScrollView> */}
      </View>
      <FloatingButton onPress={navigateToVeicules} />
    </View>
  );
};

export default MySchedules;
