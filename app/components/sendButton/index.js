import React, {useEffect, useState} from 'react';
import {
	Animated,
	Button,
	Easing,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import ArrowSvg from '../../img/svg/ArrowSvg';

const buttonWidth = 350;
const buttonHeight = 70;

const SendButton = () => {
	const [status, setStatus] = useState('init');
	const buttonContentWidthAnimatedValue = new Animated.Value(150);
	const buttonOptionWidthAnimatedValue = new Animated.Value(150);
	const barDownloadWidth = new Animated.Value(0);
	let optionContent = null;
	let content = null;
	if (status === 'init') {
		optionContent = (
			<View
				style={{
					flexDirection: 'row',
				}}>
				<Text
					style={[
						styles.text,
						{color: '#fff', marginRight: 20, marginLeft: 0},
					]}>
					Submit
				</Text>
				<ArrowSvg width={20} height={20} color={'#fff'} />
			</View>
		);
	} else if (status === 'loadingStart') {
		content = (
			<View>
				<View
					style={{
						width: buttonWidth - buttonHeight - 20,
						height: 5,
						// borderWidth: 1,
						borderTopRightRadius: 10,
						borderBottomRightRadius: 10,
					}}>
					<Animated.View
						style={{
							...StyleSheet.absoluteFill,
							backgroundColor: 'green',
							width: barDownloadWidth,
							borderTopRightRadius: 10,
							borderBottomRightRadius: 10,
						}}
					/>
				</View>
			</View>
		);
		optionContent = (
			<View
				style={{
					flexDirection: 'row',
					width: buttonHeight - 30,
					justifyContent: 'space-around',
				}}>
				<View
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#fff',
						borderRadius: 5,
					}}
				/>
				<View
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#fff',
						borderRadius: 5,
					}}
				/>
				<View
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#fff',
						borderRadius: 5,
					}}
				/>
			</View>
		);
	}

	useEffect(() => {
		console.log(status);
		if (status === 'loadingStart') {
			Animated.parallel([
				Animated.timing(buttonContentWidthAnimatedValue, {
					duration: 500,
					easing: Easing.inOut(Easing.ease),
					delay: 0,
					toValue: buttonWidth,
					useNativeDriver: false,
				}),
				Animated.timing(buttonOptionWidthAnimatedValue, {
					duration: 500,
					easing: Easing.inOut(Easing.ease),
					delay: 0,
					toValue: buttonHeight,
					useNativeDriver: false,
				}),
			]).start(() => {
				Animated.timing(barDownloadWidth, {
					duration: 2000,
					easing: Easing.inOut(Easing.ease),
					delay: 0,
					toValue: buttonWidth - buttonHeight - 20,
					useNativeDriver: false,
				}).start();
			});
		}
	}, [status]);

	const startSend = () => {
		setStatus('loadingStart');
	};
	return (
		<>
			<View style={styles.buttonContainer}>
				<TouchableWithoutFeedback onPress={startSend}>
					<Animated.View
						style={[
							styles.buttonOptionPart,
							{width: buttonOptionWidthAnimatedValue},
						]}>
						{optionContent}
					</Animated.View>
				</TouchableWithoutFeedback>
				<Animated.View
					style={[
						styles.buttonContentPart,
						{width: buttonContentWidthAnimatedValue},
					]}>
					<Text style={[styles.text, styles.errorColorText]}>{content}</Text>
				</Animated.View>
			</View>
			<Button
				title={'reset'}
				onPress={() => {
					Animated.parallel([
						Animated.timing(buttonContentWidthAnimatedValue, {
							duration: 500,
							easing: Easing.inOut(Easing.ease),
							delay: 0,
							toValue: 150,
							useNativeDriver: false,
						}),
						Animated.timing(buttonOptionWidthAnimatedValue, {
							duration: 500,
							easing: Easing.inOut(Easing.ease),
							delay: 0,
							toValue: 150,
							useNativeDriver: false,
						}),
					]).start(() => setStatus('init'));
				}}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
	},
	buttonOptionPart: {
		...StyleSheet.absoluteFill,
		width: buttonHeight,
		height: buttonHeight,
		borderRadius: buttonHeight / 2,
		backgroundColor: '#53485b',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		overflow: 'hidden',
	},
	buttonContentPart: {
		backgroundColor: '#fff',
		width: buttonWidth,
		height: buttonHeight,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: buttonHeight / 2,
		overflow: 'hidden',
	},
	text: {
		marginLeft: 50,
		fontFamily: 'SFCompact-Medium',
		fontSize: 16,
	},
	errorColorText: {
		color: 'red',
	},
	errorColorBg: {
		backgroundColor: 'red',
	},
});
export default SendButton;
