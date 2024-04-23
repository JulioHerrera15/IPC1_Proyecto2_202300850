import { Link, useNavigate } from "react-router-dom";
import ColorModeToggle from "./ColorModeToggle";
import { HiMiniIdentification } from "react-icons/hi2";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import './index.css';

export default function CreateAccount({ darkMode, toggleDarkMode }) {
    const [carnet, setCarnet] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [genero, setGenero] = useState("");
    const [facultad, setFacultad] = useState("");
    const [carrera, setCarrera] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");    
    const navigate = useNavigate();
    const [serverMessage, setServerMessage] = useState(null);    
    const [hasError, setHasError] = useState({
        carnet: true,
        nombres: false,
        apellidos: false,
        genero: false,
        facultad: false,
        carrera: false,
        correo: false,
        contrasena: false,
    });

    const handleInputChange = (e, field) => {
        switch (field) {
            case 'correo':
                if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e.target.value)) {
                    setHasError(prevState => ({ ...prevState, correo: true }));
                } else {
                    setHasError(prevState => ({ ...prevState, correo: false }));
                }
                setCorreo(e.target.value);
                break;
            case 'contrasena':
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value)) {
                    setHasError(prevState => ({ ...prevState, contrasena: true }));
                } else {
                    setHasError(prevState => ({ ...prevState, contrasena: false }));
                }
                setContrasena(e.target.value);
                break;           
            case 'carnet':
                if (!/^\d{9}$/.test(e.target.value)) {
                    setHasError(prevState => ({ ...prevState, carnet: true }));
                } else {
                    setHasError(prevState => ({ ...prevState, carnet: false }));
                }
                setCarnet(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            carnet: parseInt(carnet),
            nombres: nombres,
            apellidos: apellidos,
            genero: genero,
            facultad: facultad,
            carrera: carrera,
            correo: correo,
            password: contrasena,
        };

        try{            
            const response = await fetch('http://localhost:3000/addCustomer', {
                method: 'POST',            
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            console.log(result);  
            if(response.ok){
                toast.success('Usuario registrado correctamente', {
                    theme: darkMode ? 'dark': 'light'
                });
                navigate('/registro-exitoso');
            } else {                
                throw new Error(result.message);                
            }
        }catch(error){            
            toast.error('Error al registrar el usuario: ' + error.message, {
                theme: darkMode ? 'dark': 'light'
            });
        }   
        
        

    };

    const hasAnyError = Object.values(hasError).some(error => error === true);
    const allFieldsFilled = carnet && nombres && apellidos && genero && facultad && carrera && correo && contrasena;
    
    return (
        <form onSubmit={handleSubmit}>            
            <div className="px-10 py-20 pt-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            <ToastContainer />
            <div className="flex items-center text-gray-500 group">
                <IoIosArrowBack className="mr-3 transform transition-transform duration-200 group-hover:translate-x-2 mt-1" />
                <Link to="/"> Regresar a inicio</Link>
            </div>            
                <h1 className="text-5xl font-semibold pt-5">
                    Crea tu cuenta <span className="text-blue-500">U</span>Social
                </h1>
                <p className="font-medium text-lg text-gray-500 mt-4">
                    Completa los siguientes campos con tus datos
                </p>
                <div className="pt-2 flex flex-wrap justify-between">
                    {/* Aquí puedes agregar los campos de entrada para la creación de la cuenta */}
                    <InputField
                        placeholder="Código USAC/Carnet"
                        value={carnet}
                        onChange={(e) => handleInputChange(e, 'carnet')}
                        setParentServerMessage={setServerMessage}
                    />
                    <InputField
                        placeholder="Nombres"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        setParentServerMessage={setServerMessage}
                    />
                    <InputField
                        placeholder="Apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        setParentServerMessage={setServerMessage}
                    />
                    <CustomSelect
                        placeholder="Género"
                        options={["", "Masculino", "Femenino", "Otro"]}
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}                        
                    />
                    <InputField
                        placeholder="Facultad"
                        value={facultad}
                        onChange={(e) => setFacultad(e.target.value)}
                        setParentServerMessage={setServerMessage}
                    />
                    <InputField
                        placeholder="Carrera"
                        value={carrera}
                        onChange={(e) => setCarrera(e.target.value)}
                        setParentServerMessage={setServerMessage}
                    />
                    <InputField
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => handleInputChange(e, 'correo')}
                        setParentServerMessage={setServerMessage}
                    />
                    <InputField
                        placeholder="Contraseña"
                        type="password"
                        value={contrasena}
                        onChange={(e) => handleInputChange(e, 'contrasena')}
                        setParentServerMessage={setServerMessage}
                    />                    
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                <button                    
                    type="submit"
                    className={`active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl text-white text-lg font-bold ${(allFieldsFilled && !hasAnyError) ? 'bg-gradient-to-tr from-blue-500 to-green-500' : 'bg-gray-500'}`}
                    disabled={!(allFieldsFilled && !hasAnyError)}
                >
                    Crear cuenta
                </button>
                    <p className="text-center text-gray-500">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-blue-500 font-medium hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
                <div className="pt-5">
                    <ColorModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Añade el componente ColorModeToggle */}
                </div>
            </div>
        </form>
    );
}

