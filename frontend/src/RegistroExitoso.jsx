import React from 'react'
import { Link } from 'react-router-dom'

const RegistroExitoso = () => {
    return (
        <div>
        <h1 className="text-5xl font-semibold text-center m-8">
            ¡Registro exitoso!
        </h1>
        <p>¡Gracias por registrarte! Ahora puedes iniciar sesión con tus credenciales</p>
        <div className="flex justify-center mt-8">
            <Link to="/login" className="bg-gradient-to-tr from-blue-500 to-green-500 text-white text-xl font-bold py-3 px-5 rounded-xl">Iniciar sesión ahora</Link>
        </div>

        </div>
    )
    }

export default RegistroExitoso