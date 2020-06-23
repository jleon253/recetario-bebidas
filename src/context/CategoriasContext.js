import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// Crear context
export const CategoriasContext = createContext()

// Crear el provider: donde se encuentran las funciones y state
const CategoriasProvider = (props) => {
	const [categorias, setCategorias] = useState([])

	useEffect(() => {
		const buscarCategorias = async () => {
			const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
			const respuesta = await axios
				.get(url)
				.then((res) => res.data)
				.catch((error) => {
					if (error.request) {
						console.log(error.request)
					} else if (error.response) {
						console.log(error.response)
					} else {
						console.log(error)
					}
				})
			setCategorias(respuesta.drinks)
		}
		buscarCategorias()
	}, [])
	/**
	 * Lo que esta disponible para los componentes hijos, (variables y funciones) se colocan en forma de objeto dentro de value.
	 * Los componentes hijos estaran en {props.children}, para compartirsen datos
	 *  */
	return (
		<CategoriasContext.Provider value={{ categorias }}>
			{props.children}
		</CategoriasContext.Provider>
	)
}
export default CategoriasProvider
