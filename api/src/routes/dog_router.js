const { Router } = require("express");
const { apiDog, apiNames, getId, createDog } = require("../Controllers/DogController.js");

const router = Router();

router.get("/dog", apiDog);
router.get("/dogsName", apiNames);
router.get("/dogs/:id", getId);
router.post('/dogs', createDog)


module.exports = router;