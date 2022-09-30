const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: [true, 'Enter a user email'],
    }
})