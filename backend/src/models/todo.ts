import mongoose from 'mongoose'

interface ITodo {
    title: String
    description: String
}

interface TodoDoc extends mongoose.Document {
    title: String
    description: String
}

interface TodoModelInterface extends mongoose.Model<TodoDoc> {
    build(attr: ITodo): TodoDoc
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

todoSchema.statics.build = (attr: ITodo) => {
    return new Todo(attr)
}

const Todo = mongoose.model<any, TodoModelInterface>('Todo', todoSchema)



export { Todo }