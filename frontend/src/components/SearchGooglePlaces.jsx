import React, { useState, useRef, useContext } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import IconWithLabel from './IconWithLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleJS from './style';
import { fetchPlaces, fetchPlaceDetails } from '../api/api';
import { useDataContext } from '../data/DataContext';

const SearchGooglePlaces = ({ setSelectMaps, handleSearchFocus, handleSearchBlur, searchText, setSearchText }) => {
  const { setCoordTemp, setDestination } = useDataContext();
  const [results, setResults] = useState([]);
  const textInputRef = useRef(null);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce(async (text) => {
    setSearchText(text);
  
    if (text.length > 2) {
      const data = await fetchPlaces(text);
      setResults(data);
    } else {
      setResults([]);
    }
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <View style={styles.containerSearch}>
          <Ionicons name={'search'} size={18} color={'#B7B7B7'} />
          <View style={styles.containerText}>
            <TextInput
              ref={textInputRef}
              style={[styles.searchBar, { outline: 'none' }]}
              placeholder='Pesquisar...'
              value={searchText}
              onFocus={handleSearchFocus}
              onChangeText={(text) => {
                handleSearch(text);
              }}
              numberOfLines={1}
              ellipsizeMode='tail'
            />
            {searchText !== '' && (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  setResults([]);
                }}
              >
                <Ionicons name={'close-circle'} size={20} color={'grey'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSearchText('');
            setResults([]);
            textInputRef.current?.blur();
            handleSearchBlur();
          }}
        >
          <Text style={{ color: '#007EFF', fontSize: 16 }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(item, index) => `${item.properties.place_id}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={async () => {
                // const { latitude, longitude } = await fetchPlaceDetails(item.properties.place_id);
                const latitude = item.properties.lat
                const longitude = item.properties.lon
                
                if (latitude && longitude) {
                  setCoordTemp({latitude, longitude})
                  setSelectMaps(true);
                  setDestination({ latitude, longitude });
                }
                
                setSearchText('');
                setResults([]);
                Keyboard.dismiss()
              }}
            >
              <View style={styles.ico}>
                <IconWithLabel iconName={'map-marker'} size={25} color={styleJS.primaryColor} width={25} height={25} margin={0} />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={styles.itemText}>{item.properties.address_line1}</Text>
                <Text style={styles.itemSubText}>{item.properties.address_line2}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  containerInput: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',

  },
  containerSearch: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    borderRadius: 8,
    height: 40,
    width: '80%',
    backgroundColor: '#F0F2F5',
  },
  searchBar: {
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 0,
    fontFamily: 'Poppins',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  containerText: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  flatList: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  itemContainer: {
    paddingVertical: 12,
    gap: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
    color: 'grey',
  },
  ico: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchGooglePlaces;
