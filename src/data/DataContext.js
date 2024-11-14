// DataContext.js
import React, { createContext, useState, useContext } from 'react';
import { userData, schedulesData, usersData, notifyData, veiculesData, listTitles, listSectors } from './data';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userX, setUserX] = useState(userData);
    const [schedules, setSchedules] = useState(schedulesData);
    const [users, setUsers] = useState(usersData);
    const [notifications, setNotifications] = useState(notifyData);
    const [veicules, setVeicules] = useState(veiculesData);

    return (
        <DataContext.Provider
            value={{
                userX,
                setUserX,
                schedules,
                setSchedules,
                users,
                setUsers,
                notifications,
                setNotifications,
                veicules,
                setVeicules,
                listTitles,
                listSectors
            }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(DataContext);
};
