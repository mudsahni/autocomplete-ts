import {Letter, LetterDoc} from "../models/letter";
import mongoose from "mongoose";

export const getRoot = async () => {
    return Letter.findOne({letter: "~"});
}

const upsertCache = async(cur:(LetterDoc & {_id: mongoose.Types.ObjectId}) | LetterDoc, term: string) => {
    if (!cur.cache.has(term)) {
        cur.cache.set(term, 1)
    } else {
        cur.cache.set(term, cur.cache.get(term)!+1)
    }
    return Letter.findByIdAndUpdate({_id: cur.id}, {cache: cur.cache}, {new: true})
}

export const parseTrie = async (term: string) => {
    const root = await getRoot()
    let cur:  (LetterDoc & {_id: mongoose.Types.ObjectId}) | null | LetterDoc = root
    const letters = term.split("")
    let count = 0
    while (count < letters.length) {
        if (cur != null) {
            const letter = letters[count]

            if (!cur.children.has(letter)) {
                const letterDoc = Letter.build({
                    letter:letter,
                    children:new Map<string, string>(),
                    cache: new Map<string, number>(),
                    isSearchTerm:false
                })
                const newLetter = await letterDoc.save()
                cur.children.set(newLetter.letter, newLetter.id)
                await Letter.findByIdAndUpdate(
                    {_id: cur.id},
                    {children: cur.children}
                )
            }

            cur = await Letter.findById(cur.children.get(letter))
            cur = await upsertCache(cur!, term)

            count++
        }
    }

    cur!.isSearchTerm = true
    cur = await Letter.findByIdAndUpdate({_id: cur!.id}, {isSearchTerm: cur!.isSearchTerm}, {new: true})
    return cur!.cache
}

