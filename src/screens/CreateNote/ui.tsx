import React from "react";
import styled from "styled-components/native";

import { Spacer } from "../../shared/config";
import { ButtonBack, WithSafeArea } from "../../shared/ui";

export const CreateNoteScreen: React.FC = () => {
	return (
		<WithSafeArea>
			<Container>
				<ButtonBack />
			</Container>
		</WithSafeArea>
	);
};

const Container = styled.View`
	margin: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;
