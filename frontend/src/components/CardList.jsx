/** @format */

import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { Switch } from 'react-native-paper';
import styleJS from './style';
import IconWithLabel from './IconWithLabel';

/**
 * Componente `CardList`
 *
 * O `CardList` é um componente reutilizável que exibe um cartão contendo texto, ícone e um botão interativo
 * que pode ser um botão de cancelamento ou um interruptor (switch), dependendo do tipo de cartão.
 * O tipo de cartão pode ser configurado para exibir diferentes comportamentos e estilos.
 *
 * **Comportamento e Estilo**
 * - Se o tipo do cartão for `"notify"`, o botão será um ícone de cancelamento, e o componente exibe uma tag.
 * - Se o tipo for outro, o botão exibido será um interruptor (`Switch`) para alternar entre dois estados.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - Identificador único do cartão, geralmente usado para identificá-lo nas ações (como exclusão).
 * @param {string} props.text1 - Texto exibido na primeira linha do cartão.
 * @param {string} props.text2 - Texto exibido na segunda linha do cartão.
 * @param {string} props.text3 - Texto adicional a ser exibido na terceira linha do cartão (opcional).
 * @param {string} props.tag - Tag associada ao cartão, exibida apenas para cartões do tipo "notify".
 * @param {string} props.icon - Nome do ícone a ser exibido ao lado do texto no cartão. O ícone é passado para o componente `IconWithLabel`.
 * @param {string} props.type - Tipo do cartão, pode ser `"notify"` ou qualquer outro valor:
 *     - `"notify"`: Exibe um botão de cancelamento.
 *     - Outro valor: Exibe um interruptor (`Switch`).
 * @param {function} props.onDelete - Função de callback que é chamada quando o botão de cancelamento é pressionado (somente para o tipo "notify").
 *
 * @returns {React.Element} Componente `CardList` renderizando um cartão com informações interativas.
 */
const CardList = ({ id, text1, text2, text3, tag, icon, type, setFunction, status = true }) => {
  let button;
  // Verifica o tipo de cartão para decidir qual botão exibir
  if (type === 'notify') {
    // Exibe um cartão com a tag e o botão de cancelamento
    button = (
      <View style={{ height: 60, gap: 5 }}>
        <Text style={{ fontSize: 12, color: '#54656F' }}>{tag}</Text>
        <TouchableOpacity style={styles.buttonCancel} onPress={() => setFunction(id)}>
          <IconWithLabel
            iconName={'close'}
            size={22}
            color={styleJS.primaryColor}
            width={22}
            height={22}
            margin={0}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    // Se o tipo não for "notify", exibe um interruptor
    const [isSwitchOn, setIsSwitchOn] = useState(status === 'Ativo');

    // Atualiza o estado se a prop `status` mudar
    useEffect(() => {
      setIsSwitchOn(status === 'Ativo');
    }, [status]);


    const onToggleSwitch = () => {
      setIsSwitchOn(!isSwitchOn);
	    setFunction(id)
    };

    // Exibe o switch para alternar entre dois estados
    button = (
      <View style={styles.containerIcon}>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color={styleJS.toggleButton}
        />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    
    <View style={styles.card}>
      {/* Exibe a área do ícone e o texto */}
      <View style={styles.containerletters}>
        <View style={styles.ico}>
          {/* Componente IconWithLabel exibe o ícone ao lado do texto */}
          <IconWithLabel
            iconName={icon}
            size={25}
            color={styleJS.primaryColor}
            width={30}
            height={30}
            margin={0}
          />
        </View>
      </View>
      {/* Exibe os detalhes do cartão: textos e o botão (cancelar ou switch) */}
      <View style={styles.cardDetails}>
        <View style={styles.cardText}>
          {/* Exibe os textos fornecidos (text1, text2, text3) */}
          <Text style={styles.text}>{text1}</Text>
          <Text style={styles.text}>{text2}</Text>
          {text3 && <Text style={styles.text}>{text3}</Text>}
        </View>
        {/* Renderiza o botão (cancelar ou switch) */}
        {button}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 90,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styleJS.whiteColor,
    gap: 10,
    borderBottomWidth: 1,
    borderColor: styleJS.borderColor,
  },
  containerletters: {
    borderRadius: '50%',
    height: 50,
    width: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: styleJS.imgCardColor,
  },
  letters: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: styleJS.titleColor,
    padding: 15,
  },
  ico: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetails: {
    width: '80%',
    paddingHorizontal: 5,
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 13,
  },
  containerIcon: {
    width: '18%',
  },
  cardText: {
    width: '83%',
  },
  text: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
  label: {
    marginBottom: 5,
  },
  buttonCancel:{
    alignItems:'flex-end'
  }
});
