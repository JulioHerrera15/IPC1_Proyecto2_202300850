import React from 'react'
import UserFrameSideBar from './UserFrameSideBar'
import { useState } from 'react'
import './index.css';
import ColorModeToggle from "./ColorModeToggle";

function CrearPublicacion({ darkMode, toggleDarkMode }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [autor, setAutor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagen, setImagen] = useState('')
  const [anonimo, setAnonimo] = useState(false)


  const getUser = () => {
    let user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined;
    }
  };

  let user = getUser();
  let userId = user ? user.id : undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      titulo,
      descripcion,
      autor,
      categoria,
      imagen,
      anonimo
    }
    try {
      const response = await fetch(`http://localhost:3000/crearPublicacion/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });      
  
      const result = await response.json();
      console.log(result);
      
    } catch (error) {
      const result = JSON.parse(error.message);
      setServerMessage(result.message);
    }
  }
  return (
    
    <div>
    <UserFrameSideBar />
    <div className="flex justify-center">      
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <div className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Crea una nueva publicación
        </div>

        <div className="input-field mt-12">
          <label htmlFor="titulo">Título</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo" required className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="off" />
        </div>

        <div className="input-field mt-8">
          <label htmlFor="descripcion">Descripción</label>
          <textarea type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoComplete="off" />
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
      <div className="bg-gray-900 dark:bg-slate-900">
        <div className="flex items-center justify-center h-20">
          <p className="text-white dark:text-gray-400">
            © 2021 <span className="text-blue-500">U</span>Social. Todos los
            derechos reservados.
          </p>
          <div className="scale-75 text-white unique-class">
            <ColorModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              className="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrearPublicacion