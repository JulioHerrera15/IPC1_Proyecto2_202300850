import React from 'react';
import { FaMoon, FaSun } from "react-icons/fa";

function ColorModeToggle({ darkMode, toggleDarkMode }) { // Recibimos darkMode y toggleDarkMode como props

  // Cambia el modo de color cuando se hace clic en el toggle
  const toggleColorMode = () => {
    toggleDarkMode(); // Usamos la función pasada como prop
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex items-center justify-center">
      <input type="checkbox" className="hidden" id="colorModeToggle" checked={darkMode} onChange={toggleColorMode} />
      {darkMode ? <FaMoon className='dark:text-white' /> : <FaSun className='dark:text-white' />}
      <span className="ml-2 text-gray-600 dark:text-white pr-3">Modo {darkMode ? 'oscuro' : 'claro'}</span>
      <label htmlFor="colorModeToggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <div className={`block w-14 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-500'}`}></div>
          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${darkMode ? '' : 'translate-x-6'}`}></div>
        </div>
      </label>
    </div>
  );
}

export default ColorModeToggle;