const { Router } = require('express');
const axios = require ('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./DogRoute.js');
const tempRouter = require('./TempRoute.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogRouter);
router.use('/', tempRouter);

module.exports = router;
