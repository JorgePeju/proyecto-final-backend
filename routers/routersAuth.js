const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateInputs } = require('../middleware/inputValidator');
const { createEditUserSchema } = require('../helpers/schemaUserValidator')
const { checkToken }= require('../middleware/validateToken')
const {signIn, logOut, signUp}=require('../controllers/authControllers')

router.post('/login', signIn);

router.post('/register',[
    checkSchema(createEditUserSchema),
    validateInputs
],

signUp );

router.get('/logout', logOut);

// router.get('/renew', getEntriesAdmin);

module.exports = router;