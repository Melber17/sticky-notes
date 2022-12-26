import React, { FC } from "react";
import { TextProps as AdditionalTextProps } from "react-native";
import styled from "styled-components/native";

import { Fonts, FontStyles } from "../../config";
import { Spacer } from "../../config/indents";

interface IProps extends AdditionalTextProps {
	children: React.ReactNode;
	size?: number;
	color?: string;
	fontStyle?: FontStyles;
	font?: Fonts;
	style?: object;
	factor?: number;
	numberOfLines?: number;
}

interface TextProps {
	size?: number;
	color?: string;
	factor?: number;
	fontStyle?: string;
	font?: string;
}

export const Text: FC<IProps> = (props) => {
	const {
		size,
		color,
		fontStyle,
		factor,
		font,
		children,
		numberOfLines,
		style,
	} = props;

	return (
		<Wrapper
			{...{
				size,
				factor,
				color,
				fontStyle,
				font,
				numberOfLines,
				style,
			}}
		>
			{children}
		</Wrapper>
	);
};

const Wrapper = styled.Text<TextProps>`
	font-family: ${({ font = Fonts.NUNITO, fontStyle = FontStyles.REGULAR }) =>
		`${font}-${fontStyle}`};
	font-size: ${({ size = Spacer.MEDIUM }) => size}px;
	color: ${(props) => props.color ?? props.theme.colors.color};
`;
