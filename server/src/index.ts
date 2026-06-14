import express, { json, urlencoded } from 'express'
import cors from 'cors'
import router from './routes/noteRoutes.js'

const port = process.env.PORT || 4000
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(json())
app.use(urlencoded({extended: true}))
app.use(router)

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
