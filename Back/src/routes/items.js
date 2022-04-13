const express = require('express');
const { getItems, createItem, getItem, updateItem, deleteItem, updateItemCompleted } = require('../controllers/items.controller');
const router = express.Router();

router.route('/')
    .get(getItems)
    .post(createItem)

router.route('/:id')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

router.route('/completed/:id')
    .put(updateItemCompleted)

router.route('/folder/:idFolder')
    .get(getItems)

module.exports = router;