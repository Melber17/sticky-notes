import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { BackHandler } from "react-native";
import Animated, {
	interpolateColor,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { CustomStatusBar } from "../CustomStatusBar";

interface IProps {
	index?: number;
	snapPoints: number[] | string[];
	bottomSheetRef: React.RefObject<BottomSheet>;
	handleCloseSheet: () => void;
	children?: React.ReactNode;
	backgroundColorStyle?: string;
}

export const WithBottomSheet: React.FC<IProps> = (props) => {
	const {
		children,
		backgroundColorStyle = "rgba(3, 6, 29, 0.3)",
		snapPoints,
		handleCloseSheet,
		index,
		bottomSheetRef,
	} = props;
	const isOpenShared = useSharedValue(1);
	const handleForceCloseSheet = () => {
		bottomSheetRef.current?.forceClose();
	};

	const handlePressBack = () => {
		bottomSheetRef.current?.close();

		return true;
	};

	function closeSheet () {
		isOpenShared.value = withTiming(0, { duration: 100 }, (isFinished) => {
			if (isFinished) {
				runOnJS(handleCloseSheet)();
			}
		});
	}

	const animatedStyles = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			isOpenShared.value,
			[0, 1],
			["rgba(3, 6, 29, 0)", backgroundColorStyle],
			"RGB"
		);

		return { backgroundColor };
	});

	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener("hardwareBackPress", handlePressBack);

			return () =>
				BackHandler.removeEventListener("hardwareBackPress", handlePressBack);
		}, [bottomSheetRef])
	);

	return (
		<Container style={[animatedStyles]}>
			<CustomStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent
				backgroundColorWrapper={animatedStyles}
			/>
			<CloseContainer onPress={handleForceCloseSheet} />
			<BottomSheet
				ref={bottomSheetRef}
				index={index ?? 1}
				enablePanDownToClose={true}
				onClose={closeSheet}
				snapPoints={snapPoints}
			>
				{children}
			</BottomSheet>
		</Container>
	);
};

const Container = styled(Animated.View)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	flex: 1;
	z-index: 100;
	height: 100%;
`;

const CloseContainer = styled.Pressable`
	flex: 1;
	height: 100%;
`;
