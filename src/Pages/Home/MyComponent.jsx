import React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const MyComponent = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator
        size="large"
        color={MD2Colors.red800}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    zIndex: 9999, // Garante que o overlay fique no topo de outros elementos
  },
});

export default MyComponent;
