export interface CommentEntry {
    comentario: string;
    userId: number;
  }
  
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
    titulo: string;
    descripcion: string;
    categoria: string;
    autor: string;
    carrera: string;
    facultad: string;
    anonimo: boolean;
    imagen: string;
    fecha: string;
    likes: number;
    likesFrom: string[];
    comentarios: CommentEntry[];
  }
  
  export interface AdminData{
    username: string;
    password: string;
  }
  
  export interface CustomerData extends CustomerEntry {
    id: number;
  }
  
  export interface PostsData extends PostsEntry {
    id: number;
  }