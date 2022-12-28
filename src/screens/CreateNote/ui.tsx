import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { CreateNoteForm } from "../../features/create-note-form";
import { Spacer } from "../../shared/config";
import { WithSafeArea } from "../../shared/ui";

export const CreateNoteScreen: React.FC = () => {
	return (
		<WithSafeArea>

			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<Container>
					<CreateNoteForm />
				</Container>
			</ScrollView>
		</WithSafeArea>
	);
};

const Container = styled.View`
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;
