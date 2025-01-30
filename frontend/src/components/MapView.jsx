// import React, { useEffect, useRef, useState } from 'react';
// import { View, StyleSheet, Dimensions, Alert, Platform, Text } from 'react-native';
// import { IconButton } from 'react-native-paper';
// import MapView, { MarkerAnimated, AnimatedRegion, Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { useDataContext } from '../data/DataContext.js';
// import { fetchPlaceName, GOOGLE_MAPS_API_KEY } from '../config/api.js';
// import MapViewDirections from 'react-native-maps-directions';

// const { width, height } = Dimensions.get('window');

// // Função para calcular o ponto médio entre dois pontos geográficos
// const calculateMidPoint = (origin, destination) => {
//   if (!origin || !destination) return;

//   const lat1 = origin.latitude * (Math.PI / 180);
//   const lon1 = origin.longitude * (Math.PI / 180);
//   const lat2 = destination.latitude * (Math.PI / 180);
//   const lon2 = destination.longitude * (Math.PI / 180);

//   const dLon = lon2 - lon1;
//   const Bx = Math.cos(lat2) * Math.cos(dLon);
//   const By = Math.cos(lat2) * Math.sin(dLon);
//   const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
//   const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

//   return {
//     latitude: lat3 * (180 / Math.PI),
//     longitude: lon3 * (180 / Math.PI),
//   };
// };

// const Map = ({ location, setSelectMaps }) => {
//   const mapRef = useRef(null);
//   const {
//     setLatitudeUser,
//     setLongitudeUser,
//     destination,
//     setDestination,
//     latitudeUser,
//     longitudeUser,
//     setLatitudeTemp,
//     setLongitudeTemp,
//     routeInfo,
//     setRouteInfo,
//   } = useDataContext();

//   const [placeName, setPlaceName] = useState('Local selecionado');
//   const [coordinate, setCoordinate] = useState(
//     new AnimatedRegion({
//       latitude: location?.latitude || 0,
//       longitude: location?.longitude || 0,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     })
//   );

//   const [midPoint, setMidPoint] = useState(null);

//   // Obtenção da localização inicial do usuário
//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permissão Negada', 'Não foi possível acessar sua localização. Verifique as permissões do aplicativo.');
//         return;
//       }

//       const userLocation = await Location.getCurrentPositionAsync({});
//       let { latitude, longitude } = userLocation.coords;

//       setLatitudeUser(latitude);
//       setLongitudeUser(longitude);
//     })();
//   }, []);

//   // Atualizar o ponto médio quando o destino mudar
//   useEffect(() => {
//     if (latitudeUser && longitudeUser && destination?.latitude && destination?.longitude) {
//       const newMidPoint = calculateMidPoint({ latitude: latitudeUser, longitude: longitudeUser }, destination);
//       setMidPoint(newMidPoint);
//     }
//   }, [destination]);

//   // Atualizar o marcador e aplicar o efeito de balanço ao mudar a localização
//   useEffect(() => {
//     if (location) {
//       coordinate
//         .timing({
//           latitude: location.latitude,
//           longitude: location.longitude,
//           duration: 100,
//           useNativeDriver: false,
//         })
//         .start(() => {
//           const bounce = [
//             { latitude: location.latitude + 0.000002, longitude: location.longitude },
//             { latitude: location.latitude - 0.000002, longitude: location.longitude },
//             { latitude: location.latitude + 0.00001, longitude: location.longitude },
//             { latitude: location.latitude, longitude: location.longitude },
//           ];

//           let index = 0;
//           const interval = setInterval(() => {
//             coordinate
//               .timing({
//                 latitude: bounce[index]?.latitude,
//                 longitude: bounce[index]?.longitude,
//                 duration: 100,
//                 useNativeDriver: false,
//               })
//               .start();
//             index++;
//             if (index >= bounce.length) clearInterval(interval);
//           }, 150);
//         });
//       setDestination({ latitude: location.latitude, longitude: location.longitude });
//       updatePlaceName();
//     }
//   }, [location]);

//   const updatePlaceName = async () => {
//     if (location) {
//       const name = await fetchPlaceName({
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });

//       setPlaceName(name);
//     }
//   };

//   const recenterMap = async () => {
//     const userLocation = await Location.getCurrentPositionAsync({});
//     let { latitude, longitude } = userLocation.coords;

//     mapRef.current.animateToRegion({
//       latitude,
//       longitude,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     });
//   };

//   const handleLocation = async (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;

