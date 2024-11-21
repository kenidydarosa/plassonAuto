/** @format */

import React, { useState } from 'react';
import { useDataContext } from '../../data/DataContext.js';
import { updateUser } from '../../routes/userRoutes.js';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import CardList from '../../components/CardList'; // Componente que renderiza um cartão de usuário
import fontConfig from '../../config/fontConfig'; // Função para configurar a fonte
import SearchableCardList from '../../components/Search'; // Componente que permite a busca nos cards
import styleJS from '../../components/style'; // Estilos usados na página
import AlertDialog from '../../components/Dialog.jsx';

/**
 * Componente User
 * Exibe uma lista de usuários com cards pesquisáveis.
 *
 * @returns {JSX.Element} A interface de usuário com a lista de usuários.
 */
const User = () => {
  const { usersDB, setUsersDB, sectorsDB } = useDataContext();
  const [visible, setVisible] = useState(false); // Controle de visibilidade do alerta
  // Estado para armazenar os dados de erro
  const [errorData, setErrorData] = useState({
    title: '',
    msg: '',
    icon: '',
  });
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

  const handleUser = async (id) => {
    try {
      if (id) {
        const currentUser = usersDB.find((user) => user.id == id);

        if (currentUser.status === 'Ativo') {
          currentUser.status = 'Inativo';
        } else {
          currentUser.status = 'Ativo';
        }

        const userData = await updateUser(currentUser);
        const userUpdated = usersDB.map((user) =>
          user.id === id ? { ...user, ...userData } : user
        );
        setUsersDB(userUpdated);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { title, msg, icon } = error.response.data;
        setErrorData({ title, msg, icon });
      } else {
        setErrorData({
          title: 'Erro',
          msg: 'Erro inesperado ao tentar fazer login.',
          icon: 'close-circle',
        });
      }

      setVisible(true);
    }
  };

  const renderCardUser = (user) => {
    const sector = sectorsDB.find((item) => item.id === user.sector_id);
    return (
      <CardList
        key={user.id} // Passa o id do usuário
        id={user.id} // Passa o id do usuário
        text1={user.name} // Nome do usuário
        text2={user.job} // Cargo do usuário
        text3={sector.name} // Setor do usuário
        icon={'account'} // Ícone associado ao card
        type={'cardUser'} // Tipo de card
        setFunction={handleUser}
        status={user.status}
      />
    );
  };

  return (
    <View style={styleJS.pageContainer}>
      <ScrollView style={styleJS.container}>
        <Text style={styleJS.title}>Usuários</Text>
        {/* Componente de lista de cards pesquisáveis */}
        <SearchableCardList
          data={usersDB} // Dados dos usuários que serão exibidos
          renderCard={renderCardUser} // Função para renderizar cada card
          searchKeys={['name', 'job', 'sector']} // Chaves para pesquisa nos dados
        />
      </ScrollView>

      {/* Alerta que aparece quando os dados de login estão incorretos */}
      <AlertDialog
        icon={errorData.icon} // Usa os dados de erro capturados
        title={errorData.title}
        msg={errorData.msg}
        visible={visible} // Define se o alerta está visível
        setVisible={setVisible} // Função para controlar a visibilidade do alerta
      />
    </View>
  );
};

export default User;
