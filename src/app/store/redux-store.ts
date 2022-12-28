/* eslint-disable @typescript-eslint/no-var-requires */
import {
	AnyAction,
	configureStore,
	getDefaultMiddleware,
	ThunkDispatch,
} from "@reduxjs/toolkit";

import { notesSlice } from "../../entities/note";

const middlewares = getDefaultMiddleware({
	immutableCheck: false,
});

if (__DEV__) {
	const createDebugger = require("redux-flipper").default;

	middlewares.push(createDebugger());
}

export const store = configureStore({
	reducer: {
		notes: notesSlice.reducer,
	},
	middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type DispatchType = ThunkDispatch<unknown, unknown, AnyAction>;
