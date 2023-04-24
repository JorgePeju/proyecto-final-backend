const express = require('express');
const cors = require("cors");

//dotenv
require('dotenv').config();

const { connection } = require('./database/dbConect')

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

//* CONEXION A BBDD
connection()

//* Para parsear // traducir
app.use(express.json());

//* Para parsear req con urlencoded payload
app.use(express.urlencoded({ extended: false }));

//* RUTAS

//app.use('/api/v1', require('./routers/routersAdmin'));


//* Listener
app.listen(port, () => {
    console.log(`connected from port ${port}`)
})