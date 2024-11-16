/** @format */

import styleJS from '../../components/style';
import { Text, TouchableHighlight } from 'react-native';

/**
 * Componente de botão de data/hora interativo.
 * Ao ser pressionado, o botão executa a função `onPress`. 
 * O texto exibido pode ter a cor alterada dependendo do estado `isActive`.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.label - Rótulo do botão (não utilizado diretamente no componente, mas presente para futuros ajustes).
 * @param {string} props.date - Data ou hora a ser exibida no botão.
 * @param {function} props.onPress - Função que é chamada quando o botão é pressionado.
 * @param {boolean} props.isActive - Indica se o botão está ativo, alterando a cor do texto.
 * @param {Object} props.style - Estilos adicionais para personalizar o botão.
 *
 * @returns {JSX.Element} Um botão com texto que pode ser pressionado para interagir.
 */
export const DateTimeButton = ({ label, date, onPress, isActive, style }) => (
  <TouchableHighlight style={style} onPress={onPress} underlayColor='#D9D9D9'>
    <Text style={{ fontSize: 17, color: isActive ? styleJS.imgCardColor : 'black' }}>
      {date}
    </Text>
  </TouchableHighlight>
);

/**
 * Função para alternar a exibição do seletor de data/hora.
 * Se o campo e o modo do picker forem iguais aos parâmetros fornecidos, o picker é fechado.
 * Caso contrário, o picker é aberto para o campo específico, definindo também o modo (data ou hora).
 *
 * @param {Object} listPicker - Objeto que contém estados e funções relacionadas ao picker.
 * @param {string} field - O campo que será editado, como 'startDate', 'startTime', 'endDate', 'endTime'.
 * @param {string} mode - O modo do picker, que pode ser 'date' ou 'time'.
 */
export const showDateTimePicker = (listPicker, field, mode) => {
  const {
    pickerField,
    setPickerField,
    showPicker,
    setShowPicker,
    setActiveButton,
    pickerMode,
    setPickerMode,
  } = listPicker;

  if (pickerField === field && pickerMode === mode && showPicker) {
    setShowPicker(false); // Fecha o picker
    setActiveButton(''); // Reseta o botão ativo
  } else {
    setPickerField(field); // Define o campo a ser editado
    setPickerMode(mode); // Define o modo como 'date' ou 'time'
    setShowPicker(true); // Exibe o picker
    setActiveButton(field); // Define o botão como ativo
  }
};

/**
 * Função de callback que é chamada quando o usuário seleciona uma data ou hora.
 * A data/hora selecionada é atribuída ao campo correspondente no estado.
 *
 * @param {Event} event - O evento gerado pela seleção de data/hora.
 * @param {Date} selectedDateTime - A data ou hora selecionada pelo usuário.
 * @param {Object} listPicker - Objeto que contém funções para atualizar os estados dos campos.
 */
export const onChange = (event, selectedDateTime, listPicker) => {
  const { pickerField, setStartDate, setStartTime, setEndDate, setEndTime } = listPicker;

  if (selectedDateTime) {
    switch (pickerField) {
      case 'startDate':
        setStartDate(selectedDateTime); // Define a data de início
        break;
      case 'startTime':
        setStartTime(selectedDateTime); // Define a hora de início
        break;
      case 'endDate':
        setEndDate(selectedDateTime); // Define a data de término
        break;
      case 'endTime':
        setEndTime(selectedDateTime); // Define a hora de término
        break;
    }
  }
};
