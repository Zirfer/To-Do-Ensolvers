const itemsCtrl = {}

const Item = require('../models/Item')
const Folder = require('../models/Folder')

itemsCtrl.getItems = async (req, res) => {

    const { idFolder } = req.params;

    idFolder ?
        await Item.find({ folderId: idFolder })
            .populate('folderId')
            .then(items =>
                res.json(items)
            )
        :
        await Item.find()
            .populate('folderId')
            .then(items =>
                res.json(items)
            )

}

itemsCtrl.getItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item)
}

itemsCtrl.createItem = async (req, res) => {
    const { content, folderId, userId, completed } = req.body;
    const newItem = new Item({
        content,
        folderId: folderId,
        userId: userId || 1,
        completed
    })
    if (content != '') {
        await newItem.save();
        res.json({ message: 'Item Saved.' })
    } else {
        res.json({ message: 'Content data is needed.' })
    }
}

itemsCtrl.deleteItem = async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted.' })
}

itemsCtrl.updateItem = async (req, res) => {
    const { content, folderId, completed } = req.body
    await Item.findByIdAndUpdate(req.params.id, {
        content,
        folderId,
        completed
    })
    res.json({ message: 'Item updated.' })
}

itemsCtrl.updateItemCompleted = async (req, res) => {
    const { completed } = req.body
    await Item.findByIdAndUpdate(req.params.id, { completed })
    completed ?
        res.json({ message: 'Item mark as completed.' })
        :
        res.json({ message: 'Item mark as incompleted.' })
}

module.exports = itemsCtrl;