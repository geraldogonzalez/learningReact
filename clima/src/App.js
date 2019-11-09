import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // State principal
  // ciudad = state, guardarCiudad = this.setState()
  const [ pais, guardarPais ] = useState('');
  const [ ciudad, guardarCiudad ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  useEffect(() => {

    // Prevenir ejecución inicial.
    if(ciudad === '') return;

    const consultarAPI = async () => {

      let appId = 'aa597b6831ded6dee8b22bcaf050044b';
  
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      // Consultar la URL.
  
      let respuesta = await fetch(url);
      let resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }

    consultarAPI();
  }, [ ciudad, pais ]);

  const datosConsulta = datos => {
    // Validamos que ambos campos estén llenos.
    if(datos.pais === '' || datos.pais === ''){
      guardarError(true);
      return;
    }

    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  // Cargar un componente condicionalmente.
  
  let componente;

  if(error){
    // Hay un error. Cargar el componente de error.
    componente = <Error mensaje= 'Ambos campos (ciudad y pais) son obligatorios' />;
  } else if (resultado.cod === "404") {
    componente = <Error mensaje='Esta ciudad no existe en nuestros registros' />;
  } else {
    // Mostrar el clima.
    componente = <Clima 
                  resultado={resultado}  
                />;
  }

  return (
    <div className="App">
      <Header 
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;