import express from 'express';
import cors from 'cors';
import {createValidator} from "express-joi-validation"
export const validator = createValidator()
import { appliancesRoutes } from './modules/appliances/appliancesRoutes';
const app = express()

app.use(cors()) // Enable CORS for all routes for dissmissing CORS errors during development
app.use(express.json()) // Enabled to parse JSON request bodies

app.get('/', (_, response) => {
  response.json({ message: 'Hello World' })
})

app.use('/appliances', appliancesRoutes)

app.listen(3000, () =>  {
    console.log('Server is running on http://localhost:3000')
})