/** @format */

import { defineAnimation } from 'react-native-reanimated';
import styleJS from '../../components/style';
import { Text, TouchableHighlight, Platform } from 'react-native';

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
export const DateTimeButton = ({ label, date, onPress, isActive, style, disabled }) => (
  <TouchableHighlight style={style} onPress={onPress} underlayColor='#D9D9D9' disabled={disabled}>
    <Text style={{ fontSize: 17, color: isActive ? styleJS.imgCardColor : 'black' }}>{date}</Text>
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
    setMinimumDate,
    startDate,
    endDate,
    startTime,
    endTime,
  } = listPicker;

  if (pickerField === field && pickerMode === mode && showPicker) {
    setShowPicker(false); // Fecha o picker
    setActiveButton(''); // Reseta o botão ativo
  } else {
    setPickerField(field); // Define o campo a ser editado
    setPickerMode(mode); // Define o modo como 'date' ou 'time'
    defineMinimumDate(field, setMinimumDate, startDate, startTime);
    setShowPicker(true); // Exibe o picker
    setActiveButton(field); // Define o botão como ativo
  }
};

/**
 * Função para alternar a exibição do seletor de data/hora.
 * Se o campo e o modo do picker forem iguais aos parâmetros fornecidos, o picker é fechado.
 * Caso contrário, o picker é aberto para o campo específico, definindo também o modo (data ou hora).
 *
 * @param {Object} listPicker - Objeto que contém estados e funções relacionadas ao picker.
 * @param {string} field - O campo que será editado, como 'startDate', 'startTime', 'endDate', 'endTime'.
 * @param {string} mode - O modo do picker, que pode ser 'date' ou 'time'.
 */

const defineMinimumDate = (pickerField, setMinimumDate, startDate, startTime, endDate) => {
  const currentDate = new Date();

  if (pickerField === 'startDate') {
    setMinimumDate(new Date()); // Para 'startDate', retorne a data atual
  }

  if (pickerField === 'endDate') {
    // Comparando startDate com a data atual para definir o mínimo
    return startDate >= currentDate ? setMinimumDate(new Date(new Date(startDate).setHours(0, 0, 0, 0))) : setMinimumDate(currentDate);
  }

  if (pickerField === 'startTime') {
    // Se startDate for maior que a data atual, use startDate
    return startDate >= currentDate ? setMinimumDate(new Date(new Date(startDate).setHours(0, 0, 0, 0))) : setMinimumDate(currentDate);
  }

  if (pickerField === 'endTime') {
    // Verificar se endDate e startDate estão definidos antes de acessar getTime
    const validEndDate = endDate ? endDate.getTime() : currentDate.getTime();
    const validStartDate = startDate ? startDate.getTime() : currentDate.getTime();

    // Ajuste da data mínima para endTime
    if (validEndDate === validStartDate || validEndDate === currentDate.setHours(0, 0, 0, 0)) {
      // Se endDate for igual a startDate ou igual à data atual, mínimo é startTime
      setMinimumDate(startTime ? startTime : currentDate);
    } else {
      // Caso contrário, não há restrição para o horário mínimo
      setMinimumDate(currentDate);
    }
  }

  return currentDate; // Caso não se encaixe em nenhum dos casos, retorna a data atual
};

