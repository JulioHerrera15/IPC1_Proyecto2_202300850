import React from "react";
import UserFrameSideBar from "./UserFrameSideBar";
import { useState } from "react";
import "./index.css";
import ColorModeToggle from "./ColorModeToggle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CrearPublicacion({ darkMode, toggleDarkMode }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [imageName, setImageName] = useState("");  

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
  
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('publicacion', JSON.stringify({
      titulo,
      descripcion,
      autor,
      categoria,
      anonimo,
    }));
  
    try {
      const response = await fetch(`http://localhost:3000/crearPublicacion/${userId}`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if(response.ok){
        toast.success(result.message, {
          position: "top-center",
          theme: darkMode ? "dark" : "light"        
        });
      } else{
        toast.error(result.message, {
          position: "top-center",
          theme: darkMode ? "dark" : "light"
        });
      }
      
    } catch (error) {
      const result = JSON.parse(error.message);
      toast.error(result.message, {
        position: "top-center",
        theme: darkMode ? "dark" : "light"
      });
    }
  }; 
  

  return (
    <div>
      <ToastContainer />
      <UserFrameSideBar />
      <div className="flex justify-center dark:bg-slate-800 dark:text-white pt-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16 mb-5"
        >
          <div className="text-2xl text-primary mt-4 mb-12 text-center font-bold">
            Crea una nueva publicación
          </div>

          <div className="input-field mt-12 text-center">
            <label className="font-bold" htmlFor="titulo">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Titulo"
              required
              className={`w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 focus:bg-white'}`}
              autoFocus
              autoComplete="off"
            />
          </div>

          <div className="input-field mt-8 text-center">
            <label className="font-bold" htmlFor="descripcion">Descripción</label>
            <textarea
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              required
              className={`w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 focus:bg-white'}`}
              autoComplete="off"
            />
          </div>
          <div className="input-field mt-12 text-center">
            <label className="font-bold" htmlFor="categoria">Categoría</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoría"
              required
              className={`w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 focus:bg-white'}`}
              autoComplete="off"
            />
          </div>

          <div className="input-field mt-12 text-center">
            <label className="font-bold" htmlFor="imagen">Carga una imagen (opcional)</label>
            <div className="flex flex-wrap justify-center">
              <label htmlFor="file-upload-imagen" className="custom-file-upload bg-green-500 px-5 py-2 cursor-pointer m-5 hover:bg-green-600 rounded-lg text-white font-bold">Cargar Imagen</label>
              <input
                id="file-upload-imagen"         
                type="file"                
                onChange={(e) => {
                  setImagen(e.target.files[0])
                  setImageName(e.target.files[0].name)
                }}
                className="mt-2 hidden"
              />
              {imageName && <p className="text-sm"><span className="font-bold text-sm">Imagen cargada: </span>{imageName}</p>}
            </div>
            
          </div>

          <div className="input-field mt-12">
            <label className="mr-2" htmlFor="anonimo">Publicar como Anónimo</label>
            <input
              type="checkbox"
              value={anonimo}
              onChange={(e) => setAnonimo(e.target.checked)}
              className="mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Publicar
          </button>
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
  );
}

export default CrearPublicacion;
