/** @format */

import {
  View,
  Text,
  TextInput,
  Switch,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDataContext } from '../../data/DataContext.js';
import React, { useEffect, useState } from 'react';
import { DateTimeButton, showDateTimePicker, onChange } from './DatePickerFunctions.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import styleJS from '../../components/style';
import InputField from '../../components/InputFied.jsx';
import SelectInput from '../../components/SelectInput';

const NewSchedule = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { schedulesDB, setSchedulesDB, veiculesDB, userDB, listTitlesDB, usersDB } = useDataContext();
  const { create, id, timeString } = route.params || {};

  // Variaveis de estado
  const [car, setCar] = useState(null);
  const [userID, setUserID] = useState('');
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('Selecione um título');
  const [summary, setSummary] = useState('');

  const [locale, setLocale] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [veicule, setVeicule] = useState('');
  const [kmStart, setKmStart] = useState('');
  const [kmEnd, setKmEnd] = useState('');
  const [boosterStart, setBoosterStart] = useState('');
  const [boosterEnd, setBoosterEnd] = useState('');
  const [notes, setNotes] = useState('');

  const [keyHandOver, setkeyHandOver] = useState(false);
  const [returnOfKey, setReturnOfKey] = useState(false);

  const [keyHandOverTime, setKeyHandOverTime] = useState('--:--');
  const [returnOfKeyTime, setReturnOfKeyTime] = useState('--:--');

  const [statusBt, setStatusBt] = useState(true);
  const [status, setStatus] = useState('Ativa');

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [pickerField, setPickerField] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);

  const listPicker = {
    showPicker,
    setShowPicker,
    pickerMode,
    setPickerMode,
    pickerField,
    setPickerField,
    activeButton,
    setActiveButton,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
  };

  useEffect(() => {
    if (id) {
      if (create && timeString) {
        const currentCar = veiculesDB.find((car) => car.id === id);
        const date = new Date(timeString);
        const endDate = new Date(date.getTime());

        endDate.setHours(date.getHours() + 1);
        setUserID(userDB.id);
        setUser(userDB.name);
        setCar(currentCar);
        setStartDate(date);
        setEndDate(date);
        setStartTime(date);
        setEndTime(endDate);
      } else {
        const currentSchedule = schedulesDB.find((item) => item.id === id);
        const currentCar = veiculesDB.find(
          (car) => car.id === currentSchedule.veicule_id
        );
        const currentUser = usersDB.find((user) => user.id === currentSchedule.user_id);

        setCar(currentCar);

        if (currentSchedule) {
          setUserID(currentUser.id);
          setUser(currentUser.name);
          setTitle(currentSchedule.title);
          setSummary(currentSchedule.summary);
          setLocale(currentSchedule.locale);
          setAllDay(currentSchedule.allDay === 'true' ? true : false);
          setStartDate(new Date(currentSchedule.start));
          setStartTime(new Date(currentSchedule.start));
          setEndDate(new Date(currentSchedule.end));
          setEndTime(new Date(currentSchedule.end));
          setNotes(currentSchedule.notes);

          setKeyHandOverTime(
            currentSchedule.keyHandOverTime
              ? new Date(currentSchedule.keyHandOverTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })
              : '--:--'
          );

          setReturnOfKeyTime(
            currentSchedule.returnOfKeyTime
              ? new Date(currentSchedule.returnOfKeyTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })
              : '--:--'
          );

          setkeyHandOver(!!currentSchedule.keyHandOverTime);
          setReturnOfKey(!!currentSchedule.returnOfKeyTime);

          setStatus(currentSchedule.status);
          currentSchedule.status === 'Ativa' ? setStatusBt(true) : setStatusBt(false);
        }
      }
    }
  }, [create, id, timeString, userDB]);

  useEffect(() => {
    if (car) {
      setVeicule(`${car.model} - Ano ${car.year}`);
      setKmStart(car.kilometers);
      setBoosterStart(car.booster);
    }
  }, [car]);

  const currentDate = new Date();
  // Função para formatar a data e a hora
  const formatDateTime = (date, time) => {
    const formattedDate = date.toISOString().split('T')[0]; // Formata a data para 'YYYY-MM-DD'
    const formattedTime = time.toTimeString().split(' ')[0]; // Formata a hora para 'HH:MM:SS'
    return `${formattedDate}T${formattedTime}.358Z`; // Concatena com 'T' no meio
  };

  // Função ajustar data e hora de entrega das chaves
  const setDateHours = (date, time) => {
    const currentDate = new Date(date);

    if (!time || time === '--:--') return null; // Se o tempo estiver vazio ou for '--:--', retorna '--:--'

    const [hours, minutes] = time.split(':').map(Number);

    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    return currentDate;
  };

  const createSchedule = () => {
    let updatedData;

    // Verifica se há algum campo vazio
    const fields = [user, title, summary, locale];
    const hasEmptyField = fields.some((item) => item === '');

    if (hasEmptyField) {
      alert('Preencha todos os campos!');
      return;
    }

    const baseSchedule = {
      //Verificar aqui, o id é gerado pelo backend
      id: create ? (schedulesDB.length + 1).toString() : id,
      user_id: userID,
      veicule_id: car.id,
      title,
      summary,
      locale,
      start: formatDateTime(startDate, startTime),
      end: formatDateTime(endDate, endTime),
      allDay,
      keyHandOverTime: setDateHours(startDate, keyHandOverTime),
      returnOfKeyTime: setDateHours(startDate, returnOfKeyTime),
      status: create ? 'Ativa' : statusBt ? 'Ativa' : 'Cancelada',
      notes,
    };

    updatedData = create
      ? [...schedulesDB, baseSchedule]
      : schedulesDB.map((item) => (item.id === id ? { ...item, ...baseSchedule } : item));

    setSchedulesDB(updatedData);
    // navigation.navigate('MySchedules', { data: updatedData });
    navigation.navigate('BottomNavigator', {
      screen: 'MySchedules',
      params: { data: updatedData },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // ajuste se necessário
    >
      <ScrollView
        style={styleJS.containerForm}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Inputs de Título e Localização */}
        <View style={styleJS.section}>
          <View style={styleJS.row}>
            <View
              style={[
                styleJS.statusBase,
                { backgroundColor: statusBt ? styleJS.statusGreen : styleJS.statusRed },
              ]}
            >
              <Text
                style={{
                  color: statusBt ? styleJS.statusFontGreen : styleJS.statusFontRed,
                }}
              >
                {status}
              </Text>
            </View>
            <Switch
              value={statusBt}
              disabled={create}
              onValueChange={(value) => {
                setStatusBt(value);
                setStatus(value ? 'Ativa' : 'Cancelada');
              }}
            />
          </View>
          <InputField
            icon={'account-circle'}
            placeholder={'Usuário'}
            value={user}
            func={setUser}
            editable={false}
            border={true}
            width={'100%'}
          />
          <SelectInput
            value={title}
            setValue={setTitle}
            list={listTitlesDB}
            border={true}
            icon={'target'}
            width={'100%'}
          />
          <InputField
            icon={'target'}
            placeholder={'Descrição'}
            value={summary}
            func={setSummary}
            editable={true}
            border={true}
            width={'100%'}
            multiline={true}
          />
          <InputField
            icon={'map-marker'}
            placeholder={'Localização'}
            value={locale}
            func={setLocale}
            editable={true}
            border={false}
            width={'100%'}
          />
        </View>

        {/* Botões para Data e Hora */}
        <View style={styleJS.section}>
          {/* Switch All-day */}
          <View style={styleJS.row}>
            <Text>Dia inteiro</Text>
            <Switch value={allDay} onValueChange={setAllDay} />
          </View>

          <View style={styleJS.row}>
            <Text>Inicia</Text>

            <View style={styleJS.buttons}>
              <DateTimeButton
                label='Inicia'
                date={startDate.toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
                style={styleJS.dateButton}
                onPress={() => showDateTimePicker(listPicker, 'startDate', 'date')}
                isActive={activeButton === 'startDate'}
              />
              {/* Start Time */}
              {!allDay && (
                <DateTimeButton
                  label='Inicia'
                  date={startTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                  style={styleJS.timeButton}
                  onPress={() => showDateTimePicker(listPicker, 'startTime', 'time')}
                  isActive={activeButton === 'startTime'}
                />
              )}
            </View>
          </View>

          <View style={[styleJS.row, { borderBottomWidth: 0 }]}>
            <Text>Termina</Text>
            <View style={styleJS.buttons}>
              {/* End Date */}
              <DateTimeButton
                label='Termina'
                date={endDate.toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
                style={styleJS.dateButton}
                onPress={() => showDateTimePicker(listPicker, 'endDate', 'date')}
                isActive={activeButton === 'endDate'}
              />
              {/* End Time */}
              {!allDay && (
                <DateTimeButton
                  label='Termina'
                  date={endTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                  style={styleJS.timeButton}
                  onPress={() => showDateTimePicker(listPicker, 'endTime', 'time')}
                  isActive={activeButton === 'endTime'}
                />
              )}
            </View>
          </View>
        </View>

        {/* Exibe o DateTimePicker */}
        {showPicker && (
          <DateTimePicker
            value={pickerField.includes('Date') ? startDate : startTime}
            mode={pickerMode}
            is24Hour={true}
            display={
              Platform.OS === 'ios' && pickerMode === 'time' ? 'spinner' : 'inline'
            }
            onChange={(event, selectedDateTime) =>
              onChange(event, selectedDateTime, listPicker)
            }
            themeVariant='light'
            minimumDate={currentDate}
            locale='pt-br'
            accentColor={styleJS.imgCardColor}
            style={styleJS.dateTimePicker}
          />
        )}
        <View style={[styleJS.section, styleJS.row]}>
          <InputField
            icon={'car'}
            placeholder={'Veículo'}
            value={veicule}
            func={setVeicule}
            editable={false}
            type={'text'}
            border={false}
            width={'100%'}
          />
        </View>
        <View style={[styleJS.section, styleJS.row]}>
          <InputField
            icon={'gauge-empty'}
            placeholder={'Km inicial'}
            value={kmStart}
            func={setKmStart}
            editable={false}
            type={'numeric'}
            border={false}
            width={'50%'}
          />
          <InputField
            icon={'gauge-full'}
            placeholder={'Km final'}
            value={kmEnd}
            func={setKmEnd}
            editable={true}
            type={'numeric'}
            border={false}
            width={'50%'}
          />
        </View>
        <View style={[styleJS.section, styleJS.row]}>
          <InputField
            icon={'gas-station'}
            placeholder={'Tanque Final'}
            value={boosterStart}
            func={setBoosterStart}
            editable={false}
            border={false}
            width={'50%'}
          />
          <InputField
            icon={'gas-station'}
            placeholder={'Tanque final'}
            value={boosterEnd}
            func={setBoosterEnd}
            editable={true}
            border={false}
            width={'50%'}
          />
        </View>
        <View style={styleJS.section}>
          <TextInput
            style={[styleJS.input, { outline: 'none', height: 100 }]}
            placeholder='Notas'
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Chaves */}
        <View style={styleJS.section}>
          <View style={styleJS.row}>
            <Text style={styleJS.textKey}>Entrega da chave</Text>
            <View style={styleJS.timeButton}>
              <Text style={styleJS.timeText}>{keyHandOverTime}</Text>
            </View>
            <Switch
              value={keyHandOver}
              onValueChange={(value) => {
                setkeyHandOver(value);
                setKeyHandOverTime(
                  value
                    ? new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : '--:--'
                );
                setReturnOfKey(false);
                setReturnOfKeyTime('--:--');
              }}
            />
          </View>

          <View style={[styleJS.row, { borderBottomWidth: 0 }]}>
            <Text style={styleJS.textKey}>Devolução da chave</Text>
            <View style={styleJS.timeButton}>
              <Text style={styleJS.timeText}>{returnOfKeyTime}</Text>
            </View>
            <Switch
              value={!keyHandOver ? keyHandOver : returnOfKey}
              disabled={!keyHandOver}
              onValueChange={(value) => {
                value = !keyHandOver ? keyHandOver : value;
                setReturnOfKey(value);
                setReturnOfKeyTime(
                  value
                    ? new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : '--:--'
                );
              }}
            />
          </View>
        </View>
        <View>
          <Button
            style={''}
            icon='check-circle'
            mode='contained'
            loading={loadingImage}
            onPress={() => createSchedule()}
            buttonColor={styleJS.colorButton}
          >
            <Text style={styleJS.textButton}>Confirmar</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewSchedule;
