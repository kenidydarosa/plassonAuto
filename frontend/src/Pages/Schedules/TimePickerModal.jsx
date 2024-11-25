/** @format */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function DateTimePicker({ mode = 'time' }) {
	const [visible, setVisible] = useState(false); // Controla a exibição do Modal
	const [time, setTime] = useState({ hours: 9, minutes: 0 }); // Estado inicial para o horário
	const [date, setDate] = useState(null); // Estado inicial para a data

	const openPicker = () => setVisible(true);
	const closePicker = () => setVisible(false);

	// Função para confirmar seleção de tempo
	const onTimeConfirm = ({ hours, minutes }) => {
		setTime({ hours, minutes });
		closePicker();
	};

	// Função para confirmar seleção de data
	const onDateConfirm = (selectedDate) => {
		setDate(selectedDate.date);
		closePicker();
	};

	// Formatar valores
	const formatTime = `${time.hours.toString().padStart(2, '0')}:${time.minutes
		.toString()
		.padStart(2, '0')}`;
	const formatDate = date ? date.toDateString() : '';

	return (
		<SafeAreaProvider>
			<PaperProvider>
				<View style={{ padding: 20 }}>
					{/* Campo de entrada que exibe data ou tempo */}
					<TextInput
						label={`Select ${mode === 'time' ? 'Time' : 'Date'}`}
						value={mode === 'time' ? formatTime : formatDate}
						onFocus={openPicker} // Abre o seletor ao focar
						style={{ backgroundColor: 'white' }}
						showSoftInputOnFocus={false} // Para não mostrar o teclado
					/>

					{/* Modal para TimePicker */}
					{mode === 'time' && (
						<TimePickerModal
							visible={visible}
							onDismiss={closePicker}
							onConfirm={onTimeConfirm}
							hours={time.hours}
							minutes={time.minutes}
							label='Select time'
							cancelLabel='Cancel'
							confirmLabel='OK'
							animationType='fade'
							locale='pt-br'
						/>
					)}

					{/* Modal para DatePicker */}
					{mode === 'date' && (
						<DatePickerModal
							mode='single'
							visible={visible}
							onDismiss={closePicker}
							date={date}
							onConfirm={onDateConfirm}
							locale='pt-br'
							presentationStyle='pageSheet'
						/>
					)}
				</View>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
