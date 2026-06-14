import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import type { Note, NoteProps } from './types'

const getAllNotes = async () => {
  const res = await axios.get('http://localhost:4000/api/notes')
  return res.data.data
}

const addNewNote = async (content:string) => {
  const res = await axios.post('http://localhost:4000/api/notes', {content})
  console.log(res.data)
}

const NotesList = ({notesArray}: NoteProps) => {
  return (
    <ul>
      {notesArray.map(n => (
        <li key={n.id}>
          <span>{n.content}</span> {' '}
          <button>
            {n.important ? 'make important' : 'make not important'}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [note, setNote] = useState<string>('')
  const [notes, setNotes] = useState<Note[] | null>(null)

  useEffect(() => {
    getAllNotes()
      .then(data => setNotes((data)))
  },[notes])

  const handleSubmit = (event:React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!note || note.trim() === '') {
      console.error('invalid note')
      return
    } else {
      addNewNote(note)
      setNote('')

      getAllNotes()
        .then(data => setNotes(data))
    }
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value)
  }

  return (
    <section className='App'>
      <h1>Notes</h1>

      <button>show important</button>

      {
        notes 
          ? <NotesList notesArray={notes} /> 
          : <p>the list is empty</p>
      }

      <form onSubmit={handleSubmit}>
        <input 
          id='note'
          name='content'
          value={note} 
          onChange={handleChange}
        /> {' '}
        <button type='submit'>save</button>
      </form>
    </section>
  )
}

