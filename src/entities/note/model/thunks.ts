import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../../../app/store";
import { setNote, setNotesData } from "./slice";
import { INote, NotesKeys, NotesThunks } from "./types";

export const createNote = createAsyncThunk<any, any, { state: RootState }>(
	`notes/${NotesThunks.CREATE}`,
	async (data: INote, { dispatch, getState }) => {
		dispatch(setNote(data));
		const currentNotes = getState().notes.data;

		await AsyncStorage.setItem(NotesKeys.NOTES, JSON.stringify(currentNotes));
	});

export const initializeNotesData = createAsyncThunk(
	`notes/${NotesThunks.CREATE}`,
	async (_, { dispatch }) => {
		const notesData = await AsyncStorage.getItem(NotesKeys.NOTES);

		if (notesData) {
			dispatch(setNotesData(JSON.parse(notesData)));
		}
	});
