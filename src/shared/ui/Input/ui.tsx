import React from "react";
import styled from "styled-components/native";

import { PLACEHOLDER_COLOR, Spacer, WHITE_COLOR } from "../../config";

interface IProps {
	placeholder: string;
	defaultValue: string;
  textSize?: number;
	onChangeText: (text: string) => void;
  multiline?: boolean;
	maxLength?: number;
}

export const Input: React.FC<IProps> = (props) => {

	return (
		<Field
			scrollEnabled={false}
			placeholderTextColor={ PLACEHOLDER_COLOR }
			{...props}
		/>
	);
};

const Field = styled.TextInput<{textSize?: number}>`
  justify-content: center;
	font-size: ${({ textSize }) => textSize ?? Spacer.MEDIUM}px;
	color: ${WHITE_COLOR};
`;
