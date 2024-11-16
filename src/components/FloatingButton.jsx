/** @format */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Provider } from 'react-native-paper';
import styleJS from './style';

/**
 * Componente `FloatingButton` exibe um botão flutuante (FAB - Floating Action Button) 
 * na tela com um ícone de adição. O botão pode ser customizado para realizar ações 
 * ao ser pressionado.
 * 
 * @param {Object} props - As propriedades do componente.
 * @param {function} props.onPress - Função que será chamada quando o botão for pressionado.
 * 
 * @returns {React.Element} O componente `FloatingButton` com o ícone e a ação configurados.
 */
const FloatingButton = ({ onPress }) => {
  return (
    <Provider>
      <View style={styles.container}>
        <FAB
          style={styles.fab}
          icon='plus' // Ícone de adição (+)
          color={styleJS.titleColor} // Cor do ícone (definida em `styleJS`)
          onPress={onPress} // Função chamada ao pressionar o botão
        />
      </View>
    </Provider>
  );
};

export default FloatingButton;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fab: {
		backgroundColor: '#fff',
		position: 'absolute',
		margin: 16,
		right: 10,
		bottom: 0,
		borderRadius:'50%'
	},
});
