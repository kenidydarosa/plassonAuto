/** @format */

import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView, RefreshControl, Dimensions  } from 'react-native';
import CardList from '../../components/CardList';
import fontConfig from '../../config/fontConfig';
import styleJS from '../../components/style';
import { useDataContext } from '../../data/DataContext.js';
import { updateNotify, getNotify } from '../../routes/notifyRoutes.js';
import AlertDialog from '../../components/Dialog.jsx';
import { updateData } from '../../routes/updateRoutes.js';
/**
 * Tela de notificações que exibe uma lista de cards com as notificações.
 * Cada card exibe o título, descrição e o tempo passado desde que a notificação foi criada.
 * O usuário pode deletar notificações ao clicar no ícone de exclusão de cada card.
 * A tela exibe um indicador de carregamento até que as fontes sejam carregadas.
 *
 * @returns {JSX.Element} A tela com a lista de notificações.
 */
const Notify = () => {
  const fontsLoaded = fontConfig(); // Usa a configuração de fontes
  const { userDB, notifyDB, setNotificationCount, loading, setLoading } = useDataContext();
  const [data, setData] = useState(notifyDB); // Define estado com notifyData
  const [errorData, setErrorData] = useState({ title: '', msg: '', icon: '' });
  const [showAlert, setShowAlert] = useState(false);
  const dataContext = useDataContext();
  const screenHeight = Dimensions.get("window").height;

  // Atualiza o estado local 'data' sempre que 'notifyDB' mudar
  useEffect(() => {
    setData(notifyDB || []); // Garante que o estado seja atualizado com as notificações mais recentes
    setNotificationCount(notifyDB.length);
  }, [notifyDB]);

  // Se as fontes não estiverem carregadas, exibe um indicador de carregamento
  if (!fontsLoaded) {
    return <ActivityIndicator size='large' color='#D13C3CFF' />;
  }

  // Define a fonte padrão para o texto
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

    const onRefresh = async () => {
      setLoading(true);
      await updateData(userDB.id, dataContext);
      setLoading(false);
    };
  

  /**
   * Função para deletar um card a partir do seu id.
   * Remove a notificação correspondente do estado `data`.
   *
   * @param {string} id - O id da notificação a ser deletada.
   */
  const handleDelete = async (id) => {
    try {
      // Encontrar a notificação com o id correspondente
      const notifyItem = data.find((notify) => notify.id === id);

      if (notifyItem) {
        // Atualizar o status da notificação
        notifyItem.visualized = true;
        // Passar a notificação atualizada para a função updateNotify
        const notifications = (await updateNotify(id, notifyItem)).response;
        const updateData = notifications.filter((notify) => notify.id !== id && notify.visualized !== '1');

        setData(updateData);
        setNotificationCount(updateData.length);

        // setData((data) => data.filter((notify) => notify.id !== id || notify.visualizad == 1));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { title, msg, icon } = error.response.data;
        setErrorData({ title, msg, icon, textButton: 'Tentar novamente' });
      } else {
        setErrorData({
          title: 'Erro',
          msg: 'Erro inesperado ao tentar fazer login.',
          textButton: 'Tentar novamente',
          icon: 'close-circle',
        });
      }

      setShowAlert(true);
    }
  };

  /**
   * Função para calcular a diferença de tempo entre a hora atual e a hora de criação da notificação.
   * A diferença é calculada considerando um intervalo de 15 minutos antes do horário atual.
   *
   * @returns {string} A diferença de tempo em minutos.
   */
  function getTimeDifference(date) {
    const currentTime = new Date(); // Hora atual
    let passedTime = new Date(date); // Converte a data passada para um objeto Date

    // Se a data passada não estiver no formato ISO, converta para ISO com fuso horário UTC
    if (typeof date === 'string' && !date.includes('T')) {
      // Aqui você substitui o espaço entre a data e hora por 'T', para que seja aceito como formato ISO
      passedTime = new Date(date.replace(' ', 'T') + 'Z'); // Força o uso do fuso horário UTC
    }

    if (isNaN(passedTime)) {
      return 'Data inválida'; // Retorna caso a data seja inválida
    }

    const timeDifference = currentTime - passedTime; // Diferença em milissegundos

    const secondsDifference = Math.floor(timeDifference / 1000); // Converte para segundos
    const minutesDifference = Math.floor(secondsDifference / 60); // Converte para minutos
    const hoursDifference = Math.floor(minutesDifference / 60); // Converte para horas
    const daysDifference = Math.floor(hoursDifference / 24); // Converte para dias
    const weeksDifference = Math.floor(daysDifference / 7); // Converte para semanas

    if (weeksDifference > 0) {
      return `${weeksDifference} sem`; // Retorna semanas
    } else if (daysDifference > 0) {
      return `${daysDifference} d`; // Retorna dias
    } else if (hoursDifference > 0) {
      return `${hoursDifference}h`; // Retorna horas
    } else if (minutesDifference > 0) {
      return `${minutesDifference}m`; // Retorna minutos
    } else {
      return 'Agora'; // Caso a diferença seja menor que 1 minuto
    }
  }

  // Renderiza a lista de notificações com base nos dados
  const renderCardNotify = data.map((notify) => (
    <CardList
      key={notify.id} // Chave única para cada card
      id={notify.id} // Id da notificação
      text1={notify.title} // Título da notificação
      text2={notify.summary} // Descrição da notificação
      tag={getTimeDifference(notify.created_at)} // Calcula a diferença de tempo desde a criação da notificação
      icon={'bell'} // Ícone da notificação (ícone de campainha)
      type={'notify'} // Tipo de notificação
      setFunction={handleDelete} // Função chamada ao deletar o card
    />
  ));

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView
        contentContainerStyle={styleJS.container}
        refreshControl={<RefreshControl refreshing={loading} tintColor={styleJS.primaryColor} title='Carregando...' titleColor={styleJS.primaryColor} onRefresh={onRefresh}  progressViewOffset={screenHeight / 2 - 50} />}
      >
        <Text style={styleJS.title}>Notificações</Text>
        {renderCardNotify}
      </ScrollView>
      {/* Alerta que aparece quando os dados de login estão incorretos */}
      <AlertDialog
        icon={errorData.icon} // Usa os dados de erro capturados
        title={errorData.title}
        msg={errorData.msg}
        textButton={errorData.textButton}
        showAlert={showAlert} // Define se o alerta está visível
        setShowAlert={setShowAlert} // Função para controlar a visibilidade do alerta
      />
    </View>
  );
};

export default Notify;
