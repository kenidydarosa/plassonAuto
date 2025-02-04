/** @format */

// import * as React from 'react';
// import { StyleSheet } from 'react-native';
// import { Dialog, Portal, Text, Button } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
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
const AlertDialog = ({ icon, title, msg, textButton, showAlert, setShowAlert, setLoadingImage = null }) => {

  const hideAlertHandler = () => {
    setShowAlert(false);
    setLoadingImage ? setLoadingImage(false) : '';
  };

  return (
    <View style={styles.containerDialog}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={msg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={true}
        // showCancelButton={true}
        showConfirmButton={true}
        // cancelText="No, cancel"
        confirmText={textButton}
        confirmButtonColor="#DD6B55"
        // onCancelPressed={hideAlertHandler}
        onConfirmPressed={hideAlertHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerDialog: {
    flex: 1,
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});

export default AlertDialog;