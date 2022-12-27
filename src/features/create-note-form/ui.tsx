import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { ButtonBack, ButtonWithIcon, Input } from "../../shared/ui";
import CheckIcon from "../../shared/assets/icons/checkIcon.svg";
import { Spacer } from "../../shared/config";

export const CreateNoteForm: React.FC = () => {
	const { t } = useTranslation();
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

	return (
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

		</Container>
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
`;
