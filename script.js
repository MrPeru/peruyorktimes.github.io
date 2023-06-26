var imagenes = [
    { ruta: "Captura.PNG", texto: "Nada mas sabroso que un rico Cuy asado en una mañana" },
    { ruta: "CuyConElote.PNG", texto: "Un elotito para acompañar"},
    { ruta: "SopaDeCuy.PNG", texto: "Una sopita pa lo frio"}
  ];
  
  var indiceImagen = 0;
  var imagenElemento = document.getElementById("foto");
  var botonElemento = document.getElementById("boton");
  var textoElemento = document.getElementById("texto");
  
  function cambiarImagen() {
    indiceImagen++;
    if (indiceImagen >= imagenes.length) {
      indiceImagen = 0;
    }
    imagenElemento.src = imagenes[indiceImagen].ruta;
    textoElemento.textContent = imagenes[indiceImagen].texto;

    if (indiceImagen === 0) {
        botonElemento.textContent = "Cambiar Platillo";
      } else {
        botonElemento.textContent = "Cambiar Platillo";
      }

  }

  function guardarTexto() {
    var inputText = document.getElementById("myInput").value;
    
    if (inputText !== "") {
      // Obtener los datos guardados previamente
      var datosGuardados = localStorage.getItem("datos");
      
      // Verificar si hay datos previos
      if (datosGuardados === null) {
        datosGuardados = [];
      } else {
        datosGuardados = JSON.parse(datosGuardados);
      }
      
      // Agregar el nuevo dato
      datosGuardados.push(inputText);
      
      // Guardar los datos actualizados
      localStorage.setItem("datos", JSON.stringify(datosGuardados));
      
      // Mostrar los datos guardados en la página
      mostrarDatosGuardados();
      
      // Limpiar el campo de entrada
      document.getElementById("myInput").value = "";
    }
  }
  
  function mostrarDatosGuardados() {
    var datosGuardados = localStorage.getItem("datos");
    
    if (datosGuardados !== null) {
      datosGuardados = JSON.parse(datosGuardados);
      
      var textoDiv = document.getElementById("textoGuardado");
      textoDiv.innerHTML = "";
      
      // Mostrar los datos guardados en el div
      for (var i = 0; i < datosGuardados.length; i++) {
        var p = document.createElement("p");
        p.textContent = datosGuardados[i];
        textoDiv.appendChild(p);
      }
    }
  }
  
  // Llamar a la función al cargar la página para mostrar los datos guardados previamente
  mostrarDatosGuardados();

  var audio = new Audio('AUD-Mortadela.mp3'); 

  var btnReproducir = document.getElementById('btn-reproducir');
  btnReproducir.addEventListener('click', function() {
    alert("Te recomiendo bajar el volumen..")
    audio.play();
    alert("No me borres por eso")
  });

 function mostrarHoraActual() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
  
    var horaActual = hora + ':' + minutos + ':' + segundos;
    document.getElementById('hora-actual').textContent = 'Hora actual: ' + horaActual;
  
    setTimeout(mostrarHoraActual, 1000); // Actualizar cada segundo
  }
  
  mostrarHoraActual();


 


  var calificacionPermitida = true;
  var totalCalificaciones = 0;
  var sumaCalificaciones = 0;
  
  function habilitarCalificacion() {
    calificacionPermitida = true;
    var parrafoTiempoRestante = document.getElementById('tiempo-restante');
    parrafoTiempoRestante.textContent = '';
  }
  
  function guardarCalificacion(calificacion) {
    if (calificacionPermitida) {
      // Guardar la calificación en alguna lógica de almacenamiento
      console.log('Calificación guardada: ' + calificacion);
  
      // Actualizar el promedio de calificaciones
      totalCalificaciones++;
      sumaCalificaciones += parseInt(calificacion);
      var promedio = sumaCalificaciones / totalCalificaciones;
      console.log('Promedio de calificaciones: ' + promedio.toFixed(2));
  
      // Mostrar el promedio en el HTML
      var parrafoPromedio = document.getElementById('promedio-calificaciones');
      parrafoPromedio.textContent = 'Promedio de calificaciones: ' + promedio.toFixed(2);
  
      // Almacenar el promedio, total de calificaciones y suma de calificaciones en el almacenamiento local
      localStorage.setItem('promedio', promedio.toFixed(2));
      localStorage.setItem('totalCalificaciones', totalCalificaciones);
      localStorage.setItem('sumaCalificaciones', sumaCalificaciones);
  
      // Almacenar el tiempo de deshabilitación de la calificación en el almacenamiento local
      var tiempoDeshabilitacion = Date.now() + 20 * 60 * 1000; // Tiempo actual + 20 minutos en milisegundos
      localStorage.setItem('deshabilitacion', tiempoDeshabilitacion);
  
      // Deshabilitar la calificación por 20 minutos
      calificacionPermitida = false;
      setTimeout(habilitarCalificacion, 20 * 60 * 1000); // Habilitar después de 20 minutos (20 * 60 * 1000 = 20 minutos en milisegundos)
      mostrarTiempoRestante();
    } else {
      console.log('Debes esperar 20 minutos para volver a calificar');
    }
  }
  
  function mostrarTiempoRestante() {
    var tiempoDeshabilitacion = localStorage.getItem('deshabilitacion');
    if (tiempoDeshabilitacion) {
      tiempoDeshabilitacion = parseInt(tiempoDeshabilitacion);
      var tiempoRestante = Math.ceil((tiempoDeshabilitacion - Date.now()) / 1000); // Convertir a segundos y redondear hacia arriba
      if (tiempoRestante <= 0) {
        localStorage.removeItem('deshabilitacion'); // Limpiar el almacenamiento si ha pasado el tiempo
        tiempoRestante = 0;
      }
      var minutos = Math.floor(tiempoRestante / 60);
      var segundos = tiempoRestante % 60;
  
      var parrafoTiempoRestante = document.getElementById('tiempo-restante');
      if (tiempoRestante === 0) {
        parrafoTiempoRestante.textContent = '';
      } else {
        parrafoTiempoRestante.textContent = 'Puedes volver a calificar en ' + minutos + ' min ' + segundos + ' seg';
      }
    } else {
      // Si no hay tiempo de deshabilitación almacenado, habilitar la calificación
      habilitarCalificacion();
    }
  }
  
  // Verificar si ya se ha realizado una calificación al cargar la página
  window.addEventListener('load', function() {
    var promedioGuardado = localStorage.getItem('promedio');
    if (promedioGuardado) {
      totalCalificaciones = parseInt(localStorage.getItem('totalCalificaciones')) || 0;
      sumaCalificaciones = parseInt(localStorage.getItem('sumaCalificaciones')) || 0;
  
      var parrafoPromedio = document.getElementById('promedio-calificaciones');
      parrafoPromedio.textContent = 'Promedio de calificaciones: ' + promedioGuardado;
    }
    mostrarTiempoRestante(); // Mostrar el tiempo restante al cargar la página
  
    var calificacionRealizada = localStorage.getItem('calificacionRealizada');
    if (calificacionRealizada) {
      calificacionPermitida = false;
      mostrarTiempoRestante(); // Actualizar el tiempo restante si ya se realizó una calificación previa
    }
  });
  
  var estrellas = document.querySelectorAll('.rating input');
  estrellas.forEach(function (estrella) {
    estrella.addEventListener('click', function () {
      var calificacion = this.value;
      guardarCalificacion(calificacion);
  
      // Marcar la calificación como realizada en el almacenamiento local
      localStorage.setItem('calificacionRealizada', true);
    });
  });
  
  // Actualizar el tiempo restante cada segundo
  setInterval(mostrarTiempoRestante, 1000);
  
  //----------------------------------------------------

  // Función para reiniciar el promedio de calificaciones