//     setLatitudeTemp(latitude);
//     setLongitudeTemp(longitude);
//     setSelectMaps(true);
//     setDestination({ latitude, longitude });
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         mapType='standard'
//         ref={mapRef}
//         style={styles.map}
//         region={{
//           latitude: location.latitude || 0,
//           longitude: location.longitude || 0,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//         initialRegion={{
//           latitude: latitudeUser || 0,
//           longitude: longitudeUser || 0,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//         showsUserLocation={true}
//         showsPointsOfInterest={true}
//         showsBuildings={true}
//         showsMyLocationButton={true}
//         onLongPress={handleLocation}
//         onPress={handleLocation}
//         showsTraffic={true}
//         compassOffset={[-20, 340]}
//       >
//         {/* Marcador animado */}
//         {location && <MarkerAnimated coordinate={coordinate} title={placeName} draggable onDragEnd={handleLocation} />}

//         {/* Ponto médio com balão visível */}
//         {midPoint && (
//           <Marker coordinate={midPoint}>
//             <View style={styles.bubble}>
//               <Text style={styles.bubbleText}>{`${routeInfo?.distance}\n${routeInfo?.duration}`}</Text>
//             </View>
//           </Marker>
//         )}

//         {/* Adiciona a rota se o destino estiver definido */}
//         {destination?.latitude && destination?.longitude && latitudeUser && longitudeUser && (
//           <MapViewDirections
//             origin={{ latitude: latitudeUser, longitude: longitudeUser }}
//             destination={destination}
//             apikey={GOOGLE_MAPS_API_KEY}
//             strokeWidth={4}
//             strokeColor='hotpink'
//             optimizeWaypoints={true}
//             mode='DRIVING'
//             onReady={(result) => {
//               const textDistance =
//                 result.distance > 1
//                   ? `${result.distance.toFixed(1)} km`
//                   : result.distance > 0.05
//                   ? `${(result.distance * 1000).toFixed(0)} metros`
//                   : 'Seu local';

//               const timeDuration =
//                 result.duration > 60
//                   ? `${Math.floor(result.duration / 60)}h${Math.round(result.duration % 60)}min`
//                   : `${Math.round(result.duration)} min`;

//               setRouteInfo({ distance: textDistance, duration: timeDuration });
//               console.log('onReady')

//               // Ajustando o zoom para a rota inteira
//               mapRef.current.fitToCoordinates([{ latitude: latitudeUser, longitude: longitudeUser }, destination], {
//                 edgePadding: { top: 50, right: 50, bottom: 250, left: 50 },
//                 animated: true,
//               });
//             }}
//             onError={(errorMessage) => {
//               console.error('Erro ao calcular a rota:', errorMessage);
//             }}
//           />
//         )}
//       </MapView>

//       {Platform.OS !== 'android' && <IconButton icon='crosshairs-gps' size={28} style={styles.recenterButton} onPress={recenterMap} />}
//     </View>
//   );
// };

// export default Map;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//     width: width,
//     height: height,
//   },
//   recenterButton: {
//     position: 'absolute',
//     bottom: 280,
//     right: 20,
//     color: '#ccc',
//     backgroundColor: '#fff',
//     zIndex: 5,
//   },
//   bubble: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     alignItems: 'center',
//   },
//   bubbleText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Platform, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import MapView, { MarkerAnimated, AnimatedRegion, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDataContext } from '../data/DataContext.js';
import { fetchPlaceName, GOOGLE_MAPS_API_KEY } from '../config/api.js';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

// Função para calcular o ponto médio entre dois pontos geográficos
const calculateMidPoint = (origin, destination) => {
  if (!origin || !destination) return;

  const lat1 = origin.latitude * (Math.PI / 180);
  const lon1 = origin.longitude * (Math.PI / 180);
  const lat2 = destination.latitude * (Math.PI / 180);
  const lon2 = destination.longitude * (Math.PI / 180);

  const dLon = lon2 - lon1;
  const Bx = Math.cos(lat2) * Math.cos(dLon);
  const By = Math.cos(lat2) * Math.sin(dLon);
  const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
  const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return {
    latitude: lat3 * (180 / Math.PI),
    longitude: lon3 * (180 / Math.PI),
  };
};

