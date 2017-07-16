/*
NOTE:
Este es un script que valida los datos ingresados por el usuario.
Notifica que los datos hayan sido enviados correctamente.
*/

$(document).ready(() => {
  console.log("Script cargado");

  // Obtenemos los datos del formulario.
  $('#formulario').submit( (e) => {

    e.preventDefault();
    console.log("Hola!!");

    // Con esto serializamos los datos como un string.
    let formData = $('#formulario').serialize();

    console.log(JSON.stringify(formData));

    // Usamos ajax para enviar los datos al servidor.
    $.ajax({
      type: "POST",
      url: "form-process.php",
      data: formData,
      dataType: 'json',
      success: function(resp){
        console.log(resp);
      }
    });
  });

  function validacionCorreo(correo){
    const regex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    if (regex === correo){
      console.log("Correo no valido");
    } else {
      console.log("Buen correo");
    }
  }

  function cargaPHPContent(){
    console.log("Cargamos el contenido a traves de AJAX");
    let loadFile = "form-process.php";
    $('#respuesta').load(loadFile);
  }


  /*$('#btnAjaxMain').on('click', (e) => {
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
  });*/

});
