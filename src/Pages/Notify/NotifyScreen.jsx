/** @format */

import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import CardList from '../../components/CardList';
import fontConfig from '../../config/fontConfig';
import styleJS from '../../components/style';
import { notifyData } from '../../data/data';

const NotifyScreen = () => {
  const fontsLoaded = fontConfig(); // Usa a configuração de fontes
  const [data, setData] = useState(notifyData); // Define estado com notifyData

  if (!fontsLoaded) {
    return <ActivityIndicator size='large' color='#D13C3CFF' />;
  }

  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

  // Função para deletar card pelo id
  const handleDelete = (id) => {
    setData((data) => data.filter((notify) => notify.id !== id));
  };

  function getTimeDifference() {
    const currentTime = new Date();
    //pegar o horario que foi inciado a notificação
    const timeMinus15m = new Date(currentTime.getTime() - 13 * 60000);
    // Calcula a diferença em milissegundos
    const timeDifference = currentTime - timeMinus15m;
    // Converte para minutos e arredonda para baixo
    const minutesDifference = Math.floor(timeDifference / 60000);
    return `${minutesDifference}m`;
  }

  // Renderiza a lista de cards
  const renderCardNotify = data.map((notify) => (
    <CardList
      key={notify.id}
      id={notify.id}
      text1={notify.title}
      text2={notify.description}
      // text3={notify.date}
      tag={getTimeDifference()}
      icon={'bell'}
      type={'notify'}
      onDelete={handleDelete} // Passa handleDelete como prop
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
