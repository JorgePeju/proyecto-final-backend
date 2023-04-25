const express = require('express');
const router = express.Router();

//* const { validateInputs } = require('../middleware/inputValidator');
const { createEntry,deleteEntry,editEntry,getEntriesAdmin,getEntryAdmin } = require('../controllers/entriesController');

router.get('/', getEntriesAdmin);

router.get('/:id', getEntryAdmin);

router.post('/', createEntry);

router.put('/:id', editEntry);

router.delete('/:id', deleteEntry);

module.exports = router;