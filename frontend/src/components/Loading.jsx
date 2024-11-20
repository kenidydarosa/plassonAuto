import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styleJS from './style';

const Loading = () => (
  <View style={{position:'absolute', top:'50%', left:'50%'}}>
  <ActivityIndicator animating={true} color={styleJS.primaryColor} />
  </View>
);

export default Loading;