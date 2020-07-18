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
import ReloadSvg from '../../img/svg/ReloadSvg';

const buttonWidth = 350;
const buttonHeight = 70;
const jumpLoadingTime = 120;

const SendButton = () => {
	const [status, setStatus] = useState('init');
	const buttonContentWidthAnimatedValue = new Animated.Value(150);
	const buttonOptionWidthAnimatedValue = new Animated.Value(150);
	const barDownloadWidth = new Animated.Value(0);

	const topOffsetOne = new Animated.Value(0);
	const topOffsetTwo = new Animated.Value(0);
	const topOffsetThree = new Animated.Value(0);

	const errorMessageDropDown = new Animated.Value(-30);

	const optionContentBg = errorMessageDropDown.interpolate({
		inputRange: [-30, 0],
		outputRange: ['#53485b', 'red'],
		extrapolate: 'clamp',
	});

	const errorMessageOpacity = errorMessageDropDown.interpolate({
		inputRange: [-30, 0],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});

	let optionContent = null;
	let content = null;

	const repeatAnimation = () => {
		resetAnimation();
	};
	const resetAnimation = () => {
		setStatus('init');
		buttonContentWidthAnimatedValue.setValue(150);
		buttonOptionWidthAnimatedValue.setValue(150);
		barDownloadWidth.setValue(0);

		topOffsetOne.setValue(0);
		topOffsetTwo.setValue(0);
		topOffsetThree.setValue(0);
		errorMessageDropDown.setValue(0);
	};

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
				<Animated.View
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#fff',
						borderRadius: 5,
						transform: [{translateY: topOffsetOne}],
					}}
				/>
				<Animated.View
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#fff',
						borderRadius: 5,
						transform: [{translateY: topOffsetTwo}],
					}}
				/>
				<Animated.View
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#fff',
						borderRadius: 5,
						transform: [{translateY: topOffsetThree}],
					}}
				/>
			</View>
		);
	} else if (status === 'finishLoading') {
		content = (
			<Animated.View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					opacity: errorMessageOpacity,
					transform: [{translateY: errorMessageDropDown}],
				}}>
				<Text style={{color: 'red'}}>Ooops! something went wrong</Text>
			</Animated.View>
		);
		optionContent = (
			<TouchableWithoutFeedback
				onPress={repeatAnimation}
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Animated.View
					style={{
						flex: 1,
						opacity: errorMessageOpacity,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: optionContentBg,
						width: buttonOptionWidthAnimatedValue,
					}}>
					<ReloadSvg width={20} height={20} color={'#fff'} />
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
	const getJumpCircleAnimation = () => {
		return Animated.sequence([
			Animated.timing(topOffsetOne, {
				duration: jumpLoadingTime,
				easing: Easing.inOut(Easing.ease),
				toValue: -10,
				useNativeDriver: false,
			}),
			Animated.timing(topOffsetTwo, {
				duration: jumpLoadingTime,
				easing: Easing.inOut(Easing.ease),
				toValue: -10,
				useNativeDriver: false,
			}),
			Animated.timing(topOffsetThree, {
				duration: jumpLoadingTime,
				easing: Easing.inOut(Easing.ease),
				toValue: -10,
				useNativeDriver: false,
			}),
		]);
	};
	const getDownCircleAnimation = () => {
		return Animated.sequence([
			Animated.timing(topOffsetOne, {
				duration: jumpLoadingTime,
				easing: Easing.inOut(Easing.ease),
				toValue: 0,
				useNativeDriver: false,
			}),
			Animated.timing(topOffsetTwo, {
				duration: jumpLoadingTime,
				easing: Easing.inOut(Easing.ease),
				toValue: 0,
				useNativeDriver: false,
			}),
			Animated.timing(topOffsetThree, {
				duration: jumpLoadingTime,
				easing: Easing.inOut(Easing.ease),
				toValue: 0,
				useNativeDriver: false,
			}),
		]);
	};
	const getLoopLoadingCicleAnimation = () => {
		return Animated.loop(
			Animated.sequence([getJumpCircleAnimation(), getDownCircleAnimation()]),
		);
	};

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
				Animated.parallel([
					Animated.timing(barDownloadWidth, {
						duration: 2000,
						easing: Easing.inOut(Easing.ease),
						delay: 0,
						toValue: buttonWidth - buttonHeight - 20,
						useNativeDriver: false,
					}).start(() => {
						getLoopLoadingCicleAnimation().stop();
						Animated.sequence([
							Animated.timing(topOffsetOne, {
								duration: jumpLoadingTime,
								toValue: 0,
								useNativeDriver: false,
							}),
							Animated.timing(topOffsetTwo, {
								duration: jumpLoadingTime,
								toValue: 0,
								useNativeDriver: false,
							}),
							Animated.timing(topOffsetThree, {
								duration: jumpLoadingTime,
								toValue: 0,
								useNativeDriver: false,
							}),
						]).start();
					}),
					getLoopLoadingCicleAnimation(),
				]).start(() => {
					setStatus('finishLoading');
				});
			});
		}
		if (status === 'finishLoading') {
			Animated.timing(errorMessageDropDown, {
				duration: 500,
				toValue: 0,
				useNativeDriver: false,
			}).start();
		}
	}, [status]);

	const startSend = () => {
		setStatus('loadingStart');
	};
	return (
		<>
			<View style={styles.buttonContainer}>
				<TouchableWithoutFeedback
					onPress={status === 'init' ? startSend : repeatAnimation}>
					<Animated.View
						style={[
							styles.buttonOptionPart,
							{
								width: buttonOptionWidthAnimatedValue,
							},
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
