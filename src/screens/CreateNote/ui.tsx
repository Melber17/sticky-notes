import React from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { CreateNoteForm } from "../../features/create-note-form";
import { Spacer } from "../../shared/config";
import { WithSafeArea } from "../../shared/ui";

export const CreateNoteScreen: React.FC = () => {
	return (
		<WithSafeArea>
			<KeyboardAwareScrollView
			>
				<Container>
					<CreateNoteForm />
				</Container>
			</KeyboardAwareScrollView>
		</WithSafeArea>
	);
};

const Container = styled.View`
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;
