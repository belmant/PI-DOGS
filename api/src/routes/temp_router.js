const { Router } = require("express");
const { temperamento } = require("../Controllers/TempController.js");
const router = Router();

router.get("/", temperamento);

module.exports = router;