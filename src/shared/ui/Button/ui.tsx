import React from "react";
import styled from "styled-components/native";

import { BLUE_COLOR, FontStyles, Spacer } from "../../config";
import { Text } from "../Text";

interface IProps {
  backgroundColor?: string;
  children: React.ReactNode;
  onPress: () => void;
}

export const Button: React.FC<IProps> = (props) => {
	const { backgroundColor, onPress, children } = props;

	return (
		<Wrapper
			backgroundColor={backgroundColor}
			onPress={onPress}
		>
			<Text
				fontStyle={FontStyles.BOLD}
			>
				{children}
			</Text>
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity<{backgroundColor?: string}>`
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor ?? BLUE_COLOR};
  border-radius: ${Spacer.SMALL}px;
`;
