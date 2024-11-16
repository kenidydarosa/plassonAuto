/** @format */

import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import CardUser from '../../components/CardList'; // Componente que renderiza um cartão de usuário
import fontConfig from '../../config/fontConfig'; // Função para configurar a fonte
import SearchableCardList from '../../components/Search'; // Componente que permite a busca nos cards
import { usersData } from '../../data/data'; // Dados de usuários para renderizar
import styleJS from '../../components/style'; // Estilos usados na página

/**
 * Componente User
 * Exibe uma lista de usuários com cards pesquisáveis.
 * 
 * @returns {JSX.Element} A interface de usuário com a lista de usuários.
 */
const User = () => {
  // Verifica se as fontes foram carregadas corretamente
  const fontsLoaded = fontConfig();

  // Se as fontes não estiverem carregadas, exibe um indicador de carregamento
  if (!fontsLoaded) {
    return <ActivityIndicator size='large' color='#D13C3CFF' />;
  }

  // Define o estilo padrão para todos os componentes Text, com a fonte 'Poppins_400Regular'
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

  /**
   * Função que renderiza um card de usuário.
   * 
   * @param {Object} user O objeto de usuário contendo as informações para o card.
   * @returns {JSX.Element} O card do usuário renderizado.
   */
  const renderCardUser = (user) => {
    return (
      <CardUser
        id={user.id} // Passa o id do usuário
        text1={user.name} // Nome do usuário
        text2={user.job} // Cargo do usuário
        text3={user.sector} // Setor do usuário
        icon={'account'} // Ícone associado ao card
        type={'cardUser'} // Tipo de card
      />
    );
  };

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView style={styleJS.container}>
        <Text style={styleJS.title}>Usuários</Text>
        {/* Componente de lista de cards pesquisáveis */}
        <SearchableCardList
          data={usersData} // Dados dos usuários que serão exibidos
          renderCard={renderCardUser} // Função para renderizar cada card
          searchKeys={['name', 'job', 'sector']} // Chaves para pesquisa nos dados
        />
      </ScrollView>
    </View>
  );
};

export default User;
