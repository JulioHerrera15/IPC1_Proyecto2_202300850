import React, { useState, useEffect } from 'react';
import { FaUser, FaKey } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import ColorModeToggle from './ColorModeToggle';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { printCustomers } from '../../backend/src/services/services';

const Form = ({ darkMode, toggleDarkMode }) => {
  const [carnet, setCarnet] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      carnet,
      password
    }
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.status === 404) {
        // Las credenciales son incorrectas, muestra un mensaje de error
        setErrorMessage('Usuario o contraseña incorrectos');
        return;
      }
  
      const result = await response.json();
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result));
      if(result.isAdmin){
        navigate('/admin');
      }else{
        navigate('/user-home');
      }
    } catch (error) {
      const result = JSON.parse(error.message);
      setServerMessage(result.message);
    }
  }

  let [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
      setIsLoaded(true);
      printCustomers();
  }, []);


  return (
    <div className={`page ${isLoaded ? 'loaded' : ''} px-10 py-20 rounded-3xl  pt-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}>
      <div className="flex items-center text-gray-500 group">
          <IoIosArrowBack className="mr-3 transform transition-transform duration-200 group-hover:translate-x-2 mt-1" />
          <Link to="/"> Regresar a inicio</Link>
      </div>
      <h1 className='text-5xl font-semibold pt-10'>Bienvenido a <span className='text-blue-500'>U</span>Social</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Bienvenido, inicia sesión</p>
      <form onSubmit={handleSubmit}>
        <div className='mt-8'>
          <div className="relative">            
            <input
              className='w-full border-2 border-gray-100 dark:border-gray-900 rounded-xl p-4 mt-1 bg-transparent pl-10 focus:border-blue-500 transition-colors mt5'
              placeholder=' '
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
            />            
            <label className="absolute left-12 top-5 transition-transform duration-200 ease-in-out transform-gpu pointer-events-none" htmlFor="input">
              No. carnet/Código USAC
            </label>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaUser className='mt-4 m-2' />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className="relative">
            <input
              className='w-full border-2 border-gray-100 dark:border-gray-900 rounded-xl p-4 mt-1 bg-transparent pl-10 focus:border-blue-500 transition-colors'
              placeholder=' '
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-12 top-5 transition-transform duration-200 ease-in-out transform-gpu pointer-events-none" htmlFor="input">
              Contraseña
            </label>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaKey className='mt-4 m-2' />
            </div>                        
          </div>
        </div>
        <div className='mt-8 flex justify-between items-center'>
          <div>
            <input
              className='mr-2 w-5 h-5 border-2 dark:bg-slate-800 border-gray-100 rounded-xl bg-violet-500'
              type='checkbox'
              id="remember"
            />
            <label className='ml-2 font-medium text-base dark:bg-slate-800' htmlFor="remember">Recordar usuario</label>
          </div>
          <button className='font-medium text-base text-blue-500 hover:underline'>Olvidé mi contraseña</button>
        </div>
        <div>
          <div className='mt-8 flex flex-col gap-y-4'>
            <button type="submit" className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-blue-500 to-green-500 text-white text-lg font-bold'>Iniciar sesión</button>
            <p className='text-center text-gray-500'>¿No tienes cuenta? <Link to="/create-account" className='text-blue-500 font-medium hover:underline'>Regístrate</Link></p>
          </div>
        </div>
      </form>      
      <div className='pt-5'>
        <ColorModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Añade el componente ColorModeToggle */}
      </div>
      <div className='m-5'>
        <p className='text-red-500 text-center'>{serverMessage}</p>
      </div>
      <div className='m-5'>
        <p className='text-red-500 text-center'>{errorMessage}</p>
      </div>
      
    </div>
  );
}

export default Form;