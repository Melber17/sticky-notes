export interface INote {
	title: string;
	description: string;
	color: string;
	backgroundColor: string;
}

export interface INoteResponse extends INote {
	id: number;
	position: number;
}

export enum NotesThunks {
	CREATE = "CREATE",
	EDIT = "EDIT",
}

export enum NotesKeys {
	NOTES = "NOTES",
}
