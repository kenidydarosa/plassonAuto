import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDataContext } from '../../data/DataContext.js';
import InputText from '../../components/InputText';
import styleJS from '../../components/style';
import fontConfig from '../../config/fontConfig';
import { usersData } from '../../data/data';
import AlertDialog from '../../components/Dialog';
import { fetchUsers } from '../../data/api.js';

/**
 * Tela de Login que permite ao usuário inserir um nome de usuário e senha para acessar o aplicativo.
 * Caso o login seja bem-sucedido, o usuário é redirecionado para a tela principal.
 * Caso contrário, um alerta é exibido informando que os dados estão incorretos.
 *
 * @returns {JSX.Element} A tela de login com campos de entrada, botão de login e alerta.
 */
const Login = () => {
  const navigation = useNavigation(); // Navegação para outras telas
  const fontsLoaded = fontConfig(); // Carrega a configuração de fontes
  const { setUserX } = useDataContext(); // Função para definir o usuário no contexto global

  // Estado local para armazenar os valores dos campos de entrada
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loadingImage, setLoadingImage] = useState(false); // Estado para controle de carregamento
  const [visible, setVisible] = useState(false); // Controle de visibilidade do alerta

  /**
   * Função que lida com o login. Verifica se o nome de usuário e senha são válidos.
   * Caso sejam, define o usuário e navega para a tela principal.
   * Caso contrário, exibe um alerta informando que os dados estão incorretos.
   */
  const  handleLogin = async () => {
    setLoadingImage(true); // Ativa o carregamento ao clicar no botão
    const users = await fetchUsers()
    console.log(users)
    // Procura no banco de dados se existe um usuário com o nome de usuário e senha fornecidos
    const user = usersData.find(
      (item) => username === item.username && password === item.password
    );

    if (user) {
      setLoadingImage(false); // Desativa o carregamento
      setUserX(user); // Define o usuário no contexto global
      navigation.navigate('BottomNavigator'); // Navega para a tela principal
    } else {
      setVisible(true); // Exibe o alerta de erro
    }
  };

  // Define a fonte padrão para o texto
  Text.defaultProps = {
    ...Text.defaultProps,
    style: { fontFamily: 'Poppins_400Regular' },
  };

  return (
    <View style={[styleJS.pageContainer, { justifyContent: 'center' }]}>
      <View style={styleJS.container}>
        <View
          style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Image
            source={require('../../../assets/logo.png')} // Imagem do logo da aplicação
            style={{ width: 200, height: 50 }} // Estilo da imagem
          />
        </View>
        <Text style={[styleJS.title, { marginTop: 0 }]}>PlassonAuto</Text>

        {/* Campo de entrada para o nome de usuário (Email) */}
        <InputText
          value={username}
          setValue={setUsername}
          label='Usuário'
          icon={'account-circle'}
        />
        {/* Campo de entrada para a senha */}
        <InputText
          value={password}
          setValue={setPassword}
          label='Senha'
          type={'password'}
          icon={'eye'}
        />

        {/* Botão de login */}
        <Button
          icon='check-circle'
          mode='contained'
          loading={loadingImage}
          onPress={handleLogin} // Chama a função de login quando pressionado
          style={{ backgroundColor: styleJS.primaryColor, marginTop: 30 }}
        >
          Confirmar
        </Button>
      </View>

      {/* Alerta que aparece quando os dados de login estão incorretos */}
      <AlertDialog
        icon={'close-circle'}
        title={'Dados incorretos'}
        text={'Usuário ou senha incorretos!'}
        visible={visible} // Define se o alerta está visível
        setVisible={setVisible} // Função para controlar a visibilidade do alerta
        setLoadingImage={setLoadingImage} // Passa a função para desabilitar o loading ao fechar o alerta
      />
    </View>
  );
};

export default Login;

