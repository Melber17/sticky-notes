import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../../../app/store";
import { setNote, setNotesData } from "./slice";
import { INote, INoteResponse, NotesKeys, NotesThunks } from "./types";

export const createNote = createAsyncThunk<any, any, { state: RootState }>(
	`notes/${NotesThunks.CREATE}`,
	async (data: INote, { dispatch, getState }) => {
		dispatch(setNote(data));
		const currentNotes = getState().notes.data;

		await AsyncStorage.setItem(NotesKeys.NOTES, JSON.stringify(currentNotes));
	}
);

export const initializeNotesData = createAsyncThunk(
	`notes`,
	async (_, { dispatch }) => {
		const notesData = await AsyncStorage.getItem(NotesKeys.NOTES);

		if (notesData) {
			dispatch(setNotesData(JSON.parse(notesData)));
		}
	}
);

export const editNote = createAsyncThunk<any, any, { state: RootState }>(
	`notes/${NotesThunks.EDIT}`,
	async (data: INoteResponse, { dispatch, getState }) => {
		const currentNotes = getState().notes.data;

		if (currentNotes) {
			const result = currentNotes.map((note) => {
				if (note.id === data.id) {
					return data;
				}

				return note;
			});

			dispatch(setNotesData(result));

			await AsyncStorage.setItem(NotesKeys.NOTES, JSON.stringify(currentNotes));
		}
	}
);
