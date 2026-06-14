import { Router } from 'express'
import { 
  home, 
  getAllNotes,
  getNoteByID,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notesContollers.js'

const router:Router = Router()

router.get('/', home)
router.get('/api/notes', getAllNotes)
router.get('/api/notes/:id', getNoteByID)

router.post('/api/notes', createNote)
router.put('/api/notes/:id', updateNote)
router.delete('/api/notes/:id', deleteNote)

export default router