function CustomSelect({ placeholder, options, onChange }) {
    const [localValue, setLocalValue] = useState(options[0]);

    const handleChange = (event) => {
        setLocalValue(event.target.value);        
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="relative mt-4 w-1/2 px-2">
            <svg
                className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 412 232"
            >
                <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.58-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.763-9.763 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                />
            </svg>
            <select
                value={localValue}
                onChange={handleChange}
                className="w-full border-2 border-gray-100 dark:border-gray-900 rounded-xl p-4 mt-1 bg-transparent pl-12 focus:border-blue-500 transition-colors appearance-none dark:bg-gray-800 dark:text-white"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label
                className={`absolute left-14 top-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out transform-gpu pointer-events-none ${localValue !== options[0] ? "translate-x-[-100%] opacity-0" : ""
                    }`}
                htmlFor="input"
            >
                {placeholder}
            </label>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <FaUser className="m-4" />
            </div>
        </div>
    );
}

function InputField({ placeholder, type = "text", value, onChange, setParentServerMessage, contrasena }) {
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);
    const [serverMessage, setServerMessage] = useState(null);
    
    useEffect(() => {
        setParentServerMessage(serverMessage);
    }, [serverMessage, setParentServerMessage]);

    const handleChange = (event) => {
        if (onChange) {
            onChange(event);
        }

        // Validación básica: el campo no puede estar vacío
        if (event.target.value === "") {
            setError("Este campo no puede estar vacío");
            setIsError(true);
        } else if (
            placeholder === "Correo electrónico" &&
            !/\S+@\S+\.\S+/.test(event.target.value)
        ) {
            // Validación del formato del correo electrónico
            setError("Por favor, introduce un correo electrónico válido");
            setIsError(true);
        } else if (placeholder === "Contraseña"){
            const value = event.target.value;
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!regex.test(value)){
                setError("La contraseña debe tener al menos 8 caracteres, incluyendo al menos 1 mayúscula, 1 minúscula y 1 carácter especial");
                setIsError(true);
            } else {
                setError(null);
                setIsError(false);
            }
        } else if(placeholder === "Confirmar contraseña"){
            const value = event.target.value;
            if(value !== contrasena){
                setError("Las contraseñas no coinciden");
                setIsError(true);
            } else {
                setError(null);
                setIsError(false);
            }
        } else if(placeholder === "Código USAC/Carnet"){
            const value = event.target.value;
            const regex = /^[0-9]*$/;
            if(!regex.test(value) || value.length !== 9){
                setError("El código USAC/Carnet debe tener exactamente 9 dígitos y solo contener números");
                setIsError(true);
            } else {
                setError(null);
                setIsError(false);
            }
        } else {
            setError(null);
            setIsError(false);
        }
    };
    return (
        <div className="relative mt-4 w-1/2 px-2">
            <div className="relative">
                <input
                    id="input"
                    className="w-full border-2 border-gray-100 dark:border-gray-900 rounded-xl p-4 mt-1 bg-transparent pl-10 focus:border-blue-500 transition-colors"
                    placeholder=" "
                    type={type}
                    value={value}
                    onChange={handleChange}
                />
                <label
                    className="absolute left-12 top-5 transition-transform duration-200 ease-in-out transform-gpu pointer-events-none"
                    htmlFor="input"
                >
                    {placeholder}
                </label>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    {(placeholder === "Código USAC/Carnet" && (
                        <HiMiniIdentification className="mt-4 m-2" />
                )) ||
                        (placeholder === "Nombres" && (
                            <MdDriveFileRenameOutline className="mt-4 m-2" />
                        )) ||
                        (placeholder === "Apellidos" && (
                            <MdDriveFileRenameOutline className="mt-4 m-2" />
                        )) ||
                        (placeholder === "Facultad" && <FaSchool className="mt-4 m-2" />) ||
                        (placeholder === "Carrera" && <MdSchool className="mt-4 m-2" />) ||
                        (placeholder === "Correo electrónico" && (
                            <MdAlternateEmail className="mt-4 m-2" />
                        )) ||
                        (placeholder === "Contraseña" && <FaKey className="mt-4 m-2" />) ||
                        (placeholder === "Confirmar contraseña" && <FaKey className="mt-4 m-2" />)}
                </div>
            </div>
            {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}
            {serverMessage && <p className="text-red-500 mt-2 mb-2">{serverMessage}</p>}
        </div>
    );
}
