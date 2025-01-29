// import React, { useRef, useState, useEffect } from 'react';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { Button } from 'react-native-paper';
// import { getAddressFromCoordinates } from '../config/api';
// import SearchGooglePlaces from './SearchGooglePlaces';
// import Map from './MapView';
// import { useDataContext } from '../data/DataContext.js';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// const ModalSheetButton = () => {
//   const navigation = useNavigation();
//   const { setLocale, latitude, setLatitude, longitude, setLongitude } = useDataContext();
//   const [location, setLocation] = useState(null);

//   const [distance, setDistance] = useState('');
//   const [selectedAddress, setSelectedAddress] = useState('');
//   const [street, setStreet] = useState('');
//   const [neighborhood, setNeighborhood] = useState('');
//   const [searchText, setSearchText] = useState('');
//   const [showSecondModal, setShowSecondModal] = useState(false);

//   const bottomSheetRef = useRef(null);
//   const secondBottomSheetRef = useRef(null);

//   useEffect(() => {
//     // Ação na montagem da página
//     setLocation({
//       latitude,
//       longitude,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     });

//     // Ação na desmontagem da página
//     return () => {
//       bottomSheetRef.current?.snapToIndex(0);
//     };
//   }, []);

//   const selectedLocal = async (coordinates, selectMaps = false, myLocation = false) => {
//     const { latitudeMaps, longitudeMaps } = coordinates;

//     const latidudeX = selectMaps ? latitudeMaps : latitude;
//     const longitudeX = selectMaps ? longitudeMaps : longitude;

//     setLocation({
//       latitude: latidudeX,
//       longitude: longitudeX,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     });

//     const address = await getAddressFromCoordinates(latidudeX, longitudeX);
//     setSelectedAddress(address);

//     const [streetString, neighborhoodString] = address.split(/,(.+)/);
//     setStreet(streetString.trim());
//     setNeighborhood(neighborhoodString.trim());

//     setLatitude(latidudeX);
//     setLongitude(longitudeX);

//     if (latidudeX && longitudeX) {
//       const distance = calculateDistance(latitudeMaps, longitudeMaps, latitude, longitude);

//       setDistance(
//         distance > 1
//           ? `${distance.toFixed(1)} km de distância`
//           : distance > 0.05
//           ? `${(distance * 1000).toFixed(0)} metros de distância`
//           : 'Seu local'
//       );
//     }

//     if (bottomSheetRef.current && !myLocation) {
//       setShowSecondModal(true);
//       secondBottomSheetRef.current?.snapToIndex(0);
//       await bottomSheetRef.current?.close();
//     }
//   };

//   const handleSearchFocus = () => {
//     bottomSheetRef.current?.snapToIndex(2); // Aumenta para 98% da tela
//   };

//   const handleSearchBlur = () => {
//     bottomSheetRef.current?.snapToIndex(1); // Retorna para 35%
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (x) => (x * Math.PI) / 180;

//     const R = 6371; // Raio da Terra em quilômetros
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);

//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distância em quilômetros
//   };

//   const confirmData = () => {
//     if (setLocale) {
//       setLocale(selectedAddress);
//       setLatitude(latitude);
//       setLongitude(longitude);
//     }

//     bottomSheetRef.current?.snapToIndex(1);
//     setShowSecondModal(false);
//     navigation.goBack();
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.mapContainer}>
//         {location && <Map location={location} selectedLocal={selectedLocal} style={styles.map} />}
//       </View>

//       {!showSecondModal && (
//         <BottomSheet ref={bottomSheetRef} snapPoints={['35%', '98%']} index={1}>
//           <BottomSheetView style={styles.contentContainer}>
//             <SearchGooglePlaces
//               selectedLocal={selectedLocal}
//               handleSearchFocus={handleSearchFocus}
//               handleSearchBlur={handleSearchBlur}
//               searchText={searchText}
//               setSearchText={setSearchText}
//             />
//           </BottomSheetView>
//         </BottomSheet>
//       )}

//       {showSecondModal && (
//         <BottomSheet ref={secondBottomSheetRef} snapPoints={['35%']} index={1}>
//           <BottomSheetView style={styles.contentContainer}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <Text style={styles.street}>{street || 'Nenhum endereço selecionado'}</Text>
//               <TouchableOpacity
//                 onPress={async () => {
//                   await secondBottomSheetRef.current?.close();
//                   bottomSheetRef.current?.snapToIndex(1);
//                   setSearchText('');
//                   setShowSecondModal(false);
//                 }}
//               >
//                 <Ionicons name='close-circle' size={20} color='grey' />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.neighborhood}>{neighborhood || ''}</Text>
//             <Text style={styles.distanceSelected}>{distance}</Text>
//             <Button icon='check-circle' mode='contained' onPress={confirmData} style={styles.button}>
//               Confirmar
//             </Button>
//           </BottomSheetView>
//         </BottomSheet>
//       )}
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'grey',
//     position: 'relative',
//   },
//   mapContainer: {
//     flex: 1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 0,
//   },
//   map: {
//     flex: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     alignItems: 'left',
//     gap: 5,
//   },
//   button: {
//     marginTop: 15,
//   },
//   street: {
//     fontSize: 26,
//     fontWeight: 'bold',
//   },
//   neighborhood: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   distanceSelected: {
//     fontSize: 15,
//     color: 'grey',
//   },
// });

// export default ModalSheetButton;

import React, { useRef, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { getAddressFromCoordinates } from '../config/api';
import SearchGooglePlaces from './SearchGooglePlaces';
import Map from './MapView';
import { useDataContext } from '../data/DataContext.js';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalSheetButton = () => {
  const navigation = useNavigation();
  const {
    setLocale,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    latitudeUser,
    longitudeUser,
    latitudeTemp,
    setLatitudeTemp,
    longitudeTemp,
    setLongitudeTemp,
    routeInfo,
    setDestination
  } = useDataContext();

  const [location, setLocation] = useState(null);
  const [selectMaps, setSelectMaps] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  // const [distance, setDistance] = useState('');

  const [searchText, setSearchText] = useState('');
  const [showSecondModal, setShowSecondModal] = useState(false);

  const bottomSheetRef = useRef(null);
  const secondBottomSheetRef = useRef(null);

  useEffect(() => {
    if ((latitudeTemp !== null && longitudeTemp !== null) || (latitudeUser !== null && longitudeUser !== null)) {
      selectedLocal();
    }
  }, [latitudeTemp, longitudeTemp, latitudeUser, longitudeUser]);

  useEffect(() => {
    // Ação na montagem da página
    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    // Ação na desmontagem da página
    return () => {
      bottomSheetRef.current?.snapToIndex(0);
    };
  }, []);

  const selectedLocal = async () => {
    const latidudeX = selectMaps ? latitudeTemp : latitude;
    const longitudeX = selectMaps ? longitudeTemp : longitude;

    let myLocation = true;
    if (latitude && longitude) {
      myLocation = false;
    }

    setLocation({
      latitude: latidudeX,
      longitude: longitudeX,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    
    const address = await getAddressFromCoordinates(latidudeX, longitudeX);
    setSelectedAddress(address);

    const [streetString, neighborhoodString] = address.split(/,(.+)/);
    setStreet(streetString.trim());
    setNeighborhood(neighborhoodString.trim());

    if (bottomSheetRef.current && !myLocation) {
      setShowSecondModal(true);
      secondBottomSheetRef.current?.snapToIndex(0);
      await bottomSheetRef.current?.close();
    }
  };

  const handleSearchFocus = () => {
    bottomSheetRef.current?.snapToIndex(2); // Aumenta para 98% da tela
  };

  const handleSearchBlur = () => {
    bottomSheetRef.current?.snapToIndex(1); // Retorna para 35%
  };

  const confirmData = () => {
    if (setLocale) {
      setLocale(selectedAddress);
      setLatitude(latitudeTemp);
      setLongitude(longitudeTemp);
    }

    bottomSheetRef.current?.snapToIndex(0);
    setShowSecondModal(false);
    navigation.goBack();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapContainer}>{location && <Map location={location} setSelectMaps={setSelectMaps} style={styles.map} />}</View>

      {!showSecondModal && (
        <BottomSheet ref={bottomSheetRef} snapPoints={['35%', '98%']} index={1}>
          <BottomSheetView style={styles.contentContainer}>
            <SearchGooglePlaces
              handleSearchFocus={handleSearchFocus}
              handleSearchBlur={handleSearchBlur}
              searchText={searchText}
              setSearchText={setSearchText}
              setSelectMaps={setSelectMaps}
            />
          </BottomSheetView>
        </BottomSheet>
      )}

      {showSecondModal && (
        <BottomSheet ref={secondBottomSheetRef} snapPoints={['35%']} index={1}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.street}>{street || 'Nenhum endereço selecionado'}</Text>
              <TouchableOpacity
                onPress={async () => {
                  bottomSheetRef.current?.snapToIndex(1);
                  await secondBottomSheetRef.current?.close();

                  setLatitudeTemp(null);
                  setLongitudeTemp(null);

                  setSearchText('');
                  setShowSecondModal(false);
                }}
              >
                <Ionicons name='close-circle' size={20} color='grey' />
              </TouchableOpacity>
            </View>
            <Text style={styles.neighborhood}>{neighborhood || ''}</Text>
            <Text style={styles.distanceSelected}>{routeInfo.distance} de distância - Tempo estimado: {routeInfo.duration}</Text>
            {latitudeTemp && longitudeTemp && (
              <Button icon='check-circle' mode='contained' onPress={confirmData} style={styles.button}>
                Confirmar
              </Button>
            )}
          </BottomSheetView>
        </BottomSheet>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'left',
    gap: 5,
  },
  button: {
    marginTop: 15,
  },
  street: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  neighborhood: {
    fontSize: 16,
    fontWeight: '500',
  },
  distanceSelected: {
    fontSize: 15,
    color: 'grey',
  },
});

export default ModalSheetButton;
