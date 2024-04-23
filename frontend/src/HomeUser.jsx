import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserFrameSideBar from './UserFrameSideBar'
import './index.css';

function HomeUser() {
  const {descripcion, setDescripcion} = useState('')
  const {categoria, setCategoria} = useState('')
  const {imagen, setImagen} = useState('')
  const {anonimo, setAnonimo} = useState(false)
  const [publicaciones, setPublicaciones] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }

    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPublicaciones(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPublicaciones(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    try{
      const response = await axios.post('/api/posts', {
        descripcion,
        categoria,
        imagen,
        anonimo
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }  

    
  };

  return (
    <div>
    <UserFrameSideBar />
    <div className='flex justify-center'>
        {publicaciones.map((publicacion, index) => (
          <div key={index}>
            <p>{publicacion.descripcion}</p>
            <p>{publicacion.categoria}</p>
            <p>{publicacion.imagen}</p>
            <p>{publicacion.anonimo}</p>
          </div>          
        ))}
      </div>
    </div>  
  )
}

export default HomeUser