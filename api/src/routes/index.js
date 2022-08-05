const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require("./dog_router.js");
// const temperament = require("./temp_router.js");
const temperamento = require("./temp_router.js")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", dogs);
router.use("/temperamento", temperamento);

module.exports = router