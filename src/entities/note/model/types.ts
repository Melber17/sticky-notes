export interface INote {
  title: string;
  description: string;
  color: string;
  backgroundColor: string;
  id: number;
}

export enum NotesThunks {
  CREATE = "CREATE"
}

export enum NotesKeys {
  NOTES = "NOTES"
}
