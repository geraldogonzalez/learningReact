import React, { useState } from 'react';

function Formulario({datosConsulta}) {

    // Creamos nuestro state.

    // busqueda = state
    // guardarBusqueda = this.setState

    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    });


    const handleChange = e => {
        // Cambiar los datos del state.
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    const consultarClima = e => {
        e.preventDefault();

        // Pasar búsqueda del usuario hacia el componente principal.
        datosConsulta(busqueda);
    }

    return (
        <form
            onSubmit={consultarClima}
        >
            <div className="input-field col-s12">
                <input 
                type="text"
                id="ciudad"
                name="ciudad"
                onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad:</label>
            </div>

            <div className="input-field col-s12">
                <select name="pais" onChange={handleChange}>
                    <option value="">Selecciona un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="IT">Italia</option>
                    <option value="ES">España</option>
                    <option value="AR">Argentina</option>
                    <option value="MX">México</option>
                    <option value="EN">Inglaterra</option>
                    <option value="VE">Venezuela</option>
                </select>
            </div>

            <div className="input-field col s12">
                <input type="submit" value="Buscar clima" className="waves-effect waves-light btn-large btn-block yellow accent-4"/>
            </div>
        </form>
    )

}

export default Formulario;