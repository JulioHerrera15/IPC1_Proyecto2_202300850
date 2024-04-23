export interface CustomerEntry {
    carnet: string;
    nombres: string;
    apellidos: string;
    genero: string;
    facultad: string;
    carrera: string;
    correo: string;
    password: string;
}

export interface PostsEntry {
    codigo: string;
    descripcion: string;
    categoria: string;
    anonimo: boolean;
    fecha: string;
}

export interface CustomerData extends CustomerEntry {
    id: number;
}