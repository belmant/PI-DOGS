import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperaments } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./dogCreate.css";

export default function DogCreate() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  const history = useHistory();
  const [error, setError] = useState({});
  const [msg, setMsg] = useState(false);

  const [input, setInput] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minlifeSpan: "",
    maxlifeSpan: "",
    temperaments: [],
  });

  const sendToApi = {
    name: input.name,
    image: input.image,
    height: `${input.minHeight} - ${input.maxHeight}`,
    weight: `${input.minWeight} - ${input.maxWeight}`,
    lifeSpan: `${input.minlifeSpan} - ${input.maxlifeSpan}`,
    temperament: input.temperaments ? input.temperaments.join(", ") : "",
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function validate(input) {
    const errors = {};
    if (!/^[a-zA-Z]+$/.test(input.name))
      errors.name = "El nombre es requerido";

    if (!/(https?:\/\/.*\.(?:png|jpg))/i.test(input.image))
      errors.image = "Ingrese Url valida";

    if (!/^[0-9]+$/.test(input.minWeight)) {
      errors.minWeight = "Ingrese un peso minimo";
    } else {
      if (input.minWeight < 0 || input.minWeight > 10)
        errors.minWeight = "Ingrese un peso minimo";
    }

    if (!/^[0-9]+$/.test(input.maxWeight)) {
      errors.maxWeight = "Ingrese un peso maximo";
    } else {
      if (input.maxWeight < 10 || input.maxWeight > 50)
        errors.maxWeight = "Ingrese un peso maximo";
    }

    if (!/^[0-9]+$/.test(input.minHeight)) {
      errors.minHeight = "Ingrese una altura minima";
    } else {
      if (input.minHeight < 0 || input.minHeight > 10)
        errors.minHeight = "Ingrese una altura minima";
    }

    if (!/^[0-9]+$/.test(input.maxHeight)) {
      errors.maxHeight = "Ingrese una altura maxima";
    } else {
      if (input.maxHeight < 10 || input.maxHeight > 30)
        errors.maxHeight = "Ingrese una altura maxima";
    }

    if (!/^[0-9]+$/.test(input.minlifeSpan)) {
      errors.minlifeSpan = "Ingrese esperanza de vida minima";
    } else {
      if (input.minlifeSpan < 0 || input.minlifeSpan > 9)
        errors.minlifeSpan = "Ingrese esperanza de vida minima";
    }

    if (!/^[0-9]+$/.test(input.maxlifeSpan)) {
      errors.maxlifeSpan = "Ingrese esperanza de vida maxima";
    } else {
      if (input.maxlifeSpan < 10 || input.maxlifeSpan > 20)
        errors.maxlifeSpan = "Ingrese esperanza de vida maxima";
    }

    return errors;
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleSelect(e) {
    //   if(temperaments && e.temperaments === e.target.value)
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(validate(input));
    // if (!Object.entries(error.length)){
    dispatch(postDogs(sendToApi));
    setMsg(true);
    // console.log("-",input.minWeight,"-")
    // console.log(typeof input.minWeight)
    // console.log(input.minWeight?.length)
    if (!/^[a-zA-Z]+$/.test(input.name)) {
      setMsg(false);
    }

    if (input.minWeight?.length === 0) {
      if (!/^[0-9]+$/.test(input.minWeight)) {
        setMsg(false);
      } else {
        if (input.minWeight < 0 || input.minWeight > 10) {
          setMsg(false);
        }
      }
    }

    if (input.maxWeight?.length === 0) {
      if (!/^[0-9]+$/.test(input.maxWeight)) {
        setMsg(false);
      } else {
        if (input.maxWeight < 10 || input.maxWeight > 50)
        setMsg(false);;
      }
    }

    if (input.minHeight?.length === 0) {
      if (!/^[0-9]+$/.test(input.minHeight)) {
        setMsg(false);;
      } else {
        if (input.minHeight < 0 || input.minHeight > 10)
        setMsg(false);;
      }
    }

    if (input.maxHeight?.length === 0) {
      if (!/^[0-9]+$/.test(input.maxHeight)) {
        setMsg(false);;
      } else {
        if (input.maxHeight < 10 || input.maxHeight > 30)
          setMsg(false);
      }
    }

    if (msg === true) {
      setMsg(true);
      dispatch(postDogs(sendToApi));
      //   setMsg({exito:false});
      // setMsg({ error: false });

      setInput({
        name: "",
        image: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minlifeSpan: "",
        maxlifeSpan: "",
        temperaments: [],
      });
    }
    setMsg({ exito: true });
    setTimeout(() => {
      history.push("/home");
    }, 3000);

    // setMsg({exito:false});
    setMsg({ error: false });
  }

  function handleDeleteTemp(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((t) => t !== e),
    });
  }

  return (
    <div className="containerForm">
      <Link className="link" to="/home">
          <button className="goBack">Go back</button>
      </Link>
      <div className="createDog">
        <h1>Create your Dog</h1>
      </div>
      <form className="color2" onSubmit={(e) => handleSubmit(e)}>
        <div className="name">
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <span>{error.name}</span>}
        </div>
        <div className="image">
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {error.image && <span>{error.image}</span>}
        </div>
        <div className="heightMin">
          <label>Height Min:</label>
          <input
            type="text"
            value={input.minHeight}
            name="minHeight"
            onChange={handleChange}
          />
          {error.minHeight && <span>{error.minHeight}</span>}
        </div>
        <div className="heightMax">
          <label>Height Max:</label>
          <input
            type="text"
            value={input.maxHeight}
            name="maxHeight"
            onChange={handleChange}
          />
          {error.maxHeight && <span>{error.maxHeight}</span>}
        </div>
        <div className="weightMin">
          <label>Weight Min:</label>
          <input
            type="text"
            value={input.minWeight}
            name="minWeight"
            onChange={handleChange}
          />
          {error.minWeight && <span>{error.minWeight}</span>}
        </div>
        <div className="weightMax">
          <label>Weight Max:</label>
          <input
            type="text"
            value={input.maxWeight}
            name="maxWeight"
            onChange={handleChange}
          />
          {error.maxWeight && <span>{error.maxWeight}</span>}
        </div>
        <div className="lifeSpanMin">
          <label>Life Span Min:</label>
          <input
            type="text"
            value={input.minlifeSpan}
            name="minlifeSpan"
            onChange={handleChange}
          />
          {error.minlifeSpan && <span>{error.minlifeSpan}</span>}
        </div>
        <div className="lifeSpanMax">
          <label>Life Span Max:</label>
          <input
            type="text"
            value={input.maxlifeSpan}
            name="maxlifeSpan"
            onChange={handleChange}
          />
          {error.maxlifeSpan && <span>{error.maxlifeSpan}</span>}
        </div>
        <div className="selectTemp">
        <label>Temperament:</label>
          <select onChange={(e) => handleSelect(e)}>
            {allTemperaments.map((tmp) => (
              <option value={tmp.name}>{tmp.name}</option>
            ))}
          </select>
          {input.temperaments?.map((p) => (
            <span onClick={() => handleDeleteTemp(p)}>{p + " ,"}</span>
          ))}
        </div>
        <div className="btnBreed">
        <button className="createBreed" type="submit">Create new breed!</button>
            {msg && <span >Perrro creado exitosamente</span>}
            </div>
      </form>
    </div>
  );
}
