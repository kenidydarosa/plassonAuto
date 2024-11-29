import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import IconWithLabel from './IconWithLabel';
import fontConfig from '../config/fontConfig';
import styleJS from './style';

const NothingText = ({title, msg, ico}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{msg}</Text>
      <Text style={{fontSize:30}}>{ico}</Text>
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
    textAlign:'center',  
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default NothingText;
