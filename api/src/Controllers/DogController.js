const { Dog } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const {API_KEY} = process.env;
require("dotenv").config();


//función que consulta a la API y trae la info
const getInfo = async () => {
  const apiRes = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`);
  globalThis.dbContenido = apiRes.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      height: el.height.metric,
      weight: el.weight.metric,
      lifeSpan: el.life_span,
      temperament: el.temperament,
      image: el.image.url,
    };
  });
};
getInfo();


//Ruta Principal
const apiDog = async (req, res) => {
  try {
    let content = dbContenido;
    return res.status(202).json(content);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


//Ruta Post (Crear Perro)
const createDog = async (req, res) => {
  try {
    const { name, height, weight, lifeSpan, temperament, image } = req.body;
    /*- Crea una raza de perro en la base de datos relacionada con sus temperamentos */
    if (!name || !height || !temperament)
      return res.status(400).json({ message: "information required!" });
    await Dog.create({
      name,
      image,
      height,
      weight,
      temperament,
      lifeSpan,
    });
    let dbDog = await Dog.findAll(); // {} => longitud === 0
    let dbDogLength = Object.keys(dbDog).length;
    if (dbDogLength !== 0) {
      let noRepeat = {};
      dbContenido = dbContenido.concat(dbDog);
      dbContenido = dbContenido.filter((p) =>
      noRepeat[p.id]? false:(noRepeat[p.id]= true))}
    return res.status(200).send("Perro creado con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Ruta por Query
const apiNames = async (req, res) => {
  try {
    let dogName = req.query.name;
    let content = dbContenido;
    let dogMatched = content.filter((p) =>
      p.name.toLowerCase().includes(dogName.toLowerCase())
    );
    let dogMatchedLength = Object.keys(dogMatched).length;
    if (dogMatchedLength === 0)
      return res.status(404).json({ message: "Dog not found :(" });
    return res.status(200).json(dogMatched);
  } catch (error) { return res.status(500).json({ message: error.message})
  }};


//Ruta Id
const getId = async (req, res) => {
  try {
    let content = dbContenido;
    let dogMatch = content.find((p) => p.id.toString() === req.params.id);
    if(!dogMatch) return res.status(404).json({message: "Dog Not Found"})
    return res.status(200).json(dogMatch);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  apiDog,
  apiNames,
  getId,
  createDog,
};