export const onChange = (event, selectedDateTime, listPicker) => {
  const { pickerField, setStartDate, setStartTime, setEndDate, setEndTime, setShowPicker, setActiveButton, startDate, endDate, startTime, endTime } =
    listPicker;
  const isAndroid = Platform.OS === 'android';
  const currentDate = new Date(); // Hora atual

  // Normaliza as datas para comparar apenas a parte da data (ano, mês, dia)
  const selectedDate = new Date(selectedDateTime);
  const normalizedSelectedDate = new Date(selectedDate);
  normalizedSelectedDate.setHours(0, 0, 0, 0); // Remove a parte de hora/minuto/segundo

  const normalizedCurrentDate = new Date(currentDate);
  normalizedCurrentDate.setHours(0, 0, 0, 0); // Remove a parte de hora/minuto/segundo

  // Função para ajustar o endTime e o endDate quando necessário
  const adjustEndTimeAndDate = (newEndDate, newStartTime, keepOriginalTime) => {
    const updatedEndTime = new Date(newEndDate);

    if (keepOriginalTime) {
      // Mantém a hora de endTime e ajusta apenas a data
      updatedEndTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
    } else {
      // Adiciona 1 hora ao startTime
      updatedEndTime.setHours(newStartTime.getHours() + 1, newStartTime.getMinutes(), 0, 0);
    }

    // Verifica se o novo endTime cruza para o próximo dia
    if (updatedEndTime.getHours() < newStartTime.getHours() || updatedEndTime.getDate() !== newEndDate.getDate()) {
      // Se o endTime for no dia seguinte, ajusta a endDate
      const newEndDateAdjusted = new Date(newEndDate);
      newEndDateAdjusted.setDate(newEndDateAdjusted.getDate() + 1);
      setEndDate(newEndDateAdjusted);
      updatedEndTime.setDate(newEndDateAdjusted.getDate()); // Atualiza a data de endTime para corresponder
    }

    setEndTime(updatedEndTime);
  };

  if (selectedDateTime) {
    switch (pickerField) {
      case 'startDate':
        setStartDate(selectedDateTime); // Define a data de início
        setEndDate(selectedDateTime); // Atualiza a data de término para a mesma data

        // Verifica a diferença entre startDate e endDate
        const startToEndDiff = (new Date(endDate) - new Date(selectedDateTime)) / (1000 * 60 * 60 * 24); // Diferença em dias

        if (startToEndDiff < 1) {
          // Se a diferença for menor que 1 dia, adiciona 1 dia em endDate
          const updatedEndDate = new Date(selectedDateTime);
          updatedEndDate.setDate(updatedEndDate.getDate() + 1);
          setEndDate(updatedEndDate);
        }

        if (normalizedSelectedDate.getTime() === normalizedCurrentDate.getTime()) {
          // Se a data selecionada for igual a hoje
          const currentHour = currentDate.getHours(); // Hora atual
          const currentMinute = currentDate.getMinutes(); // Minuto atual

          // Verifica se startTime é menor que o horário atual
          if (startTime.getHours() < currentHour || (startTime.getHours() === currentHour && startTime.getMinutes() < currentMinute)) {
            // Se startTime for menor que a hora atual, ajusta startTime para a data e hora atuais
            setStartTime(currentDate);
            adjustEndTimeAndDate(selectedDateTime, currentDate, false); // Ajusta o endTime para 1 hora a mais que o startTime atualizado
          } else {
            // Caso contrário, mantém o horário de startTime com a data de hoje
            let updatedStartTime = new Date(selectedDateTime);
            updatedStartTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0); // Mantém a hora selecionada
            setStartTime(updatedStartTime);
            adjustEndTimeAndDate(selectedDateTime, updatedStartTime, true); // Ajusta apenas a data de endTime, mantendo a hora original
          }
        } else {
          // Se a data não for hoje, mantém o horário anterior com a nova data selecionada
          let updatedStartTime = new Date(selectedDateTime); // Cria uma nova data com a data selecionada
          updatedStartTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0); // Mantém o horário anterior
          setStartTime(updatedStartTime); // Define o horário de início corretamente
          adjustEndTimeAndDate(selectedDateTime, updatedStartTime, true); // Ajusta apenas a data de endTime, mantendo a hora original
        }
        break;

      case 'startTime':
        setStartTime(selectedDateTime); // Define a hora de início
        // Ajusta o endTime para 1 hora a mais apenas se a data for hoje e startTime for menor que o horário atual
        if (
          normalizedSelectedDate.getTime() === normalizedCurrentDate.getTime() &&
          (selectedDateTime.getHours() < currentDate.getHours() ||
            (selectedDateTime.getHours() === currentDate.getHours() && selectedDateTime.getMinutes() < currentDate.getMinutes()))
        ) {
          adjustEndTimeAndDate(endDate, selectedDateTime, false); // Adiciona 1 hora
        } else {
          adjustEndTimeAndDate(endDate, selectedDateTime, true); // Mantém a hora original
        }
        break;

      case 'endDate':
        setEndDate(selectedDateTime); // Define a data de término

        // Verifica se o endDate está no mesmo dia de startDate
        const startToEndDateDiff = (new Date(selectedDateTime) - new Date(startDate)) / (1000 * 60 * 60 * 24); // Diferença em dias

        // Se endDate for menor que startDate, ajusta endDate para 1 dia maior que startDate
        if (startToEndDateDiff < 1) {
          const updatedEndDate = new Date(selectedDateTime);
          updatedEndDate.setDate(updatedEndDate.getDate() + 1);
          setEndDate(updatedEndDate);
        } else {
          // Caso contrário, mantém o valor original de endDate
          setEndDate(selectedDateTime);
        }

        if (normalizedSelectedDate.getTime() === normalizedCurrentDate.getTime()) {
          // Se endDate for hoje, endTime deve ser maior que o horário atual e startTime
          adjustEndTimeAndDate(selectedDateTime, startTime, false);
        } else {
          // Se endDate não for hoje, ajusta endTime para a data selecionada mantendo a hora
          adjustEndTimeAndDate(selectedDateTime, endTime, true);
        }
        break;

      case 'endTime':
        setEndTime(selectedDateTime); // Define a hora de término

        // Verifica se a hora de término está no dia seguinte em relação a startTime
        if (
          selectedDateTime.getHours() < startTime.getHours() ||
          (selectedDateTime.getHours() === 0 && selectedDateTime.getMinutes() < startTime.getMinutes())
        ) {
          // Ajusta a endDate para o dia seguinte
          const newEndDate = new Date(endDate);
          newEndDate.setDate(newEndDate.getDate() + 1);
          setEndDate(newEndDate);
        } else {
          // Se endTime for maior que startTime, mas ainda dentro do mesmo dia
          // Apenas garante que o endDate pode ser igual ao startDate
          if (
            selectedDateTime.getHours() > startTime.getHours() ||
            (selectedDateTime.getHours() === startTime.getHours() && selectedDateTime.getMinutes() > startTime.getMinutes())
          ) {
            setEndDate(startDate); // Deixa endDate igual a startDate
          }
        }
        break;
    }

    // Ajuste final para a comparação
    const normalizedStartDate = new Date(startDate);
    const normalizedEndDate = new Date(endDate);

    normalizedStartDate.setHours(0, 0, 0, 0); // Normaliza startDate para 00:00
    normalizedEndDate.setHours(0, 0, 0, 0); // Normaliza endDate para 00:00

    if (normalizedStartDate.getTime() === normalizedEndDate.getTime() && selectedDateTime < endTime) {
      const updatedEndDate = new Date(endDate);
      updatedEndDate.setDate(updatedEndDate.getDate() + 1); // Se as datas forem iguais e endTime for menor que startTime, incrementa endDate
      setEndDate(updatedEndDate);
    }
    if (isAndroid) {
      setShowPicker(false);
      setActiveButton('');
    }
  }
};
