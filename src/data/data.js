import { id } from "react-native-paper-dates";

export const userData = {
    id: 1,
    name: 'Kenidy da Rosa',
    username:'Kenidy.rosa',
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
        name: 'Kenidy da Rosa',
        username:'Kenidy.rosa',
        password: '1234',
        job: 'Especialista de dados',
        sector: 'Comercial',
    },
    {
        id: 2,
        name: 'João Rodrigues',
        username:'João.rodrigues',
        password: '1234',
        job: 'Supervisor Central de Apoio',
        sector: 'Comercial',
    },
    {
        id: 3,
        name: 'Luiz Tiskoski',
        username:'Luiz.tiskoski',
        password: '1234',
        job: 'Assistente de Orçamentos',
        sector: 'Comercial',
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
        imgKey: '0f04ad49-3eaf-443e-8771-a2f6d9d6b0a1.png',
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
        imgKey: '0a0f37a8-f08b-488f-a5c1-4d075b5fdad1.png',
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
        imgKey: 'd1888715-24df-4a43-8fad-8d2825da8218.png',
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
    {
        id: 4,
        imgKey: '0c4fc5ac-f786-4a54-bb37-ffccae9952fb.png',
        model: 'Virtus 1.0 turbo',
        brand: 'Volkswagem',
        year: 2024,
        color:'branco',
        plate: 'ABC-1234',
        renavam:'835132-23',
        sector: 'Comercial Administrativo',
        status: 'Indisponível',
        kilometers: 15000,
        booster: '1/2',
    },
];
