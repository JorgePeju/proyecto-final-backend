const { Schema, model } = require('mongoose');

const EntrySchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
       // required: true,
    }

    
});

module.exports = model('Entry', EntrySchema)