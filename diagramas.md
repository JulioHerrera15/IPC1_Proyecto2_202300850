## Diagrama de clases

```mermaid
classDiagram
    class CommentEntry {
        -string comentario
        -number userId
    }
    class CustomerEntry {
        -string carnet
        -string nombres
        -string apellidos
        -string genero
        -string facultad
        -string carrera
        -string correo
        -string password
    }
    class PostsEntry {
        -string titulo
        -string descripcion
        -string categoria
        -string autor
        -string carrera
        -string facultad
        -boolean anonimo
        -string imagen
        -string fecha
        -number likes
        -string[] likesFrom
        -CommentEntry[] comentarios
    }
    class AdminData {
        -string username
        -string password
    }
    class CustomerData {
        -number id
        CustomerEntry <|-- CustomerData
    }
    class PostsData {
        -number id
        PostsEntry <|-- PostsData
    }
    PostsEntry "1" *-- "many" CommentEntry : contains
    CustomerData "1" -- "many" PostsData : creates
    AdminData -- PostsData : manages
    CommentEntry -- CustomerData : comments