import { React, useState, createContext, useContext, useEffect } from "react";
import imgLogo from "./assets/usocialLogo.png";
import { RiPushpin2Line } from "react-icons/ri";
import "./index.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoPin } from "react-icons/go";
import ColorModeToggle from "./ColorModeToggle";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SideBarContext = createContext();
const EditUser = ({ darkMode, toggleDarkMode, children }) => {
  const [carnet, setCarnet] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [facultad, setFacultad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <div
      onClick={closeMenu}
      className="flex w-full min-h-screen dark:bg-slate-700"
    >
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
                active
              />
              <SideBarItems
                icon="Publicaciones"
                text="Publicaciones"
                alert
                to="/admin/posts"
              />
              <SideBarItems
                icon="Configuración"
                text="Configuración"
                to="/admin/settings"
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
          <h2 className="font-semibold text-xl mt-2">
            Editar Usuario No. {id}
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
                  Guardar
                </button>
            </div>
          </form>
        </div>
        <ToastContainer />       

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
    Configuración: <IoMdSettings size={20} />,
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


export default EditUser;
