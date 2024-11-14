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
import IconWithLabel from './IconWithLabel';
import styleJS from './style';

const SelectInput = ({ initialValue, value, setValue, list, icon, width, border }) => {

  const [visible, setVisible] = useState(false);
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSelectItem = (item) => {
    setValue(item)

    hideModal();
  };

  // Função para impedir que o clique dentro do modal feche o modal
  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Provider>
      <View
        style={[
          styles.containerInput,
          border ? styles.borderBotton : '',
          { width: width },
        ]}
      >
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

        {/* Botão para abrir o modal */}
        <TouchableOpacity style={styles.inputButton} onPress={showModal}>
          <Text style={styles.buttonLabel}>
            {value || initialValue}
          </Text>
          <View style={styles.ico}>
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

        <Modal
          visible={visible}
          transparent={true}
          animationType='fade'
          onRequestClose={hideModal}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={hideModal}>
            <View style={styles.menuContainer} onTouchStart={handleModalClick}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {list.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectItem(item)}
                    style={styles.menuItem}
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

export default SelectInput;
