/** @format */

import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import CardUser from '../../components/CardList';
import fontConfig from '../../config/fontConfig';
import SearchableCardList from '../../components/Search';
import { usersData } from '../../data/data';
import styleJS from '../../components/style';

const User = () => {
  const fontsLoaded = fontConfig(); // Usa a configuração de fontes

  if (!fontsLoaded) {
    return <ActivityIndicator size='large' color='#D13C3CFF' />;
  }

  // Defina o estilo padrão para todos os componentes Text
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' }, // Define a fonte padrão
  };

  // Função que renderiza um card de usuário
  const renderCardUser = (user) => {
    return (
      <CardUser
        id={user.id}
        text1={user.name}
        text2={user.job}
        text3={user.sector}
        icon={'account'}
        type={'cardUser'}
      />
    );
  };

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView style={styleJS.container}>
        <Text style={styleJS.title}>Usuários</Text>
        <SearchableCardList
          data={usersData} // Dados dos usuários
          renderCard={renderCardUser} // Função que renderiza cada card
          searchKeys={['name', 'job', 'sector']} // Chaves para a pesquisa
        />
      </ScrollView>
    </View>
  );
};

export default User;
