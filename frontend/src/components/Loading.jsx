import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styleJS from './style';

const Loading = () => (
  <View style={{position:'absolute'}}>
    <ActivityIndicator animating={true} color={styleJS.primaryColor} />
  </View>
);

export default Loading;
