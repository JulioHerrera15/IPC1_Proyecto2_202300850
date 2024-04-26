import { dataCustomers, dataAdmin } from "./data";
import { CustomerData, CustomerEntry, AdminData, PostsEntry, PostsData } from "../types" 


export var customerData = dataCustomers;
export var adminData = dataAdmin;
export var publicaciones: PostsData[] = [];

export const getCustomers = () => dataCustomers

export const getCustomer = (id: number) => {
    const customer = customerData.find(c => c.id === id);
    if(!customer){
        return null;
    }
    return customer;
}

export const addCustomer = (newCustomer:CustomerEntry) => {
    var newId: number = 1;
    if(customerData.length > 0){
        newId = customerData[customerData.length-1].id + 1;
    }    
    const newDataCustomer: CustomerData = {id: newId, ...newCustomer};
    customerData.push(newDataCustomer);
}

export const updateCustomer = (customer: CustomerData) => {
    const index = customerData.findIndex(c => c.id === customer.id)
    if(index === -1){
        return false;
    }
    customerData[index] = customer;
    return true;
}

export const deleteCustomer = (id: number) => {
    //Busca el índice donde el id coincida
    const index = customerData.findIndex(c => c.id === id);
    //Si no lo encuentra, retorna false
    if(index === -1){
        return false;
    }
    //Si lo encuentra, lo elimina
    customerData.splice(index,1);
    return true;
}

export const login = (carnet: string , password: string) => {    
    const customer = customerData.find(c => c.carnet === carnet && c.password === password);    
    if(!customer){
        return null;
    }
    return customer;
}

export const loginAdmin = (username: string, password: string) => {
    const admin = adminData.find(a => a.username === username && a.password === password);
    if(!admin){
        return null;
    }
    return admin;
}

export const crearPublicacion = (newPublicacion: PostsEntry, username: string) => {
    var newId: number = 1;    
    if(publicaciones.length > 0){
        newId = publicaciones[publicaciones.length-1].id + 1;
    }    
    const { autor, ...rest } = newPublicacion;
    const newDataPublicacion: PostsData = {id: newId, autor: username, ...rest};
    publicaciones.push(newDataPublicacion);
}

export const getPublicaciones = () => publicaciones;


export const printCustomers = () => {
    console.log(customerData);
}