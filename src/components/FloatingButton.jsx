/** @format */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Provider } from 'react-native-paper';
import styleJS from './style';

const FloatingButton = ({ onPress }) => {
	return (
		<Provider>
			<View style={styles.container}>
				<FAB
					style={styles.fab}
					icon='plus'
					color={styleJS.titleColor}
					onPress={onPress} 
				/>
			</View>
		</Provider>
	);
};

export default FloatingButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fab: {
		backgroundColor: '#fff',
		position: 'absolute',
		margin: 16,
		right: 10,
		bottom: 0,
		borderRadius:'50%'
	},
});
