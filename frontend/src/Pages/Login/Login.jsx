import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDataContext } from '../../data/DataContext.js';
import InputText from '../../components/InputText.jsx';
import styleJS from '../../components/style.js';
import fontConfig from '../../config/fontConfig.js';
import AlertDialog from '../../components/Dialog.jsx';
import { fetchUsers, loginUser } from '../../routes/userRoutes.js';

const Login = () => {
  const navigation = useNavigation();
  const fontsLoaded = fontConfig();
  const { setUserDB, setSchedulesDB, setVeiculesDB, setNotificationsDB, setUsersDB, setSectorsDB } = useDataContext();

  // Estado local para armazenar os valores dos campos de entrada
  const [username, setUsername] = useState('Kenidy.rosa');
  const [password, setPassword] = useState('1234');
  const [loadingImage, setLoadingImage] = useState(false); // Estado para controle de carregamento
  const [visible, setVisible] = useState(false); // Controle de visibilidade do alerta
  const [errorData, setErrorData] = useState({ title: '',  msg: '', icon: ''  });

// Função que lida com o login
const handleLogin = async () => {
  setLoadingImage(true); // Ativa o carregamento ao clicar no botão

  try {
    const { user, schedules, notify, veicules, users, sectors } = await loginUser(username, password);

    setLoadingImage(false);
    setUserDB(user);
    setSchedulesDB(schedules);
    setNotificationsDB(notify);
    setVeiculesDB(veicules);
    setUsersDB(users);
    setSectorsDB(sectors);

    navigation.navigate('BottomNavigator');
    
  } catch (error) {
    setLoadingImage(false);

    if (error.response && error.response.data) {
      const { title, msg, icon } = error.response.data;
      setErrorData({ title, msg, icon });

    } else {
      setErrorData({
        title: 'Erro',
        msg: 'Erro inesperado ao tentar fazer login.',
        icon: 'close-circle'
      });
    }

    setVisible(true);
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
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            source={require('../../../assets/logo.png')} // Imagem do logo da aplicação
            style={{ width: 200, height: 50 }} // Estilo da imagem
          />
        </View>
        <Text style={[styleJS.title, { marginTop: 0 }]}>PlassonAuto</Text>

        {/* Campo de entrada para o nome de usuário (Email) */}
        <InputText value={username} setValue={setUsername} label='Usuário' icon={'account-circle'} />
        {/* Campo de entrada para a senha */}
        <InputText value={password} setValue={setPassword} label='Senha' type={'password'} icon={'eye'} />

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
        icon={errorData.icon} // Usa os dados de erro capturados
        title={errorData.title}
        msg={errorData.msg}
        visible={visible} // Define se o alerta está visível
        setVisible={setVisible} // Função para controlar a visibilidade do alerta
        setLoadingImage={setLoadingImage} // Passa a função para desabilitar o loading ao fechar o alerta
      />
    </View>
  );
};

export default Login;
