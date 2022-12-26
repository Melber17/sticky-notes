import React from "react";
import styled from "styled-components/native";

import { INote } from "../../../entities/note";
import { EmptyListData } from "./EmptyListData";

interface INotesListProps {
  data: Nullable<INote[]>;
}

export const NotesList: React.FC<INotesListProps> = (props) => {
	const { data } = props;

	if (!data) {
		return <EmptyListData />;
	}

	return (
		<Container>

		</Container>
	);
};

const Container = styled.View`

`;