const Map = ({ location, setSelectMaps }) => {
  const mapRef = useRef(null);
  const {
    coordUser,
    setCoordUser,
    setCoordTemp,
    destination,
    setDestination,
    routeInfo,
    setRouteInfo,
  } = useDataContext();

  const [placeName, setPlaceName] = useState('Local selecionado');
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  );

  const [midPoint, setMidPoint] = useState(null);

  // Obtenção da localização inicial do usuário
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Não foi possível acessar sua localização. Verifique as permissões do aplicativo.');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = userLocation.coords;

      setCoordUser({ latitude, longitude });
    })();
  }, []);

  // Atualizar o ponto médio quando o destino mudar
  useEffect(() => {
    if (coordUser.latitude && coordUser.longitude && destination?.latitude && destination?.longitude) {
      const newMidPoint = calculateMidPoint({ latitude: coordUser.latitude, longitude: coordUser.longitude }, destination);
      setMidPoint(newMidPoint);
    }
  }, [destination]);

  // Atualizar o marcador e aplicar o efeito de balanço ao mudar a localização
  useEffect(() => {
    if (location) {
      coordinate
        .timing({
          latitude: location.latitude,
          longitude: location.longitude,
          duration: 100,
          useNativeDriver: false,
        })
        .start(() => {
          const bounce = [
            { latitude: location.latitude + 0.000002, longitude: location.longitude },
            { latitude: location.latitude - 0.000002, longitude: location.longitude },
            { latitude: location.latitude + 0.00001, longitude: location.longitude },
            { latitude: location.latitude, longitude: location.longitude },
          ];

          let index = 0;
          const interval = setInterval(() => {
            coordinate
              .timing({
                latitude: bounce[index]?.latitude,
                longitude: bounce[index]?.longitude,
                duration: 100,
                useNativeDriver: false,
              })
              .start();
            index++;
            if (index >= bounce.length) clearInterval(interval);
          }, 150);
        });
      setDestination({ latitude: location.latitude, longitude: location.longitude });
      updatePlaceName();
    }
  }, [location]);

  const updatePlaceName = async () => {
    if (location) {
      const name = await fetchPlaceName({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setPlaceName(name);
    }
  };

  const recenterMap = async () => {
    const userLocation = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = userLocation.coords;

    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleLocation = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordTemp({ latitude, longitude });
    setSelectMaps(true);
    setDestination({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        mapType='standard'
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: location.latitude || coordUser.latitude || 0,
          longitude: location.longitude || coordUser.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        initialRegion={{
          latitude: coordUser.latitude || 0,
          longitude: coordUser.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsPointsOfInterest={true}
        showsBuildings={true}
        showsMyLocationButton={true}
        onLongPress={handleLocation}
        onPress={handleLocation}
        showsTraffic={true}
        compassOffset={[-20, 340]}
      >
        {/* Marcador animado */}
        {location && <MarkerAnimated coordinate={coordinate} title={placeName} draggable onDragEnd={handleLocation} />}

        {/* Ponto médio com balão visível */}
        {midPoint && routeInfo.distance && routeInfo.duration && (
          <Marker coordinate={midPoint}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{`${routeInfo?.distance}\n${routeInfo?.duration}`}</Text>
            </View>
          </Marker>
        )}

        {/* Adiciona a rota se o destino estiver definido */}
        {destination?.latitude && destination?.longitude && coordUser.latitude && coordUser.longitude && (
          <MapViewDirections
            origin={{ latitude: coordUser.latitude, longitude: coordUser.longitude }}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor='hotpink'
            optimizeWaypoints={true}
            mode='DRIVING'
            onReady={(result) => {
              const textDistance =
                result.distance > 1
                  ? `${result.distance.toFixed(1)} km`
                  : result.distance > 0.05
                  ? `${(result.distance * 1000).toFixed(0)} metros`
                  : 'Seu local';

              const timeDuration =
                result.duration > 60
                  ? `${Math.floor(result.duration / 60)}h${Math.round(result.duration % 60)}min`
                  : `${Math.round(result.duration)} min`;
              
              setRouteInfo({ distance: textDistance, duration: timeDuration });

              // Ajustando o zoom para a rota inteira
              mapRef.current.fitToCoordinates([{ latitude: coordUser.latitude, longitude: coordUser.longitude }, destination], {
                edgePadding: { top: 50, right: 50, bottom: 250, left: 50 },
                animated: true,
              });
            }}
            onError={(errorMessage) => {
              console.error('Erro ao calcular a rota:', errorMessage);
            }}
          />
        )}
      </MapView>

      {Platform.OS !== 'android' && <IconButton icon='crosshairs-gps' size={28} style={styles.recenterButton} onPress={recenterMap} />}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 280,
    right: 20,
    color: '#ccc',
    backgroundColor: '#fff',
    zIndex: 5,
  },
  bubble: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
