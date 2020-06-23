import React from 'react'

import Header from './components/Header'
import Formulario from './components/Formulario'
import ListaRecetas from './components/ListaRecetas'

import CategoriasProvider from './context/CategoriasContext'
import RecetasProvider from './context/RecetasContext'
import ModalProvider from './context/ModalContext'

function App() {
	return (
		/**
		 * CategoriasProvider ya le permite usar a los componentes hijos,
		 * todas las varibles (state) y funciones que tenga disponibles.
		 * Por eso se debe ubicar en la raíz principal.
		 */
		<CategoriasProvider>
			<RecetasProvider>
				<ModalProvider>
					<div className='container'>
            <div className='row'>
              <Header />
            </div>
						<div className='row'>
							<Formulario />
						</div>
						<div className='row px-3'>
							<ListaRecetas />
						</div>
					</div>
				</ModalProvider>
			</RecetasProvider>
		</CategoriasProvider>
	)
}

export default App
