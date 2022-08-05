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
    const { name, height, weight, lifeSpan, temperaments, image } = req.body;
    /*- Crea una raza de perro en la base de datos relacionada con sus temperamentos */
    if (!name || !height || !temperaments || !image)
      return res.status(400).json({ message: "information required!" });
    await Dog.create({
      name,
      image,
      height,
      weight,
      temperaments,
      lifeSpan,
    });
    let dbDog = await Dog.findAll(); // {} => longitud === 0
    let dbDogLength = Object.keys(dbDog).length;
    if (dbDogLength !== 0) {
      dbContenido = dbContenido.concat(dbDog);
    }
    return res.status(200).send("Perro creado con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Ruta por Query
const apiNames = async (req, res) => {
  try{
  let infoApi = await getInfo();
  let info = infoApi.map((el) => {
    return {
      id: el.id,
      name: el.name,
      height: el.height.metric,
      weight: el.weight.mentric,
      lifeSpan: el.life_span,
      temperament: el.temperament,
    };
  });
  const DogMatch = info.filter((p) =>
    p.name.toLowerCase().includes(req.query.name.toLowerCase())
  );
  if (DogMatch.length === 0) {
    return res.status(404).json({ message: "Dog Not Found" });
  } else {
    return res.status(200).json(DogMatch);
  }}catch(error){
  res.status(500).json({msg: error.message})
  }
};

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
