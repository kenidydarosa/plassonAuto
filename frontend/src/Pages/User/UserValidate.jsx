import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDataContext } from '../../data/DataContext';
import AlertDialog from '../../components/Dialog';

const UserValidate = () => {
  const { userDB } = useDataContext();
  const navigation = useNavigation(); // Certifique-se de que este componente está dentro do NavigationContainer
  const [errorData, setErrorData] = useState({ title: '', msg: '', icon: '', textButton:'' });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (userDB && userDB.status === 'Inativo') {
      setErrorData({
        icon: '⚠️',
        title: 'Acesso Negado',
        msg: 'Seu usuário está inativo. Você será redirecionado para a tela de login.',
        textButton: 'OK'
      });
      setShowAlert(true);
    }
  }, [userDB]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigation.navigate('Login'); // Navega corretamente para a tela de Login
  };
  
  return (
    <>
      {showAlert && (
        <AlertDialog
          icon={errorData.icon}
          title={errorData.title}
          msg={errorData.msg}
          textButton={errorData.textButton}
          showAlert={showAlert}
          setShowAlert={handleCloseAlert} // Fecha o alerta e redireciona
        />
      )}
    </>
  );
};

export default UserValidate;
