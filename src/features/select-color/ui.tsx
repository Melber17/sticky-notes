import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import ColorPicker from "react-native-wheel-color-picker";
import styled from "styled-components/native";

import { Spacer } from "../../shared/config";
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
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 500);
	}, []);

	return (
		<ModalContainer
			animationType="slide"
			{...props}>

			<Container
			>
				<CustomStatusBar />
				<ButtonBack onPress={onRequestClose} />
				{isLoaded && (
					<Wrapper entering={FadeIn}>
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
					</Wrapper>
				)}
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
