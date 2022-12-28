import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INote } from "./types";

const initialState = {
	data: null as Nullable<INote[]>,
};

export const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		setNote: (state, action: PayloadAction<INote>) => {
			if (state.data) {
				state.data = [
					{
						...action.payload,
						id: state.data[state.data.length - 1].id + 1
					},
					...state.data
				];
			}

			state.data = [{
				...action.payload,
				id: 0,
			}];
		},
		setNotesData: (state, action: PayloadAction<INote[]>) => {
			state.data = action.payload;
		},
	},
});

export const {
	setNote,
	setNotesData,
} = notesSlice.actions;
