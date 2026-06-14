import type { Request, Response } from 'express'
import db from '../db/db.js'

let notes = db

const home = (req:Request, res:Response) => {
  res.status(200).send('homepage | notes')
}

const getAllNotes = (req:Request, res:Response) => {
  res.status(200).json({data: notes})
}

const getNoteByID = (req:Request, res:Response) => {
  try {
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)

    if(!note) 
      return res.status(400).json({error: 'no note found with that id'})

    res.status(200).json({data: note})
  } catch(err: unknown) {
    res.status(500).json({error: err})
  }
}

//create new note
const createNote = (req:Request, res:Response) => {
  try {
    const id = notes.length + 1
    const {content} = req.body

    if(!content)
      return res.status(500).json({error: 'content cannot be empty'})
    notes.push({id, content, important: false})

    res.status(201).json({data: 'new note created successfully'})
  } catch(err:unknown) {
    console.error(err)
    res.status(500).json({error: 'a server error has occured try again later'})
  }
}

//update note
const updateNote = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { content, important } = req.body;

    const noteIndex = notes.findIndex(n => n.id === id);

    // 1. Check for -1, because index 0 is a valid position!
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'No note found with that id' });
    }

    // 2. Validate content (400 is for client mistakes)
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }

    // 3. Perform the update
    // Using a spread preserves the existing object structure
    notes[noteIndex] = { 
      ...notes[noteIndex],
      id,
      content, 
      important: important ?? notes[noteIndex]?.important 
    };

    res.status(200).json({ 
      message: 'Note updated successfully', 
      data: notes[noteIndex] 
    });

  } catch (err: unknown) {
    // Better to log the error for yourself and send a clean message to the user
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

//delete note
const deleteNote = (req:Request, res:Response) => {
  try {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id);

    res.status(200).json({data: 'note deleted successfully'})
  } catch(err:unknown) {
    console.error(err)
    res.status(500).json({error: 'failed deleting the note'})
  }
}

export {
  home,
  getAllNotes,
  getNoteByID,
  createNote,
  updateNote,
  deleteNote
}
