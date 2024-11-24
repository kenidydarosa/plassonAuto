/** @format */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import IconWithLabel from './IconWithLabel';
import fontConfig from '../config/fontConfig';
import { useNavigation } from '@react-navigation/native';
import styleJS from './style';
import Loading from './Loading';

/**
 * Componente `Card` exibe um cartão com título, subtítulo, imagem, status e informações adicionais.
 * Ele pode navegar para uma nova tela ao ser clicado, com parâmetros personalizados.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - Identificador único do cartão.
 * @param {string} props.title - Título do cartão.
 * @param {string} props.subtitle - Subtítulo do cartão.
 * @param {string} props.imgUrl - URL da imagem a ser exibida no cartão.
 * @param {string} props.text1 - Texto associado ao primeiro ícone.
 * @param {string} props.text2 - Texto associado ao segundo ícone.
 * @param {string} props.text3 - Texto associado ao terceiro ícone.
 * @param {string} props.text4 - Texto adicional a ser exibido após o título.
 * @param {string} props.icon1 - Nome do primeiro ícone a ser exibido.
 * @param {string} props.icon2 - Nome do segundo ícone a ser exibido.
 * @param {string} props.icon3 - Nome do terceiro ícone a ser exibido.
 * @param {string} props.status - Status exibido no cartão (ex: "Disponível", "Indisponível").
 * @param {string} props.statusColor - Cor de fundo do status.
 * @param {string} props.statusFont - Cor do texto do status.
 * @param {string} props.href - Rota de navegação para onde o cartão deve redirecionar ao ser clicado.
 * @param {Object} props.sendParams - Parâmetros a serem enviados para a próxima tela na navegação.
 * @param {boolean} props.create - Flag que pode ser passada para a navegação.
 *
 * @returns {React.Element} Componente `Card` exibindo um cartão interativo com navegação e informações.
 */

const Card = ({
  id,
  title,
  subtitle,
  imgUrl,
  text1,
  text2,
  text3,
  text4,
  icon1,
  icon2,
  icon3,
  status,
  statusColor,
  statusFont,
  href,
  sendParams,
  create,
}) => {
  const fontsLoaded = fontConfig();
  const navigation = useNavigation();
  const [loadingImage, setLoadingImage] = useState(true);

  // Configurações padrão para o texto
  Text.defaultProps = {
    ...Text.defaultProps,
    style: styles.defaultText,
  };

  // Função para lidar com o clique no cartão e navegação
  const handlePress = () => {
    if (href) {
      navigation.navigate(href, sendParams ? { create, id } : undefined);
    } else {
      console.warn('Nenhuma rota definida para este card!');
    }
  };

  // Complemento de texto adicional
  const complement = text4 ? `- ${text4}` : '';
  // Fonte de imagem
  const imageSource = { uri: imgUrl };

  return (
    <TouchableHighlight onPress={handlePress} style={styles.card} underlayColor={styleJS.whiteColor}>
  <View>
    {/* Header do cartão */}
    <View style={styles.header}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{`${title} ${complement}`}</Text>
        <View style={[styles.status, { backgroundColor: statusColor }]}>
          <Text style={{ color: statusFont }}>{status}</Text>
        </View>
      </View>
      <Text>{subtitle}</Text>
    </View>
    {/* Conteúdo do cartão */}
    <View style={styles.content}>
      <View style={styles.veicule}>
        {loadingImage && <Loading />}
        <Image
          source={imageSource}
          style={styles.image}
          onLoad={() => setLoadingImage(false)}
          onError={() => setLoadingImage(true)}
        />
      </View>
      <View style={styles.infoVeicule}>
        {[icon1, icon2, icon3].map((icon, index) => (
          <View key={index} style={styles.flex}>
            <View style={styles.ico}>
              <IconWithLabel
                iconName={icon}
                size={18}
                color={styleJS.primaryColor}
                width={20}
                height={22}
                margin={0}
              />
            </View>
            <Text>{[text1, text2, text3][index]}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
</TouchableHighlight>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: styleJS.borderColor,
  },
  header: {
    gap: 5,
  },
  containerTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    flexGrow: 1,
    maxWidth: '70%',
    color: styleJS.titleColor,
  },
  status: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
  },
  content: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  veicule: {
    width: '40%',
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
    position:'relative',
    backgroundColor: styleJS.imgCardColor,
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  ico: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoVeicule: {
    gap: 10,
  },
  defaultText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
});
