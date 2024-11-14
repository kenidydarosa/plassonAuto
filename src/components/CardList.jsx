/** @format */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Switch } from 'react-native-paper';
import styleJS from './style';
import IconWithLabel from './IconWithLabel';

const CardList = ({ id, text1, text2, text3, tag, icon, type, onDelete }) => {
	let button;
	if (type === 'notify') {
		button = (
			<View style={{ height: 60, gap: 5}}>
				<Text style={{ fontSize: 12, color: '#54656F' }}>{tag}</Text>
				<TouchableOpacity style={styles.buttonCancel} onPress={() => onDelete(id)}>
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
		const [isSwitchOn, setIsSwitchOn] = useState(true);
		const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
		<View style={styles.card}>
			<View style={styles.containerletters}>
				<View style={styles.ico}>
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
			<View style={styles.cardDetails}>
				<View style={styles.cardText}>
					<Text style={styles.text}>{text1}</Text>
					<Text style={styles.text}>{text2}</Text>
					{text3 && <Text style={styles.text}>{text3}</Text>}
				</View>
				{button}
			</View>
		</View>
	);
};

export default CardList;

// Estilos
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
		width:'80%',
		paddingHorizontal:5,
		flexGrow: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 13,
	},
	containerIcon: {
		width: '25%',
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
});
