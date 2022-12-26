import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import styled from "styled-components/native";

import { WithSafeArea } from "../../shared/ui";

export const HomeScreen: React.FC = () => {
	const { t } = useTranslation();

	return (
		<WithSafeArea>
			<Container>
				<Text>{t("general.welcome")}</Text>
			</Container>
		</WithSafeArea>
	);
};

const Container = styled.View`
	flex: 1;
	background: ${(props) => props.theme.colors.background};
`;
