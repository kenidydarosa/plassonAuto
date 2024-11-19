// DataContext.js
import React, { createContext, useState, useContext } from 'react'; // Importa os hooks e funções do React
import {
  userData, // Dados de usuário
  schedulesData, // Dados de agendamentos
  usersData, // Dados de usuários
  notifyData, // Dados de notificações
  veiculesData, // Dados de veículos
  listTitles, // Títulos de lista
  listSectors, // Setores da lista
} from './data'; // Importa os dados pré-definidos (como dados estáticos) de um arquivo 'data.js'

// Criação de um contexto chamado DataContext, para gerenciar dados globais no aplicativo
const DataContext = createContext();

// O DataProvider é um componente responsável por fornecer o contexto aos componentes filhos
export const DataProvider = ({ children }) => {
  // Declaração de estados para armazenar os dados de usuário, agendamentos, usuários, notificações e veículos
  const [userX, setUserX] = useState(null); // Estado para o usuário atual (inicialmente null)
  const [schedules, setSchedules] = useState(null); // Estado para armazenar os agendamentos, com valor inicial vindo de 'schedulesData'
  const [users, setUsers] = useState(null); // Estado para armazenar os dados dos usuários
  const [notifications, setNotifications] = useState(null); // Estado para armazenar as notificações
  const [veiculesc, setVeicules] = useState(null); // Estado para armazenar os veículos

  return (
    // O DataContext.Provider fornece o contexto para os componentes filhos.
    // O valor do contexto inclui os estados e suas funções de atualização
    <DataContext.Provider
      value={{
        userX, // Fornece o estado do usuário atual
        setUserX, // Função para atualizar o estado do usuário
        schedules, // Fornece os agendamentos
        setSchedules, // Função para atualizar os agendamentos
        users, // Fornece os usuários
        setUsers, // Função para atualizar os usuários
        notifications, // Fornece as notificações
        setNotifications, // Função para atualizar as notificações
        veiculesc, // Fornece os veículos
        setVeicules, // Função para atualizar os veículos
        listTitles, // Fornece os títulos da lista
        listSectors, // Fornece os setores da lista
      }}
    >
      {/* Os componentes filhos que recebem esse contexto */}
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
