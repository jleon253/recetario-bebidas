import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const RecetasContext = createContext()

const RecetasProvider = (props) => {
	const [busquedaReceta, setBusquedaReceta] = useState({
		nombre: '',
		categoria: '',
	})
	const [recetas, setRecetas] = useState([])
	const [consultar, setConsultar] = useState(false)
	const [cargando, setCargando] = useState(false)

	const { nombre, categoria } = busquedaReceta

	useEffect(() => {
    if(consultar) {
      setCargando(true)
			const buscarReceta = async () => {
				const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
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
				setRecetas(respuesta.drinks)
        setCargando(false)
			}
			buscarReceta()
		}
	}, [busquedaReceta, consultar, nombre, categoria])

	return (
		<RecetasContext.Provider
			value={{
        recetas,
        cargando,
				setBusquedaReceta,
				setConsultar,
			}}
		>
			{props.children}
		</RecetasContext.Provider>
	)
}

export default RecetasProvider
