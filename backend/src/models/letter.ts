import mongoose from 'mongoose'
import {SearchTermSchema} from "./searchTerm";

interface ILetter {
    letter: string
    children: Map<string, string>
    cache: Map<string, number>
    isSearchTerm: boolean
}

interface LetterDoc extends ILetter, mongoose.Document {}

interface LetterModelInterface extends mongoose.Model<LetterDoc> {
    build(attr: ILetter): LetterDoc
}


const LetterSchema = new mongoose.Schema({
    letter: {
        type: String,
        required: true
    },
    children: {
        type: Map,
        of: String,
        required: true
    },
    cache: {
        type: Map,
        of: {type: Number},
        required: true
    },
    isSearchTerm: {
        type: Boolean,
        required: true
    }
})

LetterSchema.statics.build = (attr: ILetter) => {
    return new Letter(attr)
}

const Letter = mongoose.model<any, LetterModelInterface>('Letter', LetterSchema)

export { Letter, LetterDoc }