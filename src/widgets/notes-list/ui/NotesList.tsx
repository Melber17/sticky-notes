import React, { useState } from "react";
import styled from "styled-components/native";

import { INoteResponse, setNewNotesData } from "../../../entities/note";
import { NoteOptions } from "../../../features/note-options";
import { useAppDispatch } from "../../../shared/lib";
import { Header } from "../../Header";
import { EmptyListData } from "./EmptyListData";
import { SortableList } from "./SortableList";

interface INotesListProps {
	data: Nullable<INoteResponse[]>;
	headerComponent: JSX.Element;
	onEditCard: () => void;
}

export const NotesList: React.FC<INotesListProps> = (props) => {
	const { data, onEditCard } = props;
	const dispatch = useAppDispatch();
	const onDragEnd = (notesData: INoteResponse[]) => {
		dispatch(setNewNotesData(notesData));
	};

	const handlePressCard = () => {

	};

	if (!data) {
		return (
			<>
				<Header />
				<EmptyListData />
			</>
		);
	}

	return (
		<>
			<Container>
				<SortableList
					data={data}
					editing={true}
					onDragEnd={onDragEnd}
				/>
			</Container>
		</>
	);
};

const Container = styled.View`
	flex: 1;
`;
