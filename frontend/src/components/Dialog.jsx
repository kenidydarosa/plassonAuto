/** @format */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';

/**
 * Componente `AlertDialog` exibe um diálogo de alerta com um ícone, título e texto informativo.
 * Ele é utilizado para mostrar mensagens de alerta ao usuário, podendo ser fechado quando necessário.
 * 
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.visible - Indica se o diálogo está visível ou não. Controla a visibilidade do diálogo.
 * @param {function} props.setVisible - Função para atualizar a visibilidade do diálogo. Usada para fechar o diálogo.
 * @param {function} props.setLoadingImage - Função para atualizar o estado relacionado ao carregamento do activeIndicator.
 * @param {string} props.icon - Nome do ícone a ser exibido no diálogo (passado como uma string).
 * @param {string} props.title - Título do diálogo.
 * @param {string} props.text - Texto informativo que será exibido no corpo do diálogo.
 * 
 * @returns {React.Element} Componente `AlertDialog` exibindo um diálogo de alerta.
 */
const AlertDialog = ({ visible, setVisible, setLoadingImage, icon, title, text }) => {
  // Função para esconder o diálogo e parar o carregamento do activeIndicator
  const hideDialog = () => {
    setVisible(false); // Fecha o diálogo
    setLoadingImage(false); // Para o carregamento do activeIndicator
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        {/* Ícone do diálogo */}
        <Dialog.Icon icon={icon} color='red' />
        {/* Título do diálogo */}
        <Dialog.Title style={styles.text}>{title}</Dialog.Title>
        {/* Conteúdo do diálogo com o texto */}
        <Dialog.Content>
          <Text variant='bodyLarge' style={styles.text}>
            {text}
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default AlertDialog;


const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

