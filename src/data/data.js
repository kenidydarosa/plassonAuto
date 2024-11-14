import { id } from "react-native-paper-dates";

export const userData = {
    id: 1,
    name: 'Kenidy da Rosa',
    password: '1234',
    job: 'Especialista de dados',
    sector: 'Comercial',
}

export const listTitles = ['Visita técnica', 'Padaria', 'Manutenção', 'Lavação', 'Start up Aviário'];
export const listSectors = ['Administrativo', 'PCP', 'Engenharia', 'Astec', 'Comercial Externo', 'Suprimentos'];

// Lista de dados dos cards
export const schedulesData = [
    {
        id: '1',
        user: 'Kenidy da Rosa',
        idCar: 1,
        title: 'Visita técnica',
        description: 'Fazer startup do aviário',
        locale: 'Proave Agroindústrial',
        date_time_start: '2024-10-15T14:10:25.358Z',
        date_time_end: '2024-10-15T18:26:25.358Z',
        allDay: false,
        keyHandOverTime: '2024-10-15T14:10:25.358Z',
        returnOfKeyTime: '2024-10-15T14:11:25.358Z',
        icon1: 'map-marker',
        icon2: 'calendar-month',
        icon3: 'clock',
        status: 'Ativa',
        notes: 'teste observações',
    },
    {
        id: '2',
        user: 'Kenidy da Rosa',
        idCar: 2,
        title: 'Manutenção em controlador',
        description: 'O controlador parou de funcionar, será necessário efetuar a troca',
        locale: 'Proave Agroindústrial',
        date_time_start: '2024-10-15T14:10:25.358Z',
        date_time_end: '2024-10-15T18:26:25.358Z',
        allDay: false,
        keyHandOverTime: '2024-10-15T14:10:25.358Z',
        returnOfKeyTime: '',
        status: 'Ativa',
        notes: 'teste',
        icon1: 'map-marker',
        icon2: 'calendar-month',
        icon3: 'clock',
    },
    {
        id: '3',
        user: 'Kenidy da Rosa',
        idCar: 3,
        title: 'Start up em aviário',
        description: 'Fazer startup do aviário',
        locale: 'Proave Agroindústrial',
        date_time_start: '2024-10-15T14:10:25.358Z',
        date_time_end: '2024-10-15T14:15:25.358Z',
        allDay: false,
        keyHandOverTime: '2024-10-15T14:10:25.358Z',
        returnOfKeyTime: '',
        status: 'Cancelada',
        notes: 'teste',
        icon1: 'map-marker',
        icon2: 'calendar-month',
        icon3: 'clock',
    },
];


// Dados do banco
export const usersData = [
    {
        id: 1,
        name: 'Kenidy',
        job: 'Especialista de dados',
        sector: 'Comercial',
    },
    {
        id: 2,
        name: 'João Rodrigues',
        job: 'Supervisor',
        sector: 'Central de Apoio',
    },
    {
        id: 3,
        name: 'Luiz',
        job: 'Assistente',
        sector: 'Central de Apoio',
    },
];

// Dados do banco
export const notifyData = [
    {
        id: 1,
        title: 'Reserva aprovada',
        description: 'Start Up aviário - Proave Agroindústrial',
        date: new Date().toLocaleDateString(),
    },
    {
        id: 2,
        title: 'Reserva aprovada',
        description: 'Start Up aviário - Proave Agroindústrial',
        date: new Date().toLocaleDateString(),
    },
    {
        id: 3,
        title: 'Reserva aprovada',
        description: 'Start Up aviário - Proave Agroindústrial',
        date: new Date().toLocaleDateString(),
    },
];

// Vem do banco
export const veiculesData = [
    {
        id: 1,
        imgKey: 'cronos.png',
        model: 'Cronos 1.0 turbo',
        brand: 'Fiat',
        year: 2024,
        color:'branco',
        plate: 'ABC-1234',
        renavam:'835132-23',
        sector: 'Comercial Administrativo',
        status: 'Disponível',
        kilometers: 15000,
        booster: '1/2',
    },
    {
        id: 2,
        imgKey: 'cronos.png',
        model: 'Onix 1.0 turbo',
        brand: 'Chevrolet',
        year: 2024,
        color:'branco',
        plate: 'ABC-1234',
        renavam:'835132-23',
        sector: 'Comercial Administrativo',
        status: 'Indisponível',
        kilometers: 15000,
        booster: '1/2',
    },
    {
        id: 3,
        imgKey: 'cronos.png',
        model: 'Saveiro 1.0 turbo',
        brand: 'Volkswagem',
        year: 2024,
        color:'branco',
        plate: 'ABC-1234',
        renavam:'835132-23',
        sector: 'Comercial Administrativo',
        status: 'Disponível',
        kilometers: 15000,
        booster: '1/2',
    },
];
