import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import LeftArrowIcon from "../../assets/icons/leftArrowIcon.svg";
import { GRAY_COLOR, Spacer } from "../../config";

interface IProps {
	icon?: JSX.Element;
	onPress?: () => void;
}

export const ButtonBack: React.FC<IProps> = ({ icon, onPress }) => {

	const navigation = useNavigation();

	const handleNavigateBack = () => {
		navigation.goBack();
	};

	function renderIcon () {
		if (icon) {
			return icon;
		}

		return <LeftArrowIcon />;
	}

	const handlePressButton = () => {
		if (onPress) {
			onPress();

			return;
		}

		handleNavigateBack();
	};

	return (
		<Wrapper onPress={ handlePressButton }>
			{renderIcon()}
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	flex-direction: row;
	align-items: center;
	background: ${GRAY_COLOR};
	border-radius: ${Spacer.MEDIUM}px;
`;
