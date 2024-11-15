/** @format */

import React from 'react';
import { styleJSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';

// import CardMySchedules from '../../components/CardMySchedules';
import fontConfig from '../../config/fontConfig'; // Importa a configuração de fonte
import Header from '../../components/Header';
import styleJS from '../../components/style';
// import LocationPicker from '../../components/maps';

export const Home = () => {
	const fontsLoaded = fontConfig(); // Usa a configuração de fontes

	if (!fontsLoaded) {
		return <ActivityIndicator size='large' color='#D13C3CFF' />;
	}

	// Aqui definimos o estilo padrão para todos os componentes Text
	Text.defaultProps = {
		...Text.defaultProps,
		style: { fontFamily: 'Poppins_400Regular' }, // Define a fonte padrão
	};

	return (
		<View style={styleJS.pageContainer}>
			<ScrollView contentContainerStyle={styleJS.container}>
				<Header />
				<Text style={[styleJS.title, {marginTop: 0}]}>Home</Text>
			</ScrollView>
		</View>
	);
};


export default Home;
