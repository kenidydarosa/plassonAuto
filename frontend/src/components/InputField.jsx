import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import IconWithLabel from './IconWithLabel';
import styleJS from './style';

/**
 * Componente `InputField` que exibe um campo de entrada de texto com suporte para ícones, 
 * formatação de números, controle de edição e personalização de estilo.
 * Permite formatação de números com separadores de milhar e personalização com diferentes tipos de teclado.
 * 
 * @param {object} props - Propriedades passadas para o componente.
 * @param {string} props.icon - Nome do ícone a ser exibido ao lado do campo de entrada.
 * @param {string} props.placeholder - Texto que aparece quando o campo está vazio (dica para o usuário).
 * @param {string} props.value - Valor atual do campo de entrada.
 * @param {function} props.func - Função chamada quando o valor do campo é alterado (passa o valor sem formatação).
 * @param {boolean} props.editable - Define se o campo pode ser editado (true ou false).
 * @param {string} props.type - Tipo do campo de entrada (por exemplo, 'numeric' para números).
 * @param {boolean} props.border - Se `true`, aplica uma borda inferior no campo.
 * @param {string} [props.width='100%'] - Largura do campo de entrada. O valor padrão é '100%'.
 * @param {boolean} [props.multiline=false] - Se `true`, o campo será de múltiplas linhas.
 * @param {boolean} [props.data=false] - Se `true`, o campo não aplicará a formatação de números (usado para dados já formatados).
 * 
 * @returns {React.Element} O componente `InputField` renderizando um campo de entrada com as funcionalidades descritas.
 */
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
	onPress = ()=> {}
}) => {
  // Estado para armazenar o valor exibido no campo de entrada
	const [displayValue, setDisplayValue] = useState(value || '');

  /**
   * Hook `useEffect` que é executado sempre que o valor, tipo ou dados são alterados.
   * Se o tipo for 'numeric' e `data` for `false`, a formatação do número é aplicada.
   */
	useEffect(() => {
		if (type === 'numeric' && value && !data) {
			// Aplica a formatação apenas se 'data' for false
			setDisplayValue(formatNumber(value));
		} else {
			// Caso contrário, apenas define o valor
			setDisplayValue(value || '');
		}
	}, [value, type, data]);

  /**
   * Função para formatar números, aplicando separadores de milhar.
   * Utiliza `toLocaleString` para formatar o número conforme o padrão brasileiro.
   *
   * @param {string} num - Número a ser formatado.
   * @returns {string} - Número formatado com separador de milhar.
   */
	const formatNumber = (num) => {
		if (!num || isNaN(num)) return ''; // Previne NaN e retorna uma string vazia
		return Number(num).toLocaleString('pt-BR');
	};

  /**
   * Função chamada sempre que o valor do campo de entrada é alterado.
   * Se o tipo for 'numeric' e `data` for `false`, ela remove tudo que não for dígito e aplica a formatação.
   *
   * @param {string} text - Texto inserido pelo usuário.
   */
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
				onPress={onPress ? onPress : ''}
				style={[styles.input, { outline: 'none' }]}
				placeholder={placeholder}
				value={value} // Exibe o valor formatado no TextInput
				onChangeText={handleChange} // Chama o handleChange ao alterar o texto
				editable={editable}
				keyboardType={type === 'numeric' ? 'numeric' : 'default'} // Define o tipo de teclado (numérico ou padrão)
				multiline={multiline} // Define se o campo será multiline (texto de várias linhas)
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
		width: '90%',
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
