import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import styled from "styled-components/native";

import { WithTheme } from "./src/app/providers";
import i18next from "./src/shared/lib/i18n";

export const App = () => {
	const { t } = useTranslation();

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	if (!i18next.isInitialized) {
		return null;
	}

	return (
		<WithTheme>
			<SafeAreaView>
				<Container>
					<Title>{t("general.welcome")}</Title>
				</Container>
			</SafeAreaView>
		</WithTheme>
	);
};

const Container = styled.View`
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.background};
`;

const Title = styled.Text`
	color: ${(props) => props.theme.colors.color};
`;
