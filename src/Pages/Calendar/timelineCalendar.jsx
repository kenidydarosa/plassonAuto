/** @format */

import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
  LocaleConfig,
} from 'react-native-calendars';
import { timelineEvents, getDate } from './mocks/timelineEvents';
import styleJS, { getTheme } from '../../components/style';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS = timelineEvents;

const customEventStyles = {
  eventTitle: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Poppins',
    color: '#000',
  },
  eventSummary: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Poppins',
  },
  eventTimes: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Poppins',
  },
};

// Configuração do idioma para o calendário (português)
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

/**
 * Tela que exibe um calendário expansível com uma linha do tempo de eventos.
 * Permite navegar entre datas e visualizar detalhes de eventos.
 *
 * @returns {JSX.Element} Tela com calendário expansível e linha do tempo de eventos.
 */
const TimelineCalendarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { create, id } = route.params || {}; // Obtém os parâmetros de navegação (se existirem)

  // Estado para controlar a data atual e os eventos agrupados por data
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState(
    groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start))
  );

  // Marcação de algumas datas específicas
  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
    [`${getDate(5)}`]: { marked: true },
  };

  // Função chamada quando a data no calendário é alterada
  const onDateChanged = (date) => {
    setCurrentDate(date);
  };

  // Função chamada quando o mês é alterado
  const onMonthChange = (month) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month);
  };

  // Navega para a tela de criação de novo evento (NewSchedule)
  const createNewEvent = (timeString, timeObject) => {
    navigation.navigate('NewSchedule', { create, id, timeString });
  };

  // Função chamada ao pressionar um evento na linha do tempo
  const onEventPress = (event) => {
    alert(event.title, `Title: ${event.title}\nStart: ${event.start}`);
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged} // Define a função para alteração de data
      onMonthChange={onMonthChange} // Define a função para alteração de mês
      showTodayButton // Exibe o botão para voltar para o dia de hoje
      disabledOpacity={0.6} // Define a opacidade das datas desativadas
    >
      <ExpandableCalendar
        firstDay={1} // Define o primeiro dia da semana como segunda-feira
        leftArrowImageSource={require('./img/previous.png')} // Ícone de seta para a esquerda
        rightArrowImageSource={require('./img/next.png')} // Ícone de seta para a direita
        markedDates={marked} // Datas marcadas para exibição
        calendarHeight={'100%'} // Define a altura do calendário
        pastScrollRange={12} // Define o intervalo de meses passados para rolar
        futureScrollRange={24} // Define o intervalo de meses futuros para rolar
        scrollEnabled // Habilita o rolar do calendário
        showScrollIndicator // Exibe o indicador de rolagem
        minDate={new Date().toISOString()} // Define a data mínima para o calendário (hoje)
        stickyHeaderIndices={true} // Faz o cabeçalho do calendário fixo
        hideArrows={false} // Exibe as setas de navegação
        theme={getTheme()} // Aplica o tema personalizado
      />
      <TimelineList
      
        events={eventsByDate} // Passa os eventos agrupados por data
        keyExtractor={(item) => item.id || item.someUniqueIdentifier} // Utiliza uma chave única para cada evento
        timelineProps={{
          format24h: true, // Define o formato de hora como 24 horas
          onBackgroundLongPress: createNewEvent, // Chama a função de navegação ao pressionar em branco
          onEventPress: onEventPress, // Chama a função ao pressionar um evento
          styles: customEventStyles, // Estilos personalizados para os eventos
        }}
        showNowIndicator // Exibe o indicador de hora atual
        scrollToFirst // Rola para o primeiro evento
        initialTime={INITIAL_TIME} // Define o horário inicial da linha do tempo
      />
    </CalendarProvider>
  );
};

export default TimelineCalendarScreen;
