import React, { useState, useEffect } from "react";
import imgLogo from "./assets/usocialLogo.png"
import ColorModeToggle from "./ColorModeToggle";
import { FaBars } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './index.css';


function Contact({ darkMode, toggleDarkMode }) {
    let Links = [
        { name: "Inicio", link: "/" },
        { name: "Acerca de", link: "/about" },
        { name: "Contacto", link: "/contact" },
    ];

    let [isOpen, setIsOpen] = useState(false);
    let [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

  return (
    <div className={`page ${isLoaded ? 'loaded' : ''} bg-white dark:bg-slate-700 transition-all duration-500 ease-in `}>
            <div className="shadow-md w-full dark:text-white transition-all duration-500 ease-in">
                <div className="navbar bg-white dark:bg-slate-700 md:px-10 py-4 px-7 md:flex justify-between items-center">
                    <div className="flex text-2xl cursor-pointer items-center gap-2">
                        <img
                            src={imgLogo}
                            className="w-10 h-10 mr-3"
                            alt=""
                        ></img>
                        <span className="font-bold">
                            <span className="text-bold text-blue-500">U</span>Social
                        </span>
                    </div>

                    <div onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl absolute right-8 top-6 cursor-pointer">
                        {
                            isOpen ? <HiOutlineXMark /> : <FaBars />
                        }                        
                    </div>

                    <ul className={`md:flex pl-9 md:pl-0 md:items-center md:static md:pb-0 pb-12 absolute md:z-auto z-[-1] left-0 w-full md:w-auto transition-all bg-white dark:bg-slate-700 ease-in duration-500 ${isOpen ? 'top-12':'top-[-490px]'}`}>
                        {Links.map((link) => (
                            <li className="font-semibold my-7 md:my-0 md:ml-8 hover:text-blue-500">
                                <Link to={link.link}>{link.name}</Link>
                            </li>
                        ))}
                        <Link to="/login" className="bg-gradient-to-tr from-blue-500 to-green-500 text-white py-1 px-3 btn md:ml-8 rounded md:static font-bold active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">¡Empieza ahora!</Link>
                    </ul>

                </div>
            </div>
            <div>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">                        
                        <h1 className="text-4xl dark:text-white font-bold">Contacto</h1>
                        <p className="text-gray-500 dark:text-gray-400">¿Tienes alguna duda o sugerencia? ¡Contáctanos!</p>

                    </div>                    
                </div>
                <div className="flex justify-center">
                <FaPhoneAlt className="text-blue-500 text-xl m-1" />
                    <p className="text-gray-800 text-xl dark:text-white">
                         Llámanos al: 1234-5678
                    </p>                    
                </div>
                <div className="flex justify-center h-20">
                <MdEmail className="text-blue-500 text-xl m-1"/>
                    <p className="text-gray-800 text-xl dark:text-white">
                         Correo: usocial@email.com
                    </p>
                </div>   
            </div>
            <div className="bg-gray-900 dark:bg-slate-900">
                <div className="flex items-center justify-center h-20">
                    <p className="text-white dark:text-gray-400">
                        Página web creada por: Julio Alfredo Herrera Orantes,
                        Carnet: 202300850,
                        © 2021 <span className="text-blue-500">U</span>Social. Todos los derechos reservados.
                    </p>
                    <div className="scale-75 text-white unique-class">
                        <ColorModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} className="text-white" />
                    </div>
                </div>
            </div>
          </div>
  );
}

export default Contact