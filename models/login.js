const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    email: {
        type: String, 
        requried: true
    }, 
    password: {
        type: String, 
        required: true
    }
}, {timestamps: true})

const LoginModel = mongoose.model('LoginModel', loginSchema, 'login details')
module.exports = LoginModel
