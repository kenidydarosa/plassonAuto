// /** @format */

// import React from 'react';
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	Image,
// 	ActivityIndicator,
// 	TouchableOpacity,
// } from 'react-native';

// import IconWithLabel from './IconWithLabel';
// import images from '../config/ImageMap';
// import fontConfig from '../config/fontConfig';
// import { useNavigation } from '@react-navigation/native';
// import styleJS from './style';

// const Card = ({
// 	id,
// 	title,
// 	subtitle,
// 	imgKey,
// 	text1,
// 	text2,
// 	text3,
// 	text4,
// 	icon1,
// 	icon2,
// 	icon3,
// 	status,
// 	statusColor,
// 	statusFont,
// 	href,
// 	sendParams,
// 	create,
// }) => {
// 	const fontsLoaded = fontConfig(); // Usa a configuração de fontes
// 	const navigation = useNavigation(); // Acessa o hook de navegação

// 	if (!fontsLoaded) {
// 		return <ActivityIndicator size='large' color='#D13C3CFF' />;
// 	}

// 	Text.defaultProps = {
// 		...Text.defaultProps,
// 		style: {
// 			fontSize: 13,
// 			fontFamily: 'Poppins_400Regular',
// 		},
// 	};

// 	const handlePress = () => {
// 		if (href) {
// 			if (sendParams) {
// 				// Se sendParams for true, envia os parâmetros
// 				navigation.navigate(href, { create, id });
// 			} else {
// 				// Se sendParams for false, navega sem parâmetros
// 				navigation.navigate(href);
// 			}
// 		} else {
// 			console.warn('Nenhuma rota definida para este card!');
// 		}
// 	};

// 	const complement = text4 ? `- ${text4}` : '';
// 	const disabled = status === 'Indisponível' ? true : false;

// 	return (
// 		<TouchableOpacity onPress={handlePress} style={styles.card} /*disabled={disabled}*/>
// 			<View style={styles.header}>
// 				<View style={styles.containerTitle}>
// 					<Text style={styles.title}>{`${title} ${complement}`}</Text>
// 					<View style={[styles.status, { backgroundColor: statusColor }]}>
// 						<Text style={{ color: statusFont }}>{status}</Text>
// 					</View>
// 				</View>
// 				<Text>{subtitle}</Text>
// 			</View>
// 			<View style={styles.content}>
// 				<View style={styles.veicule}>
// 					<Image source={images[imgKey]} style={styles.image} />
// 				</View>
// 				<View style={styles.infoVeicule}>
// 					<View style={styles.flex}>
// 						<View style={styles.ico}>
// 							<IconWithLabel
// 								iconName={icon1}
// 								size={18}
// 								color={styleJS.primaryColor}
// 								width={20}
// 								height={22}
// 								margin={0}
// 							/>
// 						</View>
// 						<Text>{text1}</Text>
// 					</View>
// 					<View style={styles.flex}>
// 						<View style={styles.ico}>
// 							<IconWithLabel
// 								iconName={icon2}
// 								size={18}
// 								color={styleJS.primaryColor}
// 								width={20}
// 								height={22}
// 								margin={0}
// 							/>
// 						</View>
// 						<Text>{text2}</Text>
// 					</View>
// 					<View style={styles.flex}>
// 						<View style={styles.ico}>
// 							<IconWithLabel
// 								iconName={icon3}
// 								size={18}
// 								color={styleJS.primaryColor}
// 								width={20}
// 								height={22}
// 								margin={0}
// 							/>
// 						</View>
// 						<Text>{text3}</Text>
// 					</View>
// 				</View>
// 			</View>
// 		</TouchableOpacity>
// 	);
// };

// export default Card;

// const styles = StyleSheet.create({
// 	card: {
// 		width: '100%',
// 		paddingVertical: 10,
// 		borderBottomWidth: 1,
// 		borderColor: styleJS.borderColor,
// 	},
// 	header: {
// 		gap: 5,
// 	},

// 	containerTitle: {
// 		width: '100%',
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 	},
// 	title: {
// 		fontFamily: 'Poppins_500Medium',
// 		flexGrow: 1,
// 		maxWidth: '70%',
// 		color: styleJS.titleColor,
// 	},
// 	status: {
// 		paddingVertical: 3,
// 		paddingHorizontal: 10,
// 		borderRadius: 20,
// 		minWidth: 70,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		alignContent: 'center',
// 		height: 25,
// 	},
// 	content: {
// 		paddingVertical: 10,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginBottom: 5,
// 		gap: 10,
// 	},
// 	veicule: {
// 		width: '40%',
// 		borderRadius: 10,
// 		padding: 15,
// 		backgroundColor: styleJS.imgCardColor,
// 	},
// 	image: {
// 		width: '100%',
// 		height: 70,
// 	},
// 	flex: {
// 		flexDirection: 'row',
// 		alignItems: 'flex-end',
// 		gap: 5,
// 	},
// 	ico: {
// 		borderRadius: 20,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},

// 	infoVeicule: {
// 		gap: 10,
// 	},
// });

/** @format */
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import IconWithLabel from './IconWithLabel';
import images from '../config/ImageMap';
import fontConfig from '../config/fontConfig';
import { useNavigation } from '@react-navigation/native';
import styleJS from './style';

const Card = ({
	id,
	title,
	subtitle,
	imgUrl,
	text1,
	text2,
	text3,
	text4,
	icon1,
	icon2,
	icon3,
	status,
	statusColor,
	statusFont,
	href,
	sendParams,
	create,
}) => {
	const fontsLoaded = fontConfig();
	const navigation = useNavigation();

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" color="#D13C3CFF" />;
	}

	Text.defaultProps = {
		...Text.defaultProps,
		style: styles.defaultText,
	};

	const handlePress = () => {
		if (href) {
			navigation.navigate(href, sendParams ? { create, id } : undefined);
		} else {
			console.warn('Nenhuma rota definida para este card!');
		}
	};

	const complement = text4 ? `- ${text4}` : '';
	// const disabled = status === 'Indisponível';

	const imageSource = { uri: imgUrl };

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={styles.card}
		>
			<View style={styles.header}>
				<View style={styles.containerTitle}>
					<Text style={styles.title}>{`${title} ${complement}`}</Text>
					<View style={[styles.status, { backgroundColor: statusColor }]}>
						<Text style={{ color: statusFont }}>{status}</Text>
					</View>
				</View>
				<Text>{subtitle}</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.veicule}>
					<Image source={imageSource} style={styles.image} />
				</View>
				<View style={styles.infoVeicule}>
					{[icon1, icon2, icon3].map((icon, index) => (
						<View key={index} style={styles.flex}>
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
							<Text>{[text1, text2, text3][index]}</Text>
						</View>
					))}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		width: '100%',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderColor: styleJS.borderColor,
	},
	header: {
		gap: 5,
	},
	containerTitle: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontFamily: 'Poppins_500Medium',
		flexGrow: 1,
		maxWidth: '70%',
		color: styleJS.titleColor,
	},
	status: {
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: 20,
		minWidth: 70,
		alignItems: 'center',
		justifyContent: 'center',
		height: 25,
	},
	content: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
		gap: 10,
	},
	veicule: {
		width: '40%',
		borderRadius: 10,
		padding: 15,
		backgroundColor: styleJS.imgCardColor,
	},
	image: {
		width: '100%',
		height: 70,
	},
	flex: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: 5,
	},
	ico: {
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoVeicule: {
		gap: 10,
	},
	defaultText: {
		fontSize: 13,
		fontFamily: 'Poppins_400Regular',
	},
});
