import express, { Request, Response } from 'express'
import { SearchTerm } from '../models/searchTerm'
import {parseTrie} from './util'

const router = express.Router()

router.get('/api/search-term', [], async (req: Request, res: Response) => {
    const searchTerms = await SearchTerm.find({})
    return res.status(200).send(searchTerms)
})

router.get('/api/search-term/:term', [], async (req: Request, res: Response) => {
    const searchTerm = await SearchTerm.findOne({term: req.params.term})
    return res.status(200).send(searchTerm)
})

router.post('/api/search-term', async (req: Request, res: Response) => {

    const {term} = req.body
    try {
        const cache = await parseTrie(term)
        return res.status(201).send(cache)
    } catch (e) {
        return res.status(400).send({
            message: "Bad request."
        })
    }
})

export { router as searchTermRouter }