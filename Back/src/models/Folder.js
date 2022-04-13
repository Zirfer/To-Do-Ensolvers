const { Schema, model } = require('mongoose');

const folderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: Number,
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})

module.exports = model('Folder', folderSchema);