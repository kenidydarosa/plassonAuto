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
//   const {
//     setLocale,
//     latitude,
//     setLatitude,
//     longitude,
//     setLongitude,
//     latitudeUser,
//     longitudeUser,
//     latitudeTemp,
//     setLatitudeTemp,
//     longitudeTemp,
//     setLongitudeTemp,
//     routeInfo,
//     setRouteInfo,
//   } = useDataContext();

//   const [location, setLocation] = useState(null);
//   const [selectMaps, setSelectMaps] = useState(false);

//   const [selectedAddress, setSelectedAddress] = useState('');
//   const [street, setStreet] = useState('');
//   const [neighborhood, setNeighborhood] = useState('');

//   const [searchText, setSearchText] = useState('');
//   const [textDistance, setTextDistance] = useState('');

//   const bottomSheetRef = useRef(null);
//   const secondBottomSheetRef = useRef(null);

//   useEffect(() => {
//     if ((latitudeTemp !== null && longitudeTemp !== null) || (latitudeUser !== null && longitudeUser !== null)) {
//       selectedLocal();
//     }
//   }, [latitudeTemp, longitudeTemp, latitudeUser, longitudeUser]);

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
//       clearItems()
//     };
//   }, []);

//   const clearItems = ()=>{
//     bottomSheetRef.current?.snapToIndex(0);
//     setLatitudeTemp(null)
//     setLongitudeTemp(null)
//     setLocation(null)
//     setSelectMaps(false)
//     setNeighborhood('')
//     setSelectedAddress('')
//     setTextDistance('')
//     setSearchText('')
//     setRouteInfo({ distance: '', duration: '' })
//   }

//   const selectedLocal = async () => {
//     const latidudeX = selectMaps ? latitudeTemp : latitude;
//     const longitudeX = selectMaps ? longitudeTemp : longitude;

//     let myLocation = !(latitude && longitude);

//     setLocation({
//       latitude: latidudeX,
//       longitude: longitudeX,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     });

//     //Verificar aqui o porque não está aparecendo o detalhe na tela
//     const address = await getAddressFromCoordinates(latidudeX, longitudeX);
//     const distance = routeInfo.distance && routeInfo.duration ?
//      `${routeInfo.distance} de distância - Tempo estimado: ${routeInfo.duration}` : '';

//     setTextDistance(distance);
//     setSelectedAddress(address);

//     const [streetString, neighborhoodString] = address.split(/,(.+)/);
//     setStreet(streetString.trim());
//     setNeighborhood(neighborhoodString.trim());

//     if (!myLocation) {
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

//   const confirmData = () => {
//     if (setLocale) {
//       setLocale(selectedAddress);
//       setLatitude(latitudeTemp);
//       setLongitude(longitudeTemp);
//     }

//     bottomSheetRef.current?.snapToIndex(0);
//     navigation.goBack();
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.mapContainer}>{location && <Map location={location} setSelectMaps={setSelectMaps} style={styles.map} />}</View>

//       <BottomSheet ref={bottomSheetRef} snapPoints={['35%', '98%']} index={-1}>
//         <BottomSheetView style={styles.contentContainer}>
//           <SearchGooglePlaces
//             handleSearchFocus={handleSearchFocus}
//             handleSearchBlur={handleSearchBlur}
//             searchText={searchText}
//             setSearchText={setSearchText}
//             setSelectMaps={setSelectMaps}
//           />
//         </BottomSheetView>
//       </BottomSheet>
//       {/* )} */}

//       <BottomSheet ref={secondBottomSheetRef} snapPoints={['35%']} index={1}>
//         <BottomSheetView style={styles.contentContainer}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={styles.street}>{street || 'Nenhum endereço selecionado'}</Text>
//             <TouchableOpacity
//               onPress={async () => {
//                 bottomSheetRef.current?.snapToIndex(1);
//                 await secondBottomSheetRef.current?.close();

//                 setLatitudeTemp(null);
//                 setLongitudeTemp(null);

//                 setSearchText('');
//                 setShowSecondModal(false);
//               }}
//             >
//               <Ionicons name='close-circle' size={20} color='grey' />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.neighborhood}>{neighborhood || ''}</Text>
//           <Text style={styles.distanceSelected}>{textDistance}</Text>
//           {latitudeTemp && longitudeTemp && (
//             <Button icon='check-circle' mode='contained' onPress={confirmData} style={styles.button}>
//               Confirmar
//             </Button>
//           )}
//         </BottomSheetView>
//       </BottomSheet>
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
import { getAddressFromCoordinates } from '../api/api';
import SearchGooglePlaces from './SearchGooglePlaces';
import Map from './MapView';
import { useDataContext } from '../data/DataContext.js';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalSheetButton = () => {
  const navigation = useNavigation();
  const { setLocale, latitude, setLatitude, longitude, setLongitude, coordUser, coordTemp, setCoordTemp, routeInfo, setRouteInfo } = useDataContext();

  const [location, setLocation] = useState(null);
  const [selectMaps, setSelectMaps] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const [searchText, setSearchText] = useState('');
  const [textDistance, setTextDistance] = useState('');
  const [showSecondModal, setShowSecondModal] = useState(true)

  const bottomSheetRef = useRef(null);
  const secondBottomSheetRef = useRef(null);

  useEffect(() => {
    if ((coordTemp.latitude !== null && coordTemp.longitude !== null) || (coordUser.latitude !== null && coordUser.longitude !== null)) {
      selectedLocal();
    }
  }, [coordTemp, coordUser]);

  useEffect(() => {
    const distance = routeInfo.distance && routeInfo.duration ? `${routeInfo.distance} de distância - Tempo estimado: ${routeInfo.duration}` : '';

    setTextDistance(distance);
  }, [routeInfo]);

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
      clearItems();
    };
  }, []);

  const clearItems = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setCoordTemp({ latitude: null, longitude: null });
    setLocation(null);
    setSelectMaps(false);
    setNeighborhood('');
    setSelectedAddress('');
    setTextDistance('');
    setSearchText('');
    setRouteInfo({ distance: '', duration: '' });
  };

  const selectedLocal = async () => {
    const latidudeX = selectMaps ? coordTemp.latitude : latitude;
    const longitudeX = selectMaps ? coordTemp.longitude : longitude;

    let myLocation = !(latitude && longitude);

    setLocation({
      latitude: latidudeX,
      longitude: longitudeX,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    //Verificar aqui o porque não está aparecendo o detalhe na tela
    const { local, localDetails } = await getAddressFromCoordinates(latidudeX, longitudeX);
    const address = local + ', ' + localDetails;

    setSelectedAddress(address);
    setStreet(local);
    setNeighborhood(localDetails);

    if (!myLocation && showSecondModal) {
      setTimeout(() => {
        secondBottomSheetRef.current?.snapToIndex(0);
      }, 500);
      bottomSheetRef.current?.close();
    }
  };

  const handleSearchFocus = () => {
    bottomSheetRef.current?.snapToIndex(1); // Aumenta para 98% da tela
  };

  const handleSearchBlur = () => {
    bottomSheetRef.current?.snapToIndex(0); // Retorna para 35%
  };

  const confirmData = () => {
    if (setLocale) {
      setLocale(selectedAddress);
      setLatitude(coordTemp.latitude);
      setLongitude(coordTemp.longitude);
    }

    bottomSheetRef.current?.snapToIndex(0);
    navigation.goBack();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapContainer}>
        {location && <Map location={location} setSelectMaps={setSelectMaps} street={street} style={styles.map} />}
      </View>

      <BottomSheet ref={bottomSheetRef} snapPoints={['32%', '98%']} index={-1}>
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

      <BottomSheet ref={secondBottomSheetRef} snapPoints={['32%']} index={-1}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.containerItems}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{width:'100%'}}>
                <Text style={styles.street}>{street || 'Nenhum endereço selecionado.'}</Text>
                {!street && <Text style={styles.distanceSelected}>{'Selecione um local no mapa. 📌'}</Text>}
              </View>
              <TouchableOpacity
                style={{ position: 'absolute', right: 0 }}
                onPress={async () => {
                  setShowSecondModal(false);
                  setCoordTemp({ latitude: null, longitude: null });
                  setSearchText('');
                  bottomSheetRef.current?.snapToIndex(0);
                  secondBottomSheetRef.current?.close();
                }}
              >
                <Ionicons name='close-circle' size={20} color='grey' />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 3 }}>
              <Text style={styles.neighborhood}>{neighborhood || ''}</Text>
              <Text style={styles.distanceSelected}>{textDistance || ''}</Text>
            </View>
            <Button icon='check-circle'
              mode='contained'
              onPress={confirmData}
              disabled={!coordTemp.latitude || !coordTemp.longitude}
              style={styles.button}>
              Confirmar
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
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
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 7,
    maxWidth: '95%',
    paddingRight: 10,
    flexWrap: 'wrap',
  },
  neighborhood: {
    fontSize: 16,
    fontWeight: '500',
  },
  distanceSelected: {
    fontSize: 15,
    color: 'grey',
  },
  containerItems: {
    height: '98%',
    paddingBottom: 15,
  },
});

export default ModalSheetButton;
