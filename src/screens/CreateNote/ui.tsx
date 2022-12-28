import React from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouteProp } from "@react-navigation/native";

import { CreateNoteForm } from "../../features/create-note-form";
import { Spacer } from "../../shared/config";
import { WithSafeArea } from "../../shared/ui";
import { RootStackListType } from "..";
import { RootScreens } from "../config";

interface IProps {
	route: RouteProp<RootStackListType, RootScreens.CREATE_NOTE>
}

export const CreateNoteScreen: React.FC<IProps> = ({ route }) => {
	return (
		<WithSafeArea>
			<KeyboardAwareScrollView
			>
				<Container>
					<CreateNoteForm
						isEditable={route.params.editable}
						note={route.params.note}
					/>
				</Container>
			</KeyboardAwareScrollView>
		</WithSafeArea>
	);
};

const Container = styled.View`
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;
