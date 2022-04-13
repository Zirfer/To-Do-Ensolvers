const express = require('express');
const { getFolders, createFolder, getFolder, updateFolder, deleteFolder } = require('../controllers/folders.controller');
const router = express.Router();

router.route('/')
    .get(getFolders)
    .post(createFolder)

router.route('/:id')
    .get(getFolder)
    .put(updateFolder)
    .delete(deleteFolder)

module.exports = router;