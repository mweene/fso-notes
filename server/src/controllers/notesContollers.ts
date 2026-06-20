import type { NextFunction, Request, Response } from 'express'
import Note from '../models/notes.js'

const getAllNotes = (req:Request, res:Response) => {
  Note.find({}).then(notes => 
    res.status(200).json({data: notes})
  )
}

//get note by id
const getNoteByID = (req:Request, res:Response, next:NextFunction) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })

    .catch(err => next(err))
}

//create new note
const createNote = (req:Request, res:Response, next:NextFunction) => {
    const { content, important } = req.body

    if(!content)
      return res.status(500).json({error: 'content missing'})

    const note = new Note({
      content,
      important: important || false
    })

    note.save()
      .then(savedNote => {
        res.json({data: savedNote})
      })
      .catch(err => next(err))
}

const updateNote = (req:Request, res:Response, next:NextFunction) => {
  const { content, important } = req.body

  Note.findById(req.params.id)
    .then(note => {
      if(!note) return res.status(404).end()

      note.content = content
      note.important = important

      return note.save().then(updateNote => {
        res.status(200).json({data: updateNote})
      })
    })
    .catch(err => next(err))
}

const deleteNote = (req:Request, res:Response, next:NextFunction) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(err => next(err))
}

export {
  getAllNotes,
  getNoteByID,
  createNote,
  updateNote,
  deleteNote
}
