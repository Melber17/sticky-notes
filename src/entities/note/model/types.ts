export interface INote {
	title: string;
	description: string;
	color: string;
	backgroundColor: string;
}

export interface INoteResponse extends INote {
	id: number;
	position: number;
	reminder: Nullable<string>;
}

export enum NotesThunks {
	CREATE = "CREATE",
	EDIT = "EDIT",
	DELETE = "DELETE"
}

export enum NotesKeys {
	NOTES = "NOTES",
}