function reiniciarPromedio() {
  // Reiniciar las variables del promedio
  totalCalificaciones = 0;
  sumaCalificaciones = 0;

  // Actualizar el promedio en el almacenamiento local
  localStorage.setItem('totalCalificaciones', totalCalificaciones);
  localStorage.setItem('sumaCalificaciones', sumaCalificaciones);

  // Actualizar el texto del promedio en la página
  var parrafoPromedio = document.getElementById('promedio-calificaciones');
  parrafoPromedio.textContent = 'Promedio de calificaciones: 0';

  // Habilitar la calificación
  habilitarCalificacion();

  // Mostrar mensaje de éxito
  alert('El promedio de calificaciones ha sido reiniciado.');
}

// Evento click para reiniciar el promedio
var btnReset = document.getElementById('btn-reset');
btnReset.addEventListener('click', reiniciarPromedio);

//------------------------------------------------

// Función para mostrar el anuncio después de 30 segundos
function mostrarAnuncio() {
  setTimeout(function() {
    var popup = document.getElementById('popup');
    popup.classList.add('show');
  }, 1000); // 30 segundos
}

// Evento click para cerrar el anuncio
var btnCerrar = document.getElementById('btn-cerrar');
btnCerrar.addEventListener('click', function() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
});

// Llamada a la función para mostrar el anuncio
mostrarAnuncio();

window.addEventListener("load", function() {
  // Ocultar pantalla de carga y mostrar el contenido de la página después de un tiempo de espera simulado (2 segundos en este ejemplo)
  setTimeout(function() {
    document.getElementById("loading-screen").style.transform = "translateY(-100%)";
    document.getElementById("content").style.display = "block";
  }, 2000);
});

