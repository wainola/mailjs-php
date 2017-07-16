/*
NOTE:
Este es un script que valida los datos ingresados por el usuario.
Notifica que los datos hayan sido enviados correctamente.
*/

$(document).ready(() => {
  console.log("Script cargado");
  notific8('Pagina cargada con exito', {
    life: 3000,
    theme: 'chicchat',
    color: 'cobalt'
  });
  let nombre, telefono, correo, mensaje;

  $('#nombre').on('blur', () => {
    nombre = $('#nombre').val();
  });
  $('#telefono').on('blur', () => {
    telefono = $('#telefono').val();
  })
  $('#correo').on('blur', () => {
    correo = $('#correo').val();
  })
  $('#mensaje').on('blur', () => {
    mensaje = $('#mensaje').val();
  })

  // Probamos la persistencia de los elementos enviadolos la localstorage.
  $('#botonEnvio').on('click', () => {
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('correo', correo);
    localStorage.setItem('mensaje', mensaje);
    validacionCorreo(correo);

    let dataTOphp = {
      nombre: nombre,
      tel: telefono,
      email: correo,
      msg: mensaje
    }
    // Enviamos los datos por ajax.
    $.ajax({
      type: "POST",
      url: "./form-process.php",
      data: dataTOphp,
      cache: false,
      success: notific8('Formulario enviado con exito!!', {
        life: 5000,
        theme: 'chicchat',
        color: 'shamrock'
      })
    });

    //$('#respuesta').load("form-process.php");
  });

  function validacionCorreo(correo){
    const regex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    if (regex === correo){
      console.log("Correo no valido");
    } else {
      console.log("Buen correo");
    }
  }

  $('#btnAjaxMain').on('click', (e) => {
    console.log("funcion del boton ajaxPHP");
    e.preventDefault();

    loadHTLMfromPHP();
  });

  function loadHTLMfromPHP(){
    console.log("Cargando php");
    let loadFile = 'testAjax.php';
    $('#respuesta').load(loadFile);
  }

  $('#volver').on('click', (e) => {
    e.preventDefault();
    $('html').get('index.html');
  });

});
