// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import { View, StyleSheet, Dimensions, Alert, Platform, Text } from 'react-native';
// import { IconButton } from 'react-native-paper';
// import MapView, { MarkerAnimated, AnimatedRegion, Marker, Callout } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { useDataContext } from '../data/DataContext.js';
// import { fetchPlaceName, GOOGLE_MAPS_API_KEY } from '../config/api.js';
// import MapViewDirections from 'react-native-maps-directions'; // Importa o componente para rotas

// const { width, height } = Dimensions.get('window');

// // Função para calcular o ponto médio entre dois pontos geográficos
// const calculateMidPoint = (origin, destination) => {
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
//   // useEffect(() => {
//   //   setMidPoint(memoizedMidPoint);
//   // }, [memoizedMidPoint]);

//   useEffect(() => {
//     if (latitudeUser && longitudeUser && destination?.latitude && destination?.longitude) {
//       const newMidPoint = calculateMidPoint(
//         { latitude: latitudeUser, longitude: longitudeUser },
//         destination
//       );
//       setMidPoint(newMidPoint);
//     }
//   }, [latitudeUser, longitudeUser, destination]);
  
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
//                 latitude: bounce[index].latitude,
//                 longitude: bounce[index].longitude,
//                 duration: 100,
//                 useNativeDriver: false,
//               })
//               .start();
//             index++;
//             if (index >= bounce.length) clearInterval(interval);
//           }, 150);
//         });
//       setDestination({ latitude:location.latitude, longitude:location.longitude})
//       updatePlaceName();
//     }
//   }, [location]);

//   const updatePlaceName = async () => {
//     if (location) {
//       const { name } = await fetchPlaceName({
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
//     console.log(latitude)

//     setDestination({ latitude, longitude });
//     // memoizedMidPoint()
//   };

//   // const memoizedMidPoint = useMemo(() => {
//   //   if (latitudeUser && longitudeUser && destination?.latitude && destination?.longitude) {
//   //     return calculateMidPoint({ latitude: latitudeUser, longitude: longitudeUser }, destination);
//   //   }
//   //   return null;
//   // }, [latitudeUser, longitudeUser, destination]);

//   return (
//     <View style={styles.container}>
//       <MapView
//         mapType='standard'
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={{
//           latitude: location?.latitude || 0,
//           longitude: location?.longitude || 0,
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
//         {destination && (
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
  const { setLatitudeUser, setLongitudeUser, destination, setDestination, latitudeUser, longitudeUser, setLatitudeTemp, setLongitudeTemp, routeInfo, setRouteInfo } = useDataContext();

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

      setLatitudeUser(latitude);
      setLongitudeUser(longitude);
    })();
  }, []);

  // Atualizar o ponto médio quando o destino mudar
  useEffect(() => {
    if (latitudeUser && longitudeUser && destination?.latitude && destination?.longitude) {
      const newMidPoint = calculateMidPoint(
        { latitude: latitudeUser, longitude: longitudeUser },
        destination
      );
      setMidPoint(newMidPoint);
    }
  }, [latitudeUser, longitudeUser, destination]);

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
                latitude: bounce[index].latitude,
                longitude: bounce[index].longitude,
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
      const { name } = await fetchPlaceName({
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

    setLatitudeTemp(latitude);
    setLongitudeTemp(longitude);
    setSelectMaps(true);
    console.log(latitude)

    setDestination({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        mapType='standard'
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
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
        {midPoint && (
          <Marker coordinate={midPoint}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{`${routeInfo?.distance}\n${routeInfo?.duration}`}</Text>
            </View>
          </Marker>
        )}

        {/* Adiciona a rota se o destino estiver definido */}
        {destination && (
          <MapViewDirections
            origin={{ latitude: latitudeUser, longitude: longitudeUser }}
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
              mapRef.current.fitToCoordinates(
                [ { latitude: latitudeUser, longitude: longitudeUser }, destination ],
                { edgePadding: { top: 50, right: 50, bottom: 250, left: 50 }, animated: true }
              );
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

