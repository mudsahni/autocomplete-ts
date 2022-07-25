import express from 'express'
import {json} from 'body-parser'
import {searchTermRouter} from './routes/searchTerm'
import {letterRouter} from "./routes/letter";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from 'path'

const app = express()
app.use(json())
app.use(searchTermRouter)
app.use(letterRouter)

dotenv.config({ path: path.join(__dirname, '../.env') });

mongoose.connect(<string>process.env.DATABASE_URL, {}, () => {
    console.log('Connected to database.')
})
const database = mongoose.connection

database.on('error', (error) => {
    console.error(error)
})


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})