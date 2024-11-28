/** @format */

import React, { useState } from 'react';
import { StyleSheet, FlatList, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Filters from './Filters';
import { TouchableOpacity } from 'react-native';
import NothingText from './NothingText.jsx';

/**
 * Componente SearchableCardList
 * Este componente exibe uma lista de itens que pode ser filtrada conforme o usuário digita no campo de pesquisa.
 *
 * @param {Array} data - Array de objetos que contém os dados a serem exibidos.
 * @param {Function} renderCard - Função que renderiza cada card (ou item) da lista.
 * @param {Array} searchKeys - Array de strings representando as chaves do objeto que serão utilizadas na busca.
 */
const SearchableCardList = ({
  data,
  renderCard,
  searchKeys,
  filters = [],
  initialFilter = '',
}) => {
  // Define o estado 'searchText' para armazenar o termo de busca digitado pelo usuário.
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  // Filtra os itens com base no filtro selecionado
  const filteredItems =
    selectedFilter === initialFilter
      ? data
      : data.filter((item) => item.status.toLowerCase() === selectedFilter.toLowerCase());

  // Filtra os itens da lista com base no texto digitado e nas chaves definidas em 'searchKeys'.
  const filteredSearch = filteredItems.filter((item) => {
    return searchKeys.some((key) => {
      const value = item[key];
      // Verifica se o valor não é undefined ou null antes de usar toString
      if (value !== undefined && value !== null) {
        return value.toString().toLowerCase().includes(searchText.toLowerCase());
      }
      return false; // Retorna falso caso o valor seja undefined ou null
    });
  });

  let display = 'none';
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Ionicons name={'search'} size={18} color={'#B7B7B7'} />
        <View style={styles.containerText}>
          <TextInput
            style={[styles.searchBar, { outline: 'none' }]}
            placeholder='Pesquisar...'
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              display = searchText !== '' ? 'flex' : 'none';
            }}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name={'close-circle'} size={20} color={'grey'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Renderiza o componente Filters apenas se filters não estiver vazio */}
      {filters.length > 0 && (
        <Filters
          filters={filters}
          onFilterSelect={(value) => setSelectedFilter(value)}
          selectedFilter={selectedFilter}
        />
      )}

      {/* Lista os itens filtrados com base no texto da pesquisa */}
      <FlatList
        data={filteredSearch}
        keyExtractor={(item) => item.id.toString()} // Garantir que 'item.id' seja uma string
        renderItem={({ item }) => renderCard(item)}
        scrollEnabled={false}
      />
      {filteredSearch.length === 0 && <NothingText />}
    </View>
  );
};

export default SearchableCardList;

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    borderRadius: 8,
    height: 40,
    backgroundColor: '#F0F2F5',
    marginVertical: 10,
  },
  searchBar: {
    flexGrow: 1,
    borderWidth: 0,
    fontFamily: 'Poppins',
  },
  containerText: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
