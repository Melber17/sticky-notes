import React from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { ButtonWithIcon, Text } from "../../shared/ui";
import InfoIcon from "../../shared/assets/icons/InfoIcon.svg";

export const Header: React.FC = () => {
	const { t } = useTranslation();

	const handlePressShowInfo = () => {

	};

	return (
		<Container>
			<Text size={40}>
				{t("general.title")}
			</Text>
			<ButtonWithIcon onPress={handlePressShowInfo}>
				<InfoIcon />
			</ButtonWithIcon>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
