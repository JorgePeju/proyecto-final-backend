const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateInputs } = require('../middleware/inputValidator');
const { createEditUserSchema } = require('../helpers/schemaUserValidator')


module.exports = router;