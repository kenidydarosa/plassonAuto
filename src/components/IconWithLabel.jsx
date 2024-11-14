/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const IconWithLabel = ({ iconName, size, color, label, width, height, margin }) => {
	return (
		<View style={styles.container}>
			<IconButton
				icon={iconName}
				size={size}
				iconColor={color}
				style={{ width, height, margin }} // Adicionando estilo aqui
			/>
			{label && <Text style={styles.label}>{label}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 0, 
	},
	label: {
		// estilos para o texto do rótulo aqui, se necessário
	},
});

export default IconWithLabel;
