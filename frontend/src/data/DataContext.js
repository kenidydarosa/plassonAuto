import React, { createContext, useState, useContext } from 'react';
import { listTitlesDB, listSectorsDB } from './data';

// Criação de um contexto chamado DataContext, para gerenciar dados globais no aplicativo
const DataContext = createContext();

// O DataProvider é um componente responsável por fornecer o contexto aos componentes filhos
export const DataProvider = ({ children }) => {
  // Declaração de estados para armazenar os dados de usuário, agendamentos, usuários, notificações e veículos
  const [userDB, setUserDB] = useState(null); // Estado para o usuário atual (inicialmente null)
  const [schedulesDB, setSchedulesDB] = useState(null); // Estado para armazenar os agendamentos, com valor inicial vindo de 'schedulesData'
  const [usersDB, setUsersDB] = useState(null); // Estado para armazenar os dados dos usuários
  const [notifyDB, setNotifyDB] = useState(null); // Estado para armazenar as notificações
  const [veiculesDB, setVeiculesDB] = useState(null); // Estado para armazenar os veículos
  const [sectorsDB, setSectorsDB] = useState(null); // Estado para armazenar os setores
  const [locale, setLocale] = useState(null); // Estado para armazenar o local atual
  const [latitude, setLatitude] = useState(null); // Estado para armazenar a latitude do local atual
  const [longitude, setLongitude] = useState(null); // Estado para armazenar a longitude do local atual  
  const [coordTemp, setCoordTemp] = useState({latitude: null, longitude:null}); // Estado para armazenar a longitude do usuário
  const [coordUser, setCoordUser] = useState({latitude: null, longitude:null}); // Estado para armazenar a longitude do usuário
  const [destination, setDestination] = useState(null); // Estado para armazenar o destino atual
  const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });;
  const [notificationCount, setNotificationCount] = useState(0); // Estado para armazenar a contagem de notificações não lidas
  const [loading, setLoading] = useState(false);
  
  const contextValue = {
    userDB, // Fornece o estado do usuário atual
    setUserDB, // Função para atualizar o estado do usuário
    schedulesDB, // Fornece os agendamentos
    setSchedulesDB, // Função para atualizar os agendamentos
    usersDB, // Fornece os usuários
    setUsersDB, // Função para atualizar os usuários
    notifyDB, // Fornece as notificações
    setNotifyDB, // Função para atualizar as notificações
    veiculesDB, // Fornece os veículos
    setVeiculesDB, // Função para atualizar os veículos
    listTitlesDB, // Fornece os títulos da lista
    listSectorsDB, // Fornece os setores da lista
    sectorsDB, // Fornece os setores
    setSectorsDB, // Função para atualizar os setores
    locale, // Fornece o local atual
    setLocale, // Função para atualizar o local atual
    latitude, // Fornece a latitude do local atual
    setLatitude, // Função para atualizar a latitude do local atual
    longitude, // Fornece a longitude do local atual
    setLongitude, // Função para atualizar a longitude do local atual
    coordTemp,
    setCoordTemp,
    coordUser,
    setCoordUser,
    loading,
    setLoading,
    destination, // Fornece o destino atual
    setDestination, // Função para atualizar o destino atual
    notificationCount, // Fornece a contagem de notificações não lidas
    setNotificationCount, // Função para atualizar a contagem de notificações não lidas
    routeInfo,
    setRouteInfo
  };

  return (
    // O DataContext.Provider fornece o contexto para os componentes filhos.
    // O valor do contexto inclui os estados e suas funções de atualização
    <DataContext.Provider value={contextValue}>
      {/* Os componentes filhos que recebem esse contexto */}
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado para acessar o contexto DataContext
export const useDataContext = () => useContext(DataContext);
