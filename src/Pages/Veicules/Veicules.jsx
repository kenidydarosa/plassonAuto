/** @format */
import { Text, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchableCardList from '../../components/Search';
import Card from '../../components/CardPost';
import FloatingButton from '../../components/FloatingButton';
import styleJS from '../../components/style';
import { useDataContext } from '../../data/DataContext';
import { getImageUrl } from '../../config/ImageUrl';

const Veicules = () => {
  const { veicules } = useDataContext();
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params || {};
  const createSchedule = type === 'newSchedule' ? true : false;

  // Função de navegação
  const navigateToNewVeicules = () => {
    navigation.navigate('NewVeicule', { create: true });
  };

  // Função que renderiza um card de veículo
  const renderCardVeicule = (veicule) => {
    let statusColor;
    let statusFont;

    if (type === 'newSchedule' && veicule.status === 'Indisponível') {
      return;
    } else {
      switch (veicule.status) {
        case 'Disponível':
          statusColor = styleJS.statusGreen;
          statusFont = styleJS.statusFontGreen;
          break;
        case 'Indisponível':
          statusColor = styleJS.statusRed;
          statusFont = styleJS.statusFontRed;
          break;
        default:
          statusColor = '#ccc';
          statusFont = '#000';
          break;
      }
      return (
        <Card
          key={veicule.id}
          id={veicule.id}
          imgUrl={getImageUrl(veicule.imgKey)}
          title={`${veicule.brand} - ${veicule.model} - Ano ${veicule.year}`}
          subtitle={veicule.sector}
          text1={veicule.plate}
          text2={`${veicule.kilometers.toLocaleString()}km`}
          text3={veicule.booster}
          status={veicule.status}
          icon1='keyboard'
          icon2='gauge'
          icon3='gas-station'
          statusColor={statusColor}
          statusFont={statusFont}
          href={createSchedule ? 'Calendar' : 'NewVeicule'}
          sendParams={true}
          create={createSchedule ? true : false}
        />
      );
    }
  };

  const title = {
    width: '100%',
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
  };

  title.marginTop = !createSchedule ? 40 : 0;

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView style={styleJS.container}>
        <Text style={[styleJS.title, title]}>Veículos</Text>
        <SearchableCardList
          data={veicules} // Passa os dados dos veículos filtrados
          renderCard={renderCardVeicule} // Função que renderiza cada card
          searchKeys={['model', 'brand', 'plate', 'sector']} // Chaves para a pesquisa
          filters={
            !createSchedule && [
              { label: 'Todos', value: 'todos' },
              { label: 'Disponíveis', value: 'disponível' },
              { label: 'Indisponíveis', value: 'indisponível' },
            ]
          }
          initialFilter={'todos'}
        />
      </ScrollView>
      {!createSchedule && <FloatingButton onPress={navigateToNewVeicules} />}
    </View>
  );
};

export default Veicules;
