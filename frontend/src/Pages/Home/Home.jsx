import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import fontConfig from '../../config/fontConfig';
import Header from '../../components/Header';
import styleJS from '../../components/style';


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
      <ScrollView contentContainerStyle={styleJS.container}>
        {/* Cabeçaho e Título principal da tela */}
        <Header />
        <Text style={[styleJS.title, { marginTop: 0 }]}>Home</Text>
      </ScrollView>
    </View>
  );
};

export default Home;
