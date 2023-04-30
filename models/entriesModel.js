const { Schema, model } = require('mongoose');

const EntrySchema = new Schema({

    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
    },
    icon: {
        options: {
            iconSize: { type: [Number], required: true },
            iconAnchor: { type: [Number], required: true },
            popupAnchor: { type: [Number], required: true },
            iconUrl: { type: String, required: true },
            iconType: { type: String, required: true }
        },
        _initHooksCalled: { type: Boolean, default: true }
    }
});

module.exports = model('Entry', EntrySchema)


// title: {
//     type: String,
//     required: true,
//     // trim: true
// },
// description: {
//     type: String,
//     required: true,
//     // trim: true
// },
// date: {
//     type: Date,
//     default: Date.now
// },
// user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//    // required: true,
// }