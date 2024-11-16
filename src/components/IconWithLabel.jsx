/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

/**
 * Componente `IconWithLabel` exibe um ícone com um rótulo opcional ao lado.
 * Ele pode ser usado para criar botões ou ícones interativos com texto descritivo.
 * 
 * @param {object} props - Propriedades passadas para o componente.
 * @param {string} props.iconName - Nome do ícone a ser exibido.
 * @param {number} props.size - Tamanho do ícone.
 * @param {string} props.color - Cor do ícone.
 * @param {string} [props.label] - Rótulo de texto a ser exibido ao lado do ícone (opcional).
 * @param {number} [props.width] - Largura do ícone.
 * @param {number} [props.height] - Altura do ícone.
 * @param {number} [props.margin] - Margem aplicada ao ícone.
 * 
 * @returns {React.Element} O componente `IconWithLabel` renderiza um ícone com um rótulo opcional.
 */
const IconWithLabel = ({ iconName, size, color, label, width, height, margin }) => {
	return (
		<View style={styles.container}>
			<IconButton
				icon={iconName}
				size={size}
				iconColor={color}
				style={{ width, height, margin }} // Adicionando estilo aqui
			/>
			{/* Exibe o rótulo apenas se estiver presente */}
			{label && <Text style={styles.label}>{label}</Text>} 
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', // Disposição em linha (horizontal)
		alignItems: 'center', // Alinha o ícone e o rótulo verticalmente
		margin: 0, // Sem margem externa
	},
	label: {
		marginLeft: 5, // Adiciona espaçamento entre o ícone e o rótulo
	},
});

export default IconWithLabel;

