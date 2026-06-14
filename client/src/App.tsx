import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const getAllNotes = async () => {
  const res = await axios.get('http://localhost:4000/api/notes')
  return res.data.data
}

const addNewNote = async (payload) => {
  const res = await axios.post('http://localhost:4000/api/notes', {content: payload})
  console.log(res.data)
}

const NotesList = ({notesArray}) => {
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
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    getAllNotes()
      .then(data => setNotes((data)))
  },[])

  const handleSubmit = event => {
    event.preventDefault()
    if(!note || note.trim() === '') {
      console.error('invalid note')
      return
    } else {
      addNewNote(note)
      setNote('')
    }
  }

  const handleChange = event => {
    setNote(event.target.value)
    console.log(note)
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

