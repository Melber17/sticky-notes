import React, { useEffect } from "react";
import { Modal, useWindowDimensions } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ICustomAlertProps {
	isVisible: boolean;
	onClose: () => void;
	children: JSX.Element;
}

export const CustomModal: React.FC<ICustomAlertProps> = ({
	isVisible,
	onClose,
	children,
}) => {
	const opacityContainer = useSharedValue(0);
	const opacityAlert = useSharedValue(0);
	const { width, height } = useWindowDimensions();
	const insets = useSafeAreaInsets();

	const handleStartAlertAnimation = () => {
		opacityContainer.value = withTiming(1);

		opacityAlert.value = withDelay(200, withTiming(1));
	};

	const handleFinishAlertAnimation = () => {
		opacityAlert.value = withTiming(0);

		opacityContainer.value = withDelay(
			200,
			withTiming(0, {}, (isFinished) => {
				if (isFinished) {
					runOnJS(onClose)();
				}
			})
		);
	};

	useEffect(() => {
		if (isVisible) {
			handleStartAlertAnimation();
		}
	}, [isVisible]);

	const containerModalAnimatedStyles = useAnimatedStyle(() => {
		return {
			opacity: opacityContainer.value,
		};
	});

	const alertAnimatedStyles = useAnimatedStyle(() => {
		return {
			opacity: opacityAlert.value,
		};
	});

	return (
		<Modal
			statusBarTranslucent
			transparent
			visible={isVisible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<Container
				insetBottom={insets.bottom}
				insetTop={insets.top}
				style={containerModalAnimatedStyles}
				width={width}
				height={height}
			>
				<BackgroundButton onPress={handleFinishAlertAnimation} />
				<AlertContainer style={alertAnimatedStyles}>{children}</AlertContainer>
			</Container>
		</Modal>
	);
};

const Container = styled(Animated.View)<{
	width: number;
	height: number;
	insetTop: number;
	insetBottom: number;
}>`
	width: 100%;
	height: 100%;
	background: rgba(52, 52, 52, 0.5);
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
`;

const BackgroundButton = styled.Pressable`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const AlertContainer = styled(Animated.View)`
	width: 70%;
	align-items: center;
	justify-content: center;
	background: ${(props) => props.theme.colors.background};
	border-radius: 15px;
	z-index: 110;
`;
