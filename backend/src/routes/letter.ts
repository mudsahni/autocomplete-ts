import express, { Request, Response } from 'express'
import * as config from 'config'
import { Letter } from '../models/letter'
import {getRoot} from "./util";

const router = express.Router()
// const rootCharacter = config.get('data.trie.root')

router.get('/api/letter', [], async (req: Request, res: Response) => {
    const letters = await Letter.find({})
    return res.status(200).send(letters)
})


router.get('/api/letter/:letter', [], async (req: Request, res: Response) => {
    const root = await getRoot()
    return res.status(200).send(root)
})


router.post('/api/letter', async (req: Request, res: Response) => {

    const {letter, children, cache, isSearchTerm } = req.body
    try {
        const letterDoc = Letter.build({letter, children, cache, isSearchTerm})
        await letterDoc.save()
        return res.status(201).send(letterDoc)
    } catch (e) {
        return res.status(400).send({
            message: "Bad request."
        })
    }

})

export { router as letterRouter }