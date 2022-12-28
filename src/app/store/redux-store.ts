import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";

import { notesSlice } from "../../entities/note";

export const store = configureStore({
	reducer: {
		notes: notesSlice.reducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type DispatchType = ThunkDispatch<unknown, unknown, AnyAction>;
