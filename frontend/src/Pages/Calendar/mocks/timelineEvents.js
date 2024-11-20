import { CalendarUtils } from 'react-native-calendars';

const EVENT_COLOR = '#E0FBFFBE';
const today = new Date();

export const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

export const timelineEvents = [
  { 
    id:1,
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 12:00:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars'
  },
  {
    id:2,
    start: `${getDate()} 08:00:00`,
    end: `${getDate()} 09:30:00`,
    title: 'Meeting A',
    summary: 'Summary for meeting A',
    color: EVENT_COLOR
  },
  {
    id:3,
    start: `${getDate()} 15:30:00`,
    end: `${getDate()} 16:30:00`,
    title: 'Meeting B',
    summary: 'Summary for meeting B',
    color: EVENT_COLOR
  },
  {
    id:4,
    start: `${getDate()} 13:45:00`,
    end: `${getDate()} 14:45:00`,
    title: 'Meeting C',
    summary: 'Summary for meeting C',
    color: EVENT_COLOR
  },
  {
    id:5,
    start: `${getDate()} 02:40:00`,
    end: `${getDate()} 03:10:00`,
    title: 'Meeting D',
    summary: 'Summary for meeting D',
    color: EVENT_COLOR
  },
  {
    id:6,
    start: `${getDate(1)} 14:30:00`,
    end: `${getDate(1)} 16:30:00`,
    title: 'Meeting Some Friends in ARMED',
    summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
    color: 'pink'
  },
  {
    id:7,
    start: `${getDate(2)} 01:40:00`,
    end: `${getDate(2)} 02:25:00`,
    title: 'Meet Sir Khurram Iqbal',
    summary: 'Computer Science Dept. Comsats Islamabad',
    color: 'orange'
  },
  {
    id:8,
    start: `${getDate(2)} 04:10:00`,
    end: `${getDate(2)} 04:40:00`,
    title: 'Tea Time with Colleagues',
    summary: 'WeRplay',
    color: EVENT_COLOR
  },
  {
    id:9,
    start: `${getDate(2)} 00:45:00`,
    end: `${getDate(2)} 01:35:00`,
    title: 'Lets Play Apex Legends',
    summary: 'with Boys at Work',
    color: EVENT_COLOR,
  },

  {
    id:10,
    start: `${getDate(4)} 15:10:00`,
    end: `${getDate(4)} 17:45:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars',
    color: EVENT_COLOR
  },
  {
    id:11,
    start: `${getDate(5)} 00:00:00`,
    end: `${getDate(6)} 00:00:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars',
    color: 'red'
  }
];
