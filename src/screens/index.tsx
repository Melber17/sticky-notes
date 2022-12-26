import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

import { RootScreens } from "./config";
import { HomeScreen } from "./Home";
import i18next from "../shared/lib/i18n";

export type RootStackListType = {
	HomeScreen: undefined;
	CreateNoteScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackListType>();

export const Routing: React.FC = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	if (!i18next.isInitialized) {
		return null;
	}

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={RootScreens.HOME}
		>
			<Stack.Screen name={RootScreens.HOME} component={HomeScreen} />
		</Stack.Navigator>
	);
};
