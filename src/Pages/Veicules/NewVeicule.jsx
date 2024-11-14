import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useDataContext } from '../../data/DataContext.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import styleJS from '../../components/style';
import InputField from '../../components/InputFied';
import SelectInput from '../../components/SelectInput';
import uuid from 'react-native-uuid';
import { storage } from '../../config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const NewVeicule = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { create, id } = route.params || {};
  const { veicules, setVeicules, userX, listSectors } = useDataContext();

  const [car, setCar] = useState(null);
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [kilometers, setkilometers] = useState('');
  const [renavam, setRenavam] = useState('');
  const [booster, setBooster] = useState('');
  const [sector, setSector] = useState('Setor');
  const [img, setImg] = useState(null);
  const [statusBt, setStatusBt] = useState(true);
  const [status, setStatus] = useState('Disponível');
  const [imgKey, setImgKey] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (id && !create) {
      const veicule = veicules.find((item) => item.id === id);

      if (veicule) {
        setModel(veicule.model);
        setBrand(veicule.brand);
        setColor(veicule.color);
        setYear(veicule.year);
        setPlate(veicule.plate);
        setkilometers(veicule.kilometers);
        setRenavam(veicule.renavam);
        setBooster(veicule.booster);
        setSector(veicule.sector);
        setImg(veicule.img);
        setImgKey(veicule.imgKey || '');
        setStatus(veicule.status);

        veicule.status === 'Disponível' ? setStatusBt(true) : setStatusBt(false);
      }
    }
  }, [create, id]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  // Função para fazer upload da imagem
  const uploadImage = async (imageUri) => {
    if (!imageUri) return null;

    setLoadingImage(true);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Gera um UUID para o nome da imagem
      const imageName = uuid.v4();
      const storageRef = ref(storage, `images/${imageName}.jpg`);

      // Faz o upload do arquivo
      await uploadBytes(storageRef, blob);

      // Obtém a URL pública do arquivo
      const downloadUrl = await getDownloadURL(storageRef);

      setLoadingImage(false);
      return downloadUrl;
    } catch (error) {
      setLoadingImage(false);
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  const createVeicule = async () => {
    let updatedData;

    const fields = [
      model,
      brand,
      color,
      year,
      plate,
      renavam,
      kilometers,
      booster,
      sector,
      img,
    ];
    const hasEmptyField = fields.some((item) => item === '');

    if (hasEmptyField) {
      alert('Preencha todos os campos!');
      return;
    }

    if (img) {
      const imageUrl = await uploadImage(img);
      setImgKey(imageUrl);
    }

    const baseVeicule = {
      id: create ? (veicules.length + 1).toString() : id,
      model,
      brand,
      color,
      year,
      plate,
      renavam,
      kilometers,
      booster,
      sector,
      imgKey: imgKey || '',
      status: create ? 'Disponível' : statusBt ? 'Disponível' : 'Indisponível',
    };

    updatedData = create
      ? [...veicules, baseVeicule]
      : veicules.map((item) => (item.id === id ? { ...item, ...baseVeicule } : item));

    setVeicules(updatedData);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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
                setStatus(value ? 'Disponível' : 'Indisponível');
              }}
            />
          </View>

          <InputField
            icon={'car'}
            placeholder={'Modelo'}
            value={model}
            func={setModel}
            editable={true}
            border={true}
            width={'100%'}
          />
          <InputField
            icon={'check-circle'}
            placeholder={'Marca'}
            value={brand}
            func={setBrand}
            editable={true}
            border={true}
            width={'100%'}
          />
          <View style={[styleJS.row, { borderBottomWidth: 0 }]}>
            <InputField
              icon={'invert-colors'}
              placeholder={'Cor'}
              value={color}
              func={setColor}
              editable={true}
              border={false}
              width={'50%'}
            />
            <InputField
              icon={'calendar'}
              placeholder={'Ano'}
              value={year}
              func={setYear}
              editable={true}
              border={false}
              width={'50%'}
              type={'numeric'}
              data={true}
            />
          </View>
        </View>
        <View style={styleJS.section}>
          <View style={styleJS.row}>
            <InputField
              icon={'keyboard'}
              placeholder={'Placa'}
              value={plate}
              func={setPlate}
              editable={true}
              border={false}
              width={'50%'}
            />
            <InputField
              icon={'keyboard'}
              placeholder={'Renavam'}
              value={renavam}
              func={setRenavam}
              editable={true}
              border={false}
              width={'50%'}
            />
          </View>
          <View style={[styleJS.row]}>
            <InputField
              icon={'gauge'}
              placeholder={'km inicial'}
              value={kilometers}
              func={setkilometers}
              editable={true}
              border={false}
              width={'50%'}
              type={'numeric'}
            />
            <InputField
              icon={'gas-station'}
              placeholder={'Tanque'}
              value={booster}
              func={setBooster}
              editable={true}
              border={false}
              width={'50%'}
            />
          </View>

          <SelectInput
            initialValue={'Selecione um setor'}
            value={sector}
            setValue={setSector}
            list={listSectors}
            border={false}
            icon={'apps-box'}
            width={'100%'}
          />
        </View>

        <View style={[styleJS.veicule, img ? { borderWidth: 0 } : '']}>
          <TouchableOpacity onPress={pickImage} style={styleJS.imageButton}>
            {img ? (
              <Image source={{ uri: img }} style={styleJS.image} />
            ) : (
              <Text style={styleJS.imagePlaceholderText}>Escolher Imagem</Text>
            )}
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styleJS.buttonConfirm} onPress={() => createVeicule()}>
            <Text style={styleJS.textButton}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewVeicule;
