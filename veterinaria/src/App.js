import React, {Component} from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  
  state = {
    citas: []
  }

  // Al cargar la aplicación se ejecuta componentDidMount().
  componentDidMount () {
    // Almaceno las citas que estén en localStorage en una variable, y las convierto en un objeto.
    const citasLS = JSON.parse(localStorage.getItem('citas'));

    // Actualizo el state conforme a lo que haya en localStorage.
    if(citasLS) {
      this.setState({
        citas: citasLS
      })
    }
  }

  // Al agregar o eliminar una cita se ejecuta componentDidUpdate().
  componentDidUpdate () {
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    // Copiamos el state actual.
    const citas = [...this.state.citas, datos];

    // Agregar al nuevo state.
    this.setState({
      citas
    })

  }

  eliminarCita = id => {
    // Creo una copia del state actual.
    const citasActuales = [...this.state.citas];


    // Utilizo 'filter()' para sacar el elemento con el @id seleccionado del arreglo.
    const citas = citasActuales.filter( cita => cita.id !== id )

    // Actualizo el state.

    this.setState({
      citas
    })

  }

  render() {
    return (
      <div className="container">
        <Header 
          titulo="Administrador de pacientes veterinaria"
        />  

        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita 
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas 
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>

      </div>
    );
  }
  
}

export default App;
