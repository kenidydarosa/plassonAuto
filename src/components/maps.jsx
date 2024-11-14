// /** @format */

// import React, { useState } from 'react';
// import { View, Button, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const LocationPicker = () => {
// 	const [location, setLocation] = useState(null);
// 	const [mapVisible, setMapVisible] = useState(false);

// 	// Posição inicial (exemplo: centralizada em São Paulo)
// 	const initialRegion = {
// 		latitude: -23.55052,
// 		longitude: -46.633308,
// 		latitudeDelta: 0.05,
// 		longitudeDelta: 0.05,
// 	};

// 	// Função para abrir o mapa e permitir a seleção de localização
// 	const openMap = () => {
// 		setMapVisible(true);
// 	};

// 	// Função para salvar a localização selecionada
// 	const saveLocation = () => {
// 		setMapVisible(false);
// 	};

// 	return (
// 		<View style={{ flex: 1 }}>
// 			{mapVisible ? (
// 				<MapView
// 					style={{ flex: 1 }}
// 					initialRegion={initialRegion}
// 					onPress={(e) => setLocation(e.nativeEvent.coordinate)}>
// 					{location && (
// 						<Marker
// 							coordinate={location}
// 							draggable
// 							onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
// 						/>
// 					)}
// 				</MapView>
// 			) : (
// 				<View>
// 					<Button title='Abrir Mapa' onPress={openMap} />
// 					{location ? (
// 						<Text>
// 							Localização: {location.latitude}, {location.longitude}
// 						</Text>
// 					) : (
// 						<Text>Selecione uma localização</Text>
// 					)}
// 				</View>
// 			)}
// 			{mapVisible && <Button title='Salvar Localização' onPress={saveLocation} />}
// 		</View>
// 	);
// };

// export default LocationPicker;
