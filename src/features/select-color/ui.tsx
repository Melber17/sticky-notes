import React, { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import styled from "styled-components/native";
import { ColorPicker } from "react-native-color-picker";
import { HoloColorPicker } from "react-native-color-picker/dist/HoloColorPicker";
import { Platform } from "react-native";

import { Spacer } from "../../shared/config";
import { Button, ButtonBack, WithSafeArea } from "../../shared/ui";
import { PlatformType } from "../../shared/lib";

interface IProps {
	visible: boolean;
	onRequestClose: () => void;
	colorValue: string;
	onChangeColor: (color: string) => void;
}

export const SelectColor: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const defaultColorValue = useMemo(() => props.colorValue, []);
	const { onRequestClose, onChangeColor } = props;

	const ref = useRef<HoloColorPicker>(null);

	const handleSelectColor = () => {
		if (ref.current) {
			const color = ref.current.getColor();

			onChangeColor(color);
			onRequestClose();
		}
	};

	const handleRenderData = useCallback((children: React.ReactNode) => {
		if (Platform.OS === PlatformType.ANDROID) {
			return <>{children}</>;
		}

		return <WithSafeArea>{children}</WithSafeArea>;
	}, []);

	return (
		<ModalContainer animationType="slide" {...props}>
			{handleRenderData(
				<Container>
					<ButtonBack onPress={onRequestClose} />
					<Wrapper entering={FadeIn}>
						<ColorPicker
							ref={ref}
							defaultColor={defaultColorValue}
							style={{ flex: 1 }}
							onColorSelected={handleSelectColor}
						/>
						<ButtonWrapper>
							<Button onPress={handleSelectColor}>{t("note.color")}</Button>
						</ButtonWrapper>
					</Wrapper>
				</Container>
			)}
		</ModalContainer>
	);
};

const ModalContainer = styled.Modal`
	background: ${(props) => props.theme.colors.background};
`;

const Container = styled.View`
	flex: 1;
	background: ${(props) => props.theme.colors.background};
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px ${Spacer.EXTRA_LARGE}px;
`;

const ButtonWrapper = styled.View`
	margin-top: ${Spacer.EXTRA_LARGE}px;
`;

const Wrapper = styled(Animated.View)`
	flex: 1;
`;
