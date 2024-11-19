/** @format */
import { Text, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchableCardList from '../../components/Search';
import fontConfig from '../../config/fontConfig';
import Card from '../../components/CardPost';
import FloatingButton from '../../components/FloatingButton';
import styleJS from '../../components/style';
import { useDataContext } from '../../data/DataContext';
import { getImageUrl } from '../../config/ImageUrl';
import Loading from '../../components/Loading.jsx';

const Veicules = () => {
  // Obtém a lista de veículos do contexto
  const { veiculesDB } = useDataContext();
  // Obtém os parâmetros da rota, incluindo o tipo de tela
  const route = useRoute();
  // Hook de navegação para facilitar a navegação entre telas
  const navigation = useNavigation();
  // Função que verifica se as fontes estão carregadas
  const fontsLoaded = fontConfig();
  // Desestrutura os parâmetros da rota, pegando o tipo
  const { type } = route.params || {};
  // Condicional para verificar se estamos na tela de criação de agendamento
  const createSchedule = type === 'newSchedule' ? true : false;

  // Se as fontes não foram carregadas, exibe o componente Loading
  if (!fontsLoaded) {
    return <Loading />;
  }

  // Função para navegar para a tela de 'NewVeicule' quando o botão flutuante é pressionado
  const navigateToNewVeicules = () => {
    navigation.navigate('NewVeicule', { create: true });
  };

  // Função que renderiza um card para cada veículo
  const renderCardVeicule = (veicule) => {
    let statusColor;
    let statusFont;

    // Se a tela for de novo agendamento e o veículo estiver indisponível, não renderiza o card
    if (type === 'newSchedule' && veicule.status === 'Indisponível') {
      return;
    } else {
      // Define as cores e fontes de status com base no status do veículo
      switch (veicule.status) {
        case 'Disponível':
          statusColor = styleJS.statusGreen; // Cor verde para disponível
          statusFont = styleJS.statusFontGreen; // Fonte verde para disponível
          break;
        case 'Indisponível':
          statusColor = styleJS.statusRed; // Cor vermelha para indisponível
          statusFont = styleJS.statusFontRed; // Fonte vermelha para indisponível
          break;
        default:
          statusColor = '#ccc'; // Cor padrão
          statusFont = '#000'; // Fonte padrão
          break;
      }
      // Retorna o componente Card com as informações do veículo
      return (
        <Card
          key={veicule.id} // Chave única para o card
          id={veicule.id} // ID do veículo
          imgUrl={getImageUrl(veicule.imgKey)} // URL da imagem do veículo
          title={`${veicule.brand} - ${veicule.model} - Ano ${veicule.year}`} // Título do card com marca, modelo e ano
          subtitle={veicule.sector} // Setor do veículo
          text1={veicule.plate} // Placa do veículo
          text2={`${veicule.kilometers.toLocaleString()}km`} // Quilometragem do veículo
          text3={veicule.booster} // Informações sobre o combustível
          status={veicule.status} // Status do veículo
          icon1='keyboard' // Ícone para a placa
          icon2='gauge' // Ícone da quilometragem
          icon3='gas-station' // Ícone de combustível
          statusColor={statusColor} // Cor do status
          statusFont={statusFont} // Cor da fonte do status
          href={createSchedule ? 'Calendar' : 'NewVeicule'} // Navega para a tela de calendário ou de novo veículo
          sendParams={true} // Envia parâmetros para a próxima tela
          create={createSchedule ? true : false} // Passa o parâmetro create para a tela de novo veículo ou calendário
        />
      );
    }
  };

  // Estilos para o título
  const title = {
    width: '100%', // Título ocupa 100% da largura
    fontSize: 20, // Tamanho da fonte
    fontFamily: 'Poppins_500Medium', // Fonte do título
  };

  // Ajusta a margem superior dependendo se a rotina é de agendamento, caso contráerio não
  title.marginTop = !createSchedule ? 40 : 0;

  return (
    <View style={styleJS.pageContainer}>
      {/* Container principal da página */}
      <ScrollView style={styleJS.container}>
        {/* Título da página */}
        <Text style={[styleJS.title, title]}>Veículos</Text>
        {/* Componente de lista de cards pesquisáveis */}
        <SearchableCardList
          data={veiculesDB} // Passa os dados dos veículos filtrados
          renderCard={renderCardVeicule} // Função que renderiza cada card
          searchKeys={['model', 'brand', 'plate', 'sector']} // Chaves para a pesquisa
          filters={
            // Filtros para a pesquisa, dependendo se é criação de agendamento ou não
            !createSchedule && [
              { label: 'Todos', value: 'todos' },
              { label: 'Disponíveis', value: 'disponível' },
              { label: 'Indisponíveis', value: 'indisponível' },
            ]
          }
          initialFilter={'todos'} // Filtro inicial padrão
        />
      </ScrollView>
      {/* Se não for criação de agendamento, exibe o botão flutuante */}
      {!createSchedule && <FloatingButton onPress={navigateToNewVeicules} />}
    </View>
  );
};

export default Veicules;
