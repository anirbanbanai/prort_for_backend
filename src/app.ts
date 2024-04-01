import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router'
import globalErrorHandleling from './app/middleware/errorHandleling'
import NotFound from './app/middleware/notFound'
const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(globalErrorHandleling)
app.use(NotFound)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
