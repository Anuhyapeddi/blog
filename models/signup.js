const mongoose = require('mongoose')
const Schema = mongoose.Schema

const signupSchema = new Schema({
    username: {
        type: String, 
        requried: true
    }, 
    email:{ 
        type : String,
        requried: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true})

const Signup = mongoose.model('Signup', signupSchema, 'signup details')
module.exports = Signup