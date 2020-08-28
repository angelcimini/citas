import React, { Fragment, useState } from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [cita,actualizarCita]= useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
        
    const [error, actualizarError] = useState(false)

    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas} = cita;

    const submitCita = e => {
        e.preventDefault();
        
        // validar campos
        if(
            mascota.trim() === '' ||
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === ''
        ){
            actualizarError(true);
            return;
        }

        actualizarError(false);

        cita.id = uuid();
        
        crearCita(cita);

        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }


    //En input value pasamos el valor de cita.loquesea para refrescar el formulario
    return (
        <Fragment>
            <h1>Crear cita</h1>

            {error
            ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={handleChange}
                    value={mascota}
                ></input>
                <label>Nombre dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño mascota"
                    onChange={handleChange}
                    value={propietario}
                ></input>
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                ></input>
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                ></input>
                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
        );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;