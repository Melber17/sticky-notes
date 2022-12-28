import React, { useState } from "react";
import styled from "styled-components/native";

import { INoteResponse } from "../../../entities/note";
import { Header } from "../../Header";
import { EmptyListData } from "./EmptyListData";
import { SortableList } from "./SortableList";

interface INotesListProps {
	data: Nullable<INoteResponse[]>;
	headerComponent: JSX.Element;
}

export const NotesList: React.FC<INotesListProps> = (props) => {
	const { data } = props;
	const [notes, setNotes] = useState(data);

	if (!data) {
		return (
			<>
				<Header />
				<EmptyListData />
			</>
		);
	}

	return (
		<Container>
			<SortableList
				data={data}
				editing={true}
				onDragEnd={(positions) =>
					console.log(JSON.stringify(positions, null, 2))
				}
			/>
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
`;
