import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserFrameSideBar from './UserFrameSideBar';
import ColorModeToggle from './ColorModeToggle';
import { useParams } from "react-router-dom";

function EditarPerfil({darkMode, toggleDarkMode}) {
  const [carnet, setCarnet] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [facultad, setFacultad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { id } = useParams();
    const getUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/getCustomer/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();      
            setCarnet(data.carnet);
            setNombres(data.nombres);
            setApellidos(data.apellidos);
            setFacultad(data.facultad);
            setCarrera(data.carrera);
            setCorreo(data.correo);
            setContrasena(data.password);   
          
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
          id: Number(id),
          carnet: carnet,
          nombres: nombres,
          apellidos: apellidos,
          facultad: facultad,
          carrera: carrera,
          correo: correo,
          password: contrasena,
        };
        try {
          const response = await fetch(`http://localhost:3000/updateCustomer`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          toast.success(result.message, {
            theme: darkMode ? "dark" : "light",
            position: "top-center"
          });
        } catch (error) {
          toast.error(error)
        }
      };

    useEffect(() => {
        getUser();
    }, []);

  return (
    <div>
        <UserFrameSideBar />
        <header className="flex justify-between items-center bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4 rounded-tl-3xl">
          <h2 className="font-semibold text-xl mt-2 pt-16">
            Editar Perfil
          </h2>
        </header>
        <div className="px-2 bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4 ">
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Carnet
                </label>
                <input
                  type="text"
                  id="input"
                  name="carnet"
                  value={carnet}
                  onChange={(e) => setCarnet(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Nombres
                </label>
                <input
                  type="text"
                  id="input"
                  name="nombres"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="input"
                  name="apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Facultad
                </label>
                <input
                  type="text"
                  id="input"
                  name="facultad"
                  value={facultad}
                  onChange={(e) => setFacultad(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Carrera
                </label>
                <input
                  type="text"
                  id="input"
                  name="carrera"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Correo
                </label>
                <input
                  type="email"
                  id="input"
                  name="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold dark:text-white m-3" htmlFor="input">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="input"
                  name="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              
              </div>
              <div className="items center justify-center flex-col md:flex-row flex">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Actualizar usuario
                </button>
            </div>
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
        <ToastContainer />
    </div>
  )
}

export default EditarPerfil