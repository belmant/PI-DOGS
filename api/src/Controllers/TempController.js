const {Temperamento} = require('../db.js');
const axios = require('axios');
const {API_KEY} = process.env;
// const {Op} = require('sequelize');
require('dotenv').config();


const temperamento = async (req, res) => {
    try {
    //buscamos si está la base de datos de temperamento creada
    //si no, hacemos un llamado a la API
    let dbContent = await Temperamento.findAll({order: [
        ['name', 'ASC']]});
    if (dbContent.length === 0) {

    const apiRes = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = apiRes.data; //Data de la API
    let temp = apiInfo.map((el) => {
        if (el.temperament) {//SI EXISTE EL TEMPERAMENTO, LE HACE UN SPLIT, SI NO, NO
            return el.temperament.split(", "); //cuando es undefined JS Directamente pasa de él,
        }
        });
        temp = temp.flat(); //'aplana' el array
        temp = temp.filter((item, index) => {
            return temp.indexOf(item) === index; //filtra para que no haya temperamentos repetidos
        });

        temp = temp.filter(Boolean)//Saco el temperamento null

        //creamos la base de datoosss
        for (let i = 0; i < temp.length; i++) {
        let aux = temp[i];await Temperamento.bulkCreate([
            {
                name: aux, //definimos en el modelo de temperamento el nombre del mismo
            },
        ]);
        }
        dbContent = await Temperamento.findAll({order: [
            ['name', 'ASC']]}); //volvemos a hacerle un findAll()
        return res.status(200).json(dbContent); //retorna el contenido de la base de datos :D
    } else {
        //este else es por si ya existe la DB no haga llamado a la API de nuevo
        return res.status(200).json(dbContent);
    }
    } catch (error) {
    return res.status(500).json({ msg: error.message });
    }
};

module.exports= {temperamento};