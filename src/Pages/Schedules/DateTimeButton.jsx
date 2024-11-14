/** @format */
import styleJS from '../../components/style';
import { Text, TouchableHighlight } from 'react-native';

export const DateTimeButton = ({ label, date, onPress, isActive, style }) => (
  <TouchableHighlight style={style} onPress={onPress} underlayColor='#D9D9D9'>
    <Text style={{ fontSize: 17, color: isActive ? styleJS.imgCardColor : 'black' }}>
      {date}
    </Text>
  </TouchableHighlight>
);

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
    setPickerMode(mode); // Define se é date ou time
    setShowPicker(true); // Exibe o picker
    setActiveButton(field); // Define o botão ativo
  }
};

export const onChange = (event, selectedDateTime, listPicker) => {
  const { pickerField, setStartDate, setStartTime, setEndDate, setEndTime } = listPicker;

  if (selectedDateTime) {
    switch (pickerField) {
      case 'startDate':
        setStartDate(selectedDateTime);
        break;
      case 'startTime':
        setStartTime(selectedDateTime);
        break;
      case 'endDate':
        setEndDate(selectedDateTime);
        break;
      case 'endTime':
        setEndTime(selectedDateTime);
        break;
    }
  }
};
