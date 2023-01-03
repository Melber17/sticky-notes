import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import PushNotification from "react-native-push-notification";
import { NativeModules, Platform } from "react-native";
import { useTranslation } from "react-i18next";

import { RootScreens } from "./config";
import { HomeScreen } from "./Home";
import i18next, { LANGUAGES } from "../shared/lib/i18n";
import { CreateNoteScreen } from "./CreateNote";
import { PlatformType, useAppDispatch } from "../shared/lib";
import { initializeNotesData, INoteResponse } from "../entities/note";

export type RootStackListType = {
	HomeScreen: undefined;
	CreateNoteScreen: { editable: boolean; note?: INoteResponse };
};

const deviceLanguage =
	Platform.OS === PlatformType.IOS
		? NativeModules.SettingsManager.settings.AppleLocale ||
	NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier;

const Stack = createNativeStackNavigator<RootStackListType>();

export const Routing: React.FC = () => {
	const dispatch = useAppDispatch();
	const { i18n } = useTranslation();
	const handleLaunchApp = async () => {
		await dispatch(initializeNotesData());
		SplashScreen.hide();
	};

	useEffect(() => {
		handleLaunchApp();
	}, []);

	useEffect(() => {
		PushNotification.configure({
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
	const deviceLanguageArr = deviceLanguage.split("");
	const currentDeviceLanguage = deviceLanguageArr
		.splice(deviceLanguageArr.length - 2, deviceLanguageArr.length).join("");

	if (i18n.language !== LANGUAGES.RU.value && currentDeviceLanguage === LANGUAGES.RU.value) {
		i18n.changeLanguage(LANGUAGES.RU.value);
	}

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={RootScreens.HOME}
		>
			<Stack.Screen name={RootScreens.HOME} component={HomeScreen} />
			<Stack.Screen
				name={RootScreens.CREATE_NOTE}
				component={CreateNoteScreen}
			/>
		</Stack.Navigator>
	);
};
