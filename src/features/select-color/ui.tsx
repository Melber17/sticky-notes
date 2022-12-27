import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import styled from "styled-components/native";

import { Spacer } from "../../shared/config";
import { Button, ButtonBack } from "../../shared/ui";

interface IProps {
  visible: boolean;
  onRequestClose: () => void;
  colorValue: string;
  onChangeColor: (color: string) => void;
}

export const SelectColor: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { colorValue, onRequestClose, onChangeColor } = props;
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 0);
	}, []);

	return (
		<Modal
			animationType="slide"
			{...props}>
			<Container>
				<ButtonBack onPress={onRequestClose} />
				{isLoaded && (
					<>
						<ColorPicker
							color={colorValue}
							onColorChangeComplete={onChangeColor}
							thumbSize={30}
							sliderSize={30}
							noSnap={true}
							row={false}
						/>
						<ButtonWrapper>
							<Button onPress={onRequestClose}>
								{t("note.color")}
							</Button>
						</ButtonWrapper>
					</>
				)}
			</Container>

		</Modal>
	);
};

const Container = styled.View`
	flex: 1;
	background: ${props => props.theme.colors.background};
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px ${Spacer.EXTRA_LARGE}px;
`;

const ButtonWrapper = styled.View`
	margin-top: ${Spacer.EXTRA_LARGE}px;
`;
