import React from "react";
import { useColorScheme, Platform, StatusBar, StatusBarStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { PlatformType } from "../../lib";
import { CustomStatusBar } from "../CustomStatusBar";

interface IProps {
	backgroundColor?: string;
	barStyle?: StatusBarStyle;
	children?: React.ReactNode;
}

export const WithSafeArea: React.FC<IProps> = ({
	children,
	backgroundColor,
	barStyle = "dark-content",
}) => {
	const { top } = useSafeAreaInsets();

	useColorScheme();

	const handleRenderSafeArea = () => {
		if (Platform.OS === PlatformType.ANDROID) {
			return (
				<SafeAreaAndroid >
					<CustomStatusBar translucent />
					{children}
				</SafeAreaAndroid>
			);
		}

		return (
			<SafeAreaIOS inset={top} backgroundColor={backgroundColor}>
				<StatusBar translucent barStyle={barStyle} />
				{children}
			</SafeAreaIOS>
		);
	};

	return <>{handleRenderSafeArea()}</>;
};

const SafeAreaAndroid = styled.SafeAreaView`
	flex: 1;
	background: ${(props) => props.theme.colors.background};
`;

const SafeAreaIOS = styled.SafeAreaView<{
	backgroundColor?: string;
	inset: number;
}>`
	flex: 1;
	margin-top: ${({ inset }) => inset}px;
	background: ${(props) =>
		props.backgroundColor ?? props.theme.colors.background};
`;
