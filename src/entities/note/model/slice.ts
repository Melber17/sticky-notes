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
			if (state.data) {
				const formattedNotes = state.data.map((item, index) => {
					return {
						...item,
						position: index + 1,
					};
				});

				state.data = [
					{
						...action.payload,
						id: state.data[0].id + 1,
						position: 0,
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
				},
			];
		},
		setNotesData: (state, action: PayloadAction<INoteResponse[]>) => {
			state.data = action.payload;
		},
	},
});

export const { setNote, setNotesData } = notesSlice.actions;
