// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */
//
// import React, {useState} from 'react';
// import {Alert, Button, Easing, SafeAreaView, Text, View} from 'react-native';
// import ArrowSvg from './img/svg/ArrowSvg';
// import SendButton from './components/sendButton';
// import Animated, {
// 	block,
// 	Clock,
// 	cond,
// 	eq,
// 	Extrapolate,
// 	interpolate,
// 	set,
// 	startClock,
// 	timing,
// 	useCode,
// 	Value,
// } from 'react-native-reanimated';
//
// //2020-07-12 23:13:28.255751+0300 animatedSendButton[5722:99185]  SFCompact-Regular
// // 2020-07-12 23:13:28.255859+0300 animatedSendButton[5722:99185]  SFCompact-RegularItalic
// // 2020-07-12 23:13:28.255961+0300 animatedSendButton[5722:99185]  SFCompact-Ultralight
// // 2020-07-12 23:13:28.256066+0300 animatedSendButton[5722:99185]  SFCompact-UltralightItalic
// // 2020-07-12 23:13:28.256165+0300 animatedSendButton[5722:99185]  SFCompact-Thin
// // 2020-07-12 23:13:28.256268+0300 animatedSendButton[5722:99185]  SFCompact-ThinItalic
// // 2020-07-12 23:13:28.256364+0300 animatedSendButton[5722:99185]  SFCompact-Light
// // 2020-07-12 23:13:28.256485+0300 animatedSendButton[5722:99185]  SFCompact-LightItalic
// // 2020-07-12 23:13:28.256574+0300 animatedSendButton[5722:99185]  SFCompact-Medium
// // 2020-07-12 23:13:28.256698+0300 animatedSendButton[5722:99185]  SFCompact-MediumItalic
// // 2020-07-12 23:13:28.256805+0300 animatedSendButton[5722:99185]  SFCompact-Semibold
// // 2020-07-12 23:13:28.256916+0300 animatedSendButton[5722:99185]  SFCompact-SemiboldItalic
// // 2020-07-12 23:13:28.257006+0300 animatedSendButton[5722:99185]  SFCompact-Bold
// // 2020-07-12 23:13:28.257143+0300 animatedSendButton[5722:99185]  SFCompact-BoldItalic
// // 2020-07-12 23:13:28.257313+0300 animatedSendButton[5722:99185]  SFCompact-Heavy
// // 2020-07-12 23:13:28.257469+0300 animatedSendButton[5722:99185]  SFCompact-HeavyItalic
// // 2020-07-12 23:13:28.257668+0300 animatedSendButton[5722:99185]  SFCompact-Black
// // 2020-07-12 23:13:28.257840+0300 animatedSendButton[5722:99185]  SFCompact-BlackItalic
//
// const runTiming = (clock, from, to) => {
// 	const state = {
// 		finished: new Value(0),
// 		position: new Value(0),
// 		time: new Value(0),
// 		frameTime: new Value(0),
// 	};
// 	const config = {
// 		duration: 500,
// 		toValue: new Value(0),
// 		easing: Easing.inOut(Easing.ease),
// 	};
// 	return block([
// 		cond(
// 			clock,
// 			[set(config.toValue, to)],
// 			[
// 				set(state.finished, 0),
// 				set(state.time, 0),
// 				set(state.position, from),
// 				set(state.frameTime, 0),
// 				set(config.toValue, to),
// 				startClock(clock),
// 			],
// 		),
// 		timing(clock, state, config),
// 		state.position,
// 	]);
// };
//
// const App: () => React$Node = () => {
// 	const [isStart, setIsStart] = useState(false);
// 	const firstAnimation = new Value(0);
// 	const secondAnimation = new Value(0);
// 	let firstClock = new Clock();
// 	let secondClock = new Clock();
//
// 	useCode(() => {
// 		return [
// 			cond(eq(isStart, true), [
// 				set(firstAnimation, runTiming(firstClock, firstAnimation, 1)),
// 			]),
// 		];
// 	}, [isStart]);
// 	const width = interpolate(firstAnimation, {
// 		inputRange: [0, 1],
// 		outputRange: [100, 300],
// 		extrapolate: Extrapolate.CLAMP,
// 	});
//
// 	const startAnimation = () => {
// 		setIsStart(true);
// 	};
//
// 	return (
// 		<SafeAreaView style={{flex: 1, backgroundColor: '#eeeded'}}>
// 			<Text
// 				style={{
// 					fontSize: 20,
// 					textAlign: 'center',
// 					fontFamily: 'SFCompact-Black',
// 				}}>
// 				Send Button
// 			</Text>
// 			<View
// 				style={{
// 					height: 2,
// 					backgroundColor: '#0e0e0e',
// 					marginTop: 10,
// 					opacity: 0.5,
// 				}}
// 			/>
// 			{/*<View*/}
// 			{/*	style={{*/}
// 			{/*		flex: 1,*/}
// 			{/*		justifyContent: 'center',*/}
// 			{/*		alignItems: 'center',*/}
// 			{/*	}}>*/}
// 			{/*	<SendButton />*/}
// 			{/*</View>*/}
//
// 			<Animated.View
// 				style={{width: width, height: 100, backgroundColor: 'red'}}
// 			/>
// 			<Button title={'start'} onPress={startAnimation} />
// 		</SafeAreaView>
// 	);
// };
//
// export default App;

import React from 'react';
import {Animated, Button, Easing, SafeAreaView, Text, View} from 'react-native';

const App = () => {
	const width = new Animated.Value(100);
	const height = new Animated.Value(100);
	const trY = width.interpolate({
		inputRange: [100, 300],
		outputRange: [0, 500], // 0 : 150, 0.5 : 75, 1 : 0
	});
	const widthAnim = Animated.timing(width, {
		duration: 500,
		easing: Easing.inOut(Easing.ease),
		delay: 0,
		toValue: 300,
		useNativeDriver: false,
	});
	const heigthAnim = Animated.timing(height, {
		duration: 500,
		easing: Easing.inOut(Easing.ease),
		delay: 0,
		toValue: 300,
		useNativeDriver: false,
	});

	const animate = () => {
		Animated.sequence([widthAnim, heigthAnim]).start();
	};
	return (
		<SafeAreaView style={{borderWidth: 1}}>
			<Animated.View
				style={{
					width: width,
					height: height,
					backgroundColor: 'red',
					borderWidth: 1,
					transform: [
						{
							translateY: trY,
						},
					],
				}}
			/>
			<Button title={'animate'} onPress={animate} />
		</SafeAreaView>
	);
};
export default App;
