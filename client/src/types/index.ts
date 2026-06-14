export interface Note {
  id: number | string
  content: string
  important?: boolean
}

export interface NoteProps {
  notesArray: Note[]
}

