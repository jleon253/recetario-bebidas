import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'

const Formulario = () => {
	// Al usar useContext, ya tengo disponible para consumir ()dentro de este componente) todo lo que este dentro del objeto value de CategoriasContext
  const {categorias} = useContext(CategoriasContext)
  const {setBusquedaReceta, setConsultar} = useContext(RecetasContext)
  
  const [busqueda, setBusqueda] = useState({
    nombre: '',
    categoria: ''
  })

  // Función para leer los datos de los inputs
  const obtenerDatos = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  };

	return (
		<section className='col-md-12 my-4'>
      <form onSubmit={e => {
        e.preventDefault();
        setBusquedaReceta(busqueda)
        setConsultar(true)
      }}>
				<fieldset>
					<legend className='text-center'>
						Search drinks by ingredients and categories
					</legend>
				</fieldset>
				<div className='row mt-3'>
					<div className='form-group col-12 col-md-4 col-lg-4'>
						<label htmlFor="nombre">Ingredients</label>
						<input id="nombre" name="nombre" className='form-control' placeholder='Ex: vodka' onChange={obtenerDatos}/>
					</div>
					<div className='form-group col-12 col-md-4 col-lg-4'>
						<label htmlFor="categoria">Categories</label>
						<select id="categoria" name="categoria" className='form-control' onChange={obtenerDatos}>
							<option value=''>-- Choose here --</option>
							{categorias.map((categoria) => (
                <option
                  key={categoria.strCategory}
                  value={categoria.strCategory}
                >
									{categoria.strCategory}
								</option>
							))}
						</select>
					</div>
					<div className='col-12 col-md-4 col-lg-4 d-flex align-items-center'>
						<button type="submit" className='btn btn-danger btn-block'>
							Search drinks
						</button>
					</div>
				</div>
			</form>
			<hr />
		</section>
	)
}

export default Formulario
