const express = require('express');
const router = express.Router();

//* const { validateInputs } = require('../middleware/inputValidator');
const { deleteUserAdmin,editUserAdmin,getUserAdmin,getUsersAdmin} = require('../controllers/usersControllers');

router.get('/', getUsersAdmin);

router.get('/:id', getUserAdmin);

router.put('/:id', editUserAdmin);

router.delete('/:id', deleteUserAdmin);

module.exports = router;