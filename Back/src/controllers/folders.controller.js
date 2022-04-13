const foldersCtrl = {}

const Folder = require('../models/Folder')
const Item = require('../models/Item')

foldersCtrl.getFolders = async (req, res) => {
    const folders = await Folder.find()
    res.json(folders)
}

foldersCtrl.getFolder = async (req, res) => {
    const folders = await Folder.findById(req.params.id);
    res.json(folders)
}

foldersCtrl.createFolder = async (req, res) => {
    const { name, userId } = req.body;
    const newFolder = new Folder({
        name,
        userId: userId || 1
    })
    if (name != '') {
        await newFolder.save();
        res.json({ message: 'Folder Saved.' })
    } else {
        res.json({ message: 'Name data is needed.' })
    }
}

foldersCtrl.deleteFolder = async (req, res) => {
    await Folder.findByIdAndDelete(req.params.id);
    await Item.deleteMany({ folderId: req.params.id });
    res.json({message: 'Folder deleted.'})
}

foldersCtrl.updateFolder = async (req, res) => {
    const { name } = req.body
    await Folder.findByIdAndUpdate(req.params.id, { name })
    res.json({ message: 'Folder updated.' })
}

module.exports = foldersCtrl;