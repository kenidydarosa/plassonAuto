/** @format */

import styleJS from '../../components/style';
import { Text, TouchableHighlight } from 'react-native';

/**
 * Componente de botão que exibe uma data/hora. 
 * O botão é estilizado e, ao ser pressionado, executa a função `onPress`.
 * A cor do texto muda dependendo do estado `isActive`.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.label - Rótulo do botão.
 * @param {string} props.date - Data/hora exibida no botão.
 * @param {function} props.onPress - Função executada ao pressionar o botão.
 * @param {boolean} props.isActive - Indica se o botão está ativo.
 * @param {Object} props.style - Estilos adicionais a serem aplicados ao botão.
 *
 * @returns {JSX.Element} Um botão com texto que pode ser clicado para interagir.
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
 * Quando o campo e o modo do picker são iguais, o picker é fechado.
 * Caso contrário, o picker é exibido para o campo específico com o modo indicado.
 *
 * @param {Object} listPicker - Objeto contendo o estado e funções relacionadas ao picker.
 * @param {string} field - O campo que será editado ('startDate', 'startTime', 'endDate', 'endTime').
 * @param {string} mode - O modo de edição (pode ser 'date' ou 'time').
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
    setPickerMode(mode); // Define se é 'date' ou 'time'
    setShowPicker(true); // Exibe o picker
    setActiveButton(field); // Define o botão ativo
  }
};

/**
 * Função de callback executada quando o usuário seleciona uma data ou hora.
 * A data/hora selecionada é atribuída ao campo correspondente.
 *
 * @param {Event} event - O evento gerado pela seleção de data/hora.
 * @param {Date} selectedDateTime - A data/hora selecionada.
 * @param {Object} listPicker - Objeto contendo o estado e funções relacionadas ao picker.
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

