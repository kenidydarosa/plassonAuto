// Importação dos componentes necessários do React Native e React Native Paper
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Provider } from 'react-native-paper';
import IconWithLabel from './IconWithLabel'; // Componente para renderizar ícones com rótulos
import styleJS from './style'; // Estilos globais

/**
 * Componente `SelectInput` permite ao usuário selecionar um item de uma lista exibida em um modal.
 * Ele é composto por um campo de entrada que, ao ser pressionado, abre um modal com uma lista de itens.
 * A seleção de um item atualiza o valor do campo de entrada.
 * 
 * @param {object} props - Propriedades passadas para o componente.
 * @param {string} props.initialValue - Valor inicial exibido no campo de entrada.
 * @param {string} props.value - Valor atual selecionado no campo de entrada.
 * @param {function} props.setValue - Função para atualizar o valor selecionado.
 * @param {Array<string>} props.list - Lista de itens a serem exibidos no modal.
 * @param {string} props.icon - Nome do ícone a ser exibido antes do texto no campo de entrada.
 * @param {number} props.width - Largura do campo de entrada.
 * @param {boolean} props.border - Se `true`, aplica um estilo de borda ao campo de entrada.
 * 
 * @returns {React.Element} O componente `SelectInput`, renderizando o campo de entrada e o modal de seleção.
 */
const SelectInput = ({ initialValue, value, setValue, list, icon, width, border, editable }) => {

  // Estado para controlar a visibilidade do modal
  const [visible, setVisible] = useState(false);
  
  // Função para exibir o modal
  const showModal = () => setVisible(true);

  // Função para esconder o modal
  const hideModal = () => setVisible(false);

  // Função chamada ao selecionar um item da lista no modal
  const handleSelectItem = (item) => {
    setValue(item); // Atualiza o valor selecionado
    hideModal(); // Fecha o modal
  };

  // Função para impedir que o clique dentro do modal feche o modal
  const handleModalClick = (event) => {
    event.stopPropagation(); // Impede a propagação do evento de clique para o overlay
  };

  return (
    // Provider do react-native-paper, necessário para alguns componentes visuais
    <Provider>
      <View
        style={[
          styles.containerInput,
          border ? styles.borderBotton : '', // Aplica a borda se a prop border for true
          { width: width }, // Define a largura do campo de entrada
        ]}
      >
        <View style={styles.ico}>
          {/* Componente IconWithLabel exibe um ícone ao lado de um rótulo */}
          <IconWithLabel
            iconName={icon} // Ícone a ser exibido
            size={18}
            color={styleJS.primaryColor} // Cor do ícone
            width={20}
            height={22}
            margin={0}
          />
        </View>

        {/* Botão para abrir o modal */}
        <TouchableOpacity style={styles.inputButton} onPress={showModal} disabled={editable}>
          <Text style={[styles.buttonLabel, !value ? {color:'#ccc'} : '']}>
            {value || initialValue} {/* Exibe o valor selecionado ou o valor inicial */}
          </Text>
          <View style={styles.ico}>
            {/* Ícone de seta para baixo, indicando que há uma lista para selecionar */}
            <IconWithLabel
              iconName={'chevron-down'}
              size={24}
              color={styleJS.primaryColor}
              width={24}
              height={22}
              margin={0}
            />
          </View>
        </TouchableOpacity>

        {/* Modal para exibir a lista de itens */}
        <Modal
          visible={visible} // Controle de visibilidade do modal
          transparent={true} // Torna o fundo do modal transparente
          animationType='none' // Animação de fade para o modal
          onRequestClose={hideModal} // Função chamada ao fechar o modal
        >
          {/* Overlay de fundo do modal */}
          <TouchableOpacity style={styles.modalOverlay} onPress={hideModal} disabled={editable}>
            {/* Container do menu de seleção */}
            <View style={styles.menuContainer} onTouchStart={handleModalClick}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Mapeia os itens da lista e os exibe como itens clicáveis */}
                {list.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectItem(item)} // Seleciona o item e fecha o modal
                    style={styles.menuItem}
                    disabled={editable}
                  >
                    <Text style={styles.menuItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </Provider>
  );
};

export default SelectInput;


const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 7,
    borderRadius: 7,
  },
  borderBotton: {
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  ico: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '80%',
    maxHeight: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 5,
  },
  scrollContainer: {
    paddingVertical: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
});

