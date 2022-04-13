const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    folderId: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: true
    },
    userId: Number,
    date: {
        type: Date,
        default: Date.now()
    },
    completed: false
}, {
    timestamps: true
})

module.exports = model('Item', itemSchema);