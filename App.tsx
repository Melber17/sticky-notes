import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import styled, { ThemeProvider } from "styled-components/native";

import { WithTheme } from "./src/app/providers";
import { darkTheme } from "./src/shared/config";

export const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<WithTheme>
			<SafeAreaView>
				<Container>
					<Title>HELOOO</Title>
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
