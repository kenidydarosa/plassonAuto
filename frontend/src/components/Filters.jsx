/** @format */

// Filters.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import styleJS from './style'; // Importe seu objeto de estilos

/**
 * Componente `Filters` exibe uma lista horizontal de botões de filtro, permitindo que o usuário selecione um filtro.
 * O filtro selecionado é destacado visualmente, e o evento de seleção é tratado através da função `onFilterSelect`.
 * 
 * @param {Object} props - As propriedades do componente.
 * @param {Array} props.filters - Lista de filtros a serem exibidos. Cada filtro é um objeto contendo `value` e `label`.
 * @param {function} props.onFilterSelect - Função a ser chamada quando um filtro é selecionado. Recebe o valor do filtro como argumento.
 * @param {string} props.selectedFilter - Valor do filtro atualmente selecionado. Usado para destacar o filtro selecionado.
 * 
 * @returns {React.Element} Componente de filtros exibindo botões de seleção.
 */
const Filters = ({ filters, onFilterSelect, selectedFilter }) => {

	return (
		<ScrollView
			horizontal
			style={{height:30}}
			showsHorizontalScrollIndicator={false} // Remove o indicador de rolagem horizontal
			contentContainerStyle={styles.scrollViewContainer}>
			<View style={styles.container}>
				{filters.map((filter) => (
					<TouchableOpacity
						key={filter.value} // A chave única do filtro, baseada no valor do filtro
						style={[ 
							styles.button, // Estilo padrão do botão
							selectedFilter === filter.value && { // Estilo se o filtro estiver selecionado
								backgroundColor: styleJS.primaryColor,
							},
						]}
						onPress={() => onFilterSelect(filter.value)} // Chama a função de seleção ao clicar no botão
					>
						<Text
							style={[
								styles.buttonText, // Estilo padrão do texto do botão
								selectedFilter === filter.value && styles.selectedButtonText, // Aplica cor ao texto do botão selecionado
							]}>
							{filter.label} {/* Exibe o label do filtro */}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};

export default Filters;

const styles = StyleSheet.create({
	scrollViewContainer: {
		paddingVertical: 10,
		height:60,
		gap:15,
		justifyContent:'space-evenly',
	},
	container: {
		flexDirection: 'row',
		width:'100%',
		justifyContent:'space-between'
	},
	button: {
		paddingVertical: 7,
		paddingHorizontal: 15,
		borderRadius: 20,
		backgroundColor: '#f0f0f0',
		marginRight: 10,
	},
	buttonText: {
		color: '#333',
		fontSize: 14,
		fontFamily: 'Poppins_400Regular',
	},
	selectedButtonText: {
		color: '#fff', 
	},
});


