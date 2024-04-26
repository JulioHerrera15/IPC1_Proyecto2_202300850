import React, { useState, useEffect } from "react";
import UserFrameSideBar from "./UserFrameSideBar";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import "./index.css";
import ColorModeToggle from "./ColorModeToggle";

function HomeUser({ darkMode, toggleDarkMode }) {
  const [nombres, setNombres] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);

  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    try {
      const response = await fetch(
        `http://localhost:3000/getCustomer/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error al obtener el usuario:", response.status);
        return;
      }

      const result = await response.json();
      setNombres(result.nombres);
    } catch (error) {
      console.log(error);
    }
  };

  const getPublicaciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/getPublicaciones", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error al obtener las publicaciones:", response.status);
        return;
      }

      const result = await response.json();
      setPublicaciones(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getPublicaciones();
  }, []);

  return (
    <div className="dark:bg-slate-800 dark:text-white pt-40">
      <UserFrameSideBar />
      <h1 className="text-2xl font-bold text-center">
        ¡Bienvenido {nombres}!
      </h1>
      <h2 className="text-xl font-bold text-center mt-10">
        Estas son tus publicaciones y de otros usuarios:
      </h2>
      <div className="flex flex-col items-center m-10">
  {publicaciones.map((publicacion) => (
    
    <Publicacion key={publicacion.id} publicacion={publicacion} />
  ))}
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

export default HomeUser;


function Publicacion ({ publicacion }) {
  const [like, setLike] = React.useState(false);
  const [likes, setLikes] = React.useState(Number(publicacion.likes) || 0);

  const handleLike = async () => {
  setLike(!like);
  let newLikes = likes;
  if (!like) {
    newLikes = likes + 1;
  } else {
    newLikes = likes - 1;
  }
  setLikes(newLikes);

  try {
    const response = await fetch(`http://localhost:3000/updateLikes/${publicacion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    });

    if (!response.ok) {
      console.error("Error al actualizar los likes:", response.status);
      return;
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      key={publicacion.id}
      className="bg-white dark:bg-slate-700 shadow-md rounded-lg w-full p-4 m-4"
    >
      <h3 className="text-xl font-bold text-center mb-1">{publicacion.titulo}</h3>
      <p className="text-sm text-center mb-2">Categoría: {publicacion.categoria}</p>          
      <p className="text-sm text-center mb-2">Autor: {publicacion.autor}</p>            
      <p className="text-lg">{publicacion.descripcion}</p>
      <div className="flex justify-between mt-4">
        <button className="flex items-center" onClick={handleLike}>
          <BiSolidLike className="text-blue-500 text-xl mr-2" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center">
          <FaComment className="text-blue-500 text-xl mr-2" />
          <span>{publicacion.comentarios}</span>
        </button>
      </div>
    </div>
  );
}