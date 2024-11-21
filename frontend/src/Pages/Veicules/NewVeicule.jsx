import { View, Text, TouchableOpacity, Switch, Platform, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDataContext } from '../../data/DataContext.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import styleJS from '../../components/style.js';
import InputField from '../../components/InputFied.jsx';
import SelectInput from '../../components/SelectInput.jsx';
import uuid from 'react-native-uuid';
import { getImageUrl } from '../../config/api.js';
import { storage } from '../../config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import IconWithLabel from '../../components/IconWithLabel.jsx';
import { createVeicule, updateVeicule } from '../../routes/veiculesRoutes.js';

// Componente funcional que gerencia a criação e edição de um veículo
const NewVeicule = () => {
  // Hook de roteamento para obter parâmetros passados na navegação
  const route = useRoute();
  const navigation = useNavigation();
  const { create, id } = route.params || {}; // Identifica se é criação ou edição
  const { veiculesDB, setVeiculesDB, userDB, listSectorsDB, sectorsDB } = useDataContext(); // Dados do contexto

  // States locais para armazenar dados do veículo
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
  const [statusBt, setStatusBt] = useState(true);
  const [status, setStatus] = useState('Disponível');
  const [imgKey, setImgKey] = useState('');
  const [img, setImg] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  // Efeito que é executado ao montar o componente ou quando a rota é alterada
  useEffect(() => {
    // Verifica se é um caso de edição, caso contrário, apenas inicializa os dados
    if (id && !create) {
      const veicule = veiculesDB.find((item) => item.id === id);

      if (veicule) {
        // Preenche os campos com os dados do veículo existente
        setModel(veicule.model);
        setBrand(veicule.brand);
        setColor(veicule.color);
        setYear(veicule.year);
        setPlate(veicule.plate);
        setkilometers(veicule.kilometers);
        setRenavam(veicule.renavam);
        setBooster(veicule.booster);
        setSector(veicule.sector);
        setImg(getImageUrl(veicule.imgKey) || '');
        setStatus(veicule.status);

        veicule.status === 'Disponível' ? setStatusBt(true) : setStatusBt(false);
      }
    }
  }, [create, id]);

  // Função para escolher uma imagem da galeria do dispositivo
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
      setImg(result.assets[0].uri); // Atualiza a imagem escolhida
    }
  };

  // Função para fazer upload da imagem no Firebase Storage
  const uploadImage = async (imageUri) => {
    if (!imageUri) return null;

    setLoadingImage(true); // Ativa o estado de loading enquanto a imagem está sendo carregada
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Identifica o tipo da imagem pelo MIME type
      const mimeType = blob.type; // Ex: "image/jpeg" ou "image/png"
      let fileExtension = mimeType.split('/')[1]; // Pega a parte após o "/"

      // Ajusta o nome da extensão caso necessário
      if (fileExtension === 'jpeg') fileExtension = 'jpg';

      // Gera um UUID para o nome da imagem
      const imageName = `${uuid.v4()}.${fileExtension}`;
      const storageRef = ref(storage, `images/${imageName}`);

      // Faz o upload do arquivo
      await uploadBytes(storageRef, blob);

      setLoadingImage(false);

      // Retorna o nome completo da imagem
      return imageName;
    } catch (error) {
      setLoadingImage(false); // Desativa o estado de loading
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  // Função que cria ou edita o veículo no contexto
  const confirmData = async () => {
    try {
      let updatedData;

      const fields = [model, brand, color, year, plate, renavam, kilometers, booster, sector, img];
      // Verifica se há campos obrigatórios vazios
      const hasEmptyField = fields.some((item) => item === '');

      if (hasEmptyField) {
        alert('Preencha todos os campos!');
        return;
      }

      let imageUrl;

      if (img) {
        imageUrl = await uploadImage(img);
        setImgKey(imageUrl);
      }
      const sectorDB = sectorsDB.find((item) => item.name === sector);

      const baseVeicule = {
        model,
        brand,
        color,
        year,
        plate,
        renavam,
        kilometers,
        booster,
        sector_id: sectorDB.id,
        imgKey: imageUrl || '',
        status: create ? 'Disponível' : statusBt ? 'Disponível' : 'Indisponível',
      };

      // Se for criação, chama a função createVeicule
      if (create) {
        await createVeicule(baseVeicule);
        updatedData = [...veiculesDB, baseVeicule];
      } else {
        // Se for atualização, chama a função updateVeicule
        await updateVeicule(id, baseVeicule);
        updatedData = veiculesDB.map((item) => (item.id === id ? { ...item, ...baseVeicule } : item));
      }
      setVeiculesDB(updatedData); // Atualiza os dados no contexto

      navigation.navigate('Veicules', {
        screen: 'Veicules',
        // params: { data: updatedData },
      });

    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response && error.response.data) {
        const { title, msg, icon } = error.response.data;
        setErrorData({ title, msg, icon });
      } else {
        setErrorData({
          title: 'Erro',
          msg: 'Erro inesperado ao cadastrar o veículo..',
          icon: 'close-circle',
        });
      }
      setVisible(true);
    } finally {
      setLoading(false); // Desativa o carregamento, independentemente do sucesso ou falha
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styleJS.containerForm} contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Inputs de Título e Localização */}
        <View style={styleJS.section}>
          <View style={styleJS.row}>
            <View style={[styleJS.statusBase, { backgroundColor: statusBt ? styleJS.statusGreen : styleJS.statusRed }]}>
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
          {/* Campos de entrada para as informações do veículo */}
          <InputField icon={'car'} placeholder={'Modelo'} value={model} func={setModel} editable={true} border={true} width={'100%'} />
          <InputField icon={'check-circle'} placeholder={'Marca'} value={brand} func={setBrand} editable={true} border={true} width={'100%'} />
          <View style={[styleJS.row, { borderBottomWidth: 0 }]}>
            <InputField icon={'invert-colors'} placeholder={'Cor'} value={color} func={setColor} editable={true} border={false} width={'50%'} />
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
        {/* Inputs para os dados adicionais do veículo */}
        <View style={styleJS.section}>
          <View style={styleJS.row}>
            <InputField icon={'keyboard'} placeholder={'Placa'} value={plate} func={setPlate} editable={true} border={false} width={'50%'} />
            <InputField icon={'keyboard'} placeholder={'Renavam'} value={renavam} func={setRenavam} editable={true} border={false} width={'50%'} />
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
            <InputField icon={'gas-station'} placeholder={'Tanque'} value={booster} func={setBooster} editable={true} border={false} width={'50%'} />
          </View>
          <SelectInput
            initialValue={'Selecione um setor'}
            value={sector}
            setValue={setSector}
            list={listSectorsDB}
            border={false}
            icon={'apps-box'}
            width={'100%'}
          />
        </View>
        {/* Container para selecionar a imagem do veículo */}
        <View style={[styleJS.veicule, img ? { borderWidth: 0 } : '']}>
          <TouchableOpacity onPress={pickImage} style={styleJS.imageButton}>
            {img ? (
              <Image source={{ uri: img }} style={styleJS.image} />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <IconWithLabel iconName={'camera'} size={18} color={styleJS.primaryColor} width={20} height={22} margin={0} />
                <Text style={styleJS.imagePlaceholderText}>Escolher Imagem</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* Botão para salvar as alterações */}
        <View>
          <Button
            style={''}
            icon='check-circle'
            mode='contained'
            loading={loadingImage}
            onPress={() => confirmData()}
            buttonColor={styleJS.colorButton}
          >
            <Text style={styleJS.textButton}>Confirmar</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewVeicule;
