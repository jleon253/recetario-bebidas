import React, {useContext} from 'react';
import {RecetasContext} from '../context/RecetasContext'
import Receta from './Receta/Receta'
import Spinner from './Spinner/Spinner'

const ListaRecetas = () => {

  const {recetas, cargando} = useContext(RecetasContext);

  return (
    cargando ? <Spinner /> : (
      (recetas.length === 0) ? null : <section className="col-12">
        <h2 className="text-center">Drinks list</h2>
        <div className="row">
          <div className="card-columns">
            {recetas.map(receta => (
              <Receta key={receta.idDrink} receta={receta}/>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default ListaRecetas;