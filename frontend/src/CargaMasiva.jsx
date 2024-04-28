import { React, useState, createContext, useContext } from "react";
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
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";

const SideBarContext = createContext();
const CargaMasiva = ({ darkMode, toggleDarkMode, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const _data = JSON.parse(e.target.result);
        setData(_data);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadUsers = async () => {
    if (!data) {
      toast.warning("No hay usuarios para cargar");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/addCustomers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Usuarios cargados correctamente", {
          position: "top-center",
          theme: darkMode ? "dark" : "light",
        });
      } else {
        toast.error("Error al cargar los usuarios");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los usuarios", error);
    }
  };

  const handleUploadPosts = async () => {
    if (!data) {
      toast.warning("No hay publicaciones para cargar");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/crearPublicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicacion: JSON.stringify(data) }),
      });
      if (response.ok) {
        toast.success("Datos cargados correctamente", {
          position: "top-center",
          theme: darkMode ? "dark" : "light",
        });        
      } else {
        toast.error("Error al cargar las publicaciones");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las publicaciones", error);
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

  return (
    <div
      onClick={closeMenu}
      className="flex w-full min-h-screen dark:bg-slate-700"
    >
      <ToastContainer />
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
              <SideBarItems
                icon="Nuevo"
                text="Cargar"
                to="/admin/carga"
                active                
              />
              <SideBarItems icon="Usuarios" text="Usuarios" to="/admin/users" />
              <SideBarItems
                icon="Publicaciones"
                text="Publicaciones"
                alert
                to="/admin/publicaciones"
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
          <h2 className="font-semibold text-xl mt-2">Carga masiva</h2>
        </header>
        <Tabs aria-label="Options" className="bg-white dark:bg-slate-800">
          <Tab
            key="Usuarios"
            title={
              <span className="font-bold border-b-2 border-blue-500">
                Usuarios
              </span>
            }
            className="bg-white dark:bg-slate-800 dark:text-white"
          >
            <Card>
              <CardBody>
                <section className="flex-grow justify-between items-center bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4">
                  <div className="flex items-center justify-center m-5 gap-4">
                    <label
                      htmlFor="file-upload-users"
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                    >
                      Cargar usuarios (.json)
                    </label>
                    <input
                      id="file-upload-users"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <table className="table-auto items-center justify-center m-auto border border-gray-200 dark:border-black">
                    <thead className="bg-gray-100 dark:bg-slate-500 border border-gray-200 dark:border-black">
                      <tr className="border border-gray-200 dark:border-black">
                        <th className="p-2">Carnet</th>
                        <th className="p-2">Nombres</th>
                        <th className="p-2">Apellidos</th>
                        <th className="p-2">Género</th>
                        <th className="p-2">Facultad</th>
                        <th className="p-2">Carrera</th>
                        <th className="p-2">Correo</th>
                        <th className="p-2">Contraseña</th>
                      </tr>
                    </thead>
                    <tbody className="border border-gray-200 dark:border-black">
                      {data &&
                        data.map((user, index) => (
                          <tr key={index}>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.carnet}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.nombres}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.apellidos}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.genero}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.facultad}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.carrera}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.correo}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {user.password}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center bg-white dark:bg-slate-800">
                    <button
                      onClick={handleUploadUsers}
                      className="bg-blue-500 text-white rounded-lg p-3 hover:bg-green-500 transition-all m-5"
                    >
                      Guardar Usuarios
                    </button>
                  </div>
                </section>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="Publicaciones"
            title={
              <span className="font-bold border-b-2 border-green-500">
                Publicaciones
              </span>
            }
            className="bg-white dark:bg-slate-800 dark:text-white"
          >
            <Card>
              <CardBody>
                <section className="flex-grow justify-between items-center bg-white dark:bg-slate-800 dark:text-white shadow-sm p-4">
                  <div className="flex items-center justify-center m-5 gap-4">
                    <label
                      htmlFor="file-upload-posts"
                      className="px-3 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
                    >
                      Cargar publicaciones (.json)
                    </label>
                    <input
                      id="file-upload-posts"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <table className="table-auto items-center justify-center m-auto border border-gray-200 dark:border-black">
                    <thead className="bg-gray-100 dark:bg-slate-500 border border-gray-200 dark:border-black">
                      <tr className="border border-gray-200 dark:border-black">
                        <th className="p-2">ID</th>
                        <th className="p-2">Título</th>
                        <th className="p-2">Descripción</th>
                        <th className="p-2">Categoría</th>
                        <th className="p-2">Anónimo</th>
                        <th className="p-2">Fecha y Hora</th>
                      </tr>
                    </thead>
                    <tbody className="border border-gray-200 dark:border-black">
                      {data &&
                        data.map((post, index) => (
                          <tr key={index}>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {post.id}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {post.titulo}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {post.descripcion}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {post.categoria}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {post.anonimo ? "Sí" : "No"}
                            </td>
                            <td className="p-2 border border-gray-200 dark:border-black">
                              {post.fecha}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center bg-white dark:bg-slate-800">
                    <button
                      onClick={handleUploadPosts}
                      className="bg-blue-500 text-white rounded-lg p-3 hover:bg-green-500 transition-all m-5"
                    >
                      Guardar publicaciones
                    </button>
                  </div>
                </section>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

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

export default CargaMasiva;
