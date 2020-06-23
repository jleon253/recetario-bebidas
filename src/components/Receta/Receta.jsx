import React, { useContext, useEffect } from 'react'
import { ModalContext } from '../../context/ModalContext'
import Swal from 'sweetalert2'
import './Receta.css'
import Spinner from '../Spinner/Spinner'

const Receta = ({ receta }) => {
  let id;
  let nombre;
  let imagen;
  const {recetaInfo, setIdBebida, setConsultar, setRecetaInfo} = useContext(ModalContext)

  useEffect(() => {
		if (recetaInfo !== null) {
			let ingredientes = []
			for (let i = 1; i < 16; i++) {
				if ((recetaInfo[`strIngredient${i}`] !== null)&&(recetaInfo[`strIngredient${i}`] !== '')) {
					const ingrediente = `${recetaInfo[`strIngredient${i}`]}: ${
						recetaInfo[`strMeasure${i}`]
					}`
					ingredientes.push(ingrediente)
				}
      }
			Swal.fire({
				title: recetaInfo.strDrink,
				imageUrl: recetaInfo.strDrinkThumb,
        html: `<p class="text-left"><b>Instructions:</b></p>
        <p class="text-left">${
					recetaInfo.strInstructions
          }</p>
        <br/>
        <p class="text-left"><b>Ingredients:</b></p>
        <ul class="list-group">
        ${ingredientes.map((i) => (
          `<li class="list-group-item">${i}</li>`)
          ).join('')}
        </ul>`,
        confirmButtonText: 'Close',
        confirmButtonColor: '#dc3545',
      }).then(() => {
        setConsultar(false)
        setIdBebida(null)
        setRecetaInfo(null);
      })
      document.getElementById(id).classList.remove('cargando');
		}
	}, [recetaInfo, id, setConsultar, setIdBebida, setRecetaInfo])

	if (!receta) return

	id = receta.idDrink
	nombre = receta.strDrink
	imagen = receta.strDrinkThumb

	const mostrarReceta = () => {
    document.getElementById(id).classList.add('cargando');
    setIdBebida(id)
    setConsultar(true)
	}

	return (
		<div id={id} className='card'>
			<img
				src={imagen}
				className='card-img-top img-fluid img-thumbnail'
				alt={nombre}
			></img>
			<div className='card-body'>
				<h5 className='card-title'>{nombre}</h5>
				<button
					type='button'
					className='btn btn-outline-danger btn-block btn-lg my-4'
					onClick={mostrarReceta}
				>
          <span className="txt">View recipe</span>
          <Spinner/>
				</button>
			</div>
		</div>
	)
}

export default Receta
