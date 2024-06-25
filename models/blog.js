const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title : {
        type: String,
        requried: true
    },
    snippet : {
        type: String,
        required: true
    },
    body : {
        type: String, 
        requried: true
    }
}, { timestamps : true })

const Blog = mongoose.model('Blog', blogSchema, 'blogs')
module.exports = Blog