const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String
    } 
});

module.exports = mongoose.model('User', userSchema, 'users');