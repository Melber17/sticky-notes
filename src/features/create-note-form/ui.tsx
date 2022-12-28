import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { ButtonBack, ButtonWithIcon, Input, Text } from "../../shared/ui";
import CheckIcon from "../../shared/assets/icons/checkIcon.svg";
import { BLACK_COLOR, Spacer } from "../../shared/config";
import { SelectColor } from "../select-color";
import { useAppDispatch } from "../../shared/lib/useRedux";
import { createNote } from "../../entities/note";

interface ICreateNoteFormProps {
	isEditable?: boolean;
}

export const CreateNoteForm: React.FC<ICreateNoteFormProps> = ({ isEditable }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [isVisibleColorModal, setIsVisibleColorModal] = useState(false);
	const [isVisibleBackgroundColorModal, setIsVisibleBackgroundColorModal] = useState(false);
	const [colorValue, setColorValue] = useState("#FFFFFF");
	const [backgroundColorValue, setBackgroundColorValue] = useState("#444444");
	const [titleValue, setTitleValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");
	const navigation = useNavigation();
	const handleSubmit = async () => {
		const noteResult = {
			title: titleValue,
			description: descriptionValue,
			color: colorValue,
			backgroundColor: backgroundColorValue
		};

		await dispatch(createNote(noteResult));
		navigation.goBack();
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

	const handleRenderInputContainer = (children: React.ReactNode) => {
		if (isEditable) {
			return (
				<>
					{children}
				</>
			);
		}

		return (
			<PlugContainer>
				<PlugView />
				{children}
			</PlugContainer>
		);
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
					editable={isEditable}
					placeholder={t("note.title")}
					textSize={Spacer.EXTRA_LARGE + Spacer.MEDIUM}
				/>

				<InputWrapper>
					{handleRenderInputContainer(
						<Input
							onChangeText={handleChangeDescription}
							defaultValue={descriptionValue}
							multiline
							editable={isEditable}
							maxLength={500}
							placeholder={t("note.description")}
							textSize={Spacer.LARGE}
						/>
					)}
				</InputWrapper>
				<Title>
					{t("note.color")}
				</Title>
				{handleRenderInputContainer(
					<ColorWrapper
						onPress={handleToggleColorModal}
						background={colorValue}
						style={styles.color}
					/>
				)}
				<Title>
					{t("note.background")}
				</Title>
				{handleRenderInputContainer(
					<ColorWrapper
						onPress={handleToggleBackgroundColorModal}
						background={backgroundColorValue}
						style={styles.color}
					/>
				)}
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

const styles = StyleSheet.create({
	color: {
		shadowColor: BLACK_COLOR,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,

		elevation: 13,
	},
});

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

const PlugContainer = styled.View`
	position: relative;
`;

const PlugView = styled.View`
	position: absolute;
	z-index: 2;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
`;
