import React, {useState} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Button,
} from 'react-native';
import CrossSvg from '../../img/svg/CrossSvg';
import Animated, {
	cond,
	eq,
	Extrapolate,
	interpolate,
	set,
	useCode,
	Value,
	Easing,
	block,
	clockRunning,
	stopClock,
	debug,
	timing,
	startClock,
	Clock,
	color,
} from 'react-native-reanimated';
import ArrowSvg from '../../img/svg/ArrowSvg';

function runTiming(clock, value, dest) {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0),
	};

	const config = {
		duration: 300,
		toValue: new Value(0),
		easing: Easing.linear,
	};

	return block([
		cond(
			clockRunning(clock),
			[
				// if the clock is already running we update the toValue, in case a new dest has been passed in
				set(config.toValue, dest),
			],
			[
				// if the clock isn't running we reset all the animation params and start the clock
				set(state.finished, 0),
				set(state.time, 0),
				set(state.position, value),
				set(state.frameTime, 0),
				set(config.toValue, dest),
				startClock(clock),
			],
		),
		// we run the step here that is going to update position
		timing(clock, state, config),
		// if the animation is over we stop the clock
		cond(state.finished, debug('stop clock', stopClock(clock))),
		// we made the block return the updated position
		state.position,
	]);
}

const buttonWidth = 350;
const buttonHeight = 70;

const SendButton = () => {
	const [status, setStatus] = useState('init');
	const [animationHelpful, setAnimationHelpful] = useState(new Value(0));
	const [animationHelpfulSecondStep, setAnimationHelpfulSecondStep] = useState(
		new Value(0),
	);

	let optionContent = null;
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
	} else if (status === 'firstStep') {
		optionContent = <CrossSvg width={20} height={20} color={'#fff'} />;
	} else if (status === 'secondStep') {
		optionContent = <CrossSvg width={20} height={20} color={'#fff'} />;
	}

	const animation = new Value(0);
	const firstStepClock = new Clock();

	const buttonWidthInterpolate = interpolate(animation, {
		inputRange: [0, 0.5],
		outputRange: [150, buttonWidth],
		extrapolate: Extrapolate.CLAMP,
	});
	const optionsWidth = interpolate(animation, {
		inputRange: [0, 0.5],
		outputRange: [150, buttonHeight],
		extrapolate: Extrapolate.CLAMP,
	});

	useCode(() => {
		return [
			cond(eq(animationHelpful, 0), [
				set(animation, runTiming(firstStepClock, animation, 0)),
			]),
			cond(eq(animationHelpful, 1), [
				set(animation, runTiming(firstStepClock, animation, 1)),
			]),
		];
	}, [animationHelpful]);

	const startSend = () => {
		setAnimationHelpful(new Value(1));
		setStatus('firstStep');
		setTimeout(() => {
			setStatus('va');
		}, 1000);
	};
	return (
		<>
			<View style={styles.buttonContainer}>
				<TouchableWithoutFeedback onPress={startSend}>
					<Animated.View
						style={[
							styles.buttonOptionPart,
							{
								width: optionsWidth,
								backgroundColor:
									status === 'firstStep' && status !== 'secondStep'
										? 'red'
										: '#53485b',
							},
						]}>
						{optionContent}
					</Animated.View>
				</TouchableWithoutFeedback>
				<Animated.View
					style={[styles.buttonContentPart, {width: buttonWidthInterpolate}]}>
					<Text style={[styles.text, styles.errorColorText]}>
						Ooops! Something went wrong!
					</Text>
				</Animated.View>
			</View>
			<Button
				title={'reset'}
				onPress={() => {
					setStatus('init');
					animationHelpful.setValue(0);
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
