const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  

const ReadMessageSchema = new Schema({

    user_matches: [{
        user_id: String,
        read: Boolean,
        timestamp: String
    }],
    email: {
        type: String,
    },
    user_id:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ReadMessageSchema', ReadMessageSchema, 'users');