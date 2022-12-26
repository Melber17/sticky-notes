import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import {
	StatusBar,
	StatusBarStyle,
	Platform,
	View,
	useColorScheme,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DARK_BACKGROUND_COLOR, WHITE_COLOR } from "../../config";
import { PlatformType } from "../../lib";

interface BackgroundColorAnimatedStyle {
	backgroundColor: string | number;
}
interface IProps {
	backgroundColor?: string;
	backgroundColorWrapper?: BackgroundColorAnimatedStyle;
	barStyle?: StatusBarStyle;
	translucent?: boolean;
}

export const CustomStatusBar: React.FC<IProps> = ({
	backgroundColor = DARK_BACKGROUND_COLOR,
	barStyle = "light-content",
	translucent = false,
}) => {
	const isFocused = useIsFocused();
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme();

	const barStyleRef = React.useRef(
		colorScheme === "dark" ? "light-content" : "dark-content"
	);
	const backgroundColorRef = React.useRef(
		colorScheme === "dark" ? DARK_BACKGROUND_COLOR : WHITE_COLOR
	);

	function renderStatusBar () {
		if (isFocused) {
			if (
				backgroundColor === "transparent" &&
				Platform.OS === PlatformType.IOS
			) {
				return <></>;
			}
			if (Platform.OS === PlatformType.IOS) {
				return (
					<Animated.View
						style={[
							{
								height: insets.top,
								backgroundColor: barStyleRef.current,
							},
						]}
					>
						<StatusBar
							backgroundColor={backgroundColor}
							barStyle={barStyleRef.current as StatusBarStyle}
						/>
					</Animated.View>
				);
			}

			if (
				Platform.OS === PlatformType.ANDROID &&
				translucent &&
				backgroundColor === "transparent"
			) {
				return (
					<StatusBar
						backgroundColor={backgroundColorRef.current}
						barStyle={barStyle}
						translucent={translucent}
					/>
				);
			}

			if (Platform.OS === PlatformType.ANDROID && translucent) {
				return (
					<View style={[{ height: insets.top }]}>
						<StatusBar
							backgroundColor={backgroundColorRef.current}
							barStyle={barStyleRef.current as StatusBarStyle}
							translucent={translucent}
						/>
					</View>
				);
			}

			return (
				<View style={[{ height: insets.top }]}>
					<StatusBar
						backgroundColor={backgroundColorRef.current}
						barStyle={barStyleRef.current as StatusBarStyle}
						translucent={translucent}
					/>
				</View>
			);
		}
	}

	return <>{renderStatusBar()}</>;
};
