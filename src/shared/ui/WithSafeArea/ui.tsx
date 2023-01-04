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
}) => {
	const { top } = useSafeAreaInsets();

	const colorScheme = useColorScheme();

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
				<StatusBar
					translucent
					barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
				/>
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
	background: ${(props) => props.theme.colors.background};
`;
