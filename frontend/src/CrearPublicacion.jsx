import React from 'react'
import UserFrameSideBar from './UserFrameSideBar'
import { useState } from 'react'
import axios from 'axios'
import './index.css';

function CrearPublicacion() {
  const {descripcion, setDescripcion} = useState('')
  const {categoria, setCategoria} = useState('')
  const {imagen, setImagen} = useState('')
  const {anonimo, setAnonimo} = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        try{
          const response = await axios.post('/api/posts', {
            descripcion,
            categoria,
            imagen,
            anonimo
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response.data);
    
        } catch (error) {
          console.error(error);
        }  
    
        
      };
  return (
    
    <div>
    <UserFrameSideBar />
    <div className="flex justify-center">      
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <div className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Crea una nueva publicación
        </div>

        <div className="input-field mt-12">
          <label htmlFor="descripcion">Descripción</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" />
        </div>

        <div className="input-field mt-12">
          <label htmlFor="categoria">Categoría</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" required className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoComplete="off" />
        </div>

        <div className="input-field mt-12">
          <label htmlFor="imagen">Carga una imagen (opcional)</label>
          <input type="file" value={imagen} onChange={(e) => setImagen(e.target.value)} className="mt-2" />
        </div>

        <div className="input-field mt-12">
          <label htmlFor="anonimo">Anónimo</label>
          <input type="checkbox" value={anonimo} onChange={(e) => setAnonimo(e.target.checked)} className="mt-2" />
        </div>

        <button type="submit" className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">Publicar</button>
      </form>
      </div>
    </div>
  )
}

export default CrearPublicacion