import React, { useState, useEffect } from 'react'
import UserFrameSideBar from './UserFrameSideBar'
import './index.css';

function HomeUser() {    
  const [nombres, setNombres] = useState('');
  
  
  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const userId = user.id;    
  
    try {
      const response = await fetch(`http://localhost:3000/getCustomer/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {        
        console.error('Error al obtener el usuario:', response.status);
        return;
      }
  
      const result = await response.json();      
      setNombres(result.nombres)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);  

  return(

    <div>
      <UserFrameSideBar />
      <h1>Bienvenido {nombres}</h1>
    </div>
  );   

    
  };

  


export default HomeUser