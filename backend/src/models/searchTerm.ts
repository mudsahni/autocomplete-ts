import mongoose from 'mongoose'

interface ISearchTerm {
    term: string
    count: number
}


interface SearchTermDoc extends ISearchTerm, mongoose.Document {}

interface SearchTermModelInterface extends mongoose.Model<SearchTermDoc> {
    build(attr: ISearchTerm): SearchTermDoc
}

const SearchTermSchema = new mongoose.Schema({
    term: {
        type: String,
        unique: true,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

SearchTermSchema.statics.build = (attr: ISearchTerm) => {
    return new SearchTerm(attr)
}

const SearchTerm = mongoose.model<any, SearchTermModelInterface>('SearchTerm', SearchTermSchema)


export { ISearchTerm, SearchTermSchema, SearchTerm }