import React, { useState, useEffect } from "react";
import imgLogo from "./assets/usocialLogo.png";
import { Link } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import imgUser from "./assets/user.png";
import "./index.css";

function UserFrameSideBar() {
  const getUser = () => {
    let user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined;
    }
  };

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  let user = getUser();
  let userId = user ? user.id : undefined;
  let Links = [
    {
      name: "Inicio",
      link: "/user-home",
      icon: <FaHome className="text-green-500 text-xl" />,
    },
    {
      name: "Crear Publicación",
      link: `/crearpost/${userId}`,
      icon: <MdPostAdd className="text-blue-500 text-xl" />,
    },
    {
      name: "Tendencias",
      link: "/tendencias",
      icon: <FaFire className="text-orange-500 text-xl" />,
    },
  ];

  let [isLoaded, setIsLoaded] = useState(false);
  let [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`page ${
        isLoaded ? "loaded" : ""
      } bg-white dark:bg-slate-700 transition-all duration-500 ease-in `}
    >
      <div className="shadow-md w-full dark:text-white transition-all duration-500 ease-in">
        <div className="navbar bg-white dark:bg-slate-700 md:px-10 py-4 px-7 md:flex justify-between items-center">
          <div className="flex text-2xl cursor-pointer items-center gap-2">
            <img src={imgLogo} className="logo-size-navbar mr-3" alt=""></img>
            <span className="font-bold">
              <span className="text-bold text-blue-500">U</span>Social
            </span>
          </div>
          <div className="md:flex md:justify-center w-full">
            <div className="md:flex-grow"></div>
            <div>
              <ul
                className={`flex justify-around md:pl-0 md:items-center md:justify-center md:static fixed bottom-0 md:z-auto z-[-1] left-0 w-full md:w-auto transition-all bg-white dark:bg-slate-700 ease-in duration-500`}
              >
                {Links.map((link) => (
                  <li
                    key={link.name}
                    className="font-semibold my-7 md:my-0 md:ml-8 hover:text-blue-500 flex flex-col items-center"
                  >
                    <div className="items-center justify-center text-center flex">
                      {link.icon}
                    </div>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:flex-grow"></div>
          </div>
          <div className="ml-auto flex-shrink-0 relative">
            <button
              className="w-10 h-10 rounded-full mx-8 bg-gray-200 overflow-hidden"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <img
                src={imgUser}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800  rounded-md overflow-hidden shadow-xl z-10">
                <Link
                  to={`/edit-profile/${userId}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white"
                >
                  Editar perfil
                </Link>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFrameSideBar;