import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { ButtonBack, ButtonWithIcon, Input, Text } from "../../shared/ui";
import CheckIcon from "../../shared/assets/icons/checkIcon.svg";
import { Spacer } from "../../shared/config";
import { SelectColor } from "../select-color";

export const CreateNoteForm: React.FC = () => {
	const { t } = useTranslation();
	const [isVisibleColorModal, setIsVisibleColorModal] = useState(false);
	const [isVisibleBackgroundColorModal, setIsVisibleBackgroundColorModal] = useState(false);
	const [colorValue, setColorValue] = useState("#FFFFFF");
	const [backgroundColorValue, setBackgroundColorValue] = useState("#444444");
	const [titleValue, setTitleValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");

	const handleSubmit = () => {

	};

	const handleChangeTitle = useCallback((value: string) => {
		setTitleValue(value);
	}, []);

	const handleChangeDescription = useCallback((value: string) => {
		setDescriptionValue(value);
	}, []);

	const handleToggleColorModal = () => {
		setIsVisibleColorModal(prevValue => !prevValue);
	};

	const handleToggleBackgroundColorModal = () => {
		setIsVisibleBackgroundColorModal(prevValue => !prevValue);
	};

	return (
		<>
			<Container>
				<IconsWrapper>
					<ButtonBack />
					<ButtonWithIcon onPress={handleSubmit}>
						<CheckIcon />
					</ButtonWithIcon>
				</IconsWrapper>
				<Input
					onChangeText={handleChangeTitle}
					defaultValue={titleValue}
					multiline
					maxLength={100}
					placeholder={t("note.title")}
					textSize={Spacer.EXTRA_LARGE + Spacer.MEDIUM}
				/>
				<InputWrapper>
					<Input
						onChangeText={handleChangeDescription}
						defaultValue={descriptionValue}
						multiline
						maxLength={500}
						placeholder={t("note.description")}
						textSize={Spacer.LARGE}
					/>
				</InputWrapper>
				<Title>
					{t("note.color")}
				</Title>
				<ColorWrapper onPress={handleToggleColorModal} background={colorValue}/>
				<Title>
					{t("note.background")}
				</Title>
				<ColorWrapper
					onPress={handleToggleBackgroundColorModal}
					background={backgroundColorValue}
				/>
			</Container>
			<SelectColor
				visible={isVisibleColorModal}
				onRequestClose={handleToggleColorModal}
				colorValue={colorValue}
				onChangeColor={setColorValue}
			/>
			<SelectColor
				visible={isVisibleBackgroundColorModal}
				onRequestClose={handleToggleBackgroundColorModal}
				colorValue={backgroundColorValue}
				onChangeColor={setBackgroundColorValue}
			/>
		</>
	);
};

const Container = styled.View``;

const IconsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Spacer.EXTRA_LARGE}px;
`;

const InputWrapper = styled.View`
  margin-top: ${Spacer.LARGE}px;
	margin-bottom: ${Spacer.EXTRA_LARGE}px;
`;

const Title = styled(Text)`
  font-size: 10px;
	margin-bottom: ${Spacer.MEDIUM}px;
	text-transform: uppercase;
`;

const ColorWrapper = styled.TouchableOpacity<{background: string}>`
	width: 100%;
	height: 40px;
	background-color: ${({ background }) => background};
	border-radius: ${Spacer.SMALL}px;
	margin-bottom: ${Spacer.EXTRA_LARGE}px;
`;
