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
//     coordUser,
//     setCoordUser,
//     setCoordTemp,
//     destination,
//     setDestination,
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

//       setCoordUser({ latitude, longitude });
//     })();
//   }, []);

//   // Atualizar o ponto médio quando o destino mudar
//   useEffect(() => {
//     if (coordUser.latitude && coordUser.longitude && destination?.latitude && destination?.longitude) {
//       const newMidPoint = calculateMidPoint({ latitude: coordUser.latitude, longitude: coordUser.longitude }, destination);
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
//     setCoordTemp({ latitude, longitude });
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
//           latitude: location.latitude || coordUser.latitude || 0,
//           longitude: location.longitude || coordUser.longitude || 0,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//         initialRegion={{
//           latitude: coordUser.latitude || 0,
//           longitude: coordUser.longitude || 0,
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
//         {midPoint && routeInfo.distance && routeInfo.duration && (
//           <Marker coordinate={midPoint}>
//             <View style={styles.bubble}>
//               <Text style={styles.bubbleText}>{`${routeInfo?.distance}\n${routeInfo?.duration}`}</Text>
//             </View>
//           </Marker>
//         )}

//         {/* Adiciona a rota se o destino estiver definido */}
//         {destination?.latitude && destination?.longitude && coordUser.latitude && coordUser.longitude && (
//           <MapViewDirections
//             origin={{ latitude: coordUser.latitude, longitude: coordUser.longitude }}
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

//               // Ajustando o zoom para a rota inteira
//               mapRef.current.fitToCoordinates([{ latitude: coordUser.latitude, longitude: coordUser.longitude }, destination], {
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
import MapView, { MarkerAnimated, AnimatedRegion, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDataContext } from '../data/DataContext.js';

const { width, height } = Dimensions.get('window');

const fetchRoute = async (origin, destination, setRoute, setRouteInfo) => {
  const ORS_API_KEY = '5b3ce3597851110001cf62489af43938d24a4afd8f6d2d4873751453';

  try {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features) {
      const routeData = data.features[0];
      const coordinates = routeData.geometry.coordinates.map(([lng, lat]) => ({
        latitude: lat,
        longitude: lng,
      }));

      setRoute(coordinates);

      let distance = routeData.properties.segments[0].distance / 1000
      let duration = routeData.properties.segments[0].duration / 60

      const textDistance =
        distance > 1
          ? `${distance.toFixed(1)} km`
          : distance > 0.05
            ? `${(distance * 1000).toFixed(0)} metros`
            : 'Seu local';

      const timeDuration =
        duration > 60 ? `${Math.floor(duration / 60)}h${Math.round(duration % 60)}min` : `${Math.round(duration) || 1} min`;

      setRouteInfo({ distance: textDistance, duration: timeDuration });

    }
  } catch (error) {
    console.error('Erro ao buscar rota:', error);
  }
};

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

const Map = ({ location, setSelectMaps, street }) => {
  const mapRef = useRef(null);
  const [midPoint, setMidPoint] = useState(null);

  const { coordUser, setCoordUser, setCoordTemp, destination, setDestination, routeInfo, setRouteInfo } = useDataContext();

  const [route, setRoute] = useState([]);
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  );

  //   // Atualizar o ponto médio quando o destino mudar
  useEffect(() => {
    if (coordUser.latitude && coordUser.longitude && destination?.latitude && destination?.longitude) {
      const newMidPoint = calculateMidPoint({ latitude: coordUser.latitude, longitude: coordUser.longitude }, destination);
      setMidPoint(newMidPoint);
    }
  }, [destination]);

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

  useEffect(() => {
    if (coordUser.latitude && coordUser.longitude && destination?.latitude && destination?.longitude) {
      fetchRoute(coordUser, destination, setRoute, setRouteInfo);
    }
  }, [destination]);

  useEffect(() => {
    if (location) {
      coordinate
        .timing({
          latitude: location.latitude,
          longitude: location.longitude,
          duration: 100,
          useNativeDriver: false,
        })
        .start();
      setDestination({ latitude: location.latitude, longitude: location.longitude });
    }
  }, [location]);

  // Ajusta o mapa para mostrar toda a rota
  useEffect(() => {
    if (route.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(route, {
        edgePadding: { top: 50, right: 50, bottom: 250, left: 50 },
        animated: true,
      });
    }
  }, [route]);

  const handleLocation = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordTemp({ latitude, longitude });
    setSelectMaps(true);
    setDestination({ latitude, longitude });
    fetchRoute(coordUser, { latitude, longitude }, setRoute, setRouteInfo);
  };

  return (
    <View style={styles.container}>
      <MapView
        mapType='hybrid'
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
        {location && <MarkerAnimated coordinate={coordinate} title={street} draggable onDragEnd={handleLocation} />}
        {/* Ponto médio com balão visível */}
        {midPoint && routeInfo.distance && routeInfo.duration && (
          <Marker coordinate={midPoint}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{`${routeInfo?.distance}\n${routeInfo?.duration}`}</Text>
            </View>
          </Marker>
        )}
        {route.length > 1 && <Polyline coordinates={route} strokeWidth={4} strokeColor='hotpink' />}
      </MapView>

      {Platform.OS !== 'android' && (
        <IconButton
          icon='crosshairs-gps'
          size={28}
          style={styles.recenterButton}
          onPress={() =>
            mapRef.current?.animateToRegion({
              latitude: coordUser.latitude,
              longitude: coordUser.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            })
          }
        />
      )}
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
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
