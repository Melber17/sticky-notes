import React, { RefObject } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";

import { PLACEHOLDER_COLOR, Spacer } from "../../config";

interface IProps {
	placeholder: string;
	defaultValue: string;
	textSize?: number;
	onChangeText: (text: string) => void;
	multiline?: boolean;
	maxLength?: number;
	editable?: boolean;
	autoFocus?: boolean;
	inputRef?: RefObject<TextInput>;
}

export const Input: React.FC<IProps> = (props) => {
	const { editable = true, inputRef } = props;

	return (
		<Field
			scrollEnabled={false}
			ref={inputRef}
			placeholderTextColor={PLACEHOLDER_COLOR}
			{...props}
			editable={editable}
		/>
	);
};

const Field = styled.TextInput<{ textSize?: number }>`
	justify-content: center;
	font-size: ${({ textSize }) => textSize ?? Spacer.MEDIUM}px;
	color: ${(props) => props.theme.colors.color};
`;
