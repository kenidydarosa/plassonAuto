// DataContext.js
import React, { createContext, useState, useContext } from 'react';
import { listTitlesDB, listSectorsDB} from './data';

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
  const [sectorsDB, setSectorsDB] = useState(null); // Estado para armazenar os veículos

  return (
    // O DataContext.Provider fornece o contexto para os componentes filhos.
    // O valor do contexto inclui os estados e suas funções de atualização
    <DataContext.Provider
      value={{
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
        sectorsDB,
        setSectorsDB,
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
