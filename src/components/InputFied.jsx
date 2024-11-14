import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import IconWithLabel from './IconWithLabel';
import styleJS from './style';

const InputField = ({
	icon,
	placeholder,
	value,
	func,
	editable,
	type,
	border,
	width,
	multiline,
	data = false,
}) => {
	const [displayValue, setDisplayValue] = useState(value || '');

	useEffect(() => {
		// Atualiza o valor exibido caso a prop `value` seja alterada
		if (type === 'numeric' && value && !data) {
			// Aplica a formatação apenas se 'data' for false
			setDisplayValue(formatNumber(value));
		} else {
			setDisplayValue(value || '');
		}
	}, [value, type, data]);

	// Função para formatar o número com separador de milhares
	const formatNumber = (num) => {
		if (!num || isNaN(num)) return ''; // Previne NaN e retorna uma string vazia
		return Number(num).toLocaleString('pt-BR');
	};

	const handleChange = (text) => {
		if (type === 'numeric' && !data) {
			// Remove tudo que não é dígito
			let cleanText = text.replace(/[^\d]/g, '');

			// Formata o número com separador de milhar
			const formattedText = formatNumber(cleanText);

			// Atualiza o estado com o valor formatado
			setDisplayValue(formattedText);
			// Chama a função com o valor sem formatação (apenas dígitos)
			func(cleanText);
		} else {
			// Caso contrário, apenas atualiza o texto normal
			setDisplayValue(text);
			func(text);
		}
	};

	return (
		<View
			style={[
				styles.containerInput,
				border ? styles.borderBotton : '',
				{ width: width },
			]}>
			<View style={styles.ico}>
				<IconWithLabel
					iconName={icon}
					size={18}
					color={styleJS.primaryColor}
					width={20}
					height={22}
					margin={0}
				/>
			</View>
			<TextInput
				style={[styles.input, { outline: 'none' }]}
				placeholder={placeholder}
				value={displayValue} // Exibe o valor formatado no TextInput
				onChangeText={handleChange} // Chama o handleChange ao alterar o texto
				editable={editable}
				keyboardType={type === 'numeric' ? 'numeric' : 'default'}
				multiline={multiline}
			/>
		</View>
	);
};

export default InputField;

const styles = StyleSheet.create({
	containerInput: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	input: {
		paddingVertical: 15,
		borderRadius: 5,
		fontFamily: 'poppins',
		width: '100%',
	},
	borderBotton: {
		borderBottomWidth: 1,
		borderColor: '#f0f0f0',
	},
	ico: {
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
