import React from "react";
import { ThemeProvider } from "styled-components/native";
import { useColorScheme } from "react-native";

import { darkTheme, lightTheme } from "../styles";

interface IProps {
	children: React.ReactNode;
}

export const WithTheme: React.FC<IProps> = ({ children }) => {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
			{children}
		</ThemeProvider>
	);
};
