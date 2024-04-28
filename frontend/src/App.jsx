import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Form from './Form';
import CreateAccount from './CreateAccount';
import AdminFrame from './AdminFrame';
import { useState, useEffect } from 'react';
import HomePage from './HomePage';
import About from './About';
import RegistroExitoso from './RegistroExitoso';
import Contact from './Contact';
import HomeUser from './HomeUser';
import CrearPublicacion from './CrearPublicacion';
import CargaMasivaUsuarios from './CargaMasiva';
import Users from './Users';  
import './index.css';
import EditUser from './EditUser';
import Publicaciones from './Publicaciones';
import Tendencias from './Tendencias';
import EditarPerfil from './EditarPerfil';

function AnimationApp({ isLoggedIn, setIsLoggedIn, darkMode, toggleDarkMode }) { // Añade darkMode y toggleDarkMode como props
  let location = useLocation();
  let navigate = useNavigate();  

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
      navigate('/user-home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex w-full min-h-screen dark:bg-slate-700">
      
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="route-container">
        
          <AnimatePresence mode='wait'>
            <motion.section
              key={location.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/login" element={<Form darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/create-account" element={<CreateAccount darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                <Route path="/registro-exitoso" element={<RegistroExitoso darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
              </Routes>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
      <div className="hidden relative lg:flex min-h-screen w-1/2 items-center justify-center bg-gray-200 dark:bg-slate-800">
        <div className="w-60 h-60 bg-gradient-to-tr from-blue-500 to-green-500 rounded-full animate-spin" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 dark:bg-slate-800/10 backdrop-blur-lg" />
      </div>      
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Añade el estado darkMode

  const toggleDarkMode = () => { // Añade la función toggleDarkMode
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/*" element={<AnimationApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} /> {/* Pasa darkMode y toggleDarkMode como props */}
        <Route path="/admin" element={<AdminFrame darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/admin/carga" element={<CargaMasivaUsuarios darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/admin/users" element={<Users darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/admin/publicaciones" element={<Publicaciones darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/about" element={<About darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/user-home" element={<HomeUser darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/crearpost/:id" element={<CrearPublicacion darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/customers/:id" element={<EditUser darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/tendencias" element={<Tendencias darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/edit-profile/:id" element={<EditarPerfil darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />

      </Routes>
    </Router>
  );
}

export default App;