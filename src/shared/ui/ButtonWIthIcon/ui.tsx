import React from "react";
import styled from "styled-components/native";

import { GRAY_COLOR, Spacer } from "../../config";

interface IProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const ButtonWithIcon: React.FC<IProps> = ({ children, onPress }) => {
	return (
		<Wrapper onPress={onPress}>
			{children}
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity`
  max-width: 50px;
  padding: 13px;
  align-items: center;
  border-radius: ${Spacer.MEDIUM}px;
  justify-content: center;
  background-color: ${GRAY_COLOR};
`;
