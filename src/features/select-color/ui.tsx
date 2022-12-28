import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
// import ColorPicker from "react-native-wheel-color-picker";
import styled from "styled-components/native";
import { ColorPicker } from "react-native-color-picker";
import { HoloColorPicker } from "react-native-color-picker/dist/HoloColorPicker";
import { StyleSheet } from "react-native";

import { BLACK_COLOR, Spacer } from "../../shared/config";
import { Button, ButtonBack, CustomStatusBar } from "../../shared/ui";

interface IProps {
  visible: boolean;
  onRequestClose: () => void;
  colorValue: string;
  onChangeColor: (color: string) => void;
}

export const SelectColor: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { colorValue, onRequestClose, onChangeColor } = props;

	const ref = useRef<HoloColorPicker>(null);

	const handleSelectColor = () => {
		if (ref.current) {
			const color = ref.current.getColor();

			onChangeColor(color);
			onRequestClose();
		}
	};

	return (
		<ModalContainer
			animationType="slide"
			{...props}>

			<Container
			>
				<CustomStatusBar />
				<ButtonBack onPress={onRequestClose} />
				<Wrapper entering={FadeIn}>
					<ColorPicker
						ref={ref}
						style={{ flex: 1 }}
						defaultColor={colorValue}
						onColorSelected={handleSelectColor}
					/>
					<ButtonWrapper>
						<Button onPress={handleSelectColor}>
							{t("note.color")}
						</Button>
					</ButtonWrapper>
				</Wrapper>
			</Container>
		</ModalContainer>
	);
};

const ModalContainer = styled.Modal`
	background: ${props => props.theme.colors.background};
`;

const Container = styled.View`
	flex: 1;
	background: ${props => props.theme.colors.background};
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px ${Spacer.EXTRA_LARGE}px;
`;

const ButtonWrapper = styled.View`
	margin-top: ${Spacer.EXTRA_LARGE}px;
`;

const Wrapper = styled(Animated.View)`
	flex: 1;
`;
