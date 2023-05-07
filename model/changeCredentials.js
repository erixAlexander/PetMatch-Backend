const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeCredentialsSchema = new Schema({
    email: {
        type: String,
    },
    hashed_password: {
        type: String,
    },
    user_id:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('changeCredentials', changeCredentialsSchema, 'users');