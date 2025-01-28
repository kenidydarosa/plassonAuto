import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '../../config/api';

const { width, height } = Dimensions.get('window');

const Map = () => {
  const [location, setLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const mapRef = useRef(null);

  // Obtenção da localização inicial do usuário
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Não foi possível acessar sua localização. Verifique as permissões do aplicativo.');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Função para recentralizar o mapa na localização atual
  const recenterMap = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // Função para selecionar local ao tocar e segurar
  const handleLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    setSelectedAddress('Nova localização selecionada');
    setIsDetailsVisible(true);
  };

  // Função para confirmar o endereço
  const confirmAddress = () => {
    Alert.alert('Endereço Confirmado', selectedAddress);
    setIsDetailsVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        mapType={Platform.OS === 'android' ? 'none' : 'standard'}
        ref={mapRef}
        provider='PROVIDER_GOOGLE'
        style={styles.map}
        region={location}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onLongPress={handleLongPress}
      >
        {location && (
          <Marker
            coordinate={location}
            title="Local selecionado"
          />
        )}
      </MapView>

      {/* Modal de Busca */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Buscar localização"
          onPress={(data, details) => {
            const { lat, lng } = details.geometry.location;
            setLocation({
              latitude: lat,
              longitude: lng,
            });
            setSelectedAddress(details.formatted_address);
            setIsDetailsVisible(true);
          }}
          fetchDetails
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'pt',
          }}
          styles={{
            textInput: styles.searchInput,
          }}
        />
      </View>

      {/* Botão de recentralização */}
      <IconButton
        icon="crosshairs-gps"
        size={30}
        style={styles.recenterButton}
        onPress={recenterMap}
      />

      {/* Modal de detalhes da localização selecionada */}
      <Modal
        visible={isDetailsVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsDetailsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedAddress}</Text>
            <Button mode="contained" onPress={confirmAddress} style={styles.confirmButton}>
              Confirmar Endereço
            </Button>
            <TouchableOpacity onPress={() => setIsDetailsVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
  },
  searchInput: {
    height: 44,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    zIndex: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  confirmButton: {
    marginBottom: 10,
  },
  cancelText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Map;
