// style.js

// Colors
const primaryColor = '#4A8FBDFF';
const titleColor = '#256E9EFF';
const imgCardColor = '#4A8FBD50';
const borderColor = '#EEEEEEFF';
const statusGreen = '#E0FFEAFF';
const statusFontGreen = '#227A3EFF';
const statusRed = '#ffe5e5';
const statusFontRed = '#850D0D';
const statusYellow = '#ffebce';
const statusFontYellow = '#9d6919';
const toggleButton = '#7FDA6DFF';
const whiteColor = '#fff';

// Styles
const styleJS = {
  // Color references
  primaryColor,
  titleColor,
  imgCardColor,
  borderColor,
  statusGreen,
  statusFontGreen,
  statusRed,
  statusFontRed,
  statusYellow,
  statusFontYellow,
  toggleButton,
  whiteColor,

  // General Containers
  pageContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: whiteColor,
  },
  containerForm: {
    padding: 15,
    gap: 30,
  },

  // Titles and Texts
  title: {
    width: '100%',
    marginTop: 40,
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
  },
  textButton: {
    color: whiteColor,
  },
  textKey: {
    width: '40%',
  },
  dateText: {
    fontSize: 17,
  },
  timeText: {
    fontSize: 17,
  },

  // Components
  section: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 15,
    minHeight: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderColor: borderColor,
  },
  buttons: {
    flexDirection: 'row',
    gap: 5,
  },
  timeButton: {
    backgroundColor: '#ECEBEBFF',
    padding: 5,
    borderRadius: 7,
    alignItems: 'center',
    width: 70,
  },
  dateButton: {
    backgroundColor: '#ECEBEBFF',
    padding: 5,
    borderRadius: 7,
    alignItems: 'center',
    width: 170,
  },
  buttonConfirm: {
    backgroundColor: '#24AD5DFF',
    borderColor: '#24AD5DFF',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBase: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
  },

  // Image and Veicule Styles
  veicule: {
    alignItems: 'center',
    width: '100%',
    height: 150,
    backgroundColor: '#EFFDFDCC',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: primaryColor,
  },
  imageButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: primaryColor,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
};

export default styleJS;


// Theme Configuration
import { Platform } from 'react-native';

export const themeColor = styleJS.primaryColor;
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  const disabledColor = '#ccc';

  return {
    arrowColor: themeColor,
    arrowStyle: { padding: 0 },
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    expandableKnobColor: themeColor,
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontFamily: 'Poppins',
    textMonthFontWeight: 'bold',
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 14,
    textDayHeaderFontFamily: 'Poppins',
    textDayHeaderFontWeight: 'normal',
    dayTextColor: '#000',
    todayTextColor: themeColor,
    textDayFontSize: 16,
    textDayFontFamily: 'Poppins',
    textDayFontWeight: '500',
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    textDisabledColor: disabledColor,
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: -2 },
  };
}
