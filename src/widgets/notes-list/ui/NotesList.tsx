import React from "react";
import styled from "styled-components/native";

import { INoteResponse, setNewNotesData } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { useAppDispatch } from "../../../shared/lib";
import { EmptyListData } from "./EmptyListData";
import { SortableListWrapper } from "./SortableListWrapper";

interface INotesListProps {
	data: Nullable<INoteResponse[]>;
	headerComponent: JSX.Element;
}

export const NotesList: React.FC<INotesListProps> = (props) => {
	const { data, headerComponent } = props;
	const dispatch = useAppDispatch();
	const onDragEnd = (notesData: INoteResponse[]) => {
		dispatch(setNewNotesData(notesData));
	};

	if (!data || !data.length) {
		return (
			<Wrapper>
				{headerComponent}
				<EmptyListData />
			</Wrapper>
		);
	}

	return (
		<>
			<Container>
				<SortableListWrapper
					data={data}
					editing={true}
					onDragEnd={onDragEnd}
					headerComponent={headerComponent}
				/>
			</Container>
		</>
	);
};

const Container = styled.View`
	flex: 1;
`;

const Wrapper = styled.View`
	margin: ${Spacer.MEDIUM}px;
	flex: 1;
`;
