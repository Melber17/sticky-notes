import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

import { RootScreens } from "./config";
import { HomeScreen } from "./Home";
import i18next from "../shared/lib/i18n";
import { CreateNoteScreen } from "./CreateNote";
import { useAppDispatch } from "../shared/lib";
import { initializeNotesData, INoteResponse } from "../entities/note";

export type RootStackListType = {
	HomeScreen: undefined;
	CreateNoteScreen: {editable: boolean; note?: INoteResponse};
};

const Stack = createNativeStackNavigator<RootStackListType>();

export const Routing: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleLaunchApp = async () => {
		await dispatch(initializeNotesData());
		SplashScreen.hide();

	};

	useEffect(() => {
		handleLaunchApp();
	}, []);

	useEffect(() => {

		PushNotification.configure({
			onNotification: function (notification) {
				console.log("LOCAL NOTIFICATION ==>", notification);
			},

			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},
			popInitialNotification: true,
			requestPermissions: Platform.OS === "ios",
		});
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
			<Stack.Screen name={RootScreens.CREATE_NOTE} component={CreateNoteScreen} />

		</Stack.Navigator>
	);
};
