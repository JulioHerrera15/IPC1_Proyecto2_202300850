import express from 'express';
import { getCustomer,addCustomer, getCustomers, updateCustomer, deleteCustomer, login, loginAdmin, crearPublicacion, getPublicaciones } from '../services/services';
import { CustomerData, CustomerEntry } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hola IPC1!!!');
});

router.get('/Api',(req, res) => {
    res.send('Hola API!!!');
});

router.get('/getCustomers',(req, res) => {
    res.send(getCustomers());
});

router.get('/getCustomer/:id',(req, res) => {
    const id = parseInt(req.params.id);    
    const customer = getCustomer(id);
    if(!customer){
        res.status(404).send('User not found');
    }else{
        res.send(customer);
    }    
});

router.post('/addCustomer', async (req, res) => {  
    const newCustomer: CustomerEntry = req.body;

    // Obtén la lista de todos los clientes
    const customers = getCustomers();

    // Si el carnet del nuevo cliente ya existe en la lista, envía un mensaje de error y detén la ejecución
    if (customers.some(customer => customer.carnet === newCustomer.carnet) && customers.some(customer => customer.correo === newCustomer.correo)) {
        res.status(400).send({message: 'El carnet o el correo ingresado ya existe'});
        return;
    } else if(customers.some(customer => customer.correo === newCustomer.correo)){
        res.status(400).send({message: 'El correo ingresado ya existe'});
        return;
    } else if(customers.some(customer => customer.carnet === newCustomer.carnet)){
        res.status(400).send({message: 'El carnet ingresado ya existe'});
        return;
    }

    // Si el carnet no existe, agrega el cliente
    addCustomer(newCustomer);
    console.log(getCustomers());
    res.send({message: 'Se agregó el usuario correctamente'});
});

router.post('/addCustomers',(req, res) => {
    const newCustomers: CustomerEntry[] = req.body;
    newCustomers.forEach(customer => {
        addCustomer(customer);
    });    
    res.send({message: 'Se agregaron los usuarios correctamente'});
});

router.put('/updateCustomer',(req, res) => {
    const customer: CustomerData = req.body;
    const result = updateCustomer(customer);
    if(result){
        res.send({message: 'Se actualizó el usuario correctamente'});        
    }else{
        res.status(404).send('User not found');
    }    
});

router.delete('/deleteCustomer/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const result = deleteCustomer(id);
    if(result){
        res.send({message: 'Se eliminó el usuario correctamente'});
    }else{    
        res.status(404).send({message: 'User not found'});        
    }
});


router.post('/login', (req, res) => {
    const {carnet, password} = req.body;
    const admin = loginAdmin(carnet, password);
    if(admin){
        res.send({...admin, isAdmin: true});
        return;
    }
    const customer = login(carnet, password);
    if(customer){
        res.send({...customer, isAdmin: false});
        return;
    }
    res.status(404).send({message: 'Credenciales incorrectas'});
})

router.post('/crearPublicacion/:id', (req, res) => {
    const newPublicacion = req.body;
    const userId = parseInt(req.params.id);
    const user = getCustomer(userId);
    if(!user){
        res.status(404).send('User not found');
    }else{
        const autor = user.nombres;
        crearPublicacion(newPublicacion, autor);
        res.send({message: 'Se creó la publicación correctamente'});
    }
})

router.get('/getPublicaciones', (req, res) => {
    const publicaciones = getPublicaciones();
    res.send(publicaciones);
})

router.put('/updateLikes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const publicacion = getPublicaciones().find(publicacion => publicacion.id === id);
    if(!publicacion){
        res.status(404).send('Publicacion not found');
    }else{
        publicacion.likes++;
        res.send({message: 'Se actualizó el like correctamente'});
    }
})

export default router;