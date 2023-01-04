import React, { useState } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouteProp } from "@react-navigation/native";

import { CreateNoteForm } from "../../features/create-note-form";
import { Spacer } from "../../shared/config";
import { WithSafeArea } from "../../shared/ui";
import { RootStackListType } from "..";
import { RootScreens } from "../config";
import { NoteOptions } from "../../features/note-options";

interface IProps {
	route: RouteProp<RootStackListType, RootScreens.CREATE_NOTE>
}

export const CreateNoteScreen: React.FC<IProps> = ({ route }) => {
	const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);
	const [currentNote, setCurrentNote] = useState(route.params.note);
	const handleToggleVisible = () => {
		setIsVisibleBottomSheet(prevValue => !prevValue);
	};

	return (
		<>
			<WithSafeArea>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps="always"
				>
					<Container>
						<CreateNoteForm
							isEditable={route.params.editable}
							onPressOptions={handleToggleVisible}
							note={route.params.note}
						/>
					</Container>
				</KeyboardAwareScrollView>
			</WithSafeArea>
			{isVisibleBottomSheet && currentNote && (
				<NoteOptions
					setNote={setCurrentNote}
					note={currentNote}
					onClose={handleToggleVisible}
				/>
			)}
		</>
	);
};

const Container = styled.View`
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;
