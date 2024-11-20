/** @format */

// // Calendario do ano todo, quando clica mostra visão semanal
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { CalendarList } from 'react-native-calendars';
// import {LocaleConfig} from 'react-native-calendars';
// import { Ionicons } from '@expo/vector-icons';

// const MyCalendarApp = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [showAgenda, setShowAgenda] = useState(false);
//   const [events, setEvents] = useState({
//     '2024-11-18': [
//       {
//         title: 'Reunião de Equipe',
//         description: 'Discussão de andamento',
//         startHour: '10:00',
//         endHour: '11:00',
//       },
//     ],
//     '2024-11-19': [
//       {
//         title: 'Entrega de Projeto',
//         description: 'Finalização do projeto',
//         startHour: '17:00',
//         endHour: '18:00',
//       },
//     ],
//     '2024-11-20': [
//       {
//         title: 'Call com o Cliente',
//         description: 'Atualização sobre o projeto',
//         startHour: '14:00',
//         endHour: '15:00',
//       },
//     ],
//   });
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   LocaleConfig.locales['pt-br'] = {
//     monthNames: [
//       'Janeiro',
//       'Fevereiro',
//       'Março',
//       'Abril',
//       'Maio',
//       'Junho',
//       'Julio',
//       'Agosto',
//       'Setembro',
//       'Outubro',
//       'Novembro',
//       'Dezembro'
//     ],
//     dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinte', 'Sexta', 'Sábado'],
//     dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
//     today: "Hoje"
//   };

//   LocaleConfig.defaultLocale = 'pt-br';

//   // Função chamada ao clicar em um dia no calendário
//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     setShowAgenda(true);
//   };

//   // Função para gerar todos os horários do dia (de 00:00 até 23:30)
//   const generateTimeSlots = () => {
//     const timeSlots = [];
//     for (let i = 0; i < 24; i++) {
//       timeSlots.push(`${i < 10 ? `0${i}` : i}:00`);
//       timeSlots.push(`${i < 10 ? `0${i}` : i}:30`);
//     }
//     return timeSlots;
//   };

//   // Renderizando os horários do dia com ou sem eventos
//   const renderTimeSlot = (timeSlot) => {
//     const eventsForSlot = events[selectedDate]?.filter((event) => {
//       return (
//         (event.startHour <= timeSlot && event.endHour > timeSlot) ||
//         (event.startHour === timeSlot && event.endHour === timeSlot)
//       );
//     });

//     return (
// 			<View style={styles.timeSlot}>
// 				<Text style={styles.timeText}>{timeSlot}</Text>
// 				{eventsForSlot && eventsForSlot.length > 0 ? (
// 					eventsForSlot.map((event, index) => (
// 						<TouchableOpacity
// 							key={index}
// 							style={[styles.eventLabel, { height: timeSlot.height }]}
// 							onPress={() => alert(event.title, event.description)}>
// 							<Text style={styles.eventText}>{event.title}</Text>
// 						</TouchableOpacity>
// 					))
// 				) : (
// 					<Text style={styles.noEventText}></Text>
// 				)}
// 			</View>
// 		);
//   };

//   // Botão para voltar ao calendário mensal
//   const renderBackButton = () => (
//     <TouchableOpacity style={styles.backButton} onPress={() => setShowAgenda(false)}>
//       <Text style={styles.backButtonText}>
//         {new Date(selectedDate).toLocaleString('pt-BR', {
//           month: 'long',
//           year: 'numeric',
//         })}
//       </Text>
//     </TouchableOpacity>
//   );

//   // Renderizando a visualização do dia
//   const renderDayView = () => (
//     <View style={{ flex: 1 }}>
//       <ScrollView horizontal style={styles.dayScroll}>
//         {generateWeekDays().map((day, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.dayButton, day.isSelected && styles.selectedDayButton]}
//             onPress={() => handleDayPress(day.date)}
//           >
//             <Text style={[styles.dayText, day.isMarked && styles.markedDayText]}>
//               {day.day}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <FlatList
//         data={generateTimeSlots()}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => renderTimeSlot(item)}
//       />
//     </View>
//   );

//   // Gera os dias da semana para exibição
//   const generateWeekDays = () => {
//     const weekDays = [];
//     const startDate = new Date(selectedDate);
//     startDate.setDate(startDate.getDate() - startDate.getDay()); // Inicia na primeira dia da semana

//     for (let i = 0; i < 7; i++) {
//       const currentDate = new Date(startDate);
//       currentDate.setDate(currentDate.getDate() + i);
//       weekDays.push({
//         date: currentDate.toISOString().split('T')[0],
//         day: currentDate.getDate(),
//         isSelected: currentDate.toISOString().split('T')[0] === selectedDate,
//         isMarked: events[currentDate.toISOString().split('T')[0]]?.length > 0,
//       });
//     }
//     return weekDays;
//   };

//   const handleDayPress = (date) => {
//     setSelectedDate(date);
//   };
//   return (
//     <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
//       <View style={styles.header}>
//         {renderBackButton()}

//       </View>
//       <View style={styles.dayWeeks}>
//         <Text style={styles.textDayWeeks}>Dom</Text>
//         <Text style={styles.textDayWeeks}>Seg</Text>
//         <Text style={styles.textDayWeeks}>Ter</Text>
//         <Text style={styles.textDayWeeks}>Qua</Text>
//         <Text style={styles.textDayWeeks}>Qui</Text>
//         <Text style={styles.textDayWeeks}>Sex</Text>
//         <Text style={styles.textDayWeeks}>Sab</Text>
//       </View>
//       {!showAgenda ? (
//         <CalendarList
//           onDayPress={onDayPress}
//           markedDates={Object.keys(events).reduce((acc, date) => {
//             acc[date] = { marked: true, dotColor: '#000' };
//             return acc;
//           }, {})}
//           pastScrollRange={12}
//           futureScrollRange={24}
//           scrollEnabled
//           showScrollIndicator
//           minDate={new Date()}
//           // hideExtraDays={false}
//           hideDayNames={true}
//           style={styles.calendar}
//           stickyHeaderIndices={true}
//           theme={{
//             textSectionTitleColor:'#000',
//             todayTextColor: '#fff',
//             todayBackgroundColor:'tomato',
//             textMonthFontFamily:'Poppins',
//             textDayFontFamily:'Poppins',
//             dotColor:'#ccc',
//             monthTextColor:'#000',
//           }}
//         />
//       ) :
//       (
//         renderDayView()
//       )
//       }
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   calendar: {
//     // marginTop: 50,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#ffffff',
//   },
//   containerIconButtons:{
//     flexDirection:'row',
//     gap:10
//   },
//   iconButton: {
//     padding: 10,
//   },
//   backButton: {
//     padding: 5,
//     borderRadius: 5,
//     alignItems: 'center',
//     margin: 10,
//   },
//   dayWeeks:{
//     paddingHorizontal:10,
//     flexDirection:'row',
//     gap:1,
//     justifyContent:'space-evenly'
//   },
//   textDayWeeks:{
//     padding:5,
//     borderWidth:1,
//     width:50,
//     textAlign:'center'
//   },
//   backButtonText: {
//     color: 'tomato',
//     fontSize: 16,
//   },
//   timeSlot: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginHorizontal: 15,
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#F3F3F3A4',
//     alignItems: 'center',
//     gap: 20,
//   },
//   timeText: {
//     fontSize: 13,
//   },
//   eventLabel: {
//     backgroundColor: 'tomato',
//     padding: 5,
//     borderRadius: 5,
//     marginLeft: 10,
//     position:'absolute',
//     left:60,
//   },
//   eventText: {
//     color: '#fff',
//   },
//   noEventText: {
//     color: 'gray',
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   dayScroll: {
//     flexDirection: 'row',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   dayButton: {
//     padding: 10,
//     height: 40,
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '50%',
//     borderRadius: 50,
//     marginHorizontal: 5,
//     backgroundColor: '#fff',
//   },
//   dayText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   selectedDayButton: {
//     backgroundColor: 'tomato',
//     color:'#ffffff'
//   },
//   markedDayText: {
//     // color: 'tomato',
//     // fontWeight: 'bold',
//   },

// });

// export default MyCalendarApp;

import TimelineCalendarScreen from "./timelineCalendar";
const Calendar = ()=>{
    return <TimelineCalendarScreen/>
  }
  export default Calendar;

// import CaledarioTeste from "./TimeLine/TimeLine";
// const Calendar = ()=>{
//     return <CaledarioTeste/>
//   }
//   export default Calendar;

//==========================================
// import { addDays } from 'date-fns';
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// import { DatePicker } from 'react-native-week-month-date-picker';

// export default function App() {
// 	const minDate = new Date();
// 	const [selectedDate, setSelectedDate] = useState(new Date());

// 	// Atualiza a data e força a visualização da semana correta
// 	const handleDateChange = (date) => {
// 		setSelectedDate(date);

// 		// Força o `DatePicker` a focar na nova semana
// 		setTimeout(() => {
// 			setSelectedDate(date); // Garante que a semana seja centrada na data selecionada
// 		}, 0);
// 	};

// 	return (
// 		<SafeAreaView style={{ flex: 1 }}>
// 			{/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
// 			<DatePicker
// 				minDate={minDate}
// 				maxDate={addDays(minDate, 365)}
// 				markedDates={[minDate, addDays(new Date(), 2)]}
// 				selectedDate={selectedDate}
// 				onDateChange={handleDateChange}
// 				disabledDates={[addDays(new Date(), 1), addDays(new Date(), 3)]}
// 				allowsPastDates={false}
// 				locale='pt-br'
				
// 				translations={{
// 					todayButtonText: 'Hoje',
// 				}}
// 				theme={{
// 					primaryColor: 'tomato',
// 				}}>
// 				<View style={{ padding: 16 }}>
// 					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Horários Disponíveis</Text>
// 					<Text>{selectedDate.toString()}</Text>
// 				</View>
// 			</DatePicker>
// 			{/* </ScrollView> */}
// 		</SafeAreaView>
// 	);
// }
// import React, { useCallback, useState } from 'react';
// import { Text, View } from 'react-native';
// import {
// 	CalendarBody,
// 	CalendarContainer,
// 	CalendarHeader,
// 	DraggingEvent,
// } from '@howljs/calendar-kit';
// import styleJS from '../../components/style';

// const Calendar = () => {
// 	const [selectedEvent, setSelectedEvent] = useState(null);
// 	const [draggedEventId, setDraggedEventId] = useState(null);

// 	const handleDragStart = (event) => {
// 		setDraggedEventId(event.id);
// 		console.log('Iniciando edição do evento:', event);
// 	};

// 	const handleDragEnd = (event) => {
// 		setDraggedEventId(null);
// 		console.log('Evento editado:', event);
// 	};

// 	const renderEvent = useCallback(
// 		(event) => (
// 			<View
// 				style={{
// 					width: '100%',
// 					height: '100%',
// 					padding: 4,
// 					borderRadius: 7,
// 					marginLeft: 0,
// 					backgroundColor: draggedEventId === event.id ? 'red' : styleJS.primaryColor,
// 				}}>
// 				<Text style={{ color: 'black', fontSize: 12 }}>{event.title}</Text>
// 			</View>
// 		),
// 		[draggedEventId],
// 	);

// 	return (
// 		<CalendarContainer
// 			allowDragToCreate={true}
// 			allowDragToEdit={true}
// 			onDragSelectedEventStart={handleDragStart}
// 			onDragSelectedEventEnd={handleDragEnd}
// 			numberOfDays={1}
// 			scrollByDay={true}
// 			minDate={new Date()}
// 			selectedEvent={selectedEvent}
// 			events={[
// 				{
// 					id: '1',
// 					title: 'Reunião com a Equipe',
// 					start: { dateTime: '2024-11-04T10:00:00Z' },
// 					end: { dateTime: '2024-11-04T11:00:00Z' },
// 					color: styleJS.primaryColor,
// 				},
// 			]}
// 			onPressEvent={(event) => console.log('Evento pressionado', event)}
// 			defaultDuration={60}
// 			dragStep={15}>
// 			<CalendarHeader />
// 			<CalendarBody
// 				renderEvent={renderEvent}
// 				renderDraggingEvent={(props) => <DraggingEvent {...props} />}
// 			/>
// 		</CalendarContainer>
// 	);
// };

// export default Calendar;
