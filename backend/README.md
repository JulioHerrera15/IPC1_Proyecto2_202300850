# Conferencia-IPC1-2024

En términos de informática, un CRUD es el acrónimo de "CREATE, READ, UPDATE y DELETE", las cuales son las funciones básicas para la persistencia de datos en un software.

## Antes de iniciar

Para desarrollar la aplicación es necesario instalar Node.js y un sistema de gestión de paquetes como lo es npm. Esto se puede realizar entrando al siguiente link y eligiendo el sistema en donde se instalará:

* https://nodejs.org/en/download

## Tecnologías usadas

* TypeScript
* Node.js v18

## Acerca de la aplicación

Esta aplicación consiste en un CRUD sobre datos de un cliente. Creando una aplicación web con Express se recibirán peticiones para actualizar y leer los datos de los clientes. Para poder usarla solo se necesita correr los siguientes comandos:

```
npm i

npm run dev
```

## Creación de la aplicación y configuración inicial
Una vez se tenga instalado Node.js, se procede a inicializar el proyecto con las opciones por defecto. Para esto se debe iniciar con el siguiente comando en la carpeta donde se realizará el desarrollo:

```
npm init -y
```

Para utilizar TypeScript es necesario instalarlo en el proyecto con el siguiente comando utilizando "-D" para que sea una dependencia de desarrollo:

```
npm install typescript -D
```

Luego de instalar TypeScript se debe agregar en el package.json un script para la conversión de ficheros de TS a JS. Para esto se debe buscar los elementos de scripts y agregar lo siguiente:

```
"tsc": "tsc"
```

Con el script configurado es hora de inicializar el proyecto con TypeScript para genera el archivo tsconfig.json y poder administrar más opciones del proyecto. Se corre en consola el siguiente comando:

```
npm run tsc -- --init
```

Para crear un API será necesario instalar el framework de Express utilizando el siguiente comando:

```
npm i express
```

Otro punto importante es decidir si el parámetro "strict" estará activo o inactivo. En dado caso esté activo solicitará que siempre se tengan los tipos de una librería por lo que se tendrá que instalar un paquete con sus tipos o colocar su valor en false. Si se desea trabajar con la restricción activa se debe ejecutar el siguiente comando:

```
npm i @types/express -D
```

Para poner en funcionamiento la aplicación se creará un script para facilitar la ejecución. En la sección de scripts de package.json se agrega lo siguiente:

```
"start": "node src/index.js"
```

Ahora la aplicación se puede iniciar con el siguiente comando:

```
npm run start
```

Otro punto importante es la actualización del código, para evitar tener que compilar el código de TypeScript y reiniciar la aplicación manualmente se instala el siguiente paquete:

```
npm i ts-node-dev -D 
```

Al igual que con el comando start, se creará un script en el package.json para facilitar su uso:

```
"dev": "ts-node-dev src/index.ts"
```

Para ejecutar la aplicación en modo de desarrollo se utiliza el siguiente comando:

```
npm run dev
```

