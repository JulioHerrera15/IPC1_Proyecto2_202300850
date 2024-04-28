import { React, useState, useEffect, createContext, useContext } from "react";
import imgLogo from "./assets/usocialLogo.png";
import { RiPushpin2Line } from "react-icons/ri";
import "./index.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { GoPin } from "react-icons/go";
import ColorModeToggle from "./ColorModeToggle";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import { CSVLink } from "react-csv";
import { FaFileExport } from "react-icons/fa6";

const SideBarContext = createContext();
const Publicaciones = ({ darkMode, toggleDarkMode, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const [publicaciones, setPublicaciones] = useState(null);

  const headers = [
    { label: "Titulo", key: "titulo" },
    { label: "Descripcion", key: "descripcion" },
    { label: "Categoria", key: "categoria" },
    { label: "Nombre Real", key: "nombreReal" },
    { label: "Anonimo", key: "anonimo" },
    { label: "Fecha", key: "fecha" },
  ];

  const getPublicaciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/getPublicaciones", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      alert("Error al solicitar las publicaciones");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = (e) => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  const handleDelete = async (id) => {
    confirmAlert({
      overlayClassName: darkMode ? "custom-overlay-dark" : "",
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui dark:text-white">
            <h1 className="text-2xl font-bold items-center justify-center text-center m-6">
              Confirmar eliminación
            </h1>
            <p>¿Estás seguro de que quieres eliminar esta publicación?</p>
            <div className="mt-6 flex items-center justify-center">
              <button
                className="bg-black dark:bg-white dark:text-black text-white rounded py-2 px-5 mx-2 my-2"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white rounded py-2 px-5 mx-2 my-2"
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `http://localhost:3000/deletePost/${id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const result = await response.json();

                    if (response.ok) {
                      setPublicaciones(
                        publicaciones.filter(
                          (publicacion) => publicacion.id !== id
                        )
                      );
                      toast.success(result.message, {
                        position: "top-center",
                        theme: darkMode ? "dark" : "light",
                      });
                    } else {
                      throw new Error(result.message);
                    }
                  } catch (error) {
                    toast.error(
                      "Error al momento de eliminar la publicación: " +
                        error.message,
                      {
                        position: "top-center",
                        theme: darkMode ? "dark" : "light",
                      }
                    );
                  }
                  onClose();
                }}
              >
                Sí
              </button>
            </div>
          </div>
        );
      },
    });
  };
  useEffect(() => {
    getPublicaciones();
  }, []);

  return (
    <div
      onClick={closeMenu}
      className="flex w-full min-h-screen dark:bg-slate-700"
    >
      <ToastContainer />;
      <aside
        className={`fixed h-screen transition-all ${
          expanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => !pinned && setExpanded(true)}
        onMouseLeave={() => !pinned && setExpanded(false)}
      >
        <nav className="h-full flex flex-col bg-white dark:bg-slate-800 dark:text-white rounded-r-3xl shadow-sm">
          <div className={`p-4 pb-2 flex justify-between items-center`}>
            <img src={imgLogo} className="w-10 h-10" alt="logo" />
            <h1 className="font-bold text-2xl overflow-hidden transition-all">
              <span className="text-blue-500">U</span>Social
            </h1>
            <button
              onClick={() => setPinned((curr) => !curr)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900"
            >
              {pinned ? (
                <RiPushpin2Line className="text-xl" />
              ) : (
                <GoPin className={`text-xl ${expanded ? "" : "hidden"}`} />
              )}
            </button>
          </div>
          <SideBarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              <SideBarItems icon="Inicio" text="Inicio" to="/admin" />
              <SideBarItems icon="Nuevo" text="Cargar" to="/admin/carga" />
              <SideBarItems
                icon="Usuarios"
                text="Usuarios"
                to="/admin/users"
              />
              <SideBarItems
                icon="Publicaciones"
                text="Publicaciones"
                to="/admin/publicaciones"
                active
              />              
            </ul>
          </SideBarContext.Provider>
          <div className="border-t flex p-3 overflow-visible">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=David+Maldonado"
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <div
              className={`flex justify-between items-center overflow-visible transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } relative`}
            >
              <div className="leading-4 overflow-hidden transition-all">
                {expanded && (
                  <>
                    <h4 className="font-semibold truncate">David Maldonado</h4>
                    <span className="text-xs text-gray-600">
                      ipc11s2024@email.com
                    </span>
                  </>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900"
                >
                  <BiDotsVerticalRounded />
                </button>
                {dropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-slate-900 rounded shadow-xl ${
                      expanded ? "" : "hidden"
                    }`}
                  >
                    <div className="text-xs m-2">
                      <ColorModeToggle
                        className="block px-2 py-1 text-xs text-gray-700 hover:bg-blue-500 hover:text-white"
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                      />
                    </div>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-blue-500 hover:text-white"
                    >
                      <FaSignOutAlt /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <main
        className={`flex-grow justify-items-end pl-65 ml-5 transition-all ${
          expanded ? "pl-64" : "pl-20"
        }`}
      >
        <header className="flex justify-between items-center bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4 rounded-tl-3xl">
          <h2 className="font-semibold text-xl mt-2">Publicaciones</h2>
        </header>
        <div className="flex justify-center bg-white dark:bg-slate-800 items-center">
        {publicaciones && publicaciones.length > 0 && (
            <CSVLink
            data={publicaciones}
            headers={headers}
            filename={"publicaciones.csv"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded flex items-center justify-center"
          >
            Exportar tabla a CSV
            <FaFileExport className="ml-2" />
          </CSVLink>
        )}
        
        </div>
        <section className="flex justify-between items-center bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4">
        
          <table className="table-auto items-center justify-center m-auto border border-gray-200 dark:border-black">
            <thead className="bg-gray-100 dark:bg-slate-500 border border-gray-200 dark:border-black">
              <tr className="border border-gray-200 dark:border-black">
                <th className="p-2 ">Titulo</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Categoría</th>
                <th className="p-2">Autor</th>
                <th className="p-2">Anónimo</th>
                <th className="p-2">Fecha y Hora</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="border border-gray-200 dark:border-black">
              {publicaciones &&
                publicaciones.map((publicacion) => (
                  <tr key={publicacion.id}>
                    <td className="p-2">{publicacion.titulo}</td>
                    <td className="p-2">{publicacion.descripcion}</td>
                    <td className="p-2">{publicacion.categoria}</td>
                    <td className="p-2">{publicacion.nombreReal}</td>
                    <td className="p-2">{publicacion.anonimo ? "Sí" : "No"}</td>
                    <td className="p-2">
                      {new Date(publicacion.fecha).toLocaleString()}
                    </td>

                    <td>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md m-2 flex items-center justify-center"
                        type="button"
                        onClick={() => handleDelete(publicacion.id)}
                      >
                        <RiDeleteBin6Line className="m-1" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        {children}
        <footer className="bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4 rounded-bl-3xl">
          <p className="text-sm text-gray-600 dark:text-white">
            © 2021 USocial
          </p>
        </footer>
      </main>
    </div>
  );
};
function SideBarItems({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SideBarContext);
  let ListLinks = {
    Inicio: <FaHome size={20} />,
    Usuarios: <FaUsers size={20} />,
    Nuevo: <IoMdAddCircle size={20} />,
    Publicaciones: <MdOutlinePostAdd size={20} />,    
  };
  return (
    <Link to={to}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-blue-200 text-blue-500 dark:bg-blue-500 dark:text-white"
            : "hover:text-blue-600 text-gray-500 dark:text-white"
        }`}
      >
        {ListLinks[icon]}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <span
            className={`absolute right-2 w-2 h-2 bg-blue-400 rounded-full ${
              expanded ? "" : "top-2"
            }`}
          ></span>
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-blue-100 text-blue-800 text-sm dark:bg-blue-500 dark:text-white
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

export default Publicaciones;
