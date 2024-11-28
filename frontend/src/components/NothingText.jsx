import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import IconWithLabel from './IconWithLabel';
import fontConfig from '../config/fontConfig';
import styleJS from './style';

const NothingText = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Que pena!</Text>
      <Text style={styles.text}>Ainda não tem nada por aqui... </Text>
      <Text style={{fontSize:30}}>😕</Text>
      {/* <View style={styles.ico}>
        <IconWithLabel
          iconName={'database-remove-outline'}
          size={40}
          color={styleJS.primaryColor}
          width={50}
          height={50}
          margin={0}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    borderRadius: 10,
    gap:10,
    borderWidth: 1,
    borderColor: styleJS.primaryColor,
    marginTop: 30,
    alignItems:'center'  
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default NothingText;
