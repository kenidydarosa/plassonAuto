import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import fontConfig from '../../config/fontConfig';
import Header from '../../components/Header';
import styleJS from '../../components/style';
import NothingText from '../../components/NothingText';

/**
 * Tela principal do aplicativo, chamada 'Home', que exibe um título e um cabeçalho.
 * Antes de renderizar o conteúdo, verifica se as fontes estão carregadas.
 * Caso as fontes ainda não estejam carregadas, um indicador de carregamento é exibido.
 *
 * @returns {JSX.Element} A tela principal com cabeçalho e título "Home".
 */
export const Home = () => {
  const fontsLoaded = fontConfig(); // Usa a configuração de fontes

  // Exibe um indicador de carregamento enquanto as fontes não estiverem carregadas
  if (!fontsLoaded) {
    return <ActivityIndicator size='large' color='#D13C3CFF' />;
  }

  // Define a fonte padrão para o texto
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

  return (
    <View style={styleJS.pageContainer}>
      {/* Adicione o NotificationListener aqui para garantir que ele seja montado */}
      <ScrollView contentContainerStyle={[styleJS.container, {justifyContent:'center'}]}>
        {/* Cabeçaho e Título principal da tela */}
        <Header />
        <Text style={[styleJS.title, { marginTop: 0 }]}>Home</Text>
        {/* <NothingText title="Bem Vindo!" msg="que você tenha uma ótima experiência." ico={'😊'}/> */}
        <NothingText title="Bem Vindo ao PlassonAuto! 😊 " msg="Reserve seu veículo com rapidez e facilidade. Vamos começar?" ico={'🚗✨'}/>
      </ScrollView>
    </View>
  );
};

export default Home;
