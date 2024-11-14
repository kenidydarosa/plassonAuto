/** @format */

// Filters.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import styleJS from './style'; // Importe seu objeto de estilos

const Filters = ({ filters, onFilterSelect, selectedFilter }) => {

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.scrollViewContainer}>
			<View style={styles.container}>
				{filters.map((filter) => (
					<TouchableOpacity
						key={filter.value}
						style={[
							styles.button,
							selectedFilter === filter.value && {
								backgroundColor: styleJS.primaryColor,
							},
						]}
						onPress={() => onFilterSelect(filter.value)}>
						<Text
							style={[
								styles.buttonText,
								selectedFilter === filter.value && styles.selectedButtonText, // Aplica cor ao texto do botão selecionado
							]}>
							{filter.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollViewContainer: {
		paddingVertical: 10,
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
	},
	selectedButtonText: {
		color: '#fff', 
	},
});

export default Filters;

