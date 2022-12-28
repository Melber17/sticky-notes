import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

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
