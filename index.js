const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/mysqlConfig');
const path = require("path")

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection;

// CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/projects', require('./routes/projects') );
app.use('/', (req, res)=> res.sendFile(path.join(__dirname,"public/index.html")) );

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

