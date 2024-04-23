import React, { useState, useEffect } from "react";
import imgLogo from "./assets/usocialLogo.png";
import ColorModeToggle from "./ColorModeToggle";
import { Link } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import imgUser from "./assets/user.png";
import "./index.css";

function UserFrameSideBar({ darkMode, toggleDarkMode }) {
  let Links = [
    {
      name: "Inicio",
      link: "/user-home",
      icon: <FaHome className="text-green-500 text-xl" />,
    },
    {
      name: "Crear Publicación",
      link: "/crearpost",
      icon: <MdPostAdd className="text-blue-500 text-xl" />,
    },
    {
      name: "Tendencias",
      link: "/user",
      icon: <FaFire className="text-orange-500 text-xl" />,
    },
  ];

  let [isLoaded, setIsLoaded] = useState(false);

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
                className={`md:flex pl-9 md:pl-0 md:items-center md:justify-center md:static md:pb-0 pb-12 absolute md:z-auto z-[-1] left-0 w-full md:w-auto transition-all bg-white dark:bg-slate-700 ease-in duration-500`}
              >
                {Links.map((link) => (
                  <li className="font-semibold my-7 md:my-0 md:ml-8 hover:text-blue-500">
                    <div className="items-center justify-center text-center flex">
                      {link.icon}
                    </div>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:flex-grow"></div>
            <div className="flex-shrink-0">
              <button className="w-10 h-10 rounded-full mx-8 bg-gray-200 overflow-hidden">
                <img
                  src={imgUser}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
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

export default UserFrameSideBar;
