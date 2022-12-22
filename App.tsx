import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";

export const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<SafeAreaView>
			<Text></Text>
		</SafeAreaView>
	);
};
