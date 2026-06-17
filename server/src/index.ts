import express, { json, urlencoded } from 'express'
import type { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './routes/noteRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const clientDistPath = path.resolve(__dirname, '..', '..', 'client', 'dist')

const port = process.env.PORT
const app = express()

app.use(errorHandler)
app.use(json())
app.use(urlencoded({extended: true}))
app.use(express.static(clientDistPath))
app.use(router)

//fallback route 
app.get('{*splat}', (req:Request, res:Response) => {
  res.status(200).sendFile(path.join(clientDistPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
