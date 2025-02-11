      // variable(espacio de memoria reservado para informacion) para contar los likes
      let likes = 0;
      // Función(un conjunto de instrucciones que realiza una tarea o calcula un valor)
      //  para contar los likes
      function megusta() {
        likes = likes + 1;
        document.getElementById("contador").textContent = likes;
      }

      // Función para cambiar el texto de la descripción
      function cambiarTexto() {
        let descripcion = document.getElementById("descripcion");
        // Si el texto es el original, lo cambia al nuevo texto
        if (
          descripcion.textContent ===
          "Hola, soy un estudiante aprendiendo a programar."
        ) {
          descripcion.textContent =
            "Me encanta programar y aprender cosas nuevas!";
        } else {
          // Si no, lo cambia de vuelta al texto original
          descripcion.textContent =
            "Hola, soy un estudiante aprendiendo a programar.";
        }
      }

      // Función para cambiar la foto de perfil
      function cambiarFoto() {
        let foto = document.getElementById("miFoto");
        // Genera un número aleatorio para cambiar la imagen
        let randomNum = Math.floor(Math.random() * 1000);
        // Cambia la URL de la imagen para mostrar una nueva imagen aleatoria
        foto.src = "https://picsum.photos/seed/" + randomNum + "/200/200";
      }

    //   function cambiarFoto() {
    //         let foto = document.getElementById('miFoto');
    //         // Cambiamos la imagen usando un número aleatorio
    //         let numeroAleatorio = Math.floor(Math.random() * 1000);
    //         foto.src = `https://picsum.photos/seed/${numeroAleatorio}/200/200`;
    //     }
      // Función para alternar el modo oscuro
      function modoOscuro() {
        // Alterna la clase 'dark-mode' en el cuerpo del documento
        document.body.classList.toggle("dark-mode");
      }



            // Array con las rutas de tus fotos locales
      // estructura de datos en programación que almacena información de manera ordenada
      // let fotosLocales = [
      //   "ruta/a/tu/foto1.jpg",
      //   "ruta/a/tu/foto2.jpg",
      //   "ruta/a/tu/foto3.jpg",
      // ];
      // // Índice para llevar la cuenta de la foto actual
      // let fotoIndex = 0;

      // Función para cambiar la foto de perfil
      // function cambiarFoto() {
      //   let foto = document.getElementById("miFoto");
      //   // Cambia la URL de la imagen para mostrar la siguiente imagen en el array
      //   foto.src = fotosLocales[fotoIndex];
      //   // Incrementa el índice y vuelve al inicio si llega al final del array
      //   fotoIndex = (fotoIndex + 1) % fotosLocales.length;
      // }