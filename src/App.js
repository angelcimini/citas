import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/formulario';
import Cita from './components/cita';

function App() {

// citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
  citasIniciales = [];
}

//array de citas
const [citas, guardarCitas] = useState(citasIniciales);

//useEffect para ciertas operaciones cuando el state cambia
useEffect( ()=>{
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(citasIniciales){
    localStorage.setItem('citas', JSON.stringify(citas));
  } else {
    localStorage.setItem('citas', JSON.stringify([]));
  }
}, [citas] );

//funcion que elimina una cita por su ID
const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !== id);
  guardarCitas(nuevasCitas);
}

//funcion que tome las citas actuales y agregue la nueva
const crearCita = cita => {
  guardarCitas([ ...citas, cita ]);
}

//mensaje condicional
const titulo = citas.length === 0 ? 'no hay citas' : 'Administra tus citas'

  return (
    <Fragment>
    <h1>Administrador pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          ></Formulario>
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita=>(
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
