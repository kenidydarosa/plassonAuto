/** @format */

import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import CardList from '../../components/CardList';
import fontConfig from '../../config/fontConfig';
import styleJS from '../../components/style';
import { notifyData } from '../../data/data';

/**
 * Tela de notificações que exibe uma lista de cards com as notificações.
 * Cada card exibe o título, descrição e o tempo passado desde que a notificação foi criada.
 * O usuário pode deletar notificações ao clicar no ícone de exclusão de cada card.
 * A tela exibe um indicador de carregamento até que as fontes sejam carregadas.
 * 
 * @returns {JSX.Element} A tela com a lista de notificações.
 */
const NotifyScreen = () => {
  const fontsLoaded = fontConfig(); // Usa a configuração de fontes
  const [data, setData] = useState(notifyData); // Define estado com notifyData

  // Se as fontes não estiverem carregadas, exibe um indicador de carregamento
  if (!fontsLoaded) {
    return <ActivityIndicator size='large' color='#D13C3CFF' />;
  }

  // Define a fonte padrão para o texto
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

  /**
   * Função para deletar um card a partir do seu id.
   * Remove a notificação correspondente do estado `data`.
   *
   * @param {string} id - O id da notificação a ser deletada.
   */
  const handleDelete = (id) => {
    setData((data) => data.filter((notify) => notify.id !== id)); // Filtra e remove o card com o id especificado
  };

  /**
   * Função para calcular a diferença de tempo entre a hora atual e a hora de criação da notificação.
   * A diferença é calculada considerando um intervalo de 15 minutos antes do horário atual.
   *
   * @returns {string} A diferença de tempo em minutos.
   */
  function getTimeDifference() {
    const currentTime = new Date(); // Hora atual
    const timeMinus15m = new Date(currentTime.getTime() - 13 * 60000); // Hora ajustada para 13 minutos atrás
    const timeDifference = currentTime - timeMinus15m; // Diferença em milissegundos
    const minutesDifference = Math.floor(timeDifference / 60000); // Converte para minutos e arredonda para baixo
    return `${minutesDifference}m`; // Retorna a diferença em minutos
  }

  // Renderiza a lista de notificações com base nos dados
  const renderCardNotify = data.map((notify) => (
    <CardList
      key={notify.id} // Chave única para cada card
      id={notify.id} // Id da notificação
      text1={notify.title} // Título da notificação
      text2={notify.summary} // Descrição da notificação
      tag={getTimeDifference()} // Calcula a diferença de tempo desde a criação da notificação
      icon={'bell'} // Ícone da notificação (ícone de campainha)
      type={'notify'} // Tipo de notificação
      onDelete={handleDelete} // Função chamada ao deletar o card
    />
  ));

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView style={styleJS.container}>
        <Text style={styleJS.title}>Notificações</Text>
        {renderCardNotify} 
      </ScrollView>
    </View>
  );
};

export default NotifyScreen;
