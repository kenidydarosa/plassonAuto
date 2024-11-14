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

LocaleConfig.locales['pt-br'] = {
	monthNames: [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julio',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	],
	dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
	dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
	today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

const TimelineCalendarScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const { create, id } = route.params || {};

	const [currentDate, setCurrentDate] = useState(getDate());
	const [eventsByDate, setEventsByDate] = useState(
		groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start)),
	);

	const marked = {
		[`${getDate(-1)}`]: { marked: true },
		[`${getDate()}`]: { marked: true },
		[`${getDate(1)}`]: { marked: true },
		[`${getDate(2)}`]: { marked: true },
		[`${getDate(4)}`]: { marked: true },
		[`${getDate(5)}`]: { marked: true },
	};

	const onDateChanged = (date) => {
		setCurrentDate(date);
	};

	const onMonthChange = (month) => {
		console.log('TimelineCalendarScreen onMonthChange: ', month);
	};

	// Navega para a tela NewSchedule
	const createNewEvent = (timeString, timeObject) => {
		// Aqui você pode adicionar a lógica para checar se o horário está vazio, se necessário.
		navigation.navigate('NewSchedule', { create, id, timeString });
	};

	const onEventPress = (event) => {
		alert(event.title, `Title: ${event.title}\nStart: ${event.start}`);
	};

	const timelineProps = {
		format24h: true,
		onBackgroundLongPress: createNewEvent, // Chama a função de navegação
		onEventPress: onEventPress,
		styles: customEventStyles,
	};

	return (
		<CalendarProvider
			date={currentDate}
			onDateChanged={onDateChanged}
			onMonthChange={onMonthChange}
			showTodayButton
			disabledOpacity={0.6}>
			<ExpandableCalendar
				firstDay={1}
				leftArrowImageSource={require('./img/previous.png')}
				rightArrowImageSource={require('./img/next.png')}
				markedDates={marked}
				calendarHeight={'100%'}
				pastScrollRange={12}
				futureScrollRange={24}
				scrollEnabled
				showScrollIndicator
				minDate={new Date().toISOString()}
				stickyHeaderIndices={true}
				hideArrows={false}
				theme={getTheme()}
			/>
			<TimelineList
				events={eventsByDate}
				timelineProps={timelineProps}
				showNowIndicator
				scrollToFirst
				initialTime={INITIAL_TIME}
			/>
		</CalendarProvider>
	);
};

export default TimelineCalendarScreen;
