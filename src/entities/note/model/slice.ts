import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INote, INoteResponse } from "./types";

const initialState = {
	data: null as Nullable<INoteResponse[]>,
};

export const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		setNote: (state, action: PayloadAction<INote>) => {
			if (!!state.data?.length) {
				const formattedNotes = state.data.map((item, index) => {
					return {
						...item,
						position: index + 1,
						reminder: null
					};
				});

				state.data = [
					{
						...action.payload,
						id: state.data[0].id + 1,
						position: 0,
						reminder: null

					},
					...formattedNotes,
				];

				return;
			}

			state.data = [
				{
					...action.payload,
					id: 0,
					position: 0,
					reminder: null

				},
			];
		},
		setNotesData: (state, action: PayloadAction<INoteResponse[]>) => {
			state.data = action.payload;
		},
		removeNote: (state, action: PayloadAction<INoteResponse>) => {
			const note = action.payload;

			if (state.data) {
				const filteredData = state.data.filter(item => item.id !== action.payload.id);
				const changedPositionsData = filteredData.map(item => {
					if (item.position > note.position) {
						return {
							...item,
							position: item.position - 1
						};
					}

					return item;
				});

				state.data = changedPositionsData;
			}

		},
	},
});

export const { setNote, setNotesData, removeNote } = notesSlice.actions;
