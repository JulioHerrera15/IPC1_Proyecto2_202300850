import React from "react";
import { useState } from "react";
import UserFrameSideBar from "./UserFrameSideBar";
import ColorModeToggle from "./ColorModeToggle";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import "./index.css";
import { IoMdSend } from "react-icons/io";

function Tendencias({darkMode, toggleDarkMode}) {
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

      let result = await response.json();
      // Ordenar las publicaciones por likes de mayor a menor
      result = result.sort((a, b) => b.likes - a.likes);
      setPublicaciones(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
    getPublicaciones();
  }, []);
  return (
    <div className="dark:bg-slate-800 dark:text-white pt-40">
      <UserFrameSideBar />
      <h1 className="text-2xl font-bold text-center">¡Bienvenido {nombres}!</h1>
      <h2 className="text-xl font-bold text-center mt-10">
        ¡Estas son las tendencias dentro de USocial!
      </h2>
      <div className="flex flex-col items-center m-10">
        {publicaciones.length > 0 ? (
          [...publicaciones]
             
            .map((publicacion) => (
              <Publicacion
                key={publicacion.id}
                publicacion={publicacion}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            ))
        ) : (
          <p className="text-3xl font-bold text-center m-20 text-gray-500">
            ¡No hay nada por el momento! Vuelve más tarde o ¡crea una
            publicación e informa a la comuidad San Carlista!{" "}
          </p>
        )}
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

export default Tendencias;

function Publicacion({ publicacion, userId, darkMode }) {
  const [like, setLike] = React.useState(false);
  const [likes, setLikes] = React.useState(Number(publicacion.likes) || 0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = React.useState([]); // Inicializa comments con un array vacío
  const toggleCommentBox = () => setShowCommentBox(!showCommentBox);
  const [currentComment, setCurrentComment] = useState("");

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
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const user = await getUser(userId);
      const response = await fetch(
        `http://localhost:3000/comentarios/${publicacion.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comentario: currentComment,
            userId,
            userName: user.nombres,
            carrera: user.carrera,
            facultad: user.facultad,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error al enviar el comentario:", response.status);
        return;
      }

      const result = await response.json();
      console.log(result);
      setComments(comments ? [...comments, result] : [result]);
      setShowCommentBox(false);
      setCurrentComment("");
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar los likes
  React.useEffect(() => {
    setLikes(Number(publicacion.likes) || 0);
    if (publicacion.likesFrom && publicacion.likesFrom.includes(userId)) {
      setLike(true);
    } else {
      setLike(false);
    }

    const fetchPublicacion = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/getPublicaciones/${publicacion.id}`
        );
        const data = await response.json();
        // Verifica si data.comentarios es undefined. Si lo es, establece los comentarios a un array vacío.
        // Si no lo es, verifica si es un array. Si no lo es, conviértelo en un array.
        setComments(
          data.comentarios === undefined
            ? []
            : Array.isArray(data.comentarios)
            ? data.comentarios
            : [data.comentarios]
        );
      } catch (error) {
        console.log("Error al cargar la publicación:", error);
      }
    };

    fetchPublicacion();
  }, [publicacion.likes, publicacion.likesFrom, publicacion.id]);

  const handleLike = async () => {
    setLike(true);
    let newLikes = likes + 1;
    setLikes(newLikes);
  
    try {
      const response = await fetch(
        `http://localhost:3000/updateLikes/${publicacion.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, likes: newLikes }),
        }
      );
  
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
      <h3 className="text-xl font-bold text-center mb-1">
        {publicacion.titulo}
      </h3>
      <p className="text-sm text-center">Categoría: {publicacion.categoria}</p>
      <p className="text-sm text-center">Autor: {publicacion.autor}</p>
      <p className="text-sm text-center">
        {publicacion.carrera} ({publicacion.facultad})
      </p>
      <div className="post-date">
        <p className="text-sm text-center mb-2">
          Publicado el: {new Date(publicacion.fecha).toLocaleString()}
        </p>
      </div>
      <p className="text-lg">{publicacion.descripcion}</p>
      {publicacion.imagen && (
        <img
          src={`http://localhost:3000/public/${publicacion.imagen}`}
          alt=""
          className="w-100 m-auto h-80 object-cover mt-4"
        />
      )}
      <div className="flex justify-between mt-4">
        <button className="flex items-center" onClick={handleLike}>
          <BiSolidLike className="text-blue-500 text-xl mr-2" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center" onClick={toggleCommentBox}>
          <FaComment className="text-blue-500 text-xl mr-2" />
          Comentar ({(comments && comments.length) || 0})
        </button>
      </div>
      {showCommentBox && (
        <div className="flex flex-wrap items-center justify-center">
          <textarea
            className={`w-full p-2 mt-2 rounded-lg ${
              darkMode ? "bg-gray-600 text-white" : "bg-white"
            }`}
            placeholder="Escribe un comentario..."
            onChange={handleCommentChange}
            value={currentComment}
          ></textarea>

          <button
            className="bg-blue-500 text-white rounded-lg p-2 mt-2 flex items-center justify-center"
            onClick={handleCommentSubmit}
          >
            Publicar comentario
            <IoMdSend className="items-center ml-2 justify-center" />
          </button>
        </div>
      )}
      {comments &&
        comments.map((comment, index) => (
          <div
            className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 m-4"
            key={index}
          >
            <div className="flex justify-between">
              <p className="text-lg font-bold">
                {comment.userName}{" "}
                <span className="text-sm">
                  (Estudia {comment.carrera} en {comment.facultad})
                </span>
              </p>

              <p>{new Date(comment.fecha).toLocaleString()}</p>
            </div>
            <p className="text-lg mt-5">{comment.comentario}</p>
          </div>
        ))}
    </div>
  );
}
