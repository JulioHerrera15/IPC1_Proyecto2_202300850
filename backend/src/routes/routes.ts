import express from 'express';
import { getCustomer,addCustomer, getCustomers, updateCustomer, deleteCustomer, deletePost, login, loginAdmin, crearPublicacion, getPublicaciones } from '../services/services';
import { CustomerData, CustomerEntry } from '../types';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../img')) // Aquí especificas la carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Aquí especificas el nombre del archivo
    }
  })

  const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send('Hola IPC1!!!');
});

router.get('/Api',(req, res) => {
    res.send('Hola API!!!');
});

router.get('/getCustomers',(req, res) => {
    res.send(getCustomers());
});

router.use('/public', express.static(path.join(__dirname, '../img')));

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

router.delete('/deletePost/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const result = deletePost(id);
    if(result){
        res.send({message: 'Se eliminó la publicación correctamente'});
    }else{    
        res.status(404).send({message: 'Publicación not found'});        
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

router.post('/crearPublicacion', (req, res) => {
    if (!req.body.publicacion) {
        return res.status(400).send({message: 'Falta el cuerpo de la publicación'});
    }

    const publicaciones = JSON.parse(req.body.publicacion);
    let autor = "Administrador";

    const publicacionesCreadas = publicaciones.map((publicacion: any) => {
        publicacion.fecha = new Date().toISOString(); // Establece la fecha y hora actuales
        return crearPublicacion(publicacion, autor, 'Ciencias y Sistemas', 'Ingeniería', 'default.png');
    });

    try {
        res.send({message: 'Se crearon las publicaciones correctamente', publicaciones: publicacionesCreadas});
        console.log(publicacionesCreadas);
    } catch (error) {
        res.status(500).send({message: 'Error al crear las publicaciones'});
    }
})

router.post('/crearPublicacion/:id', upload.single('imagen'), (req, res) => {
    const newPublicacion = JSON.parse(req.body.publicacion);
    const userId = parseInt(req.params.id);
    const user = getCustomer(userId);
    if(!user){
        res.status(404).send({message: 'User not found'});
    }else{
        let autor = user.nombres;
        let carrera = user.carrera;
        let facultad = user.facultad;
        newPublicacion.nombreReal = user.nombres; 
        if(newPublicacion.anonimo){
            autor = 'Anónimo';
        }
        newPublicacion.fecha = new Date().toISOString(); 
        if (req.file) {
            console.log(req.file);
            newPublicacion.imagen = req.file.filename; 
            crearPublicacion(newPublicacion, autor, carrera, facultad, req.file.filename); 
        }  else {            
            crearPublicacion(newPublicacion, autor, carrera, facultad, 'default.png');
        }
        res.send({message: 'Se creó la publicación correctamente'});
    }
})
router.get('/getPublicaciones', (req, res) => {
    const publicaciones = getPublicaciones();
    res.send(publicaciones);
})

router.get('/getPublicaciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const publicaciones = getPublicaciones();
    const publicacion = publicaciones.find(publicacion => publicacion.id === id);
    if(!publicacion){
        res.status(404).send('Publicacion not found');
        }else{
        res.send(publicacion);
    }
})

router.put('/updateLikes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userId = req.body.userId;
    const publicacion = getPublicaciones().find(publicacion => publicacion.id === id);
    if(!publicacion){
        res.status(404).send('Publicacion not found');
    }else{
        // Si likesFrom es undefined, lo inicializamos como un array vacío
        if (!publicacion.likesFrom) {
            publicacion.likesFrom = [];
        }
        publicacion.likes++;
        publicacion.likesFrom.push(userId);
        res.send({message: 'Se actualizó el like correctamente'});
        console.log("Número de likes: "+ Number(publicacion.likes));
    }
})


router.post('/comentarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comentario = req.body.comentario;
    const userId = req.body.userId;
    const userName = req.body.userName;
    const carrera = req.body.carrera;
    const facultad = req.body.facultad;
    const publicacion = getPublicaciones().find(publicacion => publicacion.id === id);
    if (!publicacion) {
      res.status(404).send('Publicacion not found');
    } else {
      if (!publicacion.comentarios) {
        publicacion.comentarios = [];
      }
      const newComment = {
        comentario,
        userId,
        userName,
        carrera,
        facultad,
        fecha: new Date().toISOString()
      };
      publicacion.comentarios.push(newComment);
      res.send(newComment); // Devuelve el comentario completo
    }
  });

  router.get('/top5MoreLikes', (req, res) => {
    try {
        const publicaciones = getPublicaciones();
        const top5 = publicaciones.sort((a, b) => b.likes - a.likes).slice(0, 5);
        res.send(top5);
        console.log(top5);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un problema al obtener las publicaciones.' });
    }

    
});

router.get('/postsByCategory', (req, res) => {
    const publicaciones = getPublicaciones();
    const postsByCategory = publicaciones.reduce((acc: {[key: string]: typeof publicaciones}, publicacion) => {
        const category = publicacion.categoria;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(publicacion);
        return acc;
    }, {});

    if(Object.keys(postsByCategory).length === 0){
        res.status(404).send('Publicaciones not found');
    }
    console.log(postsByCategory);
    res.send(postsByCategory);
})

router.get('/usersWithMostPosts', (req, res) => {
    const publicaciones = getPublicaciones();
    const usersWithMostPosts = publicaciones.reduce((acc: {[key: string]: number}, publicacion) => {
        const autor = publicacion.autor;
        if (!acc[autor]) {
            acc[autor] = 1;
        } else {
            acc[autor]++;
        }
        return acc;
    }, {});

    if(Object.keys(usersWithMostPosts).length === 0){
        res.status(404).send('Publicaciones not found');
    }
    console.log(usersWithMostPosts);
    res.send(usersWithMostPosts);
}
)

export default router;