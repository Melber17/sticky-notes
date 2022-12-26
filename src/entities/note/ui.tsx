import React from "react";
import styled from "styled-components/native";

import { Spacer } from "../../shared/config";
import { Text } from "../../shared/ui";

interface INoteCartProps {
  backgroundColor: string;
  title: string;
  width: number;
}

export const NoteCart: React.FC<INoteCartProps> = (props) => {
	const { title } = props;

	return (
		<Container {...props}>
			<Title>
				{title}
			</Title>
		</Container>
	);
};

const Container = styled.View<INoteCartProps>`
  width: ${({ backgroundColor }) => backgroundColor};
  background: ${({ backgroundColor }) => backgroundColor};
  padding: ${Spacer.SMALL}px;
`;

const Title = styled(Text)``;
