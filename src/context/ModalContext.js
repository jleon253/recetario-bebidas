import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const ModalContext = createContext()

const ModalProvider = (props) => {
	const [idBebida, setIdBebida] = useState(null)
  const [consultar, setConsultar] = useState(false)
  const [recetaInfo, setRecetaInfo] = useState(null)

	useEffect(() => {
    if(consultar) {
			const buscarReceta = async () => {
				const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idBebida}`
				const respuesta = await axios
					.get(url)
					.then((res) => res.data.drinks[0])
					.catch((error) => {
						if (error.request) {
							console.log(error.request)
						} else if (error.response) {
							console.log(error.response)
						} else {
							console.log(error)
						}
					})
        setRecetaInfo(respuesta)
			}
			buscarReceta()
		}
	}, [idBebida, consultar])

	return (
		<ModalContext.Provider
      value={{
        recetaInfo,
        setIdBebida,
        setConsultar,
        setRecetaInfo
			}}
		>
			{props.children}
		</ModalContext.Provider>
	)
}

export default ModalProvider
